function loadData() {
    playerNames.clear();

    let $slTable = $("#slTable");
    let $slAnimeTitleSelect = $("#slAnimeTitleSelect");

    $("#slPlayerList > option").remove();
    $("#slTableContainer").show();
    $slTable.show();
    $("#slScoreboard").show();
    $("#slInfo").show();

    clearInfo();
    clearScoreboard();

    $("tr.songData").remove();
    
    let songDataClick = function () {
        let $this = $(this);
        let song = $this.data("song");
        let isSelected = $this.hasClass("selected");

        $(".selected").removeClass("selected");

        if (!isSelected) {
            updateScoreboard(song);
            updateInfo(song);
            $this.addClass("selected");
        } else {
            clearScoreboard();
            clearInfo();
        }
    };

    let engLang = ($slAnimeTitleSelect.val() === "english");

    let tbodyFrag = document.createDocumentFragment();

    let trTemplate = document.getElementById("slTableDataTemplate");

    for (let song of importData) {
        let guesses = song.players.filter(tmpPlayer => (tmpPlayer.correct === true));

        let guessesPercentage = (guesses.length / song.activePlayers * 100).toFixed(2);

        let tr = trTemplate.content.cloneNode(true);

        tr.getElementsByClassName("songNumber")[0].innerText = song.songNumber;
        tr.getElementsByClassName("songName")[0].innerText = song.name;
        tr.getElementsByClassName("songArtist")[0].innerText = song.artist;
        tr.getElementsByClassName("animeNameRomaji")[0].innerText = song.anime.romaji;
        tr.getElementsByClassName("animeNameEnglish")[0].innerText = song.anime.english;
        tr.getElementsByClassName("songType")[0].innerText = song.type;
        tr.getElementsByClassName("playerAnswer")[0].innerText = "...";
        tr.getElementsByClassName("guessesCounter")[0].innerText = guesses.length + "/" + song.activePlayers + " (" + guessesPercentage + "%)";
        tr.getElementsByClassName("samplePoint")[0].innerText = formatSamplePoint(song.startSample, song.videoLength);

        $(tr).click(songDataClick);
        $(tr).data("song", song);
        $(tr.getElementsByClassName("animeNameRomaji")[0]).toggle(!engLang)
        $(tr.getElementsByClassName("animeNameEnglish")[0]).toggle(engLang)
        
        tbodyFrag.append(tr);

        song.players.forEach(playerNames.add, playerNames);
    }

    $("#slTable > tbody").append(tbodyFrag);
    
    let slPlayerListFragment = $(document.createDocumentFragment());

    playerNames.forEach((p1) => {
        slPlayerListFragment.append(
            $("<option></option>", {
                value: p1
            })
        );
    });
    
    $("#slPlayerList").append(slPlayerListFragment);

    $(".playerAnswer").hide();

    let playerName = $("#slPlayerName").val();

    updateTableGuesses(playerName);
    updateScoreboardHighlight(playerName);
}

function formatSamplePoint(start, length) {
    if (isNaN(start) || isNaN(length)) {
        return "Video not loaded";
    }
    let startPoint = Math.floor(start / 60) + ":" + (start % 60 < 10 ? "0" + (start % 60) : start % 60);
    let videoLength = Math.round(length);
    let totalLength = Math.floor(videoLength / 60) + ":" + (videoLength % 60 < 10 ? "0" + (videoLength % 60) : videoLength % 60);
    return startPoint + "/" + totalLength;
}

function updateTableGuesses(playerName) {
    let playerExists = false;
    let $slPlayerAnswers = $("#slPlayerAnswers");
    let $slPlayerCorrect = $("#slPlayerCorrect");

    for (let i = 0; i < importData.length; i++) {
        let findPlayer = importData[i].players.find(
            player => (player.name === playerName)
        );

        let $songData = $($("tr.songData").get(i));
        let $playerAnswer = $($(".songData .playerAnswer").get(i));

        if (findPlayer !== undefined) {
            playerExists = true;
            if (!$slPlayerAnswers.hasClass("unchecked")) {
                $playerAnswer.text(findPlayer.answer);
                $(".playerAnswer").show();
            } else {
                $(".playerAnswer").hide();
            }

            if (findPlayer.active === true && !$slPlayerCorrect.hasClass("unchecked")) {
                $songData.addClass(findPlayer.correct === true ? "rightAnswerTable" : "wrongAnswerTable");
            } else {
                $songData.removeClass("rightAnswerTable wrongAnswerTable");
            }
        } else {
            $songData.removeClass("rightAnswerTable wrongAnswerTable");
            $playerAnswer.text("...");
            if (!playerExists || $slPlayerAnswers.hasClass("unchecked")) {
                $(".playerAnswer").hide();
            }
        }

    }
}

