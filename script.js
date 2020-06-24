let button = document.getElementById("button-add");
button.addEventListener("click", addMovie);

// function
async function addMovie() {
    try {
        let title = document.getElementById("title").value;
        let genre = document.getElementById("genre").value;
        let releaseYear = document.getElementById("release-year").value;
        let imageUrl = document.getElementById("image-url").value;
        let desc = document.getElementById("desc").value;

        // objek
        let movieData = {
            title,
            genre,
            releaseYear,
            imageUrl,
            desc,
        };
        let url = `https://5ef168cb1faf160016b4d5b8.mockapi.io/api/movie`;

        let response = await fetch(url);
        let allMovies = await response.json();

        let addMovie = allMovies.filter((movie) => movie.title === title);

        // jika sudah terdaftar
        if (addMovie.length > 0) {
            alert(`Film ini sudah terdaftar`);
        } else {
            // jika belum terdaftar masukan kedalam database
            let options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(movieData),
            };
            let response = await fetch(url, options);
            let results = await response.json();
            // console.log(response);
            alert(`Terimakasih film yang anda masukan sudah kami daftarkan`);
        }
    } catch (error) {
        console.error(error);
    }
}

// get

let endpoint = `https://5ef168cb1faf160016b4d5b8.mockapi.io/api/movie`;
let options = {
    method: "GET",
};

fetch(endpoint, options)
    .then((Response) => Response.json())
    .then((results) => {
        console.log(results);
        results.forEach((result) => {
            const output = document.getElementById("output");
            const card = document.createElement("div");
            card.setAttribute("id", "card");
            output.appendChild(card);

            // card get
            card.innerHTML = `
            <div class="image">
            <img src=${result.imageUrl} /></div>
            <div class="text-movie">
            <div class="title-genre">
            <p class="title">Title: ${result.title}</p>
            <p class="genre">Genre: ${result.genre}</p>
            <p class="release">Release Year: ${result.releaseYear}</p>
            </div>
            <p class="desc">Deskripsi: ${result.desc}</p>
            </div>
            `;
        });
    })
    .catch((error) => console.log(error));
