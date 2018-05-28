import { Component } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent {
  searchTextFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('((?=.*[a-zA-Z])|(?=.*[0-9]))[a-zA-Z0-9 ]+')
  ]);
  matcher = new SearchTextErrorStateMatcher();
  searchText: string;
  photos: any[];
  totalPhotosCount: number;
  isSearchInProgress: boolean;
  isErrorCaught: boolean;

  constructor(private appService: AppService) { }

  trimSearchText() {
    this.searchText = this.searchTextFormControl.value.trim();
  }

  searchPhotos() {
    this.setStartSearchValues();

    this.appService.getPhotosBySearchText(this.searchText)
      .subscribe(
        response => this.handleResponseOnSuccess(response),
        error => this.handleResponseOnError()
      );
  }

  setStartSearchValues() {
    this.isSearchInProgress = true;
    this.isErrorCaught = false;
  }

  handleResponseOnSuccess(response) {
    this.isSearchInProgress = false;
    this.totalPhotosCount = response.total;
    this.setPhotos(response.results);
  }

  handleResponseOnError() {
    this.isSearchInProgress = false;
    this.isErrorCaught = true;
  }

  setPhotos(responseResults) {
    this.photos = responseResults.map(result => {
      return {
        id: result.id,
        smallUrl: result.urls.small
      };
    });
  }
}

export class SearchTextErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: NgForm | null): boolean {
    const isSubmitted = form && form.submitted;

    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}