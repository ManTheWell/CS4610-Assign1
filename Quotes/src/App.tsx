import { useState, useEffect, KeyboardEvent } from 'react';
// import { recordAnalytic } from './lib/recordAnalytic';
let ID_COUNT = 0;

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

interface QuoteInfo {
  id: number,
  content: string,
  author: string,
}

function App() {
  const [quotes, setQuotes] = useState<QuoteInfo[]>([]);
  const [description, setDescription] = useState("");
  const [randomQFetch, setRandomQFetch] = useState(false);
  const [quotesFetched, setQuotesFetched] = useState(false);

  useEffect(() => {
    getRandom();
  }, []);

  async function getRandom() {
    const fetchRequest = await fetch("https://api.quotable.io/random");
    const fetchJson = await fetchRequest.json();
    

    var quote: QuoteInfo = {
      id: ID_COUNT++,
      content: fetchJson.content,
      author: fetchJson.author,
    };
    console.log(quote);
    setQuotes([...quotes]);
    quotes[0] = quote;
  }

  async function getQuotes() {
    if (description === "") return;

    const fetchRequest = await fetch("https://api.quotable.io/search/quotes?query=" + "albert" + "&fields=author");
    const fetchJson = await fetchRequest.json();
    const resultList = fetchJson.results;

    for (var a = 0;a < resultList.length;a++) {
      quotes.concat();
      var quote: QuoteInfo = {
        id: ID_COUNT++,
        content: resultList[a].content,
        author: resultList[a].author,
      };
      console.log(quote);
      setQuotes([...quotes]);
      quotes[a] = quote;
    }
    console.log("quotes list: " + quotes);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={description}
          placeholder="The thing you need to do"
          onChange={e => setDescription(e.target.value)}
        />
        <button onClick={getQuotes}>Save</button>
      </div>
      <div>
      {
          quotes.map((quo) => (
            <div key={quo.id}>
              {quo.content} <br />
              - {quo.author}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App