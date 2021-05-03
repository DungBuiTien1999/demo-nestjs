import { Injectable, NotFoundException } from "@nestjs/common";

import { Product } from './products.model';

function* IdGenerator(){
    let id = 0;
    while(true){
        yield ++id;
    }
}
const idIterator = IdGenerator();

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        // const proId = new Date().toString();
        const proId = String(idIterator.next().value);
        const newProduct = new Product(proId, title, desc, price);
        this.products.push(newProduct);
        return proId;
    }

    getProducts() {
        return [...this.products]; //the same is such this.products.slice().
    }

    getSingleProduct(proId: string) {
        const product = this.findProduct(proId)[0];
        console.log(product);
        return {...product};
    }

    updateProduct(proId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(proId);
        console.log(product, index);
        const updatedProduct = {...product};
        if(title){
            updatedProduct.title = title;
        }
        if(desc){
            updatedProduct.desc = desc;
        }
        if(price){
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }

    deleteProduct(proId: string) {
        const index = this.findProduct(proId)[1];
        this.products.splice(index, 1);
    }

    private findProduct(proId: string): [Product, number] {
        const productIndex = this.products.findIndex((product) => product.id === proId);
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException('Not found product.');
        }
        return [product, productIndex];
    }
}