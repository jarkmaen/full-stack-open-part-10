import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import Text from './Text';
import theme from '../../theme';

const ReviewItem = ({ review }) => {
    const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');
    return (
        <View style={styles.reviewContainer}>
            <View style={styles.ratingContainer}>
                <Text color='primary' fontWeight='bold'>{review.rating}</Text>
            </View>
            <View style={styles.reviewDetails}>
                <Text fontWeight='bold'>{review.user.username}</Text>
                <Text style={styles.reviewDate}>{formattedDate}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    reviewContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10
    },
    reviewDetails: {
        flex: 1,
        marginLeft: 10
    },
    reviewDate: {
        marginBottom: 5,
        color: theme.colors.textSecondary
    },
    ratingContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ReviewItem;