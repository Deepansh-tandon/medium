import { Link } from "react-router-dom";

interface Props {
    authorName: string;
    title: string;
    content: string;
    publishDate: string;
    id:string
  }
  
  export const BlogCard = ({ authorName, title, content, publishDate,id }: Props) => {
    return (<Link to={`/blog/${id}`} className="w-full max-w-2xl cursor-pointer">
      <div className="w-full max-w-2xl cursor-pointer">
        <div className="border-b border-slate-300 pb-6 mb-6 pt-6 px-6 bg-white shadow-sm rounded-lg">
          {/* Author and Date */}
          <div className="flex items-center space-x-3 mb-3">
            <Icon name={authorName} />
            <div>
              <span className="font-semibold text-gray-700">{authorName}</span>
              <span className="h-2 w-2 rounded-full bg-gray-400 inline-block ml-2"></span>
              <span className="px-2 text-sm text-slate-400">{publishDate}</span>
            </div>
          </div>
  
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 mb-3 overflow-hidden">
  {title.length > 40 ? title.slice(0, 150) + "..." : title}
</h2>

  
          {/* Content Preview */}
          <p className="text-gray-600 text-sm leading-6 mb-3">
            {content.slice(0, 150) + "..."}
          </p>
  
          {/* Read Time */}
          <p className="text-sm text-gray-500">
            {`${Math.ceil(content.length / 100)} minute${
              content.length > 100 ? "s" : ""
            } read`}
          </p>
        </div>
      </div></Link>
    );
  };
  
  export function Icon({ name }: { name: string }) {
    return (
      <div className="relative inline-flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
        <span className="text-gray-700 font-medium">{name[0].toUpperCase()}</span>
      </div>
    );
  }
  