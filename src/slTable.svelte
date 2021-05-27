<script>
	import { importData, animeTitleType } from './stores.js';

	function formatSamplePoint(start, length) {
		if (isNaN(start) || isNaN(length)) {
			return "Video not loaded";
		}
		let startPoint = Math.floor(start / 60) + ":" + (start % 60 < 10 ? "0" + (start % 60) : start % 60);
		let videoLength = Math.round(length);
		let totalLength = Math.floor(videoLength / 60) + ":" + (videoLength % 60 < 10 ? "0" + (videoLength % 60) : videoLength % 60);
		return startPoint + "/" + totalLength;
	}

	function guessesCounter(song) {
        let guesses = song.players.filter(tmpPlayer => (tmpPlayer.correct === true));
        let guessesPercentage = (guesses.length / song.activePlayers * 100).toFixed(2);
		return guesses.length + "/" + song.activePlayers + " (" + guessesPercentage + "%)";
	}
</script>

<style>
#slTable {
    color: #d9d9d9;
    background-color: #424242;
    box-shadow: 0 0 10px 2px #fff;
    border-spacing: 0;
    border-collapse: collapse;
    margin: 10px 1%;
    display: none;
    width: 98%;
}
#slTable.english tr td.animeNameRomaji {
    display: none;
}
#slTable.romaji tr td.animeNameEnglish {
    display: none;
}
#slTable td {
    padding: 0;
    font-size: 14px;
    line-height: 20px;
}
tr.header {
    height: 30px;
}
tr.header > td {
    font-weight: bold;
    border: 1px solid black;
    text-align: center;
    vertical-align: middle;
}
.songData {
    height: 50px;
}
.songData > td {
    vertical-align: middle;
    border: 1px solid black;
    text-align: center;
}
.songData:hover {
    box-shadow: 0px 0px 10px cyan;
}
.songData.selected {
    box-shadow: 0px 0px 10px lime;
}
.songNumber {
    min-width: 60px;
}
.songType {
    min-width: 80px;
}
.guessesCounter {
    min-width: 75px;
}
.samplePoint {
    min-width: 70px;
}
.playerAnswer {
    display: none;
}
.clickable {
    cursor: pointer;
}

.rightAnswerTable {
    background-color: rgba(0, 200, 0, 0.07);
}
.wrongAnswerTable {
    background-color: rgba(255, 0, 0, 0.07);
}
</style>

<table id="slTable" class="{$animeTitleType}">
	<tr class="header">
		<td class="songNumber">Number</td>
		<td class="songName">Song Name</td>
		<td class="songArtist">Artist</td>
		<td class="animeNameRomaji">Anime</td>
		<td class="animeNameEnglish">Anime</td>
		<td class="songType">Type</td>
		<td class="playerAnswer">Answer</td>
		<td class="guessesCounter">Guesses</td>
		<td class="samplePoint">Sample</td>
	</tr>
	{#each $importData as song}
	<tr class="songData clickable">
		<td class="songNumber">{song.songNumber}</td>
		<td class="songName">{song.name}</td>
		<td class="songArtist">{song.artist}</td>
		<td class="animeNameRomaji">{song.anime.romaji}</td>
		<td class="animeNameEnglish">{song.anime.english}</td>
		<td class="songType">{song.type}</td>
		<td class="playerAnswer">...</td>
		<td class="guessesCounter">{guessesCounter(song)}</td>
		<td class="samplePoint">{formatSamplePoint(song.startSample, song.videoLength)}</td>
	</tr>
	{/each}
</table>
