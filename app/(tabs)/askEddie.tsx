import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Message = {
    id: string;
    sender: 'eddie' | 'user';
    text?: string;
    type?: 'file';
    fileName?: string;
};

const mockMessages: Message[] = [
  { id: '1', sender: 'eddie', text: 'First of all, can you please upload your latest transcript?' },
  { id: '2', sender: 'user', type: 'file', fileName: 'Uploaded transcript.pdf' },
  { id: '3', sender: 'eddie', text: 'Great! Based on your transcript, you are taking Chemistry Honors and are earning an A. Is this correct?' },
  { id: '4', sender: 'user', text: 'Yes.' },
  { id: '5', sender: 'eddie', text: 'Great job, Angela! Earning an A in Chemistry Honors is a strong indicator of your aptitude for science, and it opens up many exciting possibilities for your next school year. Are you interested in AP Biology or AP Chemistry?' },
];

export default function AskEddieScreen() {
  const [messages, setMessages] = useState(mockMessages);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim().length === 0) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: inputText.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate Eddie's reply
    setTimeout(() => {
        const eddieReply: Message = {
            id: Math.random().toString(),
            sender: 'eddie',
            text: "Thanks! I'm thinking...",
        };
        setMessages(prev => [...prev, eddieReply]);
    }, 1000);
  };

  const renderMessage: ListRenderItem<Message> = ({ item }) => {
    const isEddie = item.sender === 'eddie';
    if (item.type === 'file') {
      return (
        <View style={[styles.messageRow, isEddie ? styles.eddieRow : styles.userRow]}>
            <View style={styles.fileBubble}>
                <Ionicons name="document-text-outline" size={24} color={Colors.light.text} />
                <Text style={styles.fileText}>{item.fileName}</Text>
            </View>
        </View>
      );
    }
    return (
      <View style={[styles.messageRow, isEddie ? styles.eddieRow : styles.userRow]}>
        <View style={[styles.bubble, isEddie ? styles.eddieBubble : styles.userBubble]}>
          <Text style={isEddie ? styles.eddieText : styles.userText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.inputContainer}>
        <Ionicons name="mic-outline" size={24} color={Colors.light.icon} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Message Eddie"
          placeholderTextColor={Colors.light.secondaryText}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleSend}>
            <Ionicons name="paper-plane-outline" size={24} color={Colors.light.progressTint} style={styles.inputIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContainer: {
    padding: 16,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  eddieRow: {
    justifyContent: 'flex-start',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  bubble: {
    padding: 12,
    borderRadius: 20,
    maxWidth: '80%',
  },
  eddieBubble: {
    backgroundColor: Colors.light.cardBackground,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: Colors.light.progressTint,
    borderBottomRightRadius: 4,
  },
  eddieText: {
    color: Colors.light.text,
  },
  userText: {
    color: '#fff',
  },
  fileBubble: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.light.cardBackground,
      borderRadius: 20,
      padding: 12,
      maxWidth: '80%',
  },
  fileText: {
      marginLeft: 8,
      color: Colors.light.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.light.progressBackground,
    backgroundColor: Colors.light.cardBackground,
    paddingRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginHorizontal: 8,
  },
  inputIcon: {
      padding: 4,
  }
}); 