import { of, from, fromEvent, Observable, combineLatest } from 'rxjs'; 
import { map, filter, reduce, tap, delay } from 'rxjs/operators';


// ******* exercise 1 *******

{
  const data = ['a', 'g', 'o', 'f', '3', '5', 'r', 'D', 'n', 'b', 's', 'c'];
  const source$ = from(data);
  source$.pipe(
    filter(item => {
      return item.match(/[a-g]/i);
    })
  ).subscribe(res => console.log(res));
}

// ******* exercise 2 *******

{
  const data = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];
  const source$ = from(data);

  const sum = source$.pipe(
    map(num => {
      return num.match(/\d+/);
    }),
    reduce((res, curr) => (+res + +curr), 0)
  );
  
  var result = sum.subscribe(
    res => console.log(res)
  );
}

// ******* exercise 3 *******

{
  let observable$ = new Observable(observer => {
    observer.next(123)
  }).pipe(
    tap(() => console.log('promise started')),
    delay(1000),
    tap(() => console.log('timeout'))
  ).subscribe(x => console.log('next: ' + x));
}

// ******* exercise 4 *******

{
  const heightEl = document.getElementById("height");
  const widthEl = document.getElementById("width");
  let height$ = fromEvent(heightEl, "input");
  let width$ = fromEvent(widthEl, "input");

  let findSquare = combineLatest(height$, width$).pipe(
    map(([height, width]) => (
      <any>height).target.value * (<any>width).target.value
    )
  ).subscribe(item => console.log(item));
}