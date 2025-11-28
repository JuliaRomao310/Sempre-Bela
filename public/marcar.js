console.log("marcar.js carregado");
let servico = localStorage.getItem("servicoSelecionado");
let diasSelecionados = JSON.parse(localStorage.getItem("diasSelecionados")) || [];
let horarioSelecionado = localStorage.getItem("horarioSelecionado");

// Exibir dados escolhidos
document.getElementById("servicoSelecionado").innerText = servico;

async function confirmar() {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;

    if (!nome || !telefone) {
        alert("Preencha nome e telefone!");
        return;
    }

    try {
        const res = await fetch("/api/agendamento", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome,
                telefone,
                email,
                servico,
                data: diasSelecionados[0],
                horario: horarioSelecionado + ":00"
            })
        });

        if (!res.ok) {
            alert("Erro ao salvar agendamento!");
            return;
        }

        localStorage.setItem("clienteLogado", JSON.stringify({ nome, telefone }));

        alert("Horário marcado com sucesso!");
        window.location.href = "meusHorarios.html";

    } catch (err) {
        alert("Erro de conexão com o servidor.");
        console.error(err);
    }
}




