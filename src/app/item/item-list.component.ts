import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Item } from './item';
import { ItemService } from './item.service';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[];

  constructor(
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit() {
    let timer = Observable.timer(0, 5000);
    timer.subscribe(() => this.getItems());
  }

  getItems() {
    this.itemService.getItems()
      .subscribe(items => this.items = items);
  }

  goToShow(item: Item): void {
    let itemLink = ['/items', item.id];
    this.router.navigate(itemLink);
  }

}
