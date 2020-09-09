import { Box, Text, Heading, Container } from 'theme-ui'
import { default as NextLink } from 'next/link'
import Source from './source'
import data from '../data'

const Catalog = ({ id }) => {
  
  if (!id) {
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
      }}
    >Select a source to the left to browse a catalog</Box>)
  }

  const sources = Object.keys(data[id].sources)

  return (
    <Box sx={{
      overflowY: 'scroll',
    }}>
        {sources.length > 0 && (
          <Box sx={{
            borderStyle: 'solid',
            borderColor: 'muted',
            borderWidth: '0px',
            borderTopWidth: '1px',
            borderBottomWidth: '1px'
          }}>
            {sources.map((c, i) => (
              <Source
                name={c}
                catId={id}
                obj={data[id].sources[c]}
                key={c}
                index={i}
              ></Source>
            ))}
          </Box>
        )}
    </Box>
  )
}

export default Catalog