import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks";
import { Spinner } from "../components/Spinner";

export const Blogs = () => {
  const { blogs, loading, error } = useBlogs();

  if (loading) {
    return <Spinner/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("Blogs:", blogs);

  return (
    <div>
      <AppBar />
      <div className="flex flex-col items-center space-y-6 w-full px-4 pt-8 sm:px-2">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
            id={blog.id}
              key={blog.id} // Ensure unique keys for React mapping
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishDate="4 Jan 2025"
            />
          ))
        ) : (
          <div>No blogs found.</div>
        )}
      </div>
    </div>
  );
};
