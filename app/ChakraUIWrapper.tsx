'use client';

import { ChakraProvider } from '@chakra-ui/react';

import { customTheme } from 'components/theme';

export default function ChakraUIWrapper({ children }) {
    return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
}
