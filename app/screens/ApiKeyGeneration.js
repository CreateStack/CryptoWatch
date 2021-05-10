import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';

import colors from '../config/colors';
import Separator from '../component/Separator';
import useStore from '../store/useStore';

function ApiKeyGeneration(props) {
  const {getState, subscribeStore} = useStore();
  const [darkMode, setDarkMode] = React.useState(getState().crypto.darkMode);
  const theme = darkMode ? 'dark' : 'light';
  const styles = createStyles(theme);
  let unSubscribe = subscribeStore(async () => {
    setDarkMode(await getState().crypto.darkMode);
  });
  React.useEffect(() => {
    AsyncStorage.getItem('apiKey')
      .then(value => setKey(value ? value : 'your_api_key'))
      .catch(error => console.log('Error fetching api key: ', error));
    return () => unSubscribe();
  }, []);

  const [editKey, setEditKey] = React.useState(false);
  const [key, setKey] = React.useState('your_api_key');
  return (
    <View style={styles.container}>
      <Separator
        dashColor={colors[theme].grey}
        dashStyle={{height: 0.5}}
        style={{width: '100%'}}
      />
      <View style={styles.currentContainer}>
        <Text style={styles.currentText}>Current key: </Text>
        {editKey ? (
          <TextInput
            placeholder="API Key"
            style={{...styles.currentText, width: '60%'}}
            placeholderTextColor={colors[theme].white}
            defaultValue={key}
            onChangeText={text => setKey(text)}
            multiline
          />
        ) : (
          <Text style={{...styles.currentText, width: '60%'}} multiline>
            {key}
          </Text>
        )}
        <Icon
          size={30}
          name={editKey ? 'checkcircleo' : 'edit'}
          onPress={() =>
            setEditKey(v => {
              if (v) {
                AsyncStorage.setItem('apiKey', key);
              }
              return !v;
            })
          }
          color={editKey ? colors[theme].blue : colors[theme].green}
        />
      </View>
      <Separator
        dashColor={colors[theme].grey}
        dashStyle={{height: 0.5}}
        style={{width: '100%'}}
      />
      <TouchableOpacity
        style={styles.generateButton}
        onPress={() =>
          Linking.openURL(
            'https://www.cryptocompare.com/coins/guides/how-to-use-our-api/',
          )
        }>
        <Text style={{...styles.currentText, fontWeight: 'bold'}}>
          Generate api key
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: colors[theme].primary,
      flex: 1,
      height: '100%',
      width: '100%',
      alignItems: 'center',
    },
    currentContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    currentText: {
      color: colors[theme].white,
      fontSize: 14,
    },
    generateButton: {
      alignItems: 'center',
      width: '90%',
      padding: 16,
      backgroundColor: colors[theme].blue,
      borderRadius: 6,
      top: 16,
    },
  });

export default ApiKeyGeneration;
