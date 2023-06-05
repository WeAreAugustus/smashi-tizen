define(['client/shared', 'js/cdn/paginationmin.js'], function(shared) {
    return {
        getSearchResults: function() {
            var myLanguage = sessionStorage.getItem("locale");
            if (!myLanguage) {
                myLanguage = 'en';
            }
            // var searchKeyword = document.getElementById("searchKeyword").value;
            var checkIndex = 0;
            var dataHtml = ``;
            if (myLanguage == 'ar') {
                var searchKeyword = document.getElementsByClassName("form-control")[1].value;
            } else {
                var searchKeyword = document.getElementsByClassName("form-control")[0].value;
            }
            var i = 0;
            dataHtml += `<h1 lang-value="searchresultsfor">Your search was: "${searchKeyword}"</h1>`;
            let container = $('#pagination');
            container.pagination({
                dataSource: 'https://smashi.tv/api/video/search?q=' + searchKeyword,
                locator: 'data',
                totalNumber: 12,
                ajax: {
                    beforeSend: function(xhr) {
                        // xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"); 
                        // xhr.setRequestHeader("Access-Control-Allow-Origin", "localhost:5500");
                        xhr.setRequestHeader("Accept", "application/json");
                        xhr.setRequestHeader("X-localization", myLanguage);
                        // xhr.overrideMimeType("X-localisation","en");
                    },
                },
                cors: true,
                showPageNumbers: true,

                callback: function(data, pagination) {
                    console.log(searchKeyword + data);
                    $.each(data, function(index, item) {
                        dataHtml += `

                    <div class="item">
	                    <div class="card">
	                        <img class="focusable videocard img-fluid card" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}', ${item.is_clip}, 1)">
	                        <h4 class="video-duration">${item.video_duration}</h4>
	                        <img id="lockiconsearch" class="lockicon" src="img/icons/lock_inactive.svg" onload="checkLockSearch(${item.is_clip})"> 
	                        <h4 class="two-line-truncate" style="margin-top: 0.5rem;">${item.title}</h4>
	                        <p style="font-size: 20px; margin-top:1rem; opacity: 50%;">${item.created_at}</p>                        
	                    </div>
                    </div>
                    `;
                        i++;
                    });
                    $("#getSearchResults").html(dataHtml);
                }
            });
        },
    }
});