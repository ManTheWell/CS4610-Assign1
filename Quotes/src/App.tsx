import { useState, useEffect, KeyboardEvent } from 'react';
import './App.css';

//

// stores the author of the quote as well as the quote content
interface QuoteInfo {
  id: number,
  content: string,
  author: string,
}

function App() {
  let ID_COUNT = 0; // keeps track of the quote ids
  const [quotes, setQuotes] = useState<QuoteInfo[]>([]);  // the array of quotes
  const [author, setAuthor] = useState("");               // the quote author the user is searching for
  var [searched, setSearch] = useState(false);            // has the user performed a search yet? (used to move search bar to top of page)


  // retrieves the random quote first displayed on the home page
  useEffect(() => {
    getRandom();
  }, []);

  // fetch a random quote using the api
  async function getRandom() {
    // get a json of a random quote
    const fetchRequest = await fetch("https://api.quotable.io/random");
    const fetchJson = await fetchRequest.json();
    
    // create a quote from the json
    var quote: QuoteInfo = {
      id: ID_COUNT++,
      content: fetchJson.content,
      author: fetchJson.author,
    };
    // add the quote and update quotes
    quotes[0] = quote;
    setQuotes([...quotes]);
  }

  // get a list of quotes using a quote author name
  async function getQuotes() {
    // if the search bar is empty do nothing
    if (author === "") return;

    // the user has searched something, move the search bar to the top of screen
    setSearch(true);

    // get the list of quotes using author
    var url = "https://api.quotable.io/search/quotes?query=" + author + "&fields=author";
    const fetchRequest = await fetch(url);
    const fetchJson = await fetchRequest.json();
    const resultList = fetchJson.results;

    // for each returned quotation add it to the quotes list
    for (var a = 0;a < resultList.length;a++) {
      quotes.concat(); // add a space for the new quote
      var quote: QuoteInfo = {
        id: ID_COUNT++,
        content: resultList[a].content,
        author: resultList[a].author,
      };
      // assign the new quote to the new empty space
      quotes[a] = quote;
      // update quotes
      setQuotes([...quotes]);
    }
  }

  // return
  return (
    // centered until a search is performed
    <div className={searched ? "top-div" : "centered-div"}>
      {/* the title bar */}
      <div className='title'>
          <b>QUOTE SEARCH</b>
      </div>
      {/* the input bar and search button */}
      <div>
        <input 
          className='input-line'
          type="text"
          value={author}
          placeholder="Enter An Author's Name"
          onChange={e => setAuthor(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { {getQuotes()} }
        }}
        />
        <button onClick={getQuotes} className='button'>Search</button>
      </div>
      {/* add the quotes from the list to the page */}
      <div>
        {
          quotes.map((quo) => (
          <div key={quo.id} className='quote'>
            <div className='content'>
              {quo.content}
            </div>
            <div className='author'>
              - {quo.author}
            </div>
          </div>
          ))
        }
      </div>
    </div>
  )
}

// export the app
export default App