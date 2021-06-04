let importData = {};
let playerNames = new Set();
let songData;

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
    
    songData = document.getElementsByClassName('songData');

    slImportButton.addEventListener("click", () => {
        slImport.click();
    });

    slSearchSongName.addEventListener("input", function () {
        searchSongName(this.value);
    });
    slSearchArtist.addEventListener("input", function () {
        searchArtist(this.value);
    });
    slSearchAnime.addEventListener("input", function () {
        searchAnime(this.value);
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
                    slInfo.style.display = 'none';
                    slScoreboard.style.display = 'none';

                    importData = JSON.parse(reader.result);

                    loadData();

                    songData = document.getElementsByClassName('songData');

                    slSearchAnime.dispatchEvent(new Event('input'));
                    //searchAnime(slSearchAnime.value);
                    slSearchArtist.dispatchEvent(new Event('input'));
                    //searchArtist(slSearchArtist.value);
                    slSearchSongName.dispatchEvent(new Event('input'));
                    //searchSongName(slSearchSongName.value);

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
