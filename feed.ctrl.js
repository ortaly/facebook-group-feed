angular.module('FBGroupFeedModule', []).
controller('FeedCtrl',['$scope', 'FBDataService', function($scope, FBDataService){
	$scope.data = [];

	FBDataService.getData().then(function(res){
		var feeds = res.data.slice(0,5);
		for (var i=0; i<feeds.length; i++){
			var id = feeds[i].id; 
			var feedId = [];
			feedId.push(id.substring(0,id.indexOf("_")));
			feedId.push(id.substring(id.indexOf("_")+1));

			var feed = {
				image: "https://graph.facebook.com/" + feeds[i].from.id + "/picture",
				authorName: feeds[i].from.name,
				profilePage: "https://www.facebook.com/app_scoped_user_id/" + feeds[i].from.id,
				created: feeds[i].created_time,
				message: feeds[i].message,
				postMessage: "https://www.facebook.com/" + feedId[0] + "/posts/" + feedId[1]

			}

			$scope.data.push(feed);
		}

	},function(reason){
		console.log(reason);
	});
}]).
service('FBDataService', ['$http', '$window', '$q', function($http, $window, $q){
	fb = $window.FB;

	fb.init({
		appId: '334506690062624',
		status: true, 
		cookie: true, 
		xfbml: true
	});

	this.getData = function () {
		var deferred = $q.defer();
			fb.api(
				"/v2.2/225585444263260/feed?access_token=334506690062624|wYA-QpptpE0UZBjBTicmS2JKkIU",
				function (response) {
					if(response.error){
						deferred.reject(response.error);
					} else if (response && !response.error) {
						deferred.resolve(response);
					}
				});

			return deferred.promise;
		
	}

		     // fb.api('/me', function(response) {
			    //   console.log('Successful login for: ' + response.name);
			    //   document.getElementById('status').innerHTML =
			    //     'Thanks for logging in, ' + response.name + '!';
			    // });

	    	//var access_token = FB.getAccessToken();
		    //var access_token = 'access_token=334506690062624|wYA-QpptpE0UZBjBTicmS2JKkIU'; 

		    //var url = "https://graph.facebook.com/225585444263260/events?";
	    	//$access_token = https://graph.facebook.com/oauth/access_token?client_id=334506690062624&client_secret=364028d6589468aa611a9dd5210fc2c0&grant_type=client_credentials
	  //   	fb.api('/me/conversations', { access_token:'334506690062624|wYA-QpptpE0UZBjBTicmS2JKkIU'}, function(response) {
	  //   		debugger;
			//   console.log(response);
			// });



	// $http.get(url, config).success(function(res){
	// 	debugger;
	// 	$scope.data = res;
	// });		
	// data = {
	// 	items: [
	// 	{image:'https://graph.facebook.com/753746590/picture', text: 'By Robert Ferentz on Oct, 30th Oren Farhi speaking at Fullstack event.'},
	// 	{image: 'https://graph.facebook.com/648596391/picture', text : 'By Lior Kanfi on Oct, 22nd Upcoming event in on the 30/10 about Automated UI testing for web applications, come and join us!...' },
	// 	{image: 'https://graph.facebook.com/1032384980/picture', text : 'By Chaim Turkel on Oct, 20th I hope this summary about graphite will encourage you to use it http://www.tikalk.com/node/12450' }
	// 	]
	// }

	// return data;
	// };

}]);
