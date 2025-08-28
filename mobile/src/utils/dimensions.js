import { Dimensions, Platform } from "react-native"

const { width, height } = Dimensions.get("window")

export const isTablet = width >= 768

// Cihaz tabanlı oran (cihazın kendisini referans alıyoruz)
const guidelineBaseWidth = width
const guidelineBaseHeight = height

// Ölçek yardımcıları
export const scale = (size) => (width / guidelineBaseWidth) * size
export const verticalScale = (size) => (height / guidelineBaseHeight) * size
export const moderateScale = (size, factor = 0.6) =>
  size + (scale(size) - size) * factor

// Ortak token’lar
export const Sizes = {
  spacing: {
    xxs: moderateScale(2),
    xs: moderateScale(4),
    s: moderateScale(8),
    m: moderateScale(16),
    l: moderateScale(24),
    xl: moderateScale(32),
    xxl: moderateScale(48),
  },
  borderRadius: {
    s: moderateScale(6),
    m: moderateScale(10),
    l: moderateScale(16),
    xl: moderateScale(22),
    circle: 9999,
  },
  borderWidth: {
    thin: isTablet ? 0.7 : 0.5,
    default: isTablet ? 1.5 : 1,
    thick: isTablet ? 3 : 2,
  },
  // alias grupları
  input: {
    height: verticalScale(56),
    paddingH: moderateScale(20),
  },
  button: {
    height: verticalScale(56),
    paddingH: moderateScale(24),
  },
  // alternatif yükseklikler (geriye uyum)
  inputHeight: {
    small: verticalScale(44),
    medium: verticalScale(50),
    large: verticalScale(56),
    default: verticalScale(56),
  },
  buttonHeight: {
    small: verticalScale(44),
    default: verticalScale(52),
    large: verticalScale(56),
    extraLarge: verticalScale(64),
  },
  icon: {
    xs: scale(14),
    s: scale(18),
    m: scale(22),
    l: scale(28),
    xl: scale(36),
  },
  screenWidth: width,
  screenHeight: height,
}

export const getFontSize = (mobile, tablet) =>
  isTablet ? tablet || mobile * 1.45 : mobile

export const getSize = (mobile, tablet) =>
  isTablet ? tablet || mobile * 1.3 : mobile

export const platformValues = {
  statusBarHeight: Platform.OS === "ios" ? 20 : 0,
  headerHeight: Platform.OS === "ios" ? 44 : 56,
  tabBarHeight: Platform.OS === "ios" ? 49 : 56,
}