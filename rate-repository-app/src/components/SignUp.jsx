import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';
import theme from '../../theme';
import Text from './Text';

const validationSchema = Yup.object({
    username: Yup.string()
        .required('Username is required')
        .min(5, 'Username length must be between 5 and 30 characters')
        .max(30, 'Username length must be between 5 and 30 characters'),
    password: Yup.string()
        .required('Password is required')
        .min(5, 'Username length must be between 5 and 50 characters')
        .max(50, 'Password length must be between 5 and 50 characters'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),
});

const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
};

const SignUpContainer = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, formik.touched.username && formik.errors.username && styles.inputError]}
                placeholder="Username"
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
                value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={styles.errorText}>{formik.errors.username}</Text>
            )}
            <TextInput
                style={[styles.input, formik.touched.password && formik.errors.password && styles.inputError]}
                placeholder="Password"
                secureTextEntry
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}
            <TextInput
                style={[styles.input, formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && styles.inputError]}
                placeholder="Password confirmation"
                secureTextEntry
                onChangeText={formik.handleChange('passwordConfirmation')}
                onBlur={formik.handleBlur('passwordConfirmation')}
                value={formik.values.passwordConfirmation}
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                <Text style={styles.errorText}>{formik.errors.passwordConfirmation}</Text>
            )}
            <Pressable onPress={formik.handleSubmit}>
                <Text style={styles.button}>Sign up</Text>
            </Pressable>
        </View>
    );
};

const SignUp = () => {
    const [createUser] = useMutation(CREATE_USER);
    const [signIn] = useSignIn();
    const navigate = useNavigate();
    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await createUser({
                variables: {
                    user: {
                        username,
                        password
                    },
                },
            });
            await signIn({ username, password });
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };
    return <SignUpContainer onSubmit={onSubmit} />;
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

export default SignUp;