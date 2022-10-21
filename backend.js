const express = require('express')
const cors = require('cors')
const app = express()
// aplicar um middleware
app.use(express.json())
//aplicamos mais um middleware
app.use(cors())


// let e const
let filmes = [
  {
    titulo: 'Forrest Gump - O Contador de Histórias', 
    sinopse: 'Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções.'
  },
  {
    titulo: 'Um Sonho de Liberdade',
    sinopse: '"Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e o amante dela'
  }
]

//POST/////// --sa
//http://localhost:3000/filmes
app.post('/filmes', (req, res) => {
  //pegar o titulo existente na requisição
  const titulo = req.body.titulo
  //pegar a sinopse existente na requisição
  const sinopse = req.body.sinopse
  //construir um objeto JSON que representa um filme
  // const filme = {titulo: titulo, sinopse: sinopse}
  const filme = {titulo, sinopse}
  //adicionar o novo filme à coleção filmes
  filmes.push(filme)
  //responder ao cliente entregando a ele uma cópia da coleção de filmes atualizada
  res.json(filmes)  
})


//GET
//http://localhost:3000/filmes
//eis a lista de filmes..
app.get('/filmes', (req, res) => {
  res.json(filmes)
})


// http://localhost:3000/hey
//hey
app.get('/hey', (req, res) => {
  res.send('hey')
})

// arrow function
app.listen(3000, () => {console.log("Servidor em funcionamento...")})


