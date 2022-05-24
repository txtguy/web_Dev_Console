https://stackoverflow.com/questions/5282228/include-javascript-file-in-chrome-console

```js
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js';
document.head.appendChild(script);
```


- My **``injectScript``** function

```js
function injectScript(url) {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  document.head.appendChild(script);
}
```

- **jQuery**

```js
injectScript('https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js');
```

- **PapaParse** // ``Papa.parse``

```js
injectScript('https://cdn.jsdelivr.net/npm/papaparse@5.1.1/papaparse.min.js');
```

- **Slugify** // ``slugify``: https://www.npmjs.com/package/slugify

```js
injectScript('https://cdn.jsdelivr.net/npm/slugify@1.3.6/slugify.min.js');
```

- **LoDash**

```js
injectScript('https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js')
```

----

```js
txt = `CSV_or_TSV
. . .
`;

pp = Papa.parse(txt)

// pp.errors .length ==0

dat = pp.data
```

- ?? https://stackoverflow.com/questions/35113926/change-csv-headers-while-processing-papaparse

----

- https://stackoverflow.com/questions/39127989/creating-a-javascript-object-from-two-arrays/39128136

  - !! Uses ``Object.assign`` // NOT in MSIE (so, ``es6-shim`` may be needed??)

```js
!! Uses ``Object.assign`` // NOT in MSIE (so, ``es6-shim`` may be needed??)
function papa_to_obj(dat, keys_slugify = null) {
  let keys = dat[0];
  const vals = dat.slice(1);
  
  if (keys_slugify) { keys = keys.map( k => keys_slugify(k) ) }

  return vals.map( val =>
    Object.assign( ...val.map( (v,i) => ({[ keys[i]]: v}) ) )
  );
}

dat = papa_to_obj(pp.data,
  (key) => slugify(key.toLowerCase(), '_')
);

// EXAMPLEs:
dat.filter( it => it.default_delivery_period != it.delivery_period )
```

- **Group by**
  - ``reduce``: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  - ``Object.keys()``: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

```js
function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

let groupedPeople = groupBy(people, 'age')

Object.keys( groupedPeople ) // list of KEYS
```

- **Certain keys** - using ``.fromEntries`` // WIP

  - !! Not MSIE or Edge: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries

```
o = {a:1,b:2,c:3,d:4}
ks = 'b,d,c'.split(',') // CSV of certain keys

vs = ks.map( k => [k, o[k]] ) // MAP...
console.log( Object.fromEntries( vs ))

// ARRAY of objects
arr = [{a:1,b:2,c:3,d:4}, {a:21,b:22,c:23,d:24}, {a:31,b:32,c:33,d:34}]

res = arr.map(elt => Object.fromEntries(ks.map(k => [k, elt[k]])))
```

- ``objectsArray.map(obj => Object.fromEntries(keysArray.map(k => [k, obj[k]])))``

```js
function extractKeys(objectsArray, keysArray) {
  return objectsArray.map(obj => Object.fromEntries(keysArray.map(k => [k, obj[k]])));
}

extractKeys(arr, 'b,d,c'.split(','))
```

