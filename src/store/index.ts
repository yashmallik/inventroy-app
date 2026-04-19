import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  selectedItemIds: string[];
  theme: "neon" | "axiom";
}

const initialState: UIState = {
  selectedItemIds: [],
  theme: "neon",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSelectItem: (state, action: PayloadAction<string>) => {
      if (state.selectedItemIds.includes(action.payload)) {
        state.selectedItemIds = state.selectedItemIds.filter(id => id !== action.payload);
      } else {
        state.selectedItemIds.push(action.payload);
      }
    },
    clearSelection: (state) => {
      state.selectedItemIds = [];
    },
    setTheme: (state, action: PayloadAction<"neon" | "axiom">) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleSelectItem, clearSelection, setTheme } = uiSlice.actions;

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
