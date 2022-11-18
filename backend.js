const bcrypt = require ('bcrypt')
const cors = require('cors')
const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require ('mongoose')
const uniqueValidator = require ('mongoose-unique-validator')

const app = express()
// aplicar um middleware
app.use(express.json())
//aplicamos mais um middleware
app.use(cors())

async function conectarAoMongoDB() {
await
mongoose.connect(`mongodb+srv://professorbossini:professorbossini@cluster0.wttmkyk.mongodb.net/?retryWrites=true&w=majority`)
}

const Filme = mongoose.model("Filme", mongoose.Schema({
  titulo: {type: String},
  sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema({
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

// let e const
// let filmes = [
//   {
//     titulo: 'Forrest Gump - O Contador de Histórias', 
//     sinopse: 'Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções.'
//   },
//   {
//     titulo: 'Um Sonho de Liberdade',
//     sinopse: '"Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e o amante dela'
//   }
// ]

//POST/////// --sa
//http://localhost:3000/filmes
app.post('/filmes', async (req, res) => {
  //pegar o titulo existente na requisição
  const titulo = req.body.titulo
  //pegar a sinopse existente na requisição
  const sinopse = req.body.sinopse
  //construir um objeto JSON que representa um filme
  // const filme = {titulo: titulo, sinopse: sinopse}

  const filme = new Filme({ titulo, sinopse })

  await filme.save()

  const filmes = await Filme.find()

  // const filme = {titulo, sinopse}
  //adicionar o novo filme à coleção filmes
  // filmes.push(filme)
  //responder ao cliente entregando a ele uma cópia da coleção de filmes atualizada
  res.json(filmes)  
})


//GET
//http://localhost:3000/filmes
//eis a lista de filmes..
app.get('/filmes', async (req, res) => {
  const filmes = await Filme.find()
  res.json(filmes)
})

app.post('/signup', async (req, res) => {
  try{
    //1. extrair login e senha da req
    const login = req.body.login
    const password = req.body.password
    const senhaCriptografada = await bcrypt.hash(password, 10)
    //2. construir um objeto Usuario usando o modelo da Mongoose
    const usuario = new Usuario({login, password: senhaCriptografada})
    //3. chamar o método save sobre o objeto construtor
    const respMongo = await usuario.save()
    console.log(respMongo)
    //4. encerrar o tratamento da requisição
    res.status(201).end()
  }
  catch (erro){
    console.log('Erro', erro)
    res.status(409).end()
  }
})

//GET: https://localhost:3000/login?login=joao&password=123456

//POST localhost:3000/login
app.post('/login', async (req, res) => {
  const {login, password} = req.body
  const u = await Usuario.findOne({login: login})
  if (!u){
    return res.status(401).json({mensagem: "login inválido"})
  }
  const senhaValida = await bcrypt.compare(password, u.password)
  if (!senhaValida)
    return res.status(401).json({mensagem: "senha inválida"})
  const token = jwt.sign({login: login}, 'chave-secreta', {expiresIn: '1h'})  
  res.status(200).json({token})
})

// arrow function
app.listen(3000, () => {
  try{
    conectarAoMongoDB()
    console.log("Servidor em funcionamento...")
  }
  catch (e){
    console.log("Erro", e)
  }
})


