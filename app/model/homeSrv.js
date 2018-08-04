app.factory('homeSrv', function ($http, $q, productListSrv) {

    function loginWithCode(enterCode) {
        var async = $q.defer();
        var loginURL = 'https://json-server-heroku-ehjizqltwi.now.sh/users?code=' + enterCode

        $http.get(loginURL).then(function (response) {
            // console.log(response.data[0]);
            
            // for (keys in response.data[0]) {
                if (response.data[0]["code"] == enterCode) {
                    var userListItemsIds = response.data[0]["productIds"];
                    productListSrv.userCodeId = response.data[0].id;
                    // console.log(productListSrv.userCodeId);
                    
                    async.resolve(userListItemsIds)
                } else {
                    async.reject(response)
                }
            // }

        }, function (err) {
            async.reject(err);
        });
        return async.promise;
    };


    return {
        loginWithCode: loginWithCode

    }

});