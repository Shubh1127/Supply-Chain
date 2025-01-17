import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const UserProtectedWrapper=({children})=>{
    const token =localStorage.getItem('Buyertoken')
    const navigate=useNavigate();

    useEffect(() => {
        if (!token) {
          navigate("/role/buyer/login");
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