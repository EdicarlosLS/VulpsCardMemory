import Cartao from "./cartao";
import Combinador from "./combinador";
import Timer from "./timer";

let combinador = new Combinador();

let valores = [
  "beijo",
  "zangado",
];
let cartoes = [];

criarCartoesComValores();

function criarCartoesComValores() {
  valores.forEach((valor) => {
    const cartao = new Cartao(valor);
    cartoes.push(cartao);
    const cartao2 = new Cartao(valor);
    cartoes.push(cartao2);
  });
}

let listaCartoes = document.querySelector("#cartoes");
cartoes.forEach((cartao) => {
  listaCartoes.appendChild(criarCartao(cartao));
});

function criarCartao(_cartao) {
  let cartao = document.createElement("li");
  cartao.classList.add("cartao");

  let imgFrente = document.createElement("img");
  imgFrente.setAttribute("src", `./img/${_cartao.valor()}.png`);
  imgFrente.classList.add("frente");

  cartao.appendChild(imgFrente);

  let divVerso = document.createElement("div");
  divVerso.classList.add("verso");

  cartao.appendChild(divVerso);

  _cartao.seInscrever((cart) => {
    if (cart.estado() == Cartao.ESTADO_VISIVEL) {
      cartao.classList.add("visivel");
    } else {
      cartao.classList.remove("visivel");
    }
  });

  cartao.addEventListener("click", () => {
    combinador.adicionar(_cartao);
    setTimeout(() => {
      combinador.combinar();
      viraramTodos();
    }, 2000);
  });
  return cartao;
}
let timer = document.querySelectorAll(".timer")[0];
timer.textContent = "Iniciar";

let t = new Timer(({ minutos, segundos }) => {
  timer.textContent = `${minutos} : ${segundos < 10 ? "0" : ""}${segundos}`;
});

timer.addEventListener("click", () => {
  t.iniciar();
  listaCartoes.classList.add("jogando");
  listaCartoes.style.height = "1480px";
});

function viraramTodos() {
  let temAlgumEscondido = cartoes.some((cartao) => {
    return cartao.estado() == Cartao.ESTADO_ESCONDIDO;
  });

  if (!temAlgumEscondido) {
    t.parar();
    listaCartoes.classList.remove("jogando");
    listaCartoes.style.height = "250px";
    timer.classList.add("finalizou");
  }
}
