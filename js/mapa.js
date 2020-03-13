$(document).ready(function () {
    require([
        "esri/Map",
        "esri/layers/CSVLayer",
        "esri/views/MapView"
    ], function (Map, CSVLayer, MapView) {
        // If GeoJSON files are not on the same domain as your website, a CORS enabled server
        // or a proxy is required.
        
        
        let fecha = getDateStr();
        let URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"+fecha+".csv";

        const template = {
            title: "Muertes por Covid-19",
            content: "Confirmados: {Confirmed}.<br>Muertes: {Deaths}<br>Recuperados: {Recovered}."
          };

        const renderer = {
            type: "simple",
            field: "Confirmed",
            symbol: {
                type: "simple-marker",
                color: "#4299e1",
                outline: {
                    color: "white"
                }
            },
            visualVariables: [
                /*
                {
                    type: "size",
                    field: "3/7/20",
                    minDataValue: 1,
                    maxDataValue: 5000,
                    minSize: 3,
                    maxSize: 50
                }*/

                {
                    type: "size",
                    field: "Confirmed",
                    stops: [
                        {
                            value: 20,
                            size: "15px"
                        },
                        {
                            value: 50,
                            size: "25px"
                        },
                        {
                            value: 200,
                            size: "35px"
                        },
                        {
                            value: 400,
                            size: "50px"
                        },
                        {
                            value: 1000,
                            size: "65px"
                        }
                    ]
                },
                {
                    type: "opacity",
                    field: "Confirmed",
                    stops: [
                        {
                            value: 20,
                            opacity: 0.9
                        },
                        {
                            value: 50,
                            opacity: 0.65
                        },
                        {
                            value: 200,
                            opacity: 0.61
                        },
                        {
                            value: 400,
                            opacity: 0.62
                        },
                        {
                            value: 1000,
                            opacity: 0.65
                        }
                    ]
                }
            ]
        };
        /*
        const geojsonLayer = new GeoJSONLayer({
            url: url,
            copyright: "Casos Covid19",
            popupTemplate: template,
            renderer: renderer //optional
        });*/

        const confirmed_layer = new CSVLayer({
            url: URL,
            title: "Muertes por coronavirus",
            copyright: "Casos Covid19",
            popupTemplate: template,
            renderer: renderer
          });

        const map = new Map({
            basemap: "gray",
            layers: [confirmed_layer]
        });

        const view = new MapView({
            container: "contenedor-mapa",
            center: [40.416775, 14.703790],
            zoom: 2,
            map: map
        });

    });
});