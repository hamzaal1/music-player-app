import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Item = ({ music }) => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate("MusicDetail", {music });
    };
    return (
        <Pressable onPress={handlePress} style={styles.item}>
            <View style={styles.view}>
                <View style={styles.view}>
                    <Image style={styles.image} source={music.mini_image} />
                </View>
                <View >
                    <Text style={styles.title}>{music.title}</Text>
                    <Text style={styles.author}>{music.author}</Text>
                </View>
            </View>


        </Pressable>
    )
};

export default Item

const styles = StyleSheet.create({
    view: {
        display: "flex",
        flexDirection: "row"

    },
    image: {
        width: 60,
        height: 60,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        margin: 10,

    },
    title: {
        marginTop: 25,
        fontWeight: "bold",
    },
    author: {
        color: "grey",
    }
})