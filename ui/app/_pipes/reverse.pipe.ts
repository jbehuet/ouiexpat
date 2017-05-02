import { Pipe } from '@angular/core'

@Pipe({ name: 'reverse' })
export class ReversePipe {
  transform(value: any[]) {
    if (!value) return []
    return value.slice().reverse();
  }
}
