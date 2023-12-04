import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {FIRESTORE} from '../../../../FirebaseConfig';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import {useAuth} from '../../common/hooks/useAuth';
import {TouchableOpacity} from 'react-native-gesture-handler';

const FeedbackComponent = () => {
  const [feedback, setFeedback] = useState('');
  const {userName} = useAuth();
  const handleSubmit = async () => {
    if (feedback.trim() === '') {
      alert('Please enter your feedback');
      return;
    }

    try {
      const feedbackCollectionRef = collection(FIRESTORE, 'Feedback');
      await addDoc(feedbackCollectionRef, {
        name: userName, // Replace with actual user name if available
        feedback: feedback,
        timestamp: serverTimestamp(),
      });
      alert('Feedback submitted successfully');
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback: ', error);
      alert('Failed to submit feedback');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.descriptionText}>
        Submit Suggestions, new ideas, new features, report bugs. Any feedback
        is appreciated.
      </Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Enter your feedback..."
        value={feedback}
        onChangeText={setFeedback}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Example background color
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Example text color
  },
  input: {
    height: 100,
    borderColor: '#001f3f', // Example border color
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
    width: '100%', // Ensure full width
    borderRadius: 5, // Rounded corners
  },
  button: {
    backgroundColor: '#001f3f', // Example button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Text color for button
    fontSize: 16,
  },
});

export default FeedbackComponent;
