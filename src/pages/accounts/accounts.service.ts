import { Injectable } from '@angular/core';
// import { NativeStorage } from '@ionic-native/native-storage';
// private nativeStorage: NativeStorage
@Injectable()
export class AccountsService {

  constructor() {

  }

  createNewAccount() {
    return true;
    // this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
    //   .then(
    //     () => console.log('Stored item!'),
    //     error => console.error('Error storing item', error)
    //   );
  }
}
