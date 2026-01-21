import express from "express"
import cors from "cors"
import connectDB from "./src/connect/connectDB.js";
import { HistoricoCarrinhoRotas } from "./src/rotas/hitorico_rotas.js";
import { UsuarioRotas } from "./src/rotas/usuario_rotas.js";
import { ProdutoRotas } from "./src/rotas/produto_rotas.js";
import { CarrinhoRotas } from "./src/rotas/carrinho_rotas.js";
import path from 'path'
import { fileURLToPath } from 'url';
import { criarDados } from "./src/connect/criarDadosIniciais.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(cors())
app.use(express.json({limit: '10mb'}))


async function start() {

    await connectDB()
    await criarDados()

    app.use(express.static(path.join(__dirname, '../front')))

    app.get('/', (req, res) => {
        res.redirect('/paginas/index.html')
    })

    app.use('/usuario', UsuarioRotas)
    app.use('/produto', ProdutoRotas)
    app.use('/carrinho', CarrinhoRotas)
    app.use('/historico', HistoricoCarrinhoRotas)

    app.listen(3000, function () {
        console.log('o servidor esta rodando na porta 3000')
    })
}

start()