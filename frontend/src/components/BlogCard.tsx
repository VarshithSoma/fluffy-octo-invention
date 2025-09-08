import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}
export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  console.log(authorName, title, content);
  return (
    <Link to={`/blogs/${id}`}>
      <div className="mx-auto max-w-3xl border-b border-slate-200 p-8">
        <div className="flex items-center">
          <Avatar authorName={authorName} size={10} />
          <div className="ml-2 text-sm">{authorName}</div>
          <div className="ml-2 text-sm text-slate-500">{publishedDate}</div>
        </div>
        <div className="mt-2 text-2xl font-bold">{title}</div>
        <div className="mt-1 text-slate-500">
          {content.slice(0, 150) + "..."}
        </div>
        <div className="mt-2 text-sm text-slate-400">
          {`${Math.ceil(content.length / 1000)} minutes`}
        </div>
      </div>
    </Link>
  );
};
interface avatarProps {
  authorName: string;
  size: number;
}
export function Avatar(props: avatarProps) {
  console.log(props);
  return (
    <div
      className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {props.authorName != null && props.authorName.length > 0
          ? props.authorName[0]
          : "?"}
      </span>
    </div>
  );
}
