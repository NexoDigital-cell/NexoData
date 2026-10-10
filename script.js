const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
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
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm && formNote) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const business = document.getElementById("business").value.trim();
    const service = document.getElementById("service").value;
    const details = document.getElementById("details").value.trim();

    if (!name || !service) {
      formNote.textContent =
        "Completa tu nombre y selecciona un servicio.";
      return;
    }

    const message = [
      "Hola, NexoData. Me gustaría solicitar información.",
      "",
      `Nombre: ${name}`,
      `Negocio: ${business || "No especificado"}`,
      `Servicio: ${service}`,
      `Detalles: ${details || "Me gustaría conocer las opciones disponibles."}`
    ].join("\n");

    // Mostrar el mensaje en la página para no perder los datos.
    let messageBox = document.getElementById("preparedMessage");

    if (!messageBox) {
      messageBox = document.createElement("textarea");
      messageBox.id = "preparedMessage";
      messageBox.readOnly = true;
      messageBox.rows = 8;
      messageBox.style.width = "100%";
      messageBox.style.marginTop = "12px";
      messageBox.style.padding = "12px";
      messageBox.style.borderRadius = "10px";
      messageBox.style.boxSizing = "border-box";
      formNote.insertAdjacentElement("afterend", messageBox);
    }

    messageBox.value = message;

    // Intentar copiar el mensaje.
    let copied = false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(message);
        copied = true;
      }
    } catch (error) {
      copied = false;
    }

    formNote.textContent = copied
      ? "¡Mensaje copiado! También aparece abajo por si necesitas copiarlo manualmente."
      : "Tu mensaje está preparado abajo. Selecciónalo y cópialo manualmente.";

    // Abrir Instagram después de preparar el mensaje.
    const instagramUrl = "https://www.instagram.com/nexo_digital6/";
    const instagramWindow = window.open(instagramUrl, "_blank");

    if (!instagramWindow) {
      formNote.textContent +=
        " El navegador bloqueó la ventana de Instagram; abre tu perfil manualmente.";
    }
  });
}
