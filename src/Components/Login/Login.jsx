import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
    const { setIsUserLoggedIn } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const validationSchema = yup.object({
        email: yup.string().required("Email is required").email("Enter a valid email"),
        password: yup.string().required("Password is required").matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'Minimum eight characters, at least one letter and one number'
        ),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: onSubmit,
        validationSchema: validationSchema
    });


    function onSubmit() {
        setIsLoading(true);
        setErrorMessage("");

        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", formik.values)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                setIsUserLoggedIn(true);
                setIsLoading(false);
                toast.success("Login successful!");
                navigate(location.pathname === '/login' ? "/" : location.pathname);
            }).catch((err) => {
                setErrorMessage(err.response?.data?.message || "An error occurred");
                setIsLoading(false);
                toast.error("Login failed!");
            });

        console.log(formik.values);
    }

    return (
        <div className="bg-slate-100 p-5 rounded-md">
            <h1 className="text-2xl mb-7">Login Now:</h1>

            <form onSubmit={formik.handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email address
                    </label>
                    <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="john.doe@company.com"
                    />
                    {formik.errors.email && formik.touched.email &&
                        <p className="bg-red-400 text-white p-1 my-1 text-sm">{formik.errors.email}</p>}
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                    </label>
                    <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        type="password"
                        name="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="•••••••••"
                    />
                    {formik.errors.password && formik.touched.password &&
                        <p className="bg-red-400 text-white p-1 my-1 text-sm">{formik.errors.password}</p>}
                </div>

                {errorMessage && <div className="mb-4">
                    <p className="bg-red-300 text-gray-900 p-1 my-1 text-sm">{errorMessage}</p>
                </div>}

                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>
                    </label>
                </div>

                <button
                    disabled={isLoading}
                    type="submit"
                    className="text-white ms-auto block bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    {isLoading ? <i className="fas fa-spinner fa-spin mx-4"></i> : <span>Login</span>}
                </button>
            </form>
        </div>
    );
}
