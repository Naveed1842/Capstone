var w=$(".barchartcontainer").width();
var h =$(".barchartcontainer").height();
chki=0
var checkimpact=function(){
    event.preventDefault();
    var fname = $("#nf").val();
    var age = $("#age").val();
    var rent = $("#rnt").val();
    var own = $("#ownd").val();
    var income = $("input[name='income']").val();
    var ht =$('#htype').val();
    var educ =$('#education').val();
    var trn = $("#transportation").val();
    var race = $("#race").val();
    var occ ='';
    //reseting education
    if(educ=='Bachelors'){
        educ='population education bachelors';
    }
    else if(educ== 'high school or less' ){
        educ == 'population education high school or less';
    }
    else if(educ== 'Masters'){
        educ='population education masters';
    }
    else if(educ=='Phd'){
        educ='population education phd';
    }
    else{
        educ = '';
    }
    //reseting ethensity 
    if(race=="Asian"){
        race='Population asian';
    }
    else if(race=='Black'){
        race='population black';
    }    
    else if(race=='Hispanic'){
        race='population hispanic';
    }    
    else if(race=='White'){
        race='Population white';
    } 
    else if(race=='Others'){
        race='population other race';
    }
    else{
        race = '';
    }
    //resetting transportation
    if(trn=="Public"){
        trn='transportation public';
    }
    else if(trn=="Car"){
        trn='transportation car';
    } 
    else if(trn=="Motor Cycle"){
        trn='tranportation motorcycle';
    }
    else if(trn=="Others"){
        trn='Transportation Other means';
    }
    else{
        trn = '';
    }
    //Resting House Holds
    if(ht=="family households"){
        ht="family households";
    }
    else if(ht=="Non family households"){
        ht='nonfamily households';
    }
    
    else {
        ht = '';
    }
    //rented property resets
    if(rent<1){
        rent='';
        
    }
    else if(rent< 1000){
        rent = "rent less than 1000";
    }
    else if(rent <2000){
        rent = "rent bewteen 1000 and 2000";
    }
    else{
        rent = "rent 2000 or more";
    }
    //ownedproperty resets
    if(own<1){
        own='';
    }
    else if(own<100000){
        own= "house value less than 100";
    }  
    else if(own<500000){
        own= "house value for 100 to 500";
    }
    else{
         own= "house value 500 or more";
    }
    //income resets
    if(income<1){
        income='';
    }
    else if(income<10000){
        income= "household income less than 10";
    } 
    else if(income<40000){
        income= "household income less than 40";
    }  
    else if(income<75000){
        income= "household income from 40 to 75";
    }
    else{
        income= "household income 75 and above";
    }    
    //age resets
    if(age<1){
        age= '';
    } 
    else if(age<19){
        age= "Population under 18";
    }  
    else if(age<35){
        age= "population between 18 and 34";
    }
    else if(age<65){
        age= "population between 35 to 64";
    }
    else{
        age= "population 65 and over";
    }
    if(document.getElementById("radownd").checked){
        var occ= 'owner  occupied units';
        rent='';
    }
    else if(document.getElementById("radrnt").checked){
        var occ= 'renter occupied units';
        own='';
    }
    else{
        rent= '';
        own='';
    }
    initbarresidents();
    initbarworker();
    uprofiles(fname,age,race,ht,educ,occ,trn,own,rent,income);

    //console.log(co)
    
};
//making sure user enters have we can deliver
//$('#age').on('input', function() {
  //      var input=$(this);
    //    var agev=input.val();
      //  if(agev!=''){
        //    checkimpact(verifier='T');
          //  console.log(chki);
        //}
//    });



