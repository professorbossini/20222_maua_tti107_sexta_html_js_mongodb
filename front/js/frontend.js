const protocolo = 'http'
const baseURL = 'localhost:3000'
const filmesEndpoint = '/filmes'
const cadastroUsuarioEndpoint = '/signup'
const loginEndpoint = '/login'

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
    exibirAlerta('.alert-filme', 'Filme cadastrado com sucesso', ['show', 'alert-success'], ['d-none'], 2000)
  }
  else {
    exibirAlerta(
      '.alert-filme', 
      'Preencha todos os campos',
      ['show', 'alert-danger'],
      ['d-none'],
      2000
    )


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
      ocultarModal('#modalCadastro', 2000)
    }
    catch (erro) {
      exibirAlerta('.alert-modal-cadastro', "Erro ao cadastrar usuário", ['show', 'alert-danger'], ['d-none'], 2000)
      ocultarModal('#modalCadastro', 2000)
      
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

//arrow function
const ocultarModal = (seletor, timeout) => {
  //setTimeout é uma função de alta ordem
  //programação funcional
  setTimeout(() => {
    const modal = bootstrap.Modal.getInstance(
      document.querySelector(seletor)
    )
    modal.hide()
  }, timeout)  
}

const fazerLogin = async () => {
  //fazer referência ao input em que o usuário digita o login
  const usuarioLoginInput = document.querySelector('#usuarioLoginInput')
  //fazer referência ao input em que o usuário digita a senha
  const passwordLoginInput = document.querySelector('#passwordLoginInput')
  //pegar o login digitado
  const usuarioLogin = usuarioLoginInput.value
  //pegar a senha digitada
  const passwordLogin = passwordLoginInput.value
  //usuário digitou os dois valores?
  if (usuarioLogin && passwordLogin){
    try{
      const URLCompleta = `${protocolo}://${baseURL}${loginEndpoint}`
      const resposta = (await axios.post(URLCompleta, {login: usuarioLogin, password: passwordLogin})).data
      console.log(resposta)
      usuarioLoginInput.value = ''
      passwordLoginInput.value = ''
      exibirAlerta(
        '.alert-modal-login',
        'Login efetuado com sucesso',
        ['show', 'alert-success'],
        ['d-none'],
        2000
      )
      ocultarModal('#modalLogin', 2000)
      const cadastrarFilmeButton = 
        document.querySelector('#cadastrarFilmeButton')
      cadastrarFilmeButton.disabled = false
      const loginLink = document.querySelector('#loginLink')
      loginLink.innerHTML = `Olá, ${usuarioLogin}! Fazer Logoff!`
    }
    catch (erro){
      exibirAlerta(
        '.alert-modal-login',
        'Erro ao fazer login',
        ['show', 'alert-danger'],
        ['d-none'],
        2000
      )
    }
  }
  else{
    exibirAlerta(
        '.alert-modal-login',
        'Preencha todos os campos',
        ['show', 'alert-danger'],
        ['d-none'],
        2000
    )
  }
}
