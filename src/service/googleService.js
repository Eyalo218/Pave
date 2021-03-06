
function getIconUrl(category) {
    switch (category) {
        case 'Landscape':
            return LANDSCAPE_ICON;
        case 'Urban':
            return URBAN_ICON;
        case 'Food':
            return FOOD_ICON;
        case 'Historical':
            return HISTORICAL_ICON;
        case 'Shopping':
            return SHOPPING_ICON;
        case 'Party':
            return PARTY_ICON;
        case 'Animals':
            return ANIMAL_ICON;
    }
}

function getSelectedIconUrl(category){
    switch (category) {
        case 'Landscape':
            return SELECTED_LANDSCAPE;
        case 'Urban':
            return SELECTED_URBAN;
        case 'Food':
            return SELECTED_FOOD;
        case 'Historical':
            return SELECTED_HISTORICAL;
        case 'Shopping':
            return SELECTED_SHOPPING;
        case 'Party':
            return SELECTED_PARTY;
        case 'Animals':
            return SELECTED_ANIMAL;
    }
}


function setWayPoint(lat, lng, google) {
    return {
        location: new google.maps.LatLng(
            lat,
            lng
        ),
        stopover: true
    }
}

function getWayPts(markers, google) {
    let wayPts = [];
    markers.forEach((marker, idx) => {
        if (idx === 0 || idx === markers.length - 1) return;
        wayPts.push(
            setWayPoint(
                marker.coords.lat,
                marker.coords.lng,
                google
            )
        );
    });
    return wayPts;
}

function getRequest(origin, dest, wayPoints, google) {
    return {
        origin: setLatLng(
            origin.coords.lat,
            origin.coords.lng,
            google
        ),
        destination: setLatLng(
            dest.coords.lat,
            dest.coords.lng,
            google
        ),
        waypoints: wayPoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING
    };
}



function getDirecService(google) {
    return new google.maps.DirectionsService();
}

function getDirecRender(google) {
    return new google.maps.DirectionsRenderer({
        suppressMarkers: true
    });
}

function setLatLng(lat, lng, google) {
    return new google.maps.LatLng(
        lat,
        lng
    )
}

function getBounds(markers, google) {
    let bounds = new google.maps.LatLngBounds();

    markers.forEach(marker => {
        bounds.extend(setLatLng(marker.coords.lat, marker.coords.lng, google))
    });
    return bounds;
}

const LANDSCAPE_ICON = 'https://mt.google.com/vt/icon/name=icons/onion/SHARED-mymaps-container_4x.png,icons/onion/1634-mountain_4x.png&highlight=097138,ff000000&scale=1.0';
const URBAN_ICON = 'https://mt.google.com/vt/icon/name=icons/onion/SHARED-mymaps-container_4x.png,icons/onion/1546-city-buildings_4x.png&highlight=a52714,ff000000&scale=1.0';
const FOOD_ICON = 'https://mt.google.com/vt/icon/name=icons/onion/SHARED-mymaps-container_4x.png,icons/onion/1577-food-fork-knife_4x.png&highlight=000000,ff000000&scale=1.0'
const HISTORICAL_ICON = 'https://mt.google.com/vt/icon/name=icons/onion/SHARED-mymaps-container_4x.png,icons/onion/1834-museum-jp_4x.png&highlight=4e342e,ff000000&scale=1.0';
const SHOPPING_ICON = 'https://mt.google.com/vt/icon/name=icons/onion/SHARED-mymaps-container_4x.png,icons/onion/1684-shopping-bag_4x.png&highlight=880e4f,ff000000&scale=1.0';
const PARTY_ICON = 'https://mt.google.com/vt/icon/name=icons/onion/SHARED-mymaps-container_4x.png,icons/onion/1511-balloons_4x.png&highlight=ffea00,ff000000&scale=1.0';
const ANIMAL_ICON = 'https://mt.google.com/vt/icon/name=icons/onion/SHARED-mymaps-container_4x.png,icons/onion/1759-bear_4x.png&highlight=4e342e,ff000000&scale=1.0';
const SELECTED_LANDSCAPE = '//i.imgur.com/ZWfF2oB.png?1';
const SELECTED_URBAN = '//i.imgur.com/KVLH7BV.png?1';
const SELECTED_FOOD = '//i.imgur.com/v8BbgKB.png?4';
const SELECTED_HISTORICAL = '//i.imgur.com/scq50Rx.png?1';
const SELECTED_SHOPPING = '//i.imgur.com/cd9FLrD.png?1';
const SELECTED_PARTY = '//i.imgur.com/BMs68IY.png?1';
const SELECTED_ANIMAL = '//i.imgur.com/liiYbKO.png?1';




export default {
    getIconUrl,
    setWayPoint,
    getDirecService,
    getDirecRender,
    setLatLng,
    getBounds,
    getWayPts,
    getRequest,
    getSelectedIconUrl
}