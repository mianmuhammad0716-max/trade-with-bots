// LOGIN LOGIC
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if (username) {
      localStorage.setItem('username', username);
      localStorage.setItem('balance', 1000);
      window.location.href = 'dashboard.html';
    } else {
      alert('Enter your name');
    }
  });
}

// DASHBOARD LOGIC
const welcomeMsg = document.getElementById('welcomeMsg');
const balanceEl = document.getElementById('balance');
const investBtn = document.getElementById('investBtn');
const investAmount = document.getElementById('investAmount');
const chartCanvas = document.getElementById('portfolioChart');
const botStatus = document.getElementById('botStatus');

if (welcomeMsg) welcomeMsg.innerText = `Welcome, ${localStorage.getItem('username') || 'User'}!`;

let balance = parseInt(localStorage.getItem('balance')) || 1000;
if (balanceEl) balanceEl.innerText = balance;

let portfolioData = [balance];
let labels = [0];

if (investBtn) {
  investBtn.addEventListener('click', () => {
    let amount = parseInt(investAmount.value) || 0;
    if (amount <= 0) { alert('Enter valid amount'); return; }

    let profit = Math.floor(amount * 0.13);
    balance += profit;
    localStorage.setItem('balance', balance);
    balanceEl.innerText = balance;

    portfolioData.push(balance);
    labels.push(labels.length);
    if (portfolioChart) portfolioChart.update();

    investAmount.value = '';
    botStatus.innerText = 'Bot processed investment...';
    setTimeout(() => { botStatus.innerText = 'Running...'; }, 1500);
  });
}

let portfolioChart;
if (chartCanvas) {
  const ctx = chartCanvas.getContext('2d');
  portfolioChart = new Chart(ctx, {
    type: 'line',
    data: { labels: labels, datasets: [{ label: 'Portfolio', data: portfolioData, borderColor: '#00f0ff', backgroundColor: 'rgba(0,240,255,0.2)', tension: 0.3, fill: true }] },
    options: { responsive: true, plugins: { legend: { labels: { color: '#e0e6f7' } } }, scales: { x: { ticks: { color: '#e0e6f7' } }, y: { ticks: { color: '#e0e6f7' } } } }
  });
}
