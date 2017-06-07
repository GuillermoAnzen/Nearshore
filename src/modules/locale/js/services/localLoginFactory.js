var angular = require("angular");

var app = angular.module("app.locale",[]);

app.factory("sessionManager",function(){

    return {
        
            loged:function(user){
                $("#navbarVertical").attr("class","col-sm-3");
                $("#userProfile").attr("class","form-group dropdown");
                $("#navbarMain").attr("class","col-sm-9 navbarMain");
                $("#userProfileName").html(user + ' <span class="caret"></span>');
            },
            notLoged: function(){
                $("#navbarMain").attr("class","col-sm-12");
                $("#navbarVertical").attr("class","col-sm-3 ng-hide");
                $("#userProfile").attr("class","form-group dropdown ng-hide");
                $("#userProfileName").html("");
            }
        
    }

    
});