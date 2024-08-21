'use client'
import { useState, useEffect } from "react";
import Pixel from "@/components/Pixel";
import toast from "react-hot-toast";

export default function Home() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pixelSize = 16;
  const numPixels = Math.floor(windowSize.width / pixelSize) * Math.floor(windowSize.height / pixelSize);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "p") {
        const canvas = document.createElement("canvas");
        canvas.width = windowSize.width;
        canvas.height = windowSize.height;

        const context = canvas.getContext("2d");
        if (context) {
          context.fillStyle = "black";
          context.fillRect(0, 0, windowSize.width, windowSize.height);

          const pixels = document.querySelectorAll(".bg-white");
          pixels.forEach((pixel) => {
            const { x, y } = pixel.getBoundingClientRect();
            context.fillStyle = "white";
            context.fillRect(x, y, pixelSize, pixelSize);
          });

          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "pixel-art.png";
          link.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [windowSize]);

  useEffect(() => {
    toast("Press 'p' to download your pixel art!", {
      icon: "🎨",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      position: "top-right",
      duration: 25000,
    });

    toast("Hover over the pixels to color them white!", {
      icon: "🖌️",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    toast("Left click to disable hover!", {
      icon: "🖱️",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      position: "top-center",
    });

  }, []);

  return (
    <main className="flex flex-wrap p-0 m-0">
      {Array.from({ length: numPixels }).map((_, index) => (
        <Pixel key={index} />
      ))}
    </main>
  );
}