import { buscarCarrinhoUsuario, deletarItemCarrinho, finalizarCompra } from './servicos/CarrinhoServico.js'
import { executarRequisicao, getUsuarioId, irPara } from './util.js'
import { abrirModal } from './utils/modal.js'
import { NavBar } from './utils/navbar.js'

const navbar = new NavBar(false, true)
let valorCompra = 0


const tratarMoeda = function (valor) {
    if (!valor || valor === 0)
        return '0,0 R$'
    return (valor + '').replace('.', ',') + ' R$'
}

async function listarItensCarrinho() {

    const carrinhoConteriner = document.getElementById("carrinho")

    const usuarioId = await getUsuarioId()
    const carrinhoUsuario = await executarRequisicao(() => buscarCarrinhoUsuario({ usuarioId }))

    carrinhoConteriner.innerHTML = ''

    let valorTotal = 0

    if (!carrinhoUsuario || !carrinhoUsuario.produtos || carrinhoUsuario.produtos.length === 0) {
        carrinhoConteriner.innerHTML = "<p>Seu carrinho está vazio</p>"

        const btnFinalizar = document.getElementById('btn-finalizar-compra')
        btnFinalizar.style.display = 'none'
        
        return
    }



    for (let i = 0; i < carrinhoUsuario.produtos.length; i++) {
        valorTotal += carrinhoUsuario.produtos[i].produto.preco * carrinhoUsuario.produtos[i].quantidade
        carrinhoConteriner.innerHTML += `
                <div class="item-carrinho">                            
                    <p><strong>${carrinhoUsuario.produtos[i].produto.nome}</strong></p>
                    <p>Qtd: ${carrinhoUsuario.produtos[i].quantidade}</p>
                    <p>R$ ${tratarMoeda(carrinhoUsuario.produtos[i].produto.preco.toFixed(2))}</p>
                    <button class="btn-remover" onclick="removerItemCarrinho('${carrinhoUsuario.produtos[i].produto._id}', '${carrinhoUsuario.produtos[i].produto.nome}')">Remover</button>
                </div>  
                `
    }

    carrinhoConteriner.innerHTML += `
                <div class="valor-total">   
                    <p>Total: ${tratarMoeda(valorTotal.toFixed(2))}</p>
                </div>  
                `

    valorCompra = valorTotal
}

async function finalizarCompraNoCarrinho() {
    const usuarioId = await getUsuarioId()

    let carrinho = {
        usuarioId,
        valorPago: valorCompra
    }

    const compraFinalizada = await executarRequisicao(() => finalizarCompra(carrinho))
    if (compraFinalizada) {
        abrirModal({
            mensagem: `Sua compra no valor de ${tratarMoeda(valorCompra.toFixed(2))} R$ foi executada!`,
            botaoOkTxt: 'OK',
            callbackOk: () => irPara('index.html')
        })
    }
}

async function removerItemCarrinho(produtoId, nome) {
    const usuarioId = await getUsuarioId()

    abrirModal({
        mensagem: `Tem certeza que deseja remover o produto: ${nome}?`,
        botaoOkTxt: 'Remover',
        botaoCancelarTxt: 'Cancelar',
        callbackCancelar: () => {},
        callbackOk: async () => {
            await deletarItemCarrinho({produtoId, usuarioId})
            listarItensCarrinho();
        }
    })
    
}

listarItensCarrinho()

window.irPara = irPara
window.finalizarCompraNoCarrinho = finalizarCompraNoCarrinho
window.removerItemCarrinho = removerItemCarrinho