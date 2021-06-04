const REGEX_REPLACE_RULES = [
    {
        input: 'ou',
        replace: '(ou|ō)'
    },
    {
        input: 'oo',
        replace: '(oo|ō)'
    },
    {
        input: 'o',
        replace: '[oōóòöôøΦ]'
    },
    {
        input: 'uu',
        replace: '(uu|ū)'
    },
    {
        input: 'u',
        replace: '[uūûúùüǖ]'
    },
    {
        input: 'a',
        replace: '[aä@âàáạåæā]'
    },
    {
        input: 'c',
        replace: '[cč]'
    },
    {
        input: ' ',
        replace: '([★☆\\/\\*=\\+·♥∽・〜†×♪→␣:;]* |(☆|★|\\/|\\*|=|\\+|·|♥|∽|・|〜|†|×|♪|→|␣|:|;)+)'
    },
    {
        input: 'e',
        replace: '[eéêëèæ]'
    },
    {
        input: '\'',
        replace: '[\'’]'
    },
    {
        input: 'n',
        replace: '[nñ]'
    },
    {
        input: '2',
        replace: '[2²]'
    },
    {
        input: 'i',
        replace: '[ií]'
    },
    {
        input: '3',
        replace: '[3³]'
    },
    {
        input: 'x',
        replace: '[x×]'
    },
    {
        input: 'b',
        replace: '[bß]'
    },
    {
        input: '\\\\-',
        replace: '[\\-–]'
    }
];

function escapeRegExp(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function createRegExp(query) {
    let escapedQuery = REGEX_REPLACE_RULES.reduce((query, rule) => {
        return query.replace(new RegExp(rule.input, "gi"), rule.replace);
    }, escapeRegExp(query));
    return new RegExp(escapedQuery, "i");
}

function testRegex(value, query) {
    return createRegExp(query).test(value);
}

function updateRow(row) {
    let showRow = row.classList.contains("rowHidden");
    showRow = showRow || row.getElementsByClassName("rowHidden").length === 0;
    row.style.display = showRow ? '' : 'none';
}

function searchSongName(query) {
    //const rows = document.getElementsByClassName('songData');

    songData.forEach(row => {
        const elem = row.getElementsByClassName('songName')[0];

        let res = testRegex(elem.innerText, query);
        elem.classList.toggle("rowHidden", !res);

        updateRow(row);
    });
}

function searchArtist(query) {
    //const rows = document.getElementsByClassName('songData');

    songData.forEach(row => {
        const elem = row.getElementsByClassName('songArtist')[0];

        let res = testRegex(elem.innerText, query);
        elem.classList.toggle("rowHidden", !res);

        updateRow(row);
    });
}

function searchAnime(query) {
    //const rows = document.getElementsByClassName('songData');

    songData.forEach(row => {
        let animeNameRomaji = row.getElementsByClassName("animeNameRomaji")[0];
        let animeNameEnglish = row.getElementsByClassName("animeNameEnglish")[0];

        let hideRow = true;
        
        if (testRegex(animeNameRomaji.innerText, query)) {
            hideRow = false;
        } else if (testRegex(animeNameEnglish.innerText, query)) {
            hideRow = false;
        }

        animeNameRomaji.classList.toggle("rowHidden", hideRow);
        animeNameEnglish.classList.remove("rowHidden", hideRow);

        updateRow(row);
    });
}

function updateTypes() {
    const slTypeOpenings = document.getElementById("slTypeOpenings");
    const slTypeEndings = document.getElementById("slTypeEndings");
    const slTypeInserts = document.getElementById("slTypeEndings");

    const slTypeOpeningsUnchecked = slTypeOpenings.classList.contains("unchecked");
    const slTypeEndingsUnchecked = slTypeEndings.classList.contains("unchecked");
    const slTypeInsertsUnchecked = slTypeInserts.classList.contains("unchecked");

    //const rows = document.getElementsByClassName('songData');

    songData.forEach(row => {
        const elem = row.getElementsByClassName('songType')[0];

        if (elem.innerText.includes("Opening")) {
            elem.classList.toggle("rowHidden", slTypeOpeningsUnchecked);
        } else if (elem.innerText.includes("Ending")) {
            elem.classList.toggle("rowHidden", slTypeEndingsUnchecked);
        } else if (elem.innerText.includes("Insert")) {
            elem.classList.toggle("rowHidden", slTypeInsertsUnchecked);
        }

        updateRow(row);
    });
}
