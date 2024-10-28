const menuLista = document.querySelector(".muenu__lista");
const menuCerrar = document.querySelector(".menu__cerrar");
const btnMenuCerrar = document.querySelector(".btn__img-cerrar");
const btnMenuAbrir = document.querySelector(".btn__img-abrir");
const menuItem = document.querySelectorAll(".menu__item");
let ancho = true;

window.addEventListener("resize", () => {
  dimension();
});
const dimension = () => {
  if (window.innerWidth <= 1024) {
    if (ancho) {
      menuLista.style.visibility = "hidden";
      menuCerrar.style.visibility = "hidden";
      btnMenuAbrir.style.visibility = "visible";
      return;
    } else {
      clickMenuItem(true);
      menuLista.style.visibility = "visible";
      menuCerrar.style.visibility = "visible";
      btnMenuAbrir.style.visibility = "hidden";
    }
  } else {
    menuLista.style.visibility = "visible";
    clickMenuItem(false);
  }
};

btnMenuAbrir.addEventListener("click", () => {
  abrirMenu();
  clickMenuItem(true);
});
const abrirMenu = () => {
  menuCerrar.style.visibility = "visible";
  btnMenuAbrir.style.visibility = "hidden";
  ancho = false;
  animacionMenuActivo();
};

btnMenuCerrar.addEventListener("click", () => {
  cerrarMenu();
});
const cerrarMenu = () => {
  menuLista.style.visibility = "hidden";
  btnMenuAbrir.style.visibility = "visible";
  menuCerrar.style.visibility = "hidden";
  ancho = true;
  clickMenuItem(false);
  animacionMenuDesativo();
};

const lista = document.querySelectorAll(".menu__link");
const menuActivadoClick = () => {
  lista.forEach((navItem) => {
    navItem.addEventListener("click", cerrarMenu);
  });
};
const menuDesactivadoClick = () => {
  lista.forEach((navItem) => {
    navItem.removeEventListener("click", cerrarMenu);
  });
};

const clickMenuItem = (estado) => {
  if (estado) {
    menuActivadoClick();
    menuFueraActivo();
  } else {
    menuDesactivadoClick();
    menuFueraDesactivado();
  }
};
const menuClickFuera = (e) => {
  if (!menuLista.contains(e.target) && !menuCerrar.contains(e.target)) {
    cerrarMenu();
  }
};
const menuFueraActivo = () => {
  document.addEventListener("mouseup", menuClickFuera);
};
const menuFueraDesactivado = () => {
  document.removeEventListener("mouseup", menuClickFuera);
};

const animacionMenuActivo = () => {
  menuItem.forEach((item) => {
    item.classList.add("show__menu-item");
  });
};
const animacionMenuDesativo = () => {
  menuItem.forEach((item) => {
    item.classList.remove("show__menu-item");
  });
};

const entradas = document.querySelectorAll(".form__input");
const entradaMensaje = document.querySelector(".form__mensaje");
const errorMensaje = document.querySelectorAll(".error__input");
const claseError = "error__input--invalid";
const btnEnvio = document.querySelector("#botonEnvio")

entradas.forEach((entradaFocus, index) => {
  entradaFocus.addEventListener("keyup", () => {
    let claseEncontrada = false;
    for (const key in errorMensaje) {
      if (errorMensaje.hasOwnProperty(key)) {
        const elemento = errorMensaje[key];
        if (elemento.classList.contains(claseError)) {
          claseEncontrada = true;
        }
      }
    }
    if(claseEncontrada) {
      btnEnvio.classList.remove("form__btn--valid")
    } else {
      btnEnvio.classList.add("form__btn--valid")
    }
  });
});

entradas.forEach((entradaFocus, index) => {
  entradaFocus.addEventListener("input", (input) => {
    let indice = index;
    let texto = input.target.value;
    let entrada = entradaFocus;
    entradasElemento(indice, texto, entrada);
  });
});

