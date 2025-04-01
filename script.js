document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const notepad = document.getElementById('notepad');
    const boldBtn = document.getElementById('bold-btn');
    const italicBtn = document.getElementById('italic-btn');
    const underlineBtn = document.getElementById('underline-btn');
    const strikethroughBtn = document.getElementById('strikethrough-btn');
    const ulBtn = document.getElementById('ul-btn');
    const olBtn = document.getElementById('ol-btn');
    const downloadBtn = document.getElementById('download-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const saveStatus = document.getElementById('save-status');
    const counter = document.getElementById('counter');

    // Load saved content from localStorage
    function loadContent() {
        const savedContent = localStorage.getItem('notepadContent');
        if (savedContent) {
            notepad.innerHTML = savedContent;
        }
    }

    // Save content to localStorage
    function saveContent() {
        localStorage.setItem('notepadContent', notepad.innerHTML);
        saveStatus.textContent = 'Saved at ' + new Date().toLocaleTimeString();
        setTimeout(() => {
            saveStatus.textContent = 'Ready';
        }, 2000);
    }

    // Set up auto-save
    function setupAutoSave() {
        setInterval(saveContent, 1000);
    }

    // Text formatting functions
    function formatText(command, value = null) {
        document.execCommand(command, false, value);
        notepad.focus();
    }

    // Button click handlers
    boldBtn.addEventListener('click', () => formatText('bold'));
    italicBtn.addEventListener('click', () => formatText('italic'));
    underlineBtn.addEventListener('click', () => formatText('underline'));
    strikethroughBtn.addEventListener('click', () => formatText('strikeThrough'));
    
    ulBtn.addEventListener('click', () => formatText('insertUnorderedList'));
    olBtn.addEventListener('click', () => formatText('insertOrderedList'));

    // Keyboard shortcuts
    notepad.addEventListener('keydown', function(e) {
        if (e.ctrlKey) {
            switch(e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    formatText('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    formatText('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    formatText('underline');
                    break;
                case 's':
                    e.preventDefault();
                    formatText('strikeThrough');
                    break;
            }
        }
    });

    // Download functionality
    downloadBtn.addEventListener('click', function() {
        const content = notepad.innerHTML;
        const blob = new Blob([content], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notepad-content.html';
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    });

    // Word and character counter
    function updateCounter() {
        const text = notepad.innerText || '';
        const charCount = text.length;
        const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        counter.textContent = `${wordCount} words, ${charCount} characters`;
    }

    // Theme toggle functionality
    function toggleTheme() {
        const isDarkMode = document.body.classList.toggle('dark-theme');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Update icon
        themeToggleBtn.innerHTML = isDarkMode ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
        
        themeToggleBtn.title = isDarkMode ? 
            'Switch to Light Mode' : 
            'Switch to Dark Mode';
    }

    // Load saved theme preference
    function loadThemePreference() {
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'true') {
            document.body.classList.add('dark-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggleBtn.title = 'Switch to Light Mode';
        }
    }

    // Event listeners for new features
    themeToggleBtn.addEventListener('click', toggleTheme);
    notepad.addEventListener('input', updateCounter);

    // Initialize
    loadContent();
    setupAutoSave();
    loadThemePreference();
    updateCounter();
    notepad.focus();
});
