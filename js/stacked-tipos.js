function createStackedChart(paises, confirmed, deaths, recovered) {
    Highcharts.chart('stacked-tipos-container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Casos por tipo'
        },
        xAxis: {
            categories: paises
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Número de casos confirmados/muertes/recuperados'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Confirmados',
            data: confirmed,
            color: '#4299e1'
        }, {
            name: 'Muertes',
            data: deaths,
            color: '#2a4365'
        }, {
            name: 'Recuperados',
            data: recovered,
            color: '#48bb78'
        }]
    });
}


$(document).ready(function () {
    let fecha = getDateStr();
    let URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"+fecha+".csv";
    
    $.ajax({
        url: URL,
        dataType: "text",
        success: function (data) {
            var covid_data = data.split(/\r?\n|\r/);
            var paises = [];
            var deaths = [];
            var confirmed = [];
            var recovered = [];
            for (var count = 1; count < 20; count++) //TOP 20
            {

                var cell_data = splitCsv(covid_data[count]);
                cell_data = cell_data || [];

                if (cell_data[1] == "China") {
                    continue;
                }
                if (cell_data[1] == "US") {
                    continue;
                }

                paises.push(cell_data[1]);
                confirmed.push(parseInt(cell_data[3]));
                deaths.push(parseInt(cell_data[4]));
                recovered.push(parseInt(cell_data[5]));

            }

            createStackedChart(paises, confirmed, deaths, recovered);

        }
    });
});