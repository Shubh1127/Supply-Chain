// import Footer from "../Footer"
import Header from "../../Header"

const SignupFarmer = () => {
  return (
    <>
    <Header/>
    <div className="h-screen w-screen content-center flex items-center justify-center bg-blue-700">
        <div className="h-1/2  w-1/2 flex flex-col gap-1 items-center justify-center bg-green-500">
                <h2 className="text-3xl font-bold">GROW your business <br/>WITH SupplyChainPro</h2>
                <h2 className="text-3xl font-bold mt-10">Get Started ---&gt;</h2>
        </div>
        <div className=" h-1/2 w-1/2 flex items-center justify-center bg-red-500">
        <form className="bg-green-500 flex flex-col gap-2 p-4 h-full w-2/4">
            <label className="font-semibold ms-1" htmlFor='name'>Name</label>
            <input className="rounded p-1" placeholder="enter your name" type='text' id='name' name='name' required />
            <label className="font-semibold ms-1" htmlFor='phone'>Phone</label>
            <input className="rounded p-1" placeholder="enter your phone" type='tel' id='phone' name='phone' required />
            <label className="font-semibold ms-1" htmlFor='email'>Email</label>
            <input className="rounded p-1" placeholder="enter your email" type='email' id='email' name='email' required />
            <label className="font-semibold ms-1" htmlFor='password'>Password</label>
            <input className="rounded p-1" placeholder="enter your password" type='password' id='password' name='password' required />
            <button type='submit' className='bg-blue-500 text-white font-semibold p-2 rounded mt-2'>Signup</button>
        </form>
        </div>
    </div>
    {/* <Footer/> */}
    </>
  )
}

export default SignupFarmer