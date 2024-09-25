import { APP_CONSTANTS } from "../../../config/config";
import Gallery from "./Gallery";
import { PLACEHOLDERS } from "../../../config/placeholderImg";

const GallerySection = () => {
  const images = [
    PLACEHOLDERS.GYM,
    PLACEHOLDERS.IMG_1,
    PLACEHOLDERS.IMG_2,
    PLACEHOLDERS.IMG_3,
    PLACEHOLDERS.IMG_4,
    PLACEHOLDERS.IMG_5,
  ];

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden space-y-5">
      <h1 className="text-5xl font-bold text-black/80 text-center mt-20">
        {APP_CONSTANTS.TITLES.GALLERY_SECTION}
      </h1>
      <section className="w-full h-full flex flex-col md:flex-col items-center justify-center gap-5 p-5">
        <Gallery images={images} />
      </section>
    </div>
  );
};

export default GallerySection;
