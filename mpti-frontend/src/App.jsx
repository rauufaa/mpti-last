import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login, { actionLogin } from './pages/Login'
import Dashboard, { actionDashboard } from './pages/Dashboard'
import Customer from './pages/Dashboard/Customer/Customer'
import CustomerRegister from './pages/Dashboard/Customer/CustomerRegister'
import CustomerTransaction from './pages/Dashboard/Customer/CustomerTransaction'
import Sales from './pages/Dashboard/Sales/Sales'
import Stok from './pages/Dashboard/Stok/Stok'
import StokPrice from './pages/Dashboard/Stok/StokPrice'
import StokAdd from './pages/Dashboard/Stok/StokAdd'
import StokHistory from './pages/Dashboard/Stok/StokHistory'
import Profile from './pages/Dashboard/Profile/Profile'
import ForgetPassword from './pages/ForgetPassword'
import DashboardContent from './pages/Dashboard/content'


const router = createBrowserRouter([
  {
    path: "/login",
    loader: actionLogin,
    element: <Login />
  }, {
    path: "/lupa-sandi",
    element: <ForgetPassword/>
  },{
    path: "/",
    loader: actionDashboard,
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <DashboardContent/>
      },
      {
        path: "pelanggan",
        element: <Customer />
        
      }, {
        path: "pelanggan/daftar",
        element: <CustomerRegister/>
      }, {
        path: "pelanggan/transaksi",
        element: <CustomerTransaction/>
      }, {
        path: "penjualan",
        element: <Sales/>
      }, {
        path: "stok",
        element: <Stok/>
      }, {
        path: "stok/harga",
        element: <StokPrice/>
      }, {
        path: "stok/tambah",
        element: <StokAdd/>
      }, {
        path: "stok/riwayat",
        element: <StokHistory/>
      }, {
        path: "/profil",
        element: <Profile/>
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
