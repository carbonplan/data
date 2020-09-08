import { Badge, Box, Grid, Heading, Link, Text } from 'theme-ui'
import { default as NextLink } from 'next/link'
import theme from '../theme'
import CodeBlock from './code-block'

const ChildCatalog = ({ name, obj }) => {
  const as = '/data/' + name

  const code = `
from intake import open_catalog
cat = open_catalog("https://raw.githubusercontent.com/carbonplan/data/master/catalogs/${name}.yaml")
`

  return (
    <Box
      sx={{
        py: [3],
        pr: [4],
        bg: 'background',
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: '0px',
        borderBottomWidth: '0px',
        borderTopWidth: '1px',
        zIndex: 500,
        paddingTop: '30px',
        paddingBottom: '30px',
      }}
    >
      <Grid gap={['8px', '8px', '16px']} columns={[1, null, '1fr 200px']}>
        <Box>
        <Heading sx={{ fontSize: [4, 4, 5] }}>
          {obj.name}
          <NextLink href='/data/[id]' as={as}>
            <a>
              <Text
                sx={{
                  display: 'inline-block',
                  color: 'text',
                  '&:hover': {
                    color: 'secondary',
                  },
                }}
              >
                <Text sx={{ ml: [3] }}>
                  →
                </Text>
              </Text>
            </a>
          </NextLink>
        </Heading>
        </Box>
        <Box sx={{ textAlign: ['left', null, 'right'] }}>
          {obj.metadata.tags.map((tag) => (
            <Badge
              variant='primary'
              key={tag}
              sx={{
                cursor: 'default',
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
      </Grid>
      <Box>
        <Text sx={{ my: [2, 2, 3] }}>
          To load this catalog in Python using{' '}
          <Link href='https://intake.readthedocs.io/en/latest/'>Intake</Link>{' '}
          use:
        </Text>
        <CodeBlock code={code} language='python' />
      </Box>
    </Box>
  )
}
export default ChildCatalog
