import { BASE_URL } from '../constantes.js'

export async function buscarProdutos(nome) {
    return fetch(`${BASE_URL}/produto/busca?nome=${nome}`)
        .then(res => res.json())
}

export async function criarProduto({ nome, preco, img }) {
    if (!nome || !preco) 
        throw 'Nome e preço do produto são obrigatórios'

    const produto = {
        nome,
        preco,
        img
    }

    return fetch(`${BASE_URL}/produto/criar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
    .then(async function (res) {
        if (res.ok)
            return res.json()
        throw await res.text()
    })
}

export async function listarProdutos() {
    return fetch(`${BASE_URL}/produto`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
}