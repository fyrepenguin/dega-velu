import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Router from 'next/router';
import NProgress from 'nprogress';
import theme from '../src/utils/theme.js';
import Layout from '../components/layout';
import '../styles/globals.css';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps }) {
  // return <Component {...pageProps} />;
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
