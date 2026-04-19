import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  selectedItemIds: string[];
}

const initialState: UIState = {
  selectedItemIds: [],
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
  },
});

export const { toggleSelectItem, clearSelection } = uiSlice.actions;

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
