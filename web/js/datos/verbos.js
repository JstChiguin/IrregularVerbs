const GRUPOS_VERBOS = [
  {
    id: "top", nombre: "Los más importantes",
    verbos: [
      { espanol: "Ser / Estar", base: "Be", foneticaBase: "bii", pasado: "Was / Were", foneticaPasado: "uos / uer", participio: "Been", foneticaParticipio: "bin",
        nota: "💡 \"Was\" se usa con I / he / she / it. \"Were\" se usa con you / we / they." },
      { espanol: "Tener", base: "Have", foneticaBase: "jav", pasado: "Had", foneticaPasado: "jad", participio: "Had", foneticaParticipio: "jad" },
      { espanol: "Hacer", base: "Do", foneticaBase: "du", pasado: "Did", foneticaPasado: "did", participio: "Done", foneticaParticipio: "don" },
      { espanol: "Ir", base: "Go", foneticaBase: "gou", pasado: "Went", foneticaPasado: "uent", participio: "Gone", foneticaParticipio: "gon" },
      { espanol: "Venir", base: "Come", foneticaBase: "cam", pasado: "Came", foneticaPasado: "keim", participio: "Come", foneticaParticipio: "cam" },
      { espanol: "Obtener", base: "Get", foneticaBase: "get", pasado: "Got", foneticaPasado: "got", participio: "Got/Gotten", foneticaParticipio: "got/gaten",
        nota: "💡 \"Got\" se usa en inglés británico. \"Gotten\" se usa en inglés americano (las dos formas son correctas)." },
      { espanol: "Hacer/Fabricar", base: "Make", foneticaBase: "meik", pasado: "Made", foneticaPasado: "meid", participio: "Made", foneticaParticipio: "meid" },
      { espanol: "Tomar", base: "Take", foneticaBase: "teik", pasado: "Took", foneticaPasado: "tuk", participio: "Taken", foneticaParticipio: "teiken" },
      { espanol: "Ver", base: "See", foneticaBase: "sii", pasado: "Saw", foneticaPasado: "so", participio: "Seen", foneticaParticipio: "siin" },
      { espanol: "Saber/Conocer", base: "Know", foneticaBase: "nou", pasado: "Knew", foneticaPasado: "niu", participio: "Known", foneticaParticipio: "noun" },
    ]
  },
  {
    id: "g1", nombre: "Grupo 1: -ought/-aught",
    verbos: [
      { espanol: "Comprar", base: "Buy", foneticaBase: "bai", pasado: "Bought", foneticaPasado: "bot", participio: "Bought", foneticaParticipio: "bot" },
      { espanol: "Traer", base: "Bring", foneticaBase: "bring", pasado: "Brought", foneticaPasado: "brot", participio: "Brought", foneticaParticipio: "brot" },
      { espanol: "Pensar", base: "Think", foneticaBase: "zink", pasado: "Thought", foneticaPasado: "zot", participio: "Thought", foneticaParticipio: "zot" },
      { espanol: "Enseñar", base: "Teach", foneticaBase: "tich", pasado: "Taught", foneticaPasado: "tot", participio: "Taught", foneticaParticipio: "tot" },
      { espanol: "Atrapar", base: "Catch", foneticaBase: "cach", pasado: "Caught", foneticaPasado: "cot", participio: "Caught", foneticaParticipio: "cot" },
    ]
  },
  {
    id: "g2", nombre: "Grupo 2: -old",
    verbos: [
      { espanol: "Vender", base: "Sell", foneticaBase: "sel", pasado: "Sold", foneticaPasado: "sold", participio: "Sold", foneticaParticipio: "sold" },
      { espanol: "Decir/Contar", base: "Tell", foneticaBase: "tel", pasado: "Told", foneticaPasado: "told", participio: "Told", foneticaParticipio: "told" },
    ]
  },
  {
    id: "g3", nombre: "Grupo 3: -ent",
    verbos: [
      { espanol: "Enviar", base: "Send", foneticaBase: "send", pasado: "Sent", foneticaPasado: "sent", participio: "Sent", foneticaParticipio: "sent" },
      { espanol: "Gastar", base: "Spend", foneticaBase: "spend", pasado: "Spent", foneticaPasado: "spent", participio: "Spent", foneticaParticipio: "spent" },
      { espanol: "Prestar", base: "Lend", foneticaBase: "lend", pasado: "Lent", foneticaPasado: "lent", participio: "Lent", foneticaParticipio: "lent" },
    ]
  },
  {
    id: "g4", nombre: "Grupo 4: -ept",
    verbos: [
      { espanol: "Mantener", base: "Keep", foneticaBase: "kiip", pasado: "Kept", foneticaPasado: "kept", participio: "Kept", foneticaParticipio: "kept" },
      { espanol: "Dormir", base: "Sleep", foneticaBase: "sliip", pasado: "Slept", foneticaPasado: "slept", participio: "Slept", foneticaParticipio: "slept" },
    ]
  },
  {
    id: "g5", nombre: "Grupo 5: -elt",
    verbos: [
      { espanol: "Sentir", base: "Feel", foneticaBase: "fiil", pasado: "Felt", foneticaPasado: "felt", participio: "Felt", foneticaParticipio: "felt" },
      { espanol: "Oler", base: "Smell", foneticaBase: "smel", pasado: "Smelt", foneticaPasado: "smelt", participio: "Smelt", foneticaParticipio: "smelt" },
    ]
  },
  {
    id: "g6", nombre: "Grupo 6: i→a→u",
    verbos: [
      { espanol: "Cantar", base: "Sing", foneticaBase: "sing", pasado: "Sang", foneticaPasado: "sang", participio: "Sung", foneticaParticipio: "song" },
      { espanol: "Beber", base: "Drink", foneticaBase: "drink", pasado: "Drank", foneticaPasado: "drank", participio: "Drunk", foneticaParticipio: "dronk" },
      { espanol: "Nadar", base: "Swim", foneticaBase: "suim", pasado: "Swam", foneticaPasado: "suam", participio: "Swum", foneticaParticipio: "suom" },
      { espanol: "Sonar", base: "Ring", foneticaBase: "ring", pasado: "Rang", foneticaPasado: "rang", participio: "Rung", foneticaParticipio: "rong" },
      { espanol: "Comenzar", base: "Begin", foneticaBase: "biguin", pasado: "Began", foneticaPasado: "bigán", participio: "Begun", foneticaParticipio: "bigón" },
    ]
  },
  {
    id: "g7", nombre: "Grupo 7: i→o→en",
    verbos: [
      { espanol: "Escribir", base: "Write", foneticaBase: "rait", pasado: "Wrote", foneticaPasado: "rout", participio: "Written", foneticaParticipio: "riten" },
      { espanol: "Conducir", base: "Drive", foneticaBase: "draiv", pasado: "Drove", foneticaPasado: "drov", participio: "Driven", foneticaParticipio: "driven" },
      { espanol: "Montar", base: "Ride", foneticaBase: "raid", pasado: "Rode", foneticaPasado: "roud", participio: "Ridden", foneticaParticipio: "riden" },
      { espanol: "Hablar", base: "Speak", foneticaBase: "spiik", pasado: "Spoke", foneticaPasado: "spouk", participio: "Spoken", foneticaParticipio: "spouken" },
      { espanol: "Romper", base: "Break", foneticaBase: "breik", pasado: "Broke", foneticaPasado: "brouk", participio: "Broken", foneticaParticipio: "brouken" },
      { espanol: "Elegir", base: "Choose", foneticaBase: "chuus", pasado: "Chose", foneticaPasado: "chous", participio: "Chosen", foneticaParticipio: "chousen" },
      { espanol: "Robar", base: "Steal", foneticaBase: "stiil", pasado: "Stole", foneticaPasado: "stoul", participio: "Stolen", foneticaParticipio: "stoulen" },
    ]
  },
  {
    id: "g8", nombre: "Grupo 8: pasado = participio",
    verbos: [
      { espanol: "Decir", base: "Say", foneticaBase: "sei", pasado: "Said", foneticaPasado: "sed", participio: "Said", foneticaParticipio: "sed" },
      { espanol: "Pagar", base: "Pay", foneticaBase: "pei", pasado: "Paid", foneticaPasado: "peid", participio: "Paid", foneticaParticipio: "peid" },
      { espanol: "Escuchar", base: "Hear", foneticaBase: "jir", pasado: "Heard", foneticaPasado: "jerd", participio: "Heard", foneticaParticipio: "jerd" },
      { espanol: "Perder", base: "Lose", foneticaBase: "luus", pasado: "Lost", foneticaPasado: "lost", participio: "Lost", foneticaParticipio: "lost" },
      { espanol: "Encontrar", base: "Find", foneticaBase: "faind", pasado: "Found", foneticaPasado: "faund", participio: "Found", foneticaParticipio: "faund" },
    ]
  },
  {
    id: "g9", nombre: "Grupo 9: base = participio",
    verbos: [
      { espanol: "Venir", base: "Come", foneticaBase: "cam", pasado: "Came", foneticaPasado: "keim", participio: "Come", foneticaParticipio: "cam" },
      { espanol: "Convertirse", base: "Become", foneticaBase: "bicám", pasado: "Became", foneticaPasado: "bicéim", participio: "Become", foneticaParticipio: "bicám" },
      { espanol: "Correr", base: "Run", foneticaBase: "ran", pasado: "Ran", foneticaPasado: "ran", participio: "Run", foneticaParticipio: "ran" },
    ]
  },
  {
    id: "g10", nombre: "Grupo 10: los tres iguales",
    verbos: [
      { espanol: "Cortar", base: "Cut", foneticaBase: "cat", pasado: "Cut", foneticaPasado: "cat", participio: "Cut", foneticaParticipio: "cat" },
      { espanol: "Golpear", base: "Hit", foneticaBase: "jit", pasado: "Hit", foneticaPasado: "jit", participio: "Hit", foneticaParticipio: "jit" },
      { espanol: "Costar", base: "Cost", foneticaBase: "cost", pasado: "Cost", foneticaPasado: "cost", participio: "Cost", foneticaParticipio: "cost" },
      { espanol: "Poner", base: "Put", foneticaBase: "put", pasado: "Put", foneticaPasado: "put", participio: "Put", foneticaParticipio: "put" },
      { espanol: "Dejar", base: "Let", foneticaBase: "let", pasado: "Let", foneticaPasado: "let", participio: "Let", foneticaParticipio: "let" },
    ]
  },
];

if (typeof module !== "undefined") module.exports = { GRUPOS_VERBOS };
