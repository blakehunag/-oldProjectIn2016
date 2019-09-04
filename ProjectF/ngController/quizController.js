myApp.controller("quizController", function (QAService, $scope, $timeout, $http, $cookies, $mdDialog, $window, DataService, $location) {
    var vm = this
    var x = $cookies.getAll();
    $scope.QAcounts;
    $scope.forShowData = {};
    var currentUserID = x.currentUserID;
    var currentCourseID = x.currentCourseID;
    //QAService.query().$promise.then(function (data) {
    //    vm.QAs = data;
    //    vm.QA = data[0];

    //});
    /// fuck DB的score拼錯
    $http({
        method: 'GET',
        url: 'http://localhost:3400/api/Quiz/' + currentCourseID,

    }).then(function (res) {
        vm.QAs = res.data;
        vm.QA = res.data[0];
        console.log("log vm.QA :" + vm.QA);
        $scope.QAcounts = vm.QAs.length;
        console.log($scope.QAcounts);
        $scope.paging = {
            total: $scope.QAcounts,
            current: 1,
            onPageChanged: loadPages,
        };
        $scope.forShowData = vm.QAs
        console.log();
        console.log("forShowData = " + $scope.forShowData);
    }, function (res) { });
    //vm.QA = "";

    $scope.index = 0;
    $scope.currentPage = 1;
    $scope.btnPreDisable = true;
    $scope.option = 0
    $scope.answer = [];



    //console.log(DataService.currentUser);

    quizResult = {
        testYet: true,
        scrore: null,
        course: x.currentCourseName,
        userID: currentUserID,
        A1: null,
        A2: null,
        A3: null,
        A4: null,
        A5: null,
        A6: null,
        A7: null,
        A8: null,
        A9: null,
        A10: null,
    }
    vm.NxtQA = function () {

        if ($scope.index + 1 < vm.QAs.length) {
            $scope.paging.current++;
            //loadPages();

        }
    }

    vm.PreQA = function (id) {
        if ($scope.index > 0) {
            $scope.paging.current--;
            //loadPages();
        }
    }
    //----------------paging-----
    //$scope.currentPage = 0;

    function loadPages() {
        $scope.index = $scope.paging.current - 1;
        //currentPage是記住上一個頁
        var lastPage = $scope.currentPage;
        //console.log("$scope.currentPag="+$scope.currentPage);
        //把記住的選項加上
        $scope.option = $scope.answer[$scope.index];
        //console.log("lastPage" + lastPage);

        var lastIndex = lastPage - 1;
        if ($scope.answer[lastIndex] == undefined) {
            $("span").filter(function() {
                return $(this).text() == lastPage;
            }).css("color", "#E34F26");
            console.log("$scope.answer[lastIndex] =" + $scope.answer[lastIndex]);
        }
        else {
            $("span").filter(function () {
                return $(this).text() == lastPage;
            }).css("color", "#8A2BE2");
            console.log("not udefined" + $scope.answer[lastIndex]);
        }
        console.log(' $scope.paging.current : ' + $scope.paging.current);
        console.log('currentPage : ' + $scope.currentPage);
        console.log('Current index is : ' + $scope.index);


        vm.QA = vm.QAs[$scope.index];
        btnDisable();

        $scope.currentPage = $scope.paging.current;

    }


    //----------timer---------
    $scope.counter = 600;  //秒
    $scope.onTimeout = function () {
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
        if (($scope.counter / 60) > 1) {
            $scope.mins = ($scope.counter / 60) - 1;
        }
        else {
            $scope.mins = 0;
        }
        $scope.secs = ($scope.counter % 60)
        if ($scope.counter == 0) {
            $scope.stop();
        }
    }
    var mytimeout = $timeout($scope.onTimeout, 1000);

    $scope.stop = function () {
        $timeout.cancel(mytimeout);
        var showTimeUpMsg = function (ev) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '/directives/timeUp.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                       .then(function (answer) {
                           //$scope.status = 'You said the information was "' + answer + '".';
                       }, function () {
                           //$scope.status = 'You cancelled the dialog.';
                       });
         
        }
 
        $scope.submit = true;
        DataService.saveData($scope.forShowData);
        $http({
            method: 'POST',
            url: 'http://localhost:3400/api/quizResult/',
            data: JSON.stringify(quizResult),
        }).then(function (res) {
            //vm.datas = res.data;
            //vm.QA = res.data[0];
            console.log("post Complete");
        }, function (res) { });

        showTimeUpMsg();
        //showResult();

    }

    //---------判斷是否能往上、下題
    var btnDisable = function () {
        if ($scope.index == 0) {
            $scope.btnPreDisable = true;
        }
        else {
            $scope.btnPreDisable = false;
        }
        if ($scope.index == vm.QAs.length - 1) {
            $scope.btnNxtDisable = true;
        }
        else {
            $scope.btnNxtDisable = false;

        }
    }

    //---------記住每題選擇的項目-------
    Chose = "";

    $scope.radioClick = function (Chose) {
        //console.log($scope.option);
        switch ($scope.index) {
            case 0:
                $scope.answer[0] = $scope.option;
                quizResult.A1 = Chose;
                $scope.forShowData[0]['userAnswer'] = Chose;
                break;
            case 1:
                $scope.answer[1] = $scope.option;
                quizResult.A2 = Chose;
                $scope.forShowData[1]['userAnswer'] = Chose;
                break;
            case 2:
                $scope.answer[2] = $scope.option;
                quizResult.A3 = Chose;
                $scope.forShowData[2]['userAnswer'] = Chose;
                break;
            case 3:
                $scope.answer[3] = $scope.option;
                quizResult.A4 = Chose;
                $scope.forShowData[3]['userAnswer'] = Chose;
                break;
            case 4:
                $scope.answer[4] = $scope.option;
                quizResult.A5 = Chose;
                $scope.forShowData[4]['userAnswer'] = Chose;
                break;
            case 5:
                $scope.answer[5] = $scope.option;
                quizResult.A6 = Chose;
                $scope.forShowData[5]['userAnswer'] = Chose;
                break;
            case 6:
                $scope.answer[6] = $scope.option;
                quizResult.A7 = Chose;
                $scope.forShowData[6]['userAnswer'] = Chose;
                break;
            case 7:
                $scope.answer[7] = $scope.option;
                quizResult.A8 = Chose;
                $scope.forShowData[7]['userAnswer'] = Chose;
                break;
            case 8:
                $scope.answer[8] = $scope.option;
                quizResult.A9 = Chose;
                $scope.forShowData[8]['userAnswer'] = Chose;
                break;
            case 9:
                $scope.answer[9] = $scope.option;
                quizResult.A10 = Chose;
                $scope.forShowData[9]['userAnswer'] = Chose;
                break;
            default:
                break;
        }
        console.log("Log Index : " + $scope.index);
        console.log("Log forShowData : ");
        console.log($scope.forShowData);

    }
    //var rememberSeleted = function () {
    //switch ($scope.index) {
    //    case 0:
    //        answer[0] = $scope.option;
    //        quizResult.A1 = Chose
    //        break;
    //    case 1:
    //        answer[1] = $scope.option;
    //        quizResult.A2 = Chose

    //        break;
    //    case 2:
    //        answer[2] = $scope.option;
    //        quizResult.A3 = Chose
    //        break;
    //    default:

    //    }
    //    console.log(answer);
    //}


    $scope.score;
    $scope.submit = false;

    //----------交卷囉~
    $scope.submitQA = function (ev) {
        $scope.submit = true;
        $timeout.cancel(mytimeout);

        //console.log(JSON.stringify(quizResult));
        DataService.saveData($scope.forShowData);
        $http({
            method: 'POST',
            url: 'http://localhost:3400/api/quizResult/',
            data: JSON.stringify(quizResult),
        }).then(function (res) {
            //vm.datas = res.data;
            //vm.QA = res.data[0];
            console.log("post Complete");
            showResult(ev);
        }, function (res) { });
    }
    ////////////這function遠本在submit內，為了讓timeUp能取用，所以外置
    showResult = function (ev) {
        $http({
            method: 'GET',
            url: 'http://localhost:3400/api/quizResult/GetByID?id=' + currentUserID + '&name=' + $cookies.getAll().currentCourseName,
        }).then(function (res) {
            console.log("currentUserID" + currentUserID + "currentCourseName:" + $cookies.getAll().currentCourseName);
            $scope.resData = res.data;
            $scope.forShowData['score'] = $scope.score = parseInt($scope.resData.scrore, 10);
            DataService.saveData($scope.forShowData);

            console.log($scope.score);

            $mdDialog.show({
                controller: DialogController,
                templateUrl: '/directives/dialog1.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                   .then(function (answer) {
                       //$scope.status = 'You said the information was "' + answer + '".';
                   }, function () {
                       //$scope.status = 'You cancelled the dialog.';
                   });
        }, function (res) { });
    }
    function DialogController($scope, $mdDialog, DataService) {

        //var showResult = function () {
        //    console.log("log cookies"+$cookies.getAll());
        //    $http({
        //        method: 'GET',
        //        url: 'http://localhost:3400/api/quizResult/GetByID?id=' + currentUserID + '&name=' + $cookies.getAll().currentCourseName,
        //    }).then(function (res) {
        //        console.log(currentUserID + $cookies.getAll().currentCourseName);
        //        $scope.resData = res.data[0];
        //        console.log("log resData:"+$scope.resData);
        //    }, function (res) { });
        //}
        //showResult();

        $scope.forShowData = DataService.getData();
        console.log("log forShowData :");

        console.log($scope.forShowData);
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
        $scope.viewResult = function (ev) {
            showResult();
            console.log("viewResult");

        }
    }







    //function sleep(milliseconds) {
    //    var start = new Date().getTime();
    //    for (var i = 0; i < 1e7; i++) {
    //        if ((new Date().getTime() - start) > milliseconds) {
    //            break;
    //        }
    //    }
    //}
    $scope.toMain = function () {
        $window.location.href = '/Exam/quizMain';
        console.log("to Main");
    }
    //-----
    //keyPres = function (event) {
    //    if (event.which === 13) {
    //        scope.$apply(function () {
    //            alert();
    //        });

    //        event.preventDefault();
    //    }
    //}
    $scope.summonEevee = false;
    $scope.onKeyPress = function (ev) {

        if (ev.which === 13) {
            $scope.counter = 10;
        }
        if (ev.which === 49) {
            $scope.counter =6000;
            console.log("shift+a");
            $scope.summonEevee = !$scope.summonEevee;

        }
    };

});
