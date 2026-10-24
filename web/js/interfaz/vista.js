const Vista = (() => {
  const COLUMNAS = [
    { etiqueta: "Base", campoForma: "base", campoFonetica: "foneticaBase" },
    { etiqueta: "Pasado", campoForma: "pasado", campoFonetica: "foneticaPasado" },
    { etiqueta: "Participio", campoForma: "participio", campoFonetica: "foneticaParticipio" },
  ];

  const ICONO_HABLANDO = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <circle cx="5" cy="5" r="4" fill="rgba(196,181,253,0.4)"/>
    <circle cx="5" cy="5" r="2" fill="#c4b5fd"/>
  </svg>`;

  const elementos = {
    selectorGrupos: document.getElementById("selectorGrupos"),
    listaVerbos: document.getElementById("listaVerbos"),
    botonComenzar: document.getElementById("botonComenzar"),
    botonDetener: document.getElementById("botonDetener"),
    barraProgreso: document.getElementById("barraProgreso"),
    estadoTexto: document.getElementById("estadoTexto"),
  };

  function crearElemento(etiqueta, clases = "", texto) {
    const elemento = document.createElement(etiqueta);
    if (clases) elemento.className = clases;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
  }

  function crearBotonSilencio(incluido, titulo, datos) {
    const boton = crearElemento("button", "loop-toggle-btn" + (incluido ? "" : " excluded"), incluido ? "🔊" : "🔇");
    boton.type = "button";
    boton.title = titulo;
    Object.assign(boton.dataset, datos);
    return boton;
  }

  function dibujarSelectorGrupos(estado) {
    const { selectorGrupos } = elementos;
    selectorGrupos.replaceChildren();

    const botonTodos = crearElemento("button", "group-btn select-all", estado.todosVisibles() ? "✕ Ninguno" : "✓ Todos");
    botonTodos.dataset.accion = "alternar-todos";
    selectorGrupos.appendChild(botonTodos);

    estado.grupos.forEach(grupo => {
      const boton = crearElemento("button", "group-btn" + (estado.grupoVisible(grupo.id) ? " active" : ""), grupo.nombre);
      boton.dataset.accion = "alternar-visibilidad";
      boton.dataset.idGrupo = grupo.id;
      selectorGrupos.appendChild(boton);
    });
  }

  function tituloBotonVerbo(grupoSilenciado, incluido) {
    if (grupoSilenciado) {
      return incluido
        ? "Reactivado a mano aunque su grupo esté apagado — click para volver a silenciarlo"
        : "Este grupo está apagado — click para reactivar SOLO este verbo";
    }
    return incluido
      ? "Incluido en el bucle — click para excluirlo"
      : "Excluido del bucle — click para incluirlo de nuevo";
  }

  function crearColumna(verbo, columna, estaHablando) {
    const contenedor = crearElemento("div", "verb-col" + (estaHablando ? " speaking" : ""));
    const icono = crearElemento("span", "speaking-icon");
    icono.innerHTML = ICONO_HABLANDO;
    contenedor.append(
      icono,
      crearElemento("div", "col-label", columna.etiqueta),
      crearElemento("div", "col-word", verbo[columna.campoForma]),
      crearElemento("div", "col-pron", verbo[columna.campoFonetica]),
    );
    return contenedor;
  }

  function crearTarjetaVerbo(estado, grupo, verbo, indiceVerbo, posicionActiva, columnaActiva) {
    const posicion = estado.obtenerPosicionVisible(grupo.id, indiceVerbo);
    const grupoSilenciado = estado.grupoSilenciado(grupo.id);
    const incluido = estado.verboIncluido(grupo.id, indiceVerbo);
    const esActiva = posicion === posicionActiva;
    const yaReproducida = posicionActiva >= 0 && posicion < posicionActiva;

    const tarjeta = crearElemento("div", "verb-card"
      + (incluido ? "" : " excluded")
      + (grupoSilenciado && incluido ? " reactivated" : "")
      + (esActiva ? " active" : yaReproducida ? " done" : ""));
    tarjeta.id = `tarjeta-${posicion}`;

    const filaEncabezado = crearElemento("div", "verb-es-row");
    filaEncabezado.append(
      crearElemento("div", "verb-es", verbo.espanol),
      crearBotonSilencio(incluido, tituloBotonVerbo(grupoSilenciado, incluido), {
        accion: "alternar-verbo", idGrupo: grupo.id, indiceVerbo: String(indiceVerbo),
      }),
    );

    const filaFormas = crearElemento("div", "verb-row");
    COLUMNAS.forEach((columna, indiceColumna) => {
      filaFormas.appendChild(crearColumna(verbo, columna, esActiva && columnaActiva === indiceColumna));
    });

    tarjeta.append(filaEncabezado, filaFormas);
    if (verbo.nota) tarjeta.appendChild(crearElemento("div", "verb-note", verbo.nota));
    return tarjeta;
  }

  function crearTituloGrupo(estado, grupo) {
    const silenciado = estado.grupoSilenciado(grupo.id);
    const titulo = crearElemento("div", "group-title" + (silenciado ? " excluded" : ""));
    titulo.append(
      crearElemento("span", "", grupo.nombre),
      crearBotonSilencio(!silenciado,
        silenciado ? "Grupo excluido del bucle — click para incluirlo de nuevo" : "Grupo incluido en el bucle — click para excluirlo",
        { accion: "alternar-silencio-grupo", idGrupo: grupo.id }),
    );
    return titulo;
  }

  function dibujarListaVerbos(estado, posicionActiva = -1, columnaActiva = -1) {
    const fragmento = document.createDocumentFragment();
    estado.grupos
      .filter(grupo => estado.grupoVisible(grupo.id))
      .forEach(grupo => {
        fragmento.appendChild(crearTituloGrupo(estado, grupo));
        grupo.verbos.forEach((verbo, indiceVerbo) => {
          fragmento.appendChild(crearTarjetaVerbo(estado, grupo, verbo, indiceVerbo, posicionActiva, columnaActiva));
        });
      });
    elementos.listaVerbos.replaceChildren(fragmento);
  }

  function enfocarTarjeta(posicion) {
    const tarjeta = document.getElementById(`tarjeta-${posicion}`);
    if (tarjeta) tarjeta.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function mostrarReproduciendo(estaReproduciendo) {
    elementos.botonComenzar.hidden = estaReproduciendo;
    elementos.botonDetener.hidden = !estaReproduciendo;
  }

  function mostrarEstado(texto, resaltado) {
    elementos.estadoTexto.textContent = texto;
    elementos.estadoTexto.className = "status" + (resaltado ? " active" : "");
  }

  function mostrarProgreso(porcentaje) {
    elementos.barraProgreso.style.width = `${porcentaje}%`;
  }

  return {
    dibujarSelectorGrupos,
    dibujarListaVerbos,
    enfocarTarjeta,
    mostrarReproduciendo,
    mostrarEstado,
    mostrarProgreso,
  };
})();
