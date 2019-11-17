![coverage lines](coverage/badge-lines.svg 'Coverage lines') ![coverage functions](coverage/badge-functions.svg 'Coverage functions') ![coverage branches](coverage/badge-branches.svg 'Coverage branches') ![coverage statements](coverage/badge-statements.svg 'Coverage statements')

# Proxy debounce with accumulator

This is a simple package implementing **debounce** with JS Proxy.

However, there is a big twist:

```javascript
import debounce from "proxy-debounce-with-accumulator"

const f = debounce((n) => n), 100)

for (let i = 0; i < 10; i++) {
    f(i)
}
```

such a code would call the **f** function once, as expected of a debounced function, but during this call the value of **n** would equal **[0,1,2,3,4,5,6,7,8,9]**, since the call arguments are **accumulated**.

You can also **await** such a function:

```javascript
import debounce from "proxy-debounce-with-accumulator"

const f = debounce((n) => n), 100)

for (let i = 0; i < 10; i++) {
    if (i === 4) {
        await f(i)
    }
    else {
        f(i)
    }
}
```

In such a code the arguments passed to the function would be: **[0,1,2,3,4]** and **[5,6,7,8,9]**.

### Performance

Run tests in order to see detailed performance differences between this package, lodash and regular objects.
