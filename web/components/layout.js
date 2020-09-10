import Seo from './seo'
import Header from './header'
import Switch from './switch'
import { Container, Flex, Box } from 'theme-ui'

const Layout = ({ shareCard, shareDescription, shareTitle, children }) => {
  return (
    <>
      <Seo
        shareCard={shareCard}
        shareDescription={shareDescription}
        shareTitle={shareTitle}
      />
      <Flex
        sx={{
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            width: '100%',
            borderStyle: 'solid',
            borderColor: 'muted',
            borderWidth: '0px',
            borderBottomWidth: '1px',
            position: 'sticky',
            top: 0,
            bg: 'background',
            height: '56px',
            zIndex: 1000,
          }}
        >
          <Container
            sx={{
              px: [4],
            }}
          >
            <Header />
          </Container>
        </Box>
        <Box
          sx={{
            width: '100%',
            flex: '1 1 auto',
          }}
        >
          {children}
        </Box>
        <Box
          sx={{
            display: ['none', 'none', 'inherit'],
          }}
        >
          <Switch />
        </Box>
      </Flex>
    </>
  )
}

export default Layout
