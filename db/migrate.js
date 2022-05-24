const { faker } = require('@faker-js/faker');
let db = require('./db');

function getRandomRating() {
  let seed = Math.floor(Math.random() * 11) + 1;
  if (seed === 1) return 0;
  if (seed === 2) return 0.5;
  if (seed === 3) return 1;
  if (seed === 4) return 1.5;
  if (seed === 5) return 2;
  if (seed === 6) return 2.5;
  if (seed === 7) return 3;
  if (seed === 8) return 3.5;
  if (seed === 9) return 4;
  if (seed === 10) return 4.5;
  if (seed === 11) return 5;
}

function markAsBasic() {
  let seed = Math.floor(Math.random() * 2) + 1;
  return seed === 1;
}

db.save("products", Array.from({ length: 100 }).map((_, index) => ({
  id: index,
  title: faker.commerce.product(),
  price: faker.commerce.price(1, 200, 2),
  description: faker.commerce.productDescription(),
  rating: getRandomRating(),
  comments: Math.floor(Math.random() * 150) + 1,
  isBasic: markAsBasic(),
  pics: [
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
  ]
}))
)