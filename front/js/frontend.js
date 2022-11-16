const protocolo = 'http'
const baseURL = 'localhost:3000'
const filmesEndpoint = '/filmes'
const cadastroUsuarioEndpoint = '/signup'

async function obterFilmes() {
  const urlCompleta = `${protocolo}://${baseURL}${filmesEndpoint}`
  const filmes = (await axios.get(urlCompleta)).data
  let tabela = document.querySelector('.filmes')
  let corpoTabela = tabela.getElementsByTagName('tbody')[0]
  for (let filme of filmes) {
    let linha = corpoTabela.insertRow()
    let celulaTitulo = linha.insertCell(0)
    let celulaSinopse = linha.insertCell(1)
    celulaTitulo.innerHTML = filme.titulo
    celulaSinopse.innerHTML = filme.sinopse
  }
}

async function cadastrarFilme() {
  const urlCompleta = `${protocolo}://${baseURL}${filmesEndpoint}`
  let tituloInput = document.querySelector('#tituloInput')
  let sinopseInput = document.querySelector('#sinopseInput')
  let titulo = tituloInput.value
  let sinopse = sinopseInput.value
  if (titulo && sinopse) {
    tituloInput.value = ''
    sinopseInput.value = ''
    // const filme = {titulo, sinopse}
    const filmes = (await axios.post(urlCompleta, { titulo, sinopse })).data
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    corpoTabela.innerHTML = ''
    for (filme of filmes) {
      let linha = corpoTabela.insertRow(0)
      let celulaTitulo = linha.insertCell(0)
      let celulaSinopse = linha.insertCell(1)
      celulaTitulo.innerHTML = filme.titulo
      celulaSinopse.innerHTML = filme.sinopse
    }
  }
  else {
    let alert = document.querySelector('.alert')
    alert.classList.add('show')
    alert.classList.remove('d-none')
    setTimeout(() => {
      alert.classList.remove('show')
      alert.classList.add('d-none')
    }, 2000)

  }
}

async function cadastrarUsuario() {
  const usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
  const passwordCadastroInput = document.querySelector('#passwordCadastroInput')
  const usuarioCadastro = usuarioCadastroInput.value
  const passwordCadastro = passwordCadastroInput.value
  if (usuarioCadastro && passwordCadastro) {
    //já já faremos essa parte
    try {
      const URLCompleta = `${protocolo}://${baseURL}${cadastroUsuarioEndpoint}`
      await axios.post(
        URLCompleta,
        { login: usuarioCadastro, password: passwordCadastro }
      )
      usuarioCadastroInput.value = ""
      passwordCadastroInput.value = ""
      exibirAlerta('.alert-modal-cadastro', "Usuário cadastrado com sucesso", ['show', 'alert-success'], ['d-none'], 2000)
    }
    catch (erro) {
      exibirAlerta('.alert-modal-cadastro', "Erro ao cadastrar usuário", ['show', 'alert-danger'], ['d-none'], 2000)
    }
  }
  else {
    exibirAlerta('.alert-modal-cadastro', "Preencha todos os campos", ['show', 'alert-danger'], ['d-none'], 2000)
  }
}

function exibirAlerta(seletor, conteudo, classesAAdicionar, classeARemover, timeout) {
  //exibir um alerta instruindo o usuário a preencher todos os campos
  let alert = document.querySelector(seletor)
  alert.innerHTML = conteudo
  // alert.classList.add('show', 'alert-danger')
  alert.classList.add(...classesAAdicionar)
  alert.classList.remove(...classeARemover)
  setTimeout(() => {
    alert.classList.remove('show')
    alert.classList.add('d-none')
  }, timeout)
}
