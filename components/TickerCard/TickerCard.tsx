import {Image, StyleSheet, Text, View} from 'react-native';
import {ITicker} from '../../interfaces/ITicker';

const TickerCard = ({ticker}: {ticker: ITicker}) => {
  return (
    <View style={styles.cardContainer}>
      {ticker.icon_url ? (
        <Image
          source={{
            uri: ticker.icon_url,
          }}
          style={styles.cardIcon}
        />
      ) : (
        <Text style={styles.cardIconAlt}>
          {ticker.ticker.length > 2
            ? ticker.ticker.substring(0, 2)
            : ticker.ticker}
        </Text>
      )}

      <Text style={styles.cardTitle}>{ticker.ticker}</Text>

      <Text style={styles.cardDescription}>{ticker.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '47%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#23263A',
    padding: 10,
    minHeight: 150,
    borderColor: '#2B2C3E',
    borderWidth: 1,
  },
  cardIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
    borderRadius: 6,
  },
  cardIconAlt: {
    padding: 5,
    marginBottom: 10,
    borderRadius: 6,
    borderColor: '#7F8293',
    color: '#7F8293',
    textAlign: 'center',
    borderWidth: 1,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 10,
  },
  cardDescription: {
    color: '#7F8293',
    textAlign: 'center',
  },
});

export default TickerCard;
