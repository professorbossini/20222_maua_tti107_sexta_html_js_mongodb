const protocolo = 'http'
const baseURL = 'localhost:3000'
const filmesEndpoint = '/filmes'

async function obterFilmes() {
  const urlCompleta = `${protocolo}://${baseURL}${filmesEndpoint}`
  const filmes = (await axios.get(urlCompleta)).data
  let tabela = document.querySelector('.filmes')
  let corpoTabela = tabela.getElementsByTagName('tbody')[0]
  for (let filme of filmes){
    let linha = corpoTabela.insertRow()
    let celulaTitulo = linha.insertCell(0)  
    let celulaSinopse = linha.insertCell(1)
    celulaTitulo.innerHTML = filme.titulo
    celulaSinopse.innerHTML = filme.sinopse
  }
}

async function cadastrarFilme(){
  const urlCompleta = `${protocolo}://${baseURL}${filmesEndpoint}`
  let tituloInput = document.querySelector('#tituloInput')
  let sinopseInput = document.querySelector('#sinopseInput')
  let titulo = tituloInput.value
  let sinopse = sinopseInput.value
  if (titulo && sinopse){
    tituloInput.value = ''
    sinopseInput.value = ''
    // const filme = {titulo, sinopse}
    const filmes = (await axios.post(urlCompleta, {titulo, sinopse})).data
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    corpoTabela.innerHTML = ''
    for (filme of filmes){
      let linha = corpoTabela.insertRow(0)
      let celulaTitulo = linha.insertCell(0)
      let celulaSinopse = linha.insertCell(1)
      celulaTitulo.innerHTML = filme.titulo
      celulaSinopse.innerHTML = filme.sinopse  
    }
  }
  else{
    let alert = document.querySelector('.alert')
    alert.classList.add('show')
    alert.classList.remove('d-none')
    setTimeout(() => {
      alert.classList.remove('show')
      alert.classList.add('d-none')
    }, 2000)

  }



}
