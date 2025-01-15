import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const UserProtectedWrapper=({children})=>{
    const token =localStorage.getItem('token')
    const navigate=useNavigate();

    useEffect(() => {
        if (!token) {
          navigate("/role/farmer/login");
        }
      }, [token, navigate]);
    
      // if (!token) {
      //   return <p>Loading...</p>;
      // }
      return(
        <>
        {children}
        </>
      )
}
export default UserProtectedWrapper