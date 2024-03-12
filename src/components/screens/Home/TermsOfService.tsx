import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const TermsOfServiceScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Terms of Service for Boone Bars</Text>
      <Text style={styles.date}>Last updated: March 12th, 2024</Text>
      <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
      <Text style={styles.paragraph}>
        By accessing or using the Service, you agree to be bound by these Terms.
        If you disagree with any part of the terms, then you do not have
        permission to access the Service.
      </Text>
      <Text style={styles.sectionTitle}>2. Privacy & User Information</Text>
      <Text style={styles.paragraph}>
        We care about the privacy of our users. While we strive to use
        commercially acceptable means to protect your personal information, we
        cannot guarantee its absolute security. Our Privacy Policy, incorporated
        by reference into these Terms, explains how we collect, use, and
        disclose information that pertains to your privacy. For more
        information, please see our Privacy Policy.
      </Text>
      <Text style={styles.sectionTitle}>3. Disclaimer of Liability</Text>
      <Text style={styles.paragraph}>
        a. Your use of the Service is at your sole risk. The Service is provided
        on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without
        warranties of any kind, whether express or implied, including, but not
        limited to, implied warranties of merchantability, fitness for a
        particular purpose, non-infringement, or course of performance.
      </Text>
      <Text style={styles.paragraph}>
        b. Boone Bars and its subsidiaries, affiliates, and its licensors do not
        warrant that a) the Service will function uninterrupted, secure, or
        available at any particular time or location; b) any errors or defects
        will be corrected; c) the Service is free of viruses or other harmful
        components; or d) the results of using the Service will meet your
        requirements.
      </Text>
      <Text style={styles.sectionTitle}>4. User Responsibilities</Text>
      <Text style={styles.paragraph}>
        You are responsible for all your activity in connection with the
        Service. You shall abide by all applicable local, state, national, and
        international laws and regulations.
      </Text>
      <Text style={styles.sectionTitle}>5. Changes</Text>
      <Text style={styles.paragraph}>
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. By continuing to access or use our Service after
        those revisions become effective, you agree to be bound by the revised
        terms. If you do not agree to the new terms, you are no longer
        authorized to use the Service.
      </Text>
      <Text style={styles.sectionTitle}>6. Contact Us</Text>
      <Text style={styles.paragraph}>
        If you have any questions about these Terms, please contact us at
        lshuntley20@gmail.com
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TermsOfServiceScreen;
