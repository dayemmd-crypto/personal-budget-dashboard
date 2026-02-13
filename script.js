/* Storage Keys */
const KEYS = {
    INCOME: 'calmFinance_incomes',
    EXPENSE: 'calmFinance_expenses',
    SUBS: 'calmFinance_subscriptions',
    DEBT: 'calmFinance_debt',
    SETTINGS: 'calmFinance_settings'
};

/* State Management */
const state = {
    incomes: JSON.parse(localStorage.getItem(KEYS.INCOME)) || [],
    expenses: JSON.parse(localStorage.getItem(KEYS.EXPENSE)) || [],
    subs: JSON.parse(localStorage.getItem(KEYS.SUBS)) || [],
    debt: JSON.parse(localStorage.getItem(KEYS.DEBT)) || [],
    settings: JSON.parse(localStorage.getItem(KEYS.SETTINGS)) || { currency: '$' }
};

/* --- 1. Navigation & Routing --- */
function router() {
    // Default to #dashboard if empty
    const hash = window.location.hash || '#dashboard';
    
    // Hide all sections
    document.querySelectorAll('.view').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));

    // Show target section
    const target = document.querySelector(hash);
    if (target) {
        target.classList.remove('hidden');
    }
    
    // Highlight nav link
    const navLink = document.querySelector(`nav a[href="${hash}"]`);
    if (navLink) navLink.classList.add('active');

    // Trigger specific view renders
    if (hash === '#dashboard') renderDashboard();
    if (hash === '#income') renderList(state.incomes, 'incomeList');
    if (hash === '#expenses') renderList(state.expenses, 'expenseList');
    if (hash === '#subs') renderList(state.subs, 'subsList');
    if (hash === '#debt') renderList(state.debt, 'debtList');
    if (hash === '#reports') renderReports();
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
    // Set default month input to current month (YYYY-MM)
    const today = new Date().toISOString().slice(0, 7);
    const monthInput = document.getElementById('dashboardMonth');
    if(monthInput) {
        monthInput.value = today;
        monthInput.addEventListener('change', renderDashboard);
    }
    
    // Init settings
    const currInput = document.getElementById('currencyInput');
    if(currInput) currInput.value = state.settings.currency;

    router();
});

/* --- 2. Data Persistence Helper --- */
function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function formatMoney(amount) {
    return `${state.settings.currency}${parseFloat(amount).toFixed(2)}`;
}

/* --- 3. Form Handling --- */
function handleForm(formId, dataKey, storageKey, processFn) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const entry = Object.fromEntries(formData.entries());
        
        // Add ID and Timestamp
        entry.id = Date.now();
        entry.created_at = new Date().toISOString();

        // Push to state
        state[dataKey].push(entry);
        
        // Save to Storage
        save(storageKey, state[dataKey]);
        
        // UI Feedback
        form.reset();
        alert('Saved successfully!');
        
        // Refresh Current View
        router(); 
    });
}

// Initialize Forms
handleForm('incomeForm', 'incomes', KEYS.INCOME);
handleForm('expenseForm', 'expenses', KEYS.EXPENSE);
handleForm('subsForm', 'subs', KEYS.SUBS);
handleForm('debtForm', 'debt', KEYS.DEBT);

/* Settings Form */
document.getElementById('settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    state.settings.currency = document.getElementById('currencyInput').value || '$';
    save(KEYS.SETTINGS, state.settings);
    alert('Settings Saved');
    router(); // refresh to show new currency
});

document.getElementById('clearDataBtn').addEventListener('click', () => {
    if(confirm('Are you sure? This will wipe all data.')) {
        localStorage.clear();
        location.reload();
    }
});

/* --- 4. Render Logic --- */

function renderDashboard() {
    const monthInput = document.getElementById('dashboardMonth');
    const selectedMonth = monthInput.value; // YYYY-MM

    // Filter by selected month
    const currentIncomes = state.incomes.filter(i => i.date.startsWith(selectedMonth));
    const currentExpenses = state.expenses.filter(e => e.date.startsWith(selectedMonth));

    // Calculate Totals
    const totalInc = currentIncomes.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    const totalExp = currentExpenses.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    
    // Subs are assumed monthly recurring
    const totalSubs = state.subs.reduce((sum, item) => sum + parseFloat(item.cost), 0);

    const net = totalInc - (totalExp + totalSubs);

    // Update UI
    document.getElementById('totalIncome').textContent = formatMoney(totalInc);
    document.getElementById('totalExpenses').textContent = formatMoney(totalExp);
    document.getElementById('totalSubs').textContent = formatMoney(totalSubs);
    document.getElementById('netBalance').textContent = formatMoney(net);
    
    // Simple color coding
    const netEl = document.getElementById('netBalance');
    netEl.style.color = net >= 0 ? 'var(--primary)' : 'var(--warn)';
}

function renderList(dataArray, listId) {
    const list = document.getElementById(listId);
    if (!list) return;
    list.innerHTML = '';

    // Sort by date desc (if date exists) or id
    const sorted = [...dataArray].sort((a,b) => (b.date || b.id) > (a.date || a.id) ? 1 : -1);

    sorted.forEach(item => {
        const li = document.createElement('li');
        // Determine label based on type
        const mainText = item.source || item.category || item.name || 'Entry';
        const amt = item.amount || item.cost || item.total;
        const date = item.date ? `<small>${item.date}</small>` : '';
        
        li.innerHTML = `
            <div><strong>${mainText}</strong> <br> ${date}</div>
            <div>${formatMoney(amt)}</div>
        `;
        list.appendChild(li);
    });
}

function renderReports() {
    const output = document.getElementById('reportOutput');
    const countI = state.incomes.length;
    const countE = state.expenses.length;
    const countD = state.debt.length;
    
    output.innerHTML = `
        <div class="card">
            <h3>Database Statistics</h3>
            <p>Income Entries: ${countI}</p>
            <p>Expense Entries: ${countE}</p>
            <p>Active Debts: ${countD}</p>
        </div>
    `;
}
