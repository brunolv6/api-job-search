const request = require('request-promise');
const cheerio = require('cheerio');

let url = 'https://www.vagas.com.br/vagas-de';

//-desenvolvedor-react?

const search = "desenvolvedor react".split(" ");

search.map(palavra => {
    url = url + "-" + palavra;
})

url = url + "?";

console.log(search);

//outra forma de declaração
//async function vagas(){...}
const vagas = async () => {
    //faz requisição do url e o carrega para análise
    const response = await request(url);
    const $ = await cheerio.load(response);
    //percorre cada uma das vagas e aloca o nome de cada uma no array vagasDisponiveis
    let vagasDisponiveis = [];
    $('.vaga a').each( function () {
        vagasDisponiveis.push($(this).attr('title'));
    })

    console.log(vagasDisponiveis);
}

vagas();
