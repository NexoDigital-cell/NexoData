const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú" : "Abrir menú"
  );
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  });
});

document.getElementById("year").textContent =
  new Date().getFullYear();

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const business = document.getElementById("business").value.trim();
  const service = document.getElementById("service").value;
  const details = document.getElementById("details").value.trim();

  if (!name || !service) {
    formNote.textContent = "Completa tu nombre y selecciona un servicio.";
    return;
  }

  const message = [
    "Hola, NexoData. Me gustaría solicitar información sobre sus servicios.",
    "",
    `Nombre: ${name}`,
    `Negocio: ${business || "No especificado"}`,
    `Servicio: ${service}`,
    `Detalles: ${details || "Me gustaría conocer las opciones disponibles."}`
  ].join("\n");

  formNote.textContent =
    "Se abrirá Instagram. Copia el mensaje preparado y envíalo por DM.";

  const instagramUrl = "https://www.instagram.com/nexo_digital6/";
  const instagramWindow = window.open(instagramUrl, "_blank", "noopener");

  // El mensaje se copia para que puedas pegarlo manualmente en Instagram.
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(message).then(() => {
      formNote.textContent =
        "Mensaje copiado. Pégalo en el chat de Instagram para enviarlo.";
    }).catch(() => {
      formNote.textContent =
        "Instagram está abierto. Copia los datos del formulario y envíalos por DM.";
    });
  } else {
    formNote.textContent =
      "Instagram está abierto. Copia los datos del formulario y envíalos por DM.";
  }

  if (!instagramWindow) {
    formNote.textContent =
      "No se pudo abrir Instagram automáticamente. Visita @nexo_digital6 y envía tu mensaje.";
  }
});