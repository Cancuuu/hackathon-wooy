import React from 'react'
import Head from 'next/head'

export const Meta = (props) => {
  let { title } = props
  const defaultTitle = 'Wooy'
  title = title ? `${title} - ${defaultTitle}` : defaultTitle

  let url = process.env.NEXT_JS_BASE_URI
  if (typeof window !== 'undefined') {
    url = window.location.href
  }
  const description = `Wooy`
  const keywords = 'ethereum'
  const twitterHandle = '@weareWooy'

  return (
    <Head>
      <>
        <title>{title}</title>

        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />

        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:site_name' content={title} />
        <meta property='og:url' content={url} />

        <meta property='twitter:title' content={title} />
        <meta property='twitter:site' content={twitterHandle} />
        <meta property='twitter:url' content={url} />
        <meta property='twitter:creator' content={twitterHandle} />
      </>
    </Head>
  )
}
