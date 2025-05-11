import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog {
    "content": string;
    "title": string;
    "id": number;
    "publishedDate":string
    "imageurl":string
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog | null>(null)
    const [error, setError] = useState<string | null>(null)
  
    useEffect(() => {
      const controller = new AbortController()
  
      const fetchBlog = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
              Authorization: localStorage.getItem("token") || "",
            },
            signal: controller.signal,
          })
          setBlog(response.data.blog)
        } catch (err: any) {
          if (axios.isCancel(err)) {
            console.log("Fetch cancelled")
          } else {
            console.error(err)
            setError("Failed to fetch blog")
          }
        } finally {
          setLoading(false)
        }
      }
  
      fetchBlog()
  
      return () => {
        controller.abort()
      }
    }, [id])
  
    return {
      loading,
      blog,
      error,
    }
  }
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}


export const userMultipleBlog = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setmyBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        
        axios.get(`${BACKEND_URL}/api/v1/blog/user/blog`, {
            headers: {
                Authorization: localStorage.getItem("token")
            },
            
        })
            .then(response => {
                setmyBlogs(response.data.blog);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching blog:', error);
                setLoading(false);
            });
    }, []);

    return {
        loading,
        blogs
    };
};


 