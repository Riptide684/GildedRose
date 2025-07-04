class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality(item) {
    const MAX = 50;
    const MIN = 0;
    // aged brie
    if (item.name == 'Aged Brie') {
      if (item.sellIn <= 0) {
        item.quality = Math.min(MAX, item.quality + 2);
      } else {
        item.quality = Math.min(MAX, item.quality + 1);
      }
    // backstage pass
    } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.sellIn <= 0) {
        item.quality = MIN;
      } else if (item.sellIn <= 5) {
        item.quality = Math.min(MAX, item.quality + 3);
      } else if (item.sellIn <= 10) {
        item.quality = Math.min(MAX, item.quality + 2);
      } else {
        item.quality = Math.min(MAX, item.quality + 1);
      }
    // conjured items
    }  else if (item.name == 'Conjured Mana Cake') {
      if (item.sellIn <= 0) {
        item.quality = Math.max(MIN, item.quality - 4)
      } else {
        item.quality = Math.max(MIN, item.quality - 2);
      }
    // normal item
    } else if (item.name != 'Sulfuras, Hand of Ragnaros') {
      if (item.sellIn <= 0) {
        item.quality = Math.max(MIN, item.quality - 2)
      } else {
        item.quality = Math.max(MIN, item.quality - 1);
      }
    }
  }

  updateSellIn(item) {
    // if not sulfuras
    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.sellIn = item.sellIn - 1;
    }
  }

  updateShop(days=1) {
    for (let day = 0; day < days; day++) {
      for (let i = 0; i < this.items.length; i++) {
        this.updateQuality(this.items[i]);
        this.updateSellIn(this.items[i]); 
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
