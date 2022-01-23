import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getMovieSave(key){
    const myMovies = await AsyncStorage.getItem(key);

    let movieSave = JSON.parse(myMovies) || [];

    return movieSave;
}

export async function saveMovie(key, newMovie){

    let movieStored = await getMovieSave(key);

    const hasMovie = movieStored.some(item => item.id === newMovie.id);

    if(hasMovie){
        console.log('Filme já favoritado.')
        return;
    }

    movieStored.push(newMovie);

    await AsyncStorage.setItem(key, JSON.stringify(movieStored));
    console.log("Filme salvo.")
}

export async function deleteMovie(key, id){
    let movieStored = await getMovieSave(key);

    let myMovies = movieStored.filter( item => {
        return (item.id !== id);
    });

    await AsyncStorage.setItem(key, JSON.stringify(myMovies));
    console.log('Filme deletado.');

    return myMovies;
}

export async function hasMovie(key, movie){
    let movieStored = await getMovieSave(key);

    const hasMovie = movieStored.find(item => item.id === movie.id);

    if(hasMovie){
        return true;
    }
    else{
        return false;
    }
}