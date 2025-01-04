import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { B } from "../components/B";
import { AppBar } from "../components/AppBar";
import { Spinner } from "../components/Spinner";


export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return <Spinner/>;
  }

  if (!blog) {
    return <div>Error: Blog not found</div>;
  }

  return (
    <div  >
            <AppBar />
          
 {/* @ts-ignore */}
 <B blog={blog} />
    </div>
  );
};
