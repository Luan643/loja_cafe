import bcrypt from "bcryptjs";
import { UsuarioRepositorio } from "../repositorio/usuario_repositorio.js";

const usuarioRepositorio = new UsuarioRepositorio()

export class UsuarioServico {

    async criarUsuario(usuario) {
        const usuarioExists = await usuarioRepositorio.existsUsuario(usuario.usuario)

        if (usuarioExists) {
            throw ({ mensagem: 'Usuario ja existe', codigoHTTP: 400 })
        }

        const novoUsuario = {
            nome: usuario.nome,
            usuario: usuario.usuario,
            senha: usuario.senha
        }
        return await usuarioRepositorio.criarUsuario(novoUsuario)

    }

    async fazerLogin(usuario) {
        const usuarioRetornado = await usuarioRepositorio.buscarUsuario(usuario.usuario)

        if (!usuarioRetornado) {
            throw ({ mensagem: 'Usuario ou senha incorreta', codigoHTTP: 404 })
        }

        const seSenhaCoincide = await bcrypt.compare(usuario.senha, usuarioRetornado.senha)

        if (!seSenhaCoincide) {
            throw ({ mensagem: 'Usuario ou senha incorreta', codigoHTTP: 404 })
        } 

        return usuarioRetornado
    }
}