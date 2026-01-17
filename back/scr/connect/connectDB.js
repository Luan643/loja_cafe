import mongoose from "mongoose"

export default async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/projeto_loja")
    } catch (err) {
        console.log('Falha ao conectar no banco de dados')
    }
}