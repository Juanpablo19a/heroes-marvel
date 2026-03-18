import { useContext } from "react"
import { AuthContext } from "../auth"
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    
    const { logged } = useContext(AuthContext);
    //se usa el hook useLocation para obtener la ruta actual
    // y guardarla en el localStorage
    const {pathname,search}= useLocation();
     
    const lasPath = pathname + search;
    localStorage.setItem('lastPath', lasPath);
  return ( 
    logged 
        ? children 
        : <Navigate to="/login" />
  )
}
