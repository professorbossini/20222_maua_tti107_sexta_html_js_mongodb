const protocolo = 'http'
const baseURL = 'localhost:3000'
const filmesEndpoint = '/filmes'

function obterFilmes() {
  const urlCompleta = `${protocolo}://${baseURL}${filmesEndpoint}`
  // promise
  axios.get(urlCompleta).then((res) => {

  })
  

}