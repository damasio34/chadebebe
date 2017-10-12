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
var itens = db.ref('listadepresentes');

itens.on('child_added', function (snapshot) {
    atualizarLista('#tb_presentes', snapshot);
});
itens.on('child_removed', function (snapshot) {
    deleteInvite(snapshot.key);
});

/*
 *
 *  Function createInvite
 * 
 */

function addPresente(nome) {
    var item = { nome: nome };
    console.log(item);
    var itemKey = itens.push().key;
    db.ref('listadepresentes/' + itemKey).set(item).then(function () {
        init();
    });
}

document.querySelector('#frmCadastro')
    .addEventListener('submit', function () {
        event.preventDefault();
        var nome = document.querySelector('#txtnome').value;        
        addPresente(nome);
    }, false);

/*
 *
 *  Function readInvite
 * 
 */

function atualizarLista(elem, value) {
    var val = value.val()
    var tr = document.createElement('tr');
    tr.setAttribute('id', value.key);
    tr.setAttribute('class', (val.confirmed) ? 'success' : '');
    var tdName = document.createElement('td');
    tdName.innerText = val.nome;
    var tdQuemTirou = document.createElement('td');
    tdQuemTirou.innerText = val.quemTirou;
    if (!val.confirmed) {
        var tdAction = document.createElement('td');
        tdAction.innerHTML = '<input type="button" class="btn btn-danger btn-sm" value="Apagar" onclick="deleteInvite(\'' + value.key + '\')">';
    }

    tr.appendChild(tdName);
    tr.appendChild(tdQuemTirou);    
    document.querySelector(elem).appendChild(tr);
}

/*
 *
 * Function Delete Invite 
 * 
 */

function deleteInvite(id) {
    itens.child(id).remove().then(
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

function init() {
    document.querySelector('#txtNome').value = '';
    
    geraCode();
  }