interface SlideSchema {
  id: string;
  title: string;
  type: string;
  content: {
    textBlocks: Array<{
      id: string;
      text: string;
      type: string;
    }>;
  };
  background: {
    color: string;
    gradient: string;
  };
}

interface Props {
  slide: SlideSchema;
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
}

const SlideThumbnail = ({ slide, index, isActive, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(index)}
      className={`
        cursor-pointer p-3 mb-2 rounded-lg transition-all
        hover:bg-gray-100
        ${
          isActive
            ? "border-2 border-blue-500 bg-blue-50"
            : "border border-gray-300"
        }
      `}
    >
      {/* Slide number badge */}
      <div className="text-xs text-gray-600 font-semibold mb-1">
        Slide {index + 1}
      </div>

      {/* Simplified slide preview */}
      <div
        className="aspect-video bg-white rounded overflow-hidden text-[8px] p-2"
        style={{ backgroundColor: slide.background?.color || "#FFF" }}
      >
        {slide.content.textBlocks?.slice(0, 3).map((tb) => (
          <div key={tb.id} className="truncate mb-0.5">
            {tb.type === "heading" && (
              <p className="font-bold text-gray-900">{tb.text}</p>
            )}
            {tb.type === "subheading" && (
              <p className="font-semibold text-gray-700">{tb.text}</p>
            )}
            {tb.type === "bullet" && (
              <p className="text-gray-600">• {tb.text}</p>
            )}
            {tb.type === "paragraph" && (
              <p className="text-gray-600">{tb.text}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideThumbnail;
