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