var flag=0;
var percen=80/100;
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

//Percentile Function



dblclickzoom();
//map.doubleClickZoom.disable();
//map.dragging.disable();
map.scrollWheelZoom.disable();
      
   $("#rstmap").click(function(){
       map.setView( [40.767802, -73.81326], 11);
       percen=80/100;
       mapupdate(k);
       $("#analyticsc").hide();
        $("#settingsc").hide();
        $("#mainc").hide();
        $("#teamc").hide()
        $("#prediction").hide();
        $('#mainc').show();
   });

      var geojson;
        
var mx=0;
var link='';
var maximus = function(ko){
    //var max
    console.log(ko)
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
                    ct = +(d[""+ko]);
                    return ct;
                });  
            ds=data.sort();
                    //mx=percen/
            var index=0
            if(percen<1){
                index=Math.round(percen* (ds.length+1));
                mx=ds[index]
                //console.log(index);
                //console.log(mx);
                console.log(mx);
            }
            else{
                mx=ds[ds[ds.length-1]];
                console.log(mx);
            }
                    //mx=max;
            return;
    
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
               //console.log(d);
              return d > (mx)  ? '#006d2c' :
                     d > (mx*0.90)  ? '#2ca25f':
                     d > (mx*0.70)   ? '#66c2a4' :
                     d > (mx*0.50)   ? '#99d8c9' :
                     d > (mx*0.30)   ? '#ccece6' :
                     d > (mx*0.10)   ? '#edf8fb' :
                                '#FFFFFb';
          
      }
          //flag 1 is normalize by population
           else if(flag==1){
              //console.log('calls: '+d+' for population '+p);
              return d > (p)*percen  ? '#990000' :
                     d > (p)*percen*0.80  ? '#FC4E2A':
                     d > (p)*percen*0.60   ? '#FD8D3C' :
                     d > (p)*percen*0.40   ? '#FEB24C' :
                     d > (p)*percen*0.20   ? '#FED976' :
                     d > (p)*percen*0.10   ? '#FFFDA0' :
                                '#FFFFF0';
          }
           else if(flag==2){
               a=a*10000;
               console.log(mx);
               console.log(a);
              // console.log(d/a)
              return d > (a*percen)  ? '#016450' :
                     d > (a*percen*0.80)  ? '#02818a':
                     d > (a*percen*0.60)   ? '#3690c0' :
                     d > (a*percen*0.40)   ? '#67a9cf' :
                     d > (a*percen*0.20)   ? '#a6bddb' :
                     d > (a*percen*0.10)   ? '#d0d1e6' :
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
          
          //quantile = d3.scale.quantile()
            //              .domain(feature.properties[k])
                          //.range(range);
        //  console.log(quantile);
         //quant = d3.scale.quantile
          return {
              fillColor: getColor(feature.properties[k],feature.properties['Total Population'],feature.properties.area),
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
                
                ct1=layer.feature.properties["ID"]
                nhood=layer.feature.properties["Neighborhood"]
                //console.log(ct1)
                d3.selectAll("text").remove();
                d3.selectAll(".arc").remove();
                chart(ct1,nhood);
                compliants(""+ct1);
                chartw(ct1,nhood);
                //runpie(ct1);
                //runpie1(ct1);
              
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
                            //console.log("spliced"+num);
                             
                            geojson.resetStyle(e.target);
                            //layer.addEventListener('mouseout',true);
                            layer.on({
                             mouseover: mouseoverFunction,
                             mouseout: resetHighlight,})
                            //console.log(selectedpoly);
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
                '<b>' +' Frequency:'+ props[k] +" (Neighborhood: " +props['Neighborhood']+")"+'</b><br />'+props['BoroName'] +' in Year: 2014'
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
    if(document.getElementById("ctmain").checked){
        map.removeLayer(geojson);
              $.getJSON('data/geo8.geojson', function(state_data) {
                 geojson = L.geoJson(state_data,{
                    style: style,
                    onEachFeature: onEachFeature
                  }).addTo(map);

              });
            }
    else if((document.getElementById("ntamain").checked==true)){
        map.removeLayer(geojson);
        console.log('hello');
            $.getJSON('data/ntanew1.geojson', function(state_data) {
                 geojson = L.geoJson(state_data,{
                    style: style,
                    onEachFeature: onEachFeature
                  }).addTo(map);

              });
    }
}

//readdata();
$.getJSON('data/ntanew1.geojson', function(state_data) {
        geojson = L.geoJson(state_data,{
            style: style,
            onEachFeature: onEachFeature
            }).addTo(map);
});
//console.log('here in percentage');
//refresh map for loading map normalized by population
//refresh map for loading map normalized by raw data
$("#nper").on("click",function() {
        $('#npop').css('background-color','white');
        $('#npop').css('opacity',1)
        $('#npop').css('color','black');
        $('#narea').css('background-color','white');
        $('#narea').css('opacity',1)
        $('#narea').css('color','black');
        $(this).css('background-color','black')
        $(this).css('opacity',0.5)
        $(this).css('color','white');
        //alert("You have selected Option 1");
        map.removeLayer(geojson);
        flag=0;
        readdata();
    });
$("#npop").on("click",function() {
        $('#nper').css('background-color','white');
        $('#nper').css('opacity',1)
        $('#nper').css('color','black');
        $('#narea').css('background-color','white');
        $('#narea').css('opacity',1)
        $('#narea').css('color','black');
        $(this).css('background-color','black');
        $(this).css('opacity',0.5)
        $(this).css('color','white');
        //alert("You have selected Option 1");
        map.removeLayer(geojson);
        flag=1;
        readdata();
    });

//refresh map for loading map normalized by area
$("#narea").on("click",function() {
        $('#nper').css('background-color','white');
        $('#nper').css('opacity',1)
        $('#nper').css('color','black');
        $('#npop').css('background-color','white');
        $('#npop').css('opacity',1)
        $('#npop').css('color','black');
        $(this).css('background-color','black')
        $(this).css('opacity',0.5)
        $(this).css('color','white');
        //alert("You have selected Option 1");
        map.removeLayer(geojson);
        flag=2;
        readdata();
    });
      

                 
$('.mapoptions').click(function(){
        map.removeLayer(geojson);
        k= (this.id)
        console.log(k);
        maximus(k);
        
        
        readdata();

            });
var mapupdate=function(ke){
        map.removeLayer(geojson);
        k= ke;
        //console.log(k);
        maximus(k);
        
        
        readdata();
}
//percentile function
$('#percentilebtn').on('click', function() {
        percen=$('#percentile').val()/100;
        mapupdate(k);
        //    checkimpact(verifier='T');
        console.log(percen);
        });