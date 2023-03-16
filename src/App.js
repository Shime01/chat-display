import React from 'react';
import './App.css';
//import Chat-display from '../features/chat-display/Chat-display';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDh_tb-SCMagY5SwCKijepNaSqFtET0jYk",
  authDomain: "chat-display-d0af1.firebaseapp.com",
  projectId: "chat-display-d0af1",
  storageBucket: "chat-display-d0af1.appspot.com",
  messagingSenderId: "715495394300",
  appId: "1:715495394300:web:4f3f7a5c4795a86f2fc079",
  measurementId: "G-GLRSQ65T7L"

})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="chat-display">


      </header>

      <section>
        {user ? <ChatRoom/> : <SignIn/> }
      </section>
    </div>
  );
}


function SignIn(){
  const signInwithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <button onClick={signInwithGoogle}>Sign in with Google</button>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom(){
  const messageRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  return(
    <> 
    <div>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
    </div>
    </>
  )
}

function ChatMessage(props){
  const {text, uid, photoURL} = props.message;


  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL}/>
      <p>{text}</p>
    </div>
  )
}

export default App;
