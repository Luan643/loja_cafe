import { CarrinhoModel } from "../interfaces/carrinho.js";

export class CarrinhoRepositorio {

    async criarCarrinho(dadosCarrinho) {
        const novoCarrinho = new CarrinhoModel(dadosCarrinho)
        const carrinhoSalvo = await novoCarrinho.save()

        return await carrinhoSalvo
            .populate(
                ["produtos.produto"]
            )
    }

    async atualizarCarrinho(carrinho) {
        const carrinhoSalvo = await carrinho.save()

        return await carrinhoSalvo
            .populate(
                ["produtos.produto"]
            )
    }

    async buscarCarrinho(usuarioId) {
        return await CarrinhoModel.findOne({ usuario: usuarioId })
    }

    async buscarCarrinhoComPopulate(usuarioId) {
        return await CarrinhoModel.findOne({ usuario: usuarioId }) 
            .populate(
                ['produtos.produto']
            )
    }

    async seProdutoExisteNoCarrinho(usuarioId, produtoId) {
        return await CarrinhoModel.exists({ usuario: usuarioId, "produtos.produto": produtoId })
    }
}