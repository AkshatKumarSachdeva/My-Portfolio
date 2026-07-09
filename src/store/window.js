
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WINDOW_CONFIG, INITIAL_Z_INDEX } from "#constants/index";

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowId, data = null) => {
      set((state) => {
        const win = state.windows[windowId];
        if (!win) return;

        win.isOpen = true;
        win.isMinimized = false;
        win.zIndex = state.nextZIndex++;
        if (data) win.data = data;
      });
    },

    closeWindow: (windowId) => {
      set((state) => {
        const win = state.windows[windowId];
        if (!win) return;

        win.isOpen = false;
        win.isMinimized = false;
        win.isMaximized = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      });
    },

    focusWindow: (windowId) => {
      set((state) => {
        const win = state.windows[windowId];
        if (!win) return;

        win.zIndex = state.nextZIndex++;
      });
    },

    minimizeWindow: (windowId) => {
      set((state) => {
        const win = state.windows[windowId];
        if (!win) return;

        win.isMinimized = true;
      });
    },

    restoreWindow: (windowId) => {
      set((state) => {
        const win = state.windows[windowId];
        if (!win) return;

        win.isMinimized = false;
        win.zIndex = state.nextZIndex++;
      });
    },

    maximizeWindow: (windowId) => {
      set((state) => {
        const win = state.windows[windowId];
        if (!win) return;

        win.isMaximized = !win.isMaximized;
        win.zIndex = state.nextZIndex++;
      });
    },
  }))
);

export default useWindowStore;