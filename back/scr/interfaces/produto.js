import { model, Schema } from "mongoose";

const produtoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    }
})

export const ProdutoModel = model("produto", produtoSchema) 