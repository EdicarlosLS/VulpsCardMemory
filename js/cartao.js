export default class Cartao {
  static ESTADO_ESCONDIDO = "escondido";
  static ESTADO_VISIVEL = "visivel";

  #valor;
  #estado;
  #observadores;

  constructor(valor) {
    this.#valor = valor;
    this.#estado = Cartao.ESTADO_ESCONDIDO;
    this.#observadores = [];
  }

  valor() {
    return this.#valor;
  }

  estado() {
    return this.#estado;
  }

  esconder() {
    this.#estado = Cartao.ESTADO_ESCONDIDO;
    this.#notificar();
  }

  mostrar() {
    this.#estado = Cartao.ESTADO_VISIVEL;
    this.#notificar();
  }

  seInscrever(observador) {
    this.#observadores.push(observador);
  }

  #notificar() {
    this.#observadores.forEach((observador) => {
      observador(this);
    });
  }
}
