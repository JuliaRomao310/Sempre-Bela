const cliente = JSON.parse(localStorage.getItem("clienteLogado"));

if (!cliente) {
    alert("Faça login!");
    window.location.href = "login_cliente.html";
}

async function carregarHorarios() {
    try {
        const res = await fetch(`/api/agendamentos/cliente/${cliente.telefone}`);
        const lista = await res.json();
        mostrarHorarios(lista);
    } catch (err) {
        alert("Erro ao conectar ao servidor.");
        console.error(err);
    }
}

function mostrarHorarios(lista) {
    const area = document.getElementById("listaAgendamentos");
    area.innerHTML = "";

    if (lista.length === 0) {
        area.innerHTML = "<p>Você não tem horários marcados.</p>";
        return;
    }

    lista.forEach(a => {
        const div = document.createElement("div");
        div.className = "cardHorario";
        div.innerHTML = `
            <h3>${a.servico}</h3>
            <p><b>Data:</b> ${a.data_agendada}</p>
            <p><b>Hora:</b> ${a.horario}</p>
        `;
        area.appendChild(div);
    });
}

carregarHorarios();

