var width = 200,
    height = 150,
    radius = Math.min(width, height) / 2;


var chartw = function(ctract,nhood)
{
   if(document.getElementById("ctmain").checked){
        link = 'data/geo8.csv'
    }
    else{
        link = 'data/ntanew1.csv'
    }
    console.log("here worker");
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
                
                calls = parseInt(d['total workers']);
                medincome = parseInt(d['work at home'])
                medAge = parseInt(d['Median Age']+'_n')
                hholds = parseInt(d['Total households']+'n')
                m= {"censustract":ct,"calls": calls, "MedianIncome":medincome,"medianAge":medAge,"hholds":hholds};
                return m;
            });  
        $('#cts').empty();
        $('#cts').append("<strong>Census Tract Selected: "+nhood+"</strong>");
        //console.log("id"+);
        findct(""+ctract,"MedianIncome",'svgw','barchartw');
        findct(""+ctract,"medianAge",'svgw1','barchartw1');
         findct(""+ctract,"calls",'svgw2','barchartw2');
        findct(""+ctract,"hholds",'svgw3','barchartw3');
       
            
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
     //       console.log(f);
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
        //console.log(r);
        pierunner(r,svgw,color);
        pierunner(r1,svgrw,color1); 
        pierunner(r2,svgrwa,color);
        pierunner(r3,svgrwb,color1);
        

    });   
};
    