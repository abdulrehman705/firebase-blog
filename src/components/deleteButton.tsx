"use client";
import { getBlog } from "@/actions";
import { db } from "@/utils/firebase";
import { getUserDetails } from "@/utils/functions";
import { deleteDoc, doc } from "firebase/firestore";

const DeleteButton = (post:any) => {
    const userDetail= getUserDetails()
    const handleDelete = async (id: string) => {
        try {
          const postDocRef = doc(db, "Blog", id);
      
          await deleteDoc(postDocRef);
          alert("Blog deleted successfully!");
          getBlog()
        } catch (error) {
        }
      };
  return (
    <>
    {post?.post?.user_id===userDetail?.uid &&
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
      onClick={()=>handleDelete(post?.post?.id)}
    >
      Delete Post
    </button>
}
</>
  );
};

export default DeleteButton;
