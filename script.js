const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwDVmN8OX29bAz2oYx_Hks_t6R0JwlYkH3olXN7VHOaa41TC1CVTLX6wlIZOXsDQsGadA/exec";

document.getElementById('predictionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = document.getElementById('submitBtn');
    const msg = document.getElementById('message');
    
    // Bloquear botón
    btn.disabled = true;
    btn.innerText = "Enviando...";
    msg.classList.add('hidden');

    const formData = new FormData(this);
    const queryString = new URLSearchParams(formData).toString();

    // Usamos GET con parámetros para evitar problemas de CORS en algunos navegadores
    fetch(`${SCRIPT_URL}?${queryString}`, {
        method: 'POST'
    })
    .then(res => res.text())
    .then(data => {
        msg.classList.remove('hidden');
        
        if(data === "success") {
            msg.innerText = "¡Pronóstico enviado! Mucha suerte.";
            msg.className = "success";
            this.reset();
            btn.innerText = "¡Enviado!";
        } else if(data === "duplicate") {
            msg.innerText = "Ya registramos una participación con estos datos.";
            msg.className = "warning";
            btn.disabled = false;
            btn.innerText = "Enviar Pronóstico";
        } else {
            throw new Error();
        }
    })
    .catch(err => {
        msg.classList.remove('hidden');
        msg.innerText = "Error de conexión. Intentá de nuevo.";
        msg.style.color = "red";
        btn.disabled = false;
        btn.innerText = "Enviar Pronóstico";
    });
});