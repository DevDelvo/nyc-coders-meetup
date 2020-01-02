// This problem was asked by Slack.

// You are given a string formed by concatenating several words corresponding to the integers zero through nine and then anagramming.
// For example, the input could be 'niesevehrtfeev', which is an anagram of 'threefiveseven'. 
// Note that there can be multiple instances of each integer.
// Given this string, return the original integers in sorted order. In the example above, this would be 357.

const generateNumbersTrie = () => {
    const numString = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const trie = {};
    for (const num of numString) {
        let node = trie;
    
        for (let i = 0; i < num.length; i++) {
            const char = num[i];
            node[char] = node[char] || {};
            node = node[char];
        }
    }
    return trie;
}

const getNumber = (startChar, anagramCounts) => {
    const numString = {'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9};
    let flag = false;
    for (const num of Object.keys(numString)) {
        const newAnagramCounts = {...anagramCounts};
        if (num[0] === startChar) {
            for (let i = 0; i < num.length; i++) {
                const char = num[i];
                if (newAnagramCounts[char] && newAnagramCounts[char] > 0) {
                    newAnagramCounts[char]--;
                    if (i === num.length - 1) flag = true;
                    continue;
                } else if (!newAnagramCounts[char] || newAnagramCounts[char] <= 0) {
                    break;
                }
                if (num[0] !== char) break;

            }
            if (flag) {
                return {
                    num: numString[num],
                    newAnagramCounts
                }
            }
        }
    }
    return false;
}

const anagrams = (anagram) => {
    let charCount = {};
    const res = [];
    for (const char of anagram) {
        if (!charCount[char]) {
            charCount[char] = 1;
        } else {
            charCount[char]++;
        }
    }
    
    for (const char of anagram) {
        if (getNumber(char, charCount) === false || !charCount[char] || charCount[char] <= 0) {
            continue;
        } else if (getNumber(char, charCount)) {
            const { num, newAnagramCounts} = getNumber(char, charCount)   
            charCount = newAnagramCounts;
            res.push(num);
        }
    }
    return res.sort().join('');
}

const test1 = 'niesevehrtfeev'
console.log(anagrams(test1)) // 357