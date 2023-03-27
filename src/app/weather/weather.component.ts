import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherservService } from '../weatherserv.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {
  constructor(private serv: WeatherservService, private actv: ActivatedRoute) { }

  ngOnInit() {
    this.actv.params.subscribe((data) => {
      console.log(data)
      this.val = data
    })

    this.loc = this.val.city
    this.getloc(this.loc)
    this.wid = innerWidth
  }
  val: any

  // Function to get geolocation and also coordinatess of searched city
  dlat: any
  dlon: any
  locdata: any
  loc: any


  getloc(city: any) {
    this.serv.getlocation(city).subscribe((data) => {
      this.locdata = data
      this.loc = this.locdata[0].name
      this.dlat = this.locdata[0].lat.toFixed(2)
      this.dlon = this.locdata[0].lon.toFixed(2)
      console.log(data)
      this.getime()
      this.getcurrentweather()
      this.getfor()
    })
  }


  loca: any
  geolocation() {
    this.serv.getgps().subscribe((resp) => {
      console.log(resp)
      this.loca = resp
      this.dlat = this.loca.latitude.toFixed(2)
      this.dlon = this.loca.longitude.toFixed(2)
      this.loc = this.loca.city
      this.getime()
      this.getcurrentweather()
      this.getfor()
    })
  }


  // Celcius to farenhiet and farenhiet to celcius
  testtemp: any
  c = 1
  f = 0
  ctof() {
    if (this.c == 1 && this.f == 0) {
      this.testtemp = (this.testtemp * (9 / 5)) + 32
      this.xtemp = this.testtemp.toFixed(0) + "°F"
      this.c = 0
      this.f = 1
    }
    else {
      this.testtemp = (this.testtemp - 32) * (5 / 9)
      this.xtemp = this.testtemp.toFixed(0) + "°C"
      this.c = 1
      this.f = 0
    }
  }


  // function to get current weather
  main: any
  ximg: any
  xname: any
  xdes: any
  xtemp: any
  getcurrentweather() {
    this.serv.getcurrnt(this.dlat, this.dlon).subscribe((data) => {
      this.main = data
      this.ximg = `https://openweathermap.org/img/wn/${this.main.weather[0].icon}@2x.png`
      this.xname = this.main.weather[0].main
      this.xdes = this.main.weather[0].description
      this.xtemp = this.main.main.temp - 273.15
      this.testtemp = this.xtemp.toFixed(0)
      this.xtemp = this.xtemp.toFixed(0) + "°C"
    })
  }


  // function to get forcast
  farr: any
  i: any
  j: any
  forcast: any
  getfor() {
    let arr = [{}]
    this.serv.getforcast(this.dlat, this.dlon).subscribe((data) => {
      this.forcast = data
      this.forcast = this.forcast.list
      for (this.i = 0; this.i < this.forcast.length; this.i++) {
        if (this.i % 8 == 0) {
          arr.push(`https://openweathermap.org/img/wn/${this.forcast[this.i].weather[0].icon}@2x.png`)
        }
      }
      arr = arr.slice(1, arr.length)

      this.farr = arr
      console.log(this.farr)


    })
  }

  // function to get time and change the background image with the time - Day and Night
  wid: any
  mor: any
  time24: any
  time: any
  getime() {
    this.serv.gettime(this.dlat, this.dlon).subscribe((data) => {
      this.time = data
      this.time24 = this.time.time_24
      this.time24 = this.time24.slice(0, 2)
      console.log(this.time24)
      console.log(this.wid)
      if (this.wid < 800) {
        if (this.time24 < 18) {
          if (this.time24 >= 6) {
            this.mor = "https://wallpaperaccess.com/full/4843796.jpg"
          }
          else {
            this.mor = "https://iphoneswallpapers.com/wp-content/uploads/2018/07/Stars-Minimal-Sky-Night-iPhone-Wallpaper.jpg"

          }
        }
        else {
          this.mor = "https://iphoneswallpapers.com/wp-content/uploads/2018/07/Stars-Minimal-Sky-Night-iPhone-Wallpaper.jpg"
        }
      }
      else {
        if (this.time24 < 18) {
          if (this.time24 >= 6) {
            this.mor = "https://i.pinimg.com/originals/a7/f4/26/a7f4267372b13423aa8cbd691a0b279c.jpg"
          }
          else {
            this.mor = "https://wallpapercave.com/wp/wp8963257.jpg"

          }
        }
        else {
          this.mor = "https://wallpapercave.com/wp/wp8963257.jpg"
        }
      }

    })
  }




}

