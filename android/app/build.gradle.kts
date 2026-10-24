plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "cl.chiguin.verbosirregulares"
    compileSdk = 35

    defaultConfig {
        applicationId = "cl.chiguin.verbosirregulares"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    // La app web vive en /web y se empaqueta tal cual, sin copias duplicadas.
    sourceSets {
        getByName("main") {
            assets.srcDirs("../../web")
        }
    }
}
