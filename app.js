function fetch_data(){
    var stockname = document.getElementById('name').value
    console.log(stockname)
    const url= 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+stockname+'&interval=5min&apikey=56JJTEG1EKB4RK5U'
    if(stockname === ""){
        alert("Please enter a stock name")
    }
    else{
    fetch(url)
    .then( response => response.json())
    .then( data => {
        var mydata =(data['Time Series (5min)'])
        var key,count =0
        var sharetime = []
        var sharevolume = []
        var sharehigh = []
        var sharelow = []
        document.getElementById('date').style.visibility = 'visible'
       // console.log(mydata)
        for(key in mydata)
        {
            if(mydata.hasOwnProperty(key))
            {
                var mykey = key.split(" ")
               // console.log(mykey[0])
                //console.log(mykey[1])
                sharetime[count]=mykey[1]
                sharevolume[count] = Number(mydata[key]['5. volume'])
                sharehigh[count] = Number(mydata[key]['2. high'])
                sharelow[count] = Number(mydata[key]['3. low'])
               // console.log(sharelow[count])

                document.getElementById('date').innerHTML=
                '<h3> Date : '+mykey[0]+'</h3>'
                count=count+1
            }
        }
        var share_max= Math.max(...sharehigh)
      //  console.log(share_max)
        var share_min= Math.min(...sharelow)
       // console.log(share_min)
        document.getElementById('maxmin').style.visibility = 'visible'
        document.getElementById('max').innerHTML=
        '<h3> Max : $'+share_max+'</h3>'    
        document.getElementById('min').innerHTML=
        '<h3> Min : $'+share_min+'</h3>'    

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        var datarows = [['Time','Volume Traded']]
        for(var i=0;i<count;i++){
            datarows.push([sharetime[i], sharevolume[i]])
        }
  
        function drawChart() {
          var data = google.visualization.arrayToDataTable(datarows);
  
          var options = {
            title: 'Company Performance',
            curveType: 'function',
            legend: { position: 'bottom' },
            backgroundColor : {fill : '#212529'  },
           hAxis:{
            textStyle: {color:'#fff'}
           },
           vAxis:{
            textStyle: {color:'#fff'}
           },
           titleTextStyle: {color:'#fff'},
           legendTextStyle: {color:'#fff'}
          };
  
          var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  
          chart.draw(data, options);
        }
  
    }) 
 } 
}