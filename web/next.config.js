const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  pageExtensions: ['jsx', 'js'],
  assetPrefix: isDev ? '' : 'https://data.carbonplan.org/',
}
