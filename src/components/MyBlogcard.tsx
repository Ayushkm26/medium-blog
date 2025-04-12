import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import { BACKEND_URL } from "../config";



interface MyBlogcardProps{
    id:number
     authorName:string;
     title:string;
     content:string;
     publishDate:string
     imageurl:string
}

export const MyBlogcard=({
    
    id,
    authorName,
    title,
    content,
    publishDate,
    imageurl
}:MyBlogcardProps)=>{
   return (<>
   <Link to={`/blog/${id}`}>
   <div className="border-b border-slate-200 p-4 pb-4 w-screen cursor-pointer">
  <div className="flex"> 
    <div className="flex justify-center flex-col">
      <Avatar name={authorName} />
    </div>
    
    <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
      {authorName}
    </div>
    
    <div className="flex justify-center flex-col pl-2">
      <Circle />
    </div>
    
    <div className="pl-2 font-thin text-slate-400 text-sm flex justify-center flex-col">
      {publishDate}
    </div>
  </div>

  <div className="flex items-center pt-2">
    <div className="text-xl font-semibold">
      {title}
    </div>
    
    {imageurl && (
      <img src={imageurl} alt="" className="ml-4 rounded-lg shadow-md w-32 h-auto" />
    )}
  </div>

  <div className="text-md font-thin">
    {content.slice(0, 100) + "...."}
  </div>

  <div className="text-slate-400 text-sm font-thin pt-3">
    {`${Math.ceil(content.length / 100)} minute(s) read`}
    <div>

    </div>
  </div>
</div>
   </Link>
       <button onClick={()=>delBlog(id)}  type="button" className="mr-4 mt-2 text-black bg-blue-600 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-600 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2 ">Delete Post</button>
</>
)}
export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-400 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-white-600`}>
        {name[0]}
    </span>
</div>
}
export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}
export const delBlog = async (id: number) => {
    

    try {
        await axios.delete(`${BACKEND_URL}/api/v1/blog/delblog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }) 
        
        toast.success("Blog deleted successfully!");
        location.reload();
    } catch (error) {
        toast.error("Error deleting the blog.");
        throw error; 
    }
};