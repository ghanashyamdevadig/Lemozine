 import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>       <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Rubik:wght@400;500;600;700;800;900&family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"></link>
          <link rel="icon" href="/icon.svg" />

          </ Head >
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
