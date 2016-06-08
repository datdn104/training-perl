angular.module('highlighter', []).controller('FormController', ['$scope', '$rootScope',  function($scope, $rootScope){
	$rootScope.items = [];
	$scope.submit = function() 
	{
	    $rootScope.items.push({
	    	original: this.Hl.original,
	    	translate: this.Hl.translate,
	    	description: this.Hl.description
	    });

	    chrome.storage.local.set({items: $rootScope.items});
	};
}]);

chrome.storage.local.get({items: []}, function (result) {
	var injector = angular.element(document.querySelector('[ng-app]')).injector();
	var $rootScope = injector.get('$rootScope');
	$rootScope.items = result.items;
	$rootScope.$apply();
});

$(function () {
    $('#myTab a:first').tab('show');
});