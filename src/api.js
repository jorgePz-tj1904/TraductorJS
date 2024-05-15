
export const options = {
    method: 'GET',
    url: 'https://text-translator2.p.rapidapi.com/getLanguages',
    headers: {
      'X-RapidAPI-Key': 'bedff14049mshec0dc50391d37b3p1394d7jsn1c81efd6f990',
      'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
  };
  
  export const fnTranslate=(encodedParams)=> {
    const translate = {
        method: 'POST',
    url: 'https://text-translator2.p.rapidapi.com/translate',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'bedff14049mshec0dc50391d37b3p1394d7jsn1c81efd6f990',
      'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    },
    data: encodedParams,
    }
    return translate;
  };

  export const autoDetected = (encodedParams) => {
    const autoOptions = {
      method: 'POST',
      url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/detect-language',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'bedff14049mshec0dc50391d37b3p1394d7jsn1c81efd6f990',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
      },
      data: encodedParams,
    };
    return autoOptions;
  }
  