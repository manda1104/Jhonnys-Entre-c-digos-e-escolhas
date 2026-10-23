export function aleatorio(lista) {
  const posicao = Math.floor(Math.random() * lista.length);
  return lista[posicao];
}

const nomes = ["Jhonnys", "Lucas", "Marina", "Beatriz", "Rafael", "Camila"];
export const nome = aleatorio(nomes);
