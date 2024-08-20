import  { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for routing
import 'flowbite';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported
import CartIcon from '../cart/CartIcon';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-[#F8F9FA] p-4 ">
      <div className="container  flex items-center justify-between">

      <div className=" flex items-center justify-between">
  <CartIcon />
<Link to="/" className=" text-2xl font-bold">Fresh Cart</Link>
</div>

        <div className="hidden md:flex space-x-4">
          <Link to="/login"  className="text-gray-700 hover:text-gray-900">Login</Link>
          <Link to="/register" className="text-gray-700 hover:text-gray-900">Register</Link>
        </div>







        <button onClick={toggleMobileMenu} className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
          </svg>
        </button>
      </div>


      <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 flex flex-col items-center justify-center space-y-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <Link to="/login" className="text-[#F8F9FA] text-lg">Login</Link>
        <Link to="/register" className="text-[#F8F9FA] text-lg">Register</Link>
        <button onClick={() => alert('Logged out')} className="text-red-500 text-lg">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
