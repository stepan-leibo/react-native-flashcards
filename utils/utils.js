Array.prototype.unique = function(field) {
    let a = this.concat();
    for(let i=0; i<a.length; ++i) {
        for(let j=i+1; j<a.length; ++j) {
            if((field && a[i][field] === a[j][field]) || (!field && a[i] === a[j])) {
                a[i] = a[j];
                a.splice(j--, 1);
            }
        }
    }

    return a;
};

export function formatDeckResults (results) {
    return results === null
        ? setDummyData()
        : JSON.parse(results);
}

function setDummyData() {
    let data = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    };

    return AsyncStorage.setItem(UDACI_DECKS_KEY, JSON.stringify(data));
}