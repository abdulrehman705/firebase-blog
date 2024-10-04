"use client";
import { useState, useCallback, useMemo } from "react";
import { db, storage } from "@/utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { PayloadData } from "@/types";
import { getUserDetails } from "@/utils/functions";

const Blog = () => {
  const router = useRouter();
  const userDetail = useMemo(() => getUserDetails(), []);

  const [formData, setFormData] = useState<PayloadData>({
    title: "",
    description: "",
    image: null,
    totalReadTime: "",
  });

  const [readTime, setReadTime] = useState<number | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        const file = e.target.files[0];
        setFormData((prevData) => ({ ...prevData, image: file }));

        const start = performance.now();
        const reader = new FileReader();
        reader.onload = () => {
          const end = performance.now();
          setReadTime(end - start);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const overallStart = performance.now();

    try {
      let imageURL = "";

      if (formData.image) {
        const imageRef = ref(storage, `blogImages/${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        imageURL = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "Blog"), {
        user_id: userDetail?.uid,
        userName: userDetail?.displayName,
        useProfilePicture: userDetail?.photoURL,
        title: formData.title,
        description: formData.description,
        time: new Date().toISOString(),
        ...(imageURL && { image: imageURL }),
        totalReadTime:
          formData.totalReadTime ||
          `${(performance.now() - overallStart).toFixed(2)} ms`,
      });

      setFormData({
        title: "",
        description: "",
        image: null,
        totalReadTime: "",
      });

      alert("Blog post added successfully!");
      router.push("/");

      if (readTime !== null) {
        console.log(`Blob Read Time: ${readTime.toFixed(2)} ms`);
      }
    } catch (error) {
      console.error("Error uploading image or saving blog post: ", error);
      alert("Failed to upload blog post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
            Create Blog
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Blog title"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleInputChange}
                value={formData.title}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                required
                placeholder="Blog description"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleInputChange}
                value={formData.description}
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
            </div>
            <div>
              <label
                htmlFor="totalReadTime"
                className="block text-sm font-medium text-gray-700"
              >
                Read Time (in minutes)
              </label>
              <input
                type="number"
                name="totalReadTime"
                placeholder="Enter total read time in min"
                id="totalReadTime"
                required
                min="1"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleInputChange}
                value={formData.totalReadTime}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Post Blog
              </button>
            </div>
          </form>
          <div className="mt-6">
            <button
              onClick={() => router.push("/")}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
