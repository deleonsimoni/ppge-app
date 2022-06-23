import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeseDissertacaoComponent } from './tese-dissertacao.component';

describe('TeseDissertacaoComponent', () => {
  let component: TeseDissertacaoComponent;
  let fixture: ComponentFixture<TeseDissertacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeseDissertacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeseDissertacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
