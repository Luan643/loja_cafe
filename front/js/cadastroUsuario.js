import { cadastrarUsuario } from "./servicos/UsuarioServico.js";
import { executarRequisicao, irPara } from "./util.js";

async function criarNovoUsuario() {

    const nome = document.getElementById("nomeCadastro").value;
    const usuario = document.getElementById("usuarioCadastro").value;
    const senha = document.getElementById("senhaCadastro").value;

    if (!nome || !usuario || !senha) {
        alert("Preencha todos os campos!")
    }

    const usuarioCadastro = {
        nome,
        usuario,
        senha
    };

    const novoUsuario = await executarRequisicao(() => cadastrarUsuario(usuarioCadastro))

    localStorage.setItem("usuarioDados", JSON.stringify(novoUsuario))
    irPara("index.html")
}

window.criarNovoUsuario = criarNovoUsuario
window.irPara = irPara