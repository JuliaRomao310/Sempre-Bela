// Exibir nome do serviço escolhido anteriormente
document.getElementById("servicoSelecionado").innerText = localStorage.getItem("servicoSelecionado");
console.log(document.getElementById("servicoSelecionado").innerText)

// ARRAY para armazenar escolha do usuário
let diaEscolhido = null;
let horarioEscolhido = null;

const divDias = document.getElementById("dias");
const divHorarios = document.getElementById("horarios");
const form = document.getElementById("formulario");

// 🗓 1) GERAR DIAS - 14 dias, ignorando domingo (0) e segunda (1)
function gerarDias() {
    divDias.innerHTML = "";

    let hoje = new Date();
    let gerados = 0;

    while (gerados < 14) {
        hoje.setDate(hoje.getDate() + 1);

        // 0 domingo | 1 segunda → pula
        if (hoje.getDay() === 0 || hoje.getDay() === 1) continue;
        
        let dataFormatada = hoje.toISOString().split("T")[0]; // yyyy-mm-dd
        let btn = document.createElement("button");
        btn.className = "diaBtn";
        btn.innerText = dataFormatada;
        
        btn.onclick = () => selecionarDia(dataFormatada, btn);
        
        divDias.appendChild(btn);
        gerados++;
    }
}

// ⏰ 2) GERAR HORÁRIOS (08:00 → 19:00 de hora em hora)
function gerarHorarios() {
    divHorarios.innerHTML = "";
    for (let h = 8; h <= 19; h++) {
        let hora = (h < 10 ? "0" + h : h) + ":00";
        let btn = document.createElement("button");
        btn.className = "horaBtn";
        btn.innerText = hora;
        
        btn.onclick = () => selecionarHorario(hora, btn);
        
        divHorarios.appendChild(btn);
    }
}

// ▶ AO CLICAR EM UM DIA
function selecionarDia(data, btn) {
    diaEscolhido = data;
    localStorage.setItem("diasSelecionados", JSON.stringify([data]));
    
    document.querySelectorAll(".diaBtn").forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    
    gerarHorarios(); // somente após escolher dia
}

// ▶ AO CLICAR EM UM HORÁRIO
function selecionarHorario(hora, btn) {
    horarioEscolhido = hora;
    localStorage.setItem("horarioSelecionado", hora);
    
    document.querySelectorAll(".horaBtn").forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");

    form.style.display = "block"; // 🔥 mostra o formulário só no final

}

gerarDias();