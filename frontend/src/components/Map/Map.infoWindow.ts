import type { LocationPoint } from '../../types/location-points'

export const customInfoWindow = (content: LocationPoint): string => {

  const noHeader = !content?.name || content?.name === 'Unnamed Location'
  const headerName = noHeader ? content?.description || '' : content.name

  let headerSection = `<h3 class="big">${headerName}</h3>`
  

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
  if(content?.category) {
    categorySection = `
    <div class="category-container margin-container">
    <span class="label">Category</span>
    <p>${content.category}</p>
    </div>`
  }


  return `
  <div class="custom-info-window">
    <button class="blank edit-location" id="edit-location-btn"></button>
    ${headerSection}
    ${citySection}
    ${descriptionSection}
    ${categorySection}
    ${content.image_url ? `<img src="${content.image_url}" alt="${content.name}" class="info-window-image"/>` : ''}
  </div>
  `.trim()
}

export const customInfoWindowOptions = {
  maxWidth: 300,
  className: 'custom-info-window-container',
}
