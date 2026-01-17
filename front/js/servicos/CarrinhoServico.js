import { BASE_URL } from "../constantes.js"
import { notificar } from "../util.js"

export async function finalizarCompra({ valorPago, usuarioId }) {

    if (!valorPago)
        throw 'Valor a pagar não informado!'

    if (!usuarioId)
        throw 'Para finalizar o carrinho faça o login!'

    let carrinho = {
        usuarioId,
        valorPago
    }

    return fetch(`${BASE_URL}/carrinho/finalizar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carrinho)
    })
        .then(async function (res) {
            if (res.ok) {
                return res.json()
            } else {
                const erro = await res.text();
                const mensagemErro = "erro na compra, preenchar o valor corretamente: " + erro
                notificar(mensagemErro, true)
                throw mensagemErro
            }
        })

}


export async function adicionarProdutoCarrinho({ produtoId, usuarioId, quantidade }) {
    const dadosCompra = {
        usuarioId,
        produtoId,
        quantidade: 1
    }

    return fetch(`${BASE_URL}/carrinho`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosCompra)
    })
        .then(async function (res) {
            if (res.ok) {
                return res.json()
            } else {
                const erro = await res.text();
                throw "Erro ao adicionar: " + erro
            }
        })
}

export async function buscarCarrinhoUsuario({ usuarioId }) {
    return fetch(`${BASE_URL}/carrinho/${usuarioId}`)
    .then(async res => {

        if (res.ok)
            return res.json()

        const erro = await res.text();
        throw `Falha ao recuperar carrinho: ${erro}`
    })
}

export async function deletarItemCarrinho({produtoId, usuarioId}) {
    return fetch(`${BASE_URL}/carrinho/usuario/${usuarioId}/produto/${produtoId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(async function (res) {
        if (res.ok)
            return res.json()
        throw await res.text()
    })
}