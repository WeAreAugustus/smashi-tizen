define(['client/shared','js/cdn/paginationmin.js'], function(shared){
    return {
        getSearchResults: function () {
                        var myLanguage = sessionStorage.getItem("locale");
            if(!myLanguage){
                myLanguage = 'en';
            }
            // var searchKeyword = document.getElementById("searchKeyword").value;
            var searchKeyword = document.getElementsByClassName("form-control")[0].value;
            var dataHtml = ``;
            dataHtml += `<h1 lang-value="searchresultsfor">"${searchKeyword}"</h1>`;
            let container = $('#pagination');
            container.pagination({
                dataSource: 'https://smashi.tv/api/video/search?q='+searchKeyword,
                locator: 'data',
                totalNumber: 12,
                ajax: {
                    beforeSend: function (xhr) {
                        // xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"); 
                        // xhr.setRequestHeader("Access-Control-Allow-Origin", "localhost:5500");
                        xhr.setRequestHeader("Accept", "application/json");
                        xhr.setRequestHeader("X-localization",myLanguage);
                        // xhr.overrideMimeType("X-localisation","en");
                    },
                },
                cors: true,
                showPageNumbers: true,
                
                callback: function (data, pagination) {
                    console.log(data);

                    // var row_vendor = []; // empty array
                    $.each(data, function (index, item) {
                        id = shared.zeroPad(index + 1, 4);
                        dataHtml += `
                    <script type="text/javascript">
                    
                    document.getElementsByName("video")[0].src = "${item.video_link}";
                    document.getElementsByName("searchVideoTitle")[0].innerHTML = "${item.title}";

                        function omak(vendor, cute){


                            var video = document.querySelector('#videoID');
                            if (Hls.isSupported()) {
                                var hls = new Hls();
                                hls.loadSource(vendor);
                                hls.attachMedia(video);
                                hls.on(Hls.Events.MANIFEST_PARSED,function() {
                                video.play();
                                });
                            }


                            document.getElementById("searchVideoWatch").style.display = "";
                            document.getElementById("searchVideoTitle").style.display = "";
                            




                            document.getElementsByName("searchVideoTitle")[0].innerHTML = cute;
                            

                        }
                    </script>
                    <div class="item">
                    <div style="position: static; padding: 8px;" class="card">
                        <img class="videocard focusable img-fluid card" alt="100%x280" src="${item.poster_url}" tabindex="1" onclick="startVideo('${item.video_link}')">
                        <h4 style="padding-top: 1rem;">${item.title}</h4>
                        <p style="font-size: 20px; margin-top:1rem;">${item.created_at}</p>                        
                    </div>
                    </div>
                    `;
                    });
                    $("#getSearchResults").html(dataHtml);
                }
            });
        },
    }
});


// function fullScreen(){

//     $box4 = $('box_2');

//   $('.box').click(function() {
//   $(this).addClass('box_full');
//       //$(this).addClass('fade_me');

//   $(this).siblings().addClass("fade_me");
//   setTimeout(function() {
//   $(".is_hidden").addClass("is_visible").removeClass("is_hidden");
//   }, 500);
//   });
  
//   $('button[name="exitFullScreen"]').click(function() {
//   event.stopPropagation();
//   $(".is_visible").addClass("is_hidden").removeClass("is_visible");
//   $(this).closest('.box').removeClass('box_full');
//   $(".box").not(this).removeClass("fade_me");
//   element = document.getElementsByName("full_screen")[0];
//   element.focus();
//   });

//   $(document).ready(function() {
//       $('#fullpage').fullpage();
//   });
  
// }