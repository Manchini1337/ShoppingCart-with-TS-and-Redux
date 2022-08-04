import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../src/components/layout/layout';
import store from '../store/index';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
