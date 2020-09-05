import React from 'react'
import { Style } from '@carbonplan/components'
import { ThemeProvider } from 'theme-ui'
import Prism from '@theme-ui/prism'

import theme from '../theme'

console.log(theme)

const components = {
  pre: ({ children }) => <>{children}</>,
  code: Prism,
}

export default ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme} components={components}>
      <Component {...pageProps} />
      <Style />
    </ThemeProvider>
  )
}
