import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

const catalogDir = '../catalogs'

async function parseCatalogs(file) {
  const catalogs = {}

  var files
  if (!file) {
    files = fs.readdirSync(catalogDir) // I don't think this is recursive
  } else {
    files = [file]
  }

  files.map((f) => {
    const key = f.replace('.yaml', '').replace('.yml', '')
    const file = fs.readFileSync(path.join(catalogDir, f), 'utf8')
    catalogs[key] = YAML.parse(file)
  })

  console.log('result', catalogs)

  return catalogs
}

export default parseCatalogs
