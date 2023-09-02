import Cartao from "./cartao";

export default class Combinador {
  #cartoes = [];

  adicionar(cartao) {
    if (cartao.estado() != Cartao.ESTADO_ESCONDIDO) {
      return;
    }

    cartao.mostrar();
    this.#cartoes.push(cartao);
    console.log(this.#cartoes);
  }

  combinar() {
    if (!this.#estaCheio()) {
      return;
    }

    if (this.#cartoes[0].valor() == this.#cartoes[1].valor()) {
      console.log("combinou");
    } else {
      console.log("nao combina");
      this.#cartoes[0].esconder();
      this.#cartoes[1].esconder();
    }

    this.#cartoes = [];
  }

  #estaCheio() {
    return this.#cartoes.length > 1;
  }
}
