import React from 'react'
import { Style } from '@carbonplan/components'
import { ThemeProvider } from 'theme-ui'

import theme from '../theme'

export default ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <Style />
    </ThemeProvider>
  )
}
