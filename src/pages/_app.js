import '@/styles/globals.css'
import Layout from './Layout';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {

  const content = <Component {...pageProps} />;

  return(
    <Layout>
       <main className={inter.className}>
      {content}
      </main>
    </Layout>
  )
}
