function createChart(ejeX) {

    var chart = Highcharts.chart('line-chart-container', {

        title: {
            text: 'Evolución'
        },

        subtitle: {
            text: 'Datos en regiones principales'
        },

        yAxis: {
            title: {
                text: 'Número de personas'
            }
        },

        xAxis: {
            categories: ejeX
        },

        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },



        series: [],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
    return chart;
}


$(document).ready(function () {

    
    $.ajax({
        url: "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv",
        dataType: "text",
        success: function (data) {
            var world_data = data.split(/\r?\n|\r/);
            var ejeX = []; //Almacena las fechas del eje X
            for (var count = 0; count < world_data.length; count++) {
                var cell_data = splitCsv(world_data[count]);  // Convierte un string tipo CSV a array
                cell_data = cell_data || [];
                // Vamos introduciendo todas las fechas en el array del eje X. Emepezamos en el 24 porque no queremos los primeros dias.
                for (var cell_count = 24; cell_count < cell_data.length; cell_count++) {
                    ejeX.push(cell_data[cell_count]);
                }
            }

            chart = createChart(ejeX); //Crea el gráfico

            var series = []; // Almacena las series. Cada país es una serie
            var paises = ["Japan", "UK", "South Korea", "Iran", "Spain", "France", "Italy", "Germany"]; //Conjunto de paises a mostrar

            for (var count = 1; count < world_data.length; count++) {

                series[count - 1] = [];
                var cell_data = splitCsv(world_data[count]);
                var name = cell_data[1];
                //console.log(name);
                if (paises.includes(name)) {
                    // Emepezamos en el 24 porque no queremos los primeros dias.
                    for (var cell_count = 24; cell_count < cell_data.length; cell_count++) {
                        series[count - 1].push(parseInt(cell_data[cell_count]));
                    }
                    //console.log(series[count-1]);
                    /*
                    chart.options.series.push({
                        name: name,
                    data: series[count-1]
                    });
                    */
                    //console.log(series[count - 1].slice(0, 12));
                    chart.addSeries({
                        name: name,
                        data: series[count - 1]
                    });

                }

            }
            chart.redraw();

        } //fin: success
    }); //fin: ajax
});