import { ProdutoRepositorio } from "../repositorio/produto_repositorio.js"

const produtoRepositorio = new ProdutoRepositorio()

export class ProdutoServico {

    async criarProduto(produto) {
        const existsProduto = await produtoRepositorio.existsProduto(produto.nome)

        if (existsProduto) {
            throw ({ mensagem: 'produto ja existe', codigoHTTP: 400 })
        }

        const novoProduto = {
            nome: produto.nome,
            preco: produto.preco,
            img: produto.img
        }

        return await produtoRepositorio.criarProduto(novoProduto)
    }

    async listarProduto() {
        const produtos = await produtoRepositorio.listarProdutos()

        return produtos
    }

    async pesquisarProduto(nomeProduto) {
        return await produtoRepositorio.pesquisarProduto(nomeProduto) 
    }
}