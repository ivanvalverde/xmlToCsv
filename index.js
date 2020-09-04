//Importando a extensão para a conversão

const parseString = require('xml2js').parseString;

//Importando File system para a ler as linhas e escrever um novo arquivo

let fs = require('fs'),

//Importando o módulo de readline para criar uma interface de leitura capaz de ler linha por linha do documento

readline = require('readline');

//Criando a interface para a leitura do documento com diversos XMLs

let rd = readline.createInterface({
    input: fs.createReadStream('goalsTest.xml'),
    console: false
});

//Realizando operações necessárias para separar as TAGs escolhidas pelo operador escolhido (no exemplo ',').
//Caso aconteça algum erro durante a operação, o sistema informará através de uma msg "Error"

rd.on('line', function(line) {
    
   parseString(line, (err, resultado) => {
       try{
            for (v of resultado.goal.value) {
                fs.appendFile('newCsvFile.csv', `${v.player1},${v.elapsed},${v.player2},${v.id}\n`, function (err) {
                    if (err) throw err;
                    console.log('Updated!');
                  });
            }
        } catch(error){
            console.log("Error");
        }
    });
});
