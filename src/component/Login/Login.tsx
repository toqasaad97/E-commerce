import { useFormik } from 'formik';
import  { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

interface User {
  email: string;
  password: string;

}

const Login: React.FC = () => {
  const [isError, setIsError] = useState(null);

  const submit = (values: User) => {
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        setIsError(error);
      });

  };

  const regForm = useFormik({
    initialValues: {
      password: '',
      email :''

    },
    onSubmit: submit,
    validationSchema: yup.object().shape({

      email: yup
        .string()
        .email('Invalid email')
        .required('Email is required'),
      password: yup
        .string()
        .matches(
          /^[A-Za-z][A-Za-z0-9]{5,8}$/,
          'Password must start with a letter, be between 6 and 9 characters, and only contain letters and numbers'
        )
        .required('Password is required'),

    }),
  });

  return (
    <div className=" dark:bg-gray-900">
          <div className="container lg:flex flex-col justify-center items-center py-[40px] dark:bg-gray-900">
      <div className="lg:w-[75%] flex flex-col">
        {isError && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {isError}
          </div>
        )}
        <h1
          id="register-form-title"
          className="text-2xl font-bold mb-6 dark:text-white"
        >
          Login Now
        </h1>
        <form onSubmit={regForm.handleSubmit}>


          {/* Email Field */}
          <div className="relative z-0 w-full mb-5">
            <label
              htmlFor="email"
              className="block text-sm text-gray-500 dark:text-gray-400 mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 dark:bg-gray-800 bg-transparent border rounded-md border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-light-blue-500 dark:focus:ring-gray-500"
              onChange={regForm.handleChange}
              onBlur={regForm.handleBlur}
            />
            {regForm.touched.email && regForm.errors.email && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {regForm.errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="relative z-0 w-full mb-5">
            <label
              htmlFor="password"
              className="block text-sm text-gray-500 dark:text-gray-400 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 dark:bg-gray-800 bg-transparent border rounded-md border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-light-blue-500 dark:focus:ring-gray-500"
              onChange={regForm.handleChange}
              onBlur={regForm.handleBlur}
            />
            {regForm.touched.password && regForm.errors.password && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {regForm.errors.password}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-white bg-[#4FA74F] hover:bg-[#65b565] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mt-4 ml-auto block dark:bg-green-700 dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            login
          </button>
        </form>
      </div>
    </div>

    </div>
  );
};

export default Login;





































// const Login: React.FC = () => {
//   return (
//     <section className="container">
//       <div className="w-fullh-screen lg:py-0 ">

//         <div className="w-full">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//             <h1 className="text-xl font-bold text-gray-900 md:text-2xl  tracking-tight leading-tight">
//             login Now
//             </h1>
//             <form className="space-y-4 md:space-y-6" action="#">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                 email:
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="name@company.com"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   placeholder="••••••••"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-start">
//                   <div className="flex items-center h-5">
//                     <input
//                       id="remember"
//                       aria-describedby="remember"
//                       type="checkbox"
//                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
//                       required
//                     />
//                   </div>
//                   <div className="ml-3 text-sm">
//                     <label
//                       htmlFor="remember"
//                       className="text-gray-500 dark:text-gray-300"
//                     >
//                       Remember me
//                     </label>
//                   </div>
//                 </div>
//                 <a
//                   href="#"
//                   className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
//                 >
//                   Forgot password?
//                 </a>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//               >
//                 Sign in
//               </button>
//               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                 Don’t have an account yet?{' '}
//                 <a
//                   href="#"
//                   className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                 >
//                   Sign up
//                 </a>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;
