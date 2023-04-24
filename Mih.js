// Calculate the buy and sell price for an item on Steam Community Market, including all Steam fees and to get the profit considering those fees
// Рассчитать цену покупки и продажи товара на Steam Community Market, включая все комиссии Steam, и получить прибыль с учётом комиссий

function calculateItemPrice(itemName, appId, corridor, profitPercentage, pleasantProfit, analysisPeriod, analyzeBeforeOrder, analyzeBeforeSale, stickerMarkupPercentage, minimumStickerMarkup, includeStickers) {
  // Calculate start and end dates for price analysis
  // Рассчитать начальную и конечную даты анализа цен
  const endTimestamp = Math.floor(Date.now() / 1000);
  const startTimestamp = endTimestamp - analysisPeriod * 24 * 60 * 60;

  // Fetch price history
  // Получить историю цен
  const url = `https://steamcommunity.com/market/pricehistory/?appid=${appId}&market_hash_name=${encodeURIComponent(itemName)}&start=${startTimestamp}&end=${endTimestamp}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // filter prices using price corridor
      // Выбрать цены в заданном коридоре
      const prices = data.prices.filter(price => price[1] >= corridor && price[1] <= (100-corridor));

      // calculate sticker markup
      // Рассчитать наценку за стикеры
      let stickerMarkup = 0;
      if (includeStickers) {
        const stickerPricesOnly = prices.filter(price => price[2]);
        if (stickerPricesOnly.length > 0) {
          const pastWeekStickerPrices = stickerPricesOnly.slice(0, 7);
          const averageStickerPrice = pastWeekStickerPrices.reduce((total, price) => total + price[2], 0) / pastWeekStickerPrices.length;

          // calculate sticker markup
          // Рассчитать наценку за стикеры
          stickerMarkup = averageStickerPrice * (stickerMarkupPercentage / 100);

          // enforce minimum sticker markup
          // Установить минимальную наценку за стикеры
          if (stickerMarkup < minimumStickerMarkup) {
            stickerMarkup = minimumStickerMarkup;
          }
        } else {
          console.log("No listings with stickers found.");
        }
      }

      // calculate buy and sell prices
      // Рассчитать цену покупки и продажи
      let buyPrice = prices[0][1];
      const stickerAdjustedBuyPrice = Math.max(1, buyPrice + stickerMarkup);
      let sellPrice = Math.floor(stickerAdjustedBuyPrice * (1 + profitPercentage / 100) * (1 - 0.15));
      const steamFee = Math.floor(sellPrice * 0.15);
      const actualProfitBeforeFees = Math.floor((sellPrice - stickerAdjustedBuyPrice) / stickerAdjustedBuyPrice * 100);
      const actualProfitAfterFees = Math.floor((sellPrice - stickerAdjustedBuyPrice - steamFee) / stickerAdjustedBuyPrice * 100);

      // recalculate prices if pleasant profit not met
      // Пересчитать цены, если желаемый уровень прибыли не достигнут
      while (actualProfitAfterFees < pleasantProfit) {
        buyPrice += 1;
        const newStickerAdjustedBuyPrice = Math.max(1, buyPrice + stickerMarkup);
        const newSellPrice = Math.floor(newStickerAdjustedBuyPrice * (1 + profitPercentage / 100) * (1 - 0.15));
        const newSteamFee = Math.floor(newSellPrice * 0.15);
        const newActualProfitBeforeFees = Math.floor((newSellPrice - newStickerAdjustedBuyPrice) / newStickerAdjustedBuyPrice * 100);
        const newActualProfitAfterFees = Math.floor((newSellPrice - newStickerAdjustedBuyPrice - newSteamFee) / newStickerAdjustedBuyPrice * 100);
        if (newActualProfitAfterFees > actualProfitAfterFees) {
          sellPrice = newSellPrice;
          steamFee = newSteamFee;
          actualProfitBeforeFees = newActualProfitBeforeFees;
          actualProfitAfterFees = newActualProfitAfterFees;
        } else {
          break;
        }
      }

      // adjust sell price for Steam fee
      // Установить цену продажи с учётом комиссии Steam
      sellPrice -= steamFee;

      // check purchase requests
      // Проверить запросы на покупку
      const nameid = data.nameid;
      const requestsUrl = `https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=${nameid}&two_factor=0`;
      fetch(requestsUrl)
        .then(response => response.json())
        .then(requests => {
          const buyRequests = requests.buy_order_graph[0].quantity;
          const sellRequests = requests.sell_order_graph[0].quantity;

          // adjust buy/sell prices based on purchase requests
          // Установить цены покупки и продажи на основе запросов на покупку
          if (buyRequests > sellRequests) {
            buyPrice = Math.ceil(buyPrice * (buyRequests / sellRequests));
          } else if (sellRequests > buyRequests) {
            sellPrice = Math.floor(sellPrice * (sellRequests / buyRequests));
          }

          // analyze before order
          // Проанализировать цену перед оформлением покупки
          if (analyzeBeforeOrder) {
            const orderUrl = `https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=${nameid}&two_factor=0&norender=1`;
            fetch(orderUrl)
              .then(response => response.json())
              .then(orders => {
                const lastOrderPrice = orders.buy_order_table[0].price;
                const newBuyPrice = Math.floor(lastOrderPrice * 100 + 1) / 100;
                if (newBuyPrice < buyPrice) {
                  buyPrice = newBuyPrice;
                  console.log(`Adjusted buy price before order: ${buyPrice}`);
                }
              });
          }

          // analyze before sale
          // Проанализировать цену перед продажей
          if (analyzeBeforeSale) {
            const inventoryUrl = `https://steamcommunity.com/inventory/YOUR_STEAM_ID/YOUR_APP_ID/YOUR_CONTEXT_ID?count=5000`;
            fetch(inventoryUrl)
              .then(response => response.json())
              .then(inventory => {
                const firstListingPrice = inventory.assets[0].market_actions[0].link.replace(/^\D+/g, '');
                const newSellPrice = Math.ceil(firstListingPrice * 100 - 1) / 100;
                if (newSellPrice > sellPrice) {
                  sellPrice = newSellPrice;
                  console.log(`Adjusted sell price before sale: ${sellPrice}`);
                }
              });
          }

          // calculate sticker markup when selling the item
          // Рассчитать наценку за стикеры при продаже
          let stickerMarkupWhenSelling = 0;
          if (includeStickers) {
            const lastPrice = prices[0][1];
            const lastStickerAdjustedPrice = Math.max(1, lastPrice + stickerMarkup);
            const lastSellPrice = Math.floor(lastStickerAdjustedPrice * (1 + profitPercentage / 100) * (1 - 0.15));
            const lastSteamFee = Math.floor(lastSellPrice * 0.15);
            const lastActualProfitBeforeFees = Math.floor((lastSellPrice - lastStickerAdjustedPrice) / lastStickerAdjustedPrice * 100);
            const lastActualProfitAfterFees = Math.floor((lastSellPrice - lastStickerAdjustedPrice - lastSteamFee) / lastStickerAdjustedPrice * 100);
            const stickerAdjustedSellPrice = Math.floor(stickerAdjustedBuyPrice * (1 + profitPercentage / 100) * (1 - 0.15));
            const stickerAdjustedActualProfitBeforeFees = Math.floor((stickerAdjustedSellPrice - stickerAdjustedBuyPrice) / stickerAdjustedBuyPrice * 100);
            const stickerAdjustedActualProfitAfterFees = Math.floor((stickerAdjustedSellPrice - stickerAdjustedBuyPrice - steamFee) / stickerAdjustedBuyPrice * 100);

            // calculate sticker markup
            // Рассчитать наценку за стикеры
            stickerMarkupWhenSelling = (stickerAdjustedActualProfitAfterFees - lastActualProfitAfterFees) * stickerAdjustedBuyPrice / 100;
          }

          // return final buy and sell prices
          // Вернуть конечные цены покупки и продажи
          const result = {
            buyPrice: buyPrice,
            sellPrice: sellPrice,
            actualProfitBeforeFees: actualProfitBeforeFees,
            actualProfitAfterFees: actualProfitAfterFees,
            stickerMarkupWhenSelling: stickerMarkupWhenSelling
          };
          return result;
        });
    })
    .catch(error => console.error(error));
}

// EXAMPLE USAGE:
// ИСПОЛЬЗОВАНИЕ В ПРИМЕРЕ:
calculateItemPrice("AK-47 | Redline (Field-Tested)", 730, 5, 10, 20, 30, true, true, 5, 0.03, true);
