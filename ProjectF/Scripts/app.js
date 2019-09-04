var myApp = angular.module("myApp", ['ngResource', 'ngAnimate', 'ngMaterial', 'ngRoute', 'material.svgAssetsCache', 'ngMessages', 'ngCookies', 'cl.paging'])
                     .factory("QAService", function ($resource) {
                         var qa = $resource('/api/Quiz/' + ":id", { id: "@@QID" },
                                            { update: { method: 'put' } })
                         return qa;
                     })
                      .service("DataService", function () {
                          var ds = {};
         
                          var saveData = function (newObj) {
                              ds = newObj
                          };

                          var getData = function () {
                              return ds;
                          };

                          return {
                              saveData: saveData,
                              getData: getData
                          };
                      })


//.factory("quizResultService", function ($resource) {
//    var qr = $resource('/api/quizResult/'+':id', { id: "@@userID" },
//                     { get: { method: 'get',responseType:"json",isArray:true } })
//    return qr;
//})

