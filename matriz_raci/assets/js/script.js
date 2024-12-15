
        // Ajusta a altura do textarea dinamicamente
        function adjustTextareaHeight(textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = (textarea.scrollHeight) + 'px';
        }

        // Adiciona uma nova linha à tabela
        function addRow() {
            const table = document.getElementById('raciTable').getElementsByTagName('tbody')[0];
            const rowCount = table.rows.length;

            // Verifica se já há 12 linhas (pois a 12ª será a próxima a ser adicionada)
            if (rowCount === 12) {
                // Mostra um alerta solicitando confirmação
                if (confirm("Você está adicionando mais que 12 atividades. Isso compromete a qualidade da impressão. Deseja continuar?")) {
                    insertNewRow(table);
                }
            } else {
                // Se não atingiu o limite de 12 linhas, adiciona normalmente
                insertNewRow(table);
            }
        }

        // Função auxiliar para inserir uma nova linha na tabela
        function insertNewRow(table) {
            const newRow = table.insertRow();
            const colCount = table.rows[0].cells.length;

            for (let i = 0; i < colCount; i++) {
                const newCell = newRow.insertCell(i);
                if (i === 0) {
                    newCell.innerHTML = '<textarea oninput="adjustTextareaHeight(this)">Nova Atividade</textarea>';
                } else {
                    newCell.innerHTML = '<textarea oninput="adjustTextareaHeight(this)">*</textarea>';
                }
                newCell.classList.add('bold-black');
            }
        }

        // Remove a última linha da tabela (exceto se houver apenas uma linha)
        function removeRow() {
            const table = document.getElementById('raciTable').getElementsByTagName('tbody')[0];
            const rowCount = table.rows.length;
            if (rowCount > 1) {
                table.deleteRow(rowCount - 1);
            } else {
                alert("A tabela deve ter ao menos uma atividade.");
            }
        }

        // Salva as alterações feitas na tabela
        function saveChanges() {
            // Atualiza o conteúdo dos textareas na tabela original
            const textareas = document.querySelectorAll('.raci-table tbody .bold-black textarea');
            textareas.forEach(textarea => {
                textarea.textContent = textarea.value; // Atualiza o conteúdo para corresponder à entrada do usuário
            });

            // Clona o conteúdo HTML original incluindo estilos e scripts
            const clonedHtml = document.documentElement.cloneNode(true);

            // Cria um Blob a partir do conteúdo clonado
            const blob = new Blob([clonedHtml.outerHTML], { type: 'text/html' });

            // Cria um URL temporário e link de download
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'matriz_rci.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        // Função para imprimir a página atual
        function saveAndPrint() {
            window.print();
        }