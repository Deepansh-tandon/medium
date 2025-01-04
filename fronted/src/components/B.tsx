import { Blog } from "../hooks";
import { AppBar } from "./AppBar";

export const B = ({ blog }: { blog: Blog }) => {
  return (
    <div className="h-full bg-gray-100">
  
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Blog Content */}
          <div className="lg:col-span-8">
            <h1 className="text-2xl sm:text-4xl font-extrabold mb-4">
              {blog.title}
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Posted on August 24, 2023
            </p>
            <p className="text-gray-800 text-base leading-7">{blog.content}</p>
          </div>

          {/* Right Column: Author Info */}
          <div className="lg:col-span-4 bg-gray-200 p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-3">Author</h2>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold">
                {blog.author.name ? blog.author.name[0].toUpperCase() : "A"}
              </div>
              <span className="text-gray-700">
                {blog.author.name || "Anonymous"}
              </span>
            </div>
            <p className="text-gray-600 text-sm mt-3">
              Master of mirth, purveyor of puns, and the funniest person in the
              kingdom.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
