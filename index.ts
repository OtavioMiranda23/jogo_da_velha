import * as readline from 'readline'


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Qual o seu nome?", (pergunta) => {
    console.log("Olá", pergunta);
    rl.close();
})