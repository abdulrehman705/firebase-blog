"use client";

import Image from "next/image";
import Google from "@/assets/icons/google.svg";
import Logo from "@/assets/images/blogLogo.png";
import SocialSignInButton from "./SocialSignInButton";

const Login = () => {
  const socialSignInButtons = [{ icon: Google, text: "Continue with Google" }];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg px-6 py-8 bg-white shadow-lg rounded-lg sm:px-8">
        <div>
          <div className="flex justify-center py-6 md:py-8">
            <Image
              src={Logo}
              width={150}
              height={150}
              alt="Logo"
              className="w-24 h-24 md:w-40 md:h-40 bg-transparent"
            />
          </div>
          <div className="pb-6 text-center text-xl font-medium text-black md:text-2xl">
            Welcome to My Blog App
          </div>
          <div className="py-4 md:py-7">
            {socialSignInButtons.map(({ icon, text }) => (
              <SocialSignInButton
                key={text}
                icon={icon}
                text={text}
                className="my-2 w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white p-3 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 disabled:opacity-50"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
