// Seletores do DOM
const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time-location p:nth-child(1)");
const dateandTimeField = document.querySelector(".time-location p:nth-child(2)");
const climaField = document.querySelector(".clima p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

// Adiciona o evento de submit ao formulário
form.addEventListener("submit", searchForLocation);

let targetLocation = "Faro"; // Localização padrão

// Função para buscar dados da API
const getAPIData = async (targetLocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=0305d2bf918348c998894956251203&q=${targetLocation}&aqi=no`;

    try {
        const res = await fetch(url);

        // Verifica se a resposta é válida
        if (!res.ok) {
            throw new Error(`Erro na requisição: ${res.status} ${res.statusText}`);
        }

        const data = await res.json(); // Converte a resposta para JSON
        console.log(data); // Exibe os dados no console para depuração

        // Verifica se os dados esperados existem
        if (data && data.location && data.location.name) {
            let locationName = data.location.name;
            let time = data.location.localtime;
            let temp = data.current.temp_c;
            let condition = data.current.condition.text;

            // Atualiza o DOM com os dados recebidos
            updateDetails(temp, time, locationName, condition);
        } else {
            console.error("Dados da localização não encontrados na resposta da API.");
        }
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
    }
};

// Função para atualizar o DOM
function updateDetails(temp, time, locationName, condition) {
    temperatureField.innerText = `${temp} ºC`; // Atualiza a temperatura
    locationField.innerText = locationName; // Atualiza a localização
    dateandTimeField.innerText = time; // Atualiza a data e hora
    climaField.innerText = condition; // Atualiza a condição do clima
}

// Função para lidar com o evento de submit do formulário
function searchForLocation(e) {
    e.preventDefault(); // Impede o comportamento padrão do formulário
    let target = searchField.value; // Obtém o valor do campo de pesquisa
    getAPIData(target); // Busca os dados da API para a localização digitada
}

// Busca os dados da API para a localização padrão ao carregar a página
getAPIData(targetLocation);