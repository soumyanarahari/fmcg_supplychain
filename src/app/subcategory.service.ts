// subcategory.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {

  constructor(private http: HttpClient) {}

  getSubcategories(productCategory: string): Observable<string[]> {
    const url = `/api/subcategories?category=${productCategory}`;
    return this.http.get<string[]>(url);
  }
}
