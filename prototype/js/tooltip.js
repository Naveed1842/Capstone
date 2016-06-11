var complaintypes = ["Heating", "Noise", "Smell"]
var tooltip = d3.select("body").data(complaintypes)
                               .append("div")
                               .style("position","absolute")
                               .style("z-index","10")
                               .style("visibility","hidden");
           
d3.select("rect").on("mouseover", function(){return tooltip.style("visibility","visible");})
                 .on("mousemove",function(){return tooltip.style("top",(event.pageY-10)+"px")
                                                          .style("left",(event.pageX+10)+"px")
                                                          .text(d3.event.pageX-940);})
                 .on("mouseout",function(){return tooltip.style("visibility","hidden");});
                
                