/* global firebase */

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAloudyfjv4Mhxg-iCkO4tKYReo90PdERY",
    authDomain: "chadebebe34.firebaseapp.com",
    databaseURL: "https://chadebebe34.firebaseio.com",
    projectId: "chadebebe34",
    storageBucket: "chadebebe34.appspot.com",
    messagingSenderId: "248362789001"
};
firebase.initializeApp(config);

var db = firebase.database();
var invites = db.ref('invites');

invites.on('child_added', function (snapshot) {
    updateInvites('#tb_invites', snapshot);
});
invites.on('child_removed', function (snapshot) {
    deleteInvite(snapshot.key);
});

/*
 *
 *  Function createInvite
 * 
 */

function createInvite(name, email, tel, code) {
    var ivtData = {
        name: name,
        email: email,
        tel: tel,
        code: code,
        confirmed: false
    };
    console.log(ivtData);
    var ivtKey = invites.push().key;
    db.ref('invites/' + ivtKey).set(ivtData).then(function () {
        init();
    });
}

document.querySelector('#form-invite')
    .addEventListener('submit', function () {
        event.preventDefault();
        var name = document.querySelector('#nome').value;
        var email = document.querySelector('#email').value;
        var tel = document.querySelector('#tel').value;
        var code = document.querySelector('#code').value;
        createInvite(name, email, tel, code);
    }, false);

/*
 *
 *  Function readInvite
 * 
 */

function updateInvites(elem, value) {
    var val = value.val()
    var tr = document.createElement('tr');
    tr.setAttribute('id', value.key);
    tr.setAttribute('class', (val.confirmed) ? 'success' : '');
    var tdName = document.createElement('td');
    tdName.innerText = val.name;
    var tdEmail = document.createElement('td');
    tdEmail.innerText = val.email;
    var tdTel = document.createElement('td')
    tdTel.innerText = val.tel;
    var tdCode = document.createElement('td')
    tdCode.innerText = val.code;
    var tdAction = document.createElement('td');
    if (!val.confirmed) {
        tdAction.innerHTML = '<input type="button" class="btn btn-danger btn-sm" value="Apagar" onclick="deleteInvite(\'' + value.key + '\')">';
    }

    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdTel);
    tr.appendChild(tdCode);
    tr.appendChild(tdAction);
    document.querySelector(elem).appendChild(tr);
}

/*
 *
 * Function Delete Invite 
 * 
 */

function deleteInvite(id) {
    invites.child(id).remove().then(
        function (value) {
            document.querySelector('#' + id).remove();
        },
        function (err) {
            console.error(err);
        }
    );
}


// Instanciando provedor do Google

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
    } else {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
        // No user is signed in.
    }
});

function geraCode() {
    var code = codegen(6, true, false, false);
    // console.log(code);
    document.querySelector('#code').value = code;
};

document.querySelector('#newCode').addEventListener('click', function () {
    geraCode();
}, false);

init();

function init() {
    document.querySelector('#nome').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#tel').value = '';

    geraCode();
}