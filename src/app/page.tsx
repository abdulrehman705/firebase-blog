"use client";
import { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

const Blog = () => {
  const [formData, setFormData] = useState({
    userName: "",
    title: "",
    description: "",
    image: null,
    totalReadTime: "", // State to store total read time
  });
  const router = useRouter();

  const [imageURL, setImageURL] = useState("");
  const [readTime, setReadTime] = useState<number | null>(null); // State to track Blob read time

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));

      const start = performance.now(); // Start time measurement

      const reader = new FileReader();
      reader.onload = () => {
        const end = performance.now(); // End time measurement
        setReadTime(end - start); // Set the read time in milliseconds
      };
      reader.readAsDataURL(file); // Read the file as Data URL
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const overallStart = performance.now(); // Start overall time measurement

    try {
      let imageURL = "";

      if (formData.image) {
        const imageRef = ref(storage, `blogImages/${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        imageURL = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "Blog"), {
        userName: formData.userName,
        title: formData.title,
        description: formData.description,
        time: new Date().toISOString(),
        ...(imageURL && { image: imageURL }),
        totalReadTime: formData.totalReadTime || `${(performance.now() - overallStart).toFixed(2)} ms`, // Save total read time
      });

      setFormData({ userName: "", title: "", description: "", image: null, totalReadTime: "" });
      alert("Blog post added successfully!");
      router.push("/blogList");

      // Log the read time to console
      if (readTime !== null) {
        console.log(`Blob Read Time: ${readTime.toFixed(2)} ms`);
      }
    } catch (error) {
      console.error("Error uploading image or saving blog post: ", error);
      alert("Failed to upload blog post. Please try again.");
    }
  };

  return (
    <div className="container mx-auto">
      <h1>Blog Posts</h1>

      <form onSubmit={handleSubmit} className="my-4">
        <div>
          <label>User Name:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            required
            className="border p-2 my-2 w-full"
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="border p-2 my-2 w-full"
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="border p-2 my-2 w-full"
          />
        </div>
        <div>
          <label>Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 my-2 w-full"
          />
        </div>
        <div>
          <label>Total Read Time (ms):</label>
          <input
            type="text"
            name="totalReadTime"
            value={formData.totalReadTime}
            onChange={handleInputChange}
            placeholder="Enter total read time in ms"
            className="border p-2 my-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 my-2 w-full">
          Post Blog
        </button>
      </form>

      <button onClick={getBlog} className="bg-green-500 text-white p-2 mt-4">
        Get Blog Data
      </button>

      {readTime !== null && (
        <p>Blob Read Time: {readTime.toFixed(2)} ms</p> // Display read time
      )}
    </div>
  );
};

const getBlog = async () => {
  const querySnapshot = await getDocs(collection(db, "Blog"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    console.log("Blog data:", data);
  });
};

export default Blog;
