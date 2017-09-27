import { TestBed, async, inject } from '@angular/core/testing';
import { BalancesService } from './balances.service';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('#BalanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        BalancesService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should return an Observable<Balance>',
    inject([BalancesService, XHRBackend], (balancesServices: BalancesService, mockBackend: MockBackend) => {
    const mockResponse = {
      data: [
        { id: 'BTC_LTC', value: '0,002'},
        { id: 'BTC_EUR', value: '3200'},
      ]
    };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));
    });
    balancesServices.getAll().subscribe((balances: any) => {
      expect(balances.length).toBe(2);
      expect(balances).toEqual(mockResponse);
    });
  }));
});
