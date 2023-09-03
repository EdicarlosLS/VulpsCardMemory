import Cartao from "./cartao";
import Combinador from "./combinador";

let combinador = new Combinador();

let valores = ["A", "X", "C", "Y", "E", "Z"];
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
  cartao.textContent = _cartao.valor();
  cartao.classList.add("cartao");


  _cartao.seInscrever((cart)=>{
    if(cart.estado() == Cartao.ESTADO_VISIVEL){
      cartao.classList.add("visivel");
    } else {
      cartao.classList.remove("visivel");
    }
  });

  cartao.addEventListener("click", () => {
    combinador.adicionar(_cartao);
    setTimeout(() => {
      combinador.combinar();
    }, 3000); 
  });
  return cartao;
}



