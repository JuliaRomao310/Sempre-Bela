function loginCliente() {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;

    if (!nome || !telefone) {
        alert("Preencha nome e telefone!");
        return;
    }

    localStorage.setItem("clienteLogado", JSON.stringify({ nome, telefone }));

    window.location.href = "meusHorarios.html";
}

