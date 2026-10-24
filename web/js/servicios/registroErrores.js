const RegistroErrores = (() => {
  const MAXIMO_REGISTROS = 50;
  const registros = [];

  function registrar(componente, funcion, error) {
    const registro = {
      fechaHora: new Date().toISOString(),
      componente,
      funcion,
      tipoExcepcion: error?.name ?? "Error",
      mensaje: error?.message ?? String(error),
    };
    registros.push(registro);
    if (registros.length > MAXIMO_REGISTROS) registros.shift();
    console.error("[VerbosIrregulares]", registro);
  }

  function obtenerRegistros() {
    return [...registros];
  }

  return { registrar, obtenerRegistros };
})();

if (typeof module !== "undefined") module.exports = { RegistroErrores };
