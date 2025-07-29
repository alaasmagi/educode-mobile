import { useColorScheme } from "react-native";
import { DarkTheme, LightTheme, AppTheme } from "../../layout/styles/ThemeStyles";
import { Styles } from "../../layout/styles/Styles";
import { useMemo } from "react";

export function ApplyStyles() {
  const scheme = useColorScheme();
  const theme: AppTheme = scheme === "dark" ? DarkTheme : LightTheme;

  const styles = useMemo(() => Styles(theme), [theme]);

  return { theme, styles };
}