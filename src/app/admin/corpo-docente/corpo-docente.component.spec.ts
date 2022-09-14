import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpoDocenteComponent } from './corpo-docente.component';

describe('CorpoDocenteComponent', () => {
  let component: CorpoDocenteComponent;
  let fixture: ComponentFixture<CorpoDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpoDocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpoDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
