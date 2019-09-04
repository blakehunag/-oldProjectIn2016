myApp.directive('itemListing',  function () {
    return {
        restrict: 'E',
        scope: {
            //oneway bind沒搞定
            listing: '<',
        },
        controller: function ($scope) {
            $scope.remove = function (id) {
                $scope.$parent.delete(id);

            };
            $scope.edit = function (id) {
                $scope.$parent.edit(id);
            }
            
        },
        templateUrl: '/directives/itemListing.html',
        

    };
});