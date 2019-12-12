import React, { Component } from 'react'
import { Text, View, StyleSheet,FlatList,TouchableOpacity, Image } from 'react-native'
import { firebaseApp } from './../../components/firebaseConfig';
import HeaderButton from '../../components/HeaderButton';



export default class SubjectTypeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSubjectType : []
        }
    }
    componentDidMount() {
        this.getSubjectType();
    }

    getSubjectType = ()=>{
        var dbSubjectType = firebaseApp.database().ref("subjectType");
        dbSubjectType.once('value', (snapshot)=> {
        //   console.log(snapshot);
          
          var lsSubjectType = [];
          snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            var temp = {...childData, id:childKey}
            // ...
            lsSubjectType.push(temp);
          });

          this.setState({listSubjectType : lsSubjectType})
          
        });
      }
    
    render() {
        return (
            <View style= {{flex: 1}}>
                <HeaderButton navigation = {this.props.navigation}/>
                <FlatList 
                    style={styles.container}
                    data = {this.state.listSubjectType}
                    renderItem = {({item})=>{
                        let {title,desc,icon,id} = item;
                        
                        return <View style={styles.boxSubject}>
                            <View style = {{flex: 1, flexDirection : 'row',alignSelf: 'flex-start',paddingTop: 10}}>
                                <View style={styles.iconBox}> 
                                    <Image  style={{width: 50, height: 50}}  source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/quizdanceapp.appspot.com/o/images%2Flevel1.png?alt=media&token=1c5236a8-fe87-4e59-91bb-3bf15b2a7d19'}} />
                                </View>
                                <View style={{flex:1}}>
                                    <Text style= {{fontSize:20,fontWeight:'bold',paddingBottom:7}}>{title}</Text>
                                    <Text>{desc}</Text>
                                    <TouchableOpacity  
                                        onPress= {()=>this.props.setSubjectTypeId(id)} 
                                        style={{ paddingTop:8,marginTop:15,borderRadius:7,alignSelf: 'center', backgroundColor : '#00cec9', width : 100, height:40 }}
                                    >
                                        <Text style={{textAlign:'center'}}>
                                            Start
                                        </Text>
                                    </TouchableOpacity>
                                    
                                </View>
                                
                            </View>
                            

                        </View>
                    }}
                    keyExtractor={(value) => value.id}
                />
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : 'rgba(255,255,255,0.4)',
        padding: 15,
        paddingTop: 25
    },
    boxSubject : {
        backgroundColor : 'green',
        margin:10,
        flex: 1,
        margin: 10,
        height: 150,
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: 3,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 0 },
        flexDirection: 'row',
        alignItems: "center",
        overflow: 'hidden',
        flexDirection: 'column',
        alignContent : 'center'
    },
    titleText : {
        fontSize: 20,
        fontWeight: 'bold'
    },
    iconBox : {
        width: 75, 
        height: 55,
        margin: 7,
        marginLeft: 12, 
        paddingRight:15, 
        borderRightColor: 'rgba(204,204,204,0.3)', 
        borderRightWidth: 1}
})