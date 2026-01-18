import { HistoricoCarrinhoRepositorio } from "../repositorio/historico_carrinho_repositorio.js"

const historicoCarrinhoRepositorio = new HistoricoCarrinhoRepositorio()

export class HistoricoCarrinhoServico {

    async criarEAtulizarHistorico(usuarioId, arrayProdutos) {

        let historico = await historicoCarrinhoRepositorio.buscarHistorico(usuarioId)

        if (historico) {
            await arrayProdutos.forEach(element => historico.produtos.push(element))
            await historicoCarrinhoRepositorio.atualizarHistorico(historico)

        } else {
            const novoHistorico = {
                usuario: usuarioId,
                produtos: arrayProdutos
            }

            await historicoCarrinhoRepositorio.criarHistorico(novoHistorico)
        }
    }

    async listarHistoricoCompras(usuarioId) {
        const historico = await historicoCarrinhoRepositorio.listaProdutosComprados(usuarioId); 

        if (!historico) {

            return null;
        }
        return historico;
    }
}