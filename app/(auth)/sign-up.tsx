import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setisSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setisSubmitting(false);
    }
  };
  return (
    <SafeAreaView className='bg-primary h-full' >
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6 '>
          <Image source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px] mb-5'
          />
          <Text className='text-white text-2xl'>Sign up to Aora</Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({
              ...form,
              username: e
            })}
            otherStyles="mt-7"
            placeholder="Your unique username"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({
              ...form,
              email: e
            })}
            otherStyles="mt-7"
            keyboardType='email-address'
            placeholder="Enter Email.."
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({
              ...form,
              password: e
            })}
            otherStyles="mt-7"
            placeholder="Enter Password"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="mt-7"
          />
          <View className='justify-center pt-5 flex-row gap-1 items-center'>
            <Text className='text-lg text-gray-100 font-pregular'>Already have an account ?</Text>
            <Link href="/sign-in" className='text-lg text-secondary font-pregular'>Login</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({})