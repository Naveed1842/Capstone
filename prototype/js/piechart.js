
var width = 200,
    height = 150,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d,i) 
           { 
    
        console.log(d.count);
        return d.count; 
            
    });

var svg = d3.select("#pie").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var runpie=function(ct){
    d3.csv("data/demographics_CT_NYC_residentsNoN.csv", function( data) {
  datanew= data.map(function(d){
     v = parseInt(d['BoroCT2010'])
      v1 = parseInt(d['Population under 18']);
      v2 = parseInt(d['population between 18 and 34']);
      v3 = parseInt(d['population between 35 to 64']);
      v4 = parseInt(d['population 65 and over']);
      m=[{label:"<18",count:v1,Boro:v},{label:"18-34",count:v2,Boro:v},{label:"35-64",count:v3,Boro:v},{label:"65+",count:v4,Boro:v}];
      return m
    })
  var r=[]
  for (i=0;i<datanew.length;i++){
      
     var m = $.grep(datanew[i], function(e){ return e['Boro'] == (ct); });
      if(m.length!=0){
          r=m;
      }
  }
  console.log("ct selected :"+ct);
  console.log(r);
  //console.log(datanew.count);
  var g = svg.selectAll(".arc")
      .data(pie(r))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .style("fill", function(d) { 
      console.log(d.data.label); 
      return color(d.data['label']) 
  })
        .attr("d", arc)
        .transition()
        .duration(300)
        
        //.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
  g.append("text")
      .attr("transform", function(d,i) { return "translate(" + labelArc.centroid(d) + ")" })
      .attr("dy", ".35em")
      .text(function(d,i) { return d.data['label'] })
});
}