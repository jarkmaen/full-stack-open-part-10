import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';
import theme from '../../theme';

const validationSchema = Yup.object({
    ownerName: Yup.string().required('Repository owner name is required'),
    repositoryName: Yup.string().required('Repository name is required'),
    rating: Yup.number()
        .required('Rating is required')
        .min(0, 'Rating must be between 0 and 100')
        .max(100, 'Rating must be between 0 and 100'),
    text: Yup.string(),
});

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
};

export const ReviewFormContainer = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, formik.touched.ownerName && formik.errors.ownerName && styles.inputError]}
                placeholder="Repository owner name"
                onChangeText={formik.handleChange('ownerName')}
                onBlur={formik.handleBlur('ownerName')}
                value={formik.values.ownerName}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
            )}
            <TextInput
                style={[styles.input, formik.touched.repositoryName && formik.errors.repositoryName && styles.inputError]}
                placeholder="Repository name"
                onChangeText={formik.handleChange('repositoryName')}
                onBlur={formik.handleBlur('repositoryName')}
                value={formik.values.repositoryName}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
            )}
            <TextInput
                style={[styles.input, formik.touched.rating && formik.errors.rating && styles.inputError]}
                placeholder="Rating between 0 and 100"
                onChangeText={formik.handleChange('rating')}
                onBlur={formik.handleBlur('rating')}
                value={formik.values.rating}
                keyboardType="numeric"
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={styles.errorText}>{formik.errors.rating}</Text>
            )}
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Review"
                onChangeText={formik.handleChange('text')}
                onBlur={formik.handleBlur('text')}
                value={formik.values.text}
                multiline
                numberOfLines={4}
            />
            <Pressable onPress={formik.handleSubmit}>
                <Text style={styles.button}>Create a review</Text>
            </Pressable>
        </View>
    );
};

const ReviewForm = () => {
    const [createReview] = useMutation(CREATE_REVIEW);
    const navigate = useNavigate();
    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values;
        try {
            const { data } = await createReview({
                variables: {
                    review: {
                        ownerName,
                        repositoryName,
                        rating: parseInt(rating),
                        text
                    }
                }
            });
            navigate(`/repository/${data.createReview.repository.id}`);
        } catch (e) {
            console.log(e);
        }
    }
    return <ReviewFormContainer onSubmit={onSubmit} />;
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'white'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 16,
        borderRadius: 4,
        color: theme.colors.textSecondary
    },
    textArea: {
        height: 100
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: 12,
        borderRadius: 4,
        color: 'white',
        textAlign: 'center'
    },
    inputError: {
        borderColor: '#d73a4a'
    },
    errorText: {
        color: '#d73a4a',
        marginBottom: 12
    }
});

export default ReviewForm;