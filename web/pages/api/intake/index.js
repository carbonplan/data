import data from '../../../data'

export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ catalogs: Object.keys(data).sort() }))
}
