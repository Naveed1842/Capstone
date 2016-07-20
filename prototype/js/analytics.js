var flag=0;
var map = L.map('map', {
        scrollWheelZoom: true
      }).setView( [40.717802, -73.81326], 11);

var dblclickzoom = function(){
if(document.getElementById('doubleclickckeck').checked){
    //console.log("checked")
    map.doubleClickZoom.disable();
}
    else{
         map.doubleClickZoom.enable();
    }
};


dblclickzoom();
//map.doubleClickZoom.disable();
//map.dragging.disable();
map.scrollWheelZoom.disable();
      
   $("#rstmap").click(function(){
        map.setView( [40.767802, -73.81326], 11);
       
       $("#analyticsc").hide();
        $("#settingsc").hide();
        $("#mainc").hide();
        $("#teamc").hide()
        $("#prediction").hide();
        $('#mainc').show();
   });

      var geojson;
        
var mx=0       
var maximus = function(k){
    var max
    console.log(k)
    d3.csv("data/geo5.csv", function(threedata)
           {
              data = threedata.map(function(d)
                {
                    //each d is one line of the csv file represented as a json object
                    ct = +(d[""+k]);
                    //tpop = +(d['Total Population'])
                    //console.log(ct);
                    m= {"com":ct};
                    return m;
                });  
            max = d3.max(data,function(d){
                return d["com"]
            });
            console.log(max);
            mx=max;
            return max;
    
});
    
};
    //color codes for background
    var s1=['#edf8fb','#FFE0F8','','',''];
    var s2=['#ccece6','#FCBAED','','',''];
    var s3=['#99d8c9','#FEA2E9','','',''];
    var s4=['#66c2a4','#FC89E1','','',''];
    var s5=['#2ca25f','#F268D3','','',''];
    var s6=['#006d2c','#D635B1','','',''];
    
    
    var k = "total_calls";
      //this function takes a value and returns a color based on which bucket the value falls between
    maximus(k);
    console.log(mx);
      function getColor(d,p,a) {
          //here it id defining quantiles to reflect colors on the map.
         //flag 0 is raw
           if(flag==0){
              return d > (mx*0.65)  ? '#006d2c' :
                     d > (mx*0.50)  ? '#2ca25f':
                     d > (mx*0.45)   ? '#66c2a4' :
                     d > (mx*0.40)   ? '#99d8c9' :
                     d > (mx*0.30)   ? '#ccece6' :
                     d > (mx*0.10)   ? '#edf8fb' :
                                '#FFFFFb';
          
      }
          //flag 1 is normalize by population
           else if(flag==1){
               //console.log((p*(0.10)));
              return d > (p*(0.65))  ? '#990000' :
                     d > (p*(0.50))  ? '#FC4E2A':
                     d > (p*(0.35))   ? '#FD8D3C' :
                     d > (p*(0.20))   ? '#FEB24C' :
                     d > (p*(0.01))   ? '#FED976' :
                     d > (p*(0.005))   ? '#FFFDA0' :
                                '#FFFFF0';
          }
           else if(flag==2){
               a=a*10000;
              // console.log(mx);
              // console.log(d/a)
              return d > (a*(0.65))  ? '#016450' :
                     d > (a*(0.50))  ? '#02818a':
                     d > (a*(0.35))   ? '#3690c0' :
                     d > (a*(0.20))   ? '#67a9cf' :
                     d > (a*(0.01))   ? '#a6bddb' :
                     d > (a*(0.005))   ? '#d0d1e6' :
                                '#f6eff7';
          }
      }
      
     
