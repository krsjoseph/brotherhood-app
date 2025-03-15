import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Link } from 'expo-router';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      // TODO: Implement Firebase password reset
      console.log('Reset password for:', email);
      setSent(true);
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>Check Your Email</Text>
        <Text style={styles.message}>
          We've sent password reset instructions to your email address.
        </Text>
        <Link href="/login" asChild>
          <Button mode="contained" style={styles.button}>
            Return to Login
          </Button>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Reset Password</Text>
      
      <Text style={styles.message}>
        Enter your email address and we'll send you instructions to reset your password.
      </Text>
      
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      
      <Button
        mode="contained"
        onPress={handleResetPassword}
        loading={loading}
        style={styles.button}
      >
        Send Reset Instructions
      </Button>

      <Link href="/login" asChild>
        <Button mode="text" style={styles.link}>
          Back to Login
        </Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  message: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
  },
  link: {
    marginTop: 24,
  },
}); 