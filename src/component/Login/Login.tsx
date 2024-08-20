import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

interface User {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isError, setIsError] = useState<string | null>(null);

  const submit = (values: User) => {
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        setIsError(error.response?.data?.message || error.message);
      });
  };

  const regForm = useFormik({
    initialValues: {
      email: '',
      password: '',
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
    <div className="dark:bg-gray-900">
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
          <h1 className="text-2xl font-bold mb-6 dark:text-white">
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
