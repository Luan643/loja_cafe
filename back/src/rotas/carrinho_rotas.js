import { Router } from 'express'
import { CarrinhoServico } from '../servicos/carrinho_servico.js'

const carrinhoServico = new CarrinhoServico()
const rotas = Router()

rotas.post("/", async function (req, res) {
    try {
        const carrinho = await carrinhoServico.criarEAtualizarCarrinho(req.body)
        res.status(201).send(carrinho)
    } catch (erro) {
        res.status(erro.codigoHTTP).send(erro.mensagem)
    }
})

rotas.delete("/usuario/:usuarioId/produto/:produtoId", async function (req, res) {
    try {
        const produtoDeletado = await carrinhoServico.deletarProdutoDoCarrinho({
            usuarioId: req.params.usuarioId,
            produtoId: req.params.produtoId
        })
        res.status(200).send(produtoDeletado)
    } catch (erro) {
        res.status(erro.codigoHTTP).send(erro.mensagem)
    }
})

rotas.post("/finalizar", async function (req, res) {
    try {
        const teste = await carrinhoServico.finalizarCompraNoCarrinho(req.body)
        res.status(200).send(teste)
    } catch (erro) {
        res.status(erro.codigoHTTP).send(erro.mensagem)
    }
})

rotas.get("/:usuarioId", async function (req, res) {
    try {
        const carrinho = await carrinhoServico.listarCarrinho(req.params.usuarioId);
        res.status(200).send(carrinho);
    } catch (erro) {
        res.status(500).send(erro.mensagem);
    }
});

export { rotas as CarrinhoRotas }