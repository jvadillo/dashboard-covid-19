$(document).ready(function () {
    require([
        "esri/Map",
        "esri/layers/CSVLayer",
        "esri/views/MapView",
        "esri/widgets/Legend"
      ], function(Map, CSVLayer, MapView, Legend) {
        let fecha = getDateStr();
        let URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"+fecha+".csv";

        // Paste the url into a browser's address bar to download and view the attributes
        // in the CSV file. These attributes include:
        // * mag - magnitude
        // * type - earthquake or other event such as nuclear test
        // * place - location of the event
        // * time - the time of the event

        const heatmap_template = {
          title: "Muertes por Covid-19",
          content: "Confirmados: {Confirmed}.<br>Muertes: {Deaths}<br>Recuperados: {Recovered}."
        };

        // The heatmap renderer assigns each pixel in the view with
        // an intensity value. The ratio of that intensity value
        // to the maxPixel intensity is used to assign a color
        // from the continuous color ramp in the colorStops property

        const heatmap_renderer = {
          type: "heatmap",
          colors: ["#472b77","#563098","#7139d4","#e0cf40","#ffff00"],
          /*colorStops: [
            { color: "rgba(63, 40, 102, 0)", ratio: 0 },
            { color: "#472b77", ratio: 0.083 },
            { color: "#4e2d87", ratio: 0.166 },
            { color: "#563098", ratio: 0.249 },
            { color: "#5d32a8", ratio: 0.332 },
            { color: "#6735be", ratio: 0.415 },
            { color: "#7139d4", ratio: 0.498 },
            { color: "#7b3ce9", ratio: 0.581 },
            { color: "#853fff", ratio: 0.664 },
            { color: "#a46fbf", ratio: 0.747 },
            { color: "#c29f80", ratio: 0.83 },
            { color: "#e0cf40", ratio: 0.913 },
            { color: "#ffff00", ratio: 1 }
          ],*/
          maxPixelIntensity: 15,
          minPixelIntensity: 0
        };

        const heatmap_layer = new CSVLayer({
          url: URL,
          title: "Muertes por coronavirus",
          copyright: "Covid-19",
          popupTemplate: heatmap_template,
          renderer: heatmap_renderer
        });

        const heatmap_map = new Map({
          basemap: "gray",
          field:"Deaths",
          layers: [heatmap_layer]
        });

        const heatmap_view = new MapView({
          container: "heatmap-container",
          center: [40.416775, 14.703790],
          zoom: 2,
          map: heatmap_map
        });

        
        heatmap_view.ui.add(
          new Legend({
            view: heatmap_view,
            width: "100px"
          }),
          "bottom-left"
        );
      });
});