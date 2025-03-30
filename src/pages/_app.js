import '@/styles/globals.css';
import Layout from './Layout';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import { ToastContainer } from 'react-toastify';
import { useSelector ,useDispatch} from 'react-redux';
import Loader from '@/component/Loader/Loader';
import { useEffect } from 'react';
import { togglePageLoader } from '@/redux/store/userSlice';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <main className={inter.className}>
            <Component {...pageProps} />
            <ToastContainer />
            <LoaderWrapper />
          </main>
        </Layout>
      </PersistGate>
    </Provider>
  );
}

// Separate component to use the useSelector hook
function LoaderWrapper() {
  const dispatch = useDispatch();

  const { page_loader } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(togglePageLoader(false)); // Reset loader on reload
  }, [dispatch]);

  return page_loader ? <Loader /> : null;
}
