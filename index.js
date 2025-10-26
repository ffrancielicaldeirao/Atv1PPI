import http from 'http';
import url, {URLSearchParams} from 'url';
import { Script } from 'vm';

const host = 'localhost';
const porta = 3000;

function responderRequisicao(requisicao, resposta)
{
    if(requisicao.method === "GET")
    {
        const dados = new URLSearchParams(url.parse(requisicao.url).query);
        const nome = dados.get('Nome');
        const sobrenome = dados.get('Sobrenome');
        const idade = dados.get('Idade');
        const matricula = dados.get('Mat');
        const salario = dados.get('Sal');
        const anoContrato = dados.get('AnoCont');
        const  sexo  =  dados.get('Sexo') ;
        
        resposta.setHeader('Content-type','text/html');
        resposta.write('<html>');
        resposta.write('<head>');
        resposta.write('<meta charset="UTF-8">');
        resposta.write('<title>Resposta </title>');
        resposta.write('<style> body{background-color:lightcoral; justify-content: center; align-items: center; font-family:sans-serif;} h1{text-align:center} div{justify-self:center; background-color:white; padding: 30px;border-radius: 12px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);max-width: 70%;width: 100%;} .erradoss{color: mediumvioletred; text-decoration: underline; } </style>');
        resposta.write('</head>');
        resposta.write('<body>');
        resposta.write('<div style="margin-top:60px"><h1> Atividade de reajuste de salário</h1><p style="text-align: center;">Seja bem vindo (a)!</p>');
        resposta.write('<p>Insira as informações do Funcionário: <strong>Nome, Sobrenome, Idade, Sexo  (M/F), Salário base, Ano de contratação e Matrícula</strong> no endereço da página.<br> Exemplo: http://localhost:3000/?Nome=Francieli&Sobrenome=Aparecida&Idade=26&Sexo=F&Sal=4000&AnoCont=2018&Mat=4130 </p><p class="erradoss">');

        var Corretos=1;

        if(  !nome || !sobrenome ){
            Corretos=0;
            resposta.write('<br> Insira o Nome e o Sobrenome!');
        }
        
        var idadenum = Number(idade);

        if(idadenum<=16){
            Corretos=0;
            resposta.write('<br> Idade tem que ser maior que 16!');
        }
        
        if( sexo != 'F' &&  sexo != 'M'){
            Corretos=0;
            resposta.write('<br> Sexo tem que ser M ou F!');
        }

        var floatsal = Number(salario);
        if(floatsal<=0){
            Corretos=0;
            resposta.write('<br> Salário tem que ser positivo!');
        }

        var anonumero = Number(anoContrato);
        if(anonumero<=1960){
            Corretos=0;
            resposta.write('<br> Ano de contratação tem que ser maior que 1960!');
        }

        var matnumero = Number(matricula);
        if(matnumero<0){
            resposta.write('<br>Matrícula tem que ser um numero positivo!');  
            Corretos=0;  
        }
        if(!Number.isInteger(matnumero)){
            resposta.write('<br>Matrícula tem que ser um numero inteiro!');
            Corretos=0;
        }  
        
        var tempotrabalhado=2025-anonumero;

        var reajuste;

        var salarioajustado;

        if(idadenum>=18 || idadenum<=39){
            if( sexo == 'M'){
                reajuste=floatsal/100*10;
                if(tempotrabalhado<=10)
                {
                    salarioajustado=floatsal+reajuste-10;
                }
                else
                    salarioajustado=floatsal+reajuste+17;
            }
            if( sexo == 'F'){
                reajuste=floatsal/100*8;
                if(tempotrabalhado<=10)
                {
                    salarioajustado=floatsal+reajuste-11;
                }
                else
                    salarioajustado=floatsal+reajuste+16;
            }
        }
        if(idadenum>=40 || idadenum<=69){
            if( sexo == 'M') {
                reajuste=floatsal/100*8;
                if(tempotrabalhado<=10){
                    salarioajustado=floatsal+reajuste-5;
                }
                else
                    salarioajustado=floatsal+reajuste+15;
            }
            if( sexo == 'F'){
                reajuste=floatsal/100*10;
                if(tempotrabalhado<=10){
                    salarioajustado=floatsal+reajuste-7;
                }
                else
                    salarioajustado=floatsal+reajuste+14;
            }
        }
        if(idadenum>=70 || idadenum<=99){
            if( sexo == 'M'){
                reajuste=floatsal/100*15;
                if(tempotrabalhado<=10){
                    salarioajustado=floatsal+reajuste-15;
                }
                else
                    salarioajustado=floatsal+reajuste+13;
            }
            if( sexo == 'F'){
                reajuste=floatsal/100*17;
                if(tempotrabalhado<=10)
                {
                    salarioajustado=floatsal+reajuste-17;
                }
                else
                    salarioajustado=floatsal+reajuste+12;
            }
        }
        if(Corretos){
            resposta.write('</p><br>Nome: '+nome+' '+sobrenome);
            resposta.write('<br>Idade: '+idadenum);
            resposta.write('<br> Sexo :  '+ sexo ); 
            resposta.write('<br>Salário base: R$'+floatsal);
            resposta.write('<br>Ano de Contratação: '+anonumero);
            resposta.write('<br>Matricula: '+matnumero);
            resposta.write('<br><strong>Seu novo Salário é: R$'+salarioajustado+'</strong>');
        }
        resposta.write('</div></body>');
        resposta.write('</html>');
        resposta.end();
    }
}
const servidor= http.createServer(responderRequisicao);

servidor.listen(porta, host, () =>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
});