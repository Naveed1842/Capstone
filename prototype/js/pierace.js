
var width = 200,
    height = 150,
    radius = Math.min(width, height) / 2;

var color1 = d3.scale.ordinal()
    .range(["#98abc5", "#ff8c00"]);

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

var svgr = d3.select("#pie1").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var runpie1=function(ct){
    d3.csv("data/demographics_CT_NYC_residentsNoN.csv", function( data) {
  datanew= data.map(function(d){
      v = parseInt(d['ID'])
      v1 = parseInt(d['owner  occupied units']);
      v2 = parseInt(d['renter occupied units']);
      m=[{label:"owner occupied",count:v1,Boro:v},{label:"renter occupied",count:v2,Boro:v}];
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
  var g = svgr.selectAll(".arc")
      .data(pie(r))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .style("fill", function(d) { 
      console.log(d.data.label); 
      return color1(d.data['label']) 
  })
        .attr("d", arc)
        
        //.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
  g.append("text")
      .attr("transform", function(d,i) { return "translate(" + labelArc.centroid(d) + ")" })
      .attr("dy", ".35em")
      .text(function(d,i) { if(d.data['count']!=0){return d.data['label'] }})
});
};