(() => {
  const estado = crearEstadoSeleccion(GRUPOS_VERBOS);
  const deslizadorPausa = document.getElementById("deslizadorPausa");
  const valorPausa = document.getElementById("valorPausa");
  const interruptorBucle = document.getElementById("interruptorBucle");

  const reproductor = crearReproductor({
    estado,
    voz: ServicioVoz,
    pantalla: ServicioPantallaActiva,
    vista: Vista,
    obtenerPausaMs: () => parseFloat(deslizadorPausa.value) * 1000,
    bucleActivo: () => interruptorBucle.checked,
  });

  function redibujar() {
    Vista.dibujarSelectorGrupos(estado);
    Vista.dibujarListaVerbos(estado);
  }

  document.getElementById("selectorGrupos").addEventListener("click", evento => {
    const boton = evento.target.closest("button[data-accion]");
    if (!boton) return;
    if (boton.dataset.accion === "alternar-todos") estado.alternarTodosVisibles();
    else estado.alternarVisibilidadGrupo(boton.dataset.idGrupo);
    redibujar();
  });

  document.getElementById("listaVerbos").addEventListener("click", evento => {
    const boton = evento.target.closest("button[data-accion]");
    if (!boton) return;
    const { accion, idGrupo, indiceVerbo } = boton.dataset;
    if (accion === "alternar-silencio-grupo") estado.alternarSilencioGrupo(idGrupo);
    else if (accion === "alternar-verbo") estado.alternarVerbo(idGrupo, Number(indiceVerbo));
    Vista.dibujarListaVerbos(estado);
  });

  deslizadorPausa.addEventListener("input", () => {
    valorPausa.textContent = `${deslizadorPausa.value}s`;
  });

  document.getElementById("botonComenzar").addEventListener("click", () => reproductor.comenzar());
  document.getElementById("botonDetener").addEventListener("click", () => reproductor.detener());

  // Lo usa el APK para cortar la voz cuando la app pasa a segundo plano.
  window.detenerReproduccion = () => reproductor.detener();

  redibujar();
})();
