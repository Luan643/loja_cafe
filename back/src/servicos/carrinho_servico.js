import { CarrinhoRepositorio } from "../repositorio/carrinho_repositorio.js";
import { HistoricoCarrinhoServico } from "./historico_carrinho_servico.js";

const carrinhoRepositorio = new CarrinhoRepositorio()
const historico = new HistoricoCarrinhoServico()

export class CarrinhoServico {

    async criarEAtualizarCarrinho(dadosCompra) {
        const { usuarioId, produtoId, quantidade } = dadosCompra

        if (!usuarioId || !produtoId) {
            throw ({ mensagem: "ID do usuário e do produto são obrigatórios.", codigoHTTP: 400 })
        }

        const produto = {
            produto: produtoId,
            quantidade: quantidade
        }

        let carrinho = await carrinhoRepositorio.buscarCarrinho(usuarioId)
        let carrinhoAtualizado

        if (carrinho) {
            const produtoRetornado = carrinho.produtos.find(
                (item) => item.produto.toString() === produtoId
            )

            if (produtoRetornado) {
                produtoRetornado.quantidade += quantidade
            } else {
                const novoProduto = {
                    produto: produtoId,
                    quantidade: quantidade
                }

                carrinho.produtos.push(novoProduto)
            }

            carrinhoAtualizado = await carrinhoRepositorio.atualizarCarrinho(carrinho)
        } else {
            const novoCarrinho = {
                usuario: usuarioId,
                produtos: [produto]
            }

            carrinhoAtualizado = await carrinhoRepositorio.criarCarrinho(novoCarrinho)
        }

        return carrinhoAtualizado

    }

    async listarCarrinho(usuarioId) {

        const carrinho = await carrinhoRepositorio.buscarCarrinhoComPopulate(usuarioId);

        if (!carrinho) {

            return null;
        }
        return carrinho;
    }

    async deletarProdutoDoCarrinho(dadosCompra) {
        const { usuarioId, produtoId } = dadosCompra

        if (!usuarioId || !produtoId) {
            throw ({ mensagem: "ID do usuário e do produto são obrigatórios.", codigoHTTP: 400 });
        }

        const seProdutoExiste = await carrinhoRepositorio.seProdutoExisteNoCarrinho(usuarioId, produtoId)

        if (!seProdutoExiste) {
            throw ({ mensagem: "Produto não esta no carrinho ou não existe", codigoHTTP: 400 });
        }

        const carrinho = await carrinhoRepositorio.buscarCarrinho(usuarioId)

        if (!carrinho) {
            throw ({ mensagem: "Carrinho ainda não existe", codigoHTTP: 400 })
        }

        carrinho.produtos = carrinho.produtos.filter(
            (produto) => produto.produto.toString() !== produtoId
        )

        const carrinhoAtualizado = await carrinhoRepositorio.atualizarCarrinho(carrinho)

        return carrinhoAtualizado
    }

    async finalizarCompraNoCarrinho(dadosCompra) {

        const { valorPago, usuarioId } = dadosCompra

        const carrinho = await carrinhoRepositorio.buscarCarrinho(usuarioId)
        const carrinhoPopulate = await carrinhoRepositorio.buscarCarrinhoComPopulate(usuarioId)

        if (!carrinho || !carrinhoPopulate) {
            throw ({ mensagem: 'Carrinho não encontrado para este usuário.', codigoHTTP: 404 })
        }

        if (!carrinho.produtos || carrinho.produtos.length === 0) {
            throw ({ mensagem: 'O carrinho está vazio.', codigoHTTP: 400 })
        }

        let totalpago = 0

        carrinhoPopulate.produtos.forEach(e => {

            if (e.produto) {
                const total = e.produto.preco * e.quantidade
                totalpago += total
            }
        })

        if (valorPago === totalpago) {

            await historico.criarEAtulizarHistorico(usuarioId, carrinho.produtos)
            carrinho.produtos = []
            await carrinhoRepositorio.atualizarCarrinho(carrinho)
            return totalpago

        } else {
            throw ({ mensagem: `Valor incorreto. Enviado: ${valorPago}, Total Real: ${totalpago}`, codigoHTTP: 400 }) 
        }
    }
}