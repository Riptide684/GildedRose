const {Shop, Item} = require("../src/gilded_rose");

// Sean's Tests
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

// Aya's Tests
describe("Normal Items", function() {
    const items = [
        new Item("+5 Dexterity Vest", 10, 20),
        new Item("Elixir of the Mongoose", 5, 7),
    ];

    it("At the end of each day our system lowers Quality for every item", function() {
        const gildedRose = new Shop(items);
        const expectedQuality = [19, 6];
        gildedRose.updateQuality();
        for (let i = 0; i < gildedRose.length; i++) {
            expect(gildedRose[i].quality).toBe(expectedQuality[i]);
        }
    });

    it("Once the sell by date has passed, Quality degrades twice as fast", function() {
        const gildedRose = new Shop(items);
        const expectedQuality = [6, 0];

        for (let day = 0; day < 12; day++) {
            gildedRose.updateQuality();
        }
        
        for (let i = 0; i < gildedRose.length; i++) {
            expect(gildedRose[i].quality).toBe(expectedQuality[i]);
        }
    });
});

describe("Negative Test", function() {
    const items = [
        new Item("+5 Dexterity Vest", 10, 20),
        new Item("Elixir of the Mongoose", 5, 7),
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
        //new Item("Conjured Mana Cake", 3, 6),
        //new Item("Conjured Mana Cake", 3, 6)
    ];

    it("The Quality of an item is never negative", function() {
        const gildedRose = new Shop(items);
        const expectedQuality = [0, 0, 0, 0, 0];

        for (let day = 0; day < 100; day++) {
            gildedRose.updateQuality();
        }

        for (let i = 0; i < gildedRose.length; i++) {
            expect(gildedRose[i].quality).toBe(expectedQuality[i]);
        }
    });
});

describe("Sell In Test", function () {
    const items = [
        new Item("+5 Dexterity Vest", 10, 20),
        new Item("Aged Brie", 2, 0),
        new Item("Elixir of the Mongoose", 5, 7),
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
        new Item("Sulfuras, Hand of Ragnaros", -1, 80),
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

        // This Conjured item does not work properly yet
        //new Item("Conjured Mana Cake", 3, 6),
    ];

    it("At the end of each day our system lowers Sell In for every item", function() {
        const gildedRose = new Shop(items);
        const expectedSellIn = [0, -8, -5, 0, -1, 5, 0, -5];

        for (let day = 0; day < 10; day++) {
            gildedRose.updateQuality();
        }

        for (let i = 0; i < gildedRose.length; i++) {
            expect(gildedRose[i].sellIn).toBe(expectedSellIn[i]);
        }
    });
});