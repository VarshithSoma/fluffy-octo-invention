import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>...loading</div>;
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
