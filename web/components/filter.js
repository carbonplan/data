import { Badge, Box, Grid, IconButton } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import theme from '.././theme'

const Filter = () => {
  const allTags = ['climate', 'carbon', 'forests', 'fire', 'projects']

  const getStyle = (tag) => {
    if (allTags.includes(tag)) {
      return {
        borderColor: theme.tags[tag],
        color: theme.tags[tag],
        mr: [3],
      }
    } else if (tag === 'all') {
      if (allTags.length == 6) {
        return {
          borderColor: 'primary',
          color: 'primary',
          mr: [3],
        }
      } else {
        return {
          borderColor: alpha('primary', 0.2),
          color: alpha('primary', 0.2),
          mr: [3],
        }
      }
    } else {
      return {
        borderColor: alpha(theme.tags[tag], 0.2),
        color: alpha(theme.tags[tag], 0.2),
        mr: [3],
      }
    }
  }

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
      <Grid columns={[1, null, '1fr 30px']}>
        <Box>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant='primary'
              sx={getStyle(tag)}
              onClick={() => addOrRemove(tag)}
            >
              {tag}
            </Badge>
          ))}
          <Badge
            variant='primary'
            sx={getStyle('all')}
            onClick={() => toggleAll()}
          >
            all
          </Badge>
        </Box>
        <Box sx={{ display: ['none', 'none', 'inherit'], cursor: 'pointer' }}>
          <IconButton
            aria-label='Toggle Search'
            sx={{
              stroke: 'text',
              fill: 'background',
              cursor: 'pointer',
              transition: 'stroke 0.25s',
              '&:hover': {
                stroke: 'text',
              },
            }}
          >
            <svg height='24px' width='24px' strokeWidth='2'>
              <circle cx='15' cy='9.1' r='6.8' />
              <line x1='2.4' y1='21.7' x2='10.2' y2='13.9' />
            </svg>
          </IconButton>
        </Box>
      </Grid>
    </Box>
  )
}
export default Filter
