// 🔍 Primero saco el signo de la URL (?sign=leo)
let params = new URLSearchParams(window.location.search)
let signo = params.get("sign") // puede venir en minúscula

// 🧼 Esta API necesita la primera letra en mayúscula (ej: Leo)
signo = signo.charAt(0).toUpperCase() + signo.slice(1).toLowerCase()

// 🧾 Selecciono el elemento donde mostraré el resultado
let resultado = document.getElementById("resultado")

// ⏳ Le aviso al usuario que estoy buscando la info
resultado.innerText = "Cargando horóscopo para " + signo + "... 🔮"

// 🌐 Armo la URL de la API con el signo y el día (HOY)
let url = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${signo}&day=TODAY`

// 🚀 Hago la petición a la API
fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log("✅ Respuesta completa:", data) // para debug

    // ✅ Verifico que exista la data antes de usarla
    if (data && data.data && data.data.horoscope_data) {
      resultado.innerText = `🌟 ${data.data.horoscope_data}
📅 Fecha: ${data.data.date}`

      // 🎉 Animación simple
      resultado.animate([
        { opacity: 0, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" }
      ], {
        duration: 600,
        fill: "forwards",
        easing: "ease-out"
      })

    } else {
      // 😬 Si responde raro, aviso
      resultado.innerText = "Ups... no se encontró el horóscopo para " + signo
    }
  })
  .catch(error => {
    // 😢 Si algo sale mal con la conexión o el fetch
    console.error("❌ Error al cargar el horóscopo:", error)
    resultado.innerText = "Error al cargar el horóscopo 😥"
  })
