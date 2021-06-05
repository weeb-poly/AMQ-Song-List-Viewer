let importData = {};
let playerNames = new Set();

function setup() {
    const slImportButton = document.getElementById("slImportButton");
    const slImport = document.getElementById("slImport");
    const slSearchSongName = document.getElementById("slSearchSongName");
    const slSearchArtist = document.getElementById("slSearchArtist");
    const slSearchAnime = document.getElementById("slSearchAnime");
    const slAnimeTitleSelect = document.getElementById("slAnimeTitleSelect");
    const slPlayerName = document.getElementById("slPlayerName");

    const slInfo = document.getElementById("slInfo");
    const slScoreboard = document.getElementById("slScoreboard");  
    
    const slTable = document.getElementById("slTable");

    slImportButton.addEventListener("click", () => {
        slImport.click();
    });

    slSearchSongName.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            searchSongName(this.value);
        }
    });
    slSearchArtist.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            searchArtist(this.value);
        }
    });
    slSearchAnime.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            searchAnime(this.value);
        }
    });

    slAnimeTitleSelect.addEventListener("change", function () {
        let engLang = (this.value === "english");
        slTable.classList.toggle("hideEnglishName", !engLang);
        slTable.classList.toggle("hideRomajiName", engLang);
    });

    slPlayerName.addEventListener("input", function () {
        updateScoreboardHighlight(this.value);
        updateTableGuesses(this.value);
    });

    slImport.addEventListener("change", function () {
        let file = this.files[0];
        if (!file) {
            alert("Please select a file");
        } else {
            let reader = new FileReader();
            reader.onload = function () {
                try {
                    importData = JSON.parse(reader.result);

                    loadData();

                    searchAnime(slSearchAnime.value);
                    searchArtist(slSearchArtist.value);
                    searchSongName(slSearchSongName.value);

                    updateTypes();
                }
                catch (e) {
                    if (e instanceof SyntaxError) {
                        alert(e.name + ": " + e.message);
                    }
                    if (e instanceof ReferenceError) {
                        alert(e.name + ": " + e.message);
                    }
                }
            }
            reader.readAsText(file);
        }
    });

    $("#slHeaderFilter .filterCheckbox").click(function () {
        this.classList.toggle("unchecked");
        updateTypes();
    });

    $("#slHeaderPlayer .filterCheckbox").click(function () {
        this.classList.toggle("unchecked");
        updateTableGuesses(slPlayerName.value);
    });
}

$(function() {
    setup();
});
