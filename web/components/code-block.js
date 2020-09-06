/** @jsx jsx */
import { jsx, Box, IconButton, Styled } from 'theme-ui'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const CodeBlock = ({ code, language }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <CopyToClipboard text={code}>
        <IconButton
          aria-label='Copy code blck'
          sx={{
            background: 'transparent',
            position: 'absolute',
            top: '8px',
            right: '12px',
            fill: 'secondary',
            cursor: 'pointer',
            transition: '0.25s all',
            '&:hover': {
              fill: 'text',
            },
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24'
            viewBox='0 0 24 24'
            width='24'
            color='white'
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm4 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z' />
          </svg>
        </IconButton>
      </CopyToClipboard>
      {/* This 'works' but doesn't pick up our theme*/}
      {/* <Highlight {...defaultProps} code={code} language={language}>
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
      </Highlight> */}
      {/* This picks up our theme but doesn't seem to use Prism */}
      <Styled.code className='python'>{code}</Styled.code>
    </Box>
  )
}

export default CodeBlock
