import React from "react";
import { Loader2 } from "lucide-react";

/**
 * A shared, smooth loading component.
 * It centers itself in the available space.
 */
const Loader: React.FC<{ fullScreen?: boolean; text?: string }> = ({
    fullScreen = false,
    text = "Loading...",
}) => {
    const containerClasses = fullScreen
        ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fdfbf7]"
        : "flex flex-col items-center justify-center py-20 bg-[#fdfbf7]";

    return (
        <div className={containerClasses}>
            <div className="relative">
                <div className="absolute inset-0 rounded-full animate-ping bg-[#4a3728]/10"></div>
                <Loader2 className="w-10 h-10 text-[#4a3728] animate-spin relative z-10" />
            </div>
            <p className="mt-4 text-[#4a3728] font-serif text-lg tracking-wider animate-pulse">
                {text}
            </p>
        </div>
    );
};

export default Loader;
