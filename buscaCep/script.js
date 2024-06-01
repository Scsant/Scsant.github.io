// Função para consultar o CEP
function consultarCEP() {
    const cep = document.getElementById('cep').value;
    const resultDiv = document.getElementById('result');

    if (cep.length !== 8 || isNaN(cep)) {
        resultDiv.innerHTML = '<p style="color: red;">CEP inválido. Por favor, insira um CEP válido com 8 dígitos.</p>';
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                resultDiv.innerHTML = '<p style="color: red;">CEP não encontrado.</p>';
            } else {
                resultDiv.innerHTML = `
                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Localidade:</strong> ${data.localidade}</p>
                    <p><strong>UF:</strong> ${data.uf}</p>
                `;
            }
        })
        .catch(error => {
            resultDiv.innerHTML = '<p style="color: red;">Erro ao consultar o CEP. Tente novamente mais tarde.</p>';
            console.error('Erro ao consultar o CEP:', error);
        });
}

// Função para consultar o endereço
function consultarEndereco() {
    const estado = document.getElementById('estado').value;
    const cidade = document.getElementById('cidade').value;
    const logradouro = document.getElementById('logradouro').value;
    const resultDiv = document.getElementById('result-endereco');

    if (estado.length !== 2 || cidade.length < 3 || logradouro.length < 3) {
        resultDiv.innerHTML = '<p style="color: red;">Por favor, insira um estado (UF) válido com 2 letras, cidade e logradouro com pelo menos 3 caracteres cada.</p>';
        return;
    }

    const url = `https://viacep.com.br/ws/${estado}/${cidade}/${logradouro}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0 || data.erro) {
                resultDiv.innerHTML = '<p style="color: red;">Endereço não encontrado.</p>';
            } else {
                let resultHTML = '';
                data.forEach(endereco => {
                    resultHTML += `
                        <p><strong>CEP:</strong> ${endereco.cep}</p>
                        <p><strong>Logradouro:</strong> ${endereco.logradouro}</p>
                        <p><strong>Bairro:</strong> ${endereco.bairro}</p>
                        <p><strong>Localidade:</strong> ${endereco.localidade}</p>
                        <p><strong>UF:</strong> ${endereco.uf}</p>
                        <hr>
                    `;
                });
                resultDiv.innerHTML = resultHTML;
            }
        })
        .catch(error => {
            resultDiv.innerHTML = '<p style="color: red;">Erro ao consultar o endereço. Tente novamente mais tarde.</p>';
            console.error('Erro ao consultar o endereço:', error);
        });
}
