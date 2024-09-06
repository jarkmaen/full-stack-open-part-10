import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
    separator: {
        height: 10
    },
    picker: {
        margin: 10
    },
    search: {
        margin: 10,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white'
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const OrderPicker = ({ selectedOrder, setSelectedOrder }) => (
    <Picker
        selectedValue={selectedOrder}
        onValueChange={(itemValue) => setSelectedOrder(itemValue)}
        style={styles.picker}
    >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
);

const RepositoryListHeader = ({ selectedOrder, setSelectedOrder, searchKeyword, setSearchKeyword }) => (
    <View>
        <TextInput
            style={styles.search}
            placeholder="Search"
            value={searchKeyword}
            onChangeText={setSearchKeyword}
        />
        <OrderPicker selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
    </View>
);

class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        const { selectedOrder, setSelectedOrder, searchKeyword, setSearchKeyword } = this.props;
        return (
            <RepositoryListHeader
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
            />
        );
    };
    render() {
        const { repositories, handlePress } = this.props;
        const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];
        return (
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                ListHeaderComponent={this.renderHeader}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handlePress(item.id)}>
                        <RepositoryItem repository={item} />
                    </Pressable>
                )}
            />
        );
    }
}

const RepositoryList = () => {
    const [selectedOrder, setSelectedOrder] = useState('latest');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
    const orderBy = selectedOrder === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE';
    const orderDirection = selectedOrder === 'lowest' ? 'ASC' : 'DESC';
    const { repositories } = useRepositories({ orderBy, orderDirection, searchKeyword: debouncedSearchKeyword });
    const navigate = useNavigate();
    const handlePress = (id) => {
        navigate(`/repository/${id}`);
    };
    return (
        <RepositoryListContainer
            repositories={repositories}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            handlePress={handlePress}
        />
    );
};

export default RepositoryList;