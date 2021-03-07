

import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, Text, View, TouchableOpacity as TO, ScrollView, TextInput } from 'react-native'
import { getDataPerson } from './_home_srv'


function Home({ navigation }) {

    const [person, setPerson] = useState()
    const [scroll, setScroll] = useState(false)
    const [duringMomentum, setDuringMomentum] = useState(true)
    const [page, setPage] = useState(1)
    const [lastId, setLastId] = useState(0)
    useEffect(() => {

        getDataPerson(page).then((res) => {
            console.log('res', res)
            setPerson(res.data.results)
            setPage(page + 1)

        })
    }, [])
    function onScroll() {
        setScroll(true)
    }
    const handleLoadMore = async () => {
        console.log('resid tahesh')
        setPage(page + 1)
        if (!duringMomentum) {
            try {
                getDataPerson(page).then((res) => {
                    if (res.data.length === 0) {
                        return;
                    } else {
                        setLastId(res.data.results[0])
                        setPerson(person.concat(...res.data.results))
                    }
                })
            } catch (e) {
                console.log(e);
            }
            setDuringMomentum(true);
        }
    }

    const refreshData = async () => {
        setScroll(true)
        setLastId(0)
        console.log('refresh')
        try {
            getDataPerson(1).then((res) => {
                if (res.data.length === 0) {
                    setPerson([]);
                    setScroll(false)
                    setPage(2);
                    console.log('refresh tamam')

                } else {
                    setPerson(res.data.results)
                    setScroll(false)
                    setPage(2);
                    setLastId(res.data.result[0])
                    console.log('refresh tamam ba data')

                }
            })
        } catch (e) {
            setScroll(false)
        }
    }

    function goToDetail(url) {
        navigation.navigate('detail', {
            url: url
        })
    }

    function searchWord(text){
        console.log('text is ',text)
       person.filter(function (item) {
            console.log(item.name.includes(text),'searching') ;
          });

    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 10, paddingTop: 10 }}>

            <FlatList
                data={person}
                refreshControl={
                    <RefreshControl
                        refreshing={scroll}
                        onRefresh={refreshData}
                    />
                }
                onEndReached={handleLoadMore}
                onMomentumScrollBegin={() => {
                    setDuringMomentum(false);
                }}
                numColumns={2}
                onEndReachedThreshold={0.1}
                renderItem={({ item, index }) => {
                    return (
                        <View key={index.toString()} style={{ width: '45%', height: 200, backgroundColor: '#ebebeb', borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', marginHorizontal: '2.5%', marginBottom: 10 }}>
                            <TO onPress={() => goToDetail(item.url)}>
                                <Text>Name: {item.name}</Text>
                                <Text>gender: {item.gender}</Text>
                                <Text>eye_color: {item.eye_color}</Text>
                                <Text>height: {item.height}</Text>
                            </TO>
                        </View>
                    )
                }}
            ></FlatList>

            <View style={{ flexDirection: 'row' }}>
                <TO style={{ width: 50, height: 30, backgroundColor: '#03c2fc', borderRadius: 5, margin: 10, justifyContent: 'center', alignItems: 'center' }}></TO>
                <TextInput
                    style={{ width: 200 }}
                    onChangeText={(text)=> searchWord(text)}
                    
                    />
            </View>

        </View>
    )
}

export default Home;