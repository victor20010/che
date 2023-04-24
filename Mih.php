function calculateItemPrice($itemName, $appId, $corridor, $profitPercentage, $pleasantProfit, $profitUpdate, $analysisPeriod, $analyzeBeforeOrder, $analyzeBeforeSale, $stickerMarkupPercentage, $minimumStickerMarkup, $includeStickers) {
  // Calculate start and end dates for price analysis
  $endTimestamp = floor(time() / 1000);
  $startTimestamp = $endTimestamp - $analysisPeriod * 24 * 60 * 60;

  // Fetch price history
  $url = "https://steamcommunity.com/market/pricehistory/?appid=$appId&market_hash_name=".urlencode($itemName)."&start=$startTimestamp&end=$endTimestamp";
  fetch($url)
    ->then(function($response) {
      return $response->json();
    })
    ->then(function($data) use ($corridor, $stickerMarkupPercentage, $minimumStickerMarkup, $pleasantProfit, $profitPercentage, $includeStickers) {
      // filter prices using price corridor
      $prices = array_filter($data['prices'], function ($price) use ($corridor) {
        return $price[1] >= $corridor && $price[1] <= (100-$corridor);
      });

      // calculate sticker markup
      $stickerMarkup = 0;
      if ($includeStickers) { // check if includeStickers is true
        $stickerPricesOnly = array_filter($prices, function ($price) {
          return $price[2]; // filter out listings without stickers
        });
        if (count($stickerPricesOnly) > 0) {
          $pastWeekStickerPrices = array_slice($stickerPricesOnly, 0, 7); // last 7 days of sticker prices
          $averageStickerPrice = array_reduce($pastWeekStickerPrices, function ($total, $price) {
            return $total + $price[2];
          }, 0) / count($pastWeekStickerPrices);

          // calculate sticker markup
          $stickerMarkup = $averageStickerPrice * ($stickerMarkupPercentage / 100);

          // enforce minimum sticker markup
          if ($stickerMarkup < $minimumStickerMarkup) {
            $stickerMarkup = $minimumStickerMarkup;
          }
        } else {
          echo "No listings with stickers found.";
        }
      }

      // calculate buy and sell prices
      $buyPrice = $prices[0][1];
      $stickerAdjustedBuyPrice = max(1, $buyPrice + $stickerMarkup); // minimum is 1 due to Steam's minimum sale price rule
      $sellPrice = floor($stickerAdjustedBuyPrice * (1 + $profitPercentage / 100) * (1 - 0.15));
      $steamFee = floor($sellPrice * 0.15); // calculate fee here
      $actualProfit = floor(($sellPrice - $stickerAdjustedBuyPrice) / $stickerAdjustedBuyPrice * 100);

      // recalculate prices if pleasant profit not met
      while ($actualProfit < $pleasantProfit) {
        $buyPrice += 1; // increase buy price by 1 unit
        $newStickerAdjustedBuyPrice = max(1, $buyPrice + $stickerMarkup);
        $newSellPrice = floor($newStickerAdjustedBuyPrice * (1 + $profitPercentage / 100) * (1 - 0.15));
        $newSteamFee = floor($newSellPrice * 0.15);
        $newActualProfit = floor(($newSellPrice - $newStickerAdjustedBuyPrice) / $newStickerAdjustedBuyPrice * 100);
        if ($newActualProfit > $actualProfit) {
          $sellPrice = $newSellPrice;
          $steamFee = $newSteamFee; // update fee here
          $actualProfit = $newActualProfit;
        } else {
          break; // stop increasing buy price if profit stops increasing
        }
      }

      // adjust sell price for Steam fee
      $sellPrice -= $steamFee;

      // check purchase requests
      $nameid = $data['nameid'];
      $requestsUrl = "https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=$nameid&two_factor=0";
      fetch($requestsUrl)
        ->then(function($response) {
          return $response->json();
        })
        ->then(function($requests) use ($buyPrice, $sellPrice) {
          $buyRequests = $requests['buy_order_graph'][0]['quantity'];
          $sellRequests = $requests['sell_order_graph'][0]['quantity'];

          // adjust buy/sell prices based on purchase requests
          if ($buyRequests > $sellRequests) {
            // Increase buy price to stand a better chance of getting the item
            $buyPrice = ceil($buyPrice * ($buyRequests / $sellRequests));
          } else if ($sellRequests > $buyRequests) {
            // Decrease sell price to sell the item more quickly
            $sellPrice = floor($sellPrice * ($sellRequests / $buyRequests));
          }

          // analyze before order
          if ($analyzeBeforeOrder) { // check if analyzeBeforeOrder is true
            $orderUrl = "https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=$nameid&two_factor=0&norender=1";
            fetch($orderUrl)
              ->then(function($response) {
                return $response->json();
              })
              ->then(function($orders) use ($buyPrice) {
                $lastOrderPrice = $orders['buy_order_table'][0]['price'];
                $newBuyPrice = floor($lastOrderPrice * 100 + 1) / 100;
                if ($newBuyPrice < $buyPrice) {
                  $buyPrice = $newBuyPrice;
                  echo "Adjusted buy price before order: $buyPrice";
                }
              });
          }

          // analyze before sale
          if ($analyzeBeforeSale) { // check if analyzeBeforeSale is true
            $inventoryUrl = "https://steamcommunity.com/inventory/YOUR_STEAM_ID/YOUR_APP_ID/YOUR_CONTEXT_ID?count=5000";
            fetch($inventoryUrl)
              ->then(function($response) {
                return $response->json();
              })
              ->then(function($inventory) use ($sellPrice) {
                $firstListingPrice = preg_replace('/^\D+/', '', $inventory['assets'][0]['market_actions'][0]['link']);
                $newSellPrice = ceil($firstListingPrice * 100 - 1) / 100;
                if ($newSellPrice > $sellPrice) {
                  $sellPrice = $newSellPrice;
                  echo "Adjusted sell price before sale: $sellPrice";
                }
              });
          }

          echo "Buy at $buyPrice, sell at $sellPrice (profit: $actualProfit%, buy requests: $buyRequests, sell requests: $sellRequests), Steam fee: $steamFee"; // output fee here
        });
    });
}
