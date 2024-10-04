import { BlogPost } from "@/types";
import { db } from "@/utils/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

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

export const getBlogAgainstId = async (id: string) => {
  if (id) {
    const postRef = doc(db, "Blog", id);
    const postSnapshot = await getDoc(postRef);

    if (postSnapshot.exists()) {
      return { id: postSnapshot.id, ...postSnapshot.data() } as BlogPost;
    } else {
      console.log("No such document!");
    }
  }
};
