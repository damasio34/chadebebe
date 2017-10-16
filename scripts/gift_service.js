var updateGiftTable = function (snapshot) {
    var table = document.querySelector("#tblGifts");

    var val = snapshot.val();
    var key = snapshot.key;
    var tr = document.createElement('tr');
    var tdIndex = document.createElement('td');
    var tdItem = document.createElement('td');
    var tdChooser = document.createElement('td');

    // GAMBBBBB!!!!!!!!!!!!!
    if(!val || !val.name) return;

    tdIndex.innerText = x++;
    tdItem.innerText = val.name;
    tdChooser.innerText = val.chooser || '';

    tr.setAttribute('class', (val.chooser) ? 'success' : '');
    tr.setAttribute('id', key);

    tr.appendChild(tdIndex);
    tr.appendChild(tdItem);
    tr.appendChild(tdChooser);

    if (!val.chooser) {
        var tdAction = document.createElement('td');
        tdAction.innerHTML = '<input type="button" class="btn btn-danger btn-sm" '+
            'value="Apagar" onclick="deleteInvite(\'' + key + '\')">';
        tr.appendChild(tdAction);
    }

    table.appendChild(tr);
};

var x = 1;
let giftService = firebase_service("gifts");
giftService.auth();
giftService.setEvents(giftService, "frmGift", "txtAddGift", updateGiftTable);
giftService.getItems(updateGiftTable);