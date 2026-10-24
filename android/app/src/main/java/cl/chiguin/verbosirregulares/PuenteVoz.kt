package cl.chiguin.verbosirregulares

import android.content.Context
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebView
import org.json.JSONObject
import java.util.Locale

/**
 * La WebView de Android no implementa speechSynthesis, así que la web
 * delega la voz en el TextToSpeech nativo a través de este puente.
 */
class PuenteVoz(contexto: Context, private val vistaWeb: WebView) : TextToSpeech.OnInitListener {

    private val motorVoz = TextToSpeech(contexto.applicationContext, this)

    @Volatile
    private var motorListo = false

    override fun onInit(estado: Int) {
        if (estado != TextToSpeech.SUCCESS) {
            Log.e(ETIQUETA_LOG, "No se pudo iniciar TextToSpeech (código $estado)")
            return
        }
        val resultadoIdioma = motorVoz.setLanguage(Locale.US)
        if (resultadoIdioma == TextToSpeech.LANG_MISSING_DATA || resultadoIdioma == TextToSpeech.LANG_NOT_SUPPORTED) {
            Log.e(ETIQUETA_LOG, "El motor de voz no tiene inglés (EE. UU.) instalado")
            return
        }
        motorVoz.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
            override fun onStart(idLocucion: String) = Unit
            override fun onDone(idLocucion: String) = notificarFin(idLocucion)

            @Deprecated("Requerido por versiones antiguas de la API")
            override fun onError(idLocucion: String) = notificarFin(idLocucion)

            override fun onError(idLocucion: String, codigoError: Int) {
                Log.e(ETIQUETA_LOG, "Error de TextToSpeech (código $codigoError)")
                notificarFin(idLocucion)
            }

            override fun onStop(idLocucion: String, interrumpida: Boolean) = notificarFin(idLocucion)
        })
        motorListo = true
    }

    @JavascriptInterface
    fun estaDisponible(): Boolean = motorListo

    @JavascriptInterface
    fun hablar(texto: String, velocidad: Float, idLocucion: String) {
        if (!motorListo) {
            notificarFin(idLocucion)
            return
        }
        motorVoz.setSpeechRate(velocidad)
        val resultado = motorVoz.speak(texto, TextToSpeech.QUEUE_FLUSH, null, idLocucion)
        if (resultado == TextToSpeech.ERROR) {
            Log.e(ETIQUETA_LOG, "TextToSpeech rechazó la locución")
            notificarFin(idLocucion)
        }
    }

    @JavascriptInterface
    fun detener() {
        if (motorListo) motorVoz.stop()
    }

    fun liberar() {
        motorListo = false
        motorVoz.stop()
        motorVoz.shutdown()
    }

    private fun notificarFin(idLocucion: String) {
        val idSeguro = JSONObject.quote(idLocucion)
        vistaWeb.post {
            vistaWeb.evaluateJavascript("window.ServicioVoz && ServicioVoz.notificarFin($idSeguro)", null)
        }
    }

    companion object {
        const val NOMBRE_EN_JAVASCRIPT = "AndroidVoz"
        private const val ETIQUETA_LOG = "VerbosIrregulares"
    }
}
