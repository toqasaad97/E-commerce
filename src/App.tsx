
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './component/Layout/Layout'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
 const router =createBrowserRouter([
{path:'',element: <Layout/> , children:[
  {index:true,element: <Login/>},
  {path:'/register',element: <Register/>},

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
