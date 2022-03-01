let theme = 1;
document.getElementById("themeButton").addEventListener("click", changeTheme);

function changeTheme() {
    let themeId = document.getElementById("themeDot");
    let currentTheme = document.getElementById("themeRoot");
    if (theme === 3) {
        theme = 1;
        currentTheme.className = 'defaultTheme';
        themeId.style.gridArea = '1 / 1 / 1 / 1';
    } else if (theme === 1) {
        theme = 2;
        currentTheme.className = 'whiteTheme';
        themeId.style.gridArea = '1 / 2 / 1 / 2';
    } else if (theme === 2) {
        theme = 3;
        currentTheme.className = 'purpleTheme';
        themeId.style.gridArea = '1 / 3 / 1 / 3';
    }

}

let firstNumber = 0;
let secondNumber = 0;
let numberSplitter;
let total;
let displayTotal = "new";
let functionKeys = ["DEL", "+", "-", ".", "/", "x", "RESET", "="]
let functionPressed = false; /* prevent multiple operators */

let lastPressedFunction;

document.querySelectorAll(".buttonNumber").forEach(item => {
    item.addEventListener("click", event => {            
        if (lastPressedFunction === "=") {
            resetScreen();
            lastPressedFunction = "";
            functionPressed = true;
        }
        if (displayTotal === "new") {
            if (item.innerHTML !== "0") {
                displayTotal = item.innerHTML;
                updateScreen()
                functionPressed = false;
            }
        } else {
            displayTotal += item.innerHTML;
            updateScreen();
        }
    }
    )
    
})

document.querySelector(".buttonReset").addEventListener("click", event => {
    resetScreen();
})


document.querySelector(".buttonDel").addEventListener("click", event => {
    if (displayTotal !== "new") {
        displayTotal = displayTotal.slice(0,-1);
        updateScreen()
        if (displayTotal === "") {
            resetScreen();
        }
    }
})

function addSymbolToScreen(operation) {
    if (displayTotal !== "new" && functionPressed !== true) {
        firstNumber = parseFloat(displayTotal);
        flashScreen();
        functionPressed = true;
        lastPressedFunction = operation;
        displayTotal += operation;
        updateScreen();
    }    
}

document.querySelector(".buttonPlus").addEventListener("click", event => {
    addSymbolToScreen("+");
})

document.querySelector(".buttonMinus").addEventListener("click", event => {
    addSymbolToScreen("-");
})

document.querySelector(".buttonMult").addEventListener("click", event => {
    addSymbolToScreen("x");
})

document.querySelector(".buttonDiv").addEventListener("click", event => {
    addSymbolToScreen("/");
})

document.querySelector(".buttonEqual").addEventListener("click", event => {
    numberSplitter = displayTotal.split(lastPressedFunction);
    secondNumber = parseFloat(numberSplitter[1]);
    switch (lastPressedFunction) {
        case "":
            updateScreen();
            lastPressedFunction = "=";
            break;
        case "+":
            // idk why but i was getting weird stuff like 2.1 * 3 = 6.30000000000000001 so get rounded i guess
            displayTotal = String(Math.round(1000 * (firstNumber + secondNumber)) / 1000);
            updateScreen();
            lastPressedFunction = "=";
            break;
        case "-":
            displayTotal = String(Math.round(1000 * (firstNumber - secondNumber)) / 1000);
            updateScreen();
            lastPressedFunction = "=";
            break;
        case "x":
            displayTotal = String(Math.round(1000 * (firstNumber * secondNumber)) / 1000);
            updateScreen();
            lastPressedFunction = "=";
            break;
        case "/":
            displayTotal = String(Math.round(1000 * (firstNumber / secondNumber)) / 1000);
            updateScreen();
            lastPressedFunction = "=";
            break;
    }
})

function updateScreen() {
    document.querySelector(".calcScreen").innerHTML = addCommas(displayTotal);
    flashScreen();
}

function resetScreen() {
    document.querySelector(".calcScreen").innerHTML = "0";
    displayTotal = "new";
    functionPressed = false;
    lastPressedFunction = "";
    flashScreen();
}

function addCommas(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

function flashScreen() {
    document.querySelector(".calcScreen").style.color = "var(--screen-background)";
    setTimeout(() => {document.querySelector(".calcScreen").style.color = "var(--screen-text)"}, 100);
}