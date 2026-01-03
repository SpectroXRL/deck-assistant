import apiClient from "./api-client";

export const deckService = {
  updateTextBlock: (
    deckId: string,
    slideId: string,
    textBlockId: string,
    text: string
  ) =>
    apiClient.patch(
      `/decks/${deckId}/slides/${slideId}/textblocks/${textBlockId}`,
      { text }
    ),

  updateSpeakerNotes: (deckId: string, slideId: string, notes: string) =>
    apiClient.patch(`/decks/${deckId}/slides/${slideId}/notes`, { notes }),
};
