var angular = require("angular");

var app = angular.module("app.locale",[]);

app.factory("sessionManager",function(){

    this.loged2;
    
    return {
        
            loged:function(){
                $("#navbarVertical").attr("class","col-sm-3");
                $("#userProfileName").attr("class","form-group dropdown");
                $("#navbarMain").attr("class","col-sm-9");
                $("#userProfileName").html('Hector' + ' <span class="caret"></span>');
                this.loged2 = true;
                return this.loged2;
            },
            notLoged: function(){
                $("#navbarMain").attr("class","col-sm-12");
                $("#navbarVertical").attr("class","col-sm-3 ng-hide");
                $("#userProfileName").html("");
                $("#userProfileName").attr("class","form-group dropdown ng-hide");
                this.loged2 = false;
                return this.loged2;
            },
            getLoged: function(){
                if (window.location.href.indexOf("/login")==-1){
                    $("#navbarMain").attr("class","col-sm-9");
                    $("#userProfileName").html('Hector' + ' <span class="caret"></span>');
                    this.loged2 = true;
                }else
                    this.loged2 = false;
                return this.loged2;
            }
        
    }

    
});