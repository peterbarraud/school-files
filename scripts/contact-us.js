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
			$('#contactusalert').modal();
		}
		else
		{
			$.ajax({
				type: 'POST',
				url: 'services/in.ssintercollegeshamli.restapi.php/putcontactusinfo/',
				crossDomain: true,
				data: '{"some":"json"}',
				dataType: 'json',
				success: function(responseData, textStatus, jqXHR) {
					var value = responseData.someKey;
				},
				error: function (responseData, textStatus, errorThrown) {
					alert('POST failed.');
				}
			});			
		}
    });
});
