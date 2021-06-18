import axios from 'axios';

class Api {
  constructor(){
    axios.defaults.baseURL = 'https://lindoke-songbook.herokuapp.com';
  }

  getSongBook = () => {
    console.log('/content');
    return axios.get('/content').then(res => {
      return res.data;
    }).catch(err => {
      return err;
    });
  }
  
}

export default new Api();