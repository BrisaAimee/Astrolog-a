// 🪐 Primero obtengo el signo desde la URL (por ejemplo: ?sign=leo)
let params = new URLSearchParams(window.location.search)
let signo = params.get("sign") // puede venir como "leo"

// 🎯 Selecciono el contenedor donde voy a poner el resultado
let resultado = document.getElementById("resultado")

// 🕐 Aviso que está cargando (por si tarda un poco)
resultado.innerText = "Cargando horóscopo para " + signo + "... 🔮"

let urlBase = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${signo}&day=TODAY`
let url = `https://api.allorigins.win/raw?url=${encodeURIComponent(urlBase)}`

// 🌐 Hago la llamada a la API (GET, no POST)
fetch(url)
  .then(res => res.json())
  .then(data => {
    // ✅ Respuesta de la API: viene en data.data.horoscope_data
    console.log("✅ Respuesta de la API:", data)

    // 📝 Muestro el horóscopo en el HTML
    resultado.innerText = `🌟 ${data.data.horoscope_data}
📅 Fecha: ${data.data.date}`

    // ✨ Agrego una animación suave (opcional)
    resultado.animate([
      { opacity: 0, transform: "translateY(10px)" },
      { opacity: 1, transform: "translateY(0)" }
    ], {
      duration: 600,
      fill: "forwards",
      easing: "ease-out"
    })
  })
  .catch(error => {
    // 🧯 Si algo falla (no hay conexión o error), muestro un mensaje
    console.error("❌ Error al cargar el horóscopo:", error)
    resultado.innerText = "Error al cargar el horóscopo 😥"
  })