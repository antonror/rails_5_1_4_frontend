import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Item } from './item';

@Injectable()
export class ItemService {
  headers: Headers;
  options: RequestOptions;
  private itemsUrl = 'http://localhost:3000/items';

  constructor(private http: Http) {
    this.headers = new Headers({'Content-Type':'application/json'});
    this.options =  new RequestOptions({headers: this.headers});
  }

  getItems(): Observable<Item[]> {
    return this.http.get(this.itemsUrl)
      .map((response: Response) => <Item[]>response.json())
  }

  getItem(id: number) {
    return this.http.get(this.itemsUrl + "/" + id + '.json')
  }

  createItem(item: Item): Observable<Item> {
  return this.http.post(this.itemsUrl, JSON.stringify(item),
      this.options).map((res: Response) => res.json());
  }

  deleteItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.delete(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateItem(item: Item): Observable<Item> {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http.put(url, JSON.stringify(item),
      this.options).map((res: Response) => res.json());
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error)
    return Promise.reject(error.message || error);
  }
}
