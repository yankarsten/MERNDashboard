import mongoose from 'mongoose';

var userSchema = mongoose.Schema(
  {
    imagem: {
      type: String,
      required: false,
    },
    nome: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    nascimento: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);