google.charts.load('current', {packages: ['corechart']});

function drawAnnotations(enti,enta, t1i,t1a, t2i,t2a, t3i,t3a) {
    //google.charts.load('current', {packages: ['corechart', 'bar']});
    //console.log(enti+"-"+enta +"-"+ t1i+"-"+t1a+"-"+ t2i+"-"+t2a+"-"+ t3i+"-"+t3a);

      var data = google.visualization.arrayToDataTable([
        ['Estadístcas', 'Intentos', 'Aciertos'],
        ['ENT', enti, enta],
        ['T1', t1i, t1a],
        ['T2', t2i, t2a],
        ['T3', t3i, t3a],        
      ]);

      var data = google.visualization.arrayToDataTable([
        ['Estadístcas', 'Intentos', {type: 'string', role: 'annotation'},
         'Aciertos', {type: 'string', role: 'annotation'}],
        ['ENT', enti, enti, enta, enta],
        ['T1', t1i, t1i, t1a, t1a],
        ['T2', t2i, t2i, t2a, t2a],
        ['T3', t3i,t3i, t3a, t3a],       
      ]);

      var options = {
        title: 'Estadísticas Globales Tiro',
        chartArea: {width: '74%'},
        legendTextStyle: { color: '#FFFFFF' },
        legend: { position: 'top', alignment: 'start' },
        titleTextStyle: { color: '#FFFFFF', fontSize: 14 },
        backgroundColor: {
            fill:'#121212'     
        },
        colors: ['#283958', '#a7b9d7'],
        annotations: {
          alwaysOutside: true,
          
          textStyle: {
            fontSize: 12,
            auraColor: 'none',
            color: '#FFFFFF'
          },
          
          boxStyle: {
            stroke: '#ccc',
            strokeWidth: 1,
            gradient: {
              color1: '#121212',
              color2: '#121212',
              x1: '0%', y1: '0%',
              x2: '100%', y2: '100%'
            }
          }
        },
        hAxis: {
          title: 'Total de tiros',
          titleTextStyle: { color: '#FFFFFF', fontSize: 14 },
          format: '#',
          viewWindow: {
            min: 0
          },
          viewWindowMode: "explicit", viewWindow:{ min: 0 },
          baseline: 0,
          textStyle: {
            fontSize: 12,
            auraColor: 'none',
            color: '#FFFFFF'
          }
        },
        vAxis: {
          title: 'Tipos',
          
          titleTextStyle: { color: '#FFFFFF', fontSize: 14 },
          textStyle: {
            fontSize: 12,
            auraColor: 'none',
            color: '#FFFFFF'
          }
        }
      };
      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }



function drawChart(asi,reb,fr,fp,tf,tc,per,rec) {
    console.log("asi,reb,fr,fp,tf,tc,per,rec")
    console.log(asi+"-"+reb +"-"+ fr+"-"+fp+"-"+ tf+"-"+tc+"-"+ per+"-"+rec);
    var data = google.visualization.arrayToDataTable([
    ['Acciones', 'Totales'],
    ['Asistencias', asi], 
    ['Rebotes', reb],
    ['Faltas recibidas', fr],
    ['Faltas personales', fp ],
    ['Tapones favor', tf],
    ['Tapones contra', tc],
    ['Pérdidas', per],
    ['Recuperaciones', rec]
    ]);
    
    // Optional; add a title and set the width and height of the chart
    var options = {
        'title':'Acciones de campo', 
        legendTextStyle: { color: '#FFFFFF' },
        chartArea: {width: '100%'},
        backgroundColor: {
            fill:'#121212'     
        },
        colors: ['#182235', '#283958', '#37507b', '#47679e', '#6181b8', '#849dc8', '#a7b9d7', '#cad5e7'],
        is3D: true
    };
    
    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

