import { Appbar } from "../components/Appbar"
import { Blogcard } from "../components/Blogcard"
import { useBlogs} from "../hooks"

import { BlogSkeleton } from "../components/BlogSkelton"
export const Blogs =()=>{
     const{loading,blogs}=useBlogs();
     
    if (loading) {
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
        <div className="flex justify-center">
  <div className="max-w-3xl">
    {blogs
      .slice() // Create a shallow copy of the array to avoid mutating the original array
      .reverse() // Reverse the order of the blogs
      .map(blog => (
        <Blogcard 
          key={blog.id} // It's a good practice to add a key prop for list items
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