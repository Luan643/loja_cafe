import { criarToast } from "./utils/toast.js"

export async function executarRequisicao(requisicao) {
    try {
        return await requisicao()
    } catch (err) {
        criarToast(err)
        throw err
    }
}

export async function irPara(pagina) {
    window.location.href = `/front/paginas/${pagina}`
}

export async function notificar(mensagem, eErro) {
    if (eErro)
        console.error(mensagem)
    else
        console.log(mensagem)
}

export async function notificarModal(mensagem, options) {
    if (eErro)
        console.error(mensagem)
    else
        console.log(mensagem)
}

export async function getUsuarioId() {
    const usuarioDadosJSON = localStorage.getItem("usuarioDados")

    if (!usuarioDadosJSON) {
        localStorage.setItem('ultimaPagina', `${window.location.pathname}`.replace('/', ''))
        await notificar('Antes de acessar essa funcionalidade, faça o login')
        //irPara('login.html')
    }

    const usuarioDadosJS = JSON.parse(usuarioDadosJSON)
    return usuarioDadosJS._id
}

export function importarCss(css) {
    
    if (document.querySelector(`link[href*="${css}"]`))
        return;
    
    const href = `../css/${css}`
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    document.head.appendChild(link);
}

export async function dispararEvento({ nome, data }) {
    const evento = new CustomEvent(nome, {
        detail: {
            data
        }
    })
    document.dispatchEvent(evento)
}