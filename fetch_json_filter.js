URL = '/../../....Emps_RETR'
UUNs = 'uun1 uun2'.split(/\s+/)

/// ASSUMPTION: lodash - for `_.sortBy()`
res = await fetch(URL)
  .then(res => res.json())
  //.then(dat => dat)  // ORIG
  .then(dat => dat.filter(x => _.contains(UUNs, x.uun)))
  /// SORT... // ALT: see native `.sort()`
  .then(dat => _.sortBy(dat, x => [x.surname, x.firstname]))
  /// 'output format' string
  .then(dat => dat.map(x => `${x.firstname} ${x.surname} (${x.inst})`))
  .catch((error) => { console.error('Error:', error) })

copy(res) 


/// `.sort()`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
