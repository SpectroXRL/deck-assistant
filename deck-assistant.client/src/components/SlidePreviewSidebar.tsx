import { useEffect } from "react";
import SlideThumbnail from "./SlideThumbnail";

interface SlideSchema {
  id: string;
  title: string;
  type: string;
  content: any;
  background: any;
}

interface Props {
  slides: SlideSchema[];
  currentSlideIndex: number;
  onSlideSelect: (index: number) => void;
}

const SlidePreviewSidebar = ({
  slides,
  currentSlideIndex,
  onSlideSelect,
}: Props) => {
  useEffect(() => {
    const thumbnailElement = document.getElementById(
      `thumbnail-${currentSlideIndex}`
    );
    thumbnailElement?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [currentSlideIndex]);

  return (
    <div className="w-64 bg-gray-50 overflow-y-auto border-r">
      <div className="p-2">
        {slides.map((slide, index) => (
          <div key={slide.id} id={`thumbnail-${index}`}>
            <SlideThumbnail
              slide={slide}
              index={index}
              isActive={index === currentSlideIndex}
              onClick={onSlideSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidePreviewSidebar;
