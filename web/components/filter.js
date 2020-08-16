import { Box, Text } from 'theme-ui'

const Filter = () => {
  return (
    <Box
      sx={{
        py: [3],
        pr: [4],
        position: 'sticky',
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
      Filter here
    </Box>
  )
}
export default Filter
