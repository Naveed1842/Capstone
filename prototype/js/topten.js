var margin = {top: 20, right: 20, bottom: 30, left: 20},
        width = 240 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;


var compliants = function(zip){
        d3.csv("data/callsfiltered.csv",function(calls){
            data = calls.map(function(d){
                call = +(d[''+zip]);
                ct =  (d['BoroCT2010']);
                return {"callsmade":call,"Cencus":ct};
            })
            bars(data);
        })
        }
        
        var percent = d3.format('%');

        var bars = function(data){
            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1, 1);

            var y = d3.scale.linear()
                .range([height, 0]);
            
            
            var max =d3.max(data,function(d){
                   return d['callsmade'];
                   })
          
            
        
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");
            
             var sorted = data.sort(function(x, y){
               return d3.descending(x.callsmade, y.callsmade);
            });
            
           
             var tip = d3.tip()
                      .attr('class', 'd3-tip')
                      .offset([-8, 0])
                      .html(function(d) {
                        return "<strong>Complain Type:</strong> <span style='color:red'>" + d['Cencus']+":"+d['callsmade'] + "</span>";
                      })
             
             var vis = d3.select("#barcharta");
             var bars = vis.selectAll("rect.bar")
                        .data(sorted)

             
            vis.call(tip);
            
            var result = $.grep(data, function(e){ return e["callsmade"] == (max); });

           
            bars.enter()
                .append("svg:rect")
                .attr("class", "bar")
                 .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
            bars.exit()
                .remove()
            var h = 7;
            bars
                .attr("stroke-width", 4)
                .attr("width", h)  
                 .attr("x", function(d, i) {
                        if(i<20){
                       return (i * 12);
                        }
                    })
                .transition()
                    .delay(200)
                    .ease("exp")
                    .attr("height", function(d,i) 
                          {
                    if(i<20){
                    console.log("top ten:"+max);
                    return ((d.callsmade/max)*150);
                    }
                    })
                    .attr("y", function(d, i){
                        if(i<20){
                    return (height - (((d.callsmade/max)*150)));
                        }
                    })
            
             
        }
        
    function initbar()
    {
        //setup the svg
        var svg = d3.select("#svg4")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            //.attr("preserveAspectRatio", "xMidYMid meet")
            //.attr("viewBox", "0 0 300 200")
            //.classed("svg-container", true)
            //.classed("svg-content-responsive", true); 
   //class to make it responsive
            
        //console.log("svg", svg)
        svg.append("svg4:rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("stroke", "none")
            .attr("fill", "none")
            
      

        svg.append("svg4:g")
            .attr("id", "barcharta")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        
        
    }
