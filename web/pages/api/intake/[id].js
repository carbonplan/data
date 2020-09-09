import YAML from 'yaml'
import data from '../../../data'
const path = require('path')

export default (req, res) => {
  const {
    query: { id },
  } = req

  const key = path.parse(id).name
  if (key in data) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end(YAML.stringify(data[key]))
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        message: 'Not Found',
        documentation_url: 'https://carbonplan.org/data',
      })
    )
  }
}
