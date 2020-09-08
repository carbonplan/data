/** @jsx jsx */
import Layout from '../../components/layout'
import ChildCatalog from '../../components/child-catalog'
import Filter from '../../components/filter'
import data from '../../data'

import { jsx, Box, Grid, Text, Heading, Container } from 'theme-ui'

function Index() {
  const masterCatalog = data['master']
  const children = Object.keys(masterCatalog.sources)

  return (
    <Layout hideFooter={true}>
      <Container sx={{ px: [4] }}>
        <Box sx={{ pb: [4] }}>
          <Heading sx={{ my: [3, 4, 4], fontSize: [6, 6, 7] }}>data</Heading>
          <Text sx={{ maxWidth: '700px', fontSize: [3] }}>
            This is a public catalog of datasets related to the study of carbon
            removal opporunities and climate solutions. At CarbonPlan, we
            maintain this data catalog for our own use and as a resource to the
            rest of the research community.
          </Text>
        </Box>
        <Grid columns={[1, null, '250px 1fr']} gap={[0, null, 5]}>
        <Box>
          <Filter/>
        </Box>
        {children.length > 0 && (
          <Box>
            {children.map((c) => (
              <ChildCatalog
                name={c}
                obj={masterCatalog.sources[c]}
                catalog={data[c]}
                key={c}
              ></ChildCatalog>
            ))}
          </Box>
        )}
        </Grid>
      </Container>
    </Layout>
  )
}

export default Index
