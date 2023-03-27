import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherservService } from '../weatherserv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private serv: WeatherservService, private router: Router) { }

  ngOnInit() {
    this.wid = innerWidth
    console.log(this.wid)
    if (innerWidth < 800) {
      this.mor = "https://wallpaperaccess.com/full/1540030.jpg"
    }
    else {
      this.mor = "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?cs=srgb&dl=pexels-johannes-plenio-1118873.jpg&fm=jpg"
    }
    console.log(this.mor)
  }

  wid: any

  // Function to go to the searched city and also the gps live location
  go(city: any) {
    this.router.navigate(['weather', city])
  }

  loca: any
  mor: any
  gogps() {
    this.serv.getgps().subscribe((resp) => {
      console.log(resp)
      this.loca = resp
      let cityloc = this.loca.city
      this.router.navigate(['weather', cityloc])
    })
  }


  // function to change the background accounding to the viewport
  wall() {
    console.log(this.wid)
    if (this.wid < 800) {
      this.mor = "https://wallpaperaccess.com/full/1540030.jpg"
    }
    else {
      this.mor = "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?cs=srgb&dl=pexels-johannes-plenio-1118873.jpg&fm=jpg"
    }
  }
}
