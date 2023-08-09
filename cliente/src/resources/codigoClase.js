const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const length = 7;

export const codigoClase = () => {
    var resultado = '';
    for (var i = length; i > 0; --i) resultado += chars[Math.round(Math.random() * (chars.length - 1))];
    return resultado;
}