import { model, Schema } from "mongoose";

const carrinhoSchema = new Schema({
    
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

export const CarrinhoModel = model("carrinho", carrinhoSchema)