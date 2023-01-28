import { useState, useEffect, KeyboardEvent } from 'react';
import './App.css';
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
  const [author, setAuthor] = useState("");
  var [searched, setSearch] = useState(false);

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
    setQuotes([...quotes]);
    quotes[0] = quote;
  }

  async function getQuotes() {
    if (author === "") return;

    setSearch(true);
    var url = "https://api.quotable.io/search/quotes?query=" + author + "&fields=author";
    const fetchRequest = await fetch(url);
    const fetchJson = await fetchRequest.json();
    const resultList = fetchJson.results;

    for (var a = 0;a < resultList.length;a++) {
      quotes.concat();
      var quote: QuoteInfo = {
        id: ID_COUNT++,
        content: resultList[a].content,
        author: resultList[a].author,
      };
      setQuotes([...quotes]);
      quotes[a] = quote;
    }
  }

  return (
    <div className={searched ? "top-div" : "centered-div"}>
      <div >
        <input
          type="text"
          value={author}
          placeholder="The thing you need to do"
          onChange={e => setAuthor(e.target.value)}
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