import EditableTextBlock from "./EditableTextBlock";

interface Background {
  color: string;
  gradient: string;
}

interface TextBlock {
  id: string;
  text: string;
  type: string;
}

interface Content {
  textBlocks: TextBlock[];
  image: any;
  notes: string;
}

interface SlideSchema {
  id: string;
  title: string;
  type: string;
  content: Content;
  background: Background;
}

interface Props {
  slide: SlideSchema;
  isEditMode: boolean;
  onUpdateTextBlock: (textBlockId: string, newText: string) => void;
}

const EditableSlide = ({ slide, isEditMode, onUpdateTextBlock }: Props) => {
  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center p-8"
      style={{ backgroundColor: slide.background?.color || "#FFFFFF" }}
    >
      <div className="max-w-4xl w-full">
        {/* Text Blocks */}
        <div className="mb-6">
          {slide.content.textBlocks?.map((textBlock) => {
            if (!textBlock) return null;

            return (
              <EditableTextBlock
                key={textBlock.id}
                textBlock={textBlock}
                isEditMode={isEditMode}
                onUpdate={onUpdateTextBlock}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditableSlide;
