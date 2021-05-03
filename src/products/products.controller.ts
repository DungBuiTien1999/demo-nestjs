import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') proTitle: string,
    @Body('description') proDesc: string,
    @Body('price') proPrice: number,
  ): any {
    const generatedId = this.productsService.insertProduct(
      proTitle,
      proDesc,
      proPrice,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') proId: string) {
    return this.productsService.getSingleProduct(proId);
  }

  @Patch('id')
  updateProduct(
    @Param('id') proId: string,
    @Body('title') proTitle: string,
    @Body('description') proDesc: string,
    @Body('price') proPrice: number,
  ) {
    return this.productsService.updateProduct(proId, proTitle, proDesc, proPrice);
    // return {message: 'update success'};
  }

  @Delete('id')
  removeProduct(@Param('id') proId: string) {
    this.productsService.deleteProduct(proId);
    return {message: 'delete success'};
  }
}
