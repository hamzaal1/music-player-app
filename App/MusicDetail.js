import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

import Data from './DATA';

export default function MusicDetail({ route, navigation }) {
  const [progress, setProgress] = useState(0.008);
  const [currentAudioIndex, setCurrentAudioIndex] = useState();
  const { music } = route.params;
  const [sound, setSound] = useState();
  const [inLoop, setInLoop] = useState(false);
  const [musicState, setMusicState] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);


  const playSound = async () => {
    await loadMusic();
    await sound.playAsync();
    setMusicState(true);
  }
  const nextMusic = async () => {
    let nextAudioIndex = (currentAudioIndex + 1) % Data.length
    let music = Data[nextAudioIndex];
    setCurrentAudioIndex(nextAudioIndex)
    await stopSound()
    navigation.push('MusicDetail', { music });
  }
  const prevMusic = async () => {
    let prevAudioIndex = (currentAudioIndex - 1) % Data.length
    let music = Data[prevAudioIndex];
    setCurrentAudioIndex(prevAudioIndex)
    await stopSound()
    navigation.push('MusicDetail', { music });
  }
  const soundInLoop = async () => {
    if (sound) {
      setInLoop(!inLoop);
      await sound.setIsLoopingAsync(!inLoop);
      console.log("set in loop", !inLoop);
    }
  }
  const forwaredThreeSec = async () => {
    if ((position + 3000) >= duration) {
      return;
    }
    console.log("forwared by 3 seconds");
    await loadMusic();
    await sound.setPositionAsync(position + 3000);
    setPosition(position + 3000);
    setProgress((position + 3000) / duration);
  }
  const backwaredThreeSec = async () => {
    if ((position - 3000) <= 0) {
      return;
    }
    console.log("backwared by 3 seconds");
    await loadMusic();
    await sound.setPositionAsync(position - 3000);
    setPosition(position - 3000);
    setProgress((position - 3000) / duration);
  }

  const millisToMinutesAndSeconds = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  async function stopSound() {
    setMusicState(false);
    await sound.pauseAsync();
  }

  const loadMusic = async () => {
    if (!sound) {
      const { sound } = await Audio.Sound.createAsync(
        music.audio_music // Replace with your sound file path
      );

      setSound(sound);
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded) {
          setDuration(status.durationMillis);
          setPosition(status.positionMillis);
        }
      });
    }
  }
  useEffect(() => {
    loadMusic();
    let currentAudio = Data.findIndex((elem) => elem.id == music.id);
    setCurrentAudioIndex(currentAudio)
    console.log(music.id);
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound && musicState) {
        sound.getStatusAsync().then(status => {
          if (status.isLoaded) {
            if (status.positionMillis == status.durationMillis) {
              clearInterval(interval);
              nextMusic();
            } else {
              console.log("updating sound");

              setPosition(status.positionMillis);
              setProgress(status.positionMillis / status.durationMillis);
            }
          }
        });
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [sound, musicState]);

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons style={styles.font} onPress={() => navigation.navigate("MusicList")} name="keyboard-arrow-left" size={24} color="black" marginRight='30%' />
        <Text style={styles.text2}> Mix Disney</Text>
        <MaterialIcons style={styles.font1} name="menu" size={24} color="black" marginLeft='30%' />
      </View>
      <Image style={styles.image} source={music.image} />
      <Text style={styles.album_name}>{music.title}</Text>
      <Text style={styles.album}>{music.author}</Text>
      <SimpleLineIcons style={{ color: inLoop ? 'green' : 'black' }} name="loop" size={24} onPress={soundInLoop} color="black" marginLeft='69%' marginBottom='1%' />
      <AntDesign name="hearto" style={styles.heart} size={24} color="black" marginLeft='69%' />
      <View style={styles.stats}>
        <Text>0{millisToMinutesAndSeconds(position)}</Text>

        <Text>0{millisToMinutesAndSeconds(duration)}</Text>
      </View>
      <Progress.Bar style={styles.progress} progress={progress} width={300} color='black' button='20%' />
      <View style={styles.header}>
        <MaterialIcons style={{ transform: 'scaleX(-1)' }} onPress={backwaredThreeSec} name="forward-30" size={30} color="black" marginRight='5%' />
        <AntDesign name="stepbackward" onPress={prevMusic} size={30} color="black" marginRight='15%' />
        {
          musicState ? (<Ionicons name="pause" onPress={stopSound} size={30} color="black" />) :
            (<AntDesign onPress={playSound} name="caretright" size={30} color="black" />)
        }
        <AntDesign name="stepforward" onPress={nextMusic} size={30} color="black" marginLeft='15%' />
        <MaterialIcons name="forward-30" onPress={forwaredThreeSec} size={30} color="black" marginLeft='5%' />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: '10%'
    // justifyContent: 'center',
  },
  header: {
    display: 'flex',
    paddingButtom: '10%',
    flexDirection: 'row',
    justifyContent: 'beetween',
    alignItems: 'center',
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'beetween',
    gap: 230,
    width: 300,
    paddingVertical: 8
  },
  progress: {
    marginBottom: "7%"
  },
  image: {
    marginTop: "30%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // borderWidth:10,
    // borderColor:"#FEFAE0",

  },
  album: {
    marginBottom: "20%",
    marginTop: "1%",
    fontSize: 14
  },
  album_name: {
    marginTop: "4%",
    fontWeight: "600",
    fontSize: 18
  },
  heart: {
    button: '100%',
  }

  // text: {
  //   fontWeight: 'bold',
  //   fontSize: 20,
  //   // top: '-20%',
  // },
  // text1: {
  //   // top: '-17%'
  // },
});