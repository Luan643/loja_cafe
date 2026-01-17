import { UsuarioModel } from "../interfaces/usuario.js";
import bcrypt from "bcryptjs";

export class UsuarioRepositorio {

    async criarUsuario(usuario) {
        const senhaCriptografada = await bcrypt.hash(usuario.senha, 10)
        usuario.senha = senhaCriptografada

        const novoUsuario = new UsuarioModel(usuario)
        return await novoUsuario.save()
    }

    async existsUsuario(nomeUsuario){
        return await UsuarioModel.exists({usuario: nomeUsuario})
    }

    async buscarUsuario(usuario){
        return await UsuarioModel.findOne({usuario:usuario}) 
    }
}