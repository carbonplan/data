import { Box, Grid, Heading, Text } from 'theme-ui'
import { default as NextLink } from 'next/link'

const ChildCatalog = ({ name, obj }) => {
  const as = '/data/' + name
  console.log(as)
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
      }}
    >
      <Grid gap={['8px', '8px', '16px']} columns={[1, null, '1fr 300px']}>
        <Heading>{name}</Heading>
        <Text>[Tags go here.]</Text>
        <Text sx={{ color: 'secondary' }}>{obj.description}</Text>
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
                →
              </Text>
            </Text>
          </a>
        </NextLink>
      </Grid>
    </Box>
  )
}
export default ChildCatalog
