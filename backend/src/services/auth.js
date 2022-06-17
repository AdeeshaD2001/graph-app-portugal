// arquivo que contem a rotina de criptografar o password do usuario
// usando o pacote bcrypt
import bcrypt from "bcryptjs";

export const createPassorwdHash = (password) => { // cria uma arrow function que recebe o argumento (password) e retorna o hash gerado pelo bcrypt com 8 salts.
    return bcrypt.hash(password, 8);
}

export const checkPasswor = (user, password) => { // checa se o password é valido usando os passwords cryptografados.
    return bcrypt.compare(password,user.password);
}
