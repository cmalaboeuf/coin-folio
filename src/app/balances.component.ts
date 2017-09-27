import { Component,OnInit } from '@angular/core';
import { BalancesService } from './services/balances.service';
import { Balance} from './models/balance';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-balances-component',
  templateUrl: './balances.component.html',
  styleUrls:  ['./balances.component.css'],
  providers : [BalancesService]
})

export class BalancesComponent implements OnInit {
  title = 'My Title';
  public balances: Array<Balance> = new Array();
  constructor(public balancesService: BalancesService){

  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.balancesService.getAll().subscribe(res => {
      return this.balances = res || [];
    });
  }
}
