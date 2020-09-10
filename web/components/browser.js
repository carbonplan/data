import { Flex, Box, Grid, Badge, Text, Heading } from 'theme-ui'
import theme from '../theme'
import data from '../data'

const Browser = ({ visibility, catalog, setCatalog }) => {
  const sources = data['master'].sources
  const entries = Object.keys(sources).filter((e) => visibility[e].show)
  const n = entries.length

  if (n == 0) {
    return (
      <Box
        sx={{
          py: [3],
          bg: 'background',
          borderStyle: 'solid',
          borderColor: 'muted',
          borderWidth: '0px',
          borderBottomWidth: '1px',
          borderTopWidth: '1px',
          zIndex: 500,
          height: 'fit-content',
          fontSize: [3, 3, 4],
        }}
      >
        No results found
      </Box>
    )
  }

  return (
    <Box
      sx={{
        overflowY: 'scroll',
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: '0px',
        borderBottomWidth: '0px',
        borderTopWidth: '1px',
      }}
    >
      {entries.map((c, i) => (
        <Box
          sx={{
            py: [3],
            borderStyle: 'solid',
            borderColor: 'muted',
            borderWidth: '0px',
            borderTopWidth: i == 0 ? '0px' : '1px',
            borderBottomWidth: i == n - 1 ? '1px' : '0px',
            cursor: 'pointer',
            '&:hover > #grid > #container1 > #name': {
              color: 'text',
            },
            '&:hover > #grid > #container2 > #arrow': {
              color: 'text',
            },
          }}
          onClick={() => setCatalog(c)}
          key={c}
        >
          <Grid id='grid' columns={['1fr 60px']}>
            <Flex
              id='container1'
              sx={{
                alignItems: 'center',
              }}
            >
              <Text
                id='name'
                sx={{
                  fontSize: [3, 3, 4],
                  color: catalog == c ? 'text' : 'secondary',
                  transition: '0.15s all',
                  lineHeight: '1.2',
                }}
              >
                {sources[c].name}
                <Box>
                  {sources[c].metadata.tags.map((tag) => (
                    <Badge
                      variant='primary'
                      key={tag}
                      sx={{
                        borderColor: theme.tags[tag],
                        color: theme.tags[tag],
                        mr: [2],
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </Box>
              </Text>
            </Flex>
            <Flex
              id='container2'
              sx={{
                alignItems: 'center',
              }}
            >
              <Text
                id='arrow'
                sx={{
                  fontSize: [5],
                  display: 'inline-block',
                  color: catalog == c ? 'text' : 'secondary',
                  transition: '0.15s all',
                }}
              >
                <Text sx={{ ml: [3] }}>→</Text>
              </Text>
            </Flex>
          </Grid>
        </Box>
      ))}
    </Box>
  )
}

export default Browser
