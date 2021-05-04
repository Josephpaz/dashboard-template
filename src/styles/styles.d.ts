import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;

      white: string;
      black: string;
      gray: string;

      success: string;
      info: string;
      warning: string;
    };
  }
}

// title: "dark",
//   color: {
//     primary: "#1B1F38",
//     secondary: "#252A48",
//     tertiary: "#313862",

//     white: "#FFF",
//     black: "#000",
//     gray: "#BFBFBF",

//     success: "#4E31f0",
//     info: "#F7931B",
//     warning: "#E44C4E",
//   }
