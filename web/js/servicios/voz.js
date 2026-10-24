// En navegadores usa Web Speech API. Dentro del APK la WebView de Android
// no trae síntesis de voz, así que se usa el puente nativo "AndroidVoz".
const ServicioVoz = (() => {
  const ESPERA_MAXIMA_MOTOR_MS = 3000;
  const locucionesPendientes = new Map();
  let contadorLocuciones = 0;

  function textoParaVoz(forma) {
    // La barra no genera pausa en el motor de voz ("Was / Were" sonaría pegado).
    return forma.replace(/\s*\/\s*/g, ", ") + ".";
  }

  const puenteAndroid = () => (typeof window !== "undefined" ? window.AndroidVoz : undefined);

  function esperar(milisegundos) {
    return new Promise(resolver => setTimeout(resolver, milisegundos));
  }

  async function esperarMotorAndroid(puente) {
    const intervaloMs = 100;
    for (let transcurrido = 0; transcurrido < ESPERA_MAXIMA_MOTOR_MS; transcurrido += intervaloMs) {
      if (puente.estaDisponible()) return true;
      await esperar(intervaloMs);
    }
    return false;
  }

  async function hablarConAndroid(puente, texto, velocidad) {
    const motorListo = await esperarMotorAndroid(puente);
    if (!motorListo) {
      RegistroErrores.registrar("ServicioVoz", "hablarConAndroid", new Error("Motor de voz de Android no disponible"));
      return;
    }
    return new Promise(resolver => {
      const idLocucion = `locucion-${++contadorLocuciones}`;
      locucionesPendientes.set(idLocucion, resolver);
      puente.hablar(texto, velocidad, idLocucion);
    });
  }

  function hablarConNavegador(texto, velocidad) {
    return new Promise(resolver => {
      if (!window.speechSynthesis) { resolver(); return; }
      window.speechSynthesis.cancel();
      const locucion = new SpeechSynthesisUtterance(texto);
      locucion.lang = "en-US";
      locucion.rate = velocidad;
      locucion.onend = resolver;
      locucion.onerror = evento => {
        if (evento.error !== "canceled" && evento.error !== "interrupted") {
          RegistroErrores.registrar("ServicioVoz", "hablarConNavegador", new Error(evento.error));
        }
        resolver();
      };
      window.speechSynthesis.speak(locucion);
    });
  }

  function hablar(texto, velocidad = 0.85) {
    const puente = puenteAndroid();
    return puente ? hablarConAndroid(puente, texto, velocidad) : hablarConNavegador(texto, velocidad);
  }

  function notificarFin(idLocucion) {
    const resolver = locucionesPendientes.get(idLocucion);
    if (!resolver) return;
    locucionesPendientes.delete(idLocucion);
    resolver();
  }

  function detener() {
    const puente = puenteAndroid();
    if (puente) puente.detener();
    else if (window.speechSynthesis) window.speechSynthesis.cancel();
    locucionesPendientes.forEach(resolver => resolver());
    locucionesPendientes.clear();
  }

  return { hablar, detener, notificarFin, textoParaVoz };
})();

if (typeof module !== "undefined") module.exports = { ServicioVoz };
