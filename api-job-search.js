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
        let idxi = 0;
        $('.vaga a').each( function () {
            vagasDisponiveis.push({
                id: idxi,
                vaga: $(this).attr('title'),
                url: 'https://www.vagas.com.br' + $(this).attr('href')  
            });
            idxi++;
        })

        return vagasDisponiveis;
    } catch {
        return "Erro na Requisição";
    }
}

let idx = 0;

const vagasKenoby = async () => {
    try{
        let vagasPorEmpresa = { 
            sympla: { 
                nome: 'sympla',
                vagas: []
            },
            ifood: {
                nome: 'ifood',
                vagas: []
            },
            movile: {
                nome: 'movile',
                vagas: []
            },
            kenoby: {
                nome: 'kenoby',
                vagas: []
            },
            creditas: {
                nome: 'creditas',
                vagas: []
            },
            stone: {
                nome: 'stone',
                vagas: []
            },
            stefanini: {
                nome: 'stefanini',
                vagas: []
            },
            wiz: {
                nome: 'wiz',
                vagas: []
            },
            vlivagas: {
                nome: 'vlivagas',
                vagas: []
            },
            grupoxp: {
                nome: 'grupoxp',
                vagas: []
            },
            gruponetshoes: {
                nome: 'gruponetshoes',
                vagas: []
            },
            alelo: {
                nome: 'alelo',
                vagas: []
            },
            bancointer: {
                nome: 'bancointer',
                vagas: []
            },
            PlayKids: {
                nome: 'PlayKids',
                vagas: []
            },
            docket: {
                nome: 'docket',
                vagas: []
            },
            beblue: {
                nome: 'beblue',
                vagas: []
            }
        }
    /*     let idx = 0; */

        for( let key in vagasPorEmpresa ){
            console.log(vagasPorEmpresa[key].nome);

            let url = 'https://jobs.kenoby.com/'+ vagasPorEmpresa[key].nome + '/position';
            
            let response = await request(url);
            let $ = await cheerio.load(response);

            let num = idx;

            $('.segment a').each(function(){
                vagasPorEmpresa[key].vagas.push({
                    id: idx,
                    segmento: $(this).attr('data-segment'),
                    vaga: $(this).attr('data-title'),
                    estado: $(this).attr('data-state'),
                    cidade: $(this).attr('data-city'),
                    url: $(this).attr('href')
                })
                idx++;
            })
            console.log(idx-num);
        }
        console.log("Total: " + idx);
        return vagasPorEmpresa;
    } catch {
        return "Erro na requisição"
    }
}

const vagasGuby = async () => {
    try{
        let vagasPorEmpresa = { 
            b2w: { 
                nome: 'b2w',
                vagas: []
            },
            amedigital: { 
                nome: 'amedigital',
                vagas: []
            },
            vagasewave: { 
                nome: 'vagasewave',
                vagas: []
            },
            inmetrics: { 
                nome: 'inmetrics',
                vagas: []
            },
            confitec: { 
                nome: 'confitec',
                vagas: []
            },
            totvs: { 
                nome: 'totvs',
                vagas: []
            },
            infoprice: { 
                nome: 'infoprice',
                vagas: []
            },
            olist: { 
                nome: 'olist',
                vagas: []
            },
            ali: { 
                nome: 'ali',
                vagas: []
            },
            elaw: { 
                nome: 'elaw',
                vagas: []
            },
            dasa: { 
                nome: 'dasa',
                vagas: []
            }
        }
        
    /*     let idx = 0; */

        for (let key in vagasPorEmpresa){
            console.log(vagasPorEmpresa[key].nome);
            let num = idx;

            let url = 'https://' + vagasPorEmpresa[key].nome + '.gupy.io/';
            
            let response = await request(url);
            let $ = await cheerio.load(response);

            $('.job-list tr').each(function(){
                let estadoVaga = "não identificado"
                //lembrar do BREAK
                switch($(this).attr('data-workplace')){
                    case "Rio de Janeiro":{
                        estadoVaga = "RJ";
                        break;
                    }
                    case "Santo André":
                    case "São José":
                    case "Osasco":
                    case "São Caetano do Sul":
                    case "Itapevi":
                    case "Jundiaí":
                    case "Vinhedo":
                    case "Barueri":
                    case "Santana de Parnaíba":
                    case "São Paulo":{
                        estadoVaga = "SP";
                        break;
                    }
                    case "Belo Horizonte":
                    case "Uberlândia":{
                        estadoVaga = "MG";
                        break;
                    }
                    case "Maringá":
                    case "Curitiba":{
                        estadoVaga = "PR";
                        break;
                    }
                    case "Brasília":{
                        estadoVaga = "DF";
                        break;
                    }
                    case "Brusque":
                    case "Joinville":
                    case "Itapema":{
                        estadoVaga = "SC";
                        break;
                    }
                    case "Caxias do Sul":
                    case "Porto Alegre":{
                        estadoVaga = "RS";
                        break;
                    }
                    case "Salvador":{
                        estadoVaga = "BA";
                        break;
                    }
                    case "Goiânia":{
                        estadoVaga = "GO";
                        break;
                    }
                    case "Aracaju":{
                        estadoVaga = "SE";
                        break;
                    }
                    default:{
                        estadoVaga = estadoVaga
                    }
                }
                vagasPorEmpresa[key].vagas.push({
                    id: idx,
                    segmento: $(this).attr('data-department'),
                    vaga: $(this).find('.title').text(),
                    cidade: $(this).attr('data-workplace'),
                    estado: estadoVaga,
                    url: 'https://' + vagasPorEmpresa[key].nome + '.gupy.io' + $(this).find('a').attr('href')
                })
                idx++;
            })
            console.log(idx-num);
        }
        console.log("Total:" + idx);
        return vagasPorEmpresa;
    }catch{
        return "Erro na requisição"
    }
}

app.get('/', function(req, res) {
    res.send('The api is working');
})

app.post('/', function(req, res) {
    const { find } = req.body;

    //chama função que encontra vagas e retorna resposta da requisição
    encontrarVagas(find)
        .then(value => res.send(value))
})

const procurarVagas = async () => {
    let vagas = []

    await vagasKenoby()
        .then(value => vagas.push(value))
    await vagasGuby()
        .then(value => vagas.push(value))
    
    return vagas;
}

app.post('/vagas-ifood', function(req, res){
    const { find } = req.body;

    procurarVagas().then(value=> res.send(value))
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

