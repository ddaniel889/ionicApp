
export class Product {
         id: string;
         name: string;
         category: string;
         description: string;
         stock: number;
         supplier: string;
         image: string;
         price: number;
         currency: string;
         color: string;
         model: string;
         brand: string;
         status: string;
         size: string;

     constructor(id: string, name: string, category: string, decription: string,
          stock: number, supplier: string, image: string, price: number, currency: string,
          color: string, model: string,brand: string,status: string,size: string) {
          this.id = id;
          this.name = name;
          this.category = category;
          this.description = decription;
          this.stock = stock;
          this.supplier = supplier;
          this.image = image;
          this.price = price;
          this.currency = currency;
          this.color = color;
          this.model = size;
          this.brand = brand;
          this.status = status;
          this.size = size;
}


}
