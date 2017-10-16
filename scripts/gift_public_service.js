var updateGuestTable = function (snapshot) {
    var table = document.querySelector("#tblGifts");

    var val = snapshot.val();
    var key = snapshot.key;
    var tr = document.createElement('tr');
    var tdIndex = document.createElement('td');
    var tdItem = document.createElement('td');

    // GAMBBBBB!!!!!!!!!!!!!
    if (!val || !val.name) return;

    tdIndex.innerText = x++;
    tdItem.innerText = val.name;

    tr.setAttribute('class', (val.confirmed) ? 'success' : '');
    tr.setAttribute('id', key);

    tr.appendChild(tdIndex);
    tr.appendChild(tdItem);

    if (!val.chooser) {
        var tdAction = document.createElement('td');
        tdAction.innerHTML = '<input type="button" class="button" ' +
            'value="Presentear" onclick="deleteInvite(\'' + key + '\')">';
        tr.appendChild(tdAction);
    };

    table.appendChild(tr);
};

var x = 1;
let gifttService = firebase_service("gifts");
firebase.database().ref('gifts').once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        updateGuestTable(childSnapshot);
    });
});