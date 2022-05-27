import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import axios from "axios";

/*
iOS bundle id: host.exp.Exponent
Android hash: rRW++LUjmZZ+58EbN5DVhGAnkX4=
*/

WebBrowser.maybeCompleteAuthSession();

export default function App() {

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '3264840417072876',
    scopes: [
      "public_profile",
      "email",
    ],
    responseType: ResponseType.Token,

  });

  const [post, setPost] = useState(null)
  const [error, setErro] = useState(null)

  useEffect(() => {
    if (response?.type === 'success') {
      console.log(response)
    }
  }, [response]);

  useEffect(() => {
    console.log(response);
    axios.get('https://graph.facebook.com/me?access_token=EAAZAE9L8vlLEBAEZC1YZCXPuKyGe4i6ftKcEmZA7V1OzPSikdzTlettGBHeDxvNCQVZA4UWRrjTEywPTGXNZBbSe5ZCm3NScgtfpcMZAtwG3ELs8JLSTPKxDDcA1W28ZCqftmnsnaUrqD2Wh4UiMLAFMh94VAzA1I9ZCt7jamSdbWUyHJYwuTZBSdII&fields=id,name,email,picture.height(500)').then((resp) => {
    //axios.get(`https://graph.facebook.com/me?access_token=${JSON.stringify(response.authentication.accessToken).replace('"','')}&fields=id,name,email,picture.height(500)`).then((resp) => {
      setPost(resp.data);
      console.log(resp);
    }).catch(error => {
      setErro(error);
    });
  }, []);

  if (error) return (
    <View style={styles.container}>
      <Text>Erro: ${error.message}</Text>
    </View>
  )

  return (
    response ?
      <View style={styles.container}>
        <Text >
          Olá {post.name}, seu Token é:
          {JSON.stringify(response.authentication.accessToken, "undefined", 2)}
        </Text>
      </View>
      :
      <View style={styles.container}>
        <Text>Fazer login com Facebook</Text>
        <Button
          disabled={!request}
          title="Login"
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
