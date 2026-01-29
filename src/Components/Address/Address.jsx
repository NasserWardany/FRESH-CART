import { useParams } from "react-router-dom"
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import * as yup from "yup"

export default function Address() {
    let { cartId } = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    // const navigate = useNavigate()


    const validationSchema = yup.object({
        details: yup.string().min(3, "Name must be 3 characters or more").max(20, "Name must be less than 20 characters or equal").required("Details Is Required"),
        city: yup.string().required("City Is Required"),
        phone: yup.string().required("Phone Is Required").matches(/^(002)?01[0125][0-9]{8}$/, 'Enter a valid egyptian number'),
    })
    const formik = useFormik({
        initialValues: {
            "details": "",
            "city": "",
            "phone": "",
        },
        onSubmit: onSubmit,
        validationSchema: validationSchema
        // validate: validate
    })
    function onSubmit() {
        setIsLoading(true);
        setErrorMessage("")
        checkOut(formik.values)

    }
    async function checkOut(address) {
        try {
            let { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session${cartId}`,
                {
                    "shippingAddress": address
                },
                {
                    params: {
                        url: "https://localhost:5175"
                    },
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            );
            setIsLoading(false)

            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <div className=" bg-slate-100 p-5 rounded-md">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-6" >
                        <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {" "}
                            Details
                        </label>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" name="details" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Details" />
                        {formik.errors.details && formik.touched.name && <p className="bg-red-400 text-white p-1 md-md my-1 text-sm">{formik.errors.details}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Phone number
                        </label>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name="phone" type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" />
                        {formik.errors.phone && formik.touched.phone && <p className="bg-red-400 text-white p-1 md-md my-1 text-sm">{formik.errors.phone}</p>}
                    </div>
                    <div className="mb-6" >
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {" "}
                            City
                        </label>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="city" />


                        {formik.errors.city && formik.touched.name && <p className="bg-red-400 text-white p-1 md-md my-1 text-sm">{formik.errors.city}</p>}
                    </div>
                    {errorMessage && <div className="mb-4">
                        <p className="bg-red-300 text-gray-900 p-1 my-1 text-sm">{errorMessage}</p>
                    </div>}

                    <button disabled={isLoading} type="submit" className="text-white   ms-auto block bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {isLoading ? <i className="fas fa-spinner fa-spin mx-4"></i> : <span>Checkout</span>}
                    </button>
                </form >
            </div >
        </>
    );
}


