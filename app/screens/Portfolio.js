import React from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Currency from '../component/Currency';
import Footer from '../component/Footer';
import InvestmentOverview from '../component/InvestmentOverview';
import Separator from '../component/Separator';
import colors from '../config/colors';

function Portfolio(props) {
  const styles = createStyles('dark');
  const data = Array(10)
    .fill()
    .map((v, i) => ({id: i}));
  const leftAction = () => (
    <TouchableOpacity
      style={{
        backgroundColor: colors['dark'].green,
        flex: 0.2,
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}>
      <Text style={{fontSize: 18, color: colors['dark'].white}}>Edit</Text>
    </TouchableOpacity>
  );

  const rightAction = () => (
    <TouchableOpacity
      style={{
        backgroundColor: colors['dark'].red,
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
      }}>
      <Text style={{fontSize: 18, color: colors['dark'].white}}>Delete</Text>
    </TouchableOpacity>
  );
  const renderItem = item => {
    return (
      <Swipeable
        renderLeftActions={leftAction}
        renderRightActions={rightAction}>
        <Currency />
      </Swipeable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.holdingsContainer}>
        <View style={styles.holdings}>
          <Text style={styles.holdingsText}>Holdings </Text>
          <View style={styles.holdingNumberCont}>
            <Text style={styles.holdingsNumberText}>14</Text>
          </View>
        </View>
        <Separator
          dashColor={colors['dark'].blue}
          style={{
            width: '22%',
            marginVertical: 16,
            borderRadius: 100,
            overflow: 'hidden',
          }}
          dashThickness={2}
        />
      </View>
      <View style={styles.investmentContainer}>
        <InvestmentOverview />
      </View>
      <FlatList
        //contentContainerStyle={styles.flatlistContainer}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        //onRefresh={onRefresh}
        renderItem={({item}) => renderItem(item)}
        //refreshing={refresh && !loadingMore}
        style={styles.flatlist}
        ItemSeparatorComponent={() => (
          <Separator
            dashColor={colors['dark'].grey}
            dashStyle={{height: 0.5}}
          />
        )}
        decelerationRate={2}
      />
      <View style={styles.footerCont}>
        <Footer />
      </View>
    </SafeAreaView>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].primary,
      width: '100%',
      height: '100%',
    },
    portfolio: {
      padding: 16,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    portfolioText: {
      color: colors[theme].white,
      fontSize: 25,
      fontWeight: 'bold',
    },
    holdingsContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 24,
    },
    holdings: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    holdingsText: {
      color: colors[theme].blue,
      fontSize: 16,
    },
    holdingsNumberText: {
      color: colors[theme].white,
      fontSize: 12,
      fontWeight: 'bold',
    },
    holdingNumberCont: {
      backgroundColor: colors[theme].blueDark,
      alignItems: 'center',
      justifyContent: 'center',
      height: 20,
      width: 20,
      borderRadius: 20,
    },
    investmentContainer: {
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    footerCont: {
      //position: 'absolute',
      bottom: 0,
    },
    flatlist: {
      backgroundColor: colors[theme].primary,
      bottom: 0,
    },
  });

export default Portfolio;
