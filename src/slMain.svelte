<script>
	import slScoreboard from './slScoreboard.svelte';
    import slInfo from './slInfo.svelte';
</script>

<style>
#slMain {
    overflow-x: auto;
    width: 100vw;
    display: flex;
    height: calc(100vh - 160px);
    padding-top: 10px;
}
#slTableContainer {
    color: #d9d9d9;
    width: calc(59% - 120px);
    min-width: 450px;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color: #424242;
    box-shadow: 0 0 10px 2px #fff;
    display: none;
    height: calc(100vh - 195px);
    float: left;
}
#slTableHeader {
    border-bottom: 1px solid #6d6d6d;
    padding: 15px;
}
#slTableBody {
    height: calc(100vh - 268px);
    overflow-y: auto;
    overflow-x: auto;
}
#slTableHeader h2 {
    margin: 0;
    font-size: 30px;
    line-height: 1.42857143;
    text-align: center;
    font-weight: normal;
}
</style>

<div id="slMain">
    <slScoreboard></slScoreboard>
    <div id="slTableContainer">
        <div id="slTableHeader">
            <h2>Song List</h2>
        </div>
        <div id="slTableBody">
            <slTable></slTable>
        </div>
    </div>
    <slInfo></slInfo>
</div>