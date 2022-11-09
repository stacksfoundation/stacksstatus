import Head from 'next/head'
import '../styles/globals.css'
import React from 'react'

function MyApp ({ Component, pageProps: { ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Stacks Blockchain Status</title>
        <meta name="description" content="Stacks Blockchain Status" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="title" content="Stacks Blockchain Status" key="title" />
        <meta name="theme-color" content="#05030A" />
        <meta property="description" content="Stacks Blockchain Status" key="description" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
