import { UsuarioRepositorio } from "../repositorio/usuario_repositorio.js";

async function criarUsuarioAdmin() {
    const repositorio = new UsuarioRepositorio()

    const usuario = 'admin'
    const usuarioBanco = await repositorio.existsUsuario(usuario)

    if (!usuarioBanco)
        repositorio.criarUsuario({
            nome: usuario,
            usuario: usuario,
            senha: usuario,
            eAdmin: true
        })
}

async function criarProdutos() {

}

export async function criarDados() {
    await criarUsuarioAdmin()
    await criarProdutos()
}

