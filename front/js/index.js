import { autenticar } from "./servicos/UsuarioServico.js"
import { executarRequisicao, irPara } from "./Util.js"

async function login() {
    const usuario = document.getElementById("loginUsuario").value
    const senha = document.getElementById("loginSenha").value

    const resultadoLogin = await executarRequisicao(() => autenticar({usuario, senha}))
    localStorage.setItem("usuarioDados", JSON.stringify(resultadoLogin))

    irPara("index.html")
}

window.login = login
window.irPara = irPara