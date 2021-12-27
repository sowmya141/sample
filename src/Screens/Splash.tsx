import React, { Component } from 'react';  
 import { Platform, StyleSheet, View, Text,  
 Image, TouchableOpacity, Alert } from 'react-native';  
 import { DemoProceed } from '.';
 import * as Animatable from 'react-native-animatable';
 interface splash{
     isVisible:boolean
 }
 export default class Myapp extends Component<splash>  
{  
   constructor(props:splash){  
     super(props);  
     this.state={  
     isVisible : true,  
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
    }, 1700);  
   }  
   
    render()  
    {  
        let Splash_Screen = (  
             <View style={styles.SplashScreen_RootView}>  
                 <View style={styles.SplashScreen_ChildView}>  
                 <Animatable.Image 
            style={{resizeMode:'contain', height: '40%', width: '50%'}}
            animation='zoomIn'
            delay={400}
            source={require('../assets/jadeLogo.png')}
           />
                </View>  
             </View> )  
         return(  
     
             <View style = { styles.MainContainer }>  
                      {console.log('visible',this.state.isVisible)}
                 {  
                  (this.state.isVisible === false) ? 
                  Splash_Screen :
                   <View><DemoProceed/></View>  
                }  
            </View>  
              );  
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