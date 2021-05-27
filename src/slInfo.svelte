<script>
</script>

<style>
#slInfo {
    background-color: #424242;
    width: calc(39% - 120px);
    float: left;
    color: #d9d9d9;
    box-shadow: 0 0 10px 2px #000;
    min-width: 370px;
    height: calc(100vh - 195px);
    overflow-y: hidden;
    overflow-x: hidden;
    display: none;
    /* float: left; */
    margin-left: 10px;
}
#slInfoBody {
    height: calc(100vh - 268px);
    overflow-y: auto;
    overflow-x: auto;
}
#slInfo ul {
    padding: 0;
    list-style: none;
}
#slInfoHeader {
    border-bottom: 1px solid #6d6d6d;
    padding: 15px;
}
#slInfoHeader h2 {
    margin: 0;
    font-size: 30px;
    line-height: 1.42857143;
    text-align: center;
    font-weight: normal;
}
.slInfoRow {
    width: 98%;
    height: auto;
    text-align: center;
    clear: both;
}
.slInfoRow > div {
    margin: 1%;
    text-align: center;
    float: left;
}
.slInfoRow > div h5 {
    font-weight: bold;
    font-size: 16px;
}
#slInfoSongName {
    width: 38%;
    overflow-wrap: break-word;
}
#slInfoArtist {
    width: 38%;
    overflow-wrap: break-word;
}
#slInfoType {
    width: 18%;
    overflow-wrap: break-word; 
}
#slInfoAnimeEnglish {
    width: 38%;
    overflow-wrap: break-word;
}
#slInfoAnimeRomaji {
    width: 38%;
    overflow-wrap: break-word;
}
#slInfoSample {
    width: 18%;
    overflow-wrap: break-word; 
}
#slInfoUrls {
    width: 100%;
}
#slInfoGuessed {
    width: 48%;
    float: left;
}
#slInfoGuessedLeft {
    width: 48%;
    margin: 1%;
    float: left;
}
#slInfoGuessedRight {
    width: 48%;
    margin: 1%;
    float: left;
}
#slInfoFromList {
    width: 48%;
    float: left;
}
</style>

<div id="slInfo">
    <div id="slInfoHeader">
        <h2>Song Info</h2>
    </div>
    <div id="slInfoBody">
        <div class="slInfoRow">
            <div id="slInfoSongName">
                <h5>Song Name</h5>
            </div>
            <div id="slInfoArtist">
                <h5>Artist</h5>
            </div>
            <div id="slInfoType">
                <h5>Type</h5>
            </div>
        </div>
        <div class="slInfoRow">
            <div id="slInfoAnimeEnglish">
                <h5>Anime English</h5>
            </div>
            <div id="slInfoAnimeRomaji">
                <h5>Anime Romaji</h5>
            </div>
            <div id="slInfoSample">
                <h5>Sample Point</h5>
            </div>
        </div>
        <div class="slInfoRow">
            <div id="slInfoUrls">
                <h5>URLs</h5>
                <ul>
                
                </ul>
            </div>
        </div>
        <div class="slInfoRow">
            <div id="slInfoGuessed">
                <h5>Guessed</h5>
            </div>
            <div id="slInfoFromList">
                <h5>From Lists</h5>
                <ul>
                    
                </ul>
            </div>
        </div>
    </div>
</div>