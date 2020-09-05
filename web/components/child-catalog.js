import { Badge, Box, Grid, Heading, Text } from 'theme-ui'
import { default as NextLink } from 'next/link'
import theme from '../theme'
import CodeBlock from './code-block'

const ChildCatalog = ({ name, obj }) => {
  const as = '/data/' + name

  const code = `
   from intake import open_catalog

   cat = open_catalog("https://raw.githubusercontent.com/carbonplan/data/master/catalogs/
  ${name}.yaml")`

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
        display: ['none', 'none', 'inherit'],
        paddingTop: '30px',
        paddingBottom: '30px',
      }}
    >
      <Grid gap={['8px', '8px', '16px']} columns={[1, null, '1fr 300px']}>
        <Heading sx={{ fontSize: [4, 4, 5] }}>{obj.name}</Heading>
        <Box>
          {obj.metadata.tags.map((tag) => (
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

        <Text sx={{ color: 'primary' }}>{obj.description}</Text>
        <NextLink href='/data/[id]' as={as}>
          <a>
            <Text
              sx={{
                color: 'text',
                '&:hover > #arrow': {
                  color: 'secondary',
                },
                '&:hover': {
                  color: 'secondary',
                },
              }}
            >
              <Text id='arrow' variant='arrow' sx={{ fontSize: '24px' }}>
                More →
              </Text>
            </Text>
          </a>
        </NextLink>
      </Grid>
      <Box>
        <Text sx={{ my: [2, 2, 3] }}>
          To load this catalog in Python using Intake use:
        </Text>

        <CodeBlock code={code} language='python' />

        <Text sx={{ fontFamily: 'monospace' }}></Text>
      </Box>
    </Box>
  )
}
export default ChildCatalog
