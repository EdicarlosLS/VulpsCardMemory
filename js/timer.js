export default class Timer {
  #minutos;
  #segundos;
  #inicio;
  #notificavel;
  #idInterval;

  constructor(notificavel) {
    this.#minutos = 0;
    this.#segundos = 0;
    this.#notificavel = notificavel;
  }

  iniciar() {
    this.#inicio = new Date().getTime();
    this.#idInterval = setInterval(() => {
      this.#contaTempo();
    }, 1000);
  }

  parar() {
    clearInterval(this.#idInterval);
  }

  #contaTempo() {
    let atual = new Date().getTime();
    let tempoCorrido = atual - this.#inicio;
    this.#segundos = tempoCorrido / 1000;
    this.#minutos = Math.floor(this.#segundos / 60);
    this.#segundos = Math.floor(this.#segundos % 60);

    this.#notificavel({ minutos: this.#minutos, segundos: this.#segundos });
  }
}
