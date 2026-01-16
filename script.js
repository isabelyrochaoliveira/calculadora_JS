const resultado = document.querySelector('.resultado');
const botoes = document.querySelectorAll('.botoes button');

let numeroAtual = "";
let primeiroOperador = null;
let operador = null;
let recomecar = false;

function atualizarResultado(limpar = false) {
    resultado.innerText = limpar ? "0" : numeroAtual.replace(".", ",");
}

function adicionarDigito(digito) {
    if (digito === "," && (numeroAtual.includes(",") || !numeroAtual)) return;

    if (recomecar) {
        numeroAtual = digito;
        recomecar = false;
    } else {
        numeroAtual += digito;
    }

    atualizarResultado();
}

function definirOperador(novoOperador) {
    if (numeroAtual) {
        calcular();
        primeiroOperador = parseFloat(numeroAtual.replace(",", "."));
        numeroAtual = "";
    }
    operador = novoOperador;
}

function calcular() {
    if (operador === null || primeiroOperador === null) return;
    let segundoOperador = parseFloat(numeroAtual.replace(",", "."));
    let valorFinal;

    switch (operador) {
        case "+":
            valorFinal = primeiroOperador + segundoOperador;
            break;
        case "-":
            valorFinal = primeiroOperador - segundoOperador;
            break;
        case "x":
            valorFinal = primeiroOperador * segundoOperador;
            break;
        case "/":
            valorFinal = primeiroOperador / segundoOperador;
            break;
        default:
            return;
    }

    if (valorFinal.toString().split(".")[1]?.length > 5) {
        numeroAtual = parseFloat(valorFinal.toFixed(5)).toString();
    } else {
        numeroAtual = valorFinal.toString();
    }

    operador = null;
    primeiroOperador = null;
    recomecar = true;
    atualizarResultado();
}

function limparCalculadora() {
    numeroAtual = "";
    primeiroOperador = null;
    operador = null;
    atualizarResultado(true);
}

function definirPorcentagem() {
    let result = parseFloat(numeroAtual) / 100;
    if (["+", "-"].includes(operador)) {
        result = result * (primeiroOperador || 1);
    }
    numeroAtual = result.toString();
    atualizarResultado();
}

botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const textoBotao = botao.innerText;

        if (/^[0-9]+$/.test(textoBotao) || textoBotao === ",") {
            adicionarDigito(textoBotao);
        } else if (["+", "-", "x", "/"].includes(textoBotao)) {
            definirOperador(textoBotao);
        } else if (textoBotao === "=") {
            calcular();
        } else if (textoBotao === "AC") {
            limparCalculadora();
        } else if (textoBotao === "+/-") {
            numeroAtual = (parseFloat(numeroAtual || primeiroOperador) * -1).toString();
            atualizarResultado();
        } else if (textoBotao === "%") {
            definirPorcentagem();
        }
    });
});