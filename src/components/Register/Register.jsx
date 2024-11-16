import "./Register.css"
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faSpinner } from "@fortawesome/free-solid-svg-icons";
import bgNetflix from "../../assets/bg-netflix.jpg"

export default function Register() {
    const [usermsg, setUsermsg] = useState("");
    const [errormsg, setErrormsg] = useState("");
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    let mySchema = Yup.object({
        name: Yup.string()
            .required("Name is required...!")
            .min(3, "Name should be 3 characters or more...!")
            .max(10, "Maximum length is 10 characters...!"),

        email: Yup.string()
            .required("Email is required...!")
            .email("Invalid email address...!"),

        password: Yup.string()
            .required("Password is required...!")
            .min(6, "Password should be at least 6 characters long...!"),

        rePassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match...!")
            .required("Confirm password is required...!"),

        phone: Yup.string()
            .required("Phone number is required...!")
            .matches(/^(002)?01[0125][0-9]{8}$/, "Invalid phone number format...!"),
    });
    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        validationSchema: mySchema,
        onSubmit: (values) => {
            registering(values);
        },
    });

    async function registering(values) {
        setLoading(true);
        return await axios
            .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            .then((data) => {
                setUsermsg(data.data.message);
                setLoading(false);
                navigate("/login");
            })
            .catch((error) => {
                setErrormsg(error.response.data.message);
                setLoading(false);
            });
    }

    return (
        <>
            <div className="px-4 py-10 h-full bg-black text-white" style={{ backgroundImage: `url(${bgNetflix})` }}>
                <div
                    className="shadow-lg text-4xl md:text-5xl md:ms-10 px-3 pb-2 mb-11 font-bold text-white w-fit"
                    id="animation-register"
                >
                    <h1>Register <FontAwesomeIcon icon={faArrowRightToBracket} /></h1>
                </div>
                <form onSubmit={formik.handleSubmit} className="max-w-prose mx-auto bg-black/80 backdrop-blur-md p-10 rounded-xl">
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-bold text-gray-400"
                        >
                            Your name
                        </label>
                        <input
                            placeholder="Enter full name.."
                            type="text"
                            name="name"
                            id="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            className="bg-[#333] border border-gray-600 text-white text-sm rounded-lg focus:outline-none focus:border-red-600 block w-full p-2.5 placeholder-gray-500"
                        />
                        <div className="ps-3 text-red-600 font-bold">
                            {formik.touched.name && formik.errors.name}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-bold text-gray-400"
                        >
                            Your email
                        </label>
                        <input
                            placeholder="Enter a email address.."
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
                            Your password
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
                    <div className="mb-5">
                        <label
                            htmlFor="rePassword"
                            className="block mb-2 text-sm font-bold text-gray-400"
                        >
                            Repassword
                        </label>
                        <input
                            placeholder="Confirm your password.."
                            type="password"
                            name="rePassword"
                            id="rePassword"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.rePassword}
                            className="bg-[#333] border border-gray-600 text-white text-sm rounded-lg focus:outline-none focus:border-red-600 block w-full p-2.5 placeholder-gray-500"
                        />
                        <div className="ps-3 text-red-600 font-bold">
                            {formik.touched.rePassword && formik.errors.rePassword}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-bold text-gray-400"
                        >
                            Your phone
                        </label>
                        <input
                            placeholder="0127-4567-078"
                            type="tel"
                            name="phone"
                            id="phone"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            className="bg-[#333] border border-gray-600 text-white text-sm rounded-lg focus:outline-none focus:border-red-600 block w-full p-2.5 placeholder-gray-500"
                        />
                        <div className="ps-3 text-red-600 font-bold">
                            {formik.touched.phone && formik.errors.phone}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        {loading ? (
                            <button
                                type="submit"
                                className="rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none w-full sm:w-auto px-5 py-2.5"
                            >
                                <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
                            </button>
                        ) : (
                            <div className="flex flex-col items-center md:items-stretch">
                                <button
                                    type="submit"
                                    className="rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none w-full sm:w-auto px-5 py-2.5 text-center"
                                >
                                    Register
                                </button>
                                <div className="text-sm mt-2 md:mt-0 font-bold text-gray-400">
                                    Register before.{" "}
                                    <Link
                                        to="/login"
                                        className="text-red-600 hover:underline"
                                    >
                                        Login now
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
                    </div>
                </form>
            </div>
        </>
    );
}
