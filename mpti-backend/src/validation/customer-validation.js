import Joi from "joi";


const nikValidation = Joi.object({
    nik: Joi.string().max(16).min(16).pattern(new RegExp("^[0-9]")).required().messages({
        "string.min": "NIK minimal 16 karakter",
        "string.max": "NIK maksimal 16 karakter",
        "string.pattern.base": "Format NIK wajib berisi angka",
        "any.required": "NIK wajib diisi"
    }),
})

const addCustomerValidation = Joi.object({
    nik: Joi.string().max(16).min(16).pattern(new RegExp("^[0-9]")).required().messages({
        "string.min": "NIK minimal 16 karakter",
        "string.max": "NIK maksimal 16 karakter",
        "string.pattern.base": "Format NIK wajib berisi angka",
        "any.required": "NIK wajib diisi"
    }),
    name: Joi.string().max(100).min(1).required().messages({
        "string.min": "Nama minimal 1 karakter",
        "string.max": "Nama maksimal 100 karakter",
        "any.required": "Alamat wajib diisi"
    }),
    address: Joi.string().max(100).min(1).required().messages({
        "string.min": "Alamat minimal 1 karakter",
        "string.max": "Alamat maksimal 100 karakter",
        "any.required": "Alamat wajib diisi"
    }),
    type: Joi.number().positive().default(1).max(2).required().messages({
        "number.positive": "Tipe wajib bernilai positif",
        "number.max": "Tipe tidak sesuai format",
        "number": "Tipe tidak sesuai format",
        "any.required": "Tipe konsumen wajib diisi"
    }),
})


export {
    nikValidation,
    addCustomerValidation
}