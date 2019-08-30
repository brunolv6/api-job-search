const request = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

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
        let idx = 0;
        $('.vaga a').each( function () {
            vagasDisponiveis.push({
                id: idx,
                vaga: $(this).attr('title'),
                url: 'https://www.vagas.com.br' + $(this).attr('href')  
            });
            idx++;
        })

        return vagasDisponiveis;
    } catch {
        return "Erro na Requisição";
    }
}

app.post('/', function(req, res) {
    const { find } = req.body;

    //chama função que encontra vagas e retorna resposta da requisição
    encontrarVagas(find)
        .then(value => res.send(value))
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});