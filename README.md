# Verbos Irregulares 🎧

App para practicar los verbos irregulares del inglés **escuchándolos**: lee en voz alta la forma base, el pasado y el participio de cada verbo, con una pausa configurable para repetir en voz alta.

Funciona en el navegador y como **APK para Android** (pensado también para radios de auto Android).

## Funcionalidades

- 49 verbos agrupados por patrón (`-ought`, `-ept`, `i→a→u`, los tres iguales, etc.)
- Lectura en voz alta de base → pasado → participio, con pronunciación aproximada en pantalla
- Pausa ajustable entre formas (1 a 5 segundos)
- Modo bucle
- Silenciar grupos completos o verbos sueltos, y reactivar verbos dentro de un grupo silenciado
- Notas de uso en verbos con dos formas (*was/were*, *got/gotten*)

## Tecnologías

| Parte | Tecnología |
|---|---|
| App | HTML, CSS y JavaScript sin frameworks ni dependencias |
| Voz en navegador | Web Speech API |
| APK | Kotlin + WebView + `TextToSpeech` nativo de Android |
| Pruebas | `node:test` (incluido en Node.js) |
| Compilación del APK | GitHub Actions (gratis) |

## Estructura

```
web/                    App (se usa tal cual en el navegador y dentro del APK)
├── index.html
├── css/estilos.css
└── js/
    ├── datos/verbos.js           Lista de grupos y verbos
    ├── estado/seleccion.js       Qué grupos y verbos se ven y cuáles suenan
    ├── servicios/voz.js          Voz: Web Speech API o puente nativo de Android
    ├── servicios/pantallaActiva.js
    ├── servicios/registroErrores.js
    ├── interfaz/vista.js         Dibujo de la interfaz
    ├── reproductor.js            Recorrido y bucle de reproducción
    └── app.js                    Conecta todo y registra eventos
android/                Proyecto Android que empaqueta /web como assets
tests/                  Pruebas de la lógica
.github/workflows/      Compilación automática del APK
```

## Uso en el navegador

Abre `web/index.html`. No necesita servidor ni instalación.

## Obtener el APK

1. Sube el repositorio a GitHub.
2. En la pestaña **Actions**, el flujo **Compilar APK** se ejecuta solo con cada push a `main` (o a mano con *Run workflow*).
3. Al terminar, descarga el artefacto **verbos-irregulares-apk** (viene en un `.zip` con `app-debug.apk` adentro).
4. Copia el APK a la radio o al celular (pendrive o descarga) e instálalo permitiendo *orígenes desconocidos*.

> El APK es de tipo *debug*. Cada compilación en GitHub usa una firma distinta, así que para actualizar hay que desinstalar la versión anterior.

### Voz en Android

La app usa el motor de voz del sistema. Si no habla, revisa en **Ajustes → Idiomas → Salida de texto a voz** que haya un motor instalado (por ejemplo *Speech Services by Google*) con el inglés descargado.

## Desarrollo

```bash
npm test                          # pruebas de la lógica
cd android && gradle assembleDebug  # compilar localmente (requiere Android SDK)
```

## Autoría

Proyecto personal de **Chiguin** · by Chiguin
