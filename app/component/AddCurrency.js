import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import FloatingInput from './FloatingInput';
import colors from '../config/colors';
import constants from '../config/constants';

function AddCurrency({onAddPress = () => {}, setVisible, theme, visible}) {
  const styles = createStyles(theme);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(constants);
  const [buyPrice, setBuyPrice] = useState('');
  const [quantity, setQuanity] = useState('');
  const [isAddDisabled, setIsAddDisabled] = useState(true);

  React.useEffect(() => {
    if (
      buyPrice != null &&
      buyPrice != '' &&
      quantity != null &&
      quantity != '' &&
      value != null &&
      value != ''
    )
      setIsAddDisabled(false);
    else setIsAddDisabled(true);
  }, [value, buyPrice, quantity]);
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => {
        setBuyPrice('');
        setQuanity('');
        setValue('');
        setOpen(false);
        setIsAddDisabled(true);
        setVisible(false);
      }}
      useNativeDriverForBackdrop={true}>
      <View style={styles.container}>
        <View>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setValue={setValue}
            setItems={setItems}
            setOpen={setOpen}
            placeholder="Select a crypto"
            schema={{
              label: 'name',
              value: 'asset_id',
            }}
            //renderListItem={renderItem}
          />
        </View>
        <View style={styles.inputCont}>
          <FloatingInput
            buy={true}
            label="Buy price"
            value={buyPrice}
            onChangeText={bp => setBuyPrice(bp.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
            theme={theme}
          />
          <FloatingInput
            buy={true}
            label="Quantity"
            value={quantity}
            onChangeText={quan => setQuanity(quan.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
            theme={theme}
          />
        </View>
        <View style={styles.buttonsCont}>
          <TouchableOpacity
            style={{
              ...styles.addButton,
              backgroundColor: isAddDisabled
                ? colors[theme].primary
                : colors[theme].green,
            }}
            disabled={isAddDisabled}
            onPress={() => {
              let name = value;
              for (let i = 0; i < constants.length; i++) {
                if (constants[i].asset_id === value) {
                  name = constants[i].name;
                  break;
                }
              }
              onAddPress(name, buyPrice, quantity, value);
              setBuyPrice('');
              setQuanity('');
              setValue('');
              setOpen(false);
              setIsAddDisabled(true);
              setVisible(false);
            }}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setBuyPrice('');
              setQuanity('');
              setValue('');
              setOpen(false);
              setIsAddDisabled(true);
              setVisible(false);
            }}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    inputCont: {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'stretch',
    },
    addButton: {
      padding: 16,
      backgroundColor: colors[theme].green,
      borderWidth: 2,
      borderColor: colors[theme].green,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginRight: 8,
    },
    addText: {
      color: colors[theme].white,
      fontSize: 20,
      fontWeight: 'bold',
    },
    cancelText: {
      color: colors[theme].red,
      fontSize: 20,
      fontWeight: 'bold',
    },
    cancelButton: {
      flex: 1,
      padding: 16,
      backgroundColor: colors[theme].secondary,
      borderWidth: 2,
      borderColor: colors[theme].red,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
    },
    container: {
      flex: 0.5,
      flexGrow: 1,
      backgroundColor: colors[theme].secondary,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttonsCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemCont: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: colors[theme].primary,
      alignItems: 'center',
    },
    itemText: {
      color: colors[theme].white,
      fontSize: 14,
    },
  });

export default AddCurrency;
