import React, { useState, useEffect } from "react";
import axios from "axios";

function RenderBooks(props) {
  const listBooks = props.data.map((e) => {
    return (
      <>
        <div className="book-card">
          <div
            className="card-img"
            style={{
              backgroundImage: `url(${e.imageLinks.thumbnail})`,
            }}
          ></div>
          <div className="card-content">
            <h2 className="card-title">{e.title}</h2>
            <h4 className="card-author">
              {e.authors.map((author, i) => {
                return e.authors.length !== i + 1 ? author + ", " : author;
              })}
            </h4>
            <p className="description">{e.description}</p>
          </div>
          <a href={e.previewLink}>
            {" "}
            <button className="card-btn">See More</button>
          </a>
        </div>
        <hr />
      </>
    );
  });
  return <div className="container">{listBooks}</div>;
}

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "whatever-you-want",
      },
    };

    const url = "https://reactnd-books-api.udacity.com/books";

    axios
      .get(url, config)
      .then((res) => {
        setBooks(res.data.books);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <main>
        <div className="container">
          <RenderBooks data={books} />
        </div>
      </main>
    </>
  );
}