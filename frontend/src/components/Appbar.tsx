import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
export function Appbar() {
  return (
    <div className="flex justify-between px-10 py-5 border-b border-slate-200 align-center">
      <div className="flex h-max flex-col items-center justify-center">
        <div className="mt-2">
          <Link to="/blogs">Medium</Link>
        </div>
      </div>
      <div>
        <Link to="/publish">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mr-5 cursor-pointer"
          >
            New Blog
          </button>
        </Link>

        <Avatar authorName="Varshith" size={10} />
      </div>
    </div>
  );
}
