import '../styles/globals.css'
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider i18n={enTranslations}>

      <div className="content">
        <Component {...pageProps} />
      </div>
    </AppProvider>

  )
}

export default MyApp