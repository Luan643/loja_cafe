import { model, Schema } from "mongoose";

const historicoCarrinhoSchema = new Schema({
    
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true,
        unique: true
    },
    produtos: [{
        produto: { 
            type: Schema.Types.ObjectId,
            ref: 'produto',
            required: true
        },
        quantidade: {
            type: Number,
            required: true,
            default: 1
        }
    }],

});

export const HistoricoCarrinhoModel = model("Historico_carrinho", historicoCarrinhoSchema)