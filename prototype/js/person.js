$("form").submit(function(){
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
        own= "house value less than 100_n";
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
    
    uprofiles(fname,age,race,ht,educ,occ,trn,own,rent,income);
    //console.log(co)
    
});

visinfo=function(n,c){
    $('#mycomplain').empty();
    $('#welcomemessage').empty();
    console.log(n);
    $("#prediction").css("display","block");
    $("#impactc").css("display","none");
    
    document.getElementById('start').innerHTML="Hello "+n;
    $('#welcomemessage').append('Our crystal ball predicts that you would most likely complain about the following issues:');
    console.log(c);
    console.log(c.length);
    if(c.length==0){
        $('#welcomemessage').empty();
        $('#welcomemessage').append('<h5>Sorry! We may not know have information on this personality type. Why dont you try changing or removing some information</h5>')
    }
    else{
    for(i=0;i<c.length;i++){
        console.log(i);
        $('#mycomplain').append(c[i] + '<br>')
    }
    }
    
}

var uprofiles= function(name,age,race,hht,edu,occ,tra,own,rent,income){
    //age='';
    
    console.log(age+race+hht+edu+occ+tra+own+rent);
    d=d3.csv("data/up1.csv", function(data) {
        //$.grep(data, function(e){ return e['Boro'] == (ct)
        l=[]
         lr=['age_residents','race_residents','typeof_household_residents','education_residents','ownorrent_residents','transportationtype_residents','income_residents','housing_values_residents','rent_residents'];
         lw=['age_workers','race_workers','typeof_household_workers','education_workers','ownorrent_workers','transportationtype_workers','income_workers','housing_values_workers','rent_workers']
            
        if(document.getElementById('imresident').checked){
            $('.radiowrap').css('background-color','transparent');
            l=lr;
        }
        else if(document.getElementById('imworker').checked){
            $('.radiowrap').css('background-color','transparent');
            l=lw
        }
        else{
            //$('.radiowrap').css('color','red');
            $('.radiowrap').css('background', '#FF3333 ')
                            .attr('opacity','0.8');
                            
            return;
        }
           
       
        r=[age,race,hht,edu,occ,tra,income,own,rent];
        m1=data;
        //console.log(m1);
        c=0
        for(i=0;i<r.length;i++){
            if(r[i]!=''){
                c=c+1;
                m1=$.grep(m1, function(e){ return (e[''+l[i]] == ''+r[i]);});
                //console.log(m1);
            }
        };
        console.log('count is: ' + c);
        com=[];
        for(i=0;i<m1.length;i++){
            com.push(m1[i]['Complaints']);
            //console.log(m1[i]['']);
        }
        visinfo(name,com);
       // console.log(m);
});
}