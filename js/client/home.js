define(['client/shared', 'js/shared/language.js', 'js/cdn/paginationmin.js', 'client/auth'], function (shared, language) {
    return {
        topSection: function () {
            var dataHtml = "";
            dataHtml += `
        <div class="row">
            <!-- Left Section -->
            <div style="margin-top: 6rem;" class="col-5">
                <div class="container-fluid">
                    <h2 style="font-weight: 700; font-size: 48px; margin-bottom: 2rem;" lang-value="intro"></h2>
                    <div style="margin-bottom: 3rem;">
                    	<img src="img/Live.svg" style="margin-bottom: 1rem">
                    	<h2 lang-value="morning" style="font-weight: 600; font-size:32px;"> </h2>
                    </div>
                    <div style="margin-bottom: 2rem;">
                    	<h2 lang-value="up" style="font-weight: 700; font-size:24px; margin-bottom: 1rem;"> </h2>
                    	<h2 style="font-weight: 600; font-size:32px;"> Tech Bel Araby </h2>
                    </div>
                    <button class="focusable newbutton watchlivebutton" onclick="toAccount()" onclick="toAccount()" id="DummyButton" lang-value="watch" style="font-weight: 700; font-size: 32px;">
                    </button>
                  <div id="full" style="display: block;">
	                	<button id="fsb" class="focusable fullbutton fullbuttonbefore" onclick="setToFullScreen()">
	                		<img src="img/fullbefore.svg">
	                	</button>
	                	<button class="focusable fullbutton fullbuttonafter" onclick="setToFullScreen()">
	            			<img src="img/fullafter.svg">
	            		</button> 
            		</div> 
                </div>
            </div>
            <!-- Right Section -->
            <div id="livePlayer" class="col-7">
            
                <div id="videoContainer" class="videoContainer">
                    <div  class='player-container'>
                    <div id="subscriptionText" style="display: none; text-align: center;position: absolute;z-index: 999;top: 14%;right: 12%;font-style: normal;font-weight: 600;font-size: 56px;line-height: 66px;">
	                        <p>Get Premium</p>
	                        <p>To Continue Watching</p>
		                    <button lang-value="starttrial" style="margin-top: 1rem; font-size: 48px; font-weight: 600;" class="focusable newbutton starttrialbutton"
		                    onclick="toAccount()">
		                    </button>  
                    </div>
                        <div id="liveVideoPlayer" style="filter: blur(0px);" class='player'>
                            <video id="video" playsinline pause></video>
                            <img src="img/Livepng.svg" style="position: inherit; margin-top: 1rem; margin-left: 2rem; top: 2rem;">
                        </div>
                    </div>
                </div>
            </div>
        
        
        </div>
           
        <script>

        	var video = document.getElementById("video");
            hasSubscription = sessionStorage.getItem("hasSubscription");
            if (hasSubscription == null) {
            	document.getElementById("subscriptionText").style.display = "";
            	document.getElementById("liveVideoPlayer").style.filter = "blur(15px)";
            	document.getElementById("full").style.display = "none";
            } 
            else {
                document.getElementById("controlsView").style.display = "";
            	document.getElementById("full").style.display = "block";
                document.getElementById("subscriptionText").remove();
            }

            function toAccount() {
            	require(["router"], function (router) {
            		router.changeScreen('profile');
            	});
            }
        </script>             
                `
            $("#topSection").html(dataHtml);
        },
    }
});