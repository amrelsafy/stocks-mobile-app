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
import {getTickerIconAPI, getTickersAPI} from '../../api/TickerService';

const LandingScreen = (): React.JSX.Element => {
  const [tickers, setTickers] = useState<ITicker[]>([]);
  const [loading, setLoading] = useState(false);

  const max_requests = 10;
  const time_window = 60000;

  const [currentNumberOfRequests, setCurrentNumberOfRequests] = useState(0);
  const [windowStart, setWindowStart] = useState(Date.now());

  const checkRequestWindow = () => {
    const now = Date.now();
    if (now - windowStart > time_window) {
      setWindowStart(now);
      setCurrentNumberOfRequests(0);
    }
  };

  const getTickersIcons = async (tickers: ITicker[]): Promise<ITicker[]> => {
    const tickersWithIcons = await Promise.all(
      tickers.map(async ticker => {
        const tickerIconURI = await getTickerIconAPI(ticker.ticker);
        setCurrentNumberOfRequests(currentNumberOfRequests + 1);
        return {...ticker, icon_url: tickerIconURI};
      }),
    );

    return tickersWithIcons;
  };

  const getTickers = async (search: string) => {
    try {
      setLoading(true);
      checkRequestWindow();

      if (currentNumberOfRequests < max_requests) {
        const tickersResult = await getTickersAPI(search);
        const tickersResultWithIcons = tickersResult
          ? await getTickersIcons(tickersResult)
          : [];

        setTickers(tickersResultWithIcons);
        setCurrentNumberOfRequests(currentNumberOfRequests + 1);
      } else {
        console.warn('Rate limit reached. Please try again in 1 minute');
      }
    } catch (error) {
      console.error(`Error while fetching tickers: ${error}`);
    } finally {
      setLoading(false);
    }
  };

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

        {loading ? (
          <Text style={styles.notFoundText}>
            Tickers are currently loading...
          </Text>
        ) : (
          <View style={styles.cardsContainer}>
            {tickers ? (
              tickers.map(ticker => (
                <TickerCard key={ticker.ticker} ticker={ticker} />
              ))
            ) : (
              <Text style={styles.notFoundText}>No tickers found</Text>
            )}
          </View>
        )}
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
