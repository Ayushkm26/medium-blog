import { SignupInput } from "@ayushmishra9430/medium-common";
import { ChangeEvent, useState } from "react";
import { Link,  useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Auth= ({type}:{type: "signup" | "signin"})=>{
    const navigate=useNavigate();
    const [postInput,setPostInputs]=useState<SignupInput>({
        name :"",
        username:"",
        password:""
    })
   async  function  sendRequest(){
    try{
     const responce=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInput)
     const jwt=responce.data;
     localStorage.setItem("token",jwt)
     navigate("/blogs");
    }catch(e){ 
        //
    }
}

    return <div className=" h-screen flex justify-center flex-col"  >
        <div className="flex justify-center px-3" >
            <div>
        <div className="px-3">
            
        <div className="text-3xl font-extrabold ">
            create an account
        </div>
        <div>
            {type==="signup"?"Already have an account?":"Dont have a account? "}
            <Link className="pl-2 underline" to={type==="signup"?"/signin":"/signup"} >{type==="signup"?"Login":"Signup"}</Link>
        </div>

        <div className="text-3xl font-extrabold ">
            {type==="signup"?<LabelledInput label="Fullname"  placeholder="jhon doe .." onChange={(e)=>{
                setPostInputs({
                    ...postInput,
                    name:e.target.value
                     
                })
            }}/>:null}
              <LabelledInput label="Username"  placeholder="email" onChange={(e)=>{
                setPostInputs({
                    ...postInput,
                    username:e.target.value
                     
                })
            }}/>
              <LabelledInput label="Password" type={"password"} placeholder="....................." onChange={(e)=>{
                setPostInputs({
                    ...postInput,
                    password :e.target.value
                     
                })
            }}/>
              <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-5">{type==="signup"?"SignUp":"SignIn"} </button>

            </div>
            </div>
        </div>
        </div>
    </div>
}
interface LabelledInput{
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type? :string ;
}
function LabelledInput({label,placeholder,onChange,type}:LabelledInput){
    return <div className="w-full max-w-sm min-w-[200px]">
    <label className="block  mt-2 text-sm text-black-600">
        {label}
    </label>
    <input onChange={onChange} type ={type ||"text"} className="w-full bg-transparent placeholder:text-slate-400 text-black-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={placeholder} required/>
  </div>
}  