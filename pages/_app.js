import Layout from '../components/Layout'
import '../styles/globals.css'
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider i18n={enTranslations}>
        
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AppProvider>

  )
}

export default MyApp