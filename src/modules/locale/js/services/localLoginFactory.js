var angular = require("angular");

var app = angular.module("app.locale",[]);

app.factory("sessionManager",function(){

    this.loged2;
    
    return {
        
            loged:function(user){
                $("#navbarVertical").attr("class","col-sm-3");
                $("#userProfile").attr("class","form-group dropdown");
                $("#navbarMain").attr("class","col-sm-9");
                $("#userProfileName").html(user + ' <span class="caret"></span>');
                this.loged2 = true;
                return this.loged2;
            },
            notLoged: function(){
                $("#navbarMain").attr("class","col-sm-12");
                $("#navbarVertical").attr("class","col-sm-3 ng-hide");
                $("#userProfile").attr("class","form-group dropdown ng-hide");
                $("#userProfileName").html("");
                this.loged2 = false;
                return this.loged2;
            },
            getLoged: function(){
                if (window.location.href.indexOf("/login")==-1){
                    $("#navbarMain").attr("class","col-sm-9");
                    $("#userProfileName").html('USER_SESSION' + ' <span class="caret"></span>');
                }else
                    this.loged2 = false;
                return this.loged2;
            }
        
    }

    
});