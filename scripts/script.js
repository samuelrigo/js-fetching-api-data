const cep =  document.getElementById('cep')
const botaoBuscarCep = document.getElementById('buscar_cep')
const cidade = document.getElementById('cidade')
const logradouro = document.getElementById('endereco')
const estado = document.getElementById('estado')
const bairro = document.getElementById('bairro')
const mensagemErro = document.getElementById('erro')

mensagemErro.innerHTML = ""

async function buscaEndereco(cep){
    try{
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    var consultaCEPConvertida = await consultaCEP.json()
    if(consultaCEPConvertida.erro) {
        throw Error('CEP não existente!')
    }
    mensagemErro.innerHTML = ""

    cidade.value = consultaCEPConvertida.localidade
    logradouro.value = consultaCEPConvertida.logradouro
    estado.value = consultaCEPConvertida.uf
    bairro.value = consultaCEPConvertida.bairro

    return consultaCEPConvertida
} catch(erro) {
    mensagemErro.innerHTML = ` <p>CEP inválido. Tente novamente! </p>`
}
}

botaoBuscarCep.addEventListener('click', () => buscaEndereco(cep.value))
cep.addEventListener('focusout', () => {
    mensagemErro.innerHTML = ""
})