import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {

    transform(string: string): string {
        if (string) {
          const stringWords = string.split(' ');
          return stringWords.reduce((capitalizedString, word) => {
            const capitalizedWord = 
              ' ' + word.charAt(0).toUpperCase() + word.slice(1);
            return capitalizedString + capitalizedWord;
          }, '');
        }
        return string;
    }
}