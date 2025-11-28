import express from 'express';
import connection from './src/connection.js';
import cors from 'cors';
 
const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
 
    res.redirect('/index.html');
 
});

app.post("/api/agendamento", (req, res) => {
    const { nome, telefone, email, servico, data, horario } = req.body;

    if (!nome || !telefone || !servico || !data || !horario) {
        return res.status(400).json({ erro: "Dados incompletos." });
    }

    // 1) Verificar se cliente existe pelo telefone
    db.query("SELECT id FROM clientes WHERE telefone = ?", [telefone], (err, clienteRet) => {
        if (err) return res.status(500).json(err);

        if (clienteRet.length > 0) {
            // Cliente já existe → usar o ID
            criarAgendamento(clienteRet[0].id);
        } else {
            // cadastra cliente novo
            db.query(
                "INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)",
                [nome, telefone, email],
                (err, insert) => {
                    if (err) return res.status(500).json(err);
                    criarAgendamento(insert.insertId); // pega id recém criado
                }
            );
        }
    });

    // Função interna para continuar o processo
    function criarAgendamento(cliente_id) {
        // 2) Buscar ID do serviço a partir do nome enviado
        db.query("SELECT id FROM servicos WHERE nome = ?", [servico], (err, servicoRet) => {
            if (err) return res.status(500).json(err);
            if (servicoRet.length === 0) return res.status(404).json({ erro: "Serviço não encontrado" });

            const servico_id = servicoRet[0].id;

            // 3) Registrar agendamento
            db.query(
                "INSERT INTO agendamentos (cliente_id, servico_id, data_agendada, horario) VALUES (?, ?, ?, ?)",
                [cliente_id, servico_id, data, horario],
                (err, resultado) => {
                    if (err) return res.status(500).json(err);
                    res.status(201).json({ msg: "Agendamento criado com sucesso!" });
                }
            );
        });
    }
});

// ================== AGENDAMENTOS DO CLIENTE ==================
app.get("/api/agendamentos/cliente/:telefone", (req, res) => {
    const { telefone } = req.params;

    // 1) localizar o cliente pelo telefone
    db.query("SELECT id, nome FROM clientes WHERE telefone = ?", [telefone], (err, clienteRet) => {
        if (err) return res.status(500).json(err);
        if (clienteRet.length === 0) return res.json([]); // nenhum cliente encontrado = nenhum horário

        const cliente_id = clienteRet[0].id;

        // 2) buscar todos os horários vinculados a ele com o nome do serviço
        db.query(`
            SELECT a.data_agendada, a.horario, s.nome AS servico 
            FROM agendamentos a
            JOIN servicos s ON s.id = a.servico_id
            WHERE a.cliente_id = ?
            ORDER BY a.data_agendada ASC, a.horario ASC
        `, [cliente_id], (err, agendamentos) => {
            if (err) return res.status(500).json(err);
            res.json(agendamentos);
        });
    });
});


app.listen(3000, () => {console.log("\nServidor Rodando!");
 
});