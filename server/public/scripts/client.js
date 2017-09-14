console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // load existing koalas on page load
  getKoalas();
  $('#addButton').on('click', addKoala);
  $('#viewKoalas').on('click', '.deleteButton', removeKoala);
  $('#viewKoalas').on('click', '.readyForTransferButton', transferKoala);
}); // end doc ready

function addKoala () {
    // add koala button click
      console.log('in addButton on click');
      var name = $('#nameIn').val();
      var age = $('#ageIn').val();
      var gender = $('#genderIn').val();
      var readyForTransfer = $('#readyForTransferIn').val();
      var notes = $('#notesIn').val();
      // get user input and put in an object
      // NOT WORKING YET :(
      // using a test object
      var objectToSend = {
        name: name,
        age: age,
        gender: gender,
        readyForTransfer: readyForTransfer,
        notes: notes
      };
      // call saveKoala with the new obejct
      saveKoala(objectToSend);
      // Below not working -- will deal with this later
      $('#nameIn').val("");
      $('#ageIn').val("");
      $('#genderIn').val("");
      $('#readyForTransferIn').val("");
      $('#notesIn').val(""); 
} //end addButton on click

function getKoalas() {
  // console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function (data) {
      // console.log('got some koalas: ', data);
      appendKoala(data);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala(newKoala) {
  // console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function (data) {
      // console.log('got some koalas: ', data);
      getKoalas();
    } // end success
  }); //end ajax
}

function appendKoala(koalaList) {
  // console.log('appendKoala successfully called!'); <-- this works
  // console.log('Logging received koalas from appendKoala -> ', koalaList);
$("#viewKoalas").empty();
  for (var i = 0; i < koalaList.length; i++) {
    var name = koalaList[i].name;
    var age = koalaList[i].age;
    var gender = koalaList[i].gender;
    var readyForTransfer = koalaList[i].ready_for_transfer;
    var notes = koalaList[i].notes;
    var id = koalaList[i].id;
    $("#viewKoalas").append('<tr data-id="' +  id
    + '"><td>' + name 
    + '</td><td>' + age 
    + '</td><td>' + gender 
    + '</td><td>' + readyForTransfer 
    + '</td><td>' + notes 
    + '</td><td><button type="button" class="readyForTransferButton btn btn-success">Ready for Transfer</button></td><td><button class="deleteButton btn btn-danger">Delete</button></td></tr>');
  }
}// end appendKoala()

function transferKoala() {
  var koalaToTransfer = $(this).closest('tr').data();
  console.log('logging koalaToTransfer inside client.js transferKoala() ->', koalaToTransfer.id);
  $.ajax({
    url: '/koalas/update/' + koalaToTransfer.id,
    type: 'POST',
    id: koalaToTransfer.id,
    success: function (data) {
      console.log('updated koala! ->', koalaToTransfer);
      getKoalas();
    } // end success
  }); //end ajax
}

function removeKoala() {
  var koalaToDelete = $(this).closest('tr').data();
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: koalaToDelete,
    success: function (data) {
      console.log('deleted koala! ->', koalaToDelete);
      
      getKoalas();
    } // end success
  }); //end ajax
} // end removeKoala()