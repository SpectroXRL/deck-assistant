import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface TextBlock {
  id: string;
  text: string;
  type: string;
}

interface Props {
  textBlock: TextBlock;
  isEditMode: boolean;
  onUpdate: (id: string, newText: string) => void;
}

const EditableTextBlock = ({ textBlock, isEditMode, onUpdate }: Props) => {
  const [localText, setLocalText] = useState(textBlock.text);

  const debouncedUpdate = useDebouncedCallback((id: string, text: string) => {
    onUpdate(id, text);
  }, 1000);

  const handleChange = (newText: string) => {
    setLocalText(newText);
    debouncedUpdate(textBlock.id, newText);
  };

  if (!isEditMode) {
    // View mode - render as static elements
    switch (textBlock.type) {
      case "heading":
        return (
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {textBlock.text || "Untitled"}
          </h1>
        );
      case "subheading":
        return (
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {textBlock.text || "Subtitle"}
          </h2>
        );
      case "bullet":
        return (
          <p className="text-xl text-gray-600 mb-2 before:content-['•'] before:mr-2 before:text-green-600">
            {textBlock.text || "Bullet point"}
          </p>
        );
      case "paragraph":
        return (
          <p className="text-xl text-gray-600 mb-4">
            {textBlock.text || "Paragraph text"}
          </p>
        );
      default:
        return null;
    }
  }

  // Edit mode - render editable elements
  const baseEditClasses =
    "border-2 border-dashed border-blue-300 rounded px-2 focus:border-blue-600 focus:outline-none hover:border-blue-400 transition-colors";

  switch (textBlock.type) {
    case "heading":
      return (
        <input
          type="text"
          value={localText}
          onChange={(e) => handleChange(e.target.value)}
          className={`text-4xl font-bold text-gray-800 mb-4 w-full bg-transparent ${baseEditClasses}`}
          placeholder="Heading"
        />
      );
    case "subheading":
      return (
        <input
          type="text"
          value={localText}
          onChange={(e) => handleChange(e.target.value)}
          className={`text-2xl font-semibold text-gray-700 mb-4 w-full bg-transparent ${baseEditClasses}`}
          placeholder="Subheading"
        />
      );
    case "bullet":
      return (
        <div className="flex items-start mb-2">
          <span className="text-xl text-green-600 mr-2">•</span>
          <input
            type="text"
            value={localText}
            onChange={(e) => handleChange(e.target.value)}
            className={`text-xl text-gray-600 flex-1 bg-transparent ${baseEditClasses}`}
            placeholder="Bullet point"
          />
        </div>
      );
    case "paragraph":
      return (
        <textarea
          value={localText}
          onChange={(e) => handleChange(e.target.value)}
          className={`text-xl text-gray-600 mb-4 w-full bg-transparent resize-none ${baseEditClasses}`}
          placeholder="Paragraph text"
          rows={3}
        />
      );
    default:
      return null;
  }
};

export default EditableTextBlock;
