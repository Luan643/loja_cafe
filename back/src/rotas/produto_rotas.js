import { Router } from 'express'
import { ProdutoServico } from '../servicos/produto_servico.js'

const produtoServico = new ProdutoServico()
const rotas = Router()

rotas.post("/criar", async function (req, res) {
    try {
        const criarProduto = await produtoServico.criarProduto(req.body)
        res.status(201).send(criarProduto)
    } catch (erro) {
        res.status(erro.codigoHTTP).send(erro.mensagem)
    }
})

rotas.get("/", async function (req, res) {
    try {
        const listaProdutos = await produtoServico.listarProduto()
        res.status(200).send(listaProdutos)
    } catch (erro) {
        res.status(erro.codigoHTTP).send(erro.mensagem)
    }
})

rotas.get("/busca", async function (req, res) {
    try {
        const produtoPesquisado = await produtoServico.pesquisarProduto(req.query.nome)
        res.status(200).send(produtoPesquisado)
    } catch (erro) {
        res.status(erro.codigoHTTP).send(erro.mensagem)
    }
})

export { rotas as ProdutoRotas }