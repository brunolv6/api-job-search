const request = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//outra forma de declaração
//async function vagas(){...}
const encontrarVagas = async (find) => {
    try{
        let url = 'https://www.vagas.com.br/vagas-de';

        const search = find.split(" ");

        search.map(palavra => {
            url = url + "-" + palavra;
        })

        url = url + "?";

        //faz requisição do url e o carrega para análise
        const response = await request(url);
        const $ = await cheerio.load(response);
        //percorre cada uma das vagas e aloca o nome de cada uma no array vagasDisponiveis
        let vagasDisponiveis = [];
        $('.vaga a').each( function () {
            vagasDisponiveis.push($(this).attr('title'));
        })

        return vagasDisponiveis;
    } catch {
        return "Erro na Requisição";
    }
}

app.get('/', function(req, res) {
    const { find } = req.body;

    //chama função que encontra vagas e retorna resposta da requisição
    encontrarVagas(find)
        .then(value => res.send(value))
})

app.listen(3000);