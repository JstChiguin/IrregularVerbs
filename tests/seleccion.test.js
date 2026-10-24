const test = require("node:test");
const assert = require("node:assert/strict");
const { crearEstadoSeleccion } = require("../web/js/estado/seleccion.js");
const { GRUPOS_VERBOS } = require("../web/js/datos/verbos.js");

const gruposPrueba = [
  { id: "a", nombre: "A", verbos: [{ base: "Go" }, { base: "See" }, { base: "Do" }] },
  { id: "b", nombre: "B", verbos: [{ base: "Cut" }, { base: "Put" }] },
];

const basesDe = verbos => verbos.map(verbo => verbo.base);

test("por defecto solo el primer grupo está visible y todo incluido", () => {
  const estado = crearEstadoSeleccion(gruposPrueba);
  assert.deepEqual(basesDe(estado.obtenerVerbosAReproducir()), ["Go", "See", "Do"]);
});

test("siempre queda al menos un grupo visible", () => {
  const estado = crearEstadoSeleccion(gruposPrueba);
  estado.alternarVisibilidadGrupo("a");
  assert.equal(estado.grupoVisible("a"), true);
});

test("Todos / Ninguno alterna entre todos los grupos y solo el primero", () => {
  const estado = crearEstadoSeleccion(gruposPrueba);
  estado.alternarTodosVisibles();
  assert.equal(estado.todosVisibles(), true);
  assert.equal(estado.obtenerVerbosAReproducir().length, 5);
  estado.alternarTodosVisibles();
  assert.deepEqual(basesDe(estado.obtenerVerbosAReproducir()), ["Go", "See", "Do"]);
});

test("silenciar un verbo lo saca de la reproducción", () => {
  const estado = crearEstadoSeleccion(gruposPrueba);
  estado.alternarVerbo("a", 1);
  assert.deepEqual(basesDe(estado.obtenerVerbosAReproducir()), ["Go", "Do"]);
});

test("en un grupo silenciado se puede reactivar un verbo suelto", () => {
  const estado = crearEstadoSeleccion(gruposPrueba);
  estado.alternarSilencioGrupo("a");
  assert.deepEqual(estado.obtenerVerbosAReproducir(), []);
  estado.alternarVerbo("a", 2);
  assert.deepEqual(basesDe(estado.obtenerVerbosAReproducir()), ["Do"]);
});

test("los ajustes por verbo se conservan al prender y apagar el grupo", () => {
  const estado = crearEstadoSeleccion(gruposPrueba);
  estado.alternarVerbo("a", 0);
  estado.alternarSilencioGrupo("a");
  estado.alternarVerbo("a", 2);
  estado.alternarSilencioGrupo("a");
  assert.deepEqual(basesDe(estado.obtenerVerbosAReproducir()), ["See", "Do"]);
  estado.alternarSilencioGrupo("a");
  assert.deepEqual(basesDe(estado.obtenerVerbosAReproducir()), ["Do"]);
});

test("la posición visible considera solo los grupos visibles", () => {
  const estado = crearEstadoSeleccion(gruposPrueba);
  assert.equal(estado.obtenerPosicionVisible("b", 0), -1);
  estado.alternarVisibilidadGrupo("b");
  assert.equal(estado.obtenerPosicionVisible("b", 1), 4);
});

test("todos los verbos de los datos tienen sus tres formas y fonética", () => {
  const campos = ["espanol", "base", "foneticaBase", "pasado", "foneticaPasado", "participio", "foneticaParticipio"];
  for (const grupo of GRUPOS_VERBOS) {
    for (const verbo of grupo.verbos) {
      for (const campo of campos) {
        assert.ok(verbo[campo], `${grupo.id}/${verbo.base ?? "?"} sin ${campo}`);
      }
    }
  }
});
