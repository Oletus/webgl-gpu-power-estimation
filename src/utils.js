function strToCompareArray(str) {

    return str.split(/\W+/g).map(c => c.trim().toLowerCase());

}

function compareStr(a, b) {

    if (typeof a === 'string') a = strToCompareArray(a);
    if (typeof b === 'string') b = strToCompareArray(b);

    const matched = [];
    for (let i = 0, l = a.length; i < l; i++) {

        if (b.includes(a[i])) matched.push(a[i]);

    }


    const unmatchedTokens = a.length - matched.length + b.length - matched.length;
    const score = (matched.length / Math.min(a.length, b.length)) - unmatchedTokens * 0.001;

    return score;

}

function findMatch(name, list) {

    let matches = null;
    let score = -Infinity;

    const versionMatches = /\w*\d\d\d+\w*/.exec(name);
    let versionRegexp = null;
    if (versionMatches) {
        versionRegexp = new RegExp(`(^|\\W)${ versionMatches[0] }(\\W|$)`, 'i');
    }

    const gpuArr = strToCompareArray(name);
    for (let i = 0, l = list.length; i < l; i++) {

        const name = list[i];
        if (versionRegexp && !versionRegexp.test(name)) continue;
        if (!versionRegexp && /\d\d\d+/.test(name)) continue;

        const similarity = compareStr(name, gpuArr);
        if (similarity > score) {

            score = similarity;
            matches = [name];

        } else if (similarity === score) {

            matches.push(name);

        }

    }

    return { matches, score };

}

export { findMatch };
