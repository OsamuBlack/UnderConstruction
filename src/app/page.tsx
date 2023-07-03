"use client";

import Image from "next/image";
import Logo from "public/logo.png";
import { useEffect, useState } from "react";

export default function Home() {
  const [mobileImage, setMobileImage] = useState(
    "https://source.unsplash.com/random/1080x1920/?textile"
  );
  const [desktopImage, setDesktopImage] = useState(
    "https://source.unsplash.com/random/1920x1080/?textile"
  );
  const [loads, setLoadCount] = useState(0);
  function handleClick() {
    setLoadCount(loads + 1);
  }

  useEffect(() => {
      async function getPost() {
        const responses = await Promise.all([
          fetch("https://source.unsplash.com/random/1080x1920/?textile", {
            method: "GET",
          }),
          fetch("https://source.unsplash.com/random/1920x1080/?textile", {
            method: "GET",
          }),
        ]);
        setMobileImage(responses[0]?.url);
        setDesktopImage(responses[1]?.url);
      }
    if (loads) getPost();
  }, [loads]);

  return (
    <main className="flex flex-col items-center p-16 relative min-h-screen">
      <picture className="peer">
        <source media="(max-width: 600px)" srcSet={mobileImage} />
        <source media="(min-width: 601px)" srcSet={desktopImage} />
        <Image
          src={mobileImage}
          alt="Random Image"
          fill
          className="object-cover"
        />
      </picture>
      <div className="text-center  peer-hover:opacity-0 p-8 lg:px-32 z-50 text-slate-900 rounded-xl bg-white bg-opacity-60 backdrop-blur-sm border-slate-200 border border-opacity-75 transition-all">
        <Image src={Logo} alt="SNA LOGO" width={400} />
        <h1 className="text-4xl font-bold mt-8">Site under construction</h1>
        <p className="text-2xl mt-4 font-mono">
          Wait for the surprise.
        </p>
        <p>View these images while you are at it.</p>
        <button
          onClick={handleClick}
          className="bg-white rounded py-2 px-4 mt-4 font-bold hover:opacity-90 transition-all"
        >
          Load Another Image
        </button>
      </div>
    </main>
  );
}
