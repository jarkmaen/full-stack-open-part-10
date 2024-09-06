import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import Text from './Text';
import { Link, useNavigate } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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
    const { data } = useQuery(GET_CURRENT_USER);
    const isAuthenticated = data?.me;
    const client = useApolloClient();
    const authStorage = useAuthStorage();
    const navigate = useNavigate();
    const handleSignOut = async () => {
        await authStorage.removeAccessToken();
        await client.resetStore();
        navigate('/');
    };
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/" component={Pressable}>
                    <Text style={styles.pressable}>Repositories</Text>
                </Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/createreview" component={Pressable}>
                            <Text style={styles.pressable}>Create a review</Text>
                        </Link>
                        <Link to="/myreviews" component={Pressable}>
                            <Text style={styles.pressable}>My reviews</Text>
                        </Link>
                        <Pressable onPress={handleSignOut}>
                            <Text style={styles.pressable}>Sign out</Text>
                        </Pressable>
                    </>
                ) : (
                    <>
                        <Link to="/signin" component={Pressable}>
                            <Text style={styles.pressable}>Sign in</Text>
                        </Link>
                        <Link to="/signup" component={Pressable}>
                            <Text style={styles.pressable}>Sign up</Text>
                        </Link>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default AppBar;