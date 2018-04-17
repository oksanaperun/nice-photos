import { Component, OnInit } from '@angular/core';

import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  photos = [];
  isPhotosEmpty = false;
  searchTips = [
    'Check your spelling and try again',
    'Try a similar but different search term',
    'Be less specific in your wording for a wider search result'
  ];
  searchText = '';

  constructor(private photoService: PhotoService) { }

  searchPhotos(): void {
    this.isPhotosEmpty = false;
    this.photoService.getPhotosBySearchText(this.searchText)
      .subscribe(response => {
        this.photos = response.results.map(photo => {
          return {
            id: photo.id,
            smallUrl: photo.urls.small
          };
        });

        if (this.photos.length === 0)
          this.isPhotosEmpty = true;
      });
  }

  ngOnInit() {
  }
}
