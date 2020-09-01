/** @jsx jsx */
import Layout from '../../components/layout'
import ChildCatalog from '../../components/childCatalog'
import Source from '../../components/source'
import Filter from '../../components/filter'
import parseCatalogs from '../../utils/intake'
import childrenAndSources from '../../utils/utils'

import { jsx, Box, Text, Heading, Container } from 'theme-ui'

function Index({ catalogs }) {
  const masterCatalog = catalogs['master']

  const [children, sources] = childrenAndSources(masterCatalog)

  return (
    <Layout hideFooter={true}>
      <Container sx={{ px: [4] }}>
        <Box sx={{ paddingBottom: '20px' }}>
          <Heading sx={{ my: [4, 5, 5], fontSize: [6, 7, 7] }}>data</Heading>
          <Text sx={{ maxWidth: '700px', fontSize: [3] }}>
            This is a public catalog of datasets related to the study of carbon
            removal opporunities and climate solutions. At CarbonPlan, we
            maintain this data catalog for our own use and as a resource to the
            rest of the research community.
          </Text>
        </Box>
        <Filter />
        {children.length > 0 && (
          <Box>
            <Heading>Child Catalogs</Heading>
            <Box>
              {children.map((c) => (
                <ChildCatalog
                  name={c}
                  obj={masterCatalog.sources[c]}
                  catalog={catalogs[c]}
                  key={c}
                ></ChildCatalog>
              ))}
            </Box>
          </Box>
        )}
        {sources.length > 0 && (
          <Box>
            <Heading>Sources</Heading>
            <Box>
              {sources.map((c) => (
                <Source
                  name={c}
                  obj={masterCatalog.sources[c]}
                  catalog={catalogs[c]}
                  key={c}
                ></Source>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const catalogs = await parseCatalogs('master.yaml')

  return {
    props: {
      catalogs,
    },
  }
}

export default Index
