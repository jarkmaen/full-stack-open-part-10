import { View, StyleSheet, Image, Pressable, Linking } from 'react-native';
import theme from '../../theme';
import Text from './Text';

const formatCount = (count) => {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
};

const RepositoryItem = ({ repository, showGitHubButton }) => {
    if (!repository) {
        return null;
    }
    const {
        fullName,
        description,
        language,
        forksCount,
        stargazersCount,
        ratingAverage,
        reviewCount,
        ownerAvatarUrl,
        url
    } = repository;
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
                <View style={styles.infoContainer}>
                    <Text fontWeight='bold'>{fullName}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.language}>{language}</Text>
                </View>
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text fontWeight='bold'>{formatCount(stargazersCount)}</Text>
                    <Text>Stars</Text>
                </View>
                <View style={styles.statItem}>
                    <Text fontWeight='bold'>{formatCount(forksCount)}</Text>
                    <Text>Forks</Text>
                </View>
                <View style={styles.statItem}>
                    <Text fontWeight='bold'>{formatCount(reviewCount)}</Text>
                    <Text>Reviews</Text>
                </View>
                <View style={styles.statItem}>
                    <Text fontWeight='bold'>{ratingAverage}</Text>
                    <Text>Rating</Text>
                </View>
            </View>
            {showGitHubButton && (
                <Pressable
                    style={styles.button}
                    onPress={() => Linking.openURL(url)}
                >
                    <Text style={styles.buttonText}>Open in GitHub</Text>
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: theme.colors.repositoryItem
    },
    row: {
        flexDirection: 'row'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 7,
        marginRight: 10
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    description: {
        color: theme.colors.textSecondary,
        marginTop: 3
    },
    language: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        padding: 3,
        borderRadius: 3,
        alignSelf: 'flex-start',
        marginTop: 6
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    statItem: {
        alignItems: 'center'
    },
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: '#0366d6',
        alignItems: 'center',
        margin: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default RepositoryItem;