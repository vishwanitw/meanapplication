var app=angular.module('myApp',[]);

app.controller("UserController",function($scope,$http){
	console.log("controller received the message");

	var refresh = function() {
		$http.get("/usersList").success(function(response){
			var usersList="";
	 		$scope.usersList=response; 
	 		$scope.user = "";
		});
	}
	$scope.addUser = function() {
		console.log($scope.user);
		$http.post("/usersList",$scope.user).success(function(response){
			$scope.user=response;
			refresh();
		});
		
	}
	   refresh();

	$scope.remove = function (id) {
		console.log(id);
		$http.delete("/usersList/" + id).success(function(response){
			refresh();
		});
	};

	$scope.edit = function(id){
	   console.log(id);
		$http.get("/usersList/"+id).success(function(response){
			$scope.user = response;

		});
	};

	$scope.update = function() {
		console.log("inside update");
		$http.put("/usersList/"+$scope.user._id, $scope.user).success(function(response){
			console.log('update response is :',response);
			refresh();
		});
	};

});
	
	