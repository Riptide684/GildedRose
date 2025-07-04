const {Shop, Item} = require("../src/gilded_rose");

describe("Normal Items", function() {
    const items = [
        new Item("+5 Dexterity Vest", 10, 20),
        new Item("Elixir of the Mongoose", 5, 7),
    ];

    it("At the end of each day our system lowers both values for every item", function() {
        const gildedRose = new Shop(items);
        const expectedSellIn = [9, 4];
        const expectedQuality = [19, 6];
        gildedRose.updateQuality();
        for (let i = 0; i < gildedRose.length; i++) {
            expect(gildedRose[i].sellIn).toBe(expectedSellIn[i]);
            expect(gildedRose[i].quality).toBe(expectedQuality[i]);
        }
    });

    it("Once the sell by date has passed, Quality degrades twice as fast", function() {
        const gildedRose = new Shop(items);
        const expectedQuality = [14, 0];

        for (let day = 0; day < 6; day++) {
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