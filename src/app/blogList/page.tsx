"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface BlogPost {
    id: string;
    userName: string;
    title: string;
    description: string;
    image?: string;
    time: string;
    totalReadTime?: string
}

const BlogList = () => {
    const router = useRouter()
    const [posts, setPosts] = useState<BlogPost[]>([]);

    const getBlog = async () => {
        const querySnapshot = await getDocs(collection(db, "Blog"));
        const blogPosts: BlogPost[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data() as BlogPost;
            blogPosts.push({ id: doc.id, ...data });
        });

        setPosts(blogPosts);
    };
    const handleCardClick = (post: BlogPost) => {
        router.push(`/details?id=${post.id}`);
    };

    useEffect(() => {
        getBlog();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post.id} className="border p-4 shadow-lg flex flex-col" onClick={() => handleCardClick(post)}>
                        {post.image && (
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-64 object-cover mb-2"
                            />
                        )}
                        <div className="mb-2">
                            <h2 className="text-xl font-bold">{post.title}</h2>
                            <p className="text-gray-500">by {post.userName}</p>
                            <p className="text-gray-500"> {post.totalReadTime}min Read</p>
                            <p className="text-gray-400">{new Date(post.time).toLocaleString()}</p>
                        </div>
                        <p className="text-gray-700">{post.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
