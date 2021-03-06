var flattr = require('flattr');

module.exports.config = {
    client_id: 'qALnzUlXSMC4C4UFvp0kBdtPI3yhm2yW',
    client_secret: 'tMcM6dgXAdThDVIwJxd8rwwTmlecqHzX7nnr7nZ69y2k3pdrhPcGhmTucEAK0j8C',
    redirect_uri: 'https://cloudstrife9494.github.io/flattrws-front-depolyment/#/validate',
    scope : 'flattr',
    host : 'https://flattr.com/oauth/authorize',
    path : '/oauth/authorize'
}


module.exports.getAuthenticatedUser = token => {


        return new Promise((resolve,reject) => {

            flattr.users.get_auth(token, function (data) {
                  resolve(data);
            });
        });
}


module.exports.submitForflattrthing = (token,url,title) => {
    var params = {title};

    return new Promise((resolve,reject) => {
       flattr.flattrs.url(token,url,'flattr_user',params,function (data) {
           resolve(data);
       })
    });
}

module.exports.addForFlattr = (token,url,title) => {
    var params = {title};

    return new Promise((resolve,reject) => {
        flattr.things.create(token,url,params,function (data) {
           resolve(data);
        });
    })
}