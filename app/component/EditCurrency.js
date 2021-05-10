import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import colors from '../config/colors';
import FloatingInput from './FloatingInput';
import useStore from '../store/useStore';

function EditCurrency(props) {
  const {item, theme} = props.route.params;
  const {editCrypto, editSub} = useStore();
  const [isBuy, setIsBuy] = React.useState(true);
  const [price, setPrice] = React.useState();
  const [quantity, setQuanity] = React.useState();
  const [isModifyDisabled, setIsModifyDisabled] = React.useState(true);
  props.navigation.setOptions({title: item.name + ' (' + item.id + ')'});
  const styles = createStyles(theme);

  React.useEffect(() => {
    if (price != null && price != '' && quantity != null && quantity != '')
      setIsModifyDisabled(false);
    else setIsModifyDisabled(true);
  }, [price, quantity]);
  return (
    <View style={styles.container}>
      <View style={styles.typeContainer}>
        <Text style={styles.typeText}>Type</Text>
        <View style={styles.buySellContainer}>
          <TouchableOpacity
            style={{
              ...styles.buyContainer,
              backgroundColor: isBuy
                ? colors[theme].blue
                : colors[theme].primary,
            }}
            onPress={() => setIsBuy(true)}>
            <Text style={styles.buyText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.sellContainer,
              backgroundColor: isBuy
                ? colors[theme].primary
                : colors[theme].red,
            }}
            onPress={() => setIsBuy(false)}>
            <Text style={styles.sellText}>Sell</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputCont}>
        <View style={{marginBottom: 10}}>
          <FloatingInput
            buy={isBuy}
            label={(isBuy ? 'Buy' : 'Sell') + ' price'}
            value={price}
            onChangeText={bp => setPrice(bp.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
            theme={theme}
          />
        </View>
        <View style={{marginTop: 10}}>
          <FloatingInput
            buy={isBuy}
            label="Quantity"
            value={quantity}
            onChangeText={quan => setQuanity(quan.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
            theme={theme}
          />
        </View>
      </View>
      <View style={styles.buttonsCont}>
        <TouchableOpacity
          disabled={isModifyDisabled}
          style={{
            ...styles.addButton,
            backgroundColor: isModifyDisabled
              ? colors[theme].primary
              : isBuy
              ? colors[theme].blue
              : colors[theme].red,
            borderColor: isBuy ? colors[theme].blue : colors[theme].red,
          }}
          onPress={() => {
            editCrypto({
              id: item.id,
              price: price,
              quantity: quantity,
              buy: isBuy,
            });
            editSub(item.id, price, quantity, isBuy);
            props.navigation.goBack();
          }}>
          <Text style={styles.addText}>Modify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    addText: {
      color: colors[theme].white,
      fontSize: 20,
      fontWeight: 'bold',
    },
    buySellContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buyContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: 8,
      backgroundColor: colors[theme].blue,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: colors[theme].blue,
    },
    buyText: {
      color: colors[theme].white,
      fontSize: 18,
      textAlign: 'center',
    },
    sellText: {
      color: colors[theme].white,
      fontSize: 18,
      textAlign: 'center',
    },
    sellContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginLeft: 8,
      backgroundColor: colors[theme].red,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: colors[theme].red,
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
      backgroundColor: colors[theme].primary,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cryptoText: {
      fontSize: 20,
      color: colors[theme].white,
    },
    cryptoTextContainer: {
      width: '100%',
      alignItems: 'center',
    },
    typeContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    typeText: {
      color: colors[theme].white,
      fontSize: 18,
    },
    buttonsCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    addButton: {
      padding: 16,
      backgroundColor: colors[theme].blue,
      borderWidth: 2,
      borderColor: colors[theme].blue,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginRight: 8,
    },
    inputCont: {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'stretch',
    },
  });

export default EditCurrency;
