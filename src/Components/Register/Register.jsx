import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup"


export default function Register() {

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()


  const validationSchema = yup.object({
    name: yup.string().min(3, "Name must be 3 characters or more").max(20, "Name must be less than 20 characters or equal").required("Name Is Required"),
    email: yup.string().required("Email Is Required").matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Enter a valid email'),
    phone: yup.string().required("Phone Is Required").matches(/^(002)?01[0125][0-9]{8}$/, 'Enter a valid egyptian number'),
    password: yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Minimum eight characters, at least one letter and one number'),
    rePassword: yup.string().required("Re password is required").oneOf([yup.ref('password')])
  })
  const formik = useFormik({
    initialValues: {
      "name": "",
      "email": "",
      "password": "",
      "rePassword": "",
      "phone": "",
    },
    onSubmit: onSubmit,
    validationSchema: validationSchema
    // validate: validate
  })




  function onSubmit() {
    setIsLoading(true);
    setErrorMessage("")
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", formik.values)
      .then((response) => {
        console.log(response.data.message);
        setIsLoading(false)
        navigate("/login")
      }).catch((err) => {
        console.log(err.response.data.message);
        setIsLoading(false)
      })

    console.log(formik.values);
  }
  return (
    <>
      <div className=" bg-slate-100 p-5 rounded-md">
        <h1 className="text-2xl mb-7">Register Now :</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {" "}
              Name
            </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
            {formik.errors.name && formik.touched.name && <p className="bg-red-400 text-white p-1 md-md my-1 text-sm">{formik.errors.name}</p>}
          </div>


          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {" "}Email address    </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" />
            {formik.errors.email && formik.touched.email && <p className="bg-red-400 text-white p-1 md-md my-1 text-sm">{formik.errors.email}</p>}

          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Phone number
            </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name="phone" type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" />
            {formik.errors.phone && formik.touched.phone && <p className="bg-red-400 text-white p-1 md-md my-1 text-sm">{formik.errors.phone}</p>}

          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {" "}
              Password
            </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />
            {formik.errors.password && formik.touched.password && <p className="bg-red-400 text-white p-1 md-md my-1 text-sm">{formik.errors.password}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {" "}
              Confirm password
            </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />
            {formik.errors.rePassword && formik.touched.rePassword && <p className="bg-red-400 text-white p-1 md-md my-1 text-sm">{formik.errors.rePassword}</p>}

          </div>
          {errorMessage && <div className="mb-4">
            <p className="bg-red-300 text-gray-900 p-1 my-1 text-sm">{errorMessage}</p>
          </div>}
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"

              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {" "}
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                {" "}
                terms and conditions
              </a>

            </label>
          </div>
          <button disabled={isLoading} type="submit" className="text-white   ms-auto block bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {isLoading ? <i className="fas fa-spinner fa-spin mx-4"></i> : <span>Submit</span>}
          </button>
        </form >
      </div >
    </>
  );
}
