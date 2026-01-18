import { criarProduto } from './servicos/ProdutoServico.js'
import { executarRequisicao, irPara, notificar } from './util.js'
import { abrirModal } from './utils/modal.js'
import { NavBar } from './utils/navbar.js'
import { carregarToastContainer } from './utils/toast.js'

const navbar = new NavBar(false, true)
let img = undefined

async function criarNovoProduto() {
    const nome = document.getElementById('nomeProduto').value
    const preco = document.getElementById('precoProduto').value

    await executarRequisicao(() => criarProduto({ nome, preco, img }))
        .then(() => notificar('Produto criado com sucesso', false))

    abrirModal({
        mensagem: 'Produto Criado!',
        botaoOkTxt: 'OK',
        callbackOk: () => irPara('index.html')
    })
}

async function escolherImagem() {
    const input = document.createElement('input')
    input.hidden = true
    input.type = "file"

    input.onchange = (e) => {
        const file = e.target.files[0]

        const imageShow = document.getElementById('produto-img')
        const reader = new FileReader()
        reader.onload = (e) => {
            imageShow.src = e.target.result
            img = e.target.result
        }

        reader.readAsDataURL(file)
    }


    const body = document.querySelector('body')
    body.appendChild(input)
    input.click()

    body.removeChild(input)
}

carregarToastContainer()

window.irPara = irPara
window.criarNovoProduto = criarNovoProduto
window.escolherImagem = escolherImagem