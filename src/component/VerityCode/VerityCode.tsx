import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

interface User {
  resetCode: string;
}

const validationSchema = Yup.object().shape({
  resetCode: Yup.string().required('Code is required'),
});

const VerityCode: React.FC = () => {
  const [submit, setSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Added state for success message
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: async (values: User) => {
      try {
        setSubmit(true);
        setError(null); // Clear previous errors
        setSuccess(null); // Clear previous success messages
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "An error occurred during verification");
        }

        setSuccess("The reset code is correct."); // Set success message
        setTimeout(() => {
          navigate("/newpass");
        }, 2000);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
        setSuccess(null); // Clear previous success messages
      } finally {
        setSubmit(false); // Ensure submit state is reset
      }
    },
  });

  return (
    <div className="container lg:flex flex-col justify-center items-center mt-[40px]">
      <div className="lg:w-[75%] flex flex-col">
        <h1 id="register-form-title" className="text-2xl font-bold mb-6">
          Verify Reset Code
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5">
            <label
              htmlFor="resetCode"
              className="block text-sm text-gray-500 dark:text-gray-400 mb-2"
            >
              Verify Reset Code
            </label>
            <input
              type="text"
              id="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-light-blue-500"
            />
            {formik.touched.resetCode && formik.errors.resetCode && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.resetCode}
              </div>
            )}
            {error && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {error}
              </div>
            )}
            {success && (
              <div
                className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert"
              >
                {success}
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
              'Verify Reset Code'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerityCode;

