import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoAdminComponent } from './historico-admin.component';

describe('HistoricoAdminComponent', () => {
  let component: HistoricoAdminComponent;
  let fixture: ComponentFixture<HistoricoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
