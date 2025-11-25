// adm.js

const btnLogin = document.getElementById('btnLogin');
const adminSenha = document.getElementById('adminSenha');
const painelEl = document.getElementById('painel');
const loginArea = document.getElementById('loginArea');
const listaPainel = document.getElementById('listaPainel');
const btnRefresh = document.getElementById('btnRefresh');

// LOGIN DA PROPRIETÁRIA
btnLogin.addEventListener('click', async () => {
  const senha = adminSenha.value.trim();

  if (!senha) {
    alert("Digite a senha.");
    return;
  }

  try {

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senha })  // <-- nome do campo correto
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Senha incorreta.");
      return;
    }

    // Login OK
    loginArea.style.display = "none";
    painelEl.style.display = "block";
    carregarTodos();

  } catch (err) {
    console.error(err);
    alert("Erro ao tentar fazer login.");
  }
});

// BOTÃO ATUALIZAR
btnRefresh && btnRefresh.addEventListener("click", carregarTodos);

// BUSCAR TODOS AGENDAMENTOS
async function carregarTodos() {
  try {
    const res = await fetch("/api/agendamentos");

    if (!res.ok) throw new Error("Erro ao buscar agendamentos.");

    const dados = await res.json();
    renderizarPainel(dados);

  } catch (err) {
    console.error(err);
    alert("Erro ao carregar agendamentos.");
    }
}