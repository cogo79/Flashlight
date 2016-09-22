const FLICKR = "FLICKR";


angular.module('app').factory('mvSearchFlickr', ['$http', '$q', function mvSearchFlickrNotAnAnonymousFunctionAnyMoreDa($http, $q) {
	function format(result) {
		var o = {
			from: FLICKR,
			meta: result
		}
		o.url = 'https://c7.staticflickr.com/'+
			result.farm+'/'+
			result.server+'/'+
			result.id+'_'+
			result.secret+'_n.jpg';
		return o;
	};
	return {
		newSearch: function(word) {
			var dfd = $q.defer();
			var searchResults = [];
			$http({
				method: 'GET',
				url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14f9088eec0f71b0bebc5e4d919c36e6&format=json&text=' + word
			}).then(function successCallback(response) {
				var d = response.data.replace(new RegExp(/^jsonFlickrApi\(/),'');
				var d2 = d.replace(new RegExp(/\)$/), '');
				var data = JSON.parse(d2);
				console.log(data);
				for (var i = 0; i < data.photos.photo.length; i++) {
					searchResults.push( format(data.photos.photo[i]) );
				}
				dfd.resolve(searchResults);
			}, function errorCallback(response) {
				dfd.reject(response);
			});
			return dfd.promise;
		}
	};
}]);