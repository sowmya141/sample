import {RecoilRoot} from 'recoil';
import React from 'react';
import JadeNavigation from './navigation/JadeNavigation';
import { NativeBaseProvider,  } from 'native-base';
import {View,Platform,StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

interface MyProps{
  isVisible:boolean
}
export default class App extends React.Component<MyProps>{
  constructor(props:any){
    super(props);
    this.state={
      isVisible:true
    }
  }
  Hide_Splash_Screen=()=>{  
   this.setState({   
     isVisible : false   
   });  
 }  
  
 componentDidMount(){  
   var that = this;  
   setTimeout(function(){  
     that.Hide_Splash_Screen();  
   }, 2200);  
  } 
  render(){
    let Splash_Screen=(
      <View style={styles.SplashScreen_RootView}>  
      <View style={styles.SplashScreen_ChildView}>  
      <Animatable.Image 
 style={{resizeMode:'contain', height: '40%', width: '50%'}}
 animation='zoomIn'
 delay={400}
 source={require('./src/assets/jadeLogo.png')}
/>
     </View>  
  </View> 
    )

    return(
      <RecoilRoot>
        <NativeBaseProvider>
         
          {this.state.isVisible?Splash_Screen:<JadeNavigation/>}
       
        </NativeBaseProvider>
      </RecoilRoot>
    )
  }
}

const styles = StyleSheet.create(  
  {  
      MainContainer:  
      {  
          flex: 1,  
          justifyContent: 'center',  
          alignItems: 'center',  
          paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  
      },  
     
      SplashScreen_RootView:  
      {  
          justifyContent: 'center',  
          flex:1,  
          margin: 10,  
          position: 'absolute',  
          width: '100%',  
          height: '100%',  
        },  
     
      SplashScreen_ChildView:  
      {  
          justifyContent: 'center',  
          alignItems: 'center',  
        
          flex:1,  
      },  
  }); 
