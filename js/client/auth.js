define(['client/shared','js/cdn/paginationmin.js'], function (shared) {
	
	// export (expose) foo for other modules
	return {
		isAuth: function () {
			mytoken = sessionStorage.getItem("token");

			if(mytoken == null){
				 //alert("You are not logged in yet");
				
			} else {
				 //alert("You are already logged in ya bro");
				$("<div>").load("components/screens/account.html", function () {
					$("#screen").empty();
					$("#screen").append($(this).html());
				});
			}
			
			// return !!localStorage.getItem("token");
			
		},
		checkIfEmailExists: function (){
			// var registerme = this.register();
			var email = document.getElementsByName("userEmail")[0].value;
			let data = new FormData();			
			data.append('email', email);

			$.ajax({
				url: shared.url['base'] + shared.url['emailChecker'],
				type: 'POST',
				beforeSend: function (xhr) {
					xhr.setRequestHeader("Accept", "application/json");
				},
				dataType: 'json',
				processData: false,
				contentType: false,
				data: data,
				cors: true,
				success: function (response) {
					
					// response = shared.responseSuccessHandler(response);
					console.log(response.emailExists);

					if(response.emailExists == true){
						//alert("This email exists");
						document.getElementById("checkEmailButton").style.display = "none";
						document.getElementById("passwordInputField").style.display = "";
						document.getElementById("loginButton").style.display = "";
						document.getElementById('inputID').id = '00010006';
						document.getElementById('loginID').id = '00010007';
						firstElement = document.getElementById("00010006");
						firstElement.focus();
						
					} else{
						//alert("Email doesn't exist");
						document.getElementById("nameInputField").style.display = "";
						document.getElementById("passwordInputField").style.display = "";
						document.getElementById("registerButton").style.display = "";
						document.getElementById("checkEmailButton").style.display = "none";
						document.getElementById('nameID').id = '00010006';
						document.getElementById('inputID').id = '00010007';
						document.getElementById('registerID').id = '00010008';
						firstElement = document.getElementById("00010006");
						firstElement.focus();
					}
				},
				error: function (error) {
					error = shared.responseErrorHandler(error);
					alert("The email format is invalid");
				},
			});
		},
		register: function(){
			var email = document.getElementsByName("userEmail")[0].value;
			var name = document.getElementsByName("userName")[0].value;
			var password = document.getElementsByName("userPassword")[0].value;

			let data = new FormData();
			
			data.append('email', email);
			data.append('name', name);
			data.append('password', password);
			data.append('device_id', 'lldk');

			$.ajax({
				url: shared.url['base'] + shared.url['register'],
				type: 'POST',
				beforeSend: function (xhr) {
					xhr.setRequestHeader("Accept", "application/json");
				},
				dataType: 'json',
				processData: false,
				contentType: false,
				data: data,
				cors: true,
				success: function (response) {
					console.log("Login successful");
				},
				error: function (error) {
					error = shared.responseErrorHandler(error);
					$('#alert').html('<p>An error has occurred while registering your account</p>');
				},
			});



		},
		login: function () {
			var email = document.getElementsByName("userEmail")[0].value;
			var password = document.getElementsByName("userPassword")[0].value;
			let data = new FormData();
			// data.append('email', "esammosbah1@gmail.com");
			// data.append('password', "esam@123#");
			data.append('email', email);
			data.append('password', password);
			data.append('device_id', 'lldk');

			$.ajax({
				url: shared.url['base'] + shared.url['login'],
				type: 'POST',
				beforeSend: function (xhr) {
					xhr.setRequestHeader("Accept", "application/json");
				},
				dataType: 'json',
				processData: false,
				contentType: false,
				data: data,
				cors: true,
				success: function (response) {

					function returnToHomePage() {
						require(["router"], function (router) {
							router.changeScreen('home');
						});
					}
					
					response = shared.responseSuccessHandler(response);
					console.log(response);
					// //alert(response.data.token);
					sessionStorage.setItem("token", response.data.token);
					sessionStorage.setItem("user_id", response.data.id);

					// User Details
					sessionStorage.setItem("name", response.data.name);
					sessionStorage.setItem("email", response.data.email);
					sessionStorage.setItem("profile", response.data.profile);
					sessionStorage.setItem("hasSubscription", response.data.has_subscription);
					sessionStorage.setItem("subscriptionType", response.data.subscription_type.name);
					sessionStorage.setItem("subscriptionPrice", response.data.subscription_type.price);
					sessionStorage.setItem("subscriptionExpiryDate", response.data.subscription_ex_date);
				
					if($('#alert').html() != null){
						$('#alert').empty();
					}
					returnToHomePage();

				},
				error: function (error) {
					error = shared.responseErrorHandler(error);
					$('#alert').html('<div style="    text-align: center;" class="alert alert-danger" role="alert">Your password is incorrect</div>');
				},
			});

			// making the request
		},
		qrcode: function () {

			const api_url =
				"https://api.smashi.tv/api/getUniqueTvCode";

			$.get(api_url, function (data) {
				var channel = pusher.subscribe(data.data.unique_code);
				// console.log(data);

				channel.bind("otp", (datas) => {
					// console.log(data.data.unique_code);
					// console.log(datas.otp);
					$.post("https://api.smashi.tv/api/loginWithOTP",
					{
						unique_code: data.data.unique_code,
						otp: datas.otp
					},
					function(dataz, status){
						console.log(dataz.data);
						// //alert("Hello "+dataz.data.name);
						// console.log(dataz.data.token);
						// console.log(dataz.data.id);

						localStorage.setItem("token", dataz.data.token);
						localStorage.setItem("user_id", dataz.data.id);
						// sessionStorage.setItem("profile", dataz.data.profile);
						//User Details
						localStorage.setItem("name", dataz.data.name);
						localStorage.setItem("email", dataz.data.email);
						localStorage.setItem("profile", dataz.data.profile);
						localStorage.setItem("hasSubscription", dataz.data.has_subscription);
						localStorage.setItem("subscriptionType", dataz.data.subscription_type.name);
						localStorage.setItem("subscriptionPrice", dataz.data.subscription_type.price);
						localStorage.setItem("subscriptionExpiryDate", dataz.data.subscription_ex_date);
						// sessionStorage.setItem("subscription", dataz.data.has_subscription);
						// mytoken = sessionStorage.getItem("token");
						// //alert("Hello " + dataz.data.name);
						changeScreenGlobal("home");
						}
					);

				});

				var qrcode = new QRCode("qrcode");
				function makeCode() {
					qrcode.makeCode(data.data.unique_code);
				}
				makeCode();
			});

			var pusher = new Pusher("b00c56adc88d99d3afc9", {
				cluster: "eu",
			});
			
		},
        getUserDetails: function (itemId) {
            var dataHtml = "";
            itemId = shared.zeroPad(itemId+1, 4);
			myUsername = sessionStorage.getItem("name");
			myEmail = sessionStorage.getItem("email");


			mySubscriptionType = sessionStorage.getItem("subscriptionType");
			mySubscriptionPrice = sessionStorage.getItem("subscriptionPrice");
			myAccountPic = sessionStorage.getItem("profile");
			subscriptionExpiryDate = sessionStorage.getItem("subscriptionExpiryDate");
			const obj = /([0-9]+(-[0-9]+)+)/.exec(subscriptionExpiryDate);

            dataHtml += `
			<h1  style="display: flex;align-items:center;justify-content:center;margin-bottom: 5%;">My Account</h1>
			<div  style="display: flex;align-items:center;justify-content:center;margin-bottom: 2%;"><img style="height: 300px;width: 300px;border-radius: 50%;" src="${myAccountPic}" alt=""></div>
			<div  style="display: flex;align-items:center;justify-content:center;margin-bottom: 1%;"><h1>${myUsername}</h1></div>
			<div  style="display: flex;align-items:center;justify-content:center;margin-bottom: 1%;">
				<form>
					<div  class="form-group">
					  <h4 style="color: gray !important;">Email</h4>
					  <input style="background-color: gray;color:red; border-radius: 0; color: white;width: 500px;height: 50px;" type="email" class="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="${myEmail}">
					</div>
				  </form>
			</div>
			<div  style="display: flex;align-items:center;justify-content:center;margin-bottom: 3%;">
				<div  style="background: linear-gradient(135deg, #447EFB 0%, #5C44FB 100%);border-radius: 0; color: white;width: 500px;" >
					<div  style="margin-top: 2%;" class="row">
						<div  class="col-6" ><div  style="margin-left: 4%;"><p style="text-align: left;">${mySubscriptionType} Plan</p></div></div>
						<div  class="col-6" ><div  style="margin-right: 4%;"><p style="text-align: right;">Change Plan</p></div></div>
					</div>
					<div  class="row">
						<div  class="col-6" ><div  style="margin-left: 3%;"><p style="text-align: left;">AED ${mySubscriptionPrice} /mon</p></div></div>
					</div>
					<div  style="display: flex;align-items:center;justify-content:center;margin-bottom: 5%;" class="row">
						<div  style="width: 450px;background: white !important;height: 2px !important;" class="col-12" id="coloredSeparator">
						</div>
					</div>
					<div  class="row">
						<div  class="col-6" ><div  style="margin-left: 3%;"><p style="text-align: left;">Next billing date:</p></div></div>
					</div>
					<div  class="row">
						<div  class="col-6" ><div  style="margin-left: 3%;"><p style="text-align: left;">${obj[0]}</p></div></div>
					</div>
				</div>
			</div>
			`
			
            $("#getUserDetails").html(dataHtml);
		},

	};
});

