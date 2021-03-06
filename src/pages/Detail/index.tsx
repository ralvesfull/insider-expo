import React, { useState, useEffect } from "react";
import { Container, HeaderButton, Header, Banner, ButtonLink, Title, ContentArea, Rate, ListGenres, Description } from './styles';

import { Feather, Ionicons } from '@expo/vector-icons';

import { useNavigation, useRoute}  from '@react-navigation/native';
import api, { key } from '../../services/api';
import Stars from 'react-native-stars';
import  Genres  from '../../components/genres';
import { ScrollView } from "react-native-gesture-handler";
import { Modal } from "react-native";
import ModalLink from "../../components/modalLink";

import { deleteMovie, hasMovie, saveMovie }  from '../../utils/storage'
function Detail({}){

    const navigation = useNavigation();
    const route = useRoute();

    const [movie, setMovie] = useState({});
    const [openLink, setOpenLink] = useState(false);
    const [favoritedMovie, setFavoritedMovie] = useState(false);
    useEffect(()=>{
        let isActive:boolean = true;

        async function getMovie(){
            const response = await api.get(`/movie/${route.params?.id}`, {
                params:{
                    api_key:key,
                    language: 'pt-BR'
                }
            }).catch((err) =>{
                console.log(err)
            });

            if(isActive){
                
                setMovie(response.data);
                const isFavorite = await hasMovie('@reactFavorite', response.data);
                setFavoritedMovie(isFavorite)
            }

        } 

        
        if(isActive){
            getMovie();
        }
        
        return()=>{
            isActive = false;
        }

    },[]);

    async function favoriteMovie(item){

        if(favoritedMovie){
            await deleteMovie('@reactFavorite', item.id);
            setFavoritedMovie(false);
            return;
        }{
            await saveMovie('@reactFavorite', item);
            setFavoritedMovie(true);
            return; 
        }
        
    }
    return(
       <Container>
           <Header>
                <HeaderButton activeOpacity={0.7} onPress={()=> navigation.goBack()}>
                <Feather 
                    name="arrow-left"
                    size={25}
                    color="#FFF"/>
                </HeaderButton>

                <HeaderButton onPress={()=>favoriteMovie(movie)}>
                    { 
                    favoritedMovie ? (
                        <Ionicons 
                            name="bookmark"
                            size={25}
                            color="#FFF"
                        />
                    ):
                    (
                        <Ionicons 
                            name="bookmark-outline"
                            size={25}
                            color="#FFF"
                        />
                    )}
                    
                </HeaderButton>
            </Header>

            <Banner  
               resizeMethod="resize"
               source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
            />

            <ButtonLink onPress={()=> setOpenLink(true)}>
                <Feather 
                name="link" 
                size={24}
                color="#FFF"
                />
            </ButtonLink>

            <Title numberOfLines={2}>
                {movie.title}
            </Title>

            <ContentArea>
                <Stars 
                    default={movie.vote_average}
                    count={10}
                    half={true}
                    startSize={20}
                    fullStar={<Ionicons name="md-star" size={24} color="#E7A74e" />}
                    emptyStar={<Ionicons name="md-star-outline" size={24} color="#E7A74e" />}
                    halfStar={<Ionicons name="md-star-half" size={24} color="#E7A74e" />}
                    disable={true}
                />
                <Rate>{movie.vote_average}/10</Rate>
            </ContentArea>

            <ListGenres 
                data={[{id:1, name:'A????o'},{id:2, name:'A????o'}]}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                renderItem={(item) => <Genres data={item}/> }
            />


            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Descri????o</Title>
                <Description>
                    {movie?.overview}
                </Description>
            </ScrollView>

            <Modal animationType="slide" transparent={true} visible={openLink}>
                <ModalLink 
                    link={movie?.homepage}
                    title={movie?.title}
                    closeModal={() => setOpenLink(false)}
                />
            </Modal>
       </Container>
    )
}

export default Detail;