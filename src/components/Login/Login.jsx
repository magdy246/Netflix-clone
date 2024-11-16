import "./Login.css"
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TokenContext } from "../../Context/TokenContext";
import bgNetflix from "../../assets/bg-netflix.jpg"

export default function Login() {
    const [usermsg, setUsermsg] = useState("");
    const [errormsg, setErrormsg] = useState("");
    const [loading, setLoading] = useState(false);

    let mySchema = Yup.object({
        email: Yup.string()
            .required("Email is required...!")
            .email("Invalid email address...!"),

        password: Yup.string()
            .required("Password is required...!")
            .min(6, "Password should be at least 6 characters long...!"),
    });
    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: mySchema,
        onSubmit: (values) => {
            loginForm(values);
        },
    });

    async function loginForm(values) {
        setLoading(true);
        await axios
            .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
            .then((response) => {
                setUsermsg(response.data.message);
                localStorage.setItem("user", response.data.token);
                setUserToken(response.data.token);
                setLoading(false);
                window.location.reload();
            })
            .catch((error) => {
                setErrormsg(error.response.data.message);
                setLoading(false);
            });
    }

    let { setUserToken } = useContext(TokenContext);
    return (
        <>
            <div className="px-4 pb-4 pt-10 h-screen bg-black text-white " style={{ backgroundImage: `url(${bgNetflix})` }}>
                <div
                    className="shadow-lg text-4xl md:text-5xl md:ms-10 px-3 pb-2 mb-11 font-bold text-white w-fit"
                    id="animation-register"
                >
                    <h1>
                        Login <FontAwesomeIcon icon={faRightToBracket} />
                    </h1>
                </div>
                <form onSubmit={formik.handleSubmit} className="max-w-prose mx-auto bg-black/80 backdrop-blur-md p-10 rounded-xl">
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-bold text-gray-400"
                        >
                            Email
                        </label>
                        <input
                            placeholder="Enter your email address.."
                            type="email"
                            name="email"
                            id="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            className="bg-[#333] border border-gray-600 text-white text-sm rounded-lg focus:outline-none focus:border-red-600 block w-full p-2.5 placeholder-gray-500"
                        />
                        <div className="ps-3 text-red-600 font-bold">
                            {formik.touched.email && formik.errors.email}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-bold text-gray-400"
                        >
                            Password
                        </label>
                        <input
                            placeholder="Enter your password.."
                            type="password"
                            name="password"
                            id="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            className="bg-[#333] border border-gray-600 text-white text-sm rounded-lg focus:outline-none focus:border-red-600 block w-full p-2.5 placeholder-gray-500"
                        />
                        <div className="ps-3 text-red-600 font-bold">
                            {formik.touched.password && formik.errors.password}
                        </div>
                    </div>
                    {loading ? (
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none w-full sm:w-auto px-5 py-2.5"
                            >
                                <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center md:items-stretch">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <button
                                    type="submit"
                                    className="rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none w-full sm:w-auto px-5 py-2.5 text-center"
                                >
                                    Sign In
                                </button>
                                <div className="text-sm mt-2 md:mt-0 font-bold text-gray-400">
                                    New to Netflix?{" "}
                                    <Link
                                        to="/register"
                                        className="text-red-600 hover:underline"
                                    >
                                        Register now
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-3">
                                <Link
                                    to="/forgetpassword"
                                    className="text-md font-bold text-gray-400 hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                    )}
                    {errormsg ? (
                        <span
                            className="pb-2 pt-1 px-3 mt-2 w-full text-sm text-red-500 rounded-lg bg-[#222]"
                            role="alert"
                        >
                            <span className="font-bold">{errormsg}</span>
                        </span>
                    ) : null}
                    {usermsg ? (
                        <span
                            className="pb-2 pt-1 px-3 mt-2 w-full text-sm text-green-500 rounded-lg bg-[#222]"
                            role="alert"
                        >
                            <span className="font-bold">{usermsg}</span>
                        </span>
                    ) : null}
                </form>
            </div>

        </>
    );
}
