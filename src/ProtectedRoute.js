import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {

    let isLoggedin=false;
    if(sessionStorage.getItem("token")!==null){
        isLoggedin=true
    }
    const user = { loggedIn: isLoggedin };
    return user && user.loggedIn;
};

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;