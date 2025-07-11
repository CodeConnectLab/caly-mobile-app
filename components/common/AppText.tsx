import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

export default function AppText({ style, ...props }: TextProps) {
  const flattenedStyle = Array.isArray(style) ? Object.assign({}, ...style) : style || {};
  const fontWeight = (flattenedStyle as TextStyle).fontWeight;

  let fontFamily = 'Poppins-Regular';
  switch (fontWeight) {
    case 'bold':
    case '700':
      fontFamily = 'Poppins-Bold';
      break;
    case '600':
      fontFamily = 'Poppins-SemiBold';
      break;
    case '500':
      fontFamily = 'Poppins-Medium';
      break;
  }

  return <Text {...props} style={[{ fontFamily }, style]} />;
}
