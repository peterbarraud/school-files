$(document).ready(function(){
    $("#submitbutton").click(function() {
		hasError = false;
		$('.contactusform *').filter(':input').each(function(element){
			if ($(this).attr('type') !== 'button') {
				if ($(this).attr('ismandatory') === "1") {
					if ($(this).val() === '') {
						$(this).parent().addClass('has-error');
						hasError = true;
					}
					else {
						$(this).parent().removeClass('has-error');
					}
				}
			}
		});
		if (hasError) {
			$errMsg = '<p>You did not fill in some of the mandatory information in the <strong>Contact Us</strong> form.</p>';
			$errMsg += '<p>Make sure you fill in all boxes marked with the star <span class=mandatoryfield>*</span>.</p>';
			$errMsg += '<p>The boxes you missed are highlighted for you.</p>';
			$('#alertmessage').html($errMsg);			
			$('#contactusalert').modal();
		}
		else
		{
			$.get( "test.php", function( data ) {
			  alert( "Data Loaded: " + data );
			});			
			$.get( "test.cgi", { name: "John", time: "2pm" } )
			  .done(function( data ) {
				alert( "Data Loaded: " + data );
			  });			
			var baseurl = 'http://localhost:8080/services/in.ssintercollegeshamli.restapi.php/';
			$.ajax({
				url: baseurl + 'getitem/contactus/-1/',
				dataType: "jsonp",
				success: function(contactUsObject, textStatus, jqXHR) {
					contactUsObject.name = $('#contactusname').val();
					contactUsObject.address = $('#contactusaddress').val();
					contactUsObject.email = $('#contactusemail').val();
					contactUsObject.phonenumber = $('#contactusphonenumber').val();
					contactUsObject.message = $('#contactusname').val();
					contactUsObject.name = $('#message').val();
					console.log(contactUsObject);
					$.ajax({
						type: 'POST',
						url: baseurl + 'putcontactusinfo/',
						crossDomain: true,
						data: contactUsObject,
						dataType: 'jsonp',
						success: function(responseData, textStatus, jqXHR) {
							$successMsg = '<p>' + responseData.contactus + '</p>';
							$('#alertmessage').html($successMsg);			
							$('#contactusalert').modal();
							var value = responseData.someKey;
						},
						error: function (responseData, textStatus, errorThrown) {
							alert('POST failed.');
						}
					});			
				},
				error: function (responseData, textStatus, errorThrown) {
					alert('GET failed.');
				}
			});			
		}
    });
});
