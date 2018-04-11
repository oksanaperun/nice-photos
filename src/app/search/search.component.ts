import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  constructor(private photoService: PhotoService) { }

  searchPhotos(searchText): void {
    this.photoService.getPhotosBySearchText(searchText)
      .subscribe(response => {
        console.log(response);
      });
  }

  ngOnInit() {
  }
}
