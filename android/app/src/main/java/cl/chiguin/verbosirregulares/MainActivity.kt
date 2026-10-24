package cl.chiguin.verbosirregulares

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.WindowManager
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : Activity() {

    private lateinit var vistaWeb: WebView
    private lateinit var puenteVoz: PuenteVoz

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)

        vistaWeb = WebView(this)
        setContentView(vistaWeb)
        configurarVistaWeb()

        puenteVoz = PuenteVoz(this, vistaWeb)
        vistaWeb.addJavascriptInterface(puenteVoz, PuenteVoz.NOMBRE_EN_JAVASCRIPT)

        if (savedInstanceState == null) {
            vistaWeb.loadUrl(URL_APP)
        } else {
            vistaWeb.restoreState(savedInstanceState)
        }
    }

    private fun configurarVistaWeb() {
        vistaWeb.setBackgroundColor(getColor(R.color.fondo))
        vistaWeb.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = false
            allowContentAccess = false
        }
        vistaWeb.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(vista: WebView, solicitud: WebResourceRequest): Boolean {
                val direccion = solicitud.url
                if (direccion.toString().startsWith(PREFIJO_ASSETS)) return false
                abrirFuera(direccion)
                return true
            }
        }
    }

    private fun abrirFuera(direccion: Uri) {
        try {
            startActivity(Intent(Intent.ACTION_VIEW, direccion))
        } catch (error: Exception) {
            Log.e(ETIQUETA_LOG, "No se pudo abrir el enlace externo: ${error.javaClass.simpleName}", error)
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        vistaWeb.saveState(outState)
    }

    override fun onStop() {
        super.onStop()
        vistaWeb.evaluateJavascript("window.detenerReproduccion && detenerReproduccion()", null)
        puenteVoz.detener()
    }

    override fun onDestroy() {
        puenteVoz.liberar()
        vistaWeb.destroy()
        super.onDestroy()
    }

    private companion object {
        const val ETIQUETA_LOG = "VerbosIrregulares"
        const val PREFIJO_ASSETS = "file:///android_asset/"
        const val URL_APP = "${PREFIJO_ASSETS}index.html"
    }
}
