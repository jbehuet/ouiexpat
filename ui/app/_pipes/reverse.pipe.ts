import { Pipe } from '@angular/core'

@Pipe({ name: 'reverse' })
export class ReversePipe {
  transform(value: any[]) {
    return value.slice().reverse();
  }
}
