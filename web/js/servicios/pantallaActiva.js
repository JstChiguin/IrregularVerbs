// Evita que el celular apague la pantalla (y pause la voz) mientras se reproduce.
// Solo funciona en https y navegadores compatibles; si no, la app sigue igual.
const ServicioPantallaActiva = (() => {
  let bloqueoPantalla = null;
  let debeMantenerse = false;

  async function solicitar() {
    debeMantenerse = true;
    if (!("wakeLock" in navigator)) return;
    try {
      bloqueoPantalla = await navigator.wakeLock.request("screen");
      bloqueoPantalla.addEventListener("release", () => { bloqueoPantalla = null; });
    } catch (error) {
      bloqueoPantalla = null;
      if (error.name !== "NotAllowedError") {
        RegistroErrores.registrar("ServicioPantallaActiva", "solicitar", error);
      }
    }
  }

  async function liberar() {
    debeMantenerse = false;
    if (!bloqueoPantalla) return;
    try {
      await bloqueoPantalla.release();
    } catch (error) {
      RegistroErrores.registrar("ServicioPantallaActiva", "liberar", error);
    }
    bloqueoPantalla = null;
  }

  // El sistema suelta el bloqueo al ocultar la pestaña; se recupera al volver.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && debeMantenerse) solicitar();
  });

  return { solicitar, liberar };
})();
