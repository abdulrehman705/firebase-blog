import { getBlog } from "@/actions";
import Image from "next/image";
import User from "@/assets/icons/user.svg";
import Header from "@/components/header";
import Link from "next/link";

const Blogs = async () => {
  const posts = await getBlog();

  return (
    <>
      <Header />
      {posts?.map((post) => (
        <Link href={`/blog/${post.id}`} key={post.id}>
          <div
            key={post.id}
            className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden my-10"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Image
                  src={User}
                  alt="user"
                  className="h-6 w-6 text-gray-400 mr-2"
                />
                <span className="text-sm text-gray-600 font-medium">
                  {post.userName}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">
                      {new Date(post.time).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                    <div className="flex items-center mr-4">
                      <span>{post.totalReadTime} min Read</span>
                    </div>
                  </div>
                </div>
                {post.image && (
                  <div className="flex-shrink-0">
                    <img
                      src={post.image}
                      alt="Blog post illustration"
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Blogs;
