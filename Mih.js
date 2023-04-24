function calculateItemPrice(itemName, appId, corridor, profitPercentage, pleasantProfit, profitUpdate, analysisPeriod, analyzeBeforeOrder, analyzeBeforeSale, stickerMarkupPercentage, minimumStickerMarkup, includeStickers) {
  // Calculate start and end dates for price analysis (Рассчитываем даты начала и окончания анализа цен)
  const endTimestamp = Math.floor(Date.now() / 1000);
  const startTimestamp = endTimestamp - analysisPeriod * 24 * 60 * 60;

  // Fetch price history (Получаем историю цен)
  const url = `https://steamcommunity.com/market/pricehistory/?appid=${appId}&market_hash_name=${encodeURIComponent(itemName)}&start=${startTimestamp}&end=${endTimestamp}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // filter prices using price corridor (Фильтруем цены по ценовому коридору)
      const prices = data.prices.filter(price => price[1] >= corridor && price[1] <= (100-corridor));

      // calculate sticker markup (Рассчитываем наценку за стикеры)
      let stickerMarkup = 0;
      if (includeStickers) { // check if includeStickers is true (Проверяем, включены ли стикеры)
        const stickerPricesOnly = prices.filter(price => price[2]); // filter out listings without stickers (Фильтруем записи без стикеров)
        if (stickerPricesOnly.length > 0) {
          const pastWeekStickerPrices = stickerPricesOnly.slice(0, 7); // last 7 days of sticker prices (Последние 7 дней цен на стикеры)
          const averageStickerPrice = pastWeekStickerPrices.reduce((total, price) => total + price[2], 0) / pastWeekStickerPrices.length;

          // calculate sticker markup (Рассчитываем наценку за стикеры)
          stickerMarkup = averageStickerPrice * (stickerMarkupPercentage / 100);

          // enforce minimum sticker markup (Принудительно назначаем минимальную наценку за стикеры)
          if (stickerMarkup < minimumStickerMarkup) {
            stickerMarkup = minimumStickerMarkup;
          }
        } else {
          console.log("No listings with stickers found."); // (Нет стикеров в продаже)
        }
      }

      // calculate buy and sell prices (Рассчитываем цены покупки и продажи)
      let buyPrice = prices[0][1];
      const stickerAdjustedBuyPrice = Math.max(1, buyPrice + stickerMarkup); // minimum is 1 due to Steam's minimum sale price rule (Минимальное значение 1, из-за правил Steam)
      let sellPrice = Math.floor(stickerAdjustedBuyPrice * (1 + profitPercentage / 100) * (1 - 0.15));
      const steamFee = Math.floor(sellPrice * 0.15); // calculate fee here (Вычисляем комиссию здесь)
      let actualProfit = Math.floor((sellPrice - stickerAdjustedBuyPrice) / stickerAdjustedBuyPrice * 100);

      // recalculate prices if pleasant profit not met (Пересчитываем цены, если прибыль меньше требуемой)
      while (actualProfit < pleasantProfit) {
        buyPrice += 1; // increase buy price by 1 unit (Увеличиваем цену покупки на 1 единицу)
        const newStickerAdjustedBuyPrice = Math.max(1, buyPrice + stickerMarkup);
        const newSellPrice = Math.floor(newStickerAdjustedBuyPrice * (1 + profitPercentage / 100) * (1 - 0.15));
        const newSteamFee = Math.floor(newSellPrice * 0.15);
        const newActualProfit = Math.floor((newSellPrice - newStickerAdjustedBuyPrice) / newStickerAdjustedBuyPrice * 100);
        if (newActualProfit > actualProfit) {
          sellPrice = newSellPrice;
          steamFee = newSteamFee; // update fee here (Обновляем комиссию здесь)
          actualProfit = newActualProfit;
        } else {
          break; // stop increasing buy price if profit stops increasing (Прекращаем увеличение цены покупки, если прибыль перестанет увеличиваться)
        }
      }

      // adjust sell price for Steam fee (Корректируем цену продажи, учитывая комиссию Steam)
      sellPrice -= steamFee;

      // check purchase requests (Проверяем заказы на покупку)
      const nameid = data.nameid;
      const requestsUrl = `https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=${nameid}&two_factor=0`;
      fetch(requestsUrl)
        .then(response => response.json())
        .then(requests => {
          const buyRequests = requests.buy_order_graph[0].quantity;
          const sellRequests = requests.sell_order_graph[0].quantity;

          // adjust buy/sell prices based on purchase requests (Корректируем цены покупки/продажи на основе заказов на покупку)
          if (buyRequests > sellRequests) {
            // Increase buy price to stand a better chance of getting the item (Увеличиваем цену покупки, чтобы увеличить вероятность получения предмета)
            buyPrice = Math.ceil(buyPrice * (buyRequests / sellRequests));
          } else if (sellRequests > buyRequests) {
            // Decrease sell price to sell the item more quickly (Уменьшаем цену продажи, чтобы продать предмет быстрее)
            sellPrice = Math.floor(sellPrice * (sellRequests / buyRequests));
          }

          // analyze before order (Анализируем перед заказом)
          if (analyzeBeforeOrder) { // check if analyzeBeforeOrder is true (Проверяем, включен ли анализ перед заказом)
            const orderUrl = `https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=${nameid}&two_factor=0&norender=1`;
            fetch(orderUrl)
              .then(response => response.json())
              .then(orders => {
                const lastOrderPrice = orders.buy_order_table[0].price;
                const newBuyPrice = Math.floor(lastOrderPrice * 100 + 1) / 100;
                if (newBuyPrice < buyPrice) {
                  buyPrice = newBuyPrice;
                  console.log(`Adjusted buy price before order: ${buyPrice}`); // (Корректировка цены покупки перед заказом)
                }
              });
          }

          // analyze before sale (Анализируем перед продажей)
          if (analyzeBeforeSale) { // check if analyzeBeforeSale is true (Проверяем, включен ли анализ перед продажей)
            const inventoryUrl = `https://steamcommunity.com/inventory/YOUR_STEAM_ID/YOUR_APP_ID/YOUR_CONTEXT_ID?count=5000`;
            fetch(inventoryUrl)
              .then(response => response.json())
              .then(inventory => {
                const firstListingPrice = inventory.assets[0].market_actions[0].link.replace(/^\D+/g, '');
                const newSellPrice = Math.ceil(firstListingPrice * 100 - 1) / 100;
                if (newSellPrice > sellPrice) {
                  sellPrice = newSellPrice;
                  console.log(`Adjusted sell price before sale: ${sellPrice}`); // (Корректировка цены продажи перед продажей)
                }
              });
          }

          // calculate sticker markup when selling the item
          let stickerMarkupWhenSelling = 0;
          if (includeStickers) { // check if includeStickers is true (Проверяем, включены ли стикеры)
            const lastPrice = prices[0][1];
            const lastStickerAdjustedPrice = Math.max(1, lastPrice + stickerMarkup);
            const lastSellPrice = Math.floor(lastStickerAdjustedPrice * (1 + profitPercentage / 100) * (1 - 0.15));
            const lastSteamFee = Math.floor(lastSellPrice * 0.15);
            const lastActualProfit = Math.floor((lastSellPrice - lastStickerAdjustedPrice) / lastStickerAdjustedPrice * 100);
            const stickerAdjustedSellPrice = Math.floor(stickerAdjustedBuyPrice * (1 + profitPercentage / 100) * (1 - 0.15));
            const stickerAdjustedActualProfit = Math.floor((stickerAdjustedSellPrice - stickerAdjustedBuyPrice) / stickerAdjustedBuyPrice * 100);

            // calculate sticker markup
            stickerMarkupWhenSelling = (stickerAdjustedActualProfit - lastActualProfit) * stickerAdjustedBuyPrice / 100;
          }

          // return final buy and sell prices (Возвращаем итоговые цены покупки и продажи)
          const result = {
            buyPrice: buyPrice,
            sellPrice: sellPrice,
            stickerMarkupWhenSelling: stickerMarkupWhenSelling // наценка за стикеры при продаже предмета
          };
          return result;
        });

      // update profit value every profitUpdate seconds (Обновляем прибыль каждые profitUpdate секунд)
      setInterval(() => {
        const newProfit = Math.floor((sellPrice - stickerAdjustedBuyPrice) / stickerAdjustedBuyPrice * 100);
        if (newProfit > actualProfit) {
          sellPrice += 1; // increase sell price by 1 unit (Увеличиваем цену продажи на 1 единицу)
          steamFee = Math.floor(sellPrice * 0.15); // update fee here (Обновляем комиссию здесь)
          sellPrice -= steamFee; // adjust sell price for Steam fee (Корректируем цену продажи, учитывая комиссию Steam)
          actualProfit = newProfit;
        }
      }, profitUpdate * 1000); // с интервалом profitUpdate секунд
    })
    .catch(error => console.error(error));
}

// EXAMPLE USAGE: (Пример использования)
calculateItemPrice("AK-47 | Redline (Field-Tested)", 730, 5, 10, 20, 60, 30, true, true, 5, 0.03, true);
