import { ServerStyleSheets } from '@material-ui/core'
import { ServerStyleSheet } from 'styled-components'
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content='#fe2c55' />
          <meta
            name='description'
            content='The simplest and most effective way for planning your next party.'
          />
          <link rel='icon' href='/icon.png' />

          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  const styledComponentsSheet = new ServerStyleSheet()
  const materialSheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props =>
          styledComponentsSheet.collectStyles(materialSheets.collect(<App {...props} />))
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}
          {materialSheets.getStyleElement()}
          {styledComponentsSheet.getStyleElement()}
        </React.Fragment>
      )
    }
  } finally {
    styledComponentsSheet.seal()
  }
}

export default MyDocument
