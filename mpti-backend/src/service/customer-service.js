import { request } from "http";
import { databaseQuery } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { addCustomerValidation, nikValidation } from "../validation/customer-validation.js"
import { validate_object } from "../validation/validation-util.js"
import path from "path";

const cekNik = async (request) => {
    
    const customerRequest = validate_object(nikValidation, request)

    
    let query = "SELECT * FROM konsumen WHERE nik=?";
    let params = [customerRequest.nik];
    let [resultUser, field] = await databaseQuery(query, params);

    if (resultUser.length == 0) {
        throw new ResponseError(400, "Pelanggan tidak ditemukan")
    }

    

    if (resultUser.at(0).tipe == "RUMAH_TANGGA") {
        
        query = "WITH id_pengiriman_terbaru AS (SELECT id FROM `detail_pengiriman` ORDER BY id DESC LIMIT 1) SELECT * FROM id_pengiriman_terbaru JOIN `detail_pembelian` AS a JOIN `pembelian_gas` AS b ON id_pengiriman_terbaru.id = a.id_detail_pengiriman AND a.id_pembelian = b.id WHERE b.id_user = ? ORDER BY a.id DESC LIMIT 1"
        
        params = [resultUser.at(0).id]
        
        let [resultCount, fieldCekup] = await databaseQuery(query, params);
        
        if (resultCount.length > 0 && resultCount.at(0).jumlah > 0) {
            throw new ResponseError(400, "Pelanggan sudah melakukan pembelian")
        }
    }

    return resultUser.at(0)
}

const countType = async (request) => {
    let query = "SELECT tipe, COUNT(*) AS jumlah FROM `konsumen` GROUP BY tipe";
    let [result, field] = await databaseQuery(query);

    

    return{
        rumahTangga: result.at(0).jumlah,
        usaha: result.at(1).jumlah
    }
}

const register = async (request) => {
    if(!request.files?.ktp){
        throw new ResponseError(400, "Membutuhkan File KTP")
    }
    const customerRequest = validate_object(addCustomerValidation, request.body)

    let query = "SELECT * FROM konsumen WHERE nik=? limit 1";
    let params = [customerRequest.nik];
    let [resultUser, field] = await databaseQuery(query, params);

    if (resultUser.length != 0) throw new ResponseError(400, "Pelanggan sudah terdaftar")

    const file = request.files.ktp
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    const newName = file.md5 + ext
    const imageUrl = `${request.protocol}://${request.get("host")}/images/${newName}`

    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });

    if (fileSize > 1000000) throw new ResponseError(413, "File terlalu ebih dari 1 MB")

    const customerType = customerRequest.type == 1 ? 'RUMAH_TANGGA' : "USAHA"

    try {
        file.mv(`./src/images/ktp/${newName}`)
    } catch (error) {
        throw new ResponseError(400, "Failed to process")
    }

    query = "INSERT INTO `konsumen`(`nik`, `nama`, `alamat`, `tipe`, `ktp_name`) VALUES (?,?,?,?,?)"
    params = [customerRequest.nik, customerRequest.name, customerRequest.address, customerRequest.type, newName]
    const [resultUser2, field2] = await databaseQuery(query, params);

    if (resultUser2.affectedRows < 1) throw new ResponseError(400, "Gagal Mendaftarkan pelanggan baru")
    return "Berhasil Mendaftarkan Pelanggan"
}


export default {
    cekNik,
    register,
    countType
}