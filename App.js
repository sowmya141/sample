import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';


const image=require('./images/example.jpeg');

const App=()=>{
return(
  <View>
    <Text>
      Welcome
    </Text>
    <Image style={{height:200,width:100}} source={image}/>

   
  </View>
)
}

export default App