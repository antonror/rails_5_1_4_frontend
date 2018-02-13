import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Item } from './item';
import { ItemService } from './item.service';

@Component({
  selector: 'item-new',
  templateUrl: 'item-new.component.html',
  styleUrls: ['item.component.css']
})
export class ItemNewComponent {
  item = new Item;
  submitted: boolean = false; // check if form is submitted

  constructor(private itemService: ItemService) {}

  createItem(item: Item) {
    this.submitted = true;
    this.itemService.createItem(item)
      .subscribe(data => { return true },
        error => {
          console.log("Error creating item");
          return Observable.throw(error);
        }
      );
  }
}
