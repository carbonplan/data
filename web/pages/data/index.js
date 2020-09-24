import { Box, Grid, Heading, Container } from 'theme-ui'
import { useState } from 'react'
import Layout from '../../components/layout'
import Browser from '../../components/browser'
import Catalog from '../../components/catalog'
import Filter from '../../components/filter'
import searchWithTags from '../../utils/search'

function Index() {
  const [catalog, setCatalog] = useState(null)

  const state = {
    search: useState(''),
    tags: {
      climate: useState(true),
      carbon: useState(true),
      forests: useState(true),
      meta: useState(true),
    },
  }

  const activeTags = Object.keys(state.tags).filter((tag) => state.tags[tag][0])

  const visibility = searchWithTags(state.search[0], activeTags)
  const anyCatalogs = Object.keys(visibility).some(
    (key) => visibility[key].show
  )
  if (catalog && !anyCatalogs) {
    setCatalog(null)
  }

  return (
    <Layout hideFooter={true}>
      <Container sx={{ px: [4] }}>
        <Box sx={{ height: '110px' }}>
          <Heading sx={{ my: [0], pt: [3, 3, 3], fontSize: [6, 6, 7] }}>
            data
          </Heading>
        </Box>
        <Grid
          columns={[1, null, '200px 270px 1fr']}
          gap={[0, null, 5]}
          sx={{
            height: 'calc(100vh - 200px)',
          }}
        >
          <Box>
            <Filter state={state} />
          </Box>
          <Browser
            visibility={visibility}
            catalog={catalog}
            setCatalog={setCatalog}
          />
          <Catalog visibility={visibility} id={catalog} />
        </Grid>
      </Container>
    </Layout>
  )
}

export default Index
