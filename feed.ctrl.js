angular.module('FBGroupFeedModule', []).
	controller('FeedCtrl',['$scope', 'FBDataService', function($scope, FBDataService){
		$scope.data = FBDataService.getData();
	}]).
	service('FBDataService', ['$http', function($http){
		var url = 'graph.facebook.com....';//TODO
		var config = {
	      params: {
	        access_key:'',
	        id: ''
	      }
	    };

	    this.getData = function () {
			/*$http.get(url, config).success(function(res){
		    	$scope.data = res;
		    });*/
			data = {
				items: [
					{image:'https://graph.facebook.com/753746590/picture', text: 'By Robert Ferentz on Oct, 30th Oren Farhi speaking at Fullstack event.'},
					{image: 'https://graph.facebook.com/648596391/picture', text : 'By Lior Kanfi on Oct, 22nd Upcoming event in on the 30/10 about Automated UI testing for web applications, come and join us!...' },
					{image: 'https://graph.facebook.com/1032384980/picture', text : 'By Chaim Turkel on Oct, 20th I hope this summary about graphite will encourage you to use it http://www.tikalk.com/node/12450' }
				]
			}

			return data;
		};

	}])
