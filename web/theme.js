import base from '@carbonplan/theme'
import { alpha } from '@theme-ui/color'

export default {
  ...base,
  badges: {
    primary: {
      letterSpacing: 'wide',
      cursor: 'pointer',
      color: 'primary',
      borderStyle: 'solid',
      borderColor: 'primary',
      borderWidth: '0px',
      borderBottomWidth: '1px',
      bg: 'background',
      borderRadius: '0px',
      textTransform: 'uppercase',
      mb: [2],
      pt: ['1px'],
      pb: ['2px'],
      pl: [0],
      pr: [0],
      fontSize: [1],
      fontFamily: 'monospace',
    },
  },
  tags: {
    ...base.tags,
    climate: 'blue',
    carbon: 'grey',
    fire: 'red',
    projects: 'pink',
  },
  styles: {
    ...base.styles,
    pre: {
      px: [3],
      py: [3],
      fontFamily: 'monospace',
      color: 'primary',
      fontSize: [2],
      backgroundColor: alpha('muted', 0.2),
      borderRadius: '2px',
      '.comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url': {
        color: 'grey',
      },
      '.comment': {
        fontStyle: 'italic',
      },
      '.property, .tag, .boolean, .number, .constant, .symbol, .deleted, .function, .class-name, .regex, .important, .variable': {
        color: 'blue',
      },
      '.atrule, .attr-value, .keyword': {
        color: 'primary',
      },
      '.selector, .attr-name, .string, .char, .builtin, .inserted': {
        color: 'secondary',
      },
    },
    inlineCode: {
      px: [1],
      mx: [1],
      pt: [0],
      pb: [1],
      fontFamily: 'monospace',
      backgroundColor: alpha('muted', 0.2),
    },
  },
}
