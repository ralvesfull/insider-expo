export function getListMovies(size:number, movies:any){
    let popularMovies = [];

    for(let i:number=0;  i < size;  i++){
        popularMovies.push(movies[i]);
    }

    return popularMovies;
}

// Gerar um numero aleatório com base no tamanho da lista de filmes que eu passar
export function randomBanner(movies){
    return Math.floor(Math.random() * movies.length);
}