import Highlight, { defaultProps } from 'prism-react-renderer'
import { Box, Badge } from 'theme-ui'

const CodeBlock = ({ code, language }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Badge
        variant='primary'
        sx={{
          background: 'transparent',
          position: 'absolute',
          top: '8px',
          right: '16px',
        }}
      >
        Copy
      </Badge>
      <Highlight {...defaultProps} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Box>
  )
}

export default CodeBlock
