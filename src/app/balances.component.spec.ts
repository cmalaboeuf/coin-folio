import { Balance } from './models/balance';
import { Observable } from 'rxjs/Observable';
import { MockBackend } from '@angular/http/testing';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { async, tick } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend, ConnectionBackend } from '@angular/http';

import { BalancesComponent } from './balances.component';
import { BalancesService } from './services/balances.service';


describe('#BalancesComponent (inline template)', () => {

    let comp:    BalancesComponent;
    let fixture: ComponentFixture<BalancesComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;

    let mockData: Array<Balance> = [
      { id: 'BTC_LTC', value: 0.002 },
      { id: 'BTC_EUR', value: 3200 }
    ];
    let balancesServiceStub = {
      getAll: () => {
        return Observable.create(mockData);
      }
    };

    let balancesService;
    let spy;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports : [HttpModule],
        declarations: [ BalancesComponent ],
        providers: [
          { provide: BalancesService, useValue: balancesServiceStub },
        ]
      })
      .compileComponents();
      fixture = TestBed.createComponent(BalancesComponent);
      comp = fixture.componentInstance;
      balancesService = TestBed.get(BalancesService);


     // BannerComponent test instance

      // query for the title <h1> by CSS element selector
      de = fixture.debugElement.query(By.css('h1'));
      el = de.nativeElement;
    });


    it('should display original title', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain(comp.title);
    });

    it('should display a different test title', () => {
      comp.title = 'My Title';
      fixture.detectChanges();
      expect(el.textContent).toContain('My Title');
    });

    it('no title in the DOM until manually call `detectChanges`', () => {
      expect(el.textContent).toEqual('');
    });

    it('should display updated title after detectChanges', () => {
      comp.title = 'My Title';
      fixture.detectChanges(); // detect changes explicitly
      expect(el.textContent).toContain(comp.title);
    });

    it('should have called getAll balances', () => {
      spyOn(comp, 'getAll');
      comp.ngOnInit();
      expect(comp.getAll).toHaveBeenCalled();
    });

    it('should have get balances array',async() => {
      spyOn(balancesService, 'getAll').and.callThrough();
      comp.ngOnInit();
      fixture.detectChanges(); // detect changes explicitly
      console.log(comp.balances);
      tick();
      expect(comp.balances).toEqual(mockData);
    });

  });
