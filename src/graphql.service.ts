import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  BASE_URL = 'https://api-eu-central-1.graphcms.com/v2/cki5rlxprluz501xlgma8f24c/master';

  constructor(private client: HttpClient) { }

  getConcerts() {
    return this.client.post(this.BASE_URL, {
      query: `
        query	{
            concerts {
                id,
                artistes,
                ville,
                lieu {
                    longitude,
                    latitude
                },
                date,
                placeMax,
                description,
                image {
                    url
                }
                }
        }
      `
    }).pipe(map((r: any) => r.data));
  }

  addConcert(ville, placemax, artiste, desc) {
    console.log('Upload en cours');
    return this.client.post(this.BASE_URL, {
      query: `
        mutation {
          createConcert(data: {

            artistes: ["` + artiste + `"]
            placeMax: ` + placemax + `
            ville: "` + ville + `"
            description: "` + desc + `"
            lieu: {
              longitude: 0
              latitude: 0
            }
            date: "2020-12-06T19:00:00+00:00"
          }) {
            id
          }
        }
      `
    }).pipe(map((r: any) => r.data));
  }

  publishConcert(id) {
    console.log('Publication');
    return this.client.post(this.BASE_URL, {
      query: `
        mutation {
          publishConcert(where: {
            id: "`+ id +`"
          }) {
            id
          }
        }`
    }).pipe(map((r: any) => r.data));
  }
}