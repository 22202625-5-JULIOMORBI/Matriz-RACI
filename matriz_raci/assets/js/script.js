// Ajusta a altura do textarea dinamicamente
function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

// Adiciona uma nova linha à tabela
function addRow() {
    const table = document.getElementById('raciTable').getElementsByTagName('tbody')[0];
    const rowCount = table.rows.length;

    // Verifica se há mais de 12 linhas
    if (rowCount >= 12) {
        if (!confirm("Você está adicionando mais de 12 atividades. Isso pode comprometer a qualidade da impressão. Deseja continuar?")) {
            return;
        }
    }

    const newRow = table.insertRow();
    const colCount = table.rows[0].cells.length;

    for (let i = 0; i < colCount; i++) {
        const newCell = newRow.insertCell(i);
        newCell.innerHTML = `<textarea oninput="adjustTextareaHeight(this)">Nova Atividade</textarea>`;
        newCell.classList.add('bold-black');
    }
}

// Remove a última linha da tabela
function removeRow() {
    const table = document.getElementById('raciTable').getElementsByTagName('tbody')[0];
    if (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 1);
    } else {
        alert("A tabela deve ter ao menos uma linha.");
    }
}

// Exporta a tabela como CSV
function exportCSV() {
    const table = document.getElementById('raciTable');
    let csvContent = "";

    // Cabeçalhos
    const headers = Array.from(table.querySelectorAll("thead th:not([colspan])")).map(header => header.innerText.trim());
    csvContent += headers.join(",") + "\n";

    // Corpo
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach(row => {
        const cells = Array.from(row.cells).map(cell => `"${cell.querySelector("textarea").value.trim()}"`);
        csvContent += cells.join(",") + "\n";
    });

    // Download do CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "matriz_rci.csv";
    a.click();
}

// Exporta a tabela como PDF
function exportPDF() {
    const table = document.getElementById('raciTable');
    const doc = new jsPDF();

    // Configuração para AutoTable
    const rows = [];
    const headers = Array.from(table.querySelectorAll("thead th:not([colspan])")).map(header => header.innerText.trim());

    table.querySelectorAll("tbody tr").forEach(row => {
        const rowData = Array.from(row.cells).map(cell => cell.querySelector("textarea").value.trim());
        rows.push(rowData);
    });

    // Geração do PDF com AutoTable
    doc.autoTable({
        head: [headers],
        body: rows,
        theme: 'grid',
        styles: { fontSize: 10 },
    });

    doc.save('matriz_rci.pdf');
}

// Imprime a página
function saveAndPrint() {
    window.print();
}
