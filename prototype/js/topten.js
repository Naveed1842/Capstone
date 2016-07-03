 var margin = {top: 20, right: 20, bottom: 30, left: 20},
        width = 260 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
var compliants = function(zip){
        d3.csv("data/callsfiltered.csv",function(calls){
            //console.log("complaints:", calls);
             //console.log(calls)
            data = calls.map(function(d){
                call = +(d[''+zip]);
                ct =  (d['BoroCT2010']);
                return {"callsmade":call,"Cencus":ct};
            })
            //console.log(calls);
            bars(data);
        })
        }
        
        var formatPercent = d3.format(".0%");
        

        var bars = function(data){
            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1, 1);

            var y = d3.scale.linear()
                .range([height, 0]);
            
            
            var max =d3.max(data,function(d){
                   //console.log(d['callsmade']);
                   return d['callsmade'];
                   })
          
            
        
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(formatPercent);
            
             var sorted = data.sort(function(x, y){
               return d3.descending(x.callsmade, y.callsmade);
            });
            
           
             var tip = d3.tip()
                      .attr('class', 'd3-tip')
                      .offset([-8, 0])
                      .html(function(d) {
                        return "<strong>Complain Type:</strong> <span style='color:red'>" + d['Cencus']+":"+d['callsmade'] + "</span>";
                      })
             
             var vis = d3.select("#barcharta")
            //console.log("vis", vis);
            
            vis.call(tip);
            
            var result = $.grep(data, function(e){ return e["callsmade"] == (max); });
            //var keysSorted = Object.keys(data).sort(function(a,b){return data[b]-data[a]})
          
            
             
            
            var bars = vis.selectAll("rect.bar")
                        .data(sorted)
                        
           
                    
            //console.log("tip is "+tip);
          
        
               //enter
            bars.enter()
                .append("svg:rect")
                .attr("class", "bar")
                 .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
            
                
            
            
            //exit 
            bars.exit()
                .remove()

            bars
                .attr("stroke-width", 4)
                .attr("height", function(d,i) 
                {   
                    return (d.callsmade);
                })
                .attr("width", 8)  
                 .attr("x", function(d, i) {
                       return (i * 12);
                    })
                .attr("y", function(d, i){
                
                    return (height - d.callsmade)/2;
                    })
                
                
                
            
           // console.log(sorted[Object.keys(sorted)[2]]);
            
            //console.log(result);
            console.log(max);
       
        }
        
    function initbar()
    {
        //setup the svg
        var svg = d3.select("#svg4")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
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