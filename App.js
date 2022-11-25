import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Dice1 from './assets/images/dice1.png';
import Dice2 from './assets/images/dice2.png';
import Dice3 from './assets/images/dice3.png';
import Dice4 from './assets/images/dice4.png';
import Dice5 from './assets/images/dice5.png';
import Dice6 from './assets/images/dice6.png';
const App = () => {
  const [uri1, setUri1] = useState(Dice1);
  const [uri2, setUri2] = useState(Dice2);
  const [text, setText] = useState('Who is gonna be the threeman!?');
  const [threeman, setThreeman] = useState(false);
  const [doublesCount, setDoublesCount] = useState(0);
  const [auxText, setAuxText] = useState('');
  const dice = {
    1: Dice1,
    2: Dice2,
    3: Dice3,
    4: Dice4,
    5: Dice5,
    6: Dice6,
  };
  const buttonTapped = () => {
    setText('');
    setAuxText('');
    let randomNumber1 = Math.floor(Math.random() * 6) + 1;
    let randomNumber2 = Math.floor(Math.random() * 6) + 1;
    setUri1(randomNumber1);
    setUri2(randomNumber2);
    gameLogic(randomNumber1, randomNumber2);
  };
  const gameLogic = (dice1, dice2) => {
    if (!threeman) {
      if (dice1 + dice2 === 3 || dice1 === 3 || dice2 === 3) {
        setText("Yikes! You're the threeman!");
        setAuxText('Pass the dice to the left to start the round!');
        setThreeman(true);
        return;
      }
      return;
    }
    if (dice1 === dice2) {
      if (doublesCount === 0) {
        setText(`DOUBLES!!!`);
        setAuxText('Pass to whoever you want to drink!!!');
        setDoublesCount(doublesCount + 1);
        return;
      } else {
        setDoublesCount(doublesCount + 1);
        setText(`ANOTHER DOUBLE!!!`);
        setAuxText(
          `Pass to whoever you want to drink! Multiplier is ${
            doublesCount + 1
          }x `,
        );
        return;
      }
    }
    if (doublesCount > 0) {
      setText(`Drink for ${(dice1 + dice2) * doublesCount} seconds!`);
      setDoublesCount(0);
      return;
    }
    if (dice1 + dice2 === 3 || dice1 === 3 || dice2 === 3) {
      if (dice1 + dice2 === 7) {
        setText('Person to your left and the threeman drink!');
        setAuxText("If you're the threeman, pick a new one!");
        return;
      }
      if (dice1 + dice2 === 11) {
        setText('Person to your right and the threeman drink!');
        setAuxText("If you're the threeman, pick a new one!");
        return;
      }
      setText('Threeman Drinks!');
      setAuxText("If you're the threeman, pick a new one!");
    } else if (dice1 + dice2 === 7) {
      setText('Person to your left drinks!');
    } else if (dice1 + dice2 === 11) {
      setText('Person to your right drinks!');
    } else {
      setText('Your turn is over, pass to the left!');
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={buttonTapped}>
        <Image style={styles.image} source={uri1} />
        <Image style={styles.image} source={uri2} />
      </TouchableOpacity>
      <Text style={styles.mainText}>{text}</Text>
      <Text style={styles.auxText}>{auxText}</Text>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: '5%',
  },
  mainText: {
    fontSize: 25,
    marginBottom: '10%',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
  },
  auxText: {
    fontSize: 16,
  },
});
