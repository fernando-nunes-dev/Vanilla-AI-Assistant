// src/js/script.js

import { DOM } from './dom.js';
import { UI } from './ui.js';
import { API } from './api.js';

function saveApiKey(key) {
    localStorage.setItem('hf_api_key', key);
}

function loadApiKey() {
    const savedKey = localStorage.getItem('hf_api_key');
    if (savedKey) {
        DOM.apiKeyInput.value = savedKey;
    }
}

function handleCopyResponse() {
    const textToCopy = DOM.responseContent.textContent;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            UI.showCopyFeedback();
        })
        .catch(err => {
            console.error('Falha ao copiar texto: ', err);
            alert('Não foi possível copiar o texto.');
        });
}

async function handleSendRequest() {
    const apiKey = DOM.apiKeyInput.value.trim();
    const prompt = DOM.promptInput.value.trim();

    saveApiKey(apiKey);
    UI.setLoadingState(true);

    try {
        const responseText = await API.getAIResponse(apiKey, prompt);
        UI.displayResponse(prompt, responseText);
    } catch (error) {
        UI.displayError(error.message);
    } finally {
        UI.setLoadingState(false);
    }
}

function init() {
    loadApiKey();
    DOM.sendButton.addEventListener('click', handleSendRequest);
    DOM.promptInput.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();
            handleSendRequest();
        }
    });

    DOM.clearButton.addEventListener('click', UI.clearAll);
    DOM.copyButton.addEventListener('click', handleCopyResponse);

    console.log('Aplicação iniciada e pronta.');
}

init();