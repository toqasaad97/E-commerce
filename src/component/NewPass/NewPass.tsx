import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  newPassword: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  newPassword: Yup.string()
    .matches(
      /^[A-Za-z][A-Za-z0-9]{5,8}$/,
      "Password must start with a letter, be between 6 and 9 characters, and only contain letters and numbers"
    )
    .required("Password is required"),
});

const NewPass: React.FC = () => {
  const [isError, setIsError] = useState<string | null>(null);
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: async (values: User) => {
      try {
        setIsError(null);
        setSubmit(true);

        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setIsTrue(true);
        setTimeout(() => navigate("/updateLogin"), 2000);
      } catch (error) {
        setIsTrue(false);
        setIsError(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setSubmit(false);
      }
    },
  });

  return (
    <div className="container lg:flex flex-col justify-center items-center mt-[40px]">
      <div className="lg:w-[75%] flex flex-col">
        {isTrue && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            Password reset successfully
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
          Reset Password
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
              htmlFor="newPassword"
              className="block text-sm text-gray-500 dark:text-gray-400 mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-light-blue-500"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.newPassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            disabled={submit}
          >
            {submit ? (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
              />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPass;
