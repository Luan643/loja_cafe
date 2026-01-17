import { buscarProdutos, listarProdutos } from "./servicos/ProdutoServico.js";
import { irPara, notificar, executarRequisicao, getUsuarioId } from "./util.js";
import { adicionarProdutoCarrinho } from "./servicos/CarrinhoServico.js";
import { NavBar } from "./utils/navbar.js";

async function pesquisarProdutos(nomeProduto) {
    const listaProdutos = document.getElementById("lista-produtos")

    const produtos = await buscarProdutos(nomeProduto)

    listaProdutos.innerHTML = ""

    for (let i = 0; i < produtos.length; i++) {
        listaProdutos.innerHTML +=
            `<li class="produto-card">
            <h3>${produtos[i].nome}</h3>
            <p>R$ ${produtos[i].preco.toFixed(2)}</p>
                <button id="botaoComprar" onclick="adicionarAoCarrinho('${produtos[i]._id}')">Comprar</button>
        </li>`
    }
}

async function start() {

    let listaProdutos = document.getElementById("lista-produtos")


    const produtos = await listarProdutos()

    listaProdutos.innerHTML = ""
    for (let i = 0; i < produtos.length; i++) {
        listaProdutos.innerHTML +=
            `<li class="produto-card">
                <h3>${produtos[i].nome}</h3>
                <p>R$ ${produtos[i].preco.toFixed(2)}</p>
                <button id="botaoComprar" onclick="adicionarAoCarrinho('${produtos[i]._id}')">Comprar</button>
            </li>`
    }
    const navbar = new NavBar(false, false)

    const inputNomeProduto = document.getElementById("inputPesquisar")
    inputNomeProduto.oninput = function (e) {
        pesquisarProdutos(e.target.value)
    }
}

async function adicionarAoCarrinho(produtoId) {

    const usuarioId = await getUsuarioId()

    const dadosCompra = {
        usuarioId,
        produtoId,
        quantidade: 1
    }

    const carrinhoAtualizado = await executarRequisicao(() => adicionarProdutoCarrinho(dadosCompra))
    if (carrinhoAtualizado)
        notificar("Produto adicionado ao carrinho!")
}

start()

window.irPara = irPara
window.pesquisarProdutos = pesquisarProdutos
window.adicionarAoCarrinho = adicionarAoCarrinho