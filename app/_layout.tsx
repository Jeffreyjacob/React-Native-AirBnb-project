import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ClERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

const TokenCache = {
  async getToken(key:string){
     try{
      return SecureStore.getItemAsync(key);     
     } catch(err){
      return null;
     }
  },
  async saveToken (key:string,value:string){
    try{
      return SecureStore.setItemAsync(key,value);
    }catch(err){
      return;
    }
  }
}
 
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Mon:require('../assets/fonts/static/Montserrat-Regular.ttf'),
    MonSb: require('../assets/fonts/static/Montserrat-SemiBold.ttf'),
    MonB:require('../assets/fonts/static/Montserrat-Bold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <ClerkProvider publishableKey={ClERK_PUBLISHABLE_KEY!} tokenCache={TokenCache}>
    <RootLayoutNav />
  </ClerkProvider>
  
  
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter()
  const {isLoaded,isSignedIn} = useAuth()
  useEffect(()=>{
     if(isLoaded && !isSignedIn){
      router.push('/(modals)/login');
     }
  },[isLoaded])
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{flex:1}}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='(modals)/login'
        options={{
          title:"Log in or Sign up",
          presentation:'modal',
          headerTitleStyle:{
            fontFamily:'MonSb'
          },
          headerLeft:()=>(
            <TouchableOpacity onPress={()=> router.back()}>
              <Ionicons name='close-outline' size={28}/>
            </TouchableOpacity>
          )
        }}/>
        <Stack.Screen name='Listing/[Id]' options={{
          headerTitle:"",headerTransparent:true, headerBackTitleVisible:false
        }}/>
        <Stack.Screen name='(modals)/booking' options={{
            presentation:'transparentModal',
            animation:'fade',
            headerLeft:()=>(
              <TouchableOpacity onPress={()=> router.back()}>
                <Ionicons name='close-outline' size={28}/>
              </TouchableOpacity>
            )
        }}/>
      </Stack>

      </GestureHandlerRootView>
         </ThemeProvider>
  );
}
