import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string
}
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^[A-Za-z][A-Za-z0-9]{5,8}$/,
      "Password must start with a letter, be between 6 and 9 characters, and only contain letters and numbers"
    )
    .required("Password is required"),

});


const Login: React.FC = () => {
  const [isError, setIsError] = useState<string | null>(null);
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const navigate =useNavigate ()


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values: User) => {
      try {
        setSubmit(true);
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const data = await res.json();

        setSubmit(false);
        setIsTrue(true);
        setIsError(null);
        setTimeout(() => {
          navigate("/Home")
        }, 2000);

        if (!res.ok) {
          setIsTrue(false);
          setIsError(data.message);
          setTimeout(() => {
            setIsError(null);
          }, 2000);
          throw new Error(data.message || "An error occurred during registration");
        }
      } catch (error) {
        if (error instanceof Error) {
          setSubmit(false);
          setIsTrue(false);
          setIsError(error.message);
        } else {
          setIsError("An unexpected error occurred");
        }
      }
    },
  });

  return (
    <div className="container lg:flex flex-col justify-center items-center mt-[40px]">
      <div className="lg:w-[75%] flex flex-col">
        {isTrue && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            Login completed successfully
          </div>
        )}
        {isError && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {isError}
          </div>
        )}
        <h1 id="register-form-title" className="text-2xl font-bold mb-6">
        Login Now
        </h1>
        <form onSubmit={formik.handleSubmit}>

          <div className="relative z-0 w-full mb-5">
            <label
              htmlFor="email"
              className="block text-sm text-gray-500 dark:text-gray-400 mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-light-blue-500"
            />
            {formik.touched.email && formik.errors.email && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            )}
          </div>


          <div className="relative z-0 w-full mb-5">
            <label
              htmlFor="password"
              className="block text-sm text-gray-500 dark:text-gray-400 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-light-blue-500"
            />
            {formik.touched.password && formik.errors.password && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.password}
              </div>
            )}
          </div>


          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            {submit ? (
         <ColorRing
         visible={true}
         height="40"
         width="40"
         ariaLabel="color-ring-loading"
         wrapperStyle={{}}
         wrapperClass="color-ring-wrapper"
         colors={['#fff', '#ffff', '#ffff', '#ffff', '#ffff']}
         />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className=" text-center">
          <p className=" caputalize  text-center">
            Do Not have an account? <Link to="/register"className="text-green-500" >Register</Link>
          </p>
          <p className=" caputalize  text-center mt-2">
            Do you forget your password? <Link to="/forgetPass"className="text-green-500" >Forget Password</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
