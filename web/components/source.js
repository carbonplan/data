import { Box, Grid, Heading, Text } from 'theme-ui'
import Expander from './expander'

const Source = ({ name, obj }) => {
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
        <Expander />
      </Grid>
    </Box>
  )
}
export default Source
