const configure = {
    cellSize: "60px",
    colors: {
        x0: "#fff",
        x1: "#fff",
        marked: "red",
        Rows: "#fff",
        Cols: "#fff",
        xaxis: "#fff",   
        yaxis: "#fff"   
    }
};

function applyConfigurations() {
    document.documentElement.style.setProperty("--cell-size", configure.cellSize);
    document.documentElement.style.setProperty("--color-x0", configure.colors.x0);
    document.documentElement.style.setProperty("--color-x1", configure.colors.x1);
    document.documentElement.style.setProperty("--color-Rows", configure.colors.Rows);
    document.documentElement.style.setProperty("--color-cols", configure.colors.Cols);
    document.documentElement.style.setProperty("--color-xaxis", configure.colors.xaxis);
    document.documentElement.style.setProperty("--color-yaxis", configure.colors.yaxis);
}

function createGridPanel(gridId) {
    const gridPanel = document.createElement('div');
    gridPanel.className = 'grids';
    gridPanel.innerHTML = `
        <h3>Grid Coloring Panel ${gridId}</h3>
        <div class="controls">
            <label>Rows: <input type="number" class="rows" min="1"></label>
            <label>Columns: <input type="number" class="cols" min="1"></label>
            <label>X: <input type="number" class="inputX" min="1" disabled></label>
            <label>Y: <input type="number" class="inputY" min="1" disabled></label><br><br>
            <div class="buttons">
                <button class="generate">Generate</button>
                <button class="mark" disabled>Mark</button>
                <button class="clear" disabled>Clear</button>
                <button class="reset" disabled>Reset</button>
            </div>
        </div>
        <div class="grid"></div>
    `;
    document.getElementById("container").appendChild(gridPanel);

    const selectors = {
        grid: gridPanel.querySelector(".grid"),
        rowsInput: gridPanel.querySelector(".rows"),
        colsInput: gridPanel.querySelector(".cols"),
        inputX: gridPanel.querySelector(".inputX"),
        inputY: gridPanel.querySelector(".inputY"),
        generateBtn: gridPanel.querySelector(".generate"),
        markBtn: gridPanel.querySelector(".mark"),
        clearBtn: gridPanel.querySelector(".clear"),
        resetBtn: gridPanel.querySelector(".reset")
    };

    let cellData = [];
    let rowCount = 0;
    let colCount = 0;

    function drawGrid() {
        rowCount = parseInt(selectors.rowsInput.value);
        colCount = parseInt(selectors.colsInput.value);

        if (isNaN(rowCount) || isNaN(colCount) || rowCount <= 0 || colCount <= 0) {
            alert("Please enter valid positive numbers for Rows and Columns.");
            return;
        }

        selectors.grid.style.gridTemplateColumns = `repeat(${colCount}, var(--cell-size))`;
        selectors.grid.style.gridTemplateRows = `repeat(${rowCount}, var(--cell-size))`;
        selectors.grid.innerHTML = '';
        cellData = [];

        for (let x = rowCount; x >= 1; x--) {
            for (let y = 1; y <= colCount; y++) {
                const value = Math.round(Math.random());
                cellData.push({ x, y, value });

                const cell = document.createElement('div');
                cell.className = 'cell ' + (value === 1 ? 'x1' : 'x0');
                cell.textContent = `(${x},${y})`;
                selectors.grid.appendChild(cell);
            }
        }

        selectors.inputX.disabled = false;
        selectors.inputY.disabled = false;

        selectors.inputX.setAttribute('max', rowCount);
        selectors.inputY.setAttribute('max', colCount);

        selectors.markBtn.disabled = false;
        selectors.clearBtn.disabled = false;
        selectors.resetBtn.disabled = false;
        selectors.generateBtn.disabled = true;
    }

    function markCell() {
        const x = parseInt(selectors.inputX.value);
        const y = parseInt(selectors.inputY.value);

        if (isNaN(x) || isNaN(y) || x < 1 || y < 1 || x > rowCount || y > colCount) {
            alert(`Enter valid X-(1-${rowCount}) & Y-(1-${colCount})`);
            return;
        }

        const index = (rowCount - x) * colCount + (y - 1);

        selectors.grid.querySelectorAll('.cell').forEach(cell => cell.classList.remove('marked'));
        selectors.grid.children[index]?.classList.add('marked');
    }

    function clearGrid() {
        selectors.grid.querySelectorAll('.cell').forEach((cell, i) => {
            const { value, x, y } = cellData[i];
            cell.className = `cell ${value === 1 ? 'x1' : 'x0'}`;
            cell.textContent = `(${x},${y})`;
        });
    }

    function resetGrid() {
        selectors.grid.innerHTML = '';
        selectors.rowsInput.value = '';
        selectors.colsInput.value = '';
        selectors.inputX.value = '';
        selectors.inputY.value = '';

        selectors.inputX.disabled = true;
        selectors.inputY.disabled = true;

        selectors.generateBtn.disabled = false;
        selectors.markBtn.disabled = true;
        selectors.clearBtn.disabled = true;
        selectors.resetBtn.disabled = true;
    }

    selectors.generateBtn.addEventListener('click', drawGrid);
    selectors.markBtn.addEventListener('click', markCell);
    selectors.clearBtn.addEventListener("click", clearGrid);
    selectors.resetBtn.addEventListener('click', resetGrid);
}

document.getElementById('createGrid').addEventListener("click", function () {
    const panelCount = document.querySelectorAll(".grids").length + 1;
    createGridPanel(panelCount);
});

function main() {
    applyConfigurations();
}

main();