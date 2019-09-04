myApp.controller("MainController", function (QAService, $scope, $http) {
    var vm = this;
    currentCourseID = 1;

    var refresh = function () {
        //--------------這段只有取所有course的題目數出來----------
        $http({
            method: 'GET',
            url: 'http://localhost:3400/api/Quiz/' + 1,

        }).then(function (res) {
            //vm.datas = res.data;
            vm.HTMLqaCounts = res.data.length;
            
        }, function (res) { });

        $http({
            method: 'GET',
            url: 'http://localhost:3400/api/Quiz/' + 2,

        }).then(function (res) {
            //vm.datas = res.data;
            vm.JavascriptqaCounts = res.data.length;

            //vm.QA = res.data[0];
        }, function (res) { });

        $http({
            method: 'GET',
            url: 'http://localhost:3400/api/Quiz/' + 3,
        }).then(function (res) {
            //vm.datas = res.data;
            vm.AngularjsqaCounts = res.data.length;
            //vm.QA = res.data[0];
        }, function (res) { });
        vm.QA = "";

        //----------------------refresh一定要從抓資料阿------------------        
        $http({
        method: 'GET',
        url: 'http://localhost:3400/api/Quiz/' + currentCourseID,

        }).then(function (res) {
            vm.datas = res.data;
            //vm.QA = res.data[0];
            //currentCourseID = courseID;
            vm.QA = "";
        }, function (res) { });

    }
    //--------------------------------------------

    refresh();

    //--------------CRUD function-----------------

    vm.add = function () {
        console.log(currentCourseID);
        vm.QA.CID = currentCourseID;
        QAService.save(vm.QA, function () {
            refresh();
        });
    }
    //----明明都是edit，但要給itemListing.js用，所以多了一個
    //vm的話要怎麼用呢
    vm.delete = function (id) {
        QAService.remove({ id: id }, function () {
            refresh();
        });
    }
    $scope.delete = function (id) {
        QAService.remove({ id: id }, function () {
            refresh();
        });
    }
    //----明明都是edit，但要給itemListing.js用，所以多了一個
    vm.edit = function (id) {
        QAService.get({ id: id }, function (data) {
            vm.QA = data;
        })
    }
    $scope.edit = function (data) {
        vm.QA = data;
        console.log(data);
    }

    vm.update = function () {
        console.log(JSON.stringify(vm.QA));
        //vm.QA.$update(function () {
        //    refresh();                       
        //})

        ///為什麼這麼高岡，因為$get只有一種接受參數的get，所以edit時我不能有另外一種get來取得列表中，以qID的資料來帶入input(也就是vm.QA)
        //所以我直接透過click時直接傳入data給input，但是傳進來的資料不能用vm.QA.$update，幹，所以轉json自己用http來做
        //到時候存成績應該也可以轉json這樣寫進DB
        $http.put('http://localhost:3400/api/Quiz/', JSON.stringify(vm.QA)).
            success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                refresh();
                console.log('refresh?');
            }).
        error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    }

    //左邊列表點選切換顯示課程的題目
    vm.changeCourse = function (courseID) {
        switch (courseID) {
            case 1:
                $('#a1').addClass('active');
                $('#a2').removeClass('active');
                $('#a3').removeClass('active');
                currentCourseID = 1;
                break;
            case 2:
                $('#a2').addClass('active');
                $('#a1').removeClass('active');
                $('#a3').removeClass('active');
                currentCourseID = 2;
                break;
            case 3:
                $('#a3').addClass('active');
                $('#a2').removeClass('active');
                $('#a1').removeClass('active');
                currentCourseID = 3;
                break;
            default:

        }
        $http({
            method: 'GET',
            url: 'http://localhost:3400/api/Quiz/' + courseID,

        }).then(function (res) {
            vm.datas = res.data;
            //vm.QA = res.data[0];
            currentCourseID = courseID;
            vm.QA = "";
        }, function (res) { });
    }
    //這是預設載入html題目的頁面
    vm.changeCourse(1);


});
