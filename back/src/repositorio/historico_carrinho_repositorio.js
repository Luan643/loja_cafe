import { HistoricoCarrinhoModel } from "../interfaces/historico_carrinho.js";

export class HistoricoCarrinhoRepositorio {

    async criarHistorico(dadosCompra) {
        const historico = new HistoricoCarrinhoModel(dadosCompra)
        return await historico.save()
    }

    async atualizarHistorico(dadosCompra) {
        return await dadosCompra.save()
    }

    async buscarHistorico(usuarioId) {
        return (await HistoricoCarrinhoModel.findOne({ usuario: usuarioId }))
    }

    async listaProdutosComprados(usuarioId) {
        return await HistoricoCarrinhoModel.findOne({ usuario: usuarioId })
            .populate(
                ['produtos.produto'] 
            )
    }
}