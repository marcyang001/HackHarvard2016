
var client = new XMLHttpRequest();
  
   function upload() 
   {
      var file = document.getElementById("uploadfile");
     
      /* Create a FormData instance */
      var formData = new FormData();
      /* Add the file */ 
      formData.append("upload", file.files[0]);

      client.open("post", "/upload", true);

      client.setRequestHeader("Content-Type", "multipart/form-data; boundary=l3iPy71otz");
      client.send(formData);  /* Send to server */ 
   }
    
   function readBody(xhr) {
	    var data;
	    if (!xhr.responseType || xhr.responseType === "text") {
	        data = xhr.responseText;
	    } else if (xhr.responseType === "document") {
	        data = xhr.responseXML;
	    } else {
	        data = xhr.response;
	    }
	    return data;
	}
   /* Check the response status */  
   client.onreadystatechange = function() 
   {
      if (client.readyState == 4 && client.status == 200) 
      {
      		console.log(readBody(client))
         //alert(client.statusText);
      }
   }

/*
$(function(){

	$('#addButton').click(function(e){
	        
	    e.preventDefault();
		console.log('submit clicked');
		
		var files = $("#degisecek").get(0).files;

  		if (files.length > 0){
    		// create a FormData object which will be sent as the data payload in the
    		// AJAX request
    		var formData = new FormData();

    		// loop through all the selected files and add them to the formData object
    		for (var i = 0; i < files.length; i++) {
      			var file = files[i];

      			// add the files to formData object for the data payload
      			formData.append('uploads[]', file, file.name);
    		}
    	}
    	 $.ajax({
		      url: '/upload',
		      type: 'POST',
		      data: formData,
		      processData: false,
		      contentType: false,
		      success: function(data){
		          console.log('upload successful!\n' + data);
		      }
     
		});

});

   
})
*/
