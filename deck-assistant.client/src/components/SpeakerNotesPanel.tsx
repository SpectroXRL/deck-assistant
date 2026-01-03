import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  notes: string;
  isExpanded: boolean;
  isEditMode: boolean;
  onToggle: () => void;
  onUpdate: (notes: string) => void;
}

const SpeakerNotesPanel = ({
  notes,
  isExpanded,
  isEditMode,
  onToggle,
  onUpdate,
}: Props) => {
  const [localNotes, setLocalNotes] = useState(notes);

  const debouncedUpdate = useDebouncedCallback((text: string) => {
    onUpdate(text);
  }, 1500);

  const handleChange = (newNotes: string) => {
    setLocalNotes(newNotes);
    debouncedUpdate(newNotes);
  };

  return (
    <div
      className={`
        absolute bottom-0 left-0 right-0
        bg-white border-t-2 border-gray-300 shadow-2xl
        transition-transform duration-300 ease-in-out
        ${isExpanded ? "translate-y-0" : "translate-y-[calc(100%-48px)]"}
      `}
      style={{ height: "40vh", minHeight: "250px" }}
    >
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="w-full h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        {isExpanded ? (
          <ChevronDown size={20} className="text-gray-700" />
        ) : (
          <ChevronUp size={20} className="text-gray-700" />
        )}
        <span className="ml-2 font-medium text-gray-700">Speaker Notes</span>
      </button>

      {/* Notes content */}
      <div className="p-4 h-[calc(100%-48px)] overflow-y-auto">
        {isEditMode ? (
          <textarea
            value={localNotes}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Add speaker notes..."
            className="w-full h-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
          />
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">
            {notes || "No speaker notes available."}
          </p>
        )}
      </div>
    </div>
  );
};

export default SpeakerNotesPanel;
