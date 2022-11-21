$(document).ready(function () {
  $(".delete-btn").click((event) => {
    deleteButton(event);
  });
});

function deleteButton(event) {
  var id = event.originalEvent.path[1].id;
  console.log(id);
  //DELETE USER
  axios
    .delete("/api/users/delete/" + id)
    .then((res) => {
      window.location.replace("/allusers");
    })
    .catch((err) => console.log(err));
}
