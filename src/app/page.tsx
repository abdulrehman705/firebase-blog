"use client";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

// export async function getServerSideProps() {
//   const posts = await ok();
//   return { props: { posts } };
// }

export const Blog = ({ posts }: any) => {
  return (
    <div className="container mx-auto">
      <h1>Blog Posts</h1>
      <button onClick={() => ok()}>Post Blog</button>
      <ul>
        {posts?.map((post: any) => (
          <li key={post.id}>
            <a href={`/blog/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// async function getPostsFromFirestore() {
//   const snapshot = await db.collection("posts").get();
//   const posts = snapshot.docs.map((doc: any) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   return posts;
// }
const ok = async () => {
  await addDoc(collection(db, "Blog"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
};
