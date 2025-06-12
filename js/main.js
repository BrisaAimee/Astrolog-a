// Primero armo el diccionario para traducir signos al inglés (porque la API los quiere así)
const traduccion = {
  Aries: "Aries", Tauro: "Taurus", Geminis: "Gemini", Cancer: "Cancer",
  Leo: "Leo", Virgo: "Virgo", Libra: "Libra", Escorpio: "Scorpio",
  Sagitario: "Sagittarius", Capricornio: "Capricorn", Acuario: "Aquarius", Piscis: "Pisces"
}

// Array con los signos y sus imágenes, lo tuve que hacer a mano porque la API no me da imágenes
const signosArray = [
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
  let grilla = document.getElementById("grilla")
  if (!grilla) return // por si lo llamo desde otra página sin querer

  for (let i = 0; i < signosArray.length; i++) {
    let signo = signosArray[i]
    let img = document.createElement("img")
    img.src = signo.img
    img.alt = signo.nombre

    // cuando hacés clic te lleva al post.html con el signo ya en la URL
    img.addEventListener("click", () => {
      let enIngles = traduccion[signo.nombre]
      window.location.href = `post.html?sign=${enIngles}`
    })

    grilla.appendChild(img)
  }
}

// Función que uso cuando la persona pone la fecha de nacimiento
function redireccionarConFecha() {
  let fecha = document.getElementById("fecha").value

  if (!fecha) {
    alert("Por favor elegí una fecha")
    return
  }

  let partes = fecha.split("-") // separo año, mes, día
  let mes = parseInt(partes[1])
  let dia = parseInt(partes[2])

  let signo = calcularSigno(mes, dia) // uso mi función de abajo

  window.location.href = `post.html?sign=${signo}` // chau, te mando a post
}

// Esto es lo que calcula el signo, según el mes y día. Lo chequeé y está bien.
function calcularSigno(m, d) {
  let z = "Capricornio" // por default
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
