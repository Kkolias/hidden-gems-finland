import L from 'leaflet'

export const markerIcon = L.icon({
    iconUrl: 'marker-icon.png',
    // shadowUrl: 'leaf-shadow.png',

    iconSize:     [26, 34], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [13, 34], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -34] // point from which the popup should open relative to the iconAnchor
});