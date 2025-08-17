// src/js/script.js

// Importa os módulos necessários.
import { DOM } from './dom.js';
import { UI } from './ui.js';
import { API } from './api.js';

// Função que lida com a lógica de envio da requisição.
async function handleSendRequest() {
    const apiKey = DOM.apiKeyInput.value.trim();
    const prompt = DOM.promptInput.value.trim();

    UI.setLoadingState(true);

    try {
        const responseText = await API.getAIResponse(apiKey, prompt);
        UI.displayResponse(responseText);
    } catch (error) {
        UI.displayError(error.message);
    } finally {
        UI.setLoadingState(false);
    }
}

// Função de inicialização que configura os ouvintes de eventos.
function init() {
    DOM.sendButton.addEventListener('click', handleSendRequest);
    DOM.promptInput.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();
            handleSendRequest();
        }
    });
    console.log('Aplicação iniciada e pronta.');
}

// Inicia a aplicação.
init();