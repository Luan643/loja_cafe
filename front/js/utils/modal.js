import { importarCss } from "../util.js"

export function abrirModal({ mensagem, botaoOkTxt, botaoCancelarTxt, callbackOk, callbackCancelar }) {
    importarCss('modal.css')
    const template = `
            <div id="modal">
                <p class="mensagem">${mensagem}</p>
                <div class="botoes">
                    ${botaoOkTxt && callbackOk? `<button onclick="callbackModalOk()">${botaoOkTxt}</button>`: ''}
                    ${botaoCancelarTxt && callbackCancelar? `<button onclick="callbackModalCancelar()">${botaoCancelarTxt}</button>`: ''}
                </div>
            </div>
        `

    const div = document.createElement('div')
    div.setAttribute('id', 'modal-overlay')
    div.innerHTML = template

    window.callbackModalOk = () => {
        body.removeChild(div)
        callbackOk()
    }

    window.callbackModalCancelar = () => {
        body.removeChild(div)
        callbackCancelar()
    }

    const body = document.querySelector('body')
    body.insertBefore(div, body.firstChild)
}