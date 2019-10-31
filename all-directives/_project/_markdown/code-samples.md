---
title: Code Samples
type: bodymatter
---


::: chapter:code-samples

# Code Samples

```javascript
const promises = [
    new Promise(resolve =>
        setTimeout(_ => resolve(('b-ber!')), 10)
    ),
    new Promise(resolve =>
        setTimeout(_ => resolve(('Hello')), 0)
    ),
];

Promise.all(promises)
.catch(err => console.error(err))
.then(([b, a]) => console.log(`${a} ${b}`))
```

```html
<article>
    <section>
        <h1>Hello, b-ber!</h1>
    </section>
</article>
```

```ruby
module Enumerable
  def cartesian(other)
    res = []
    each { |x| other.each { |y| res << [x, y] } }
    return res
  end
end
```

```hs
import System.Environment
import System.IO

isPrime :: Int -> Bool
isPrime n
    | n <= 1    = False
    | otherwise = not $ any (\x -> n `mod` x == 0) [2,3..(n-1)]
```

::: exit:code-samples