const entradasElemento = (index, texto, entrada) => {
  if (index === 0) {
    evaluarNombre(index, texto, entrada, (nombreCampo = "NOMBRE"));
  } else if (index === 1) {
    evaluarCorreo(index, texto, entrada, (nombreCampo = "CORREO"));
  } else if (index === 2) {
    evaluarAsunto(index, texto, entrada, (nombreCampo = "ASUNTO"));
  } else if (index === 3) {
    evaluarMensaje(index, texto, entrada, (nombreCampo = "MENSAJE"));
  }
};
const evaluarNombre = (indice, nombre, alertaError, nombreCampo) => {
  let maxCaracteres = 50;
  if (nombre.trim() === "") {
    entradaVacia(indice, nombre, alertaError, nombreCampo);
    return;
  } else if (nombre.length > maxCaracteres) {
    maxLetras(indice, nombre, alertaError, maxCaracteres);
    return;
  } else {
    entradaCaracteresEspeciales(indice, nombre, alertaError);
    return;
  }
};
const evaluarCorreo = (indice, correo, alertaError, nombreCampo) => {
  let maxCaracteres = 50;
  if (correo.trim() === "") {
    entradaVacia(indice, correo, alertaError, nombreCampo);
    return;
  } else if (correo.length > maxCaracteres) {
    maxLetras(indice, correo, alertaError, maxCaracteres);
    return;
  } else {
    entradaCorreoValido(indice, correo, alertaError);
    return;
  }
};
const evaluarAsunto = (indice, asunto, alertaError, nombreCampo) => {
  let maxCaracteres = 100;
  if (asunto.trim() === "") {
    entradaVacia(indice, asunto, alertaError, nombreCampo);
    return;
  } else if (asunto.length > maxCaracteres) {
    maxLetras(indice, asunto, alertaError, maxCaracteres);
    return;
  } else {
    entradaCaracteresEspeciales(indice, asunto, alertaError);
    return;
  }
};
const evaluarMensaje = (indice, mensaje, alertaError, nombreCampo) => {
  let maxCaracteres = 1500;
  if (mensaje.trim() === "") {
    entradaVacia(indice, mensaje, alertaError, nombreCampo);
    return;
  } else if (mensaje.length > maxCaracteres) {
    maxLetras(indice, mensaje, alertaError, maxCaracteres);
    return;
  } else {
    mensajeCaracteresEspeciales(indice, mensaje, alertaError);
    return;
  }
};
const maxLetras = (indice, texto, alertaError, cant) => {
  if (texto.length > cant) {
    entradas[indice].style.backgroundColor = "#ff000014";
    entradas[indice].classList.add("form__input--invalid");
    errorMensaje[indice].textContent = `No se admite más de ${cant} caracteres`;
    errorMensaje[indice].classList.add("error__input--invalid");
    alertaError.setCustomValidity(`No se admite más de ${cant} caracteres`);
    return
  } else {
    entradas[indice].style.backgroundColor = "white";
    entradas[indice].classList.remove("form__input--invalid");
    errorMensaje[indice].textContent = "";
    errorMensaje[indice].classList.remove("error__input--invalid");
    alertaError.setCustomValidity(``);
    return
  }
};
const entradaCorreoValido = (indice, correo, alertaError) => {
  let regex =
    /^[0-9a-zA-Z]+([0-9a-zA-Z ]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/;
  if (regex.test(correo)) {
    entradas[indice].style.backgroundColor = "white";
    entradas[indice].classList.remove("form__input--invalid");
    errorMensaje[indice].textContent = "";
    errorMensaje[indice].classList.remove("error__input--invalid");
    alertaError.setCustomValidity("");
    return
  } else {
    entradas[indice].style.backgroundColor = "#ff000014";
    entradas[indice].classList.add("form__input--invalid");
    errorMensaje[indice].textContent = "El correo no es válido";
    errorMensaje[indice].classList.add("error__input--invalid");
    alertaError.setCustomValidity(`El correo no es válido`);
    return
  }
};
const entradaCaracteresEspeciales = (indice, texto, alertaError) => {
  let regex = /^[a-zA-Z0-9\s]+$/;
  if (regex.test(texto)) {
    entradas[indice].style.backgroundColor = "white";
    entradas[indice].classList.remove("form__input--invalid");
    errorMensaje[indice].textContent = "";
    errorMensaje[indice].classList.remove("error__input--invalid");
    alertaError.setCustomValidity("");
    return
  } else {
    entradas[indice].style.backgroundColor = "#ff000014";
    entradas[indice].classList.add("form__input--invalid");
    errorMensaje[indice].textContent = "No se admite caracteres especiales";
    errorMensaje[indice].classList.add("error__input--invalid");
    alertaError.setCustomValidity(`No se admite caracteres especiales`);
    return
  }
};
const mensajeCaracteresEspeciales = (indice, texto, alertaError) => {
  let regexMen = /[<>{}()'"`´;&$+\:=?\[\]\\]/g;
  if (regexMen.test(texto)) {
    entradas[indice].style.backgroundColor = "#ff000014";
    entradas[indice].classList.add("form__input--invalid");
    errorMensaje[indice].textContent = "No se admite caracteres especiales";
    errorMensaje[indice].classList.add("error__input--invalid");
    alertaError.setCustomValidity(`No se admite caracteres especiales`);
    return
  } else {
    entradas[indice].style.backgroundColor = "white";
    entradas[indice].classList.remove("form__input--invalid");
    errorMensaje[indice].textContent = "";
    errorMensaje[indice].classList.remove("error__input--invalid");
    alertaError.setCustomValidity("");
    return
  }
};
const entradaVacia = (indice, texto, alertaError, nombreCampo) => {
  if (texto.trim() == "") {
    entradas[indice].style.backgroundColor = "#ff000014";
    entradas[indice].classList.add("form__input--invalid");
    errorMensaje[indice].textContent = "No puede estar vacÍo";
    errorMensaje[indice].classList.add("error__input--invalid");
    alertaError.setCustomValidity(`No puede estar vacío el ${nombreCampo}`);
    return
  } else {
    entradas[indice].style.backgroundColor = "white";
    entradas[indice].classList.remove("form__input--invalid");
    errorMensaje[indice].textContent = "";
    errorMensaje[indice].classList.remove("error__input--invalid");
    alertaError.setCustomValidity("");
    return
  }
};
