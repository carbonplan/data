import Head from 'next/head'

const Seo = ({ shareCard, shareDescription, shareTitle }) => (
  <Head>
    <title>carbonplan / data</title>
    <meta
      name='description'
      content={
        shareDescription
          ? shareDescription
          : "CarbonPlan's public data catalog."
      }
    />
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    <link rel='canonical' content='https://carbonplan.org/' />
    <link
      rel='icon'
      href='https://carbonplan-assets.s3.amazonaws.com/images/favicon.svg'
    />
    <link
      rel='apple-touch-icon'
      href='https://carbonplan-assets.s3.amazonaws.com/images/favicon.png'
    />
    <meta property='og:title' content='carbonplan / data' />
    <meta
      property='og:description'
      content={
        shareDescription
          ? shareDescription
          : "CarbonPlan's public data catalog."
      }
    />
    <meta
      property='og:image'
      content={`https://carbonplan-assets.s3.amazonaws.com/images/social/${
        shareCard ? shareCard : 'data'
      }.png`}
    />
    <meta property='og:url' content='https://carbonplan.org' />
    <meta name='twitter:title' content='carbonplan / data' />
    <meta
      name='twitter:description'
      content={
        shareDescription
          ? shareDescription
          : "CarbonPlan's public data catalog."
      }
    />
    <meta
      name='twitter:image'
      content={`https://carbonplan-assets.s3.amazonaws.com/images/social/${
        shareCard ? shareCard : 'data'
      }.png`}
    />
    <meta name='twitter:card' content='summary_large_image' />
  </Head>
)

export default Seo