function updateScoreboard(song) {
    $(".slScoreboardEntry").remove();

    let slScoreboardFragment = $(document.createDocumentFragment());
    
    song.players.sort((a, b) => a.positionSlot - b.positionSlot).forEach((player) => {
        slScoreboardFragment.append(
            $("<div></div>", {
                "class": "slScoreboardEntry"
            })
            .toggleClass("disabled", player.active === false)
            .append(
                $("<span></span>", {
                    "class": "slScoreboardPosition",
                    text: player.position
                })
                .width(player.position.toString().length === 3 ? "42px" : "")
                .css("text-align", player.position.toString().length === 3 ? "left" : "center")
            )
            .append(
                $("<p></p>")
                .append(
                    $("<b></b>", {
                        "class": 'slScoreboardScore',
                        text: player.score
                    })
                    .toggleClass("rightAnswerScoreboard", player.correct === true)
                )
                .append(
                    $("<span></span>", {
                        "class": "slScoreboardCorrectGuesses",
                        text: player.correctGuesses
                    })
                    .toggleClass("hide", (song.gameMode !== "Standard" && song.gameMode !== "Ranked"))
                )
                .append(
                    $("<span></span>", {
                        "class": 'slScoreboardName',
                        text: player.name
                    })
                    .toggleClass("self", $("#slPlayerName").val() === player.name)
                )
            )
        );
    });
    
    $("#slScoreboardContainer").append(slScoreboardFragment);
}

function updateScoreboardHighlight(name) {
    $(".slScoreboardEntry").each((_index, elem) => {
        var $slScoreboardName = $(elem).find(".slScoreboardName");
        var addSelf = ($slScoreboardName.text() === name);
        $slScoreboardName.toggleClass("self", addSelf);
    });
}

