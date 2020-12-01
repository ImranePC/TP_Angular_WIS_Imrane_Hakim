import { Component } from '@angular/core';
import { GraphqlService } from 'src/graphql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularconcert';
  concertsDatas;

  constructor(private client: GraphqlService ) {
    this.loadConcert();
  }

  loadConcert() {
    this.client.getConcerts().subscribe((data) => {
      this.concertsDatas = data.concerts;
    });
  }
  
  createConcert() {

    let ville = (<HTMLInputElement>document.getElementById('event_city')).value;
    let place = (<HTMLInputElement>document.getElementById('event_place')).value;
    let artist = (<HTMLInputElement>document.getElementById('event_artist')).value;
    let desc = (<HTMLInputElement>document.getElementById('event_desc')).value;
    this.client.addConcert(ville, place, artist, desc).subscribe((data) => {
        let uppedid = data.createConcert.id
        
        this.client.publishConcert(uppedid).subscribe();
    });

    // Timeout pour laisser le temps d'upload avant de reload la page
    setTimeout(() => {
        location.reload();
    }, 1000);
  }

  // loadWeather(id, city) {
  //   document.getElementById(id);
  //   this.api.getWeather(city).subscribe((data) => {
  //     let datas = data;

  //     console.log(data);
  //   })
  // }
}
