import { listarHistoricoDeCompras } from './servicos/HisotricoServico.js'
import { irPara, executarRequisicao } from './util.js'
import { NavBar } from './utils/navbar.js'

const navbar = new NavBar(false, true)

async function listasComprasAnteriores() {

    const historicoContainer = document.getElementById("historico")
    const historico = await executarRequisicao(listarHistoricoDeCompras)

    historicoContainer.innerHTML = ''
    if (!historico || !historico.produtos || historico.produtos.length === 0) {
        historicoContainer.innerHTML = `<p>Seu historico está vazio</p>`
        return
    } else {
        for (let i = 0; i < historico.produtos.length; i++) {
            historicoContainer.innerHTML += `
            <div>
                <p>Produto: ${historico.produtos[i].produto.nome}</p>
                <p>Quantida: ${historico.produtos[i].quantidade}</p>
                <p>Preço: ${historico.produtos[i].produto.preco.toFixed(2)}</p>
            </div>
        `
        }
    }
}

listasComprasAnteriores()

window.listasComprasAnteriores = listasComprasAnteriores
window.irPara = irPara