function updateInfo(song) {
    clearInfo();

    let infoRow1 = $("<div></div>", {
        "class": 'slInfoRow'
    }).append(
        $("<div></div>", {
            id: "slInfoSongName",
            html: "<h5><b>Song Name</b></h5><p>" + song.name + "</p>"
        })
    ).append(
        $("<div></div>", {
            id: "slInfoArtist",
            html: "<h5><b>Artist</b></h5><p>" + song.artist + "</p>"
        })
    ).append(
        $("<div></div>", {
            id: "slInfoType",
            html: "<h5><b>Type</b></h5><p>" + song.type + "</p>"
        })
    );

    let infoRow2 = $("<div></div>", {
        "class": 'slInfoRow'
    }).append(
        $("<div></div>", {
            id: "slInfoAnimeEnglish",
            html: "<h5><b>Anime English</b></h5><p>" + song.anime.english + "</p>"
        })
    ).append(
        $("<div></div>", {
            id: "slInfoAnimeRomaji",
            html: "<h5><b>Anime Romaji</b></h5><p>" + song.anime.romaji + "</p>"
        })
    ).append(
        $("<div></div>", {
            id: "slInfoSample",
            html: "<h5><b>Sample Point</b></h5><p>" + formatSamplePoint(song.startSample, song.videoLength) + "</p>"
        })
    );
    
    let infoRow3 = $("<div></div>", {
        "class": 'slInfoRow'
    });
    let infoRow4 = $("<div></div>", {
        "class": 'slInfoRow'
    });
    
    let guesses = song.players.filter((tmpPlayer) => tmpPlayer.correct === true);

    let infoGuessed = $("<div></div>", {
        id: "slInfoGuessed",
        html: "<h5><b>Guessed<br>" + guesses.length + "/" + song.activePlayers + " (" + (guesses.length/song.activePlayers*100).toFixed(2) + "%)</b></h5>"
    });
    let infoFromList = $("<div></div>", {
        id: "slInfoFromList",
        html: "<h5><b>From Lists<br>" + song.fromList.length + "/" + song.totalPlayers + " (" + (song.fromList.length/song.totalPlayers*100).toFixed(2) + "%)</b></h5>"
    });
    let infoUrls = $("<div></div>", {
        id: "slInfoUrls",
        html: "<h5><b>URLs</b></h5>"
    });

    infoRow3.append(infoUrls);

    infoRow4.append(infoGuessed);
    infoRow4.append(infoFromList);

    let infoListContainer;
    if (song.fromList.length === 0) {
        infoGuessed.css("width", "98%");
        infoFromList.hide();
        if (guesses.length > 1) {
            let infoGuessedLeft = $("<ul></ul>", {
                id: "slInfoGuessedLeft"
            });
            let infoGuessedRight = $("<ul></ul>", {
                id: "slInfoGuessedRight"
            });
            let i = 0;
            for (let guessed of guesses) {
                let $li = $("<li></li>", {
                    text: guessed.name + " (" + guessed.score + ")"
                });
                if (i++ % 2 === 0) {
                    infoGuessedLeft.append($li);
                } else {
                    infoGuessedRight.append($li);
                }
            }
            infoGuessed.append(infoGuessedLeft);
            infoGuessed.append(infoGuessedRight);
        }
        else {
            infoListContainer = $("<ul></ul>", {
                id: "slInfoGuessedList"
            });
            for (let guessed of guesses) {
                infoListContainer.append(
                    $("<li></li>", {
                        text: guessed.name + " (" + guessed.score + ")"
                    })
                );
            }
            infoGuessed.append(infoListContainer);
        }
    }
    else {
        infoGuessed.css("width", "");
        infoListContainer = $("<ul></ul>", {
            id: "slInfoGuessedList"
        });
        infoFromList.show();
        for (let guessed of guesses) {
            infoListContainer.append(
                $("<li></li>", {
                    text: guessed.name + " (" + guessed.score + ")"
                })
            );
        }
        infoGuessed.append(infoListContainer);
    }

    const listStatus = {
        1: "Watching",
        2: "Completed",
        3: "On-Hold",
        4: "Dropped",
        5: "Plan to Watch",
        6: "Looted"
    };

    infoListContainer = $("<ul></ul>");
    for (let fromList of song.fromList) {
        infoListContainer.append(
            $("<li></li>", {
                text: fromList.name + " (" + listStatus[fromList.listStatus] + ((fromList.score !== null) ? ", " + fromList.score + ")" : ")")
            })
        );
    }
    infoFromList.append(infoListContainer);

    infoListContainer = $("<ul></ul>");
    for (let host in song.urls) {
        for (let resolution in song.urls[host]) {
            let url = song.urls[host][resolution];
            let innerHTML = "";
            innerHTML += (host === "catbox" ? "Catbox " : (host === "animethemes" ? "AnimeThemes " : "OpeningsMoe "));
            innerHTML += (resolution === "0") ? "MP3: " : (resolution === "480") ? "480p: " : "720p: ";
            innerHTML += '<a href="' + url + '" target="_blank">' + url + "</a>";
            infoListContainer.append(
                $("<li></li>", {
                    html: innerHTML
                })
            );
        }
    }
    infoUrls.append(infoListContainer);

    // $("#slInfoBody").append(infoRow1, infoRow2, infoRow3, infoRow4);

    let slInfoBodyFragment = $(document.createDocumentFragment());
    
    slInfoBodyFragment.append(infoRow1);
    slInfoBodyFragment.append(infoRow2);
    slInfoBodyFragment.append(infoRow3);
    slInfoBodyFragment.append(infoRow4);

    $("#slInfoBody").append(slInfoBodyFragment);
}

function clearInfo() {
    $("#slInfoBody").children().remove();
}

function clearScoreboard() {
    $(".slScoreboardEntry").remove();
}
