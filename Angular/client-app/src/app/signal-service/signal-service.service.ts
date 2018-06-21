import {  
  Injectable,  
  EventEmitter  
} from '@angular/core';   


declare  var $: any;  
@Injectable({
  providedIn: 'root'
})  
export class SignalServiceService {  
  // Declare the variables  
  private proxy: any;  
  private proxyName: string = 'notifications';  
  private connection: any;  
  // create the Event Emitter  
  public notificationReceived: EventEmitter < string > ;  
  public connectionEstablished: EventEmitter < Boolean > ;  
  public connectionExists: Boolean;  
  constructor() {  
      debugger;  
      // Constructor initialization  
      this.connectionEstablished = new EventEmitter < Boolean > ();  
      this.notificationReceived = new EventEmitter < string > ();  
      this.connectionExists = false;  
      // create hub connection  
      this.connection = $.hubConnection("http://localhost:51680");
      var jwt=localStorage.jwt;
      this.connection.qs= {'token' : 'Barer' + jwt} 
      // create new proxy as name already given in top  
      this.proxy = this.connection.createHubProxy(this.proxyName);  
      // register on server events  
      // call the connecion start method to start the connection to send and receive events. 
      this.registerOnServerEvents();  
      this.startConnection();  
  }  
  
  public sendHello() {  
    // server side hub method using proxy.invoke with method name pass as param  
    this.proxy.invoke('Hello');  
}  
  // check in the browser console for either signalr connected or not  
  private startConnection(): void {  
     
      this.connection.start().done((data: any) => {  
          console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);  
          this.connectionEstablished.emit(true);  
          this.connectionExists = true;  
      }).fail((error: any) => {  
          console.log('Could not connect ' + error);  
          this.connectionEstablished.emit(false);  
      });  
  }  


  private registerOnServerEvents(): void {  
    debugger;
    this.proxy.on('clickNotification', (data: string) => {  
        console.log('received notification: ' + data);  
        this.notificationReceived.emit(data);  
    }); 
  }  
}  