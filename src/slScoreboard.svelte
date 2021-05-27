<script>
</script>

<style>
#slScoreboard {
    float: left;
    min-width: 215px;
    border-radius: 5px;
    overflow-wrap: break-word;
    background-color: #424242;
    color: #d9d9d9;
    box-shadow: 0 0 10px 2px #fff;
    margin: 0px 1%;
    display: none;
    height: calc(100vh - 195px);
}
#slScoreboard h3 {
    text-align: center;
    font-size: 24px;
    font-weight: normal;
    margin: 10px;
}
#slScoreboardContainer {
    margin-left: 10px;
    max-height: calc(100vh - 241px);
    overflow-y: auto;
    padding-bottom: 5px;
}
.slScoreboardEntry {
    font-size: 14px;
    height: 30px;
    vertical-align: middle;
    display: block;
}
.disabled {
    opacity: 0.4;
}
.rightAnswerScoreboard {
    text-shadow: 0 0 5px #fff, 0 0 10px #B6FF00, 0 0 15px #B6FF00;
}
.self {
    color: #80c7ff;
    text-shadow: 0 0 10px #228DFF;
}
.slScoreboardPosition {
    font-size: 22px;
    width: 25px;
    display: inline-block;
    text-align: center;
    height: 100%;
    vertical-align: middle;
    margin-right: 5px;
}
.slScoreboardEntry p {
    display: inline;
    margin: 0;
    vertical-align: text-top;
}
.slScoreboardScore {
    margin-right: 5px;
}
.slScoreboardCorrectGuesses {
    opacity: 0.3;
    margin-right: 5px;
}
</style>


<div id="slScoreboard">
    <div>
        <h3>Standings</h3>
    </div>
    <div id="slScoreboardContainer">
    </div>
</div>
