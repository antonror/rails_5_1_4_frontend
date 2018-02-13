import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Item } from './item';
import { ItemService } from './item.service';

@Component({
  selector: 'item-show',
  templateUrl: 'item-show.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemShowComponent implements OnInit {

  id: number;
  routeId: any;
  errorMessage: any;
  returnUrl: string;
  editBtnClicked: boolean = false;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {}

  @Input() item: Item;

  ngOnInit()  {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/items';
    this.routeId = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    )
    let itemRequest = this.route.params
      .flatMap((params: Params) =>
        this.itemService.getItem(+params['id']));
    itemRequest.subscribe(response => this.item = response.json());
  }

  update(item: Item) {
    this.editBtnClicked = true;
    this.itemService.updateItem(item)
      .subscribe(data => {
        return true
      }, error => {
        console.log('Error editing Item');
        return Observable.throw(error);
      })
  }

  delete(item: Item) {
    this.itemService.deleteItem(this.item.id)
      .subscribe(data => {
        this.router.navigate([this.returnUrl]);
       },
        error => this.errorMessage = error);
  }

  onUpdatedClicked() {
    this.router.navigate([this.returnUrl]);
    this.editBtnClicked = false;
    //window.location.reload();
  }

}
