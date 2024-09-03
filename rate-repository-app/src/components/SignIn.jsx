import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import React from 'react';
import { useFormik } from 'formik';
import theme from '../../theme';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const initialValues = {
    username: '',
    password: '',
};

const onSubmit = (values) => {
    console.log(values);
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

const SignIn = () => {
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
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
                secureTextEntry
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}
            <Pressable onPress={formik.handleSubmit}>
                <Text style={styles.button}>Sign in</Text>
            </Pressable>
        </View>
    );
};

export default SignIn;