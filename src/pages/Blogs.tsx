import { Appbar } from "../components/Appbar"
import { Blogcard } from "../components/Blogcard"
import { useBlogs} from "../hooks"
import { BlogSkeleton } from "../components/BlogSkelton"
export const Blogs =()=>{
     const{loading,blogs}=useBlogs();
     
    if (loading ) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>  
        <Appbar />
       <div className=" flex justify-center">
           
  <div className="max-w-4xl">
    {blogs
      .slice() 
      .reverse() 
      .map(blog => (
        <Blogcard 
          key={blog.id} 
          id={blog.id}
          authorName={blog.author.name || "anonymous"}
          title={blog.title}
          content={blog.content}
          publishDate={blog.publishedDate}
          imageurl={blog.imageurl}
        />
      ))}

    
  
    </div>
    </div>
    </div>
}