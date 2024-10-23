import { ReactNode, useRef } from "react";
import { FaFile } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

interface FileImportProps {
  className?: string;
  icon?: ReactNode;
  onFileUpload?: (files: File | File[]) => void;
  accept?: string;
  multiple?: boolean;
}

const FileImport = ({
  className,
  icon = <FaFile />,
  onFileUpload,
  accept = "image/*",
  multiple = false,
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
        const filesArray = Array.from(e.target.files);
        console.log(filesArray);
        if (onFileUpload) {
          onFileUpload(filesArray);
        }
      } else {
        const file = e.target.files[0];
        console.log(file);
        if (onFileUpload) {
          onFileUpload(file);
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
        accept={accept}
        onChange={handleFileChange}
        multiple={multiple}
      />
    </div>
  );
};

export default FileImport;
