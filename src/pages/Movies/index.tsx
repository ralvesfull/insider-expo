import React, {useEffect, useState} from "react";
import { View, Text } from 'react-native';
import Header from "../../components/header";
import {Container, ListMovies} from './styles';

import { getMovieSave } from '../../utils/storage';
import FavoriteItem from "../../components/favoriteItem";

import { useNavigation, useIsFocused } from "@react-navigation/native";


function Movies() {
    const navigation = useNavigation();
    const isFocused = useIsFocused(); // serve para mudar o estado da pagina forçando o useEffect a carregar novamente
    const [movies, setMovies] = useState([]);

    useEffect(()=>{

        let isActive = true;

        async function getFavoriteMovies(){

            const result = await getMovieSave('@reactFavorite');

            if(isActive){
                setMovies(result);
            }
        }

        if(isActive){
            getFavoriteMovies()
        }

        return ()=>{
            isActive = false;
        }

    }, [isFocused])
    return (
        <Container>
            <Header title="Meus filmes" />

            <ListMovies 
            showVerticalScrollIndicator={false}
                data={movies}
                keyExtractor={ item => String(item.id)}
                renderItem={({item}) => <FavoriteItem 
                data={item} /> }
            />
        </Container>
    )

}

export default Movies;