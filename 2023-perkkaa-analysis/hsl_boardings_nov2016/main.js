const mapConfig = {
    centerCoordinates: [24.826367, 60.214861],
    zoomLevels: { min: 10, default: 14.5, max: 17 },
    styleUrl: './data/style.json'
};

let map;
const tooltipElement = document.getElementById('tooltip');

document.addEventListener('DOMContentLoaded', function () {
    map = initializeMap(mapConfig);
    map.on('load', function () {
        createBoardingsLayer();
        map.on('mousemove', showTooltipOnHover);
    });
});

// fn. to initialize the map
function initializeMap(config) {
    const map = new maplibregl.Map({
        container: 'map',
        style: config.styleUrl,
        center: config.centerCoordinates,
        zoom: config.zoomLevels.default,
        minZoom: config.zoomLevels.min,
        maxZoom: config.zoomLevels.max,
        pitch: 0,
        bearing: 0,
        pitchWithRotate: false,
        maxBounds: [
            [24.259512, 59.903851],
            [25.454228, 60.450752]
        ]
    });

    return map;
}

// fn. to create the boardings layer
function createBoardingsLayer() {
    map.addSource('boardings', {
        type: 'geojson',
        data: './data/hsl-boardings-nov2016-min.geojson'
    });

    map.addLayer({
        id: 'boardingsLayer',
        type: 'circle',
        source: 'boardings',
        paint: {
            'circle-radius': [
                'interpolate', ['linear'], ['get', 'passengers'],
                1, 2,
                3000, 20
            ],
            'circle-color': '#3587A4',
            'circle-opacity': 0.05,
            'circle-stroke-color': '#3587A4',
            'circle-stroke-width': 1
        }
    });
}

// fn. to show tooltip on hover
function showTooltipOnHover(event) {
    const features = map.queryRenderedFeatures(event.point, { layers: ['boardingsLayer'] });
    if (features.length) {
        const feature = features[0];
        const tooltipContent = `
            <strong>Station:</strong> ${feature.properties.name}<br>
            <strong>Passengers:</strong> ${feature.properties.passengers}
        `;
        tooltipElement.innerHTML = tooltipContent;
        tooltipElement.style.display = 'block';
        tooltipElement.style.left = event.point.x + 'px';
        tooltipElement.style.top = event.point.y + 'px';
    } else {
        tooltipElement.style.display = 'none';
    }
}