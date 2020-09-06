import { useRouter } from 'next/router'
import { Box, Text, Heading, Container } from 'theme-ui'
import Source from '../../components/source'
import { default as NextLink } from 'next/link'

import Layout from '../../components/layout'

import data from '../../data'

const Catalog = ({ catalog }) => {
  const router = useRouter()
  const { id } = router.query

  const description =
    catalog.description || 'No description provided for ' + id + '.'
  const sources = Object.keys(catalog.sources)
  return (
    <Layout hideFooter={true}>
      <Container sx={{ px: [4] }}>
        <Box>
          <Text>
            <NextLink href='/data'>
              <a>
                <Heading
                  sx={{
                    my: [3, 4, 4],
                    fontSize: [6, 7, 7],
                    display: 'inline-block',
                    color: 'text',
                    '&:hover > #arrow': {
                      color: 'secondary',
                    },
                    '&:hover': {
                      color: 'secondary',
                    },
                  }}
                >
                  {' '}
                  data{' '}
                </Heading>
              </a>
            </NextLink>
            <Heading
              sx={{
                my: [3, 4, 4],
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
        {sources.length > 0 && (
          <Box>
            {sources.map((c) => (
              <Source
                name={c}
                catId={id}
                obj={catalog.sources[c]}
                key={c}
              ></Source>
            ))}
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const catalog = data[params.id]

  return {
    props: {
      catalog,
    },
  }
}

export async function getStaticPaths() {
  const names = Object.keys(data)

  const paths = names.map((c) => ({
    params: { id: c },
  }))

  return { paths, fallback: false }
}

export default Catalog
