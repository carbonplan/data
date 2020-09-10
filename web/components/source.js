import { Badge, Box, Grid, Heading, Text, Link } from 'theme-ui'
import { useState } from 'react'
import Expander from './expander'
import CodeBlock from './code-block'
import unified from 'unified'
import parse from 'remark-parse'
import remarkReact from 'remark-react'

import theme from '../theme'

const Source = ({ name, obj, catId, index }) => {
  const [expanded, setExpanded] = useState(false)

  const tags = obj.metadata.tags || []
  const code = `
from intake import open_catalog
cat = open_catalog("https://data.carbonplan.org/api/intake/${catId}.yaml")
cat["${name}"].read()
`

  const description = unified()
    .use(parse)
    .use(remarkReact, {
      remarkReactComponents: {
        a: Link,
      },
    })
    .processSync(obj.metadata.description).result

  const toggle = () => {
    setExpanded(!expanded)
  }
  return (
    <Box
      sx={{
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: '0px',
        borderBottomWidth: '0px',
        borderTopWidth: index == 0 ? '0px' : '1px',
        zIndex: 500,
      }}
    >
      <Grid
        onClick={toggle}
        gap={['8px', '8px', '16px']}
        columns={['1fr 20px']}
        sx={{
          py: [3],
          pr: [4],
          cursor: 'pointer',
          '&:hover > #expander': {
            fill: 'primary',
            stroke: 'primary',
          },
        }}
      >
        <Box>
          <Text sx={{ fontSize: [3, 3, 4] }}>{obj.metadata.title}</Text>
        </Box>
        <Expander
          sx={{ align: 'right' }}
          toggle={toggle}
          expanded={expanded}
          id='expander'
        />
      </Grid>
      {expanded && (
        <Box sx={{ mb: [3], mt: ['-8px'] }}>
          <Box>
            <Text
              sx={{
                color: 'text',
                maxWidth: 'calc(100% - 50px)',
                fontSize: [3],
                my: [2],
                lineHeight: [1.25]
              }}
            >
              {obj.metadata.summary}
            </Text>
            <Text
              sx={{
                color: 'secondary',
                maxWidth: 'calc(100% - 50px)',
                fontSize: [1],
                my: [3],
              }}
            >
              {description}
            </Text>
          </Box>
          <Box sx={{
            position: 'relative',
            maxWidth: 'calc(100% - 50px)',
          }}>
            <CodeBlock code={code} language='python' />
          </Box>
          <Box sx={{ py: [2] }}>
            <Text
              sx={{
                color: 'text',
                fontSize: [1],
                mb: [2],
              }}
            >
              <Text sx={{ color: 'secondary' }}>License</Text>
              {obj.metadata.license}
            </Text>
            <Box
              sx={{
                color: 'text',
                fontSize: [1],
                mb: [2],
              }}
            >
              <Text sx={{ color: 'secondary' }}>Provider</Text>
              <Text>
                <Link
                  sx={{
                    lineHeight: [0],
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'secondary',
                    },
                    '&:hover > #arrow': {
                      color: 'secondary',
                    },
                  }}
                  href={obj.metadata.providers[0].url}
                >
                  {obj.metadata.providers[0].name}
                  <Text
                    sx={{
                      display: 'inline-block',
                      fontSize: [4],
                      position: 'relative',
                      top: '4px',
                      ml: [2],
                    }}
                  >
                    ↗
                  </Text>
                </Link>
              </Text>
            </Box>
            <Text
              sx={{
                color: 'text',
                fontSize: [1],
              }}
            >
              <Text sx={{ color: 'secondary' }}>Type</Text>
              {obj.metadata.type}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  )
}
export default Source
