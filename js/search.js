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

function updateRow(row) {
    //let showRow = row.classList.contains("rowHidden");
    //showRow = showRow || row.getElementsByClassName("rowHidden").length === 0;
    const showRow = row.getElementsByClassName("rowHidden").length === 0;
    row.style.display = showRow ? '' : 'none';
}

function searchSongName(query) {
    const regexp = createRegExp(query);

    //const songData = document.getElementsByClassName('songData');
    const songNames = document.querySelectorAll('.songData .songName');

    Array.from(songNames).forEach(elem => {
        const res = regexp.test(elem.innerText);
        elem.classList.toggle("rowHidden", !res);

        updateRow(elem.parentElement);
    });
}

function searchArtist(query) {
    const regexp = createRegExp(query);

    //const songData = document.getElementsByClassName('songData');
    const songArtists = document.querySelectorAll('.songData .songArtist');

    Array.from(songArtists).forEach(elem => {
        const res = regexp.test(elem.innerText);
        elem.classList.toggle("rowHidden", !res);

        updateRow(elem.parentElement);
    });
}

function searchAnime(query) {
    const regexp = createRegExp(query);

    const songData = document.getElementsByClassName('songData');

    Array.from(songData).forEach(row => {
        const animeNameRomaji = row.getElementsByClassName("animeNameRomaji")[0];
        const animeNameEnglish = row.getElementsByClassName("animeNameEnglish")[0];

        const showRow = regexp.test(animeNameRomaji.innerText) ||
            regexp.test(animeNameEnglish.innerText);

        animeNameRomaji.classList.toggle("rowHidden", !showRow);
        animeNameEnglish.classList.remove("rowHidden", !showRow);

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

    const songData = document.getElementsByClassName('songData');

    Array.from(songData).forEach(row => {
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
