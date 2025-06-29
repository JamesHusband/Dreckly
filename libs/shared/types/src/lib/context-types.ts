// =====================
// Context Types
// =====================
export interface CuisineContextType {
  selectedCuisine: string | null;
  setSelectedCuisine: (cuisine: string | null) => void;
}
