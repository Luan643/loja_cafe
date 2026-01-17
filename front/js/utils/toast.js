import { importarCss } from "../util.js";

let toastId = 1
let toasts = []

const fecharToast = (id) => {
    const toast = toasts.find(t => t.id === id)
    if (!toast) return;

    clearTimeout(toast.timeoutReferencia)
    toasts = toasts.filter(t => t.id !== id)

    const container = document.getElementById('toast')
    container.removeChild(toast.referencia)
}

export function carregarToastContainer() {
    importarCss('toast.css')
    window.fecharToast = (id) => fecharToast(id)

    const container = document.createElement('div')
    container.setAttribute('id', 'toast')

    const body = document.querySelector('body')
    body.appendChild(container)
}

export function criarToast(mensagem) {
    const id = toastId++

    const template = `
        <span onclick="fecharToast(${id})">X</span>
        <p>${mensagem}</p>
    `

    const toast = document.createElement('div')
    toast.classList.add('toast-mensagem')
    toast.innerHTML = template
    const container = document.getElementById('toast')
    container.appendChild(toast)

    const timeoutReferencia = setTimeout(() => {
        if (container.contains(toast))
            fecharToast(id)
    }, 3000)

    toasts.push({
        id,
        referencia: toast,
        timeoutReferencia
    })

}