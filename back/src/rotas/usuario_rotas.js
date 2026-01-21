import { Router } from "express";
import { UsuarioServico } from "../servicos/usuario_servico.js";

const rotas = Router()
const usuarioServico = new UsuarioServico()

rotas.post('/login', async function (req, res) {
    try {
        const usuarioLogado = await usuarioServico.fazerLogin(req.body)
        usuarioLogado.senha = undefined
        res.status(200).send(usuarioLogado)
    } catch (erro) {
        res.status(erro.codigoHTTP).send(erro.mensagem)
    }
})

rotas.post("/", async function (req, res) {
    try {
        const usuario = {...req.body, eAdmin: undefined}
        const usuarioCriado = await usuarioServico.criarUsuario(usuario)
        usuarioCriado.senha = undefined
        res.status(201).send(usuarioCriado)
    } catch (erro) {
        res.status(erro.codigoHTTP).send(erro.mensagem)
    }
})

export { rotas as UsuarioRotas }