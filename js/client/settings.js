define(['client/shared', 'js/shared/language.js', 'js/cdn/paginationmin.js', 'client/auth'], function (shared, language) {
    return {
        languageChange: function(){
            setTimeout(function(){
                language.init()
                
            }, 50);

        }
    }
});