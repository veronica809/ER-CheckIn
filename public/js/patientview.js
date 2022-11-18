$(document).ready(function () {
  $(".backButton").click((event) => backButton());
  $(".nursenotesbtn").click((event) => nurseNotesEdit(event));
  $(".nursenotesNormalbtn").click((event) => nurseNotesNormal(event));

  console.log();
});

function backButton() {
  window.location.replace("/patientqueue/");
}

function nurseNotesEdit(event) {
  console.log("clicking notesEdit");
  console.log(event);
  var id = event.currentTarget.id;

  var dataTobeSent = {
    id: id,
    edit: false,
  };

  $.ajax("/api/patientList/nursenoteedit", {
    type: "POST",
    data: dataTobeSent,
  })
    .done(function (data) {
      //just log the received data for now
      // $("body").replaceWith(data);
      window.location.replace("/patientqueue/" + id);
    })
    .fail((err) => console.log(err));
}

function nurseNotesNormal(event) {
  console.log("pressing NotesNormal");
  console.log(event);
  var id = event.currentTarget.id;

  var dataTobeSent = {
    id: id,
    edit: true,
    newNurseNote: $("#new_nurse_note").val().trim(),
  };

  $.ajax("/api/patientList/nursenoteedit", {
    type: "POST",
    data: dataTobeSent,
  })
    .done(function (data) {
      //just log the received data for now
      // $("body").replaceWith(data);
      window.location.replace("/patientqueue/" + id);
    })
    .fail((err) => console.log(err));
}
