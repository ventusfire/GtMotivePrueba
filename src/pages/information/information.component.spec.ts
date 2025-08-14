import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';

import InformationComponent from './information.component';
import { inicialState } from '../../app/store/reducer/AllMakes.reducer';
import { provideRouter } from '@angular/router';

describe('InformationComponent', () => {
  let component: InformationComponent;
  let fixture: ComponentFixture<InformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationComponent],
      providers: [
        provideMockStore({ initialState: inicialState }),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
