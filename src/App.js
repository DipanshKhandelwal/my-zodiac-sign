import React, { Component } from "react";

import aries from "./static/images/zodiac-signs/aries.png";
import taurus from "./static/images/zodiac-signs/taurus.png";
import gemini from "./static/images/zodiac-signs/gemini.png";
import cancer from "./static/images/zodiac-signs/cancer.png";
import leo from "./static/images/zodiac-signs/leo.png";
import virgo from "./static/images/zodiac-signs/virgo.png";
import libra from "./static/images/zodiac-signs/libra.png";
import scorpio from "./static/images/zodiac-signs/scorpio.png";
import sagittarius from "./static/images/zodiac-signs/sagittarius.png";
import capricorn from "./static/images/zodiac-signs/capricorn.png";
import aquarius from "./static/images/zodiac-signs/aquarius.png";
import pisces from "./static/images/zodiac-signs/pisces.png";

import "./App.css";

const zodiacSigns = {
  Capricorn: capricorn,
  Aquarius: aquarius,
  Pisces: pisces,
  Aries: aries,
  Taurus: taurus,
  Gemini: gemini,
  Cancer: cancer,
  Leo: leo,
  Virgo: virgo,
  Libra: libra,
  Scorpio: scorpio,
  Sagittarius: sagittarius
};
Object.freeze(zodiacSigns);

class App extends Component {
  state = {
    sign: "",
    date: "",
    horoscope: "",
    error: ""
  };

  get_zodiac_sign = ({ date }) => {
    var month = parseInt(date.substr(5, 2));
    var day = parseInt(date.substr(8, 2));

    if ((month === 1 && day <= 20) || (month === 12 && day >= 22))
      return "Capricorn";
    else if ((month === 1 && day >= 21) || (month === 2 && day <= 18))
      return "Aquarius";
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
      return "Pisces";
    else if ((month === 3 && day >= 21) || (month === 4 && day <= 20))
      return "Aries";
    else if ((month === 4 && day >= 21) || (month === 5 && day <= 20))
      return "Taurus";
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
      return "Gemini";
    else if ((month === 6 && day >= 22) || (month === 7 && day <= 22))
      return "Cancer";
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 23))
      return "Leo";
    else if ((month === 8 && day >= 24) || (month === 9 && day <= 23))
      return "Virgo";
    else if ((month === 9 && day >= 24) || (month === 10 && day <= 23))
      return "Libra";
    else if ((month === 10 && day >= 24) || (month === 11 && day <= 22))
      return "Scorpio";
    else if ((month === 11 && day >= 23) || (month === 12 && day <= 21))
      return "Sagittarius";
    else
      return "";
  };

  getHoroscope() {
    fetch("https://www.horoscopes-and-astrology.com/json")
      .then(res => res.json())
      .then(
        (result) => {
          if (this.state.sign !== "") {
            let horoscope = result.dailyhoroscope[this.state.sign];
            horoscope = horoscope.substring(0, horoscope.indexOf("<"));
            this.setState({
              horoscope,
              error: "",
            })
          } else {
            this.setState({ 
              horoscope: "",
              error: ""
            });
          }
        },
        (error) => {
          this.setState({ error: "Sorry! Your horoscope could not be loaded today." });
        }
      )
  }

  date_changed = event => {
    this.setState({
      date: event.target.value ? event.target.value : "",
      sign: this.get_zodiac_sign({ date: event.target.value })
    });
    this.getHoroscope();
  };

  render() {
    const { horoscope, date, sign, error } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Find your zodiac sign!!</h1>
          <div className="Birthday-div">
            <form>
              <label>Birthday: </label>
              <div>
                <input
                  className="birthday-input"
                  type="date"
                  value={date}
                  onChange={event => this.date_changed(event)}
                />
              </div>
            </form>
          </div>
          {sign ? (
            <img
              src={zodiacSigns[sign]}
              className="App-logo"
              alt="logo"
              style={{ margin: "30px" }}
            />
          ) : null}
          {date === "" ? null : (
            <div
              className="result"
            >
              <h1>Your birthday is {date}</h1>
              <h1> Your zodiac sign is {sign}!</h1>
              <h2>Your Horoscope for today:<br/>
                {error === "" ? horoscope : error}
              </h2>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
