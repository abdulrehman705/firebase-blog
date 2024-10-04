import User from "@/assets/icons/user.svg";
import Calendar from "@/assets/icons/calendar.svg";
import Clock from "@/assets/icons/clock.svg";
import Image from "next/image";
import { getBlogAgainstId } from "@/actions";

const BlogDetails = async ({ id: BlogId }: { id: string }) => {
  const post = await getBlogAgainstId(BlogId);
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4">
          <div className="flex items-center">
            <Image
              src={User}
              alt="user"
              className="h-5 w-5 mr-2 text-gray-400"
            />
            <span>{post.userName}</span>
          </div>
          <div className="flex items-center">
            <Image
              src={Calendar}
              alt="publish time"
              className="h-5 w-5 mr-2 text-gray-400"
            />
            <time dateTime={post.time}>
              {new Date(post.time).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center">
            <Image
              src={Clock}
              alt="read time"
              className="h-5 w-5 mr-2 text-gray-400"
            />
            <span>{post.totalReadTime}</span>
          </div>
        </div>
      </header>

      <div className="mb-8">
        <img
          src={post.image}
          alt={`Cover image for ${post.title}`}
          width={800}
          height={400}
          className="rounded-lg shadow-lg object-cover w-full h-64 sm:h-96"
        />
      </div>

      <div className="prose prose-lg max-w-none">
        <p>{post.description}</p>
      </div>
    </article>
  );
};

export default BlogDetails;
