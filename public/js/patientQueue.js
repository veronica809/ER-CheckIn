$(document).ready(function () {
  $(".patientClick").click((event) => patientClickFunction(event));
});

function patientClickFunction(event) {
  var id = event.currentTarget.id;
  window.location.replace("/patientqueue/" + id);
}
