define(['client/shared' , 'client/home'], function(shared, home){
    return {
        tvShows: home.tvShows,
        content: function(page, per_page, showId){
                        var myLanguage = sessionStorage.getItem("locale");
            if(!myLanguage){
                myLanguage = 'en';
            }
            $.ajax({
                url: shared.url['base']+shared.url['tvShows']+`/${showId}/content`,
                type: 'GET',
                beforeSend: function (xhr){
                    xhr.setRequestHeader("Accept","application/json");
                    xhr.setRequestHeader("X-localization",myLanguage);
                },
                data: {
                    page: page,
                    per_page: per_page
                },
                cors: true,
                success: function(response) {
                    response = shared.responseSuccessHandler(response);
                    console.log(typeof response.data)
                    if (response.status == 200) {
                        var dataArr = response.data;
                        // totalrecord = data.success.totalrecord;
                        var html = "";
                        console.log(shared.zeroPad(12, 4))
                        for (var i = 0; i < dataArr.length; i++) {
                            var id = shared.zeroPad(i+1, 4);
                            html += `
                            <div  class="col-md-4 mb-3">
                                <div  id="${id}0003" tabindex="1" class="card">
                                    <img class="img-fluid" alt="100%x280" src="${dataArr[i].background_image}">
                                    <div  class="card-body">
                                        <h4 class="card-title">${dataArr[i].title}</h4>
                                    </div>
                                </div>
                            </div>
                            `;
                        }
                        $("#content").html(html);
                    }
                },
                error: function(error) {
                    error = shared.responseErrorHandler(error);
                    $('#content').html('<p>An error has occurred during the request</p>');
                },
            });
        },
    }

});