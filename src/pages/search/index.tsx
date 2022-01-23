import React, {useState, useEffect} from "react";
import { Container, ListMovies, Name } from "./styles";

import api, {key} from '../../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import SearchItem from "../../components/searchItem";

function Search(){

    const navigation = useNavigation();
    const route = useRoute();

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        let isActive = true;

        async function getSeachMovie(){

            const response = await api.get("https://api.themoviedb.org/3/search/movie", {
                params:{
                    query: route?.params?.name,
                    api_key: key, 
                    language:"pt-BR",
                    page:1
                }
            });

            if(isActive){
                setMovie(response.data.results);
                setLoading(false);
            }

        }

        if(isActive){
            getSeachMovie();
        }
        
    },[])

    function navigateDetailsPage(data){
        
        navigation.navigate('Detail', {id: data.item.id})
    };

    if(loading){
        return(
            <Container></Container>
        )
    }
    return(
        <Container>
           <ListMovies 
            data={movie}
            showVerticalScrollIndicator={false}
            keyExtractor={(item)=>String(item.id)}
            renderItem={(item)=> <SearchItem data={item} navigatePage={()=>navigateDetailsPage(item)} />}
           />
        </Container>
    )
}

export default Search;