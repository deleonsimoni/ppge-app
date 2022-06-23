import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchLineComponent } from './research-line.component';

describe('ResearchLineComponent', () => {
  let component: ResearchLineComponent;
  let fixture: ComponentFixture<ResearchLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
