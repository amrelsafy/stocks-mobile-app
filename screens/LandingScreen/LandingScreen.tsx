import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import TickerCard from '../../components/TickerCard/TickerCard';
import {useEffect, useState} from 'react';
import {ITicker} from '../../interfaces/ITicker';
import {throttle} from 'lodash';

const LandingScreen = (): React.JSX.Element => {
  const [tickers, setTickers] = useState<ITicker[]>([]);

  const getTickers = throttle(async (ticker: string) => {
    try {
      const baseURL =
        'https://api.polygon.io/v3/reference/tickers?active=true&limit=3&apiKey=CJmSkMjPVdVbvctPa3kviO7tCfzNZcKv';
      const fetchURL = ticker ? baseURL + `&ticker=${ticker}` : baseURL;
      const res = await fetch(fetchURL);
      const data = await res.json();
      setTickers(data.results);
    } catch (error) {
      console.log('Error while fetching tickers');
    }
  }, 5000);

  const onSearch = async (input: string) => {
    await getTickers(input);
  };

  useEffect(() => {
    getTickers('');
  }, []);

  return (
    <View style={styles.landingScreenBackground}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/NasdaqLogo.png')}
          style={styles.headerImage}
        />
      </View>

      <ScrollView style={{margin: 20}}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search for stocks"
            placeholderTextColor="#5E5C6F"
            style={styles.searchInput}
            onChangeText={onSearch}
          />
        </View>

        <View style={styles.cardsContainer}>
          {tickers ? (
            tickers.map(ticker => (
              <TickerCard key={ticker.ticker} ticker={ticker} />
            ))
          ) : (
            <Text style={styles.notFoundText}>No tickers found</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  landingScreenBackground: {
    backgroundColor: '#202130',
    flex: 1,
  },
  header: {
    backgroundColor: '#191920',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerImage: {
    height: 50,
    width: 130,
  },
  searchContainer: {
    backgroundColor: '#23263A',
    borderRadius: 60,
    paddingHorizontal: 20,
    borderColor: '#2B2C3E',
    borderWidth: 2,
    marginBottom: 20,
  },
  searchInput: {
    color: '#5E5C6F',
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  notFoundText: {
    color: '#5E5C6F',
  },
});

export default LandingScreen;
