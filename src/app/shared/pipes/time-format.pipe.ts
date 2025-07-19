import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(time: string): string {
 
    const [hours, minutes] = time.split(':').map(Number)

    // AM/PM stands for 'ante meridiem' and 'post meridiem'
    const meridiem = hours >= 12 ? 'PM' : 'AM';

    // must re-format all hours >= 12
    if (meridiem == 'PM' || hours == 24) {
      const formattedHours = hours % 12 || 12; // result of 0 is set to 12
      return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${meridiem}`;
    }
    // applies to AM hours (except for 12 AM)
    return `${hours}:${minutes.toString().padStart(2, '0')} ${meridiem}`;

  }


}