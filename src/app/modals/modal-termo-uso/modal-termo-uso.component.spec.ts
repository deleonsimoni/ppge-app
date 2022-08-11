import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTermoUsoComponent } from './modal-termo-uso.component';

describe('ModalTermoUsoComponent', () => {
  let component: ModalTermoUsoComponent;
  let fixture: ComponentFixture<ModalTermoUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTermoUsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTermoUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
