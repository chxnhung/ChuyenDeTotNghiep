export const convertBanners = (collections, imageSize = {w: 1920, h: 730}) => {
    return collections.map((collection) => {
        return convertBanner(collection, imageSize)
    })
}
export const convertBanner = (collection, imageSize = {w: 1920, h: 730}) => {
    const imageQuery = new URLSearchParams(imageSize).toString()
    const convertedBanner = {
        "id": collection.id,
        "bgImage": collection.featuredAsset ? collection.featuredAsset.preview + '?' + imageQuery : '',
        "url": "/collection/" + collection.id + "/" + collection.slug
    }
    return convertedBanner
}