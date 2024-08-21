import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgetPass: React.FC = () => {
  const [submit, setSubmit] = useState<boolean>(false);
  const [send, setSend] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values: User) => {
      try {
        setSubmit(true);
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const data = await res.json();
        setSend(true)
        if (!res.ok) {
          throw new Error(data.message || "An error occurred during registration");
        }

        setSubmit(false);

        setTimeout(() => {
          navigate("/verityCode");
        }, 2000);
      } catch (error) {
        if (error instanceof Error) {
          setSubmit(false);
        }
      }
    },
  });

  return (
    <div className="container lg:flex flex-col justify-center items-center mt-[40px]">
      <div className="lg:w-[75%] flex flex-col">
        {send ?       <div
                className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert"
              >
                Send code
              </div> : ''}
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
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
              />
            ) : (
              "Send code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;
