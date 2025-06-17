// Função para buscar e exibir os dados do clima
function buscarClima() {
    // --- CONFIGURAÇÕES ---
    const apiKey = '2d50bfea27be143e31514b7217ffbb8e'; 
    const cidade = 'Brasília,BR'; 

    // Monta a URL da API
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    // Elemento HTML onde as informações serão exibidas
    const infoClimaDiv = document.getElementById('info-clima');

    // --- CHAMADA DA API ---
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível obter os dados. Verifique a chave da API e a cidade.');
            }
            return response.json();
        })
        .then(data => {
            // Extrai as informações que queremos mostrar
            const temperatura = data.main.temp;
            const descricao = data.weather[0].description;
            const icone = data.weather[0].icon;
            const velocidadeVento = data.wind.speed;
            const umidade = data.main.humidity;

            // Cria o HTML que será inserido na página
            const climaHtml = `
                <div class="clima-item">
                    <img src="https://openweathermap.org/img/wn/${icone}@2x.png" alt="Ícone do tempo">
                    <p class="descricao-tempo">${descricao}</p>
                </div>
                <div class="clima-item">
                    <p><strong>Temperatura:</strong> ${temperatura.toFixed(1)} °C</p>
                    <p><strong>Vento:</strong> ${(velocidadeVento * 3.6).toFixed(1)} km/h</p>
                    <p><strong>Umidade:</strong> ${umidade}%</p>
                </div>
            `;

            // Insere o HTML gerado na nossa div
            infoClimaDiv.innerHTML = climaHtml;
        })
        .catch(error => {
            console.error('Erro na API:', error);
            infoClimaDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
}

// Chama a função para executar quando a página carregar
document.addEventListener('DOMContentLoaded', buscarClima);