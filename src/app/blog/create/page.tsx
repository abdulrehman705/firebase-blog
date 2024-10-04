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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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

      setLoading(false);
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
                Post Blog{" "}
                {loading && (
                  <div role="status" className="ml-2">
                    <svg
                      aria-hidden="true"
                      className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="white"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="black"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
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
