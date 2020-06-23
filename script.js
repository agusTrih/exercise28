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
            console.log(response);
            alert(`Terimakasih film yang anda masukan sudah kami daftarkan`);
        }
    } catch (error) {
        console.error(error);
    }
}
