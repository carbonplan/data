function chilrenAndSources(obj) {
  const children = []
  const sources = []
  for (let [key, value] of Object.entries(obj.sources)) {
    if (value.driver == 'intake.catalog.local.YAMLFileCatalog') {
      children.push(key)
    } else {
      sources.push(key)
    }
  }

  return [children, sources]
}

export default chilrenAndSources
