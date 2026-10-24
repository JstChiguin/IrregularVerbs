function crearEstadoSeleccion(grupos) {
  let gruposVisibles = new Set([grupos[0].id]);
  const gruposSilenciados = new Set();
  // Un verbo se recuerda en uno de dos Sets según el estado de su grupo,
  // así cambiar el grupo completo no borra los ajustes puntuales.
  const verbosSilenciados = new Set();
  const verbosReactivados = new Set();

  const claveVerbo = (idGrupo, indiceVerbo) => `${idGrupo}:${indiceVerbo}`;

  function grupoVisible(idGrupo) {
    return gruposVisibles.has(idGrupo);
  }

  function grupoSilenciado(idGrupo) {
    return gruposSilenciados.has(idGrupo);
  }

  function verboIncluido(idGrupo, indiceVerbo) {
    const clave = claveVerbo(idGrupo, indiceVerbo);
    return grupoSilenciado(idGrupo)
      ? verbosReactivados.has(clave)
      : !verbosSilenciados.has(clave);
  }

  function alternarEnConjunto(conjunto, valor) {
    if (conjunto.has(valor)) conjunto.delete(valor);
    else conjunto.add(valor);
  }

  function alternarVerbo(idGrupo, indiceVerbo) {
    const conjunto = grupoSilenciado(idGrupo) ? verbosReactivados : verbosSilenciados;
    alternarEnConjunto(conjunto, claveVerbo(idGrupo, indiceVerbo));
  }

  function alternarSilencioGrupo(idGrupo) {
    alternarEnConjunto(gruposSilenciados, idGrupo);
  }

  function alternarVisibilidadGrupo(idGrupo) {
    if (gruposVisibles.has(idGrupo)) {
      if (gruposVisibles.size > 1) gruposVisibles.delete(idGrupo);
    } else {
      gruposVisibles.add(idGrupo);
    }
  }

  function todosVisibles() {
    return gruposVisibles.size === grupos.length;
  }

  function alternarTodosVisibles() {
    gruposVisibles = todosVisibles()
      ? new Set([grupos[0].id])
      : new Set(grupos.map(grupo => grupo.id));
  }

  function obtenerVerbosAReproducir() {
    return grupos
      .filter(grupo => grupoVisible(grupo.id))
      .flatMap(grupo => grupo.verbos
        .map((verbo, indice) => ({ ...verbo, idGrupo: grupo.id, indiceVerbo: indice }))
        .filter(verbo => verboIncluido(verbo.idGrupo, verbo.indiceVerbo)));
  }

  // Posición del verbo en la lista visible completa; sirve para ubicar su tarjeta.
  function obtenerPosicionVisible(idGrupo, indiceVerbo) {
    let acumulado = 0;
    for (const grupo of grupos) {
      if (!grupoVisible(grupo.id)) continue;
      if (grupo.id === idGrupo) return acumulado + indiceVerbo;
      acumulado += grupo.verbos.length;
    }
    return -1;
  }

  return {
    grupos,
    grupoVisible,
    grupoSilenciado,
    verboIncluido,
    alternarVerbo,
    alternarSilencioGrupo,
    alternarVisibilidadGrupo,
    todosVisibles,
    alternarTodosVisibles,
    obtenerVerbosAReproducir,
    obtenerPosicionVisible,
  };
}

if (typeof module !== "undefined") module.exports = { crearEstadoSeleccion };
