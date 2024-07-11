// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';

const AlphabetFlasher = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const [currentLetter, setCurrentLetter] = useState(letters[0]);
    const [index, setIndex] = useState(0);

    const nextLetter = () => {
        if (index < letters.length - 1) {
            setIndex(index + 1);
            setCurrentLetter(letters[index + 1]);
        } else {
            setIndex(0);
            setCurrentLetter(letters[0]);
        }
    };

    return (
        <View style={stylesAlphabetFlasher.container}>
            <Text style={stylesAlphabetFlasher.letter}>{currentLetter}</Text>
            <Button title="Next Letter" onPress={nextLetter} />
        </View>
    );
};

const stylesAlphabetFlasher = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    letter: {
        fontSize: 150,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default function App() {
    return (
        <SafeAreaView style={stylesApp.safeArea}>
            <View style={stylesApp.container}>
                <Text style={stylesApp.title}>Learn to Read</Text>
                <AlphabetFlasher />
            </View>
        </SafeAreaView>
    );
}

const stylesApp = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        paddingTop: 20,
        paddingHorizontal: 16,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});