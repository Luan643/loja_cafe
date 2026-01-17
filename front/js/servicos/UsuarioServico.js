import { BASE_URL } from "../constantes.js"
import { notificar } from "../util.js"

export async function autenticar({ usuario, senha }) {

    if (!usuario || !senha)
        throw 'Usuário e senha são obrigatórios para fazer login'

    const loginForm = {
        usuario: usuario,
        senha: senha
    }

    return fetch(`${BASE_URL}/usuario/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm)
    }).then(async res => {
        if (res.ok)
            return res.json()

        throw `Erro: ${await res.text()}`
    })

}

export async function cadastrarUsuario({ nome, usuario, senha }) {

    if (!nome || !usuario || !senha)
        throw "Nome usuário e senha são valores obrigatórios para cadastrar um usuário!"

    const usuarioCadastro = {
        nome,
        usuario,
        senha
    };

    return fetch(`${BASE_URL}/usuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioCadastro)
    })
    .then(async function (res) {
        if (res.ok) {
            notificar("Usuário criado com sucesso!");
            return await res.json()
        } else {
            const erroMsg = await res.text();
            notificar("Erro: " + erroMsg, true);
        }
    })
}