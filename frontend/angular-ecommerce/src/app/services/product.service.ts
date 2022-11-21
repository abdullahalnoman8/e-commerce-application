import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient:HttpClient) { 

  }
  
  // Get all the products using find By category Id
  getProductList(theCategoryId:number):Observable<Product[]>{
    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    console.log('search URL: '+ searchUrl)
    
    return this.getProducts(searchUrl);
    
   }

   // Get all the category ids 
   getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  // Search Products method for search header in the page
  searchProducts(thekeyword: string) : Observable<Product[]> {
     // need to build URL based on category id 
     const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${thekeyword}`
     console.log('search URL: '+ searchUrl)
     
     return this.getProducts(searchUrl);
  }
  
  

  // Return all the products 
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }


  // Get product method
  getProduct(theProductId: number) : Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;
    
    return this.httpClient.get<Product>(productUrl);
  }

  /** 
   * Get all the products that will contain pagination information
   * 
   * **/
  getProductListPaginate(
  thePage:number,
  thePageSize:number,
  theCategoryId: number  
  ):Observable<GetResponseProducts>{
    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`+
    `&page=${thePage}&size=${thePageSize}`;

    console.log('search URL: '+ searchUrl)
    
    return this.httpClient.get<GetResponseProducts>(searchUrl);
    
   }

   /** 
   * Get all the products that will contain pagination information
   * **/
  searchProductListPaginate(
    thePage:number,
    thePageSize:number,
    thekeyword: string  
    ):Observable<GetResponseProducts>{
      // need to build URL based on the search keyword 
      const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${thekeyword}`+
      `&page=${thePage}&size=${thePageSize}`;
  
      console.log('search URL: '+ searchUrl)
      
      return this.httpClient.get<GetResponseProducts>(searchUrl);
      
     }
}

interface GetResponseProducts{
  _embedded:{
    products: Product[];  
  },
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
 }
 interface GetResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[];
    
  }
 }