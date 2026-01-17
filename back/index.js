import express from "express"
import cors from "cors"
import connectDB from "./scr/connect/connectDB.js";
import { HistoricoCarrinhoRotas } from "./scr/rotas/hitorico_rotas.js";
import { UsuarioRotas } from "./scr/rotas/usuario_rotas.js";
import { ProdutoRotas } from "./scr/rotas/produto_rotas.js";
import { CarrinhoRotas } from "./scr/rotas/carrinho_rotas.js";

const app = express()
app.use(cors())
app.use(express.json())


async function start() {

    await connectDB()

    app.use('/usuario', UsuarioRotas)
    app.use('/produto', ProdutoRotas)
    app.use('/carrinho', CarrinhoRotas)
    app.use('/historico', HistoricoCarrinhoRotas)

    app.listen(3000, function () {
        console.log('o servidor esta rodando na porta 3000')
    })
}

start()