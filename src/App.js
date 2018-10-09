import React, { Component } from 'react';

import aries from './static/images/zodiac-signs/aries.png';
import taurus from './static/images/zodiac-signs/taurus.png';
import gemini from './static/images/zodiac-signs/gemini.png';
import cancer from './static/images/zodiac-signs/cancer.png';
import leo from './static/images/zodiac-signs/leo.png';
import virgo from './static/images/zodiac-signs/virgo.png';
import libra from './static/images/zodiac-signs/libra.png';
import scorpio from './static/images/zodiac-signs/scorpio.png';
import sagittarius from './static/images/zodiac-signs/sagittarius.png';
import capricorn from './static/images/zodiac-signs/capricorn.png';
import aquarius from './static/images/zodiac-signs/aquarius.png';
import pisces from './static/images/zodiac-signs/pisces.png';

import './App.css';

const zodiacSigns = {
  'capricorn': capricorn,
  'aquarius': aquarius,
  'pisces': pisces,
  'aries': aries,
  'taurus': taurus,
  'gemini': gemini,
  'cancer': cancer,
  'leo': leo,
  'virgo': virgo,
  'libra': libra,
  'scorpio': scorpio,
  'sagittarius': sagittarius
}
Object.freeze(zodiacSigns)

class App extends Component {

  state = {
    sign : "",
    date: "0000-00-00"
  }

  get_zodiac_sign = ({date}) => {
    var month = parseInt(date.substr(5,2));
    var day = parseInt(date.substr(8,2));

    if     ((month === 1 && day <= 20)  || (month === 12 && day >=22))  return 'capricorn';
    else if((month === 1 && day >= 21)  || (month === 2 && day <= 18))  return 'aquarius';
    else if((month === 2 && day >= 19)  || (month === 3 && day <= 20))  return 'pisces';
    else if((month === 3 && day >= 21)  || (month === 4 && day <= 20))  return 'aries';
    else if((month === 4 && day >= 21)  || (month === 5 && day <= 20))  return 'taurus';
    else if((month === 5 && day >= 21)  || (month === 6 && day <= 20))  return 'gemini';
    else if((month === 6 && day >= 22)  || (month === 7 && day <= 22))  return 'cancer';
    else if((month === 7 && day >= 23)  || (month === 8 && day <= 23))  return 'leo';
    else if((month === 8 && day >= 24)  || (month === 9 && day <= 23))  return 'virgo';
    else if((month === 9 && day >= 24)  || (month === 10 && day <= 23)) return 'libra';
    else if((month === 10 && day >= 24) || (month === 11 && day <= 22)) return 'scorpio';
    else if((month === 11 && day >= 23) || (month === 12 && day <= 21)) return 'sagittarius';
  }

  date_changed = (event) => {
    this.setState({
      date: event.target.value,
      sign: this.get_zodiac_sign({date: event.target.value})
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Find your zodiac sign !!</h1>
          <form>
          <label>Birthday: </label>
          <input type="date" value={this.state.date} onChange={(event) => this.date_changed(event)} />
          </form>
          {
            this.state.sign?
            <img src={zodiacSigns[this.state.sign]} className="App-logo" alt="logo" style={{
              margin: "60px"
            }}/>
            : null
          }
          {
            this.state.date === "0000-00-00"?
            null:
            <div>
              <h1> {this.state.sign} !</h1>
              <h1>{this.state.date}</h1>
            </div>
          }
        </header>
      </div>
    );
  }
}

export default App;
