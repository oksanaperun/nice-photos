import { Component } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})

export class PageComponent {
  isLoading: boolean;
  isLoaded: boolean;
  isFailed: boolean;

  onLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  onLoaded(isLoaded: boolean) {
    this.isLoaded = isLoaded;
  }

  onFailed(isFailed: boolean) {
    this.isFailed = isFailed;
  }
}
