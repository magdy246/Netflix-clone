import "./ProtectedRouterLog.css"
import { Navigate } from "react-router-dom";

export default function ProtectedRouterLog(props) {
    if (localStorage.getItem("user")) {
        return <Navigate to={"/"}></Navigate>;
    } else {
        return props.children;
    }
}
