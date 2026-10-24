function crearReproductor({ estado, voz, pantalla, vista, obtenerPausaMs, bucleActivo }) {
  const FORMAS = ["base", "pasado", "participio"];
  // Cada reproducción recibe un número; si cambia, la vuelta anterior sabe que debe cortar.
  // Así "Detener" seguido de "Comenzar" rápido nunca deja dos voces en paralelo.
  let idReproduccionActual = 0;
  let estaReproduciendo = false;

  const esperar = milisegundos => new Promise(resolver => setTimeout(resolver, milisegundos));

  async function reproducirVuelta(verbos, idReproduccion) {
    const sigueVigente = () => idReproduccion === idReproduccionActual;
    const pausaMs = obtenerPausaMs();

    for (let indice = 0; indice < verbos.length; indice++) {
      if (!sigueVigente()) return false;
      const verbo = verbos[indice];
      const posicion = estado.obtenerPosicionVisible(verbo.idGrupo, verbo.indiceVerbo);

      vista.mostrarEstado(`▶ Verbo ${indice + 1} de ${verbos.length}: ${verbo.base}`, true);
      vista.mostrarProgreso(Math.round((indice / verbos.length) * 100));
      vista.dibujarListaVerbos(estado, posicion);
      vista.enfocarTarjeta(posicion);

      for (let columna = 0; columna < FORMAS.length; columna++) {
        if (!sigueVigente()) return false;
        vista.dibujarListaVerbos(estado, posicion, columna);
        await voz.hablar(voz.textoParaVoz(verbo[FORMAS[columna]]));
        if (!sigueVigente()) return false;
        await esperar(pausaMs);
      }
    }
    return sigueVigente();
  }

  async function comenzar() {
    if (estaReproduciendo) return;
    const idReproduccion = ++idReproduccionActual;
    estaReproduciendo = true;
    vista.mostrarReproduciendo(true);
    pantalla.solicitar();

    let terminoCompleta;
    // La lista se recalcula en cada vuelta para respetar cambios hechos mientras suena.
    do {
      const verbos = estado.obtenerVerbosAReproducir();
      if (verbos.length === 0) {
        vista.mostrarEstado("No hay verbos incluidos para reproducir.", false);
        terminoCompleta = false;
        break;
      }
      terminoCompleta = await reproducirVuelta(verbos, idReproduccion);
    } while (terminoCompleta && bucleActivo());

    if (idReproduccion !== idReproduccionActual) return;
    estaReproduciendo = false;
    pantalla.liberar();
    vista.mostrarReproduciendo(false);
    if (terminoCompleta) {
      vista.mostrarEstado("✓ ¡Completado!", true);
      vista.mostrarProgreso(100);
    }
    vista.dibujarListaVerbos(estado);
  }

  function detener() {
    if (!estaReproduciendo) return;
    idReproduccionActual++;
    estaReproduciendo = false;
    voz.detener();
    pantalla.liberar();
    vista.mostrarReproduciendo(false);
    vista.mostrarEstado("Detenido.", false);
    vista.dibujarListaVerbos(estado);
  }

  return { comenzar, detener };
}

if (typeof module !== "undefined") module.exports = { crearReproductor };
