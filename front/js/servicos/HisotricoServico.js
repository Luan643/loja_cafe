import { getUsuarioId } from "../util.js";
import { BASE_URL    } from '../constantes.js'

export async function listarHistoricoDeCompras() {

    const usuarioId = await getUsuarioId()

    return fetch(`${BASE_URL}/historico/${usuarioId}`)
        .then(async function (res) {
            if (res.ok)
                return res.json()

            const erro = await res.text()
            throw `Falha ao consulta histórico de compras: ${erro}`
        })
}