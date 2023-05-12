import { useContext } from 'react';
import { FontEditorContext } from '../context/FontEditor';
import { StyleSheet } from "react-native";

function useFontSizes(size) {
    return {
        h1Size: 33 * size,
        h2Size: 27 * size,
        h3Size: 23 * size,
        h4Size: 19 * size,
        h5Size: 16 * size,
        h6Size: 13 * size,
    };
}
const typography = () => {
    const { size } = useContext(FontEditorContext);
    const fontSizes = useFontSizes(size);

    return StyleSheet.create({
        H1Regular: {
            fontSize: fontSizes.h1Size,
            fontWeight: '400',
            fontFamily: 'Roboto-Regular'
        },
        H1Medium: {
            fontSize: fontSizes.h1Size,
            fontWeight: '600',
            fontFamily: 'Roboto-Medium'
        },
        H1Bold: {
            fontSize: fontSizes.h1Size,
            fontWeight: '700',
            fontFamily: 'Roboto-Bold'
        },
        H2Regular: {
            fontSize: fontSizes.h2Size,
            fontWeight: '400',
            fontFamily: 'Roboto-Regular'
        },
        H2Medium: {
            fontSize: fontSizes.h2Size,
            fontWeight: '600',
            fontFamily: 'Roboto-Medium'
        },
        H2Bold: {
            fontSize: fontSizes.h2Size,
            fontWeight: '700',
            fontFamily: 'Roboto-Bold'
        },
        H3Regular: {
            fontSize: fontSizes.h3Size,
            fontWeight: '400',
            fontFamily: 'Roboto-Regular'
        },
        H3Medium: {
            fontSize: fontSizes.h3Size,
            fontWeight: '600',
            fontFamily: 'Roboto-Medium'
        },
        H3Bold: {
            fontSize: fontSizes.h3Size,
            fontWeight: '700',
            fontFamily: 'Roboto-Bold'
        },
        H4Regular: {
            fontSize: fontSizes.h4Size,
            fontWeight: '400',
            fontFamily: 'Roboto-Regular'
        },
        H4Medium: {
            fontSize: fontSizes.h4Size,
            fontWeight: '600',
            fontFamily: 'Roboto-Medium'
        },
        H4Bold: {
            fontSize: fontSizes.h4Size,
            fontWeight: '700',
            fontFamily: 'Roboto-Bold'
        },
        H5Regular: {
            fontSize: fontSizes.h5Size,
            fontWeight: '400',
            fontFamily: 'Roboto-Regular'
        },
        H5Medium: {
            fontSize: fontSizes.h5Size,
            fontWeight: '700',
            fontFamily: 'Roboto-Medium'
        },
        H5Bold: {
            fontSize: fontSizes.h5Size,
            fontWeight: '700',
            fontFamily: 'Roboto-Bold'
        },
        H6Regular: {
            fontSize: fontSizes.h6Size,
            fontWeight: '400',
            fontFamily: 'Roboto-Regular'
        },
        H6Medium: {
            fontSize: fontSizes.h6Size,
            fontWeight: '600',
            fontFamily: 'Roboto-Medium'
        },
        H6Bold: {
            fontSize: fontSizes.h6Size,
            fontWeight: '700',
            fontFamily: 'Roboto-Bold'
        },
    });
}

export default typography;