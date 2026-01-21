import { Schema, model } from "mongoose"

const usuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true, 
    },
    eAdmin: {
        type: Boolean
    }  
})

export const UsuarioModel = model('usuario', usuarioSchema)