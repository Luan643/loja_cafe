import { executarRequisicao } from "./servicos/Util"

let BASE_URL = "http://localhost:3000"

const inputNomeProduto = document.getElementById("inputPesquisar")

if (inputNomeProduto) {
    inputNomeProduto.oninput = function (e) {
        pesquisar(e.target.value)
        console.log("chamou input")
    }
}










document.addEventListener("DOMContentLoaded", listarItensCarrinho)



document.addEventListener("DOMContentLoaded", listarHistoricoCarrinho)


function irParaHistorico() {
    window.location.href = "historico.html"
}
