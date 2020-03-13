
$(document).ready(function () {
    
    let fecha = getDateStr();
    let URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"+fecha+".csv";
    $.ajax({
        url: URL,
        dataType: "text",
        success: function (data) {
            var employee_data = data.split(/\r?\n|\r/);
            var table_data = '<table class="w-full p-5 text-gray-700">';
                table_data += '<tr>';
                table_data += '<th>País (excepto China y USA)</th><th class="text-blue-500">Confirmados</th><th class="text-blue-900">Muertes</th><th class="text-green-500">Recuperados</th>';
                table_data += '<tr>';
            //for(var count = 0; count<employee_data.length; count++)
            for (var count = 0; count < 50; count++) //TOP 20
            {
                //var cell_data = employee_data[count].split(",");
                var cell_data = splitCsv(employee_data[count]);
                cell_data = cell_data || [];

                if (cell_data[1] == "China") {
                    continue;
                }
                if (cell_data[1] == "US") {
                    continue;
                }

                //Empezamos desde la posición 1 para saltarnos "PRovice/State"
                for (var cell_count = 1; cell_count < cell_data.length; cell_count++) {
                    if (cell_count < 6 && cell_count != 2) { //Quitamos las dos últimas columnas de LAT y LON

                        if (count === 0) {
                            //table_data += '<th>' + cell_data[cell_count] + '</th>';
                        }
                        else {
                            table_data += '<td>' + cell_data[cell_count] + '</td>';
                        }
                    }
                }
                table_data += '</tr>';
            }
            table_data += '</table>';
            $('#tabla-datos').html(table_data);
        }
    });
});
