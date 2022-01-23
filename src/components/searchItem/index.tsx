import React from "react";
import { View, Text } from "react-native";
import { Rate, RateContainer } from "../sliderItem/styles";
import { Banner, Container, Title } from "./styles";
import { Ionicons } from '@expo/vector-icons';

function SearchItem({data, navigatePage}){

    function detailMovie(){
        if(data.item.release_date === ''){
            alert('Filme não disponível');
            return;
        }
        navigatePage(data);
    }
    return(
       <Container activeOpacity={0.7} onPress={detailMovie}>
           {data?.item.poster_path ? (
               <Banner 
                resizeMethod="resize"
                source={{ uri: `https://image.tmdb.org/t/p/original/${data.item.poster_path}` }}
                />
           ) : 
           (
            <Banner 
            resizeMethod="resize"
            source={ require('../../assets/no-image.png')}
            />
           )}

           <Title>{data?.item.title}</Title>

           <RateContainer>
               <Ionicons name="md-star" size={12} color="#E7A74e" />
               <Rate>{data?.item.vote_average}/10 </Rate>
           </RateContainer>
       </Container>
    )
}

export default SearchItem;