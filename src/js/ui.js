// src/js/ui.js

// Importa os elementos do DOM para poder manipulá-los.
import { DOM } from './dom.js';

// Exporta um objeto com funções que controlam a interface.
export const UI = {
    setLoadingState(isLoading) {
        if (isLoading) {
            DOM.buttonText.classList.add('hidden');
            DOM.buttonLoading.classList.remove('hidden');
            DOM.sendButton.disabled = true;
        } else {
            DOM.buttonText.classList.remove('hidden');
            DOM.buttonLoading.classList.add('hidden');
            DOM.sendButton.disabled = false;
        }
    },

    displayResponse(text) {
        DOM.responseSection.classList.remove('hidden');
        DOM.responseContent.textContent = text;
    },

    displayError(message) {
        this.displayResponse(`Erro: ${message}`);
    }
};