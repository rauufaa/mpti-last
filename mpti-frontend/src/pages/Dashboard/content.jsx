import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { gasStok } from "../../state/StokSlice";
import axios from "axios";

function DashboardContent() {
    const stokState = useSelector(state => state.stok)
    const userState = useSelector(state => state.user)
    const [customerHouse, setCustomerHouse] = useState(0)
    const [customerType, setCustomerType] = useState({})
    const [customerBusiness, setCustomerBusiness] = useState(0)
    const dispatch = useDispatch();

    useEffect(() => {
        const prepData = {
            token: userState.data.token
        }
        dispatch(gasStok(prepData))
        axios.get(import.meta.env.VITE_APP_API_URI, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': prepData.token
            }
        }).then(result => {
            360 - 360 * (result.data.data.usaha / (result.data.data.rumahTangga + result.data.data.usaha)) - 2
            setCustomerHouse(result.data.data.rumahTangga)
            setCustomerBusiness(result.data.data.usaha)
            setCustomerType({
                usaha: 360 - 360 * (result.data.data.usaha / (result.data.data.rumahTangga + result.data.data.usaha)) - 3,
            })
        })

    }, [])
    return (
        <>
            <h1 className="text-4xl py-5 md:py-10 font-medium truncate">Dashboard</h1>
            <div className="w-full py-2 gap-3 flex flex-col md:flex-row ">
                <div className="card md:max-w-xl w-full bg-base-100 shadow-sm rounded-md">
                    <p className="py-1.5 px-3 bg-[#f9fafb]">Distribusi Konsumen</p>
                    <div className="card-body max-w-3xl flex-col pt-4 sm:flex-row lg:pt-0 lg:flex-row gap-3 justify-around items-center h-96 md:h-full overflow-auto">
                        <div className="w-48 max-h-48  h-full relative block">
                            <div className={`radial-progress absolute text-[#4AAE64] font-bold text-4xl`} style={{ "--value": (customerHouse / (customerBusiness + customerHouse)) * 100, "--size": "12rem" }} role="progressbar">
                                
                                {customerHouse+customerBusiness}
                            </div>

                            <div className={(`radial-progress absolute text-[#a6e8b8]`)} style={{ "--value": (customerBusiness / (customerBusiness + customerHouse)) * 100, "--size": "12rem", "rotate": `${customerType.usaha}deg` }} role="progressbar">

                            </div>
                        </div>
                        <div className="flex flex-col gap-3 w-44 pl-5">
                            <div className="indicator">
                                <span className="indicator-item indicator-start indicator-middle badge bg-[#4AAE64] z-0"></span>
                                <div className="px-5 place-items-center text-wrap"><span className="px-4">{customerHouse}</span>Rumah Tangga</div>
                            </div>
                            <div className="indicator">
                                <span className="indicator-item indicator-start indicator-middle badge bg-[#a6e8b8] z-0"></span>
                                <div className="px-5 place-items-center text-wrap"><span className="px-4">{customerBusiness}</span>Usaha</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <div className="card max-w-5xl w-full bg-base-100 shadow-sm rounded-md">
                        <p className="py-1.5 px-3 bg-[#f9fafb]">Keuntungan Kotor Keseluruhan</p>
                        <div className="card-body text-center items-center overflow-auto">
                            <span className="material-symbols-outlined text-4xl w-14 h-14 flex justify-center items-center text-white bg-[#4AAE64] rounded-md">
                                account_balance_wallet
                            </span>
                            <h2 className="text-[1em] font-medium px-4">{new Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(stokState?.dataStok?.dirtyRevenue)}</h2>
                        </div>
                    </div>

                    <div className="card max-w-5xl w-full bg-base-100 shadow-sm rounded-md">
                        <p className="py-1.5 px-3 bg-[#f9fafb]">Stok saat ini</p>
                        <div className="card-body overflow-auto">
                            <div className="flex items-center gap-5">
                                <span className="material-symbols-outlined text-4xl min-w-14 w-14 h-14 flex justify-center items-center text-white bg-[#4AAE64] rounded-md">
                                    deployed_code
                                </span>
                                <h2 className="font-semibold text-[2em]">{stokState.dataStok.stok}<span className="pl-2 text-sm">tabung</span></h2>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardContent