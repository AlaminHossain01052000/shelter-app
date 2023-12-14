// ResourceComponent.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { faCirclePlus, faDroplet, faBowlFood, faHouseMedical } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../utils/IconButton';



const Resources = ({navigation}) => {
    const handleAddButtonPress = () => {
        // Implement the logic for the add button press
        console.log('Add button pressed');
    };

    const handleResourceButtonPress = (resourceType) => {
        // Implement the logic for each resource button press
        console.log(`${resourceType} button pressed`);
    };

    return (
        <View style={styles.container}>
            <IconButton title="Add a Resource" icon={faCirclePlus} color="#3498db" onPress={()=>navigation.push('AddResources')}/>

            <View style={styles.resourcesContainer}>
                <Text style={styles.resourcesHeader}>Resources</Text>

                <View style={styles.resourceButtonsContainer}>
                    <IconButton title="Water" icon={faDroplet} color="#2ecc71" />
                    <IconButton title="Food" onPress={()=>navigation.push('FoodScreen')} icon={faBowlFood} color="#e74c3c" />
                    <IconButton title="Medical" onPress={()=>navigation.push('MedicalScreen')} icon={faHouseMedical} color="#f39c12" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resourcesContainer: {
        marginTop: 20,
    },
    resourcesHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    resourceButtonsContainer: {
        flexDirection: 'column',

        alignItems: 'center'
    },
});

export default Resources;
