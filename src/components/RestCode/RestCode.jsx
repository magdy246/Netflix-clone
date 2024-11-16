import "./RestCode.css"
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTerminal } from "@fortawesome/free-solid-svg-icons";
import bgNetflix from "../../assets/bg-netflix.jpg"


export default function ResetCode() {
    const [usermsg, setUsermsg] = useState("");
    const [errormsg, setErrormsg] = useState("");
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
            resetCode: "",
        },
        onSubmit: (values) => {
            resetCodeForm(values);
        },
    });

    async function resetCodeForm(values) {
        setLoading(true);
        return await axios
            .post(
                "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                values
            )
            .then((data) => {
                setUsermsg(data?.data?.status);
                setLoading(false);
                navigate("/newpassword");
            })
            .catch((error) => {
                setErrormsg(error?.response?.data?.status);
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
                    <h1>Reset Code <FontAwesomeIcon icon={faTerminal} /></h1>
                </div>
                <form onSubmit={formik.handleSubmit} className="max-w-prose mx-auto bg-black/80 backdrop-blur-md p-10 rounded-xl">
                    <div className="mb-5">
                        <label
                            htmlFor="resetCode"
                            className="block mb-2 text-sm font-bold text-gray-400"
                        >
                            Code
                        </label>
                        <input
                            maxLength={6}
                            placeholder="Enter a reset code.."
                            type="text"
                            name="resetCode"
                            id="resetCode"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.resetCode}
                            className="bg-[#333] border border-gray-600 text-white text-sm rounded-lg focus:outline-none focus:border-red-600 block w-full p-2.5 placeholder-gray-500"
                        />
                        <div className="ps-3 text-red-600 font-bold">
                            {formik.touched.resetCode && formik.errors.resetCode}
                        </div>
                    </div>
                    {loading ? (
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none w-full sm:w-auto px-5 py-2.5 text-center"
                            >
                                <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <button
                                    type="submit"
                                    className="rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none w-full sm:w-auto px-5 py-2.5 text-center"
                                >
                                    Submit
                                </button>
                                <div className="text-sm mt-2 md:mt-0 font-bold text-gray-400">
                                    Not registered yet?{" "}
                                    <Link
                                        to="/register"
                                        className="text-red-600 hover:underline"
                                    >
                                        Create account
                                    </Link>
                                </div>
                            </div>
                        </>
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
