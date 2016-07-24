var w=$(".barchartcontainer").width();
var h =$(".barchartcontainer").height();
chki=0
var checkimpact=function(verifier='F'){
    console.log(verifier);
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
    if(verifier=='T'){
        
        uprofiles(fname,age,race,ht,educ,occ,trn,own,rent,income,verifier);
    }
    else{
        initbarresidents();
        initbarworker();
        uprofiles(fname,age,race,ht,educ,occ,trn,own,rent,income,verifier);
    }
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
                        return "<strong>Complain Type:</strong> <span style='color:red'>" + d['Complaint'] + "</span>";
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
                        console.log("top ten:"+max);
                        return ((d.Rsquare/max)*height);
                    }
                    })
                    .attr("y", function(d, i){
                        if(i<20){
                    return (height - (((d.Rsquare/max)*height)));
                        }
                    })
    
}

var uprofiles= function(name,age,race,hht,edu,occ,tra,own,rent,income,verifier){
    //age='';
    
    console.log(age+race+hht+edu+occ+tra+own+rent);
    d=d3.csv("data/profilr.csv", function(data) {
        //$.grep(data, function(e){ return e['Boro'] == (ct)
       
        //console.log(data); 
        datamaped=data.map(function(d){
            co = d['Complaints'];
            ager = d['age_residents'].replace(/(\[|\]|')/g,"").split(',');
            racer = d['race_residents'].replace(/(\[|\]|')/g,"").split(',');
            thr = d['typeof_household_residents'].replace(/(\[|\]|')/g,"").split(',');
            er = d['education_residents'].replace(/(\[|\]|')/g,"").split(',');
            or = d['ownorrent_residents'].replace(/(\[|\]|')/g,"").split(',');
            tr = d['transportationtype_residents'].replace(/(\[|\]|')/g,"").split(',');
            ir = d['income_residents'].replace(/(\[|\]|')/g,"").split(',');
            hvr = d['housing_values_residents'].replace(/(\[|\]|')/g,"").split(',');
            rr = d['rent_residents'].replace(/(\[|\]|')/g,"").split(',');
            aw = d['age_workers'].replace(/(\[|\]|'|_n)/g,"").split(',');
            //console.log(aw);
            rw = d['race_workers'].replace(/(\[|\]|'|_n)/g,"").split(',');
            thw = d['typeof_household_workers'].replace(/(\[|\]|'|_n)/g,"").split(',');
            ew = d['education_workers'].replace(/(\[|\]|'|_n)/g,"").split(',');
            ow = d['ownorrent_workers'].replace(/(\[|\]|'|_n)/g,"").split(',');
            tw = d['transportationtype_workers'].replace(/(\[|\]|'|_n)/g,"").split(',');
            iw = d['income_workers'].replace('[','').replace(/(\[|\]|'|_n)/g,"").split(',');
            hvw = d['housing_values_workers'].replace(/(\[|\]|'|_n)/g,"").split(',');
            rentw = d['rent_workers'].replace(/(\[|\]|'|_n)/g,"").split(',');
            m={Complaints:co,age_residents:ager,race_residents:racer,typeof_household_residents:thr,education_residents:er,ownorrent_residents:or,transportationtype_residents:tr,income_residents:ir,housing_values_residents:hvr,rent_residents:rr,age_workers:aw,race_workers:rw,typeof_household_workers:thw,education_workers:ew,ownorrent_workers:ow,transportationtype_workers:tw,income_workers:iw,housing_values_workers:hvw,rent_workers:rentw};
            return m;
            //console.log(ag[1]);
        });
        r=[age,race,hht,edu,occ,tra,income,own,rent];
        //console.log(datamaped);
        if(verifier=='T'){
            impacter(datamaped,r,'T');
        }
        else{
            impacter(datamaped,r,'F');
        }
        
});
}

var impacter =function(data,r,verifier){
    l=[];
    lr=['age_residents','race_residents','typeof_household_residents','education_residents','ownorrent_residents','transportationtype_residents','income_residents','housing_values_residents','rent_residents'];
    lw=['age_workers','race_workers','typeof_household_workers','education_workers','ownorrent_workers','transportationtype_workers','income_workers','housing_values_workers','rent_workers']
            
   // if(document.getElementById('imresident').checked){
     //       $('.radiowrap').css('background-color','transparent');
            l=lr;
       // }
        //else if(document.getElementById('imworker').checked){
          //  $('.radiowrap').css('background-color','transparent');
            //l=lw;
       // }
     //   else{
            //$('.radiowrap').css('color','red');
       //     $('.radiowrap').css('background', '#FF3333 ')
         //                   .attr('opacity','0.8');
                            
        //   return;
        //}
        //console.log(data['age_residents'])
        m1=data;
        mw=data;
        //t=$.grep(data, function(e){ return (e['age_residents'][0] == "population between 18 and 34");});
        //console.log(t);
        c=0
        for(i=0;i<r.length;i++){
            if(r[i]!=''){
              //  console.log(m1[i][''+l[i]]);
                c=c+1;
                m1=$.grep(m1, function(e){ return (e[''+lr[i]][0] == ''+r[i]);});
                mw=$.grep(mw, function(e){ return (e[''+lw[i]][0] == ''+r[i]);});
                //console.log(m1);
                }
            }
        console.log(m1);
        if(verifier=='T'){
            var lm1=m1.length;
            var lm2=mw.length;
            chki=lm1+lm2;
            console.log(lm1+lm2);
            return;
        }
        console.log('c is:'+c );
        //console.log(m1[0][''+l[1]][0]);
        
        //comw=[];
        //sumallw = [];
       
        var rsqu=function(da,l){
            comf=[];
            sumallf = [];
            for(i=0;i<da.length;i++){
            comf.push(da[i]['Complaints']);
            sum=0;
                for(u=0;u<l.length;u++){
                    try{
                        if(da[i][''+l[u]][2] !=' nan'){
                            //console.log(m1[i][''+l[k]][2]);
                            rvals = parseFloat(da[i][''+l[u]][2]);
                            sum+=parseFloat(da[i][''+l[u]][2]);
                        }
                    }
                    catch(err){
                        console.log("error");
                    }
                }
                sumallf.push(sum); 
                //console.log(sumallf)
            }
            return [sumallf,comf];
        };
    var s=rsqu(m1,lr);
    sumall=s[0];
    com=s[1];
    //working people complain and r square
    sw=rsqu(mw,lw);
    sumallw=sw[0];
    comw=sw[1];
    //console.log(sumall);
    var visdata = function(c,rs){
        v=[];
        for(i=0;i<c.length;i++)
        {
            v.push({
                Complaint:c[i],
                Rsquare:rs[i]
            });
        };
        return v;
    }
    console.log(visdata(com,sumall));
    visinfo(name,visdata(com,sumall),"barresident","res");
    visinfo(name,visdata(comw,sumallw),"barworker","wor");
};

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
