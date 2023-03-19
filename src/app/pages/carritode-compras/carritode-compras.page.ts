import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServiciodeProductosService } from '../../providers/serviciode-productos.service';
import { Router } from '@angular/router';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-carritode-compras',
  templateUrl: './carritode-compras.page.html',
  styleUrls: ['./carritode-compras.page.scss'],
})
export class CarritodeComprasPage implements OnInit {
  public order: any[]=[];
  public total = 0;
  public user='';
  public account=0;
  constructor(private alertController: AlertController,private product: ServiciodeProductosService,private router: Router,
              private network: Network,private nativeStorage: NativeStorage) { }

  ngOnInit() {
    this.networkValidator();
    this.verProductos();
  }


  private verProductos() {
    this.nativeStorage.getItem('storeKey')
    .then(
      data => {
        this.order = data.invoice;
        const product = this.order[0];
        console.log(product);
        for (let product in this.order) {
          this.total = this.total + (this.order[product].price*this.order[product].quantity );
       }

      },
      error => console.error(error)
    );
  }

  eliminarPedido() {
    this.nativeStorage.remove('storeKey')
      .then(
        data => console.log(data),
        error => console.error(error)
      );
      this.router.navigate(['/lista-de-productos']);
  }

  private networkValidator(): void {
    const timeout = setTimeout(() => {
    clearTimeout(timeout);
    const connectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('Sin conexión');
      this.networkAlert();
      });
    console.log(connectSubscription);
    },3000);

   }



  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Notificación',
      message: 'Datos incorrectos, intente nuevamente',
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


  public pago() {
    this.modalPagar();
  }

  async modalPagar() {
    const alert = await this.alertController.create({
      header: 'Pagar pedido',
      message: `Ingrese el número de tarjeta para pagar el pedido por un monto de U$D ${this.total}`,
      inputs: [
        {
          type: 'text',
          name: 'user',
          label: 'Nombre',
          placeholder: 'Nombre del usuario'
        },
        {
          type: 'number',
          name: 'account',
          label: 'Número de tarjeta',
          placeholder: 'Número de tarjeta.'
        }
    ],
      buttons: [
        {
          text:'cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked')
          }
        },
        {
        text:'Aceptar',
        role: 'confirm',
        handler: (data) => {
              this.user = data.user;
              this.account = data.account;
              this.confirmarOrden();
        }
      }

      ],
    });

    await alert.present();
  }

  async confirmarOrden() {
    const alert = await this.alertController.create({
      header: 'Notificación',
      message: 'Su compra se ha realizado con éxito.',
      buttons: [{
        text:'Aceptar',
        role: 'confirm',
        handler: () => {
          this.product.crearOrden('/pagar',this.user,this.account, this.total).subscribe({
            next: (response) => {
            console.log(response);
            }
          });
          this.router.navigate(['/lista-de-productos']);
          alert.dismiss();
        }
      }
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }



   private async networkAlert() {
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
