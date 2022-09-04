import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesAdminComponent } from './pages-admin.component';

describe('PagesAdminComponent', () => {
  let component: PagesAdminComponent;
  let fixture: ComponentFixture<PagesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
