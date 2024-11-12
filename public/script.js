function inactivar(id) {
    fetch("/inactivar/" + id, {
        method: "POST",
    })
    .then((response) => response.json())
    .then((result) => {
        if (result.exito) {
            const row = document.querySelector(`tr[data-id="${id}"]`);
            row.className = "inactivo tachado"; 

            document.getElementById(`estado_${id}`).innerHTML = "Inactivo";

            const boton = document.getElementById(`button_${id}`);
            boton.innerHTML = "Activar";
            boton.classList.remove("btn-danger");
            boton.classList.add("btn-success");
            boton.setAttribute("onclick", `activar(${id})`);
        }
    });
}

function activar(id) {
    fetch("/activar/" + id, {
        method: "POST",
    })
    .then((response) => response.json())
    .then((result) => {
        if (result.exito) {
            const row = document.querySelector(`tr[data-id="${id}"]`);
            row.className = "activo"; // Restablecer clase a activo
            row.classList.remove("tachado"); // Eliminar clase tachado

            document.getElementById(`estado_${id}`).innerHTML = "Activo";

            const boton = document.getElementById(`button_${id}`);
            boton.innerHTML = "Inactivar";
            boton.classList.remove("btn-success");
            boton.classList.add("btn-danger");
            boton.setAttribute("onclick", `inactivar(${id})`);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('tr[data-id]');
    rows.forEach(row => {
        const id = row.getAttribute('data-id');
        const estado = document.getElementById(`estado_${id}`).innerHTML;

        if (estado === "Inactivo") {
            row.classList.add('tachado'); 
        }
    });
});






document.getElementById('especialidad').addEventListener('change', function() {
    const especialidadId = this.value;
    const medicoSelect = document.getElementById('medico');
    medicoSelect.innerHTML = '<option value="">Seleccionar Médico</option>';
    medicoSelect.disabled = true;

    if (especialidadId) {
        fetch(`/turnos/medicos/${especialidadId}`)
            .then(response => response.json())
            .then(medicos => {
                medicos.forEach(medico => {
                    medicoSelect.innerHTML += `<option value="${medico.id}">${medico.nombre} - Matrícula: ${medico.matricula}</option>`;
                });
                medicoSelect.disabled = false;
            });
    }
});

document.getElementById('btnConfirmar').addEventListener('click', function() {
    const nombre = document.getElementById('nombre').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const medicoId = document.getElementById('medico').value;

    if (nombre && fecha && hora && medicoId) {
        fetch('/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, fecha, hora, medicoId }),
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });
    } else {
        alert('Por favor, completa todos los campos.');
    }
});
