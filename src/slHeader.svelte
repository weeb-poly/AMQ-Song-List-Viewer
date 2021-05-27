<script>
    import { onMount } from 'svelte';
	import jQuery from 'jquery';

    import { importData, engLang, playerNames } from './stores.js';

    let files;
	$: if (files) {
        let file = files[0];
        if (!file) {
            alert("Please select a file");
        } else {
            let reader = new FileReader();
            reader.onload = function () {
                try {
                    importData.set(JSON.parse(reader.result));
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
	}

    let titleLang;
    $: if (titleLang) {
        engLang.set(titleLang === "english");
    }

    let slImport;
	function slImportButtonClick() {
		slImport.click();
	}

    let slSearchSongName = '';
    /*$: if (slSearchSongName) {
        searchSongName(slSearchSongName);
    }*/

    let slSearchArtist = '';
    /*$: if (slSearchArtist) {
        searchArtist(slSearchArtist);
    }*/

    let slSearchAnime = '';
    /*$: if (slSearchAnime) {
        searchAnime(slSearchAnime);
    }*/

    let slSearchPlayerName = '';
    /*$: if (slSearchAnime) {
        updateScoreboardHighlight(slSearchAnime);
        updateTableGuesses(slSearchAnime);
    }*/

	onMount(() => {
        jQuery(".filterCheckbox").click(function () {
            jQuery(this).toggleClass("unchecked");
            updateTypes();
            updateTableGuesses(slPlayerName);
        });
    });
</script>

<style>
    #slHeader {
        background-color: #424242;
        color: #d9d9d9;
        height: 150px;
        margin-bottom: 10px;
        box-shadow: 0 0 10px 2px #fff;
        width: 100%;
        z-index: 10;
    }
    #slHeaderLeft {
        width: 250px;
        border-right: 1px solid #6d6d6d;
        height: 100%;
        text-align: center;
        float: left;
    }
    #slHeaderRight {
        width: calc(100% - 250px);
        float: left; 
    }
    #slHeaderLeft h1 {
        font-weight: normal;
        padding: 15px 15px 0px 15px;
        margin-top: 0;
    }
    #slHeaderSearch {
        width: calc(100% - 200px);
        padding-top: 10px;
        padding-left: 10px;
        border-right: 1px solid #6d6d6d;
        height: 150px;
        float: left;
    }
    .slSearchInput {
        width: 100%;
        color: black;
        margin: 0;
        height: 35px;
        border-radius: 4px;
        border: 0;
        text-overflow: ellipsis;
        padding: 5px;
    }
    .slSearchContainer {
        width: 31%;
        margin-left: 1%;
        margin-right: 1%;
        margin-top: 5px;
        float: left;
    }
    #slHeaderFilter {
        float: left;
        width: 240px;
        text-align: center;
        margin-top: 5px;
    }
    #slHeaderTypeFilters {
        text-align: center;
        margin-top: 5px;
    }
    .unchecked label {
        visibility: hidden;
    }
    .slTypeFilter {
        width: 33.33%;
        text-align: center;
        float: left;
    }
    .filterCheckbox {
        width: 20px;
        height: 20px;
        border-radius: 4px;
        background-image: linear-gradient(to bottom,#f5f5f5 0,#f9f9f9 100%);
        margin: auto;
    }
    .filterCheckbox label {
        color: #006ab7;
        font-size: 28px;
        position: relative;
        left: 0;
        top: -57%;
        user-select: none;
    }
    #slAnimeTitleSelectContainer {
        width: 100px;
        float: left;
        text-align: center;
        margin-top: 15px;
        margin-left: 2%;
    }
    #slAnimeTitleSelect {
        color: black;
        width: 80px;
        margin-top: 5px;
    }
    #slHeaderPlayer {
        width: 200px;
        float: right;
        height: 150px;
        padding-top: 10px;
    }
    #slSearchPlayerNameContainer {
        width: 90%;
        margin-left: 5%;
    }
    #slPlayerAnswerContainer {
        width: 100px;
        float: left;
        text-align: center;
        margin-top: 15px;
    }
    #slPlayerCorrectContainer {
        float: right;
        text-align: center;
        margin-top: 15px;
        width: 100px;
    }
</style>

<div id="slHeader">
    <div id="slHeaderLeft">
        <h1>AMQ Song List Viewer</h1>
        <button id="slImportButton" class="btn btn-primary" on:click={slImportButtonClick}>Import</button>
        <input id="slImport" type="file" name="slDataFile" accept="text/json" style="display: none;" bind:this={slImport} bind:files />
    </div>
    <div id="slHeaderRight">
        <div id="slHeaderSearch">
            <div class="slSearchContainer">
                <span>Song Name:</span>
                <input class="slSearchInput" id="slSearchSongName" placeholder="Search song name" type="text" bind:value={slSearchSongName} />
            </div>
            <div class="slSearchContainer">
                <span>Artist:</span>
                <input class="slSearchInput" id="slSearchArtist" placeholder="Search artist" type="text" bind:value={slSearchArtist} />
            </div>
            <div class="slSearchContainer">
                <span>Anime:</span>
                <input class="slSearchInput" id="slSearchAnime" placeholder="Search anime" type="text" bind:value={slSearchAnime} />
            </div>
            <div id="slHeaderFilter">
                <span>Song Type</span>
                <div id="slHeaderTypeFilters">
                    <div class="slTypeFilter">
                        <div id="slTypeOpenings" class="filterCheckbox">
                            <label>&#10004;</label>
                        </div>
                        <span>Openings</span>
                    </div>
                    <div class="slTypeFilter">
                        <div id="slTypeEndings" class="filterCheckbox">
                            <label>&#10004;</label>
                        </div>
                        <span>Endings</span>
                    </div>
                    <div class="slTypeFilter">
                        <div id="slTypeInserts" class="filterCheckbox">
                            <label>&#10004;</label>
                        </div>
                        <span>Insert Songs</span>
                    </div>
                </div>
            </div>
            <div id="slAnimeTitleSelectContainer">
                <span>Anime Titles</span>
                <select id="slAnimeTitleSelect" bind:value={titleLang}>
                    <option value="english">English</option>
                    <option value="romaji" selected>Romaji</option>
                </select>
            </div>
        </div>
        <div id="slHeaderPlayer">
            <datalist id="slPlayerList">
                {#each playerNames as pl}
                    <option value={pl}>{pl}</option>
                {/each}
            </datalist>
            <div class="slSearchContainer" id="slSearchPlayerNameContainer">
                <span>Player name: </span>
                <input list="slPlayerList" id="slPlayerName" class="slSearchInput" placeholder="Search player name" type="text" autocomplete="on" bind:value={slSearchPlayerName} />
            </div>

            <div id="slPlayerAnswerContainer">
                <div id="slPlayerAnswers" class="filterCheckbox">
                    <label>&#10004;</label>
                </div>
                <span>Answers</span>
            </div>
            <div id="slPlayerCorrectContainer">
                <div id="slPlayerCorrect" class="filterCheckbox">
                    <label>&#10004;</label>
                </div>
                <span>Correct/ Incorrect</span>
            </div>
        </div>
    </div>
</div>