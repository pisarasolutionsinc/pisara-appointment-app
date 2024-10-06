import { useState } from "react";
import Button from "../../../components/buttons/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { APP_CONSTANTS } from "../../../config/config";

interface GalleryProps {
  images: string[]; 
}

const Gallery = ({ images }: GalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const largeImageIndex = currentIndex;
  const smallImageIndexes = [
    (currentIndex + 1) % images.length,
    (currentIndex + 2) % images.length,
  ];

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {/* Main Image Gallery */}
      <div className="flex justify-center gap-5 w-full 2xl:w-3/4 max-h-[90vh]">
        {/* Prev Button (Hidden on Mobile) */}
        <Button
          onClick={prevImage}
          className="hidden md:block h-fit self-center p-5 rounded-full border-4 border-primary hover:bg-primary hover:text-white transition"
          ariaLabel={APP_CONSTANTS.BUTTONS.BACK}
        >
          <IoIosArrowBack className="text-3xl" />
        </Button>

        {/* Large Image with Transition */}
        <img
          src={images[largeImageIndex]}
          alt={`Image ${largeImageIndex + 1}`}
          className="flex-grow w-[300px] h-[70vh] md:h-[80vh] object-cover rounded-xl shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105" // Added transition for smooth scale effect
        />

        {/* Small Images with Click Event */}
        <div className="flex gap-5">
          {smallImageIndexes.map((index) => (
            <img
              key={index}
              src={images[index]}
              alt={`Image ${index + 1}`}
              className="w-[150px] flex-grow object-cover rounded-xl shadow-md transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer" // Added cursor-pointer for click interaction
              onClick={() => handleImageClick(index)} 
            />
          ))}
        </div>

        {/* Next Button (Hidden on Mobile) */}
        <Button
          onClick={nextImage}
          className="hidden md:block h-fit self-center p-5 rounded-full border-4 border-primary hover:bg-primary hover:text-white transition"
          ariaLabel={APP_CONSTANTS.BUTTONS.NEXT}
        >
          <IoIosArrowForward className="text-3xl" />
        </Button>
      </div>

      {/* Mobile Buttons */}
      <div className="flex items-center gap-5">
        <Button
          onClick={prevImage}
          className="md:hidden h-fit self-center p-5 rounded-full border-4 border-primary hover:bg-primary hover:text-white transition"
          ariaLabel={APP_CONSTANTS.BUTTONS.BACK}
        >
          <IoIosArrowBack className="text-lg md:text-3xl" />
        </Button>
        <Button
          onClick={nextImage}
          className="md:hidden h-fit self-center p-5 rounded-full border-4 border-primary hover:bg-primary hover:text-white transition"
          ariaLabel={APP_CONSTANTS.BUTTONS.NEXT}
        >
          <IoIosArrowForward className="text-lg md:text-3xl" />
        </Button>
      </div>
    </>
  );
};

export default Gallery;
