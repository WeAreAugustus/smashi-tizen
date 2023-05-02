document.getElementById("registeremailinput").focus();
function toLogin(){
	changeScreenGlobal("newlogin");
};

function newRegister(){
	var registerEmail = document.getElementById("registeremailinput").value;
	var regsiterPassword = document.getElementById("registerpasswordinput").value;
	var registerName = document.getElementById("registernameinput").value;

	let data = new FormData();
//	data.append('email', "esammosbah1@gmail.com");
//	data.append('password', "esam@123#");
	data.append('email', registerEmail);
	data.append('password', regsiterPassword);
	data.append('name', registerName);

	fetch("https://smashi.tv/api/api_register", {
		  method: "POST",
		  body: data,
		  headers: {
			  'Accept': 'application/json',
		      'X-localization': myLanguage
		  }
		})
		.then(
	        res => {
	            return res.json();
	        })
	    .then(
	        data => {
	        	console.log(data);
	            alert(data.message);
	            //Credentials
	        	if (!data.isError){
		            changeScreenGlobal("newlogin");
	        	}
	        }
	    )
	    .catch((error) => {
	    		alert(error);
	    });
}