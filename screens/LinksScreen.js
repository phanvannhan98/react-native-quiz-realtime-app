import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Image, Alert } from 'react-native';
import HeaderButton from '../components/HeaderButton';
import { firebaseApp } from '../components/firebaseConfig.js';
import { FlatList } from 'react-native-gesture-handler';

const imagesRequire = [
  {
    key: 'images/level1.png',
    value: require('../assets/images/level1.png')
  },
  {
    key: 'images/level2.png',
    value: require('../assets/images/level2.png')
  },
  {
    key: 'images/logo.jpg',
    value: require('../assets/images/logo.jpg')
  }
]

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database().ref("questions");
    this.levelRef = firebaseApp.database().ref("subjectLevel");
    this.testRef = firebaseApp.database().ref("test");
    this.state = {
      dataSource: []
    }
  }

  componentDidMount(){
    this.addDB();
    this.testDb();
  }

  testDb(){
    this.testRef.on('child_added', (data) => {
      console.log(data);
      Alert.alert('run')
    })
  }

  setDB = () => {
    // this.itemRef.set([
    //   {
    //     id: 1,
    //     title: "Cấp độ 1",
    //     icon: "icon1.png",
    //     question: [
    //       {
    //         id: 1,
    //         q: "Câu hỏi 1",
    //         ans: 3,
    //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
    //       },
    //       {
    //         id: 2,
    //         q: "Câu hỏi 2",
    //         ans: 2,
    //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
    //       },
    //       {
    //         id: 3,
    //         q: "Câu hỏi 3",
    //         ans: 2,
    //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
    //       },
    //       {
    //         id: 4,
    //         q: "Câu hỏi 4",
    //         ans: 4,
    //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
    //       },
    //       {
    //         id: 5,
    //         q: "Câu hỏi 5",
    //         ans: 1,
    //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
    //       }
    //     ]
    //   },
    //   {
    //     id: 2,
    //     title: "Cấp độ 2",
    //     icon: "icon2.png",
    //     question: [
    //       {
    //         id: 1,
    //         q: "Câu hỏi 1",
    //         ans: 3,
    //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
    //       },
    //       {
    //         id: 2,
    //         q: "Câu hỏi 2",
    //         ans: 2,
    //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
    //       },
    //       {
    //         id: 3,
    //         q: "Câu hỏi 3",
    //         ans: 2,
    //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
    //       },
    //       {
    //         id: 4,
    //         q: "Câu hỏi 4",
    //         ans: 4,
    //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
    //       },
    //       {
    //         id: 5,
    //         q: "Câu hỏi 5",
    //         ans: 1,
    //         select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"]
    //       }
    //     ]
    //   }
    // ])

    // this.itemRef.set([
    //     {
    //       id: 1,
    //       q: "Câu hỏi 1",
    //       ans: 3,
    //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
    //       idlevel: 1
    //     },
    //     {
    //       id: 2,
    //       q: "Câu hỏi 2",
    //       ans: 2,
    //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
    //       idlevel: 1
    //     },
    //     {
    //       id: 3,
    //       q: "Câu hỏi 3",
    //       ans: 2,
    //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
    //       idlevel: 1
    //     },
    //     {
    //       id: 4,
    //       q: "Câu hỏi 4",
    //       ans: 4,
    //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
    //       idlevel: 1
    //     },
    //     {
    //       id: 5,
    //       q: "Câu hỏi 5",
    //       ans: 1,
    //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
    //       idlevel: 1
    //     },{
    //       id: 6,
    //       q: "Câu hỏi 1",
    //       ans: 3,
    //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
    //       idlevel: 2
    //     },
    //     {
    //       id: 7,
    //       q: "Câu hỏi 2",
    //       ans: 2,
    //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
    //       idlevel: 2
    //     },
    //     {
    //       id: 8,
    //       q: "Câu hỏi 3",
    //       ans: 2,
    //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
    //       idlevel: 2
    //     },
    //     {
    //       id: 9,
    //       q: "Câu hỏi 4",
    //       ans: 4,
    //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
    //       idlevel: 2
    //     },
    //     {
    //       id: 10,
    //       q: "Câu hỏi 5",
    //       ans: 1,
    //       select: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
    //       idlevel: 2
    //     }
    //   ]
    // )
  }

  addDB = () => {
    let items = [];
    this.levelRef.on('child_added', (dataSnapshot) => {
      console.log(dataSnapshot);
      
      items.push({
        name: dataSnapshot.val(),
        key: dataSnapshot.key
      });

      this.setState({
        dataSource: items
      })
    })
  }

  render() {
    console.log(this.state.dataSource);
    
    return (
      <View style={styles.container}>
        <HeaderButton navigation={this.props.navigation} />
        <ScrollView style={styles.container}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => {
              var a = item.name.icon;
              var imgSource = imagesRequire.find(n => n.key === item.name.icon).value;
              return (
                <View style={{ display: "flex", flexDirection: "row", alignItems:'center', borderBottomColor: 'pink', borderBottomWidth: 1, borderStyle: 'solid'}}>
                  <Image source={imgSource} style={{ width: 100, height: 100 }} />
                  <Text>
                    {item.name.title}
                  </Text>
                </View>
              )
            }}
            keyExtractor={(value) => value.key}
          />
        </ScrollView>
      </View>
    );
  }
}

LinksScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
