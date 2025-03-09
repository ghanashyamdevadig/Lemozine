import '@/styles/globals.css'
import Layout from './Layout';
import { Inter } from 'next/font/google';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </Layout>
      </PersistGate>
    </Provider>
  );
}
