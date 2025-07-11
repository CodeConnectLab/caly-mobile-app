import { StyleSheet, Text, TextProps } from 'react-native';

const FONT_MAP = {
  '400': 'Poppins-Regular',
  '500': 'Poppins-Medium',
  'medium': 'Poppins-Medium',
  '600': 'Poppins-SemiBold',
  'semibold': 'Poppins-SemiBold',
  '700': 'Poppins-Bold',
  'bold': 'Poppins-Bold',
  'normal': 'Poppins-Regular',
};

export default function AppText({ style, ...props }: TextProps) {
  // Extract fontWeight from style prop
  let fontWeight = '400';
  let flattened = StyleSheet.flatten(style) || {};
  if (flattened.fontWeight) {
    fontWeight = flattened.fontWeight.toString().toLocaleLowerCase();
  }  

  const fontFamily = FONT_MAP[fontWeight as keyof typeof FONT_MAP] || 'Poppins-Regular';

  return <Text {...props} style={[style, { fontFamily }]} />;
}
