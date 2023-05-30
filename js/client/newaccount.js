require(["router"], function(router) {
    router.showSideBar();
});
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
    changeScreenGlobal("home");
}
function confirmSignout(){
	var retVal = null;
	if(myLanguage == 'ar'){
		retVal = confirm("هل تريد تسجيل الخروج؟");
	}
	else{
		retVal = confirm("Do you want to sign out?");
	}
    if(retVal == true) {
    	mySignout();
       return true;
    }
    else {
       return false;
    }
}
function showSaved(){
	document.getElementById('accountpage1').style.display = "";
	document.getElementById('accountpage2').style.display = "none";
	document.getElementById('accountpage3').style.display = "none";
}
function showDetails(){
	document.getElementById('accountpage1').style.display = "none";
	document.getElementById('accountpage2').style.display = "";
	document.getElementById('accountpage3').style.display = "none";
}
function showFAQ(){
	document.getElementById('accountpage1').style.display = "none";
	document.getElementById('accountpage2').style.display = "none";
	document.getElementById('accountpage3').style.display = "";
}
if (myLanguage == 'ar'){
	for(let i = 0; i < document.getElementsByClassName("accountarrow").length; i++){
		document.getElementsByClassName("accountarrow")[i].setAttribute("transform", "rotate(180)");		
	}
}

//Fetching User  Details
var token = sessionStorage.getItem("token");
fetch("https://smashi.tv/api/details", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
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
            document.getElementById('accountnamemain').innerHTML = data.data.name;
            document.getElementById('accountemail').innerHTML = data.data.email;
            document.getElementById('accounticon').innerHTML = data.data.name[0];
        }
    )
    .catch((error) => {
        console.log(error);
    });
//Fetching subscription details
fetch("https://smashi.tv/api/current/subscription", {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`,
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
    	if(!data.isError){
    		document.getElementById('accountsubplan').innerHTML = data.data.price + " AED / " + data.data.name;
            document.getElementById('accountnextbilling').innerHTML = data.data.next_billing_date;
            document.getElementById('accountplan').innerHTML = 'Premium Plan';
    	}
    	else{
    		document.getElementsByClassName("accountsettingschild")[3].remove();
    		document.getElementsByClassName("accountsettingschild")[2].remove();
    		document.getElementById('accountplan').innerHTML = 'Free Plan';
    	}
    }
)
.catch((error) => {
    console.log(error);
});

var user_id = sessionStorage.getItem("user_id");
//Fetching the user's saved videos
fetch("https://smashi.tv/api/v2/saved/video/list?user_id=" + user_id, {
        method: "GET",
        headers: {
        	'Content-Type': 'application/json',
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
        	var index = 0;
            data.data.forEach(item => {
            	const markup = `
            	<div style="flex-direction: row;" class="card">
	                <img style="width: 330px; min-width: auto;" class="focusable videocard img-fluid card gap-4" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}', ${item.is_clip}, 1)">
	                <img id="lockiconsaved${index}" class="lockiconsaved" src="img/icons/lock_inactive.svg" onload="checkLockSaved('${item.is_clip}', '${index}')">
	                </img>
	                <div style="display: flex; flex-direction: column; justify-content: center;">
		                <h4 style="padding-top: 1rem;">${item.title}</h4>
		                <p style="font-size: 20px; margin-top:1rem; opacity: 50%;">${item.created_at}</p>                        
	                </div>
                </div>`;
                document.getElementById("savedvideos").innerHTML += markup;
                index++;
            });
        }
    )
    .catch((error) => {
        console.log(error);
    });

function checkLockSaved(checker, index) {
    console.log("In checker: " + index);
    var hasSubscription = sessionStorage.getItem("hasSubscription");
    if (checker == 1 || hasSubscription == "true" ) {
        console.log("In checker cond");
        if(document.getElementById('lockiconsaved' + index)){
	        document.getElementById('lockiconsaved' + index).remove();
        }
	}
}
