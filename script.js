let products = [];

const productForm = document.getElementById('productForm');
const stockTableBody = document.getElementById('stockTableBody');
const salesChart = document.getElementById('salesChart').getContext('2d');
let chartInstance;

// Adicionar produto
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('productName').value;
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const sales = parseInt(document.getElementById('productSales').value);
    
    products.push({ name, quantity, sales });
    updateTable();
    updateChart();
    
    productForm.reset();
});

// Remover produto
function deleteProduct(index) {
    products.splice(index, 1);
    updateTable();
    updateChart();
}

// Atualizar tabela
function updateTable() {
    stockTableBody.innerHTML = '';
    
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.sales}</td>
            <td><button class="delete-btn" onclick="deleteProduct(${index})">Remover</button></td>
        `;
        stockTableBody.appendChild(row);
    });
}

// Atualizar gráfico
function updateChart() {
    if (chartInstance) {
        chartInstance.destroy();
    }

    const productNames = products.map(p => p.name);
    const productSales = products.map(p => p.sales);

    chartInstance = new Chart(salesChart, {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: 'Vendas',
                data: productSales,
                backgroundColor: '#3498db',
                borderColor: '#2980b9',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quantidade Vendida'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Produtos'
                    }
                }
            }
        }
    });
}
