import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";

export const Blog = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>...loading</div>;
  }

  return (
    <>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs.map((el) => (
            <BlogCard
              key={el.id}
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
