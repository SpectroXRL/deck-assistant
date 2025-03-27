import { useState } from "react";
import Slide, { SlideSchema } from "./Slide";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface DeckSchema {
  title: string;
  slides: SlideSchema[];
}

interface Props {
  title: string;
  slides: SlideSchema[];
}

const DeckViewer = ({ title, slides }: Props) => {
  // Explicitly ensure slides is an array
  const deckSlides = Array.isArray(slides) ? slides : [];
  const deckTitle = title || "Untitled Pitch Deck";

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % Math.max(slides.length, 1));
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) =>
      prev === 0 ? Math.max(slides.length - 1, 0) : prev - 1
    );
  };

  // Handle empty slides scenario
  if (deckSlides.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">
          No slides available. Slides length: {slides.length}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Slide Title */}
      <div className="bg-gray-100 p-4 text-center">
        <h3 className="text-xl font-semibold">{deckTitle}</h3>
      </div>

      {/* Slide Viewer */}
      <div className="flex-grow relative flex items-center justify-center">
        {/* Previous Slide Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>

        {/* Current Slide */}
        <div className="w-full max-w-4xl aspect-video">
          <Slide
            id={slides[currentSlideIndex].id}
            title={slides[currentSlideIndex].title}
            type={slides[currentSlideIndex].type}
            content={slides[currentSlideIndex].content}
            background={slides[currentSlideIndex].background}
          />
        </div>

        {/* Next Slide Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Slide Navigation */}
      <div className="bg-gray-100 p-4 flex justify-center items-center">
        <span className="text-sm">
          Slide {currentSlideIndex + 1} of {slides.length}
        </span>
      </div>
    </div>
  );

  // return (
  //   <>
  //     <p>{title}</p>
  //     {slides.map((slide) => (
  //       <Slide
  //         id={slide.id}
  //         title={slide.title}
  //         type={slide.type}
  //         content={slide.content}
  //         background={slide.background}
  //       />
  //     ))}
  //   </>
  // );
};

export default DeckViewer;
