export const convertCollections = (collections,imageSize = {w:580,h:258}) => {
  return collections.map((collection) => {
    return convertCollection(collection,imageSize)
  })
}
export const convertCollection = (collection,imageSize = {w:580,h:258}) => {
  if(!collection){
    return null;
  }
  const imageQuery = new URLSearchParams(imageSize).toString()
  const convertedCollection = {
    ...collection,
    "image": collection.featuredAsset ? collection.featuredAsset.preview + '?' + imageQuery : '',
    "count": 12,
    "url": "/collection/" + collection.id + "/" + collection.slug,
    "parent2": convertCollection(collection.parent,imageSize)
  }
  return convertedCollection
}