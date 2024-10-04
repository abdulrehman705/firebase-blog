"use client";
import { auth, signOut } from "@/utils/firebase";

const Button = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      document.cookie = "access_token=; path=/";
      localStorage.clear();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Button;
