
export const options = {
    method: 'GET',
    url: 'https://text-translator2.p.rapidapi.com/getLanguages',
    headers: {
      'X-RapidAPI-Key': '3621122917msh6e8ba43c8abec4ep1e20c3jsn7cc4f486d948',
      'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
  };
  
  export const fnTranslate=(encodedParams)=> {
    const translate = {
        method: 'POST',
    url: 'https://text-translator2.p.rapidapi.com/translate',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '3621122917msh6e8ba43c8abec4ep1e20c3jsn7cc4f486d948',
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
        'X-RapidAPI-Key': '3621122917msh6e8ba43c8abec4ep1e20c3jsn7cc4f486d948',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
      },
      data: encodedParams,
    };
    return autoOptions;
  }
  