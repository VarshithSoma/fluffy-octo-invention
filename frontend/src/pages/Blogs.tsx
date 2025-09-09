import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <>
        <Appbar />
        <div className="w-full mx-auto max-w-6xl">
          <div className="flex flex-col justify-around gap-10 m-10">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
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
      <div>
        <div>
          {blogs.map((el) => (
            <BlogCard
              key={el.id}
              id={el.id}
              authorName={el.author.name}
              title={el.title}
              content={el.content}
              publishedDate={el.date}
            />
          ))}
        </div>
      </div>
    </>
  );
};
