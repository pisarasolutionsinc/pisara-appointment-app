import { ReactNode, useRef } from "react";
import { FaFile } from "react-icons/fa6"; // Default icon
import { twMerge } from "tailwind-merge";

interface FileImportProps {
  className?: string;
  icon?: ReactNode;
}

const FileImport = ({ className, icon = <FaFile /> }: FileImportProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center p-6 border border-dashed border-accent rounded-lg bg-light shadow-lg cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      {/* Render the passed or default icon */}
      <div className="text-primary text-6xl mb-4">{icon}</div>
      <h1 className="text-dark font-semibold text-lg mb-2">
        Select file to import
      </h1>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) {
            console.log(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};

export default FileImport;
