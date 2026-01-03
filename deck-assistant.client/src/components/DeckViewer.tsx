import { useState } from "react";
import { SlideSchema } from "./Slide";
import EditableSlide from "./EditableSlide";
import SlidePreviewSidebar from "./SlidePreviewSidebar";
import SpeakerNotesPanel from "./SpeakerNotesPanel";
import EditModeToggle from "./EditModeToggle";
import { deckService } from "../services/deck-service";
import { Loader, AlertCircle, Check } from "lucide-react";

export interface DeckSchema {
  title: string;
  slides: SlideSchema[];
}

interface Props {
  title: string;
  slides: SlideSchema[];
  deckId: string;
}

const DeckViewer = ({ title, slides: initialSlides, deckId }: Props) => {
  const deckTitle = title || "Untitled Pitch Deck";
  const [slides, setSlides] = useState<SlideSchema[]>(initialSlides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Handle empty slides scenario
  if (slides.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">No slides available.</p>
      </div>
    );
  }

  const currentSlide = slides[currentSlideIndex];

  const handleSlideSelect = (index: number) => {
    setCurrentSlideIndex(index);
  };

  const handleUpdateTextBlock = async (
    textBlockId: string,
    newText: string
  ) => {
    setIsSaving(true);
    setSaveError(null);

    // Optimistic update
    setSlides(
      slides.map((slide, idx) =>
        idx === currentSlideIndex
          ? {
              ...slide,
              content: {
                ...slide.content,
                textBlocks: slide.content.textBlocks.map((tb) =>
                  tb.id === textBlockId ? { ...tb, text: newText } : tb
                ),
              },
            }
          : slide
      )
    );

    try {
      await deckService.updateTextBlock(
        deckId,
        currentSlide.id,
        textBlockId,
        newText
      );
    } catch (error) {
      setSaveError("Failed to save text block");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateSpeakerNotes = async (notes: string) => {
    setIsSaving(true);
    setSaveError(null);

    // Optimistic update
    setSlides(
      slides.map((slide, idx) =>
        idx === currentSlideIndex
          ? {
              ...slide,
              content: {
                ...slide.content,
                notes: notes,
              },
            }
          : slide
      )
    );

    try {
      await deckService.updateSpeakerNotes(deckId, currentSlide.id, notes);
    } catch (error) {
      setSaveError("Failed to save speaker notes");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      {/* Header */}
      <div className="h-16 bg-gray-100 flex items-center justify-between px-6 border-b">
        <h3 className="text-xl font-semibold">{deckTitle}</h3>

        <div className="flex items-center gap-4">
          {/* Save Status Indicator */}
          {isSaving && (
            <span className="text-sm text-yellow-600 flex items-center gap-1">
              <Loader className="animate-spin" size={16} />
              Saving...
            </span>
          )}
          {!isSaving && saveError && (
            <span className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={16} />
              {saveError}
            </span>
          )}
          {!isSaving && !saveError && (
            <span className="text-sm text-green-600 flex items-center gap-1">
              <Check size={16} />
              Saved
            </span>
          )}

          {/* Edit Mode Toggle */}
          <EditModeToggle
            isEditMode={isEditMode}
            onToggle={() => setIsEditMode(!isEditMode)}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Slide previews */}
        <SlidePreviewSidebar
          slides={slides}
          currentSlideIndex={currentSlideIndex}
          onSlideSelect={handleSlideSelect}
        />

        {/* Main slide panel */}
        <div className="flex-1 flex items-center justify-center bg-gray-100 p-8 overflow-auto">
          <div className="w-full max-w-4xl aspect-video">
            <EditableSlide
              slide={currentSlide}
              isEditMode={isEditMode}
              onUpdateTextBlock={handleUpdateTextBlock}
            />
          </div>
        </div>
      </div>

      {/* Speaker notes panel */}
      <SpeakerNotesPanel
        notes={currentSlide.content.notes || ""}
        isExpanded={isNotesExpanded}
        isEditMode={isEditMode}
        onToggle={() => setIsNotesExpanded(!isNotesExpanded)}
        onUpdate={handleUpdateSpeakerNotes}
      />
    </div>
  );
};

export default DeckViewer;
