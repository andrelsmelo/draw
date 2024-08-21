'use client'
import { useState } from "react";
import useHoverStore from "@/context/HoverStore";

export default function Pixel() {
    const [hover, setHover] = useState(false);
    const disableHover = useHoverStore((state) => state.disableHover);
    const toggleDisableHover = useHoverStore((state) => state.toggleDisableHover);

    const handleMouseEnter = () => {
        if (!disableHover) {
            setHover(true);
        }
    };

    const handleMouseClick = () => {
        toggleDisableHover();
    };

    return (
        <div
            className={`w-4 h-4 ${hover ? 'bg-white' : 'bg-black'}`}
            onMouseEnter={handleMouseEnter}
            onClick={handleMouseClick}
        ></div>
    );
}
