import {create} from 'zustand';

interface TextEditorState {
  inputText: string;
  inputArray: string[];
  displayedItems: string[];
  inView: boolean;
  mouseActive: boolean;
  setInputText: (text: string) => void;
  addInputText: () => void;
  clearInput: () => void;
  downloadTxtFile: () => void;
  clearFile: () => void;
  setInView: (value: boolean) => void;
  setMouseActive: (value: boolean) => void;
  isListening: boolean;
  setIsListening: (value: boolean) => void;
  downloadName: string;
  setDownloadName: (value: string) => void;
}

const useTextEditorStore = create<TextEditorState>((set) => ({
  inputText: '',
  inputArray: [],
  displayedItems: [],
  inView: false,
  mouseActive: false,
  isListening: false,
  downloadName: '',

  setDownloadName: (value) => set({ downloadName: value }),

  setInputText: (text) => set({ inputText: text }),

  addInputText: () => set((state) => {
    if (state.inputText.trim() !== '') {
      const updatedArray = [state.inputText, ...state.inputArray];
      return {
        inputArray: updatedArray,
        displayedItems: updatedArray.slice(0, 5), // Adjust the limit as needed
        inputText: '',
        inView: true,
      };
    }
    return state;
  }),

  clearInput: () =>
    set({
      inputArray: [],
      displayedItems: [],
      inView: false,
      inputText: '',
    }),


    setInView: (value) => set({ inView: value }),

    setIsListening: (value) => set({ isListening: value }),

  setMouseActive: (value) => set({ mouseActive: value }),

 downloadTxtFile: () => {
    set((state) => {
      const ascendingArray = [...state.inputArray].reverse(); // Create a reversed copy
      const element = document.createElement("a");
      const file = new Blob([ascendingArray.join("\n")], {
        type: "text/plain;charset=utf-8",
      });
      element.href = URL.createObjectURL(file);
      element.download = state.downloadName + ".txt"; // Fix: Use state.downloadName instead of downloadName
      document.body.appendChild(element);
      element.click();
      return state; // Return the state to not modify it
    });
  },

  clearFile: () =>
    set({
      inputArray: [],
      displayedItems: [],
      inView: false,
      inputText: '',
    }),
}));

export default useTextEditorStore;
