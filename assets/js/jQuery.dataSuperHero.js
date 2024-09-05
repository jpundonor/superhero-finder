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
  $("#hero-name").text(`Nombre: ${data.name}`);
  $("#hero-connections").text(
    `Conexiones: ${data.connections["group-affiliation"]}`
  );
  $("#hero-publisher").text(`Publicado por: ${data.biography.publisher}`);
  $("#hero-occupation").text(`Ocupación: ${data.work.occupation}`);
  $("#hero-first-appearance").text(
    `Primera aparición: ${data.biography["first-appearance"]}`
  );
  $("#hero-height").text(`Altura: ${data.appearance.height}`);
  $("#hero-weight").text(`Peso: ${data.appearance.weight}`);
  $("#hero-aliases").text(`Alias: ${data.biography.aliases}`);
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
