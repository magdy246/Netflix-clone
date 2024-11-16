import "./NewPassword.css"
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUnlock } from "@fortawesome/free-solid-svg-icons";
import bgNetflix from "../../assets/bg-netflix.jpg"

export default function NewPassword() {
    const [usermsg, setUsermsg] = useState("");
    const [errormsg, setErrormsg] = useState("");
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    let mySchema = Yup.object({
        email: Yup.string()
            .required("Email is required...!")
            .email("Invalid email address...!"),

        newPassword: Yup.string()
            .required("Password is required...!")
            .min(6, "Password should be at least 6 characters long...!"),
    });
    let formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        validationSchema: mySchema,
        onSubmit: (values) => {
            newPasswordForm(values);
        },
    });

    async function newPasswordForm(values) {
        setLoading(true);
        return await axios
            .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
            .then((data) => {
                setUsermsg(data?.data?.statusMsg);
                setLoading(false);
                if (data.data.token) {
                    navigate("/login");
                }
            })
            .catch((error) => {
                setErrormsg(error?.response?.data?.statusMsg);
                setLoading(false);
            });
    }

    return (
        <>
            <div className="px-4 pb-4 pt-10 h-screen bg-black text-white" style={{ backgroundImage: `url(${bgNetflix})` }}>
                <div
                    className="shadow-lg text-4xl md:text-5xl md:ms-10 px-3 pb-2 mb-11 font-bold text-white w-fit"
                    id="animation-register"
                >
                    <h1>New Password <FontAwesomeIcon icon={faUnlock} /></h1>
                </div>
                <form onSubmit={formik.handleSubmit} className="max-w-prose mx-auto bg-black/80 backdrop-blur-md p-10 rounded-xl">
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
                            Your newPassword
                        </label>
                        <input
                            placeholder="Enter your new password.."
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.newPassword}
                            className="bg-[#333] border border-gray-600 text-white text-sm rounded-lg focus:outline-none focus:border-red-600 block w-full p-2.5 placeholder-gray-500"
                        />
                        <div className="ps-3 text-red-600 font-bold">
                            {formik.touched.newPassword && formik.errors.newPassword}
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
                        <>
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <button
                                    type="submit"
                                    className="rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none w-full sm:w-auto px-5 py-2.5"
                                >
                                    Submit
                                </button>
                            </div>
                        </>
                    )}
                    {errormsg ? (
                        <span
                            className="pb-2 pt-1 px-3 md:mt-0 mt-2 md:w-fit w-full text-sm text-red-800 rounded-lg bg-[#3C433B] dark:text-red-400"
                            role="alert"
                        >
                            <span className="font-bold">{errormsg}</span>
                        </span>
                    ) : null}
                    {usermsg ? (
                        <span
                            className="pb-2 pt-1 px-3 md:mt-0 mt-2 md:w-fit w-full text-sm text-green-800 rounded-lg bg-[#3C433B] dark:text-green-400"
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
