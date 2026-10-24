const test = require("node:test");
const assert = require("node:assert/strict");
const { ServicioVoz } = require("../web/js/servicios/voz.js");

test("las formas dobles se leen con pausa en vez de quedar pegadas", () => {
  assert.equal(ServicioVoz.textoParaVoz("Was / Were"), "Was, Were.");
  assert.equal(ServicioVoz.textoParaVoz("Got/Gotten"), "Got, Gotten.");
});

test("una forma simple solo recibe el punto final", () => {
  assert.equal(ServicioVoz.textoParaVoz("Went"), "Went.");
});
