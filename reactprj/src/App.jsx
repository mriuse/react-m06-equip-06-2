import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss'

import { UserContext } from "./userContext";

import About from "./pages/About";

import PlacesList from "./pages/places/PlacesList";
import PlacesGrid from "./pages/places/PlacesGrid";
import Place from "./pages/places/Place";
import PlaceAdd from "./pages/places/PlaceAdd";
import PlaceEdit from "./pages/places/PlaceEdit";

import Post from "./pages/posts/Post";
import PostsList from "./pages/posts/PostsList";
import PostsGrid from "./pages/posts/PostsGrid";

import PostAdd from "./pages/posts/PostAdd";
import PostEdit from "./pages/posts/PostEdit";

import NotFound from "./pages/NotFound";

import LoginRegister from './auth/LoginRegister';

import Header from './partials/Header';
import Footer from './partials/Footer';

if ('webkitSpeechRecognition' in window) {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
}

function App() {
  let storedAuthToken = JSON.parse(localStorage.getItem("authToken")) || '';
  let [authToken, setAuthToken] = useState(storedAuthToken);

  Mousetrap.bind('ctrl+alt+r', function () {
    document.body.style.zoom = "100%";
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      var enableSpeechRecognition = confirm("Do you want to activate speech recognition? (Està en anglès pq entenia millor les coses)");

      if (enableSpeechRecognition) {
        // Speech recognition is enabled, you can proceed with your logic here
        alert("Speech recognition is on! Say `scroll up` or `scroll down` to scroll through the website, and `zoom in` or `zoom out` to control zoom! Please take a moment between each command to prevent mistakes");

        var grammar = '#JSGF V1.0; grammar phrase; public <interface> =  scroll up | scroll down | zoom in | zoom out';
        var recognition = new SpeechRecognition();
        var speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
        recognition.lang = 'en-GB';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();
        recognition.onspeechend = function () {
          setTimeout(function () {
            recognition.stop()
            recognition.start()
          }, 1000);
        }

        recognition.onresult = function (event) {
          // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
          // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
          // It has a getter so it can be accessed like an array
          // The first [0] returns the SpeechRecognitionResult at position 0.
          // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
          // These also have getters so they can be accessed like arrays.
          // The second [0] returns the SpeechRecognitionAlternative at position 0.
          // We then return the transcript property of the SpeechRecognitionAlternative object 
          var speechResult = event.results[0][0].transcript.toLowerCase();
          if (speechResult === 'scroll up') {
            window.scrollBy(0, -250);
          }
          else if (speechResult === 'scroll down') {
            window.scrollBy(0, 250);
          }
          else if (speechResult === 'zoom in') {
            var currentZoom = parseFloat(document.body.style.zoom) || 1;
            var newZoom = currentZoom + 1;
            document.body.style.zoom = newZoom;
          }
          else if (speechResult === 'zoom out') {
            var currentZoom = parseFloat(document.body.style.zoom) || 1;
            var newZoom = currentZoom - 1;
            document.body.style.zoom = newZoom;
          }
          else {
            alert("Could you repeat that for me, please?")
          }

        }

      } else {
        // Speech recognition is not enabled
        alert("Speech recognition not enabled.");
      }
    }

  }, [])


  return (
    <>
      <div className="body-custom">
        <UserContext.Provider value={{ authToken, setAuthToken }}>
          <script src="/assets/keyaccess.js"></script>
          {authToken ? (
            <>
              {/* <Keypress></Keypress> */}
              <Header />
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<About />} />
                <Route path="/about" element={<About />} />
                <Route path="/posts/list" element={<PostsList />} />
                <Route path="/posts/add" element={<PostAdd />} />
                <Route path="/posts" element={<PostsGrid />} />
                <Route path="/post/edit/:id" element={<PostEdit />} />
                <Route path="/post/:id" element={<Post />} />

                <Route path="/places/list" element={<PlacesList />} />
                <Route path="/places/grid" element={<PlacesGrid />} />
                <Route path="/places/add" element={<PlaceAdd />} />
                <Route path="/places/:id" element={<Place />} />
                <Route path="/places/:id/edit" element={<PlaceEdit />} />
              </Routes>
              <Footer />
            </>
          ) : (
            <LoginRegister />
          )}
        </UserContext.Provider>
      </div>
    </>
  )
}

export default App
