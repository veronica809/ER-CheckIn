document.getElementById("test").textContent = "hello world";

const patientListData = fetch("/api/patientList");
console.log(patientListData);

$(document).ready(function () {
  $(".patientClick").click((event) => patientClickFunction(event));
});

function patientClickFunction(event) {
  var id = event.currentTarget.id;
  window.location.replace("/patientqueue/" + id);
}
