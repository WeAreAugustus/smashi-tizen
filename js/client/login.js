require(["router"], function (router) {
	router.showSideBar();
});
function toSignup(){
	changeScreenGlobal("register");
};

if(myLanguage == 'ar'){
	document.getElementById("loginemailinput").placeholder = "البريد الإلكتروني";
	document.getElementById("loginpasswordinput").placeholder = "كلمة المرور";
}
else{
	document.getElementById("loginemailinput").placeholder = "Email Address";
	document.getElementById("loginpasswordinput").placeholder = "Password";
}

require(['client/auth'], function(auth){
    auth.qrcode();
});

function newLogin(){
	var loginEmail = document.getElementById("loginemailinput").value;
	var loginPassword = document.getElementById("loginpasswordinput").value;

	let data = new FormData();
//	data.append('email', "esammosbah1@gmail.com");
//	data.append('password', "esam@123#");
	data.append('email', loginEmail);
	data.append('password', loginPassword);
	data.append('device_id', 'lldk');

	fetch("https://api.smashi.tv/api/api/v2/login", {
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
	        	if (!data.isError){
	        		//Credentials
	        		localStorage.setItem("token", data.data.token);
	        		localStorage.setItem("user_id", data.data.id);

					// User Details
	        		localStorage.setItem("name", data.data.name);
	        		localStorage.setItem("email", data.data.email);
	        		localStorage.setItem("profile", data.data.profile);
	        		localStorage.removeItem("hasSubscription");
	        		localStorage.setItem("hasSubscription", data.data.has_subscription);
	        		localStorage.setItem("subscriptionType", data.data.subscription_type.name);
	        		localStorage.setItem("subscriptionPrice", data.data.subscription_type.price);
					localStorage.setItem("subscriptionExpiryDate", data.data.subscription_ex_date);
					
		            changeScreenGlobal("home");
	        	}
	        	else{
	        		alert(data.message);
	        	}
	        }
	    )
	    .catch((error) => {
	    		alert(error);
	    });
}