import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherservService {
  constructor(private http:HttpClient) { }

  // API to get current time
  gettime(lat:any,lon:any){
    return this.http.get(`https://api.ipgeolocation.io/timezone?apiKey=f9d587ab9f9940b4b9ddedbdaf962e58&lat=${lat}&long=${lon}`)
  }


  // API to get location coordinates
  getlocation(city:any){
    return this.http.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=0b38cdaaee46418fe94c36a0d332e0af`)
  }


  // API to get GPS location
  getgps(){
    return this.http.get(`https://ipapi.co/json/`)
  }


  // API to get current weather
  getcurrnt(lat:any,lon:any){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0b38cdaaee46418fe94c36a0d332e0af`)
  }
 
  // API to get forcast
  getforcast(lat:any,lon:any){
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0b38cdaaee46418fe94c36a0d332e0af`)
  }


}
