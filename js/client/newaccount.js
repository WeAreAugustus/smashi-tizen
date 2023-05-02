function mySignout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("profile");
    sessionStorage.removeItem("hasSubscription");
    sessionStorage.removeItem("subscriptionType");
    sessionStorage.removeItem("subscriptionPrice");
    sessionStorage.removeItem("subscriptionExpiryDate");

    alert("Signed out");
    changeScreenGlobal("home");
}
const mytoken = sessionStorage.getItem("token");
fetch("https://smashi.tv/api/details", {
        method: "POST",
        headers: {
        	Authorization: `Bearer ${mytoken}`,
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
        	document.getElementById('accountfullname').innerHTML = data.data.name;
        	document.getElementById('accountemail').innerHTML = data.data.email;
        	if(data.data.name){
        		document.getElementById('accounticon').innerHTML = data.data.name[0];
        	}
        	else{
        		document.getElementById('accounticon').innerHTML = data.data.email[0];
        	}
        	let hasSubscription = sessionStorage.getItem("hasSubscription");
        	if (hasSubscription){
        		document.getElementById('accountplan').innerHTML = 'Premium Plan';
        	}
        	else{
        		document.getElementById('accountplan').innerHTML = 'Free Plan';
        	}
        	
//        	document.getElementById('accountsubplan').innerHTML = data.name;
//        	document.getElementById('accountnextbilling').innerHTML = data.name;
        	console.log(data);  
        }
    )
    .catch((error) => {
        alert(error);
    });