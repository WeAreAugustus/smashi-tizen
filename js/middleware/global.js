define(['client/auth'], function(auth){
    return {
        //authenticated middlware
        authMiddleware: function(){
            //alert("auth middleware in action")
                            if(!auth.isAuth()){
                                console.log("authMiddleware called")
                                // window.location.redirect('/login.html')
                                $("<div>").load("components/screens/profile.html", function(){
                                    $("#screen").empty();
                                    $("#screen").append($(this).html());
                                });
                            }
                        }
    }
})
