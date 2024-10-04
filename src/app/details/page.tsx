"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase"; // Adjust the path as necessary
import { doc, getDoc } from "firebase/firestore";

interface BlogPost {
    id: string;
    userName: string;
    title: string;
    description: string;
    image?: string;
    time: string;
    totalReadTime?: string;
}

const BlogDetails = (props: any) => {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    const router = useRouter();
    // const { query } = router; // Access the query parameters
    // const { id } = query; // Destructure the id from query
    const [post, setPost] = useState<BlogPost | null>(null); // State to hold the blog post

    // Fetch blog post details
    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                const postRef = doc(db, "Blog", id as string); // Get a reference to the document
                const postSnapshot = await getDoc(postRef); // Fetch the document

                if (postSnapshot.exists()) {
                    setPost({ id: postSnapshot.id, ...postSnapshot.data() } as BlogPost); // Set the post data
                } else {
                    console.log("No such document!");
                }
            }
        };

        fetchPost();
    }, [id]);

    // Show a loading state while fetching
    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-500">Publish by {post.userName}</p>
            <p className="text-gray-400">at this time {new Date(post.time).toLocaleString()}</p>
            <p className="text-gray-500"> {post.totalReadTime} min Read</p>
            {post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover mb-4" // You can adjust the size as needed
                />
            )}
            <p className="text-gray-700">{post.description}</p>
        </div>
    );
};

export default BlogDetails;
