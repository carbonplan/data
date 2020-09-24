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
  forms: {
    input: {
      fontSize: [2],
      pt: ['4px'],
      pb: ['6px'],
      pl: [0],
      pr: [0],
      fontFamily: 'monospace',
      borderRadius: '0px',
      borderStyle: 'solid',
      borderColor: 'muted',
      borderWidth: '0px',
      borderBottomWidth: '0px',
    },
  },
  tags: {
    ...base.tags,
    climate: 'blue',
    carbon: 'pink',
    forests: 'green',
    meta: 'red',
  },
  styles: {
    ...base.styles,
    pre: {
      margin: [0],
      fontFamily: 'monospace',
      color: 'primary',
      fontSize: [1],
      borderRadius: '2px',
      '.comment,.prolog,.doctype,.cdata': {
        color: 'secondary',
      },
      '.punctuation': {
        opacity: '.7',
      },
      '.namespace': {
        opacity: '.7',
      },
      '.property,.tag,.boolean,.number,.constant,.symbol': {
        color: 'grey',
      },
      '.selector,.attr-name,.string,.char,.builtin,.inserted': {
        color: 'secondary',
      },
      '.operator,.entity,.url,.language-css .string,.style .string,.variable': {
        color: 'primary',
      },
      '.atrule,.attr-value,.keyword': {
        color: 'grey',
      },
      // '.regex,.important': {
      //   color: '#e90',
      // },
      '.important,.bold': {
        fontWeight: 'bold',
      },
      '.italic': {
        fontStyle: 'italic',
      },
      '.entity': {
        cursor: 'help',
      },
      '.deleted': {
        color: 'grey',
      },
      // '.highlight': {
      //   background: 'grey',
      // },
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
