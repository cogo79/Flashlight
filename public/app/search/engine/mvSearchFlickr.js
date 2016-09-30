const FLICKR = "FLICKR";

angular.module('app').factory('mvSearchFlickr', ['$http', '$q', function mvSearchFlickrNotAnAnonymousFunctionAnyMoreDa($http, $q) {
	function jSONParse(response) {
		var d = response.data.replace(new RegExp(/^jsonFlickrApi\(/),'');
		var d2 = d.replace(new RegExp(/\)$/), '');
		var data = JSON.parse(d2);
		return data;
	}
	function format(result) {
		var o = {
			from: FLICKR,
			meta: result
		}
		var main ='https://c7.staticflickr.com/'+
			result.farm+'/'+
			result.server+'/'+
			result.id+'_'+
			result.secret;
		o.url = main+'_n.jpg';
		o.urlFullSize = main+'_b.jpg'
		return o;
	};
	function formatAll(data) {
		var formated = [];
		for (var i = 0; i < data.photos.photo.length; i++) {
			formated.push( format(data.photos.photo[i]) );
		}
		return formated;
	};
	var currentSearchString;
	var currentPage;
	var totalPages;
	return {
		newSearch: function(word) {
			var dfd = $q.defer();
			$http({
				method: 'GET',
				url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14f9088eec0f71b0bebc5e4d919c36e6&format=json&text=' + word
			}).then(function successCallback(response) {
				currentSearchString = word;
				var data = jSONParse(response);
				var formated = formatAll(data);
				currentPage = 1;
				totalPages = data.photos.pages;
				dfd.resolve(formated);
			}, function errorCallback(response) {
				dfd.reject(response);
			});
			return dfd.promise;
		},
		nextPage: function() {
			var nextP = currentPage+1;
			var dfd = $q.defer();
			if (nextP > totalPages) {
				dfd.reject(NO_MORE_PAGES);
			} else {
				$http({
					method: 'GET',
					url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14f9088eec0f71b0bebc5e4d919c36e6&format=json&text=' + currentSearchString + '&page=' + nextP
				}).then(function successCallback(response) {
					var data = jSONParse(response);
					var formated = formatAll(data);
					currentPage++;
					totalPages = data.photos.pages;
					dfd.resolve(formated);
				}, function errorCallback(response) {
					dfd.reject(response);
				});
			}
			return dfd.promise;
		}
	};
}]);