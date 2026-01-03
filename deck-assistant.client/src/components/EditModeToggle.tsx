import { Edit, Check } from "lucide-react";

interface Props {
  isEditMode: boolean;
  onToggle: () => void;
}

const EditModeToggle = ({ isEditMode, onToggle }: Props) => {
  return (
    <button
      onClick={onToggle}
      className={`
        px-4 py-2 rounded-lg font-medium transition-all
        flex items-center gap-2
        ${
          isEditMode
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }
      `}
    >
      {isEditMode ? (
        <>
          <Check size={18} />
          Done Editing
        </>
      ) : (
        <>
          <Edit size={18} />
          Edit Mode
        </>
      )}
    </button>
  );
};

export default EditModeToggle;
