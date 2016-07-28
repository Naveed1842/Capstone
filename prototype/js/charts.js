

var width = 200,
    height = 150,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var color1 = d3.scale.ordinal()
    .range(["#98abc5", "#ff8c00"]);

var color2 = d3.scale.ordinal()
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



var chart = function(ctract,nhood)
{
   if(document.getElementById("ctmain").checked){
        link = 'data/geo8.csv'
    }
    else{
        link = 'data/ntanew1.csv'
    }
    d3.csv(""+link, function(threedata)
    {
          data = threedata.map(function(d)
            {
                //each d is one line of the csv file represented as a json object
              if(document.getElementById("ctmain").checked){
                        ct = parseInt(d['ID'])
                    }
                    else{
                        ct = (d['ID'])
                    }
                
                calls = parseInt(d['total_calls']);
                medincome = parseInt(d['income per capita'])
                medAge = parseInt(d['Median Age'])
                hholds = parseInt(d['Total households'])
                hunits =  parseInt(d['total housing units'])
                m= {"censustract":ct,"calls": calls, "MedianIncome":medincome,"medianAge":medAge,"hholds":hholds,"hunits":hunits};
                return m;
            });  
        $('#cts').empty();
        $('#cts').append("<strong>Census Tract Selected: "+nhood+"</strong>");
        //console.log("id"+);
        findct(""+ctract,"MedianIncome",'svg','barchart');
        findct(""+ctract,"medianAge",'svg1','barchart1');
        findct(""+ctract,"calls",'svg2','barchart2');
        findct(""+ctract,"hholds",'svg3','barchart3');
        findct(""+ctract,"hunits",'svga3a','barchart3a');
        
        
        //console.log(threedata);
        datanew= threedata.map(function(d){
            v = (d['ID'])
            v1 = parseInt(d['Population under 18']);
            v2 = parseInt(d['population between 18 and 34']);
            v3 = parseInt(d['population between 35 to 64']);
            v4 = parseInt(d['population 65 and over']);
            v1r = parseInt(d['owner  occupied units']);
            v2r = parseInt(d['renter occupied units']);
            f= +(d['family households']);
            g= parseInt(d['nonfamily households']);
            //console.log(f);
            a= parseInt(d['Population white']);
            b= parseInt(d['population black']);
            c= parseInt(d['Population asian']);
            d= parseInt(d['population hispanic']);
            e= parseInt(d['population other race']);
            
            m=[{label:"<18",count:v1,Boro:v},{label:"18-34",count:v2,Boro:v},{label:"35-64",count:v3,Boro:v},{label:"65+",count:v4,Boro:v}];
            m1r=[{label:"owner occupied",count:v1r,Boro:v},{label:"renter occupied",count:v2r,Boro:v}];
            ma=[{label:"White",count:a,Boro:v},{label:"Black",count:b,Boro:v},{label:"Asian",count:c,Boro:v},{label:"Hispanic",count:d,Boro:v}];
            mb=[{label:"Family Household",count:f,Boro:v},{label:"Non Family",count:g,Boro:v}];
      return [m,m1r,ma,mb]
    });
        var r=[];
        var r1=[];
        var r2=[];
        var r3=[];
        //console.log(datanew);
        for (i=0;i<datanew.length;i++){
            var mpie = $.grep(datanew[i][0], function(e){ return e['Boro'] == (ctract); });
            if(mpie.length!=0){
                r=mpie;
            }
            var mpier = $.grep(datanew[i][1], function(e){ return e['Boro'] == (ctract); });
            if(mpier.length!=0){
                r1=mpier;
            }
             var mpiea = $.grep(datanew[i][2], function(e){ return e['Boro'] == (ctract); });
            if(mpiea.length!=0){
                r2=mpiea;
            }
            var mpierb = $.grep(datanew[i][3], function(e){ return e['Boro'] == (ctract); });
            if(mpierb.length!=0){
                r3=mpierb;
            }
        }
       
        console.log(r3);
        //pie population 
        console.log(r3)
        pierunner(r,svg,color);
        pierunner(r1,svgr,color1);
        pierunner(r2,svgr1,color);
        pierunner(r3,svgrb,color1);
  
        
        //piewonership
         
          //pie race

    });   
};
    

function findct(c,wha,svgid,bc){
    
    //console.log(c);
    var result = $.grep(data, function(e){ return e["censustract"] == (""+c); });
    //console.log("result is "+result[0][""+wha]);
  //   console.log(result);

    
    var vis = d3.select("#"+bc)
    //console.log("vis", vis)
    
    var bars = vis.selectAll("rect.bar")
        .data(result)
    var t = vis.selectAll("text.bartext")
                        .data(result)
                        
     var max = d3.max(data, function(d) 
    {
        return d[""+wha]
    });
    
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
			.attr("width",function(d,i){
    //     console.log("cet is : "+(d[""+wha])+" and max is: "+max);
         return ((d[""+wha])*100/(max))
     })
     
     t.exit()
        .remove()
     
    t.enter()
    .append("text")
    .attr("fill-opacity",0)
    .text(result[0][""+wha])
    .attr("class", "bartext")
    .attr("x", ((result[0][""+wha])*100/(max)))
    .attr("y", -40)
    .attr("font-family", "sans-serif")
    .transition()
        .delay(200)
        .attr("fill-opacity",1)
    

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
var pierunner = function(da,svgide,col){
             var g = svgide.selectAll(".arc")
                .data(pie(da))
                .enter().append("g")
                .attr("class", "arc");
            
            g.append("path")
            .style("fill", function(d) { 
                //console.log(d.data.label); 
                return col(d.data['label']) 
            })
            .attr("d", arc)
            //.transition()
            //.duration(300)
        //.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        g.append("text")
          .attr("transform", function(d,i) { return "translate(" + labelArc.centroid(d) + ")" })
          .attr("dy", ".35em")
          .text(function(d,i) { if(d.data['count']!=0){return d.data['label']} })
        } 