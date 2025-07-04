const {Shop, Item} = require("../src/gilded_rose");

describe("Quality <= 50", function() {
  it ("Aged brie quality always <= 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 49)]);
    const days = 2;
    for (i=0; i<days; i++) {gildedRose.updateQuality();}
    const items = gildedRose.items;
    expect(items[0].quality).toBe(50);
  });

  it ("Backstage pass quality <= 50", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 49)]);
    const days = 11;
    for (i=0; i<days; i++) {gildedRose.updateQuality();}
    const items = gildedRose.items;
    expect(items[0].quality).toBe(50);
  });
});

describe("Sulfuras", function() {
  it("Sulfuras always quality 80", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
    const days = 20;
    for (i=0; i<days; i++) {gildedRose.updateQuality();}
    const items = gildedRose.items;
    expect(items[0].quality).toBe(80);
  });
});

describe("Backstage Passes", function() {
  it("Backstage passes increases by 2 when 6 <= days left <= 10", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0)]);
    const days = 2;
    for (i=0; i<days; i++) {gildedRose.updateQuality();}
    const items = gildedRose.items;
    expect(items[0].quality).toBe(4);
  });

  it("Backstage passes increases by 1 when days left > 10", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 13, 0)]);
    const days = 2;
    for (i=0; i<days; i++) {gildedRose.updateQuality();}
    const items = gildedRose.items;
    expect(items[0].quality).toBe(2);
  });

  it("Backstage passes increases by 3 when 0 <= days left <= 5", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0)]);
    const days = 5;
    for (i=0; i<days; i++) {gildedRose.updateQuality();}
    const items = gildedRose.items;
    expect(items[0].quality).toBe(15);
  });

  it("Backstage passes drop to 0 after concert", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 20)]);
    const days = 2;
    for (i=0; i<days; i++) {gildedRose.updateQuality();}
    const items = gildedRose.items;
    expect(items[0].quality).toBe(0);
  });
});

// describe("Conjured", function() {
  // it("Conjured degrades at 2 per day before expiry", function() {
  //   const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 10)]);
  //   const days = 2;
  //   for (i=0; i<days; i++) {gildedRose.updateQuality();}
  //   const items = gildedRose.items;
  //   expect(items[0].quality).toBe(6);
  // });

  // it("Conjured degrades at 4 per day after expiry", function() {
  //   const gildedRose = new Shop([new Item("Conjured Mana Cake", -1, 10)]);
  //   const days = 2;
  //   for (i=0; i<days; i++) {gildedRose.updateQuality();}
  //   const items = gildedRose.items;
  //   expect(items[0].quality).toBe(2);
  // });
// });
