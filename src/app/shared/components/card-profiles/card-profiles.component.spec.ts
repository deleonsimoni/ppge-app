import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProfilesComponent } from './card-profiles.component';

describe('CardProfilesComponent', () => {
  let component: CardProfilesComponent;
  let fixture: ComponentFixture<CardProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
