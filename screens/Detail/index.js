

import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, Text, View, TouchableOpacity as TO, ActivityIndicator } from 'react-native'
import { getPersonFullDetail } from './_detail_srv';



function Detail({ route }) {
    const [person, setPerson] = useState(null)
    useEffect(() => {
        const url = route.params.url
        const arr = url.split('/', 6);
        console.log(arr[5], 'url is')

        getPersonFullDetail(arr[5]).then((res) => {
            console.log('res data is', res.data)
            setPerson(res.data)
        })
    }, [])

    return (
        <View style={{flex:1, backgroundColor: 'white' }}>
            {person === null ? (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator color="black" />
                </View>
            ) : (
                    <View>
                        <Text>Name : {person.name}</Text>
                    </View>
                )}
        </View>
    )
}

export default Detail;