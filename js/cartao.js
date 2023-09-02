export default class Cartao {
  static ESTADO_ESCONDIDO = "escondido";
  static ESTADO_VISIVEL = "visivel";

  #valor;
  #estado;

  constructor(valor) {
    this.#valor = valor;
    this.#estado = Cartao.ESTADO_ESCONDIDO;
  }

  valor(){
    return this.#valor;
  }

  estado(){
    return this.#estado;
  }

  esconder(){
    this.#estado = Cartao.ESTADO_ESCONDIDO;
  }

  mostrar(){
    this.#estado = Cartao.ESTADO_VISIVEL;
  }
}
