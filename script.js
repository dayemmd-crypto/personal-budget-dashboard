:root {
    --bg: #f8fafc;
    --card: #ffffff;
    --text-dark: #1e293b;
    --text-muted: #64748b;
    --primary: #0f172a;
    --accent: #10b981; /* Success Green */
    --accent-soft: #ecfdf5;
    --danger: #fb7185; /* Soft Rose */
    --warning: #f59e0b;
    --border: #e2e8f0;
}

body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background-color: var(--bg);
    color: var(--text-dark);
    margin: 0;
    padding: 0;
}

/* Nav */
.top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 2rem;
    background: var(--card);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
}

.brand { display: flex; align-items: center; gap: 10px; }
.brand h1 { font-size: 1.1rem; margin: 0; font-weight: 700; letter-spacing: -0.5px; }
.cfo-badge { font-size: 0.7rem; background: var(--primary); color: white; padding: 2px 6px; border-radius: 4px; vertical-align: middle; }

.nav-links { list-style: none; display: flex; gap: 1.5rem; }
.nav-links a { text-decoration: none; color: var(--text-muted); font-size: 0.9rem; font-weight: 500; cursor: pointer; }
.nav-links a.active { color: var(--primary); font-weight: 700; }

/* Layout */
#app-container { max-width: 1100px; margin: 2rem auto; padding: 0 1.5rem; }
.view-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.view-header h2 { font-size: 1.5rem; font-weight: 700; color: var(--primary); }

.card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }

/* KPI Cards */
.kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
.kpi-card { background: var(--card); border: 1px solid var(--border); padding: 1.2rem; border-radius: 12px; }
.kpi-card label { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600; }
.kpi-card .value { font-size: 1.4rem; font-weight: 700; margin-top: 5px; }
.kpi-card .value.highlight { color: var(--accent); }

/* Analytics Rows */
.analytics-row { display: grid; grid-template-columns: 1.5fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
@media (max-width: 768px) { .analytics-row { grid-template-columns: 1fr; } }

/* Ratios */
.ratio-item { margin-bottom: 1rem; }
.ratio-item span { font-size: 0.85rem; display: block; margin-bottom: 5px; }
.progress-bg { background: var(--bg); border-radius: 10px; height: 8px; position: relative; overflow: hidden; }
.progress-bg.large { height: 16px; margin-bottom: 10px; }
.progress-fill { background: var(--accent); height: 100%; transition: width 0.5s ease; }

/* Bar Chart (CSS-based) */
.bar-chart-v { display: flex; flex-direction: column; gap: 10px; margin-top: 1rem; }
.chart-row { display: flex; align-items: center; gap: 10px; font-size: 0.8rem; }
.chart-bar { background: var(--accent); height: 20px; border-radius: 4px; opacity: 0.8; }

/* Forms */
.form-card { background: var(--primary); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; }
.form-card form { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
input, select { padding: 10px; border: 1px solid var(--border); border-radius: 6px; font-size: 0.9rem; outline: none; }
.btn-primary { background: var(--accent); color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; }
.btn-outline { background: transparent; border: 1px solid var(--border); padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }

/* Tables */
.data-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
.data-table th { text-align: left; color: var(--text-muted); padding: 10px; border-bottom: 1px solid var(--border); }
.data-table td { padding: 12px 10px; border-bottom: 1px solid var(--border); }
.btn-del { color: var(--danger); background: none; border: none; cursor: pointer; }

/* Subs Grid */
.subs-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
.sub-card { border-left: 4px solid var(--accent); }

/* Helpers */
.mini-list { list-style: none; padding: 0; }
.mini-list li { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed var(--border); font-size: 0.85rem; }