//Layer Selection
        
    L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    //L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {attribution: 'Stamen'}).addTo(map_object);
    var layerUrl = 'https://rgdonohue.cartodb.com/api/v2/viz/bcdbfe36-6f4f-11e5-833d-0e674067d321/viz.json';
       
    var black= L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                })
           
    var blacknw = L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png',{
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                })
         
    var streete = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}) 
    
    var lightall =L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                })
        
    function removealllayer(){
        map.removeLayer(black);
        map.removeLayer(blacknw);
        map.removeLayer(streete);
    };
    
     $(".layerselection").click(function(){
             removealllayer();
         //console.log(this.id)
            if(this.id == 'bnw'){
                
                blacknw.addTo(map);
                $('#title').css("color","black")
                 
            }
         else if(this.id == 'streete'){
                
                streete.addTo(map);
                $('#title').css("color","black")
                 
            }
          else if(this.id == 'black'){
            
                black.addTo(map);
                $('#title').css("color","white")
                 
            }
         else if(this.id == 'light'){
            
                lightall.addTo(map);
                $('#title').css("color","black")
                 
            }
        });

        
                    
    cartodb.createLayer(map, layerUrl,{
        legends:false
    })
      .addTo(map)
      .on('done', function(layer) {

      }).on('error', function() {
        //log the error
      });

                

      function style(feature) {
            //console.log(feature.properties[k]);
         
          return {
              fillColor: getColor(feature.properties[k],feature.properties['Total Population'],feature.properties['area']),
              weight: 1,
              opacity: 0.7,
              color: 'white',
              dashArray: '1',
              fillOpacity: 0.7
          }
          };
         
        

        //this function is set to run when a user mouses over any polygon
        function mouseoverFunction(e) {
          var layer = e.target;

          layer.setStyle({
              weight: 2,
              color: '#666',
              dashArray: '',
              fillOpacity: 0.7
          });
          
         
            info.update(layer.feature.properties);
            
          if (!L.Browser.ie && !L.Browser.opera) {
              layer.bringToFront();
          }
         

          //update the text in the infowindow with whatever was in the data
          //console.log(layer.feature.properties.NTACode+ '\n\n'+ layer.feature.properties.NoiseComplains);
          //$('#infoWindow').text(layer.feature.properties.NTACode+'\n\n'+ //layer.feature.properties.NoiseComplains);
        }
        

        //this runs on mouseout
        function resetHighlight(e) {
          geojson.resetStyle(e.target);
        }
        
        var colors = ['#1abc9c','#5499c7','#af7ac5','#ec7063','#cd6155','#dc7633','#eb984e','#f5b041','#f4d03f','#58d68d','#52be80','#34495e'];
        function Randomcolor() {
            var min=0;
            var max= colors.length;
            var num = Math.round(Math.random() * (max - min) + min);
         
            return colors[num];
        }
        
        var selectedpoly = [];
        var ctselectled=[];
         function mouseclick(e) {
             
          var layer = e.target;
        if(document.getElementById("singleradio").checked)
            {
                if(document.getElementById("sszoom").checked){
                    map.fitBounds(layer.getBounds());
                    }
                $("#analyticsc").hide();
                $("#settingsc").hide();
                $("#mainc").hide();
                $("#teamc").hide()
                $("#prediction").hide();
                $("#analyticsc").show();
                layer.setStyle({
                  fillColor:Randomcolor(),
                  weight: 3,
                  color: '#450',
                  fillOpacity: 0.7,
            });
                //d3.select("rect.bar").remove();
                
                ct1=layer.feature.properties["BoroCT2010"]
                //console.log(ct1)
                d3.selectAll("text").remove();
                d3.selectAll(".arc").remove();
                chart(ct1,"MedianIncome","svg","barchart");
                chart(ct1,"medianAge","svg1","barchart1");
                chart(ct1,"calls","svg2","barchart2");
                chart(ct1,"hholds","svg3","barchart3");
               compliants(""+ct1+".0");
                runpie(ct1);
                runpie1(ct1);
              
               //info.update(); 
         }
             else if(document.getElementById("multipleradio").checked){
                 
                 var found =0;
                 //console.log(selectedpoly.length);
                 if(selectedpoly.length==0){
                     layer.removeEventListener('mouseout',false);
                     layer.removeEventListener('mouseover',false);
                       //console.log("at new if's place");
                            layer.setStyle({
                                fillColor:Randomcolor(),
                                weight: 3,
                                color: '#450',
                                fillOpacity: 0.7,
                    });
                     layer.on({
                        mousover:info.update(layer.feature.properties)
                     });
                           // console.log("ct is "+layer.feature.properties["WGS84.Boro"]);
                            selectedpoly.push(this._leaflet_id);
                            ctselectled.push(layer.feature.properties["WGS84.Boro"]);
                 }
                 else{
                     //console.log("reached the target");
                 for(i=0;i<selectedpoly.length;i++){
                    
                     // console.log("entered for loop as well");
                         if(selectedpoly[i]==this._leaflet_id){
                           
                            var num = selectedpoly.indexOf(i);
                             
                            selectedpoly.splice(num,1); 
                            console.log("spliced"+num);
                             
                            geojson.resetStyle(e.target);
                            //layer.addEventListener('mouseout',true);
                            layer.on({
                         mouseover: mouseoverFunction,
                         mouseout: resetHighlight,})
                            console.log(selectedpoly);
                             found = 1;
                             break;
                         }
                     found=-1;
                      
                     };
             };
                 if(found==-1){
                      layer.removeEventListener('mouseout',false);
                     layer.removeEventListener('mouseover',false);
                        layer.setStyle({
                            fillColor:Randomcolor(),
                            weight: 3,
                            color: '#450',
                            fillOpacity: 0.7,
                    });
                     layer.on({
                        mousover:info.update(layer.feature.properties)
                     });
                        
                        console.log("at else's place 2");
                        console.log("ct is "+layer.feature.properties["WGS84.Boro"]);
                        selectedpoly.push(this._leaflet_id);
                        ctselectled.push(layer.feature.properties["WGS84.Boro"]);
                        
                            };                 
               info.update(); 
                 
             };
         };

        
var info = L.control();

        info.setPosition("topleft");
        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update();
            return this._div;
        };

        // method that we will use to update the control based on feature properties passed
        info.update = function (props) {
            this._div.innerHTML = '<h4>New York ' + k + ' Map'+'</h4>'+  (props ?
                '<b>' +' Frequency:'+ props[k] +" (Census Tract ID: " +props['BoroCT2010']+")"+'</b><br />'+props['WGS84.Bo_2'] +' in Year: 2014'
                : 'Hover over a state');
        };
        
        

info.addTo(map);
function onEachFeature(feature, layer) {
         layer.on({
             mouseover: mouseoverFunction,
             mouseout: resetHighlight,
             click: mouseclick,
             
         });
       }

var readdata= function(){
              $.getJSON('data/geo6.geojson', function(state_data) {
                 geojson = L.geoJson(state_data,{
                    style: style,
                    onEachFeature: onEachFeature
                  }).addTo(map);

              });
            };
readdata();
console.log('here in percentage');
//refresh map for loading map normalized by population
//refresh map for loading map normalized by raw data
$("#nper").on("click",function() {
        console.log('here in percentage');
        //alert("You have selected Option 1");
        map.removeLayer(geojson);
        flag=0;
        readdata();
    });
$("#npop").on("click",function() {
        console.log('here in pop');
        //alert("You have selected Option 1");
        map.removeLayer(geojson);
        flag=1;
        readdata();
    });

//refresh map for loading map normalized by area
$("#narea").on("click",function() {
        console.log('here in percentage');
        //alert("You have selected Option 1");
        map.removeLayer(geojson);
        flag=2;
        readdata();
    });
      

                 
    $('.mapoptions').click(function(){
        map.removeLayer(geojson);
        k= (this.id)
        //console.log(k);
        maximus(k);
        
        
        readdata();

            });