app.controller('modalCtrl', function($scope) {
    $scope.close = function(id) {
        console.log(id);
        document.querySelector('#'+id).style.display = "none";
    };
});