import { Badge, Box, Grid, Text, Divider, IconButton, Input } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import theme from '../theme'

const Filter = ({ state }) => {
  const allTags = Object.keys(state.tags)
  const tags = allTags.filter((tag) => state.tags[tag][0])

  const toggleTag = (tag) => {
    state.tags[tag][1](!state.tags[tag][0])
  }

  const toggleAll = () => {
    if (tags.length === allTags.length) {
      allTags.forEach((tag) => state.tags[tag][1](false))
    } else {
      allTags.forEach((tag) => state.tags[tag][1](true))
    }
  }

  const handleInputChange = (e) => {
    const searchTerm = e.currentTarget.value
    state.search[1](searchTerm)
  }

  const getStyle = (tag) => {
    if (tags.includes(tag)) {
      return {
        borderColor: theme.tags[tag],
        color: theme.tags[tag],
        mr: [3],
      }
    } else if (tag === 'all') {
      if (tags.length == allTags.length) {
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
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: '0px',
        borderBottomWidth: '1px',
        borderTopWidth: '1px',
        display: ['none', 'none', 'block'],
      }}
    >
      <Box>
        <Text
          sx={{
            color: 'secondary',
            fontSize: [2],
            py: [3],
          }}
        >
          This is a public catalog of datasets related to carbon removal and
          climate solutions. At CarbonPlan, we maintain this data catalog for
          our own use and as a resource to the rest of the research community.
        </Text>
        <Divider sx={{ my: [0] }} />
        <Box sx={{ my: [2] }}>
          <Grid columns={[2, null, '12px 1fr']}>
            <IconButton
              aria-label='Toggle Search'
              sx={{
                stroke: 'secondary',
                fill: 'background',
                cursor: 'pointer',
                transition: 'stroke 0.25s',
                '&:hover': {
                  stroke: 'text',
                },
                mt: [1],
              }}
            >
              <svg height='24px' width='24px' strokeWidth='2'>
                <circle cx='15' cy='9.1' r='6.8' />
                <line x1='2.4' y1='21.7' x2='10.2' y2='13.9' />
              </svg>
            </IconButton>
            <Input
              type='text'
              placeholder='search data'
              sx={{ pt: [1], pl: [3], border: 'none', fontSize: [3] }}
              onChange={handleInputChange}
              value={state.search[0]}
            />
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ mt: [3], mb: [3] }}>
          <Text
            sx={{
              textTransform: 'uppercase',
              fontFamily: 'heading',
              letterSpacing: 'wide',
              mb: [3],
            }}
          >
            Filter by tag
          </Text>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant='primary'
              sx={getStyle(tag)}
              onClick={() => toggleTag(tag)}
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
      </Box>
    </Box>
  )
}
export default Filter
