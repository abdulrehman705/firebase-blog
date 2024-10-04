import { BlogPost } from "@/types";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getBlog = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Blog"));
    return querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as BlogPost;
    });
  } catch (error) {
    console.log("Error", error);
  }
};
