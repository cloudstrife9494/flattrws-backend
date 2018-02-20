var firebase = require('firebase');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCuxwngom-jIXv0kUEKdiMUZgR8xEEFPhs",
    authDomain: "itunespodcasts-c7e47.firebaseapp.com",
    databaseURL: "https://itunespodcasts-c7e47.firebaseio.com",
    projectId: "itunespodcasts-c7e47",
    storageBucket: "itunespodcasts-c7e47.appspot.com",
    messagingSenderId: "481731853243"
};
firebase.initializeApp(config);

var markedItemsRef = firebase.database().ref('markedItems');

var getMarkedItems = function getMarkedItems(userId){
    var userRef = markedItemsRef.child(userId);


    return new Promise((resolve,reject) => {
        userRef.on('value',(snap) => {
            if(!snap.val())
                return reject('no user');
            return resolve(snap.val().items);
        });

    });
}


module.exports.getMarkedItems = getMarkedItems;

var updateOrCreateItems = function updateOrCreateItems(userId,items) {
     var userRef = markedItemsRef.child(userId);


     userRef.update({items});
};

module.exports.updateOrCreateItems = updateOrCreateItems ;


module.exports.addOneItem = (userId,payload) => {

    return new Promise((resolve,reject) => {
        var newItems ;
        getMarkedItems(userId).then(items => {
            newItems = [...items,payload];
            updateOrCreateItems(userId,newItems);
            return resolve(newItems);
        }).catch(err => {
            newItems = [payload];
            updateOrCreateItems(userId,newItems);
            return resolve(newItems);
        });

    });
}

module.exports.removeOneItem = (userId,collectionId) => {

       return new Promise((resolve,reject) => {

           getMarkedItems(userId).then(items => {
               var newItems = items.filter(item => item.collectionId != collectionId);
               updateOrCreateItems(userId,newItems);
               return resolve(newItems);
           }).catch(err => reject(err));

    });

}

module.exports.removeAllItems =  userId => {
    var userRef = markedItemsRef.child(userId);

    userRef.remove();
}

