import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PhotoService } from '../photo.service';

export class SearchTextErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: NgForm | null): boolean {
    const isSubmitted = form && form.submitted;

    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  searchTextFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('((?=.*[a-zA-Z])|(?=.*[0-9]))[a-zA-Z0-9 ]+')
  ]);
  matcher = new SearchTextErrorStateMatcher();
  searchText: string;
  photos = [];
  totalPhotosCount: number;
  isSearchInProgress = false;

  constructor(private photoService: PhotoService) { }

  searchPhotos(): void {
    this.searchText = this.searchTextFormControl.value.trim();

    if (this.searchText !== '') {
      this.isSearchInProgress = true;

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
