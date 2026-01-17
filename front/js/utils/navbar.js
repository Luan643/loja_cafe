import { importarCss, irPara, notificar } from "../util.js"
import { abrirModal } from "./modal.js"

export class NavBar {

    constructor(esconderPesquisa, obrigatorioAutenticacao) {
        this.criarNavBar(esconderPesquisa, obrigatorioAutenticacao)
        this.import()
        importarCss('nav.css')
    }

    removerNavbar() {
        const body = document.querySelector('body')
        const navbar = document.getElementById('navbar')
        if (navbar)
            body.removeChild(navbar)
    }

    criarNavBar(esconderPesquisa, obrigatorioAutenticacao) {
        this.removerNavbar()
        const dadosUsuario = localStorage.getItem("usuarioDados")
        const estaNaHome = window.location.pathname.includes('home.html')

        if (!estaNaHome && !dadosUsuario && obrigatorioAutenticacao) {

            abrirModal({
                mensagem: 'Para acessar essa página é necessário fazer o login',
                botaoOkTxt: 'Fazer Login',
                botaoCancelarTxt: 'Voltar',
                callbackOk: () => {
                    irPara('login.html')
                },
                callbackCancelar: () => {
                    irPara('index.html')
                }
            })
            return
        }

        const usuarioObj = dadosUsuario ? JSON.parse(dadosUsuario) : undefined
        const loginTexto = dadosUsuario ? 'Sair' : 'Login'

        const template = `
            <h1 onclick="irPara('index.html')" class="logo">ShoopCoff</h1>
            ${esconderPesquisa ? '' : `
                    <div class="divPesquisar">
                        <input class="inputPesquisar" type="text" id="inputPesquisar">
                        <button class="nav-btn" id="butaoPesquisar" onclick="pesquisarProdutos()">Buscar</button>
                    </div>
                `
            }
            <nav>
                <p class="navHover" onclick="irPara('criarProduto.html')">Criar Produto</p>
                <p class="navHover" onclick="carrinho()">Carrinho</p>
                <p class="navHover" onclick="irPara('historico.html')">Histórico</p>
                <div id="login">
                    ${usuarioObj ? `<div>${usuarioObj.nome}</div>` : ""}
                    <button class="nav-btn" onclick="loginLogout()">${loginTexto}</button>
                </div>
            </nav>
        `

        const div = document.createElement('div')
        div.classList.add('navBar')
        div.setAttribute('id', 'navbar')
        div.innerHTML = template

        const body = document.querySelector('body')
        body.insertBefore(div, body.firstChild)
    }

    async loginLogout() {
        const dadosUsuario = localStorage.getItem("usuarioDados")

        if (dadosUsuario) {
            localStorage.removeItem("usuarioDados")
            await notificar("Você saiu da sua conta.", false)

            irPara('index.html')
        } else {
            irPara("login.html")
        }
    }

    async carrinho() {
        irPara("carrinho.html")
    }

    import() {
        window.irPara = irPara
        window.carrinho = this.carrinho
        window.loginLogout = () => this.loginLogout()
    }
}