// Filename: index.js
// Combined code from all files

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

const ChineseLessonList = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.post(API_URL, {
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant. Provide a list of lessons for learning basic Chinese.'
                        },
                        {
                            role: 'user',
                            content: 'Can you list some basic lessons for learning Chinese?'
                        }
                    ],
                    model: 'gpt-4o'
                });
                const { data } = response;
                const lessonData = JSON.parse(data.response);
                setLessons(lessonData);
            } catch (error) {
                console.error('Error fetching lessons:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.lessonList}>
            {lessons.map((lesson, index) => (
                <View key={index} style={styles.lesson}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonContent}>{lesson.content}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollViewContent: {
        flexGrow: 1,
        padding: 16,
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
    lessonList: {
        width: '100%',
    },
    lesson: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    lessonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    lessonContent: {
        fontSize: 16,
    },
});

export default function App() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <Text style={styles.title}>Learn Chinese</Text>
                    <ChineseLessonList />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}