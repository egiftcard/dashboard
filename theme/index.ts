import { colors } from "./colors";
import { fontWeights, letterSpacings, lineHeights } from "./typography";
import { Theme, extendTheme } from "@chakra-ui/react";
import { getColor, mode } from "@chakra-ui/theme-tools";

const chakraTheme: Theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  } as Theme["config"],
  fonts: {
    heading: `"Inter", -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif`,
    body: `"Inter", -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif`,
    mono: `'IBM Plex Mono', monospace`,
  },
  styles: {
    global: {
      "html, body": {
        background: "#000",
        padding: 0,
        margin: 0,
        fontFeatureSettings: `'zero' 1`,
        scrollBehavior: "smooth",
      },
      body: {
        colorScheme: "dark",
      },
      "::selection": {
        backgroundColor: "#90cdf4",
        color: "#fefefe",
      },
      "::-moz-selection": {
        backgroundColor: "#90cdf4",
        color: "#fefefe",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: "heading",
      },
    },
    Text: {
      baseStyle: {
        color: "paragraph",
      },
    },
    Divider: {
      baseStyle: {
        borderColor: "borderColor",
      },
    },
    Button: {
      baseStyle: {
        borderRadius: "md",
      },
      variants: {
        gradient: (props: any) => {
          const { theme, fromcolor, tocolor } = props;
          const lgFrom = getColor(theme, fromcolor);
          const lgTo = getColor(theme, tocolor);
          const bgColor = getColor(theme, mode("white", "gray.800")(props));

          return {
            border: "3px solid",
            borderColor: "transparent",
            borderRadius: "md",
            background: `linear-gradient(${bgColor}, ${bgColor}) padding-box, 
            linear-gradient(135deg, ${lgFrom}, ${lgTo}) border-box`,
            "> *": {
              background: `linear-gradient(135deg, ${lgFrom}, ${lgTo})`,
              backgroundClip: "text",
              textFillColor: "transparent",
            },
            _hover: {
              background: `linear-gradient(${bgColor}, ${bgColor}) padding-box, 
              linear-gradient(315deg, ${lgFrom}, ${lgTo}) border-box`,
              "> *": {
                background: `linear-gradient(315deg, ${lgFrom}, ${lgTo})`,
                backgroundClip: "text",
              },
              opacity: 0.9,
            },
          };
        },
      },
    },
    Modal: {
      baseStyle: {
        overlay: {
          backdropFilter: "blur(5px)",
        },
        dialog: {
          background: "accent.100",
        },
      },
    },
    Drawer: {
      baseStyle: {
        overlay: {
          backdropFilter: "blur(5px)",
        },
        dialog: {
          background: "accent.100",
        },
      },
    },
    Select: {
      defaultProps: {
        variant: "filled",
      },
      variants: {
        filled: {
          field: {
            borderWidth: "1px",
            borderColor: "inputBorder",
            background: "inputBg",
            _hover: {
              background: "inputBgHover",
              borderColor: "primary.500",
            },
          },
        },
      },
    },
    Input: {
      defaultProps: {
        variant: "filled",
      },
      variants: {
        filled: {
          field: {
            borderWidth: "1px",
            borderColor: "inputBorder",
            background: "inputBg",
            _hover: {
              background: "inputBgHover",
              borderColor: "primary.500",
            },
          },
        },
      },
      sizes: {
        xl: {
          field: {
            fontSize: "lg",
            px: 4,
            h: 14,
            borderRadius: "md",
          },
          addon: {
            fontSize: "lg",
            px: 4,
            h: 14,
            borderRadius: "md",
          },
        },
      },
    },
    Textarea: {
      defaultProps: {
        variant: "filled",
      },
      variants: {
        filled: {
          borderWidth: "1px",
          borderColor: "inputBorder",
          background: "inputBg",
          _hover: {
            background: "inputBgHover",
            borderColor: "primary.500",
          },
        },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          bg: "backgroundCardHighlight",
          py: 0,
        },
        item: {
          py: 2,
        },
      },
    },
    Table: {
      baseStyle: {
        thead: {
          background: "backgroundCardHighlight",
        },
        cell: {
          borderColor: "borderColor",
        },
      },
    },
  },
  colors,
  fontSizes: [],
  fontWeights,
  lineHeights,
  letterSpacings,
  sizes: {
    container: {
      page: "1170px",
    },
  },
  semanticTokens: {
    colors: {
      // accent color
      "accent.100": {
        default: "gray.100",
        _dark: "gray.900",
      },
      "accent.200": {
        default: "gray.200",
        _dark: "gray.800",
      },
      "accent.300": {
        default: "gray.300",
        _dark: "gray.700",
      },
      "accent.400": {
        default: "gray.400",
        _dark: "gray.600",
      },
      "accent.500": {
        default: "gray.500",
        _dark: "gray.500",
      },
      "accent.600": {
        default: "gray.600",
        _dark: "gray.400",
      },
      "accent.700": {
        default: "gray.700",
        _dark: "gray.300",
      },
      "accent.800": {
        default: "gray.800",
        _dark: "gray.200",
      },
      "accent.900": {
        default: "gray.900",
        _dark: "gray.100",
      },

      // inputs
      inputBg: { default: "gray.50", _dark: "whiteAlpha.50" },
      inputBgHover: { default: "gray.100", _dark: "whiteAlpha.100" },
      inputBorder: { default: "gray.200", _dark: "transparent" },
      // other

      backgroundBody: "accent.100",
      backgroundHighlight: { default: "white", _dark: "accent.200" },
      backgroundCardHighlight: { default: "white", _dark: "accent.100" },
      backgroundNavbar: { default: "white", _dark: "accent.200" },
      wordmark: { default: "#262A36", _dark: "whiteAlpha.900" },
      heading: { default: "black", _dark: "white" },
      paragraph: "accent.800",

      borderColor: { default: "accent.200", _dark: "accent.300" },
      opaqueBg: {
        default: "whiteAlpha.500",
        _dark: "blackAlpha.600",
      },
    },
  },
}) as Theme;

export default chakraTheme;
