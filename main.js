// Vanguard Veterans Consulting - main.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const navLinks = document.querySelectorAll('a[href^="#"]');

  // Smooth scroll with sticky nav offset
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        event.preventDefault();

        const navHeight = document.querySelector(".navbar")?.offsetHeight || 0;
        const targetPosition =
          targetSection.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Simple consultation form handler
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const service = form.querySelector("select").value;
      const message = form.querySelector("textarea").value.trim();

      if (!name || !email || !service) {
        showNotice("Please complete your name, email, and service selection.", "error");
        return;
      }

      const subject = encodeURIComponent(
        `Consultation Request - ${service}`
      );

      const body = encodeURIComponent(
        `Name: ${name}
Email: ${email}
Service Requested: ${service}

Situation:
${message || "No additional details provided."}`
      );

      window.location.href = `mailto:info@vanguardveteransconsulting.com?subject=${subject}&body=${body}`;

      showNotice("Your email app should open with your consultation request.", "success");
      form.reset();
    });
  }

  function showNotice(message, type = "success") {
    const existingNotice = document.querySelector(".form-notice");
    if (existingNotice) existingNotice.remove();

    const notice = document.createElement("p");
    notice.className = `form-notice ${type}`;
    notice.textContent = message;

    form.appendChild(notice);

    setTimeout(() => {
      notice.remove();
    }, 6000);
  }
});
