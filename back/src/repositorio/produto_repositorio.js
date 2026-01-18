import { ProdutoModel } from "../interfaces/produto.js";

export class ProdutoRepositorio {

    async criarProduto(produto) {
        const novoProduto = new ProdutoModel(produto)
        return await novoProduto.save()
    }

    async existsProduto(nomeProduto) {
        return await ProdutoModel.exists({ nome: nomeProduto })
    }

    async listarProdutos() {
        return await ProdutoModel.find({})
    }

    async pesquisarProduto(nomeProduto) {
        return await ProdutoModel.find({
            nome: {
                $regex: nomeProduto,
                $options: 'i'
            }
        })
    }
}