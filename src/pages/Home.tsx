import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList, Keyboard } from 'react-native'
import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

interface SkillData {
    id: string,
    name: string
}

export function Home() {
    const [newSkill, setNewSkill] = useState('')
    const [mySkills, setMySkills] = useState<SkillData[]>([])
    const [greeting, setGreeting] = useState('')

    function handleAddNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }

        setMySkills(oldState => [...oldState, data])
        
        Keyboard.dismiss()
        setNewSkill('')
    }

    function handleRemoveSkill(id: string) {
        setMySkills(oldState => oldState.filter(
            skill => skill.id !== id
        ))
    }

    useEffect(() => {
        const currentHour = new Date().getHours()

        if(currentHour < 12 && currentHour >= 4) {
            setGreeting('Good morning!')
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good afternoon!')
        } else {
            setGreeting('Good evening!')
        }
    }, [])

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Welcome, Lucas!
            </Text>

            <Text style={styles.greeting}>
                { greeting }
            </Text>

            <TextInput 
                style={styles.input}
                placeholder="New skill"
                placeholderTextColor="#555"
                onChangeText={setNewSkill}
                maxLength={30}
                value={newSkill}
            />

            <Button 
                title="Add"
                onPress={handleAddNewSkill} 
            />

            <Text style={[styles.title, { marginVertical: 50 }]}>
                My Skills
            </Text>

            <FlatList 
                data={mySkills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SkillCard 
                        skill={item.name}
                        onLongPress={() => handleRemoveSkill(item.id)}
                    />
                )}
            />     
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize: 18,
        padding: 15,
        marginTop: 30,
        borderRadius: 7
    },
    greeting: {
        color: '#fff'
    }
})
