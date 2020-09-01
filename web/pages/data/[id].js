import { useRouter } from 'next/router'
import { Box, Text, Heading, Container } from 'theme-ui'
import childrenAndSources from '../../utils/utils'
import Source from '../../components/source'
import ChildCatalog from '../../components/childCatalog'

import Layout from '../../components/layout'
import Filter from '../../components/filter'

import data from '../../data'

const Catalog = ({ catalogs }) => {
  const router = useRouter()
  const { id } = router.query
  const catalog = data[id]

  const description =
    catalog.description || 'No description provided for ' + id + '.'
  const [children, sources] = childrenAndSources(catalog)

  return (
    <Layout hideFooter={true}>
      <Container sx={{ px: [4] }}>
        <Box>
          <Text>
            <Heading
              sx={{
                my: [4, 5, 5],
                fontSize: [6, 7, 7],
                display: 'inline-block',
              }}
            >
              {' '}
              data{' '}
            </Heading>
            <Heading
              sx={{
                my: [4, 5, 5],
                fontSize: [4, 6, 6],
                display: 'inline-block',
                color: 'secondary',
              }}
            >
              {' '}
              &nbsp; / {id}{' '}
            </Heading>
          </Text>

          <Text sx={{ paddingBottom: '20px' }}>{description}</Text>
        </Box>
        <Filter />

        {children.length > 0 && (
          <Box sx={{ paddingTop: '20px', paddingBottom: '20px' }}>
            <Heading sx={{ paddingBottom: '20px' }}>Child Catalogs</Heading>
            <Box>
              {children.map((c) => (
                <ChildCatalog
                  name={c}
                  obj={catalog.sources[c]}
                  key={c}
                ></ChildCatalog>
              ))}
            </Box>
          </Box>
        )}
        {sources.length > 0 && (
          <Box>
            <Heading sx={{ paddingBottom: '20px' }}>Sources</Heading>
            <Box>
              {sources.map((c) => (
                <Source name={c} obj={catalog.sources[c]} key={c}></Source>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Layout>
  )
}

// export async function getStaticProps({ params }) {
//   const catalogs = await parseCatalogs(params.id + '.yaml') //

//   return {
//     props: {
//       catalogs,
//     },
//   }
// }

// export async function getStaticPaths() {
//   const catalogs = await parseCatalogs()
//   const names = Object.keys(catalogs)

//   const paths = names.map((c) => ({
//     params: { id: c },
//   }))

//   return { paths, fallback: false }
// }

export default Catalog
