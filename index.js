const movies = [
  { title: "The Shawshank Redemption", genre: "Drama" },
  { title: "The Godfather", genre: "Crime" },
  { title: "The Godfather: Part II", genre: "Crime" },
  { title: "The Dark Knight", genre: "Action" },
  { title: "12 Angry Men", genre: "Drama" },
  { title: "Schindler's List", genre: "Drama" },
  {
    title: "The Lord of the Rings: The Return of the King",
    genre: "Adventure",
  },
  { title: "Pulp Fiction", genre: "Crime" },
  { title: "The Good, the Bad and the Ugly", genre: "Western" },
  { title: "Fight Club", genre: "Drama" },
  { title: "Forrest Gump", genre: "Drama" },
  { title: "Inception", genre: "Action" },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    genre: "Adventure",
  },
  { title: "Star Wars: Episode V - The Empire Strikes Back", genre: "Action" },
  { title: "The Lord of the Rings: The Two Towers", genre: "Adventure" },
  { title: "The Matrix", genre: "Action" },
  { title: "Goodfellas", genre: "Crime" },
  { title: "One Flew Over the Cuckoo's Nest", genre: "Drama" },
  { title: "Seven Samurai", genre: "Adventure" },
  { title: "Se7en", genre: "Crime" },
  { title: "City of God", genre: "Crime" },
  { title: "The Silence of the Lambs", genre: "Thriller" },
  { title: "It's a Wonderful Life", genre: "Drama" },
  { title: "Life is Beautiful", genre: "Comedy" },
  { title: "The Usual Suspects", genre: "Crime" },
  { title: "Léon: The Professional", genre: "Action" },
  { title: "Spirited Away", genre: "Animation" },
  { title: "Saving Private Ryan", genre: "Drama" },
  { title: "Interstellar", genre: "Adventure" },
  { title: "The Green Mile", genre: "Drama" },
  { title: "The Prestige", genre: "Drama" },
  { title: "The Intouchables", genre: "Comedy" },
  { title: "The Lion King", genre: "Animation" },
  { title: "The Pianist", genre: "Drama" },
  { title: "The Departed", genre: "Crime" },
  { title: "Whiplash", genre: "Drama" },
  { title: "Gladiator", genre: "Action" },
];

let finalarray = [];

function searchByTitle(str, movies) {
  finalarray = movies.filter((ele) => {
    return ele.title.toLocaleLowerCase().includes(str);
  });
}

function searchByGenre(str, movies) {
  finalarray = movies.filter((ele) => {
    return ele.genre.toLocaleLowerCase().includes(str);
  });
}

let title = document.getElementById("title");
let genre = document.getElementById("genre");
let list = document.getElementById("results");
let select = document.getElementById("filter");

function sortByTitlefunc() {
  finalarray.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });

  displayorder();
}
function sortByGenrefunc() {
  finalarray.sort((a, b) => {
    if (a.genre < b.genre) {
      return -1;
    }
    if (a.genre > b.genre) {
      return 1;
    }
    return 0;
  });
  displayorder();
}

function displayResultsonselect() {
  if (select.value == "titleandgenre") {
    searchByTitle(title.value, movies);
    searchByGenre(genre.value, finalarray);
  } else if (select.value == "title") {
    searchByTitle(title.value, movies);
  } else if (select.value == "genre") {
    searchByGenre(genre.value, movies);
  } else {
    list.innerHTML = "";
  }

  displayorder();
}

function displayResults() {
  countul.innerHTML = "";
  list.innerHTML = "";
  if (title.value && genre.value) {
    searchByTitle(title.value, movies);
    searchByGenre(genre.value, finalarray);
  } else if (title.value) {
    searchByTitle(title.value, movies);
  } else if (genre.value) {
    searchByGenre(genre.value, movies);
  }

  displayorder();
}
let count = false;

function displayorder() {
  if (!finalarray.length) {
    list.innerHTML = "";
    const childnode = document.createElement("li");
    const childtext = document.createTextNode(`No result found`);
    childnode.appendChild(childtext);
    list.appendChild(childnode);
  } else {
    if (!count) {
      showbuttons();
    }

    countByGenre();

    list.innerHTML = "";
    finalarray.forEach((element) => {
      const childnode = document.createElement("li");
      const childtext = document.createTextNode(
        `${element.title}(${element.genre})`
      );
      childnode.appendChild(childtext);
      list.appendChild(childnode);
    });
    count = true;
  }
}

function showbuttons() {
  if (title.value || genre.value) {
    const sortByTitle = document.createElement("button");
    sortByTitle.setAttribute("id", "titlesort");
    sortByTitle.innerText = "sort by title";
    sortByTitle.addEventListener("click", sortByTitlefunc);
    list.insertAdjacentElement("beforebegin", sortByTitle);

    const sortByGenre = document.createElement("button");
    sortByGenre.setAttribute("id", "genresort");
    sortByGenre.innerText = "sort by genre";
    sortByGenre.addEventListener("click", sortByGenrefunc);
    sortByTitle.insertAdjacentElement("afterend", sortByGenre);
  }
  count = true;
}

const countul = document.createElement("ul");
countul.setAttribute("id", "countgenre");
list.insertAdjacentElement("afterend", countul);

function countByGenre() {
  countul.innerHTML = "";
  let mapGenre = new Map();
  finalarray.forEach((ele) => {
    let get = mapGenre.get(ele.genre);

    if (get) mapGenre.set(ele.genre, get + 1);
    else mapGenre.set(ele.genre, 1);
  });

  mapGenre.forEach((value, key) => {
    let countli = document.createElement("li");
    let counttext = document.createTextNode(`${key}:${value}`);
    countli.appendChild(counttext);
    countul.appendChild(countli);
  });
}
