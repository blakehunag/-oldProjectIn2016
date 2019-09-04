myApp.controller("quizMainController", function ($http, $scope, $window, $mdDialog,$cookies) {

    $scope.htmlPath = '/images/html.png';
    $scope.jsPath = '/images/js.png';
    $scope.angPath = '/images/angular.png';
    $scope.datas = '';
    $scope.htmlData;
    $scope.JavascriptData;
    $scope.AngularJSData;
    //製作餅乾
    var today = new Date();
    today.setDate(today.getDate() + 1);
    document.cookie = "currentUserID=1;path=/; expires=" + today.setDate(today.getDate() + 1);
    //取得餅乾
    var x = $cookies.getAll();
    var currentUserIDFromCookies = x.currentUserID;

    //$scope.datas = quizResultService.query();
    $scope.currentUserID = currentUserIDFromCookies;
    $scope.htmlData = { scrore: "尚未測驗" };
    $scope.JavascriptData = { scrore: "尚未測驗" };
    $scope.AngularJSData = { scrore: "尚未測驗" };
    $http({
        method: 'GET',
        url: 'http://localhost:3400/api/quizResult/' + currentUserIDFromCookies,
        //參數為userID
    }).then(function (res) {
        console.log(res);
        $scope.datas = res.data;
        for(var i=0;i<$scope.datas.length;i++)
        {
           

            if ($scope.datas[i].course == 'HTML')
            {

                $scope.htmlData = $scope.datas[i];
                //if ($scope.htmlData.scrore == null) {
                //    $scope.htmlData.scrore = "尚未測驗"
                //}
            }
            if ($scope.datas[i].course == 'Javascript')
            {

                $scope.JavascriptData = $scope.datas[i];
                //if ($scope.JavascriptData.scrore == null ) {
                //    $scope.JavascriptData.scrore = "尚未測驗"
                //}
            }
             
            if ($scope.datas[i].course == 'AngularJS')
            {

                $scope.AngularJSData = $scope.datas[i];
                //if ($scope.AngularJSData.scrore == null) {
                //    $scope.AngularJSData.scrore = "尚未測驗"
                //}
            }
                
        }
    }, function (res) { });
    $scope.saveInfo = function (cName,cID) {
        document.cookie = "currentCourseName=" + cName + "; expires=" + today.setDate(today.getDate() + 1);
        document.cookie = "currentCourseID=" + cID + "; expires=" + today.setDate(today.getDate() + 1);
        console.log(today.setDate(today.getDate() + 1));
        
    }
    $scope.viewResult = function (cName,ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/directives/dialog2.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
           .then(function (answer) {
               $scope.status = 'You said the information was "' + answer + '".';
           }, function () {
               $scope.status = 'You cancelled the dialog.';
           });

        function DialogController($scope, $mdDialog) {
            var showResult = function () {               
                $http({
                    method: 'GET',
                    url: 'http://localhost:3400/api/quizResult/GetByID?id=' + currentUserIDFromCookies + '&name=' + cName,
                }).then(function (res) {
                    console.log(res.data[0]);
                    $scope.resData = res.data[0];
                    console.log($scope.resData);
                }, function (res) { });
            }
            showResult();
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
                $window.location.href = '/Exam/quizMain';
            };
        }
    }
    //------------------初始化題數
    getQAcount = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:3400/api/Quiz/' + 1,

        }).then(function (res) {
            datas = res.data;
                 $scope.HTMLqaCounts = datas.length;
        }, function (res) { });
        $http({
            method: 'GET',
            url: 'http://localhost:3400/api/Quiz/' + 2,

        }).then(function (res) {
            datas = res.data;
            $scope.JavascriptqaCounts = datas.length;
        }, function (res) { });

        $http({
            method: 'GET',
            url: 'http://localhost:3400/api/Quiz/' + 3,
        }).then(function (res) {
            datas = res.data;
            $scope.AngularjsqaCounts = datas.length;
        }, function (res) { });

    }
    getQAcount();

    //--前往影片連結，製作餅乾
    $scope.goToVideo = function (strCOurse) {
        console.log("gotoVideo");
        document.cookie = "currentCourseToVideo=" + strCOurse + ";path=/; expires=" + today.setDate(today.getDate() + 1);

        window.location.href = "/Exam/videoPage/";


    }
});
