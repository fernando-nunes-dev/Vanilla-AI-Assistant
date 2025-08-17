// src/js/dom.js

// Exporta um objeto contendo todas as referências aos elementos da página.
export const DOM = {
    apiKeyInput: document.getElementById('apiKey'),
    promptInput: document.getElementById('prompt'),
    sendButton: document.getElementById('sendButton'),
    buttonText: document.querySelector('.button-text'),
    buttonLoading: document.querySelector('.button-loading'),
    responseSection: document.getElementById('responseSection'),
    responseContent: document.getElementById('responseContent'),
};