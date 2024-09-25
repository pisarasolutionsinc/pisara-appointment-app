import { ChangeEvent, useState, useEffect } from "react";
import InputForm from "../forms/InputForm";

interface Colors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  success: string;
  warning: string;
  danger: string;
}

const ColorPicker = () => {
  const defaultColors: Colors = {
    primary: "#01598b",
    secondary: "#e3d8d2",
    accent: "#a6e6ff",
    neutral: "#9c9c9c",
    success: "#D3FFA6",
    warning: "#FFFAA6",
    danger: "#FFA6BA",
  };

  const [colors, setColors] = useState<Colors>({
    primary: localStorage.getItem("primary") || defaultColors.primary,
    secondary: localStorage.getItem("secondary") || defaultColors.secondary,
    accent: localStorage.getItem("accent") || defaultColors.accent,
    neutral: localStorage.getItem("neutral") || defaultColors.neutral,
    success: localStorage.getItem("success") || defaultColors.success,
    warning: localStorage.getItem("warning") || defaultColors.warning,
    danger: localStorage.getItem("danger") || defaultColors.danger,
  });

  useEffect(() => {
    Object.entries(colors).forEach(([colorType, colorValue]) => {
      document.documentElement.style.setProperty(
        `--color-${colorType}`,
        colorValue
      );
    });
  }, [colors]);

  const handleColorChange = (
    colorType: keyof Colors,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newColor = (event.target as HTMLInputElement).value;
    setColors((prevColors) => ({ ...prevColors, [colorType]: newColor }));

    // Update the CSS variable in :root
    document.documentElement.style.setProperty(
      `--color-${colorType}`,
      newColor
    );

    // Save the chosen color in localStorage
    localStorage.setItem(colorType, newColor);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-5">
        <label>
          Primary Color:
          <InputForm
            type="color"
            value={colors.primary}
            onChange={(e) => handleColorChange("primary", e)}
          />
        </label>

        <label>
          Secondary Color:
          <InputForm
            type="color"
            value={colors.secondary}
            onChange={(e) => handleColorChange("secondary", e)}
          />
        </label>

        <label>
          Accent Color:
          <InputForm
            type="color"
            value={colors.accent}
            onChange={(e) => handleColorChange("accent", e)}
          />
        </label>

        <label>
          Neutral Color:
          <InputForm
            type="color"
            value={colors.neutral}
            onChange={(e) => handleColorChange("neutral", e)}
          />
        </label>

        <label>
          Success Color:
          <InputForm
            type="color"
            value={colors.success}
            onChange={(e) => handleColorChange("success", e)}
          />
        </label>

        <label>
          Warning Color:
          <InputForm
            type="color"
            value={colors.warning}
            onChange={(e) => handleColorChange("warning", e)}
          />
        </label>

        <label>
          Danger Color:
          <InputForm
            type="color"
            value={colors.danger}
            onChange={(e) => handleColorChange("danger", e)}
          />
        </label>
      </div>
    </>
  );
};

export default ColorPicker;
