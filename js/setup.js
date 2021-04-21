let importData = {};
let playerNames = new Set();

function setup() {
    let $slImportButton = $("#slImportButton");
    let $slImport = $("#slImport");
    let $slSearchSongName = $("#slSearchSongName");
    let $slSearchArtist = $("#slSearchArtist");
    let $slSearchAnime = $("#slSearchAnime");
    let $slAnimeTitleSelect = $("#slAnimeTitleSelect");
    let $slPlayerName = $("#slPlayerName");

    $slImportButton.click(() => {
        $slImport.trigger("click");
    });
    $slSearchSongName.on("input", function () {
        searchSongName($(this).val());
    });
    $slSearchArtist.on("input", function () {
        searchArtist($(this).val());
    });
    $slSearchAnime.on("input", function () {
        searchAnime($(this).val());
    });

    $slAnimeTitleSelect.on("change", function () {
        let engLang = ($(this).val() === "english");
        $(".animeNameEnglish").toggle(engLang);
        $(".animeNameRomaji").toggle(!engLang);
    });

    $slPlayerName.on("input", function () {
        updateScoreboardHighlight($(this).val());
        updateTableGuesses($(this).val());
    });

    $slImport.on("change", function () {
        let file = $(this).get(0).files[0];
        if (!file) {
            alert("Please select a file");
        } else {
            let reader = new FileReader();
            reader.onload = function () {
                try {
                    $("#slInfo").hide();
                    $("#slScoreboard").hide();

                    importData = JSON.parse(reader.result);

                    loadData();

                    searchAnime($slSearchAnime.val());
                    searchArtist($slSearchArtist.val());
                    searchSongName($slSearchSongName.val());
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
    })

    $(".filterCheckbox").click(function () {
        $(this).toggleClass("unchecked");
        updateTypes();
        updateTableGuesses($slPlayerName.val());
    });
}

$(function() {
    setup();
});
