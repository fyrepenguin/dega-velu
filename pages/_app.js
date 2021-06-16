import "../styles/globals.css";
import { ThemeProvider } from 'theme-ui';
import theme from '../src/utils/theme.js';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />;
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
