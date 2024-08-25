console.log(' Aula 01 For Array \n')

var pessoas = [
    { nome: 'rodrigo', sexo: 'm' },
    { nome: 'ana', sexo: 'f' },
    { nome: 'arthur', sexo: 'm' },
]
console.log('Total de elementos: ' + pessoas.length + '\n')
// console.log( typeof pessoas)
for( item of pessoas ){ console.log(item) }