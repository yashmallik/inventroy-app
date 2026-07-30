import { useSelector } from "react-redux";
import { RootState } from "../store";

export function useTheme() {
  const theme = useSelector((state: RootState) => state.ui.theme);
  return { theme, isNeon: theme === "neon" } as const;
}

const CHART_PALETTES = {
  neon: {
    stroke: "#ff2d78",
    fillStart: "rgba(255,45,120,0.3)",
    fillEnd: "rgba(255,45,120,0)",
    tooltipBg: "#1a1a2e",
    tooltipBorder: "#ff2d78",
    axisTick: "#64748b",
  },
  axiom: {
    stroke: "#1d4ed8",
    fillStart: "rgba(29,78,216,0.1)",
    fillEnd: "rgba(29,78,216,0)",
    tooltipBg: "#ffffff",
    tooltipBorder: "transparent",
    axisTick: "#64748b",
  },
} as const;

export function useChartColors() {
  const { theme } = useTheme();
  return CHART_PALETTES[theme];
}
