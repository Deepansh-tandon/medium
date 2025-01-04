import { useEffect, useState } from "react";
import axios from "axios";
import { BU } from "../config";

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string | null;
  };
}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const token = localStorage.getItem("Authorization");
        
          
          const response = await axios.get(`${BU}/api/v1/blogs/bulk/a`, {
            headers: {
              Authorization: token || "",
            },
          });
  
          console.log("API Response:", response.data);
  
          if (Array.isArray(response.data)) {
            setBlogs(response.data); // Directly set the array
          } else {
            console.warn("Unexpected response format:", response.data);
            setBlogs([]);
          }
        } catch (err) {
          console.error("Error fetching blogs:", err);
          setError("Failed to fetch blogs.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchBlogs();
    }, []);
  
    return { blogs, loading, error };
  };
  
export const useBlog=({id}:{id:string})=>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog[]>([]);
  

    useEffect(()=>{
        axios.get(`${BU}/api/v1/blogs/${id}`,
{            headers: {
                Authorization: localStorage.getItem("Authorization")
              }}
        ).then(response=>{
            setBlog(response.data);
            setLoading(false)
        })
    },[id])
 return {
    blog,
    loading
 }
}