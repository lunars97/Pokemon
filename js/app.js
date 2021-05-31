const API = "https://pokeapi.co/api/v2/pokemon";
let nextUrl = null;
let prevUrl = null;
fetchData(API); // once the web had been loaded, the
function fetchData(url) {
    fetch(url)
        .then((response) => response.json())
        .then((response) => {
            nextUrl = response.next;
            prevUrl = response.previous;
            render(response.results);
        });
}

function render(data) {
    console.log(data);
    $(".pokemons-list").html("");
    data.forEach((item) => {
        $(".pokemons-list").append(`<li>${item.name}</li>`);
    });
}

$(".next-btn").on("click", function () {
    if (!nextUrl) return;
    fetchData(nextUrl);
});
$(".prev-btn").on("click", function () {
    if (!prevUrl) return;
    fetchData(prevUrl);
});

$("body").on("click", "li", function (e) {
    let pokemonName = e.target.innerText;
    fetch(`${API}/${pokemonName}/`)
        .then((res) => res.json())
        .then((response) => showModal(response));
});

function showModal(pokemon) {
    console.log(pokemon);
    $(".main-modal").css("display", "block");
    $(".pokemon-info").append(`
    <li><img src='${pokemon.sprites.front_default}' alt="pokemon-img"></li>
    <li><em>Name: ${pokemon.name}</li>
    <li>Type: ${pokemon.types.map((item) => item.type.name)}
    <li>Weight: ${pokemon.weight}</li>
    <li>Height: ${pokemon.height}</li>`);
    $("li").css({ listStyle: "none", fontSize: "20px" });
    $("img").css("width", "200px");
}

$(".btn-close").on("click", function () {
    $(".main-modal").css("display", "none");
    $(".pokemon-info").html("");
});
