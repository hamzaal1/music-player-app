import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Item from './components/Item'
import Data from "./DATA";


const MusicList = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.main_title}> Music List</Text>
            </View>

            <FlatList
                data={Data}
                renderItem={({ item }) => (<Item music={item} />)}
                keyExtractor={item => item.id}
                refreshing={true}
            />
        </SafeAreaView>
    )
}

export default MusicList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '10%'
        // justifyContent: 'center',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    header: {
        display: 'flex',
        paddingButtom: '10%',
        flexDirection: 'row',
        justifyContent: 'beetween',
        alignItems: 'center',
        marginBottom: "3%"
    },
    main_title: {
        fontWeight: "bold",
        fontSize: 15,
    }

})