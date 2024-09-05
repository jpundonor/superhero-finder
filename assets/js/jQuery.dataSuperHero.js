jQuery.fn.dataSuperHero = function (id) {
  $.ajax({
    url: `https://www.superheroapi.com/api.php/4905856019427443/${id}`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      displayHero(data);
      displayStats(data);
    },
    error: function () {
      alert("Error al consultar la API. Intente nuevamente.");
    },
  });
};

function displayHero(data) {
  $("#hero-image").attr("src", data.image.url).attr("alt", data.name);
  $("#hero-name").html(`Nombre: ${data.name}`);
  $("#hero-connections").html(`<b>Conexiones: </b>${data.connections["group-affiliation"]}`);
  $("#hero-publisher").html(`<em>Publicado por: </em>${data.biography.publisher}`);
  $("#hero-occupation").html(`<em>Ocupación: </em>${data.work.occupation}`);
  $("#hero-first-appearance").html(`<em>Primera aparición: </em>${data.biography["first-appearance"]}`);
  $("#hero-height").html(`<em>Altura: </em>${data.appearance.height}`);
  $("#hero-weight").html(`<em>Peso: </em>${data.appearance.weight}`);
  $("#hero-aliases").html(`<em>Alias: </em>${data.biography.aliases}`);
  $("#hero-container").removeClass("d-none");
}

function displayStats(data) {
  let options = {
    title: {
      text: `Estadísticas de poder para ${data.name}`,
    },
    data: [
      {
        type: "pie",
        startAngle: 45,
        showInLegend: "true",
        legendText: "{label}",
        indexLabel: "{label} ({y})",
        yValueFormatString: "#,##0.#" % "",
        dataPoints: [
          { label: "Inteligencia", y: data.powerstats.intelligence },
          { label: "Fuerza", y: data.powerstats.strength },
          { label: "Velocidad", y: data.powerstats.speed },
          { label: "Durabilidad", y: data.powerstats.durability },
          { label: "Poder", y: data.powerstats.power },
          { label: "Combate", y: data.powerstats.combat },
        ],
      },
    ],
  };
  $("#hero-stats").CanvasJSChart(options);
}
