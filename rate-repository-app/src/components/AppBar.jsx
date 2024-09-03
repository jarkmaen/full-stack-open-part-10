import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBar,
        flexDirection: 'row'
    },
    pressable: {
        color: 'white',
        padding: 10,
        fontWeight: theme.fontWeights.bold
    }
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/" component={Pressable}>
                    <Text style={styles.pressable}>Repositories</Text>
                </Link>
                <Link to="/signin" component={Pressable}>
                    <Text style={styles.pressable}>Sign in</Text>
                </Link>
            </ScrollView>
        </View>
    );
};

export default AppBar;