// This file will be automatically included by TypeScript
import { } from './components/ui/sheet'; // Import to ensure the declarations are loaded

// When a sheet ID is used, it will be added to this interface
declare global {
  namespace SheetRegistry {
    interface UsedSheetIds {
      // This will be augmented by the useSheet function
    }
  }
}