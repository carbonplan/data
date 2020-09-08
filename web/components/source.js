import { Badge, Box, Grid, Heading, Text, Link } from 'theme-ui'
import Expander from './expander'
import CodeBlock from './code-block'

import theme from '../theme'

const Source = ({ name, obj, catId }) => {
  const expanded = true
  const tags = obj.metadata.tags || []
  const code = `
from intake import open_catalog
cat = open_catalog("https://raw.githubusercontent.com/carbonplan/data/master/catalogs/${catId}.yaml")
cat["${name}"].read()
`

  return (
    <Box
      sx={{
        py: [3],
        pr: [4],
        top: '56px',
        bg: 'background',
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: '0px',
        borderBottomWidth: '1px',
        borderTopWidth: '1px',
        zIndex: 500,
      }}
    >
      <Grid gap={['8px', '8px', '16px']} columns={[1, null, '1fr 300px']}>
        <Heading>{obj.metadata.title}</Heading>
        <Box>
          {tags.map((tag) => (
            <Badge
              variant='primary'
              key={tag}
              sx={{
                borderColor: theme.tags[tag],
                color: theme.tags[tag],
                mr: [2],
                ml: [0, 0, 2],
              }}
            >
              {tag}
            </Badge>
          ))}
        </Box>
        <Box>
          <Text sx={{ color: 'text', fontSize: [3] }}>
            {obj.metadata.summary}
          </Text>
          <Text sx={{ color: 'secondary', fontSize: [1] }}>
            {obj.metadata.description}
          </Text>
        </Box>
        <Expander sx={{ align: 'right' }} />
      </Grid>
      {expanded && (
        <Box>
          <Text sx={{ my: [2, 2, 3] }}>
            To load this catalog in Python using{' '}
            <Link href='https://intake.readthedocs.io/en/latest/'>Intake</Link>{' '}
            use:
          </Text>
          <CodeBlock code={code} language='python' />
        </Box>
      )}
      <Box>
        <Text sx={{ color: 'secondary', fontSize: [1] }}>
          License: {obj.metadata.license}
        </Text>
        <Text sx={{ color: 'secondary', fontSize: [1] }}>
          Providers: ...
          {/* {obj.metadata.providers} */}
        </Text>
        <Text sx={{ color: 'secondary', fontSize: [1] }}>
          Type: {obj.metadata.license}
        </Text>
      </Box>
    </Box>
  )
}
export default Source
