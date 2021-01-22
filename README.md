# lil' hash
A simple shareable URL shortener (a la [hamhash.com](hamhash.com)).

## Installation
See install.md

### API

#### /hash/\<hours\>/\<encoded url\>

Associates a word with a url for the given number of hours. Response comes in the following format.

```javascript
{
  "key": key,
  "duration_hours": duration_hours
}
```

#### /\<key\>

Redirects to the mapped URL if in the database, otherwise returns a 404 error.
