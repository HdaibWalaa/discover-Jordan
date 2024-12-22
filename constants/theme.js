import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window');

const COLORS = {
  blue: "#4267B2",
  red: "#EB6A58",
  green: "#449282",
  white: "#FFFFFF",
  lightWhite: "#FFFFFF",
  lightBlue: "#EEEEEE",
  lightRed: "#EB9C9B",
  lightGreen: "#333333",
  black: "#121212",
  dark: "#3D3A45",
  gray: "#8C8896",
  lightGrey: "#D1CFD5",
  error100: "#fcdcbf",
  error500: "#f37c13",
  primary: "#FCD228",
  secondary: "#26C0CC",
  grey2: "#F5F7F8",
  lightPrimary: "#fffae6",
};


const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 44,
    height,
    width
};

const TEXT = {
  xxSmall: 11,
  xSmall: 13,
  small: 15,
  xmedium:17,
  medium: 19,
  large: 21,
  xLarge: 27,
  xxLarge: 32,
  FooteHight:200,
};


const SHADOWS = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
    },
};


export { COLORS, SIZES, SHADOWS, TEXT };