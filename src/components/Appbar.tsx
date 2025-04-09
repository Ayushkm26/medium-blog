import { Avatar } from "./Blogcard"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Appbar=()=>{
    const navigate=useNavigate()
    return <div className= "border-b flex justify-between px-10 py-4">
        <div className=" flex flex-col justify-center">
            <Link to={"/blogs"}>Medium</Link>
        </div>
        <div>
        <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">NewPost</button>
            </Link>
           
                <button  onClick={Logout} type="button" className="mr-4 text-black bg-red-500 hover:bg-slate-400 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Logout</button>
            <Avatar size={"big"} name="Medium" />
        </div>
  
    </div>
    function Logout(){
    
        localStorage.removeItem("token");
        toast.success("Logout Successfully");
             navigate("/signin")

    }
} 

