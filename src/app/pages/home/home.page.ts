import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  FormBuilder, FormControl, Validators,FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public dataForm: FormGroup;
  public username: string;
  public password: string;

  constructor( private router: Router,private formBuilder: FormBuilder,private alertController: AlertController
            , private nativeStorage: NativeStorage,private network: Network,private faio: FingerprintAIO) {

  }

  ngOnInit() {
    this.buildForm();
    this.isUserSaved();
    this.networkValidator();
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




  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Notificación',
      message: 'Debe ingresar usuario y clave, intente nuevamente',
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


  public buildForm(){
    this.dataForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required,Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
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


  public login(): void {
    console.log(this.dataForm.value);
    this.username = this.dataForm.value.username;
    this.password = this.dataForm.value.password;
    if(this.username === '' && this.password === '' ){
     this.errorAlert();
    }else{
     this.sessionData(this.username,this.password);
     this.router.navigate(['/lista-de-productos']);
   }
  }

  private isUserSaved(): void  {
    this.nativeStorage.getItem('sessions')
      .then(
        data => console.log('sessions Guardada'+data),
        error => console.error(error)
      );
   }


  private sessionData(username: string,key: string) {
    this.nativeStorage.setItem('sessions', { user: username, password: key })
  .then(
    (data) => console.log('data stored',data),
    error => console.error('Error storage', error)
  );
  }


}
