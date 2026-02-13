// --- INITIALIZATION ---
// Load data from LocalStorage or start with empty arrays
let income = JSON.parse(localStorage.getItem('income')) || [];
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let subs = JSON.parse(localStorage.getItem('subs')) || [];
const INITIAL_DEBT = 42000;

// Update the UI on first load
document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
    renderLists();
});

// --- NAVIGATION LOGIC ---
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// --- FORM SUBMISSIONS ---

// Handle Income
document.getElementById('income-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const entry = {
        id: Date.now(),
        date: document.getElementById('inc-date').value,
        source: document.getElementById('inc-source').value,
        amount: parseFloat(document.getElementById('inc-amount').value),
        notes: document.getElementById('inc-notes').value
    };
    income.push(entry);
    saveAndRefresh();
    e.target.reset();
});

// Handle Expenses
document.getElementById('expense-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const entry = {
        id: Date.now(),
        date: document.getElementById('exp-date').value,
        category: document.getElementById('exp-category').value,
        amount: parseFloat(document.getElementById('exp-amount').value),
        notes: document.getElementById('exp-notes').value
    };
    expenses.push(entry);
    saveAndRefresh();
    e.target.reset();
});

// Handle Subscriptions
document.getElementById('sub-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const entry = {
        id: Date.now(),
        name: document.getElementById('sub-name').value,
        cycle: document.getElementById('sub-cycle').value,
        amount: parseFloat(document.getElementById('sub-amount').value),
        renewal: document.getElementById('sub-month').value
    };
    subs.push(entry);
    saveAndRefresh();
    e.target.reset();
});

// --- CALCULATIONS & UI UPDATES ---

function saveAndRefresh() {
    localStorage.setItem('income', JSON.stringify(income));
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('subs', JSON.stringify(subs));
    updateDashboard();
    renderLists();
}

function updateDashboard() {
    const currentMonth = new Date().getMonth();
    
    // Calculate Monthly Totals (Simplified for this month)
    const totalInc = income.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExp = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    
    // Debt Calculation: Initial - Total of expenses categorized as "Debt"
    const debtPayments = expenses
        .filter(e => e.category === 'Debt')
        .reduce((acc, curr) => acc + curr.amount, 0);
    const currentDebt = INITIAL_DEBT - debtPayments;

    // Subscriptions Total
    const subMonthlyTotal = subs.reduce((acc, curr) => {
        return acc + (curr.cycle === 'yearly' ? curr.amount / 12 : curr.amount);
    }, 0);

    // Update DOM
    document.getElementById('dash-income').innerText = `${totalInc.toLocaleString()} EGP`;
    document.getElementById('dash-expenses').innerText = `${totalExp.toLocaleString()} EGP`;
    document.getElementById('dash-balance').innerText = `${(totalInc - totalExp).toLocaleString()} EGP`;
    document.getElementById('dash-debt').innerText = `${currentDebt.toLocaleString()} EGP`;
    document.getElementById('debt-remaining').innerText = `${currentDebt.toLocaleString()} EGP`;
    document.getElementById('sub-total-val').innerText = subMonthlyTotal.toFixed(2);

    // Update Progress Bar (Expenses vs Income)
    const percentage = totalInc > 0 ? (totalExp / totalInc) * 100 : 0;
    document.getElementById('budget-progress').style.width = `${Math.min(percentage, 100)}%`;
}

function renderLists() {
    // Render Income List
    const incList = document.getElementById('income-list');
    incList.innerHTML = income.map(i => `
        <li>
            <span><strong>${i.source}</strong> <br><small>${i.date}</small></span>
            <span>${i.amount} EGP</span>
        </li>
    `).join('');

    // Render Expense List
    const expList = document.getElementById('expense-list');
    expList.innerHTML = expenses.map(e => `
        <li>
            <span><strong>${e.category}</strong> <br><small>${e.notes || e.date}</small></span>
            <span>-${e.amount} EGP</span>
        </li>
    `).join('');

    // Render Subscription List
    const subList = document.getElementById('sub-list');
    subList.innerHTML = subs.map(s => `
        <li>
            <span><strong>${s.name}</strong> (${s.cycle})</span>
            <span>${s.amount} EGP</span>
        </li>
    `).join('');
}
