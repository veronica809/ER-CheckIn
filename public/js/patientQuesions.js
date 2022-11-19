var covid = false;
var tuberculosis = false;
var chestpain = false;
var influenza = false;
var shortbreath = false;

var options = {
  yearRange: 60,
};

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".datepicker");
  var instances = M.Datepicker.init(elems, options);
});
$(document).ready(function () {
  $(".patientquestionsubmit").click((event) => handleSubmit(event));
  $(".checkboxClass").click((event) => checkboxFunction(event));
});

function handleSubmit(event) {
  event.preventDefault();

  var patientAnswers = {
    firstname: $("#first_name").val().trim(),
    lastname: $("#last_name").val().trim(),
    dob: $("#date-of-birth").val().trim(),
    symptoms: $("#symptoms").val().trim(),
    symptomsstartdate: $("#date-of-symptoms").val().trim(),
    covidexposed: covid,
    influenzaexposed: influenza,
    tuberculosisexposed: tuberculosis,
    shortbreath: shortbreath,
    chestpain: chestpain,
  };
  console.log(patientAnswers);

  axios
    .post("/api/patientlist", patientAnswers)
    .then((res) => {
      window.location.replace("/newpatient/");
    })
    .catch((err) => console.log(err));
}

function checkboxFunction(event) {
  console.log(event.target.id);
  if (event.target.id === "covid") {
    covid = event.target.checked;
    if (covid === "false") {
      covid = false;
    } else {
      covid = true;
    }
  } else if (event.target.id === "tuberculosis") {
    tuberculosis = event.target.checked;
    if (tuberculosis === "false") {
      tuberculosis = false;
    } else {
      tuberculosis = true;
    }
  } else if (event.target.id === "chestpain") {
    chestpain = event.target.checked;
    if (chestpain === "false") {
      chestpain = false;
    } else {
      chestpain = true;
    }
  } else if (event.target.id === "influenza") {
    influenza = event.target.checked;
    if (influenza === "false") {
      influenza = false;
    } else {
      influenza = true;
    }
  } else if (event.target.id === "breath") {
    shortbreath = event.target.checked;
    if (breath === "false") {
      breath = false;
    } else {
      breath = true;
    }
  }
}
