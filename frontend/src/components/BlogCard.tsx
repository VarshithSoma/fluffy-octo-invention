interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="p-8 border-b border-slate-400">
      <div className="flex items-center">
        <Avatar name={authorName} size={8}></Avatar>
        <div className="ml-2 text-sm "> {authorName}</div>
        <div className="ml-2 text-sm text-slate-500">{publishedDate}</div>
      </div>
      <div className="font-bold text-2xl">{title}</div>
      <div className="text-slate-500">{content.slice(0, 150) + "..."}</div>
      <div
        className="
        text-sm
        text-slate-400"
      >{`${Math.ceil(content.length / 1000)} minutes`}</div>
    </div>
  );
};
interface avatarProps {
  name: string;
  size: number;
}
export function Avatar(props: avatarProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-${props.size} h-${props.size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {props.name[0]}
      </span>
    </div>
  );
}
