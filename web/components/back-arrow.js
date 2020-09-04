import { Box, Text } from 'theme-ui'
import { useThemeUI } from 'theme-ui'
import { default as NextLink } from 'next/link'

const BackArrow = () => {
  const context = useThemeUI()
  const theme = context.theme

  return (
    <NextLink href='/data'>
      <a>
        <Text
          sx={{
            fontFamily: 'faux',
            color: 'text',
            display: 'inline-block',
            mr: [3],
            fontSize: [7],
            mt: [2],
            cursor: 'pointer',
            '&:hover': {
              color: 'secondary',
            },
          }}
        >
          ←
        </Text>
      </a>
    </NextLink>
  )
}

export default BackArrow
