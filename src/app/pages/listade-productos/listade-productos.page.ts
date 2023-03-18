import { Component, OnInit } from '@angular/core';
import { Product } from './../../model/product';
import { Router } from '@angular/router';
import { ServiciodeProductosService} from './../../providers/serviciode-productos.service';
import { AlertController } from '@ionic/angular';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-listade-productos',
  templateUrl: './listade-productos.page.html',
  styleUrls: ['./listade-productos.page.scss'],
})
export class ListadeProductosPage implements OnInit {
  public query ='';
  public products: Product[]=[];
  public results = [...this.products];
  public model='';
  public platform='';
  public version='';
  public manufacturer='';
  constructor(private router: Router,private network: Network,private alertController: AlertController,
             private product: ServiciodeProductosService,private device: Device ) { }

  ngOnInit() {
    this.getAll('assets/products.json');
    this.model = this.device.model;
    this.platform= this.device.platform;
    this.version = this.device.version;
    this.manufacturer = this.device.manufacturer;
    this.networkValidator();
  }



    //Devolver productos
    public getAll(url: string): void {
      this.product.obtenerProductos(url)
      .subscribe( data => {
       console.log(data);
       this.products=data;
      }
      );
    }

    public search(event: any) {
      this.query = event.target.value.toLowerCase();
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
