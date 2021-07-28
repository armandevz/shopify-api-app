import '../styles/globals.css'
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';
import React from 'react';
import NextApp from 'next/app';

export default class App extends NextApp {
    public render() {
        const { Component, pageProps } = this.props;
        return (
          <AppProvider i18n={enTranslations}>

          <div className="content">
            <Component {...pageProps} />
          </div>
        </AppProvider>
        );
    }
}