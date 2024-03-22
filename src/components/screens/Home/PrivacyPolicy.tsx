import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy for Boone Bars</Text>
      <Text style={styles.date}>Last updated: November 28th, 2023</Text>
      <Text style={styles.sectionTitle}>Interpretation and Definitions</Text>
      <Text style={styles.paragraph}>
        The words of which the initial letter is capitalized have meanings
        defined under the following conditions. The following definitions shall
        have the same meaning regardless of whether they appear in singular or
        in plural.
      </Text>
      {/* Definitions */}
      <Text style={styles.sectionTitle}>
        Collecting and Using Your Personal Data
      </Text>
      <Text style={styles.paragraph}>
        Types of Data Collected include Email address, First name and last name,
        Usage Data. Usage Data is collected automatically when using the
        Service.
      </Text>
      {/* Use of Your Personal Data */}
      <Text style={styles.sectionTitle}>Retention of Your Personal Data</Text>
      <Text style={styles.paragraph}>
        The Company will retain Your Personal Data only for as long as is
        necessary for the purposes set out in this Privacy Policy.
      </Text>
      {/* Transfer of Your Personal Data */}
      <Text style={styles.sectionTitle}>Disclosure of Your Personal Data</Text>
      <Text style={styles.paragraph}>
        Business Transactions, Law enforcement, Other legal requirements.
      </Text>
      {/* Security of Your Personal Data */}
      <Text style={styles.sectionTitle}>Security of Your Personal Data</Text>
      <Text style={styles.paragraph}>
        The security of Your Personal Data is important to Us, but remember that
        no method of transmission over the Internet, or method of electronic
        storage is 100% secure.
      </Text>
      {/* Children's Privacy */}
      <Text style={styles.sectionTitle}>Children's Privacy</Text>
      <Text style={styles.paragraph}>
        Our Service does not address anyone under the age of 13. We do not
        knowingly collect personally identifiable information from anyone under
        the age of 13.
      </Text>
      {/* Links to Other Websites */}
      <Text style={styles.sectionTitle}>Links to Other Websites</Text>
      <Text style={styles.paragraph}>
        Our Service may contain links to other websites that are not operated by
        Us.
      </Text>
      {/* Changes to this Privacy Policy */}
      <Text style={styles.sectionTitle}>Changes to this Privacy Policy</Text>
      <Text style={styles.paragraph}>
        We may update Our Privacy Policy from time to time. We will notify You
        of any changes by posting the new Privacy Policy on this page.
      </Text>
      {/* Contact Us */}
      <Text style={styles.sectionTitle}>Contact Us</Text>
      <Text style={styles.paragraph}>
        If you have any questions about this Privacy Policy, You can contact us:
        By email: lshuntley20@gmail.com
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

export default PrivacyPolicyScreen;
