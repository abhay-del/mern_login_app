import { Navigate } from "react-router-dom";

export const Authorization = ({ children }) => {
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}