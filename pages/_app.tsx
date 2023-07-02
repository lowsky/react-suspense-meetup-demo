import * as React from 'react';

import { Alert, AlertIcon, ChakraProvider, extendTheme } from '@chakra-ui/react';

import { themeConfig } from '../components/theme';
import { NavBar } from '../components/NavBar';
import DirectorLayout from '../components/DirectorLayout';

export const customTheme = extendTheme({ ...themeConfig });

import ChakraMdxProvider from '../components/ChakraMdxProvider';

export default function App({ Component, pageProps }) {
    return (
        <ChakraProvider theme={customTheme}>
            <header>
                <NavBar />
            </header>
            <ChakraMdxProvider>
              <Alert status="warning">
                  <AlertIcon />
                  This demo runs into issues caused by GitHub rate-limiting, sorry!
              </Alert>
              <DirectorLayout>
                  <Component {...pageProps} />
              </DirectorLayout>
            </ChakraMdxProvider>
        </ChakraProvider>
    );
}
