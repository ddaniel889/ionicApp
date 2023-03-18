import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServiciodeProductosService } from '../../providers/serviciode-productos.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Product } from './../../model/product';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalledel-producto',
  templateUrl: './detalledel-producto.page.html',
  styleUrls: ['./detalledel-producto.page.scss'],
})
export class DetalledelProductoPage implements OnInit {
  public id: string|any;
  public productDetail: Array<Product> =[];
  public results: Array< Product > =[];
  public orderProduct: Array<any> =[];
  public quantity =0;

  constructor(private router: Router,private product: ServiciodeProductosService,private  actRoute: ActivatedRoute,
              private network: Network,private alertController: AlertController,private nativeStorage: NativeStorage) { }

  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.getAll('assets/products.json');
    this.networkValidator();
  }

   //Call products
   public getAll(url: string): void {
    this.product.obtenerProductos(url)
    .subscribe( data => {
     this.results=data;
     this.productDetail =  this.results.filter( (index: any)=>{ return index.id == this.id;});
    }
    );
  }

  public openCart(element: any) {
    if(this.quantity === 0){
       this.errorAlert();
    }else{
      const order = {
        product : element.name,
        price: element.price,
        quantity: this.quantity,
    };
     this.orderProduct.push(order);
     this.nativeStorage.setItem('storeKey', { invoice: this.orderProduct})
      .then(
        (data) => console.log('Product saved',data),
        error => console.error('Error ', error)
      );
      this.router.navigate(['/carrito-de-compras']);
    }

  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Notificación',
      message: 'Debe indicar la cantidad de producto a agregar',
      buttons: [{
        text:'Aceptar',
        role: 'confirm',
        handler: () => {
          alert.dismiss();
        }
      }
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }


  public logOut() {
      this.router.navigate(['/home']);
    }

    networkValidator(): void {
      const timeout = setTimeout(() => {
      clearTimeout(timeout);
      const connectSubscription = this.network.onDisconnect().subscribe(() => {
        console.log('Sin conexión');
        this.networkAlert();
        });
      console.log(connectSubscription);
      },3000);

     }

     async networkAlert() {
      const alert = await this.alertController.create({
        header: 'Notificación',
        message: 'En es momento ha perdido la conexión a internet',
        buttons: [{
          text:'Aceptar',
          role: 'confirm',
          handler: () => {
            alert.dismiss();
          }
        }
        ],
      });
      await alert.present();
    }


}
