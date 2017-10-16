var firebase_service = function (referenceName) {
    let self = this;
    var _db, _items, _ref;

    // Initialize Firebase
    let config = {
        apiKey: "AIzaSyAloudyfjv4Mhxg-iCkO4tKYReo90PdERY",
        authDomain: "chadebebe34.firebaseapp.com",
        databaseURL: "https://chadebebe34.firebaseio.com",
        projectId: "chadebebe34",
        storageBucket: "chadebebe34.appspot.com",
        messagingSenderId: "248362789001"
    };
    firebase.initializeApp(config);
    _db = firebase.database();
    _ref = referenceName;
    _items = _db.ref().child(referenceName);

    return {
        auth: function () {
            // Instanciando provedor do Google
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) console.log("Usuário autenticado com sucesso!");
                else {
                    let provider = new firebase.auth.GoogleAuthProvider();
                    firebase.auth().signInWithPopup(provider).then(function (result) {
                        // let token = result.credential.accessToken;                
                        let user = result.user;
                        console.log(user);
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            });
        },
        addItem: function (item, callback) {
            let itemKey = _items.push().key;
            _db.ref(_ref + '/' + itemKey).set(item)
                .then(function() {
                    if (callback) callback();
                });
        },
        deleteItem: _deleteItem,
        getItems: function (callback) {
            _items.orderByChild('updatedAt').on("value", function (snapshot) {
                callback(snapshot);
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        },
        onChild_added: function (callback) {
            _items.on('child_added', function (snapshot) {
                callback(snapshot);
            });
        },
        onchild_removed: function (callback) {
            _items.on('child_removed', function (snapshot) {
                callback(snapshot.key);
            });
        },
        setEvents: function (service, formId, textboxItemId, updateTable) {
            var textbox = document.querySelector('#' + textboxItemId);
        
            service.onChild_added(function (snapshot) {
                textbox.value = '';
                updateTable(snapshot);
            });
            service.onchild_removed(function () {
                console.log('removido');
            });
            document.querySelector('#' + formId)
                .addEventListener('submit', function () {
                    event.preventDefault();
                    var array = textbox.value.split(";");
                    if(array.length > 1) {
                        array.forEach(function(element) {
                            element = element.replace('\n', '');
                            service.addItem({ name: element.trim(), updatedAt: firebase.database.ServerValue.TIMESTAMP });
                        }, this);
                    } else {
                        service.addItem({ name: textbox.value.trim(), updatedAt: firebase.database.ServerValue.TIMESTAMP });
                    }
                }, false);
        }
    };


    var _init = function (referenceName) {

    };
    var _deleteItem = function (itemKey, callback) {
        items.child(itemKey).remove().then(callback);
        //     function (value) {
        //         document.querySelector('#' + id).remove();
        //     },
        //     function (err) {
        //         console.error(err);
        //     }
        // );
    };
};