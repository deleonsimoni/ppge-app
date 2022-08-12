import { TestBed } from '@angular/core/testing';

import { SiteAdminService } from './site-admin.service';

describe('SiteAdminService', () => {
  let service: SiteAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
