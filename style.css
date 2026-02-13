:root {
    --bg-color: #f4f6f8;
    --card-bg: #ffffff;
    --primary: #4a90e2;
    --accent: #50e3c2;
    --warn: #e25c5c;
    --text: #333333;
    --text-light: #777777;
    --border-radius: 8px;
    --shadow: 0 2px 5px rgba(0,0,0,0.05);
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

body {
    background-color: var(--bg-color);
    color: var(--text);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* Header & Nav */
header {
    background-color: var(--card-bg);
    padding: 1rem 2rem;
    box-shadow: var(--shadow);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
}

.logo {
    font-weight: bold;
    font-size: 1.2rem;
    color: var(--primary);
}

nav a {
    text-decoration: none;
    color: var(--text-light);
    margin-left: 1.5rem;
    font-size: 0.9rem;
    transition: color 0.2s;
}

nav a:hover, nav a.active {
    color: var(--primary);
    font-weight: 500;
}

/* Main Layout */
main {
    max-width: 800px;
    margin: 2rem auto;
    width: 90%;
    flex: 1;
}

/* View Toggling - Vital for SPA */
.view {
    animation: fadeIn 0.3s ease-in-out;
}

.hidden {
    display: none;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Forms */
.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-light);
}

input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
    font-size: 1rem;
}

button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 1rem;
    color: white;
    transition: opacity 0.2s;
}

button:hover { opacity: 0.9; }

.btn-primary { background-color: var(--primary); }
.btn-warn { background-color: var(--warn); }

/* Dashboard Cards */
.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.card {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    text-align: center;
}

.card h3 {
    font-size: 0.85rem;
    color: var(--text-light);
    margin-bottom: 0.5rem;
}

.card p {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text);
}

.controls {
    margin-bottom: 1rem;
    text-align: right;
}

/* Lists */
.data-list {
    list-style: none;
    margin-top: 1rem;
}

.data-list li {
    background: var(--card-bg);
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: var(--border-radius);
    display: flex;
    justify-content: space-between;
    box-shadow: var(--shadow);
}

.hint {
    color: var(--text-light);
    font-size: 0.8rem;
    margin-bottom: 1rem;
}
