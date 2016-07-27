d3.csv("data/complaincolumns.csv", function(complain)
                            {
                                  datacom = complain.map(function(d)
                                    {
                                        //each d is one line of the csv file represented as a json object
                                        com = (d['complaints'])
                                        //console.log(com)
                                        m= {"complaints":com};
                                        return m;
                                    });  
                        var max_fields      = 180; //maximum input boxes allowed
                        var wrapper         = $("#wrapper"); //Fields wrapper
                        //var add_button      = $(".add_field_button"); //Add button ID
                        var x = 1; //initlal text box count
                        //val=datacom.complaints
                        console.log(datacom[0].complaints)
                        
                        for(i=0;i<180;i++){ //max input box allowed
                                //console.log(datacom[i]);
                                $(wrapper).append('<li><a id="'+ datacom[i].complaints+'" ' + 'href="#" class="mapoptions"  >'+datacom[i].complaints+'</a></li>');
                            };
                            }); 

d3.csv("data/democolumns.csv", function(complain)
                            {
                                  datacom = complain.map(function(d)
                                    {
                                        //each d is one line of the csv file represented as a json object
                                        com = (d['demographics'])
                                        //console.log(com)
                                        m= {"demographics":com};
                                        return m;
                                        
                                    });  
                       // var max_fields      = 180; //maximum input boxes allowed
                        var wrapper2         = $("#wrapper1"); //Fields wrappe
                        //var add_button      = $(".add_field_button"); //Add button ID
                        var x = 1; //initlal text box count
                        //val=datacom.complaints
                        //console.log(datacom[0].demographics)
                        for(i=0;i<68;i++){ //max input box allowed
                                    //console.log(datacom[i]);
                                    $(wrapper2).append('<li><a id="'+ datacom[i].demographics+'" ' + 'href="#" class="mapoptions"  >'+datacom[i].demographics+'</a></li>');
                            };
});

d3.csv("data/democolumns.csv", function(complain)
                            {
                                  datacom = complain.map(function(d)
                                    {
                                        //each d is one line of the csv file represented as a json object
                                        com = (d['demographics'])
                                        //console.log(com)
                                        m= {"demographics":com+'_n'};
                                        return m;
                                    });  
                       // var max_fields      = 180; //maximum input boxes allowed
                        var wrapper3         = $("#wrapper2"); //Fields wrappe
                        //var add_button      = $(".add_field_button"); //Add button ID
                        var x = 1; //initlal text box count
                        //val=datacom.complaints
                        //console.log(datacom[0].demographics)
                        for(i=2;i<68;i++){ //max input box allowed
                                    //console.log(datacom[i]);
                                if((datacom[i].demographics!='Median Age_n') && (datacom[i].demographic!= 'work at home_n') ){
                                    $(wrapper3).append('<li><a id="'+ datacom[i].demographics+'" ' + 'href="#" class="mapoptions"  >'+datacom[i].demographics+'</a></li>');
                                }
                            }
                            });