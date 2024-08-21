import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";


// User Interface
interface User {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "The min letter must be 3")
    .max(12, "The max letter must be 12")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^[A-Za-z][A-Za-z0-9]{5,8}$/,
      "Password must start with a letter, be between 6 and 9 characters, and only contain letters and numbers"
    )
    .required("Password is required"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
  phone: Yup.string()
    .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
    .required("Phone number is required"),
});

// Register Component
const Register: React.FC = () => {
  const [isError, setIsError] = useState<string | null>(null);
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const navigate =useNavigate ()


  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values: User) => {
      try {
        setSubmit(true);
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
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
          navigate("/Login")
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
            Registration completed successfully
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
          Register
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5">
            <label
              htmlFor="name"
              className="block text-sm text-gray-500 dark:text-gray-400 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-light-blue-500"
            />
            {formik.touched.name && formik.errors.name && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.name}
              </div>
            )}
          </div>

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

          {/* Confirm Password Field */}
          <div className="relative z-0 w-full mb-5">
            <label
              htmlFor="rePassword"
              className="block text-sm text-gray-500 dark:text-gray-400 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-light-blue-500"
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.rePassword}
              </div>
            )}
          </div>

          {/* Phone Field */}
          <div className="relative z-0 w-full mb-5">
            <label
              htmlFor="phone"
              className="block text-sm text-gray-500 dark:text-gray-400 mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-light-blue-500"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.phone}
              </div>
            )}
          </div>

          {/* Submit Button */}
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
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
