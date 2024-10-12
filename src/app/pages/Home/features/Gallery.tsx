import { useState } from "react";
import Button from "../../../components/buttons/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { APP_CONSTANTS } from "../../../config/config";

interface GalleryProps {
  images: string[];
}

const Gallery = ({ images }: GalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Prevent currentIndex from exceeding the bounds of the images array
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Early return if there are no images
  if (!images || images.length === 0) {
    return <div>No images available</div>; // Handle empty images array
  }

  return (
    <>
      <div className="flex justify-center gap-5 w-full 2xl:w-3/4 max-h-[90vh]">
        <Button
          onClick={prevImage}
          className="hidden md:block h-fit self-center p-5 rounded-full border-4 border-primary hover:bg-primary hover:text-white transition"
          aria-label={APP_CONSTANTS.BUTTONS.BACK}
        >
          <IoIosArrowBack className="text-3xl" />
        </Button>

        <img
          src={images[currentIndex]} // This should be safe now
          alt={`Image ${currentIndex + 1}`}
          className="flex-grow w-[300px] h-[70vh] md:h-[80vh] object-cover rounded-xl shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "path/to/fallback-image.jpg"; // Fallback image
          }}
        />

        <div className="flex gap-5">
          {[1, 2].map((offset) => (
            <img
              key={offset}
              src={images[(currentIndex + offset) % images.length]}
              alt={`Thumbnail ${offset}`}
              className="w-[150px] flex-grow object-cover rounded-xl shadow-md transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={() =>
                handleImageClick((currentIndex + offset) % images.length)
              }
            />
          ))}
        </div>

        <Button
          onClick={nextImage}
          className="hidden md:block h-fit self-center p-5 rounded-full border-4 border-primary hover:bg-primary hover:text-white transition"
          aria-label={APP_CONSTANTS.BUTTONS.NEXT}
        >
          <IoIosArrowForward className="text-3xl" />
        </Button>
      </div>

      <div className="flex items-center gap-5">
        <Button
          onClick={prevImage}
          className="md:hidden h-fit self-center p-5 rounded-full border-4 border-primary hover:bg-primary hover:text-white transition"
          aria-label={APP_CONSTANTS.BUTTONS.BACK}
        >
          <IoIosArrowBack className="text-lg md:text-3xl" />
        </Button>
        <Button
          onClick={nextImage}
          className="md:hidden h-fit self-center p-5 rounded-full border-4 border-primary hover:bg-primary hover:text-white transition"
          aria-label={APP_CONSTANTS.BUTTONS.NEXT}
        >
          <IoIosArrowForward className="text-lg md:text-3xl" />
        </Button>
      </div>
    </>
  );
};

export default Gallery;
