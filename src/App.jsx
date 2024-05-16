import { useState, useEffect } from 'react'
import styles from './App.module.css'
import axios from 'axios'
import { options, fnTranslate, autoDetected } from './api.js';

function App() {

  const [frase, setFrase] = useState('');
  const [idiomas, setIdiomas] = useState([]);
  const [from, setFrom] = useState('auto');
  const [to, setTo] = useState('');
  const [result, setResult] = useState();


  const encodedParams = new URLSearchParams();
  encodedParams.set('source_language', `${from}`);
  encodedParams.set('target_language', `${to}`);
  encodedParams.set('text', `${frase}`);

  const getIdiomas = async () => {
    try {
      const response = await axios.request(options);
      // console.log(response.data.data);
      setIdiomas(response.data.data.languages);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getIdiomas();
    detectIdioma();
    // console.log(frase);
    // console.log('se ejecuta');
  }, [frase]);

  const getTranslate = async () => {
    if (!from) {
      console.error('El idioma de origen no está definido');
      return;
    }
    try {
      const response = await axios(fnTranslate(encodedParams));
      // console.log(response.data.data.translatedText);
      setResult(response.data.data.translatedText);
    } catch (error) {
      console.error('Error en la solicitud de traducción:', error);
      console.error('Detalles del error:', error.response.data);
    }
  };

  const speakTo = () => {
    const mensaje = new SpeechSynthesisUtterance(result);
    mensaje.lang = to;
    speechSynthesis.speak(mensaje);
  }
  const speakFrom = () => {
    const mensaje = new SpeechSynthesisUtterance(frase);
    mensaje.lang = from;
    speechSynthesis.speak(mensaje);
  }

  const detectIdioma = async () => {
    setFrom('auto')
    try {
      const response = await axios.request(autoDetected(encodedParams));

      // console.log(response.data.source_lang_code);

      setFrom(response.data.source_lang_code);
    } catch (error) {
      console.error(error);
    }
  }

  const vozToTex = () => {
    const rec = new webkitSpeechRecognition();
    setFrom('Voz');

    rec.lang = "es"; // Establecer el idioma del reconocimiento de voz

    rec.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + ' ';
      }
      setFrase(transcript.trim());
      rec.stop();
    };

    if (!("webkitSpeechRecognition" in window)) {
      alert("Disculpas, tu navegador no admite utilizar el micrófono.");
    } else {
      rec.continuous = true;
      rec.interim = true;
      rec.start();
    }
  }
  return (
    <div>
      <div className={styles.icono_conteiner}>

      <img src="https://i.ibb.co/3yD0WnB/icono.png" alt="icono" border="0"/>
      </div>

      <div className={styles.traductor_conteiner}>

        <div className={styles.from_conteiner}>
          <div>
            <button className={from === 'auto' && styles.fromSelected} onClick={() => detectIdioma()}>Auto</button>
            <button className={from === 'es' && styles.fromSelected} onClick={() => to !== 'es' && setFrom('es')}>Español</button>
            <button className={from === 'en' && styles.fromSelected} onClick={() => to !== 'en' && setFrom('en')}>Ingles</button>
            <button className={from === 'Voz' && styles.fromSelected} onClick={() => vozToTex()}>voz</button>

            {/* <select name="" id="" className={styles.select}>
              {
                idiomas.map((e) => (
                  <option className={styles.options} value={e.code}>{e.name}</option>
                ))
              }
            </select> */}


          </div>
          <textarea type="text" value={frase} onChange={(e) => setFrase(e.target.value)} name="" id="" cols="30" rows="10"></textarea>
          <button className={styles.translateBtn} onClick={() => getTranslate()}>Traducir</button>
          
          <img id={styles.altavoz} width={20} onClick={() => speakFrom()} src="https://i.ibb.co/XSbd1p7/altavoz.png" alt="altavoz" border="0"/>


        </div>

        <div className={styles.from_conteiner}>
          <div>
            <button className={to === 'es' ? styles.fromSelected : null} onClick={() => from !== 'es' && setTo('es')}>Español</button>
            <button className={to === 'en' ? styles.fromSelected : null} onClick={() => from !== 'en' && setTo('en')}>Ingles</button>

            <select name="to" id="to" className={to !== 'es' && to !== 'en' && to !== ''? styles.selectSelected :styles.select} value={to} onChange={(e) => setTo(e.target.value)}>
              <option value="" disabled>Idiomas</option>
              {
                idiomas.map((e) => (
                  <option className={styles.options} key={e.code} value={e.code} disabled={from === e.code}>{e.name}</option>
                ))
              }
              <img id={styles.altavoz} width={20} src="../public/triangulo.png" alt="" />
            </select>
          </div>

          <textarea name="" id="" cols="30" rows="20" value={result}></textarea>
          <img id={styles.altavoz} width={20} onClick={() => speakTo()} src="../public/altavoz.png" alt="" />
        </div>

      </div>


    </div>
  )
}

export default App
