// Primero armo el diccionario para traducir signos al inglés
const traduccion = {
  Aries: "Aries", Tauro: "Taurus", Geminis: "Gemini", Cancer: "Cancer",
  Leo: "Leo", Virgo: "Virgo", Libra: "Libra", Escorpio: "Scorpio",
  Sagitario: "Sagittarius", Capricornio: "Capricorn", Acuario: "Aquarius", Piscis: "Pisces"
}

const signosArray = [ // Array con los signos y sus imágenes, lo tuve que hacer a mano porque la API no me da imágenes
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

// Esta es la función para hacer la grilla de imágenes (cada imagen te lleva al horóscopo)
function generarGrilla() {
  let grilla = document.getElementById("grilla") // selecciono el contenedor de la grilla

  for (let i = 0; i < signosArray.length; i++) { // recorro el array de signos
    let signo = signosArray[i]
    let img = document.createElement("img") // creo un elemento img
    img.src = signo.img 
    img.alt = signo.nombre

    // cuando hacés clic te lleva al post.html con el signo ya en la URL
    img.addEventListener("click", () => {
      let enIngles = traduccion[signo.nombre]
      window.location.href = `../pages/post.html?sign=${enIngles}`
    })

    grilla.appendChild(img) // agrego la imagen al contenedor de la grilla
  }
}

// Función que uso cuando la persona pone la fecha de nacimiento
function redireccionarConFecha() {
  let fecha = document.getElementById("fecha").value

  if (!fecha) {
    alert("Por favor elegí una fecha")
    return
  }

  let partes = fecha.split("-") // separo año, mes, día usando el guion como separador
  let mes = parseInt(partes[1])
  let dia = parseInt(partes[2]) // no nos importa el año, solo mes y día

  let signo = calcularSigno(mes, dia)
  window.location.href = `../pages/post.html?sign=${signo}` // chau, te mando a post
}

// Esto es lo que calcula el signo, según el mes y día. Lo chequeé y está bien.
function calcularSigno(m, d) {
  let z = "Capricornio" // por default ya que es el más dificil de calcular (del 22 de diciembre al 19 de enero)
  // m = mes, d = día, z = signo en español
  if (m == 1 && d >= 20 || m == 2 && d <= 18) z = "Acuario"
  else if (m == 2 && d >= 19 || m == 3 && d <= 20) z = "Piscis"
  else if (m == 3 && d >= 21 || m == 4 && d <= 19) z = "Aries"
  else if (m == 4 && d >= 20 || m == 5 && d <= 20) z = "Tauro"
  else if (m == 5 && d >= 21 || m == 6 && d <= 20) z = "Geminis"
  else if (m == 6 && d >= 21 || m == 7 && d <= 22) z = "Cancer"
  else if (m == 7 && d >= 23 || m == 8 && d <= 22) z = "Leo"
  else if (m == 8 && d >= 23 || m == 9 && d <= 22) z = "Virgo"
  else if (m == 9 && d >= 23 || m == 10 && d <= 22) z = "Libra"
  else if (m == 10 && d >= 23 || m == 11 && d <= 21) z = "Escorpio"
  else if (m == 11 && d >= 22 || m == 12 && d <= 21) z = "Sagitario"

  return traduccion[z] // devuelvo el nombre del signo pero como lo quiere la API
}

// apenas se abre la página, armo la grilla
generarGrilla()

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
