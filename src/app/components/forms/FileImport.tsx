import { ReactNode, useRef } from "react";
import { FaFile } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

interface FileImportProps {
  className?: string;
  icon?: ReactNode;
  onFileUpload?: (files: File | File[]) => void; // Accept single file or an array of files
  accept?: string;
  multiple?: boolean; // New prop to control multiple uploads
}

const FileImport = ({
  className,
  icon = <FaFile />,
  onFileUpload,
  accept = "image/*",
  multiple = false, // Default to false for single upload
}: FileImportProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      if (multiple) {
        const filesArray = Array.from(e.target.files); // Convert FileList to array
        console.log(filesArray);
        if (onFileUpload) {
          onFileUpload(filesArray); // Pass the array of files
        }
      } else {
        const file = e.target.files[0]; // Get the single file
        console.log(file);
        if (onFileUpload) {
          onFileUpload(file); // Pass the single file
        }
      }
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
        Select {multiple ? "files" : "file"} to import
      </h1>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={accept} // Use the dynamic accept prop
        onChange={handleFileChange} // Handle file change event
        multiple={multiple} // Set multiple based on prop
      />
    </div>
  );
};

export default FileImport;
