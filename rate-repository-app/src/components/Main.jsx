import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../../theme';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import RepositoryView from './RepositoryView';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import ReviewList from './ReviewList';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.main
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/signin" element={<SignIn />}></Route>
                <Route path="signup" element={<SignUp />}></Route>
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/repository/:id" element={<RepositoryView />} />
                <Route path="/createreview" element={<ReviewForm />} />
                <Route path="/myreviews" element={<ReviewList />} />
            </Routes>
        </View>
    );
};

export default Main;