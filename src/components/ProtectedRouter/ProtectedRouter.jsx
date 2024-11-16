import "./ProtectedRouter.css"
import { Navigate } from "react-router-dom";

export default function ProtectedRouter(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}
