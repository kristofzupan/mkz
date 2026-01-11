/**
 * Language Switcher for Bilingual Website
 * Switches between English (en) and Slovene (sl)
 */
// Get the current language from localStorage or default to English
let currentLang = localStorage.getItem('language') || 'sl';
// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    setupLanguageSwitcher();
});
/**
 * Initialize the page with the saved or default language
 */
function initializeLanguage() {
    setLanguage(currentLang);
}
/**
 * Set up event listeners for language buttons
 */
function setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
            // Save preference to localStorage
            localStorage.setItem('language', lang);
        });
    });
}
/**
 * Switch to the specified language
 * @param {string} lang - Language code ('en' or 'sl')
 */
function setLanguage(lang) {
    currentLang = lang;
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    // Update active button state
    updateButtonStates(lang);
    // Update all content based on language
    updateContent(lang);
}
/**
 * Update the active state of language buttons
 * @param {string} lang - Current language code
 */
function updateButtonStates(lang) {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}
/**
 * Update all translatable content on the page
 * @param {string} lang - Current language code
 */
function updateContent(lang) {
    // Update elements with data-lang attribute (content blocks)
    // We strictly target .lang-content to avoid hiding the buttons themselves which also have data-lang
    const contentElements = document.querySelectorAll('.lang-content[data-lang]');
    contentElements.forEach(element => {
        const elementLang = element.getAttribute('data-lang');
        if (elementLang === lang) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });
    // Update elements with data-en and data-sl attributes (inline text)
    const translateElements = document.querySelectorAll('[data-en][data-sl]');
    translateElements.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            element.textContent = translation;
        }
    });
}
/**
 * Get the current language
 * @returns {string} Current language code
 */
function getCurrentLanguage() {
    return currentLang;
}
// Make functions available globally if needed
window.languageSwitcher = {
    setLanguage,
    getCurrentLanguage
};