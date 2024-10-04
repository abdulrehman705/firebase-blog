"use client";
import { db } from "@/utils/firebase";
import { getUserDetails } from "@/utils/functions";
import Delete from "@/assets/icons/delete.svg";
import { deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";

const DeleteButton = (post: any) => {
  const userDetail = getUserDetails();
  const handleDelete = async (id: string) => {
    try {
      const postDocRef = doc(db, "Blog", id);

      await deleteDoc(postDocRef);
      alert("Blog deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <>
      {post?.post?.user_id === userDetail?.uid && (
        <button onClick={() => handleDelete(post?.post?.id)}>
          <Image src={Delete} alt="delete" width={20} height={20} />
        </button>
      )}
    </>
  );
};

export default DeleteButton;
