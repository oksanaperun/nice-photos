import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  searchText: string;
  processedSearchText: string;
  photos = [];
  totalPhotosCount: number;
  isSearchInProgress = false;

  constructor(private photoService: PhotoService) { }

  searchPhotos(): void {
    if (this.searchText.trim() !== '') {
      this.isSearchInProgress = true;
      this.processedSearchText = this.searchText;

      this.photoService.getPhotosBySearchText(this.searchText)
        .subscribe(response => {
          this.photos = response.results.map(photo => {
            return {
              id: photo.id,
              smallUrl: photo.urls.small
            };
          });

          this.isSearchInProgress = false;
          this.totalPhotosCount = response.total;
        });
    }
  }

  ngOnInit() {
  }
}
