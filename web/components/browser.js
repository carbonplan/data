import { Flex, Box, Grid, Text, Heading } from 'theme-ui'
import data from '../data'

const Browser = ({ catalog, setCatalog }) => {
  const sources = data['master'].sources
  const entries = Object.keys(sources)
  const n = entries.length

  return (
    <Box
      sx={{
        overflowY: 'scroll',
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: '0px',
        borderBottomWidth: '1px',
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
            zIndex: 500,
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
