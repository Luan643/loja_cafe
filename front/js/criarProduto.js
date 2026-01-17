import { criarProduto } from './servicos/ProdutoServico.js'
import { executarRequisicao, irPara, notificar } from './util.js'
import { abrirModal } from './utils/modal.js'
import { NavBar } from './utils/navbar.js'
import { carregarToastContainer } from './utils/toast.js'

const navbar = new NavBar(false, true)

async function criarNovoProduto() {
    const nome = document.getElementById('nomeProduto').value
    const preco = document.getElementById('precoProduto').value

    await executarRequisicao(() => criarProduto({nome, preco}))
    .then(() => notificar('Produto criado com sucesso', false))

    abrirModal({
        mensagem: 'Produto Criado!',
        botaoOkTxt: 'OK',
        callbackOk: () => irPara('index.html')
    })
}

carregarToastContainer()

window.irPara = irPara
window.criarNovoProduto = criarNovoProduto