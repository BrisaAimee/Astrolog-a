const signosArray = [ //Acá tmb tengo que poner los signos y sus imágenes
  { nombre: "Aries", img: "media/aries.png" },
  { nombre: "Tauro", img: "media/tauro.png" },
  { nombre: "Geminis", img: "media/geminis.png" },
  { nombre: "Cancer", img: "media/cancer.png" },
  { nombre: "Leo", img: "media/leo.png" },
  { nombre: "Virgo", img: "media/virgo.png" },
  { nombre: "Libra", img: "media/libra.png" },
  { nombre: "Escorpio", img: "media/escorpio.png" },
  { nombre: "Sagitario", img: "media/sagitario.png" },
  { nombre: "Capricornio", img: "media/capricornio.png" },
  { nombre: "Acuario", img: "media/acuario.png" },
  { nombre: "Piscis", img: "media/pisis.png" }
]

const traduccion = { // Traducción de los signos del zodiaco al español porque las imagenes están en español
  Aries: "aries",
  Taurus: "tauro",
  Gemini: "geminis",
  Cancer: "cancer",
  Leo: "leo",
  Virgo: "virgo",
  Libra: "libra",
  Scorpio: "escorpio",
  Sagittarius: "sagitario",
  Capricorn: "capricornio",
  Aquarius: "acuario",
  Pisces: "piscis"
}


// Primero obtengo el signo desde la URL (por ejemplo: ?sign=leo)
let params = new URLSearchParams(window.location.search)
let signo = params.get("sign") // puede venir como "leo"
let signoTraducido = traduccion[signo] // ej: "leo"

// Imagen
document.getElementById("sign-image").src = `../media/${signoTraducido}.png`

// Selecciono el contenedor donde voy a poner el resultado
let resultado = document.getElementById("resultado")

// Aviso que está cargando (por si tarda un poco)
resultado.innerText = "Cargando horóscopo para " + signo + "... 🔮"

let urlBase = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${signo}&day=TODAY`
let url = `https://api.allorigins.win/raw?url=${encodeURIComponent(urlBase)}` // tuve que investigar y usar allorigins.win para evitar problemas de CORS

// Hago la llamada a la API
fetch(url)
  .then(res => res.json())
  .then(data => {
    // Respuesta de la API: viene en data.data.horoscope_data
    console.log("Respuesta de la API:", data)

    // Muestro el horóscopo en el HTML
    resultado.innerText = ` ${data.data.horoscope_data}
Fecha: ${data.data.date}`

    // Agrego una animación suave (opcional)
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
    // Si algo falla (no hay conexión o error), muestro un mensaje
    console.error("Error al cargar el horóscopo:", error)
    resultado.innerText = "Error al cargar el horóscopo 😥"
    
  })

  //quise agregar otra api para traducir el horóscopo que me da la api al español,
  //pero no pude encontrar una que funcione bien y no me rompa lo que hice,
  // igualmente desde google se puede traducir el texto automaticamente


  const cursor = document.getElementById('cursor'); // Obtengo el elemento del cursor personalizado
document.body.style.cursor = 'none'; // Oculta el cursor normal

window.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX - 20}px`;
  cursor.style.top = `${e.clientY - 20}px`;
  cursor.style.transform = 'scale(1.3)';
  setTimeout(() => {
    cursor.style.transform = 'scale(1)';
  }, 100);
});
