import { Link } from "react-router-dom";

interface BlogcardProps{
    id:number
     authorName:string;
     title:string;
     content:string;
     publishDate:string
}

export const Blogcard=({
    id,
    authorName,
    title,
    content,
    publishDate
}:BlogcardProps)=>{
   return <Link to={`/blog/${id}`}>
   <div className="border-b border-slate-200 p-4 pb-4 w-screen cursor-pointer">
     <div className="flex"> 
        <div className="flex justify-center flex-col"><Avatar name={authorName}/></div>
        
        <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName} </div>
          <div className="flex justify-center flex-col pl-2 ">
            <Circle />
            </div>
        <div className=" pl-2 font-thin text-slate-400 text-sm flex justify-center flex-co">{ publishDate}</div>
        
                
     </div>
     <div className="text-xl font-semibold pt-2">
        {title}
     </div>

     <div className="text-md font-thin">
          {content.slice(0,100)+ "...."}
     </div>
     <div className="text-slate-400 text-sm font-thin pt-3">
        {`${Math.ceil(content.length /100)} minute(s) read`}
     </div>
        
   </div> 
   </Link>
}
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