require([
    "esri/WebScene",
    "esri/layers/CSVLayer",
    "esri/views/SceneView"
  ], function(WebScene, CSVLayer, SceneView) {
    // If CSV files are not on the same domain as your website, a CORS enabled server
    // or a proxy is required.
    const url =
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-11-2020.csv";

    // Paste the url into a browser's address bar to download and view the attributes
    // in the CSV file. These attributes include:
    // * mag - magnitude
    // * type - earthquake or other event such as nuclear test
    // * place - location of the event
    // * time - the time of the event

    const template = {
      title: "Casos detectados",
      content: "Confirmados: {Confirmed}.<br>Muertes: {Deaths}<br>Recuperados: {Recovered}"
    };

    const csvLayer = new CSVLayer({
      url: url,
      copyright: "Covid-19",
      popupTemplate: template
    });

    csvLayer.renderer = renderer = {
        type: "simple",
        field: "Confirmed",
        symbol: {
            type: "simple-marker",
            color: "#fc3131",
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
                        size: "20px"
                    },
                    {
                        value: 200,
                        size: "30px"
                    },
                    {
                        value: 400,
                        size: "40px"
                    },
                    {
                        value: 1000,
                        size: "55px"
                    },
                    {
                        value: 2000,
                        size: "70px"
                    },
                    {
                        value: 4000,
                        size: "75px"
                    },
                    {
                        value: 6000,
                        size: "90px"
                    }
                ]
            },
            {
                type: "opacity",
                field: "Confirmed",
                stops: [
                    {
                        value: 20,
                        opacity: 0.8
                    },
                    {
                        value: 50,
                        opacity: 0.60
                    },
                    {
                        value: 300,
                        opacity: 0.55
                    },
                    {
                        value: 800,
                        opacity: 0.52
                    },
                    {
                        value: 2000,
                        opacity: 0.48
                    },
                    {
                        value: 5000,
                        opacity: 0.40
                    }
                ]
            }
        ]
    };
    
    

    const map = new WebScene({
      basemap: 'hybrid'
    });

    map.add(csvLayer);

    const view = new SceneView({
      container: "viewDiv",
      qualityProfile: "high",
      map: map,
      alphaCompositingEnabled: true,
      highlightOptions: {
        fillOpacity: 0,
        color: "#ffffff"
      },
      camera: {
        position: [
           -3, // lon
             40, // lat
          13000000  // elevation in meters
        ]
      },
      constraints: {
        altitude: {
          min: 700000
        }
      }
    });
    view.environment.background = {
      type: "color",
      color: [0, 0, 0, 0]
    };
  });