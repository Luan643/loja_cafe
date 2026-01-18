import { Router } from 'express'
import { HistoricoCarrinhoServico } from '../servicos/historico_carrinho_servico.js'

const historicoCarrinhoServico = new HistoricoCarrinhoServico()
const rotas = Router()

rotas.get("/:usuarioId", async function (req, res) {
    try {
        const historico = await historicoCarrinhoServico.listarHistoricoCompras(req.params.usuarioId)
        res.status(200).send(historico)
    } catch (erro) {
        res.status(erro.codigoHTTP).send(erro.mensagem)
    }
})

export { rotas as HistoricoCarrinhoRotas }