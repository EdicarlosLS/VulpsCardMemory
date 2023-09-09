import Cartao from "./cartao";
import Combinador from "./combinador";
import Timer from "./timer";

let combinador = new Combinador();

let valores = [
  "beijo",
  "coracao_partido",
  "decepcionado",
  "duvidando",
  "feliz",
  "legal",
  "lingua",
  "pidao",
  "piscando",
  "surpreso",
  "telefone",
  "zangado",
];
let cartoes = [];

let listaCartoes = document.querySelector("#cartoes");

function criarCartoesComValores(numeroDeCartoes) {
  //Criar pares de cartões
  for (let i = 0; i < numeroDeCartoes; i++) {
    const cartao = new Cartao(valores[i]);
    cartoes.push(cartao);
    const cartao2 = new Cartao(valores[i]);
    cartoes.push(cartao2);
  }

  //Embaralhar
  for (let j = 0; j < cartoes.length; j++) {
    
    let novaPosicao = Math.floor(Math.random() * cartoes.length);
    let aux = cartoes[j];
    cartoes[j] = cartoes[novaPosicao];
    cartoes[novaPosicao] = aux;
  }

  cartoes.forEach((cartao) => {
    listaCartoes.appendChild(criarCartao(cartao));
  });
}

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
timer.textContent = "0 : 00";

let t = new Timer(({ minutos, segundos }) => {
  timer.textContent = `${minutos} : ${segundos < 10 ? "0" : ""}${segundos}`;
});

let opcoes = document.querySelectorAll(".opcao");
let menu = document.querySelector("#menu");
opcoes.forEach((opcao, index) => {
  opcao.addEventListener("click", () => {
    t.iniciar();

    criarCartoesComValores((index + 1) * 4);

    timer.style.transform = "rotateX(0deg)";
    listaCartoes.style.height = `${(index + 1) * 540 - index * 60}px`;
    setTimeout(() => {
      listaCartoes.classList.add("jogando");
    }, 1000);

    menu.style.display = "none";
  });
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
