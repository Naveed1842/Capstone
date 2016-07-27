$(document).ready(function () {
    $("#radownd").click(function(){
			$("#ownd").css("display","block");
            $("#rnt").css("display","none");
		});
		$("#radrnt").click(function(){
			$("#rnt").css("display","block");
            $("#ownd").css("display","none");
		});
    $("#resetform").on("click",function(){ 
        console.log("presses");
        $('#impform').trigger("reset");
});
	});


//function to resize chart. don't work all the time.
