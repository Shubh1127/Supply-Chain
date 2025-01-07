// import Footer from "../Footer"
import Header from "../../Header"
import { useState } from "react";
import axios from "axios";
const SignupFarmer = () => {
  const [user, setUser] = useState({
    name:'',
    email:'',
    password:'',
    phoneNumber:'',
  });
  const [message,setMessage]=useState('');
  const handleChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault(); 
    try{
      const User=await axios.post('http://localhost:3000/farmer/register',user);
      setMessage(User.data.message);
      console.log(User.data.message);
    }catch(er){
      setMessage(er.response.data.message);
      // console.log(er.response.data.message);
    }
    
    // console.log(user);
  }
  return (
    <>
    <Header/>
    <div className="h-screen w-screen content-center flex items-center justify-center ">
        <div className="h-1/2  w-1/2 flex flex-col gap-1 items-center justify-center ">
                <h2 className="text-3xl font-bold">GROW your business <br/>WITH SupplyChainPro</h2>
                <h2 className="text-3xl font-bold mt-10">Get Started ---&gt;</h2>
        </div>
        <div className=" h-2/2 w-1/2 flex flex-col items-center justify-center ">
        <h2 className="mb-2 text-2xl font-semibold">SignUp</h2>
        <form className="border border-black flex flex-col gap-2 p-4 h-full w-2/4" onSubmit={handleSubmit}>
            <label className="font-semibold ms-1" htmlFor='name'>Name</label>
            <input className="rounded p-1 border border-black" placeholder="enter your name" type='text'  name='name' onChange={handleChange} required />
            <label className="font-semibold ms-1" htmlFor='phone'>Phone</label>
            <input className="rounded p-1 border border-black" placeholder="enter your phone" type='tel'  name='phoneNumber' onChange={handleChange} required />
            <label className="font-semibold ms-1" htmlFor='email'>Email</label>
            <input className="rounded p-1 border border-black" placeholder="enter your email" type='email' name='email' onChange={handleChange} required />
            <label className="font-semibold ms-1" htmlFor='password'>Password</label>
            <input className="rounded p-1 border border-black" placeholder="enter your password" type='password'  name='password' onChange={handleChange} required />
            <span className="flex items-center gap-2">
            <input type="checkbox" className="border border black rounded p-1 h-10"   name="terms" required />
             <p className="text-sm text-blue-500">Accept Terms and Conditions</p>
            </span>
            {message && <p className="text-red-500">{message}</p>}
            <button type='submit' className='bg-blue-500 text-white font-semibold p-2 rounded mt-2'>Signup</button>
        </form>
        </div>
    </div>
    {/* <Footer/> */}
    </>
  )
}

export default SignupFarmer