//matching all values on submit
$("form").submit(checkimpact);
visinfo=function(n,c,cl,feat){
   // console.log("i can reach here 0"+cl+" "+feat);
    $('#mycomplain').empty();
    $('#welcomemessage').empty();
    $("#start").empty();
    $("#start1").empty();
    $("#start").append("Impact on Residents");
    $("#start1").append("Impact on Workers");
    $("#prediction").css("display","block");
    $("#impactc").css("display","none");
    
    var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1, 1);

    var y = d3.scale.linear()
                .range([height, 0]);
            
    console.log(c);  
    var max =d3.max(c,function(d){
                    //console.log(d['Rsquare']);
                   return d['Rsquare'];
                   })
          
            console.log(max);
        
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");
            
             var sorted = c.sort(function(x, y){
               return d3.descending(x.Rsquare, y.Rsquare);
            });
            console.log(sorted);
           
             var tip = d3.tip()
                      .attr('class', 'd3-tip')
                      .offset([-8, 0])
                      .html(function(d) {
                        return "<strong>Complain Type:</strong> <span style='color:red'>" + d['Complaint'] + "</span>"+"<strong>"+d['Rsquare']+'</strong>';
                      })
            
             var visr = d3.select("#"+cl);
             var bars = visr.selectAll("rect.bar"+feat)
                        .data(sorted)
  //          console.log("i can reach here "+cl+" "+feat);
            visr.call(tip);   
//            console.log("i can reach here1");
           // var result = $.grep(data, function(e){ return e["Rsquare"] == (max); });
            console.log(sorted);
            bars.enter()
                .append("svg:rect")
                .attr("class", "bar"+feat)
                 .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
            
              bars.on('click',function(d){
                console.log(d)
                mapupdate(d['Complaint']);
            })
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
                        //console.log("top ten:"+max+"rsquare val is"+d.Rsquare);
                        return ((d.Rsquare/max)*height);
                    }
                    })
                    .attr("y", function(d, i){
                        if(i<20){
                        return (height - (((d.Rsquare/max)*height)));
                        }
                    })
    
}

var uprofiles= function(name,age,race,hht,edu,occ,tra,own,rent,income){
    //age='';
    var vars=[age,race,hht,edu,occ,tra,own,rent];
    var irt =[];
    var temp=[];
    for(i=0;i<vars.length;i++){
        if(vars[i] !=''){
            irt.push(vars[i]);
            temp.push(vars[i]);
        }
    }
    console.log(irt);
    //array of variables consisting of non empty values
    console.log(irt);
    console.log(age+race+hht+edu+occ+tra+own+rent);
    
    d=d3.csv("data/finalup.csv", function(data) {
        //$.grep(data, function(e){ return e['Boro'] == (ct)
        worker=[];
        residents = [];
        m1f=data;
        m1w=data;
      
        for(u=0;u<irt.length;u++){
            console.log(irt[u]);
            m1f=$.grep(m1f, function(e){ return (e[''+irt[u]]!="");});
            m1w=$.grep(m1w, function(e){ return (e[''+irt[u]+'_n']!="");});
        }
                
        //console.log(m1w); 
        cols =Object.keys(m1f[1]);
        for(j=0;j<cols.length;j++){
//                    //console.log(cols[j])
            if(/(_n)/g.test(cols[j])==true){
                worker.push(cols[j]);
                }
            else{
                residents.push(cols[j]);
            }
            }
        //console.log(worker);
        //console.log(residents);
        //console.log(Object.keys(data[0])); 
        impacter(residents,temp);
        impactw(worker,irt);
        //r=[age,race,hht,edu,occ,tra,income,own,rent];
        //console.log(datamaped);
        //impacter(datamaped,r);
    
        
});
}
var impacter =function(r,sels){
    console.log(sels);
    d=d3.csv("data/demographics_nta_NYC_residents_compiled.csv", function(data1) {
        //console.log(data1);
        //console.log(r)
        sums=[];
        em='F';
        console.log(sels);
        if(sels.length==0){
            console.log("change em")
            em='T';
        }
        console.log(r);
        for(i=2;i<r.length;i++){
            sm=0;
           // console.log(r[i]);
            sm=d3.sum(data1, function(d){return parseFloat(d[''+r[i]]);});
            if(em=='T'){
                sels.push(r[i]); 
            }
            
            sums.push({
                featurev:r[i],
                Sum:sm
            });
            //sums.push(sm);
            //console.log(sm);
        }
        console.log(sels);
       // console.log(m1f);
        prod=0;
        prodall=[];
        v=[];
        vw=[];
        var Ssolver = function(dat)
        {
            for(i=2;i<dat.length;i++){
            //console.log(sels.length);
            for(j=0;j<sels.length;j++){
               // console.log("wo hoo");
                beta=+(dat[i][''+sels[j]]);
                fvalue = +(sums[j]['Sum']);
               // console.log(fvalue);
                prod = beta*fvalue;
                
                //console.log(""+sums[j]['featurev']+":"+fvalue);  
            }
            //prodall.push(m1f[i]['Intercept']+prod);
           //  console.log(prod);
             //console.log(m1f[i]['Intercept']);
             var intercept = +(dat[i]['Intercept'])
             var S=intercept+prod;
            // console.log(S);
             v.push({
                Complaint:dat[i]['Complaints'],
                Rsquare:S
            });
        }
            return v;
        };

        //Ssolver(m1w);
        //console.log(prodall.length);
        //console.log(sels.length);
       // console.log(v)
        visinfo(name,Ssolver(m1f),"barresident","res");
        //visinfo(name,Ssolverw(m1w),"barworker","wor");
    })
};

