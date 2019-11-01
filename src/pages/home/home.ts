import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController } from 'ionic-angular';
import {HistorialProvider} from "../../providers/historial/historial";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner,
  			  public toastCtrl: ToastController,
  			  private _historialService:HistorialProvider) {

  }

	scan(){
		console.log("Realizando scan");
		this.barcodeScanner.scan().then(barcodeData => {
				console.log("result: "+barcodeData.text);
				console.log("format: "+barcodeData.format);
				console.log("cancelled: "+barcodeData.cancelled);

				if(barcodeData.cancelled==false && barcodeData.text!=null){
					this._historialService.agregar_historial(barcodeData.text);
				}
				
			}).catch(err => {
			    this.mostrar_error("Error: "+err);
			});
	} 

	mostrar_error(mensaje:string){
		let toast = this.toastCtrl.create({
	    	message: mensaje,
	      	duration: 3000
	    });
	    toast.present();
	}
}
