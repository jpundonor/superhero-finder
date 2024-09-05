$(document).ready(function () {
  $("#form-hero").on("submit", function (event) {
    event.preventDefault();
    const heroNumber = $("#hero-number").val();
    if (validateId(heroNumber)) {
      $("#hero-data").dataSuperHero(heroNumber);
    } else {
      alert("Por favor, ingresa un número válido.");
    }
  });
});

function validateId(id) {
  const regEx = /^[0-9]+$/;
  return regEx.test(id);
}
