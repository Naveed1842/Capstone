
var chart = function(ctract,type,svgid,bc)
{
d3.csv("data/Demographic311censusNonan.csv", function(threedata)
{
      data = threedata.map(function(d)
        {
            //each d is one line of the csv file represented as a json object
            ct = parseInt(d['BoroCT2010'])
            calls = parseInt(d['311 calls']);
            medincome = parseInt(d['Median Income'])
            medAge = parseInt(d['Median Age'])
            hholds = parseInt(d['Total households'])
            m= {"censustract":ct,"calls": calls, "MedianIncome":medincome,"medianAge":medAge,"hholds":hholds};
            return m;
        });  
    console.log("svgid"+svgid);
    findct(""+ctract,""+type,svgid,bc);
    
});   
};
    

function findct(c,wha,svgid,bc){
    
    
    var result = $.grep(data, function(e){ return e["censustract"] == (""+c); });
    //console.log("result is "+result[0][""+wha]);
    
    max = d3.max(data, function(d) 
    {
        return d[""+wha]
    });
    

    
   // console.log(max)
    
    var vis = d3.select("#"+bc)
    //console.log("vis", vis)
    
    var bars = vis.selectAll("rect.bar")
        .data(data)
    var t = vis.selectAll("text.bartext")
                        .data(data)
                        
   
    
     bars.enter()
        .append(""+svgid+":rect")
        .attr("class", "bar")
        .attr("fill", "#800")
        .attr("stroke", "#800")
        .attr("x",-45)
        .attr("y",-45)
        .attr("rx",5)
        .attr("ry",5)
     
        
            
    bars.exit()
        .remove()
    
     bars
        .attr("stroke-width", 4)
        .attr("height", 2)
        .transition()
         .duration(500)
            .delay(200)
            .ease("linear")
			.attr("width",((result[0][""+wha])*100/(max)))
     
     t.exit()
        .remove()
     
    t.enter()
    .append("text")
    .text(result[0][""+wha])
    .attr("class", "bartext")
    .attr("x", ((result[0][""+wha])*100/(max)))
    .attr("y", -40)
    .attr("font-family", "sans-serif")
    .attr("fill", "black")
    

  };

function init(svgid,ide)
    {

        //setup the svg
        var svg = d3.select("#"+svgid)
            .attr("width", 200)
            .attr("height", 11)
            
        svg.append(""+svgid+":rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "black")
            .attr("fill-opacity", ".45")
            .attr("rx",5)
            .attr("ry",5)
            
           

        svg.append(""+svgid+":g")
            .attr("id", ""+ide)
            .attr("transform", "translate(50,50)")
    }




   