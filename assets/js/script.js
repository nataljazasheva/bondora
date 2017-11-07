$(function() {
	/* Slider initialization */  
    $("#slider1").slider({
		range: "min",
		min: 5,
		max: 10000,
		value: 500,
		create: function() {
	        $("#slider1_value").val($("#slider1").slider("value"));
	    }, 
		slide: function( event, ui ) {
			$("#slider1_value").val(ui.value);
	    }
	});

	$( "#slider1_value" ).on( "input", function() {
     	 $("#slider1").slider( "value", $(this).val() );
    });


	$("#slider2").slider({
		range: true,
		min: 0,
		max: 100,
		values: [15, 35],
		create: function() {
	        $("#slider2_min_value").val($("#slider2").slider("values", 0));
	        $("#slider2_max_value").val($("#slider2").slider("values", 1));
	    }, 
		slide: function( event, ui ) {
			$("#slider2_min_value").val(ui.values[0]);
			$("#slider2_max_value").val(ui.values[1]);
	    }
	});

	$( "#slider2_min_value" ).on( "input", function() {
     	 $("#slider2").slider( "values", 0, $(this).val() );
    });

    $( "#slider2_max_value" ).on( "input", function() {
     	 $("#slider2").slider( "values", 1, $(this).val() );
    });

    // Remove buttom click
    $("#reset").on("click", function() {
    	var slider1_min = $('#slider1').slider("option", "min"); 
    	var slider2_min = $('#slider2').slider("option", "min");  
    	
    	$("#slider1_value").val(slider1_min); 
    	$("#slider2_min_value").val(slider2_min);
    	$("#slider2_max_value").val(slider2_min);
    	$("#slider1").slider( "value",  slider1_min );
		$("#slider2").slider( "values", 0,  slider2_min );
		$("#slider2").slider( "values", 1,  slider2_min );
    }); 

	setSliderTicks(); 

	getInvestmenData(); 
	
}); 

function setSliderTicks(){
	var $slider1 =  $('#slider1');
    var $slider2 =  $('#slider2');
    var max1 =  $('#slider1').slider("option", "max");
    var max2 =  $('#slider2').slider("option", "max");
    
	$('.slider1 .slider_tick').each( function() {
    	var value = parseInt($(this).text().replace(" ",""));
    	var width = (value * 100) / max1;
    	$(this).css("left", width + "%");   
    });

	$('.slider2 .slider_tick').each( function() {
    	var value = parseInt($(this).text().replace(" ",""));
    	var width = (value * 100) / max2;
    	$(this).css("left", width + "%");   
    });
}; 

function getInvestmenData() {
	$.getJSON ("investments.json")
	.fail( function() {
		$('#investment_table').html(""); 
	  	$('#error_loading').html('An error has occurred');
	})
	.done( function(data) {
		$.each(data.payload, function(i, item) {
			if (i <= 100) {
		        var $tr = $('<tr>').append(
		            $('<td>').text(item.investment),
		            $('<td>').text(item.country),
		            $('<td>').text(item.status), 
		            $('<td>').text(item.bondora_rating), 
		            $('<td>').text(item.date_of_purchase), 
		            $('<td>').text(item.interest), 
		            $('<td>').text(item.next_payment_no), 
		            $('<td>').text(item.outstanding_principal), 
		            $('<td>').text(item.repaid_principal), 
		            $('<td>').text(item.repaid_interests_late_charges), 
		            $('<td>').text(item.principal_overdue), 
		            $('<td>').text(item.accrued_interest_and_late_charges), 
		            $('<td>').text(item.credit_history),
		            $('<td>').text(item.investment_amount),
		            $('<td>').text(item.purpose),
		            $('<td>').text(item.principal_debt_occurred),
		            $('<td>').text(item.interest_debt_occurred),
		            $('</tr>')
		        ).appendTo('#investment_table');
		    }
    	});
	})
}
