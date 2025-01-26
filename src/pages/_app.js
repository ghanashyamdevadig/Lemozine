import '@/styles/globals.css'
import Layout from './Layout';

export default function App({ Component, pageProps }) {

  const content = <Component {...pageProps} />;

  return(
    <Layout>
      {content}
    </Layout>
  )
}
