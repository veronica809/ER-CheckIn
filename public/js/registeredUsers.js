$(document).ready(function () {
  $(".delete-btn").click((event) => {
    deleteButton(event);
  });
});

function deleteButton(event) {
  var id = event.originalEvent.path[1].id;
  console.log(id);

  var data = {
    id: id,
  };

  axios
    .delete("/api/users/delete", data)
    .then((res) => {
      window.location.replace("/newpatient/");
    })
    .catch((err) => console.log(err));
}

//ok, what needs to happen now is the following:
// 1. we need to identify what user you are trying to delete
// 2. once identified, we need to send that to the backend
// 3. once it reaches a /api route in the backend meant for a delete
// 4. you need to delete only that user
