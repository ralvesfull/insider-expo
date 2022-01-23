import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import stackRoutes from './stackRoutes';
import movies from '../pages/Movies';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

function Routes(){

    return(
        <Drawer.Navigator 
            screenOptions={{
                
                drawerStyle:{
                    backgroundColor: '#090a0e',
                    padding: 20
                },

                drawerActiveBackgroundColor:'#e72f49',
                drawerActiveTintColor:'#fff',
                drawerInactiveTintColor:'#fff'
            }}
        >
            <Drawer.Screen
             name="home" 
             component={stackRoutes} 
                options={{
                    headerShown:false,
                    title:'Home',
                    drawerIcon: ({focused, size, color })=>(
                        <MaterialCommunityIcons 
                            name={focused ? 'home-city' : 'home-city-outline'}
                            size= {size}
                            color={color}
                        />
                    )
                }}
             />
            <Drawer.Screen 
                name="movies" 
                component={movies} 
                options={{
                    headerShown:false,
                    title:'Filmes',
                    drawerIcon: ({focused, size, color })=>(
                        <MaterialCommunityIcons 
                            name={focused ? 'movie-open' : 'movie-open-outline'}
                            size= {size}
                            color={color}
                        />
                    )
                }}/>

        </Drawer.Navigator>
    )
}

export default Routes;