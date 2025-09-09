import { useBlog } from "../hooks";
import { Avatar } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blog = () => {
  const { loading, blog } = useBlog();
  if (loading) {
    return (
      <>
        <Appbar />
        <div className="w-full mx-auto max-w-6xl">
          <div className="flex flex-col justify-around gap-10 m-10">
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Appbar />
      <div className="mx-auto max-w-5xl my-10 px-4">
        <div className="grid grid-rows-3 md:grid-cols-3 gap-10">
          <div className="col-span-2 space-y-5">
            <h1 className="font-bold text-4xl">{blog?.title}</h1>
            <p className="text-slate-600 leading-relaxed">{blog?.content}</p>
          </div>
          <div className="col-span-1 p-5">
            <div className="mb-4 text-lg font-semibold">Author</div>
            <div className="flex items-center space-x-4">
              <Avatar authorName={blog?.author.name || ""} size={12} />
              <div className="flex flex-col">
                <span className="font-bold">{blog?.author.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
