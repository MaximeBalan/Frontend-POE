import { TestBed } from '@angular/core/testing';

import { AnsweredService } from './answered.service';

describe('AnsweredService', () => {
  let service: AnsweredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnsweredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
