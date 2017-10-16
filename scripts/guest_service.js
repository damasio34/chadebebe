var updateGuestTable = function (snapshot) {
    var table = document.querySelector("#tblGuests");

    var val = snapshot.val();
    var key = snapshot.key;
    var tr = document.createElement('tr');
    var tdIndex = document.createElement('td');
    var tdItem = document.createElement('td');    

    // GAMBBBBB!!!!!!!!!!!!!
    if(!val || !val.name) return;

    tdIndex.innerText = x++;
    tdItem.innerText = val.name;    

    tr.setAttribute('class', (val.confirmed) ? 'success' : '');
    tr.setAttribute('id', key);

    tr.appendChild(tdIndex);
    tr.appendChild(tdItem);    

    if (!val.chooser) {
        var tdAction = document.createElement('td');
        tdAction.innerHTML = '<input type="button" class="btn btn-danger btn-sm" '+
            'value="Apagar" onclick="deleteInvite(\'' + key + '\')">';
        tr.appendChild(tdAction);
    };

    table.appendChild(tr);
};
    
let guestService = firebase_service("guests");
guestService.auth();
guestService.setEvents(guestService, "frmGuest", "txtAddGuest", updateGuestTable);
var x = 1;
guestService.getItems(updateGuestTable);