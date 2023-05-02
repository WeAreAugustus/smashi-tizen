document.getElementById("loginemailinput").focus();
function toSignup(){
	require(["router"], function (router) {
		router.changeScreen('register');
	});
};

mytoken = sessionStorage.getItem("token");

if(mytoken){
	changeScreenGlobal("newaccount");
} 

function newLogin(){
	var loginEmail = document.getElementById("loginemailinput").value;
	var loginPassword = document.getElementById("loginpasswordinput").value;

	let data = new FormData();
//	data.append('email', "esammosbah1@gmail.com");
//	data.append('password', "esam@123#");
	data.append('email', loginEmail);
	data.append('password', loginPassword);
	data.append('device_id', 'lldk');

	fetch("https://smashi.tv/api/api/v2/login", {
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
	            alert(data.message);
	        	if (!data.isError){
	        		//Credentials
	        		sessionStorage.setItem("token", data.data.token);
					sessionStorage.setItem("user_id", data.data.id);

					// User Details
					sessionStorage.setItem("name", data.data.name);
					sessionStorage.setItem("email", data.data.email);
					sessionStorage.setItem("profile", data.data.profile);
					sessionStorage.setItem("hasSubscription", data.data.has_subscription);
					sessionStorage.setItem("subscriptionType", data.data.subscription_type.name);
					sessionStorage.setItem("subscriptionPrice", data.data.subscription_type.price);
					sessionStorage.setItem("subscriptionExpiryDate", data.data.subscription_ex_date);
		            changeScreenGlobal("home");
	        	}
	        }
	    )
	    .catch((error) => {
	    		alert(error);
	    });
}