var impactw =function(w,sel){
    console.log(sel);
    d=d3.csv("data/demographics_nta_NYC_workers_compiled.csv", function(data2) {
        //console.log(data2);
        //console.log(r)
        sumsw=[];
        em='F';
        console.log(sel);
        if(sel.length==0){
            console.log("change em")
            em='T';
        }
         console.log(w);
        for(i=0;i<w.length;i++){
            sm=0;
           // console.log(r[i]);
            sm= d3.sum(data2, function(d){return parseFloat(d[''+w[i]]);});
            if(em=='T'){
                console.log('here');
                sel.push(w[i]); 
            }
            
            sumsw.push({
                featurev:w[i],
                Sum:sm
            });
            //sumsw.push(sm);
            //console.log(sm);
        }
        console.log(sel+sel.length);
        console.log(w+w.length);
        console.log(sumsw);
       // console.log(m1f);
        prod=0;
        prodall=[];
        vw=[];
        var Ssolverw = function(dat)
        {
            for(i=2;i<dat.length;i++){
            //console.log(sel.length);
                for(j=0;j<sel.length;j++){
                   // console.log("wo hoo");
                    if(em=='T'){
                        betaw=+(dat[i][''+sel[j]]);
                    }
                    else{
                        betaw=+(dat[i][''+sel[j]+'_n']);
                    }
                    fvaluew = +(sumsw[j]['Sum']);
                    //console.log(j);
                    prodw = betaw*fvaluew;
                    //console.log(betaw);
                    //console.log(fvaluew);
                    //console.log(""+sumsw[j]['featurev']+":"+fvalue);  
                }
                //prodall.push(m1f[i]['Intercept']+prod);
               //  console.log(prod);
                 //console.log(m1f[i]['Intercept']);
                 var interceptw = +(dat[i]['Intercept'])
                 var Sw=interceptw+prodw;
                 //console.log(S);
                 vw.push({
                    Complaint:dat[i]['Complaints'],
                    Rsquare:Sw
                });
        }
            console.log(vw);
            return vw;
        };

        visinfo(name,Ssolverw(m1w),"barworker","wor");
    })
}


  function initbarresidents()
    {
        //setup the svg
        var svg = d3.select("#svg5")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("preserveAspectRatio", "xMinYMid")
            .attr("viewBox", "0 0 300 200")
            .classed("svg-container", true)
            .classed("svg-content-responsive", true); 
   //class to make it responsive
            
        //console.log("svg", svg)
        svg.append("svg5:rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("stroke", "none")
            .attr("fill", "none")
            
      

        svg.append("svg5:g")
            .attr("id", "barresident")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
    };

  function initbarworker()
    {
        //setup the svg
        var svg = d3.select("#svg6")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("preserveAspectRatio", "xMinYMid")
            .attr("viewBox", "0 0 300 200")
            .attr('display', 'block')
            .attr('margin','auto')
            .classed("svg-container", true)
            .classed("svg-content-responsive", true); 
   //class to make it responsive
            
        //console.log("svg", svg)
        svg.append("svg6:rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("stroke", "none")
            .attr("fill", "none")
            
      

        svg.append("svg6:g")
            .attr("id", "barworker")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
    };
