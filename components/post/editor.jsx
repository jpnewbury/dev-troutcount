import React, { useState, useEffect, } from 'react';
import { useCurrentUser } from '@/hooks/index';
import Slider from 'react-input-slider';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Cloudy from "../svg/cloudy"
import Scattered from "../svg/scattered"
import CloudyWindy from "../svg/cloudyWindy"
import PartlyCloudy from "../svg/partlyCloudy"
import Sunny from "../svg/sunny"
import Thunderstorms from "../svg/tstorms"
import Windy from "../svg/windy"
import Snow from "../svg/snow"
import Rain from "../svg/rain"
import Button from '../button'


export default function PostEditor() {
  const lat = localStorage.getItem('Latitude');
  const lon = localStorage.getItem('Longitude');
  const [user] = useCurrentUser();
  const [msg, setMsg] = useState(null);
  const [state, setState] = useState({ x: 55});
  const [size, setSize] = useState({ x: 16});
  const [water, setWater] = useState({ x: 55});
  const [startdate, setStartDate] = useState(new Date());
  const [fly, setFly] = useState(null);
  const [location, setLocation] = useState(null);
  const [cfs, setCfs] = useState(null);
  const [river, setRiver] = useState(null);
  const Lattitude = localStorage.getItem('Latitude');
  const Longitude = localStorage.getItem('Longitude');
  const c  = (state.x - 32) * 5/9
  const wc  = (water.x - 32) * 5/9
  const l = ( size.x / 0.39370) 
  const [weather, setWeather] = useState(0);
  const [hatch, setHatch] = useState(null);



  if (!user) {
    return (
      <div>
        Please sign in to post
      </div>
    );
  }


  const onCfs = (event) => {
    setCfs(event.target.value);
  };
  const onChange = (event) => {
    setFly(event.target.value);
  };

  const onLocation = (event) => {
    // sets the state property for the location
    setLocation(event.target.value);
  };
  const onRiver = (event) => {
    // sets the state property for the location
    setRiver(event.target.value);
  };
  const onHatch = (event) => {
    // sets the state property for the location
    setHatch(event.target.value);
  };



  async function hanldeSubmit(e) {
    e.preventDefault();
    const body = {
      startdate: e.currentTarget.startdate.value,
      location: e.currentTarget.location.value,
      river: e.currentTarget.river.value,
      streamflow: e.currentTarget.streamflow.value,
      species: e.currentTarget.species.value,
      fly: e.currentTarget.fly.value,
      size: e.currentTarget.size.value,
      temperature: e.currentTarget.temperature.value,
      weather: e.currentTarget.weather.value,
      AirTemp: e.currentTarget.AirTemp.value,
      content: e.currentTarget.content.value,
      lat: e.currentTarget.lat.value,
      lon: e.currentTarget.lon.value,
      hatch: e.currentTarget.hatch.value,
    };

    if (!e.currentTarget.content.value) return;
    e.currentTarget.content.value = '';
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMsg('Your fish has been added');
      window.scrollTo(0, 0);
      setTimeout(() => setMsg(null), 1000);
    }
  }
  return (
    <div className="container">

        {/* {
        <div className="small-header">
        <div className="alert">
        {navigator.geolocation && <><GPSicon style="small_icon" /><small>GPS is enabled and actively tracking your position.</small></> }
        {!navigator.geolocation && <><NoGpsIcons style="small_icon" /><small>GPS is not enabled</small></> }
        </div>
        </div> 
        } */}
    <div>
  
      <form onSubmit={hanldeSubmit} autoComplete="off">
    <span className="alert">{msg}</span>
    <div className="header">
    <>Posting as: <b>{user ? user.name : null}</b></>
    </div>
 
    <div className="block">
    <h3>Location</h3>
    </div>

   <section className="location">
     <div className="block">
     <h3>Date:</h3>
        <DatePicker selected={startdate} onChange={date => setStartDate(date)}
        showTimeSelect
          dateFormat="Pp"/>
   <div className="hidden">
        <input 
          name="startdate"
          type="text"
          value={new Date(startdate).toLocaleString()}
        />
   </div>
   <div>
   <label for="appt">Select a time:</label>
   </div>
   <div>
        <input 
        className="hidden"
        name="lat"
        type="text"
         value={Lattitude}
      />
        <input 
        className="hidden"
        name="lon"
        type="text"
        value={Longitude} 
        />
    </div>
        <div>
          <h3>Body of Water:</h3>
          <input
            name="river"
            type="text"
            placeholder={river}
            value={river}
            onChange={onRiver}
            required="true"
          />
        </div>
        <div>
          <h3>Beat - Section:</h3>
          <input
            name="location"
            type="text"
            placeholder={location}
            value={location}
            onChange={onLocation}
          />
        </div>
       <small> Waypoint: {lat} {lon}</small>
     </div>
</section>
<div className="block">
<h3>Fish Caught</h3>
</div>
   
<section className="location">
    <div className="block">
        <h3>Species:</h3>
        <select name="species">
          <option value="Rainbow Trout">Rainbow Trout</option>
          <option value="Brown Trout">Brown Trout</option>
          <option value="Cutthroat Trout">Cutthroat Trout</option>
          <option value="Cuttbow Trout">Cuttbow Trout</option>
          <option value="Brook Trout">Brook Trout</option>
          <option value="Whitefish">Whitefish</option>
          <option value="Sucker">Sucker</option>
          <option value="Grayling">Grayling</option>
        </select> 
        </div>
        <div>
        <div className="block">
          <h3>Length:</h3>
          <h3>{size.x} inches ~ {Math.round(l.toFixed(2))} centimeters</h3>
          </div>
        </div>
        <div className="block">
        <Slider
              axis="x"
              xstep={.5}
              xmin={10}
              xmax={50}
              x={size.x}
              onChange={({ x }) => setSize({ x: parseFloat(x.toFixed(2)) })}
            />
       <input className="hidden"
            name="size"
            type="text"
            placeholder={size.x}
            value={size.x}
          />
        </div>
        <div className="block">
          <h3>Fly Used</h3>
          <input
            name="fly"
            type="text"
            placeholder={fly}
            onChange={onChange}
          />
        </div>
      </section>



      <div className="block">
        <h3>Hatch Activity</h3>
      </div>
      <section className="location">
        <p>Is a hatch occuring that the fish are feeding on?</p>
      <div className="block">
        <h3>Hatch: &nbsp;{hatch}</h3>
      <input
            name="hatch"
            type="text"
            placeholder="whats hatching?"
            onChange={onHatch}
          />
    </div>

      </section>
      <div className="block">
        <h3>Fishing Conditions</h3>
      </div>
        <section className="location">
        <div className="block">
        <h3>Water Conditions: {cfs}</h3>
        <small>Streamflow, clarity etc...</small>
      <input
            name="streamflow"
            type="text"
            placeholder={cfs}
            onChange={onCfs}
          />
    </div>
        <div className="block">
        <input
        className="hidden"
            name="weather"
            type="text"
            placeholder={weather}
            value={weather}
          />

          <h3>Weather:</h3>
          {weather === "Sunny" && <Sunny style="weather_icon"/>}
          {weather === "PtCLD" && <PartlyCloudy  style="weather_icon" />}
          {weather === "Cld" && <Cloudy style="weather_icon" />}
          {weather === "CldWind" && <CloudyWindy style="weather_icon"/>}
          {weather === "Rain" && <Rain style="weather_icon"/>}
          {weather === "Scattered" && <Scattered style="weather_icon" />}
          {weather === "Wind" && <Windy  style="weather_icon" />}
          {weather === "ScatteredTStorm" && <Thunderstorms  style="weather_icon"/>}
          {weather === "Snow" && <Snow  style="weather_icon"/>}
          <div className="grid-ish">


  <div className="center weather_button">
    <div>  <Sunny style="small_icon"/></div>
    <div onClick={() => setWeather("Sunny")}>Sunny</div>
  </div>
  <div className="center weather_button">
    <div>  <PartlyCloudy style="small_icon"/></div>
    <div onClick={() => setWeather("PtCLD")}>Partly Cloudy</div>
  </div>
  <div className="center weather_button">
    <div>  <Cloudy style="small_icon"/></div>
    <div onClick={() => setWeather("Cld")}>Cloudy</div>
  </div>
  <div className="center weather_button">
    <div>  <CloudyWindy style="small_icon"/></div>
    <div onClick={() => setWeather("CldWind")}>Cloudy Windy</div>
  </div>
  <div className="center weather_button">
    <div>  <Windy style="small_icon"/></div>
    <div onClick={() => setWeather("Wind")}>Windy</div>
  </div>

  <div className="center weather_button">
    <div>  <Rain style="small_icon"/></div>
    <div onClick={() => setWeather("Rain")}>Rain</div>
  </div>
  <div className="center weather_button">
    <div>  <Scattered style="small_icon"/></div>
    <div onClick={() => setWeather("Scattered")}>Scattered</div>
  </div>
  <div className="center weather_button">
    <div>  <Thunderstorms style="small_icon"/></div>
    <div onClick={() => setWeather("ScatteredTStorm")}>Thunderstorms</div>
  </div>
  <div className="center weather_button">
    <div>  <Snow style="small_icon"/></div>
    <div onClick={() => setWeather("Snow")}>Snow</div>
  </div>
    </div>

        <div className="block">
 <h3>Air Temerature:</h3>
          <p>{state.x}<sup>º</sup>F ~ {c.toFixed(0)}<sup>º</sup>C</p>
        </div>
        <div> 
        <Slider
        axis="x"
        xstep={1}
        xmin={0}
        xmax={110}
        x={state.x}
        onChange={({ x }) => setState({ x: parseFloat(x.toFixed(2)) })}
      />
          </div>
          <div className="hidden">
         <input
            name="AirTemp"
            type="text"
            required="true"
            value={state.x}
          />
         </div>
         <div>
         <div className="block">
           <h3>Water Temperature:</h3>
          {water.x}<sup>º</sup>F ~ {wc.toFixed(0)}<sup>º</sup>C
           </div>
         <div>
           <Slider
              axis="x"
              xstep={1}
              xmin={32}
              xmax={100}
              x={water.x}
              onChange={({ x }) => setWater({ x: parseFloat(x.toFixed(2)) })}
            />
    </div>

         <div className="hidden">
      <input
            name="temperature"
            type="text"
            placeholder={water.x}
            value={water.x}
            required="true"
          />
          </div>
        </div>
        </div>
        </section>
    
        <section>
          <div className="block">
            <h3>Notes:</h3> 
          </div>
          <div>
          <textarea
            name="content"
            rows="4"
            cols="50"
            required="false"
          />
        </div>
        </section>
        
        <button type="submit">Add</button>
      </form>
    </div>
    </div>
  );
}
