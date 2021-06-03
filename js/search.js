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
    let escapedQuery = escapeRegExp(query);
    REGEX_REPLACE_RULES.forEach((rule) => {
        escapedQuery = escapedQuery.replace(new RegExp(rule.input, "gi"), rule.replace);
    });
    return new RegExp(escapedQuery, "i");
}

function testRegex(value, query) {
    return createRegExp(query).test(value);
}

function updateRow(row) {
    let showRow = (row.find(".rowHidden").length === 0 || row.hasClass("rowHidden"));
    row.toggle(showRow);
}

function searchSongName(query) {
    $(".songData .songName").each((_index, elem) => {
        let $elem = $(elem);
        let res = testRegex($elem.text(), query);
        $elem.toggleClass("rowHidden", !res);
        updateRow($elem.parent());
    });
}

function searchArtist(query) {
    $(".songData .songArtist").each((_index, elem) => {
        let $elem = $(elem);
        let res = testRegex($elem.text(), query);
        $elem.toggleClass("rowHidden", !res);
        updateRow($elem.parent());
    });
}

function searchAnime(query) {
    $(".songData .animeNameRomaji").each((_index, elem) => {
        let $elem = $(elem);
        if (testRegex($elem.text(), query)) {
            $elem.removeClass("rowHidden");
            $elem.parent().find(".animeNameEnglish").removeClass("rowHidden");
        } else {
            if (testRegex($elem.parent().find(".animeNameEnglish").text(), query)) {
                $elem.removeClass("rowHidden");
                $elem.parent().find(".animeNameEnglish").removeClass("rowHidden");
            } else {
                $elem.parent().find(".animeNameEnglish").addClass("rowHidden");
                $elem.addClass("rowHidden");
            }
        }
        updateRow($elem.parent());
    });
}

function updateTypes() {
    const slTypeOpeningsUnchecked = $("#slTypeOpenings").hasClass("unchecked");
    const slTypeEndingsUnchecked = $("#slTypeEndings").hasClass("unchecked");
    const slTypeInsertsUnchecked = $("#slTypeEndings").hasClass("unchecked");

    $(".songData .songType").each((_index, elem) => {
        let $elem = $(elem);
        if ($elem.text().includes("Opening")) {
            $elem.toggleClass("rowHidden", slTypeOpeningsUnchecked);
        } else if ($elem.text().includes("Ending")) {
            $elem.toggleClass("rowHidden", slTypeEndingsUnchecked);
        } else if ($elem.text().includes("Insert")) {
            $elem.toggleClass("rowHidden", slTypeInsertsUnchecked);
        }
        updateRow($elem.parent())
    });
}
