define(["client/shared","js/shared/language.js","js/cdn/paginationmin.js","client/auth"],function(a,b){return{languageChange:function(){setTimeout(function(){b.init();},50);}};});