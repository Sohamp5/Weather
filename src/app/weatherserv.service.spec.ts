import { TestBed } from '@angular/core/testing';

import { WeatherservService } from './weatherserv.service';

describe('WeatherservService', () => {
  let service: WeatherservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
