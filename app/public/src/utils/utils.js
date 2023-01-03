"use strict"

// Dependências
import moment from "moment";

// Formata um valor numérico para representação em reais
export function format_number_to_price(price) {
    return "R$ " + parseFloat(price).toFixed(2).replace('.', ',');
}

// Formata uma data
export function format_date_to_string(date){
    return moment(date).format('DD-MM-YYYY, hh:mm');
}

// Gera um inteiro aleatório no intervalo [0,max]
export function get_random_integer(max) {
    return Math.floor(Math.random() * max) + 1;
}

// Template de jogador
export function get_dummy_player() {
    return {id: -1, value: 0, name: 'none', balance: 0, filename: 'bag.png'};
}