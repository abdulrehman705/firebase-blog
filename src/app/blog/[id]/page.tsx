"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { BlogPost } from "@/types";

const BlogDetails = (params: { id: any }) => {
  const { id: BlogId } = params;
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (BlogId) {
        const postRef = doc(db, "Blog", BlogId);
        const postSnapshot = await getDoc(postRef);

        if (postSnapshot.exists()) {
          setPost({ id: postSnapshot.id, ...postSnapshot.data() } as BlogPost);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchPost();
  }, [BlogId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500">Publish by {post.userName}</p>
      <p className="text-gray-400">
        at this time {new Date(post.time).toLocaleString()}
      </p>
      <p className="text-gray-500"> {post.totalReadTime} min Read</p>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover mb-4"
        />
      )}
      <p className="text-gray-700">{post.description}</p>
    </div>
  );
};

export default BlogDetails;
