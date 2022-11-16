$(document).ready(function () {
  $(".backButton").click((event) => backButton());
});

function backButton() {
  window.location.replace("/patientqueue/");
}
