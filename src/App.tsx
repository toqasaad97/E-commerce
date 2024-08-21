
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './component/Layout/Layout'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Home from './component/Home/Home'
import ForgetPass from './component/ForgetPass/ForgetPass'
import UpdateLogin from './component/UpdateLogin/UpdateLogin'
import VerityCode from './component/VerityCode/VerityCode'
import NewPass from './component/NewPass/NewPass'
 const router =createBrowserRouter([
{path:'',element: <Layout/> , children:[
  {index:true,element: <Login/>},
  {path:'/login',element: <Login/>},
  {path:'/register',element: <Register/>},
  {path:'/home',element: <Home />},
  {path:'/forgetPass',element: <ForgetPass/>},
  {path:'/veritycode',element: <VerityCode/>},
  {path:'/updateLogin',element: <UpdateLogin />},
  {path:'/newpass',element: <NewPass />},

]}

 ])
function App() {
  return (
<>
<RouterProvider router={router} />
</>
  )
}

export default App
