import { Box, Grid, Text, Heading, Container } from 'theme-ui'
import { useState } from 'react'
import Layout from '../../components/layout'
import Browser from '../../components/browser'
import Catalog from '../../components/catalog'
import Filter from '../../components/filter'

function Index() {
  const [catalog, setCatalog] = useState(null)

  return (
    <Layout hideFooter={true}>
      <Container sx={{ px: [4] }}>
        <Box sx={{ height: '110px' }}>
          <Heading sx={{ my: [0], pt: [3, 3, 3], fontSize: [6, 6, 7] }}>
            data
          </Heading>
        </Box>
        <Grid
          columns={[1, null, '200px 300px 1fr']}
          gap={[0, null, 5]}
          sx={{
            height: 'calc(100vh - 200px)',
          }}
        >
          <Box>
            <Filter />
          </Box>
          <Browser catalog={catalog} setCatalog={setCatalog} />
          <Catalog id={catalog} />
        </Grid>
      </Container>
    </Layout>
  )
}

export default Index
