import data from '../data'

const searchWithTags = (search, tags) => {
  const lsearch = search.toLowerCase()
  const visibility = {}

  for (const [catKey, catalog] of Object.entries(data)) {
    if (catKey === 'master') {
      continue
    }
    visibility[catKey] = {
      show: false,
      sources: {},
    }
    for (const [name, source] of Object.entries(catalog.sources)) {
      if (
        // compare search
        (name.toLowerCase().includes(lsearch) ||
          source.metadata.title.toLowerCase().includes(lsearch) ||
          source.metadata.summary.includes(lsearch)) &&
        // compare tags
        source.metadata.tags.some((tag) => tags.includes(tag))
      ) {
        visibility[catKey].show = true // show catalog
        // and source
        visibility[catKey].sources[name] = { show: true }
      } else {
        visibility[catKey].sources[name] = { show: false }
      }
    }
  }

  return visibility
}

export default searchWithTags
