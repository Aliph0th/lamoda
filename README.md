# Mini clone of Online Clothing Shop "Lamoda"


## Summary

This project uses following tech stack:
- Frontend:
  - HTML
  - TailwindCSS
  - Vite bundler
  - React
  - Typescript
- Backend
  - NodeJS
  - Express.js
  - Typescript

## Backend

Backend provides following endpoints:

- `GET /product` - supports following query parameters (all are optional):

  - `q` - search by `name` or `description` of a product (case-insensitive)
  - `colors` - a comma-separated list of colors that you want products to get
  - `price` - a range of products' price represented by tuple of 2 numbers (separated by comma and first(min) <= second(max)). Bounds are included
  - `sort` - preferred sort. **Default is** `popular`. The value can be:
    - `popular` - sort by descending rating
    - `asc` - sort by ascending price
    - `desc` - sort by descending price

  ### Pagination

  You also can specify such query parameters as `limit` and `page`

  - `limit` - max number of products per page. **Default: 10**
  - `page` - number of page you want to see. **Default: 1**

- `GET /metadata` - gives metadata about products. Response:

```
{
  priceLimits: [number, number] // [min, max]
}
```
