import { Avatar } from "./BlogCard";
export function Appbar() {
  return (
    <div className="flex justify-between px-10 py-5 border-b border-slate-200">
      <div className="flex flex-col justify-center">Medium</div>
      <Avatar authorName="Varshith" size={10} />
    </div>
  );
}
