if(!X2JS)throw Error("You're required to include the X2JS library to use the xml module.");
(function(c,e){function d(b){return(b=b.headers("content-type"))?-1<b.search(/\Wxml/i):!1}function f(b,c){return{response:function(a){return a&&d(a)?(a.data=c.xml_str2json(a.data),a):b.when(a)},responseError:function(a){a&&d(a)&&(a.data=c.xml_str2json(a.data));return b.reject(a)}}}function g(b){b.factory("xmlHttpInterceptor",["$q","x2js",f])}function h(){this.config={};this.$get=["X2JS",function(b){return new b(this.config)}]}c&&c.module("xml",[]).config(["$provide",g]).provider("x2js",h).value("X2JS",
e)})(angular,X2JS);