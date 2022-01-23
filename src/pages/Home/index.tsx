import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from 'react-native';

import { Container, SearchContainer, Input, SearchButton, Title, Banner, BannerButton, SliderMovie } from './styles';

import { Feather } from "@expo/vector-icons";
import Header from "../../components/header";
import SliderItem from "../../components/sliderItem";
import api, { key } from '../../services/api';
import { getListMovies, randomBanner } from '../../utils/movies';
import { useNavigation } from '@react-navigation/native';


function Home() {

    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [bannerMovie, setBannerMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [input, setInput] = useState('');

    useEffect(()=>{

        let isActive = true;
        const ac = new AbortController();

        async function getMovies(){
            //https://api.themoviedb.org/3/movie/now_playing/?api_key=24b2b942211e48f5a72d534f65adf98a&language=pt-BR&page=1
            const [nowData, populardata, topData] = await Promise.all([
                api.get('https://api.themoviedb.org/3/movie/now_playing/?', {
                    params:{
                        api_key: key,
                        language:'pt-BR',
                        page:1
                    }
                }), 
                api.get('https://api.themoviedb.org/3/movie/popular/?', {
                    params:{
                        api_key: key,
                        language:'pt-BR',
                        page:1
                    }
                }), 
                api.get('https://api.themoviedb.org/3/movie/top_rated/?', {
                    params:{
                        api_key: key,
                        language:'pt-BR',
                        page:1
                    }
                }), 
        
            ])
    
            if(isActive){
                const nowList:any = getListMovies(7, nowData.data.results);
                const popularList:any = getListMovies(5, populardata.data.results);
                const topList:any = getListMovies(5, topData.data.results);

                setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)]);
                setNowMovies(nowList);
                setPopularMovies(popularList);
                setTopMovies(topList);
                
                setLoading(false);
            }
            
        }
        
        getMovies();
        return ()=>{
            isActive = false;
            ac.abort();
        }
    },[])
    

    function navigateDetailsPage(item){
        navigation.navigate('Detail', {id: item.id})
    };

    function handleSearchMovie(){

        if(input === '')return;

        navigation.navigate('Search', {name:input});
        setInput('');
    }
    if(loading){
        return(
            <Container>
                <ActivityIndicator size="large" color="#fff" />
            </Container>
        )
    }
    return (


        <Container>
            <Header title="React Prime" />
            <SearchContainer>
                <Input
                    placeholder="Ex. Vingadores"
                    placeholderTextColor="#ccc"
                    value={input}
                    onChangeText={ (text)=> setInput(text) } />

                <SearchButton onPress={handleSearchMovie}>
                    <Feather name="search" size={20} color="#fff" />
                </SearchButton>
            </SearchContainer>


            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Em Cartaz</Title>
                
                <BannerButton activeOpacity={0.6} onPress={() => navigateDetailsPage(bannerMovie)} >
                    <Banner
                        resizeMethod="resize"
                        source={{ uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}` }}
                    />
                </BannerButton>

                
                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={({item}) => <SliderItem data={item} navigatePage={()=> navigateDetailsPage(item)} /> }
                    keyExtractor={(item) => String(item.id)}
                />


            <Title>Populares</Title>
            <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={({item}) => <SliderItem data={item} navigatePage={()=> navigateDetailsPage(item)} /> }
                    keyExtractor={(item) => String(item.id)}
                />

            <Title>Mais Votados</Title>
            <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={({item}) => <SliderItem data={item} navigatePage={()=> navigateDetailsPage(item)} /> }
                    keyExtractor={(item) => String(item.id)}
                />



            </ScrollView>
        </Container>
    )

}

export default Home;