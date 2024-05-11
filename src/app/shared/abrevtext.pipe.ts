import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abrevtext'
})
export class AbrevtextPipe implements PipeTransform {

  transform(name: string){
    const names = name.split(' ');
    if(names.length === 1){
      return name;
    }
    const firtName = names[0];
    const lastName = names[names.length - 1];
    return `${firtName} ${lastName[0]}`;
  }

}
