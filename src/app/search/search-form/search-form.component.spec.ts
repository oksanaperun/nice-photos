import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, FormControl } from '@angular/forms';
import { SearchFormComponent } from './search-form.component';

@Component({
  selector: 'app-search-field',
  template: '<div></div>'
})
class MockSearchFieldComponent {
  searchInput = new FormControl('');
}

describe('SearchComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let searchFieldElem: DebugElement;
  let searchFieldComp: MockSearchFieldComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFormComponent, MockSearchFieldComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    searchFieldElem = fixture.debugElement.query(By.css('app-search-field'));
    searchFieldComp = searchFieldElem.injector.get(MockSearchFieldComponent);
  });

  it('should emit event with search text on form submit', () => {
    const searchText = 'abc';

    spyOn(component.formSubmit, 'emit');

    searchFieldComp.searchInput.setValue(searchText);
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);

    expect(component.formSubmit.emit).toHaveBeenCalledWith(searchText);
  });

  it('should have disabled submit form button when search input is invalid', () => {
    searchFieldComp.searchInput.setErrors({ required: true });
    fixture.detectChanges();

    const buttonElem = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(buttonElem.disabled).toBe(true);
  });
});
