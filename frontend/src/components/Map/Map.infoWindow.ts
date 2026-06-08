import type { LocationPoint } from '../../types/location-points'

export const customInfoWindow = (content: LocationPoint, upvotedPoints: number[]): string => {
  const noHeader = !content?.name || content?.name === 'Unnamed Location'
  const headerName = noHeader ? content?.description || '' : content.name
  const upvotes = content?.upvotes || 0

  const isUpvoted = upvotedPoints?.includes(content?.id)
  let upvoteClass = 'upvote-btn blank no-shadow'
  if (isUpvoted) {
    upvoteClass += ' upvoted'
  }

  // let headerSection = `<h3 class="big">${headerName}</h3>`
  let headerSection = `
  <div class="title-wrapper">
    <h3 class="location-name">${headerName}</h3>
    <div class="upvote-container">
      <span>${upvotes}</span>
      <button
      class="${upvoteClass}"
      id="upvote-btn"
      ></button>
    </div>
  </div>`

  let citySection = ''
  if (content?.city) {
    citySection = `<div class="city-container margin-container">
      <span class="label">Location</span>
      <p> ${content.city}</p>
    </div>`
  }
  let descriptionSection = ''
  if (content?.description && !noHeader) {
    descriptionSection = `<div class="description-container margin-container">
      <span class="label">Description</span>
      <p>${content.description}</p>
    </div>`
  }
  let categorySection = ''
  if (content?.category) {
    categorySection = `
    <div class="category-container margin-container">
    <span class="label">Category</span>
    <p>${content.category}</p>
    </div>`
  }

  return `
  <div class="custom-info-window">
    <button class="blank edit-location no-shadow" id="edit-location-btn"></button>
    ${headerSection}
    ${citySection}
    ${descriptionSection}
    ${categorySection}
    </div>
    `.trim()
}
// ${content.image_url ? `<img src="${content.image_url}" alt="${content.name}" class="info-window-image"/>` : ''}

export const customInfoWindowOptions = {
  maxWidth: 300,
  className: 'custom-info-window-container',
}
