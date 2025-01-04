import { Icon } from "./BlogCard";
import { Link } from "react-router-dom";
export const AppBar = () => {
  return (
    <div className="border-b border-gray-300 bg-white shadow-sm py-4 px-10 flex items-center justify-between">
      {/* Logo or Title */}
     <Link to="/blogs">
     <div className="text-xl font-semibold text-gray-800">
        MyBlog
      </div></Link>

      {/* User Icon */}
   <div className="flex items-center gap-6 px-4">
   <Link to={'/add'}>
   <button
             
             className="text-lg font-bold px-3 py-1.5 ml-2 text-white bg-green-500 rounded"
           >
             +
           </button></Link>
     <div>
       <Icon name="deepansh" />
     </div>
   </div>
    </div>
  );
};
