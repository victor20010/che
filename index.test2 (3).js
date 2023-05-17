(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
  var guid_fs;
  //var timeseries = require('timeseries-analysis');
  
  var guid_fifo;
  var guid_calc;
  var guid_di;
  var countDayHistoryGraph;
  var orders_sum = '';
  var percentLimit;
  var profitPercent;
  var minProfit;
  var profitPercent_min;
  var checkLowProfitTime;
  var checkLowProfitDate;
  var turnAllOrdersOnTime;
  var turnAllOrdersOnTimeDate;
  var cntSalesMonth;
  var algoritm;
  var algoritm_buy;
  var ordersPlace;
  var cancelOrderIfLow;
  var listingPlace;
  var monthTrend;
  var monthTrend_up;
  var weekTrend;
  var weekTrend_up;
  var dayTrend;
  var dayTrend_up;
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  var items = [];
  var groups = [];
  var group_settings = [];
  var filter_stickers = [];
  var accID;
  var accName;
  var login_error = false;
  var login_error_cnt = 0;
  var tabid;
  var thisTabid;
  var telegram_update_id;
  var telegram_chat_id;
  var telegram_alert_logout;
  var telegram_alert_login;
  var telegram_alert_SlivBalance;
  var telegram_alert_filterstickers;
  var telegram_alert_filterfloat;
  var telegram_alert_stickersprice;
  var telegram_alert_stickersstreak;
  var query_delay;
  var orders = [];
  var itemsOnSaleRefreshTime;
  var sellInventoryRefreshTime;
  var getOrdersRefreshTime;
  var sticker_overprice;
  var sticker_percent;
  var sellWithStickers;
  var currency = {};
  var logs_info;
  var working = false;
  var on_sale_cnt = 0;
  var on_sale_cnt_stcrs = 0;
  var on_sale_sum = 0;
  var db;
  var tempListing = [];
  var timerGetItemsOnSaleWorking = false;
  var timerSellInventoryWorking = false;
  var analyzeWorking = false;
  var autoIncOrders;
  var autologInSteamAcc = false;
  var checkSDASettings;
  var soundNotifications;
  var checkActualPrices;
  var importFileWithNoAnalyse;
  var removeFromSaleDays_skipWithStickers;
  var removeFromSaleDays_ignoreOrders;
  var updateItemsPrices_settings;
  var ignoreMissing;
  var dontSelTradable;
  var checkHistogramBeforeBuy;
  var checkHistogramBeforeSell;
  var inventoryData;
  var AOSettings;
  var removeFromSaleIfKonkurent;
  var removeFromSaleDays;
  var orderPercent;
  var myItemsOnSaleError = true;
  var timerSellInventoryWorking_cnt;
  var timerGetItemsOnSaleWorking_cnt;
  var myItemsOnSaleError_cnt = 0;
  var getBuyOrders_error = true;
  var getBuyOrders_error_cnt = 0;
  var myInventoryItemsCount;
  var current_group_edit_id;
  var SDARemove = [];
  var SDA_not_confirmed = [];
  var SDA_not_confirmed_date;
  var balance;
  var secretkey;
  var checkFloat = false;
  var hourForStats = '';
  var stats_balance;
  var percentSlivBalance = '';
  var alert_onsale_cnt = '';
  var max_cnt_items_for_orders = 0;
  var autoStart = false;
  var currentMarketBalance = 0;
  var currentMarketBalanceOrder = 0;
  var getInventoryGame_error = false;
  var getInventoryGame_error_cnt = 0;
  var messagesSTEdatetime;
  var marketBuySellDiff;
  var telegramThisIsMain;
  var orders_cnt = '';
  var logs_cnt = '';
  var arrayOfIgnoredAssets = [];
  var checkLowProfitDeleteOrderAlgoritm;
  var checkLowProfitUpdatePriceAlgoritm;
  var showItemsCntSalesDay = false;
  var alg_sell_qoeff = 1;
  var alg_buy_qoeff = 1;
  var placeMoreThen1000orders = false;
  var dont_sell_if_stickers_price;
  var dont_sell_if_stickers_streak;
  var proxy;
  var listingPlace_use_percent = false;
  var server = 1;
  var showItemsCurKoefOrder = false;
  var showItemsCurProfitPercent = false;
  var showItemsDate_last_sell = false;
  var index_q = 0;
  var index_rule = 0;
  var index = 0;
  var _0x470ca4 = 0;
  var sessionid;
  var perenos_v_osn_group = false;
  var perenos_v_temp_group = false;
  var group_percent;
  var group_temp;
  var cnt_for_move_to_osn_group = 1000;
  var version = '1.55';
  var servers = [];
  servers.push('https://s2.mm-rust.ru/1.55/');
  servers.push('https://s2.mm-rust.ru/1.55/');
  $(document).on('click', 'button#startWork', function (_0x591d23) {
    if (itemsOnSaleRefreshTime != undefined) {
      if (working) {
        startWork(true);
      } else {
        startWork(false);
      }
    }
  });
  function startWork(_0x40bfd2) {
    if (_0x40bfd2) {
      working = false;
      document.getElementById('startWork').innerHTML = 'Начать работу';
      document.getElementById('startWork').classList.remove('working');
      clearInterval(getItemsOnSaleTimer);
      clearInterval(sellInventoryTimer);
      clearInterval(getOrdersTimer);
      clearInterval(isLoginTimer);
      if (checkActualPrices) {
        clearInterval(checkActualPricesTimer);
      }
      orders = [];
      tempListing = [];
      timerGetItemsOnSaleWorking = false;
      timerSellInventoryWorking = false;
      analyzeWorking = false;
      timerSellInventoryWorking_cnt = 0;
      timerGetItemsOnSaleWorking_cnt = 0;
    } else {
      working = true;
      document.getElementById('startWork').innerHTML = 'Остановить';
      document.getElementById('startWork').classList.add('working');
      getItemsOnSaleTimer = setInterval(startTimerGetItemsOnSale, (itemsOnSaleRefreshTime == undefined ? 1 : itemsOnSaleRefreshTime) * 60000);
      sellInventoryTimer = setInterval(startTimerSellInventory, (sellInventoryRefreshTime == undefined ? 1 : sellInventoryRefreshTime) * 60000);
      getOrdersTimer = setInterval(startTimerGetOrders, (getOrdersRefreshTime == undefined ? 1 : getOrdersRefreshTime) * 60000 + 1000);
      isLoginTimer = setInterval(startTimerIsLogin, 60000);
      if (checkActualPrices) {
        checkActualPricesTimer = setInterval(startTimerCheckActualPrices, 3600000);
      }
      timerSellInventoryWorking_cnt = 0;
      timerGetItemsOnSaleWorking_cnt = 0;
      startTimerGetItemsOnSale();
      setTimeout(function () {
        startTimerSellInventory();
      }, 1000);
      setTimeout(function () {
        startTimerGetOrders();
      }, 2000);
    }
  }
  $(document).on('click', 'button#deleteItems', function () {
    let _0x2abee6 = 0;
    table = document.getElementById('tableID');
    rowCount = table.rows.length;
    for (i = 0; i < rowCount; i++) {
      row = table.rows[i];
      chkbox = row.cells[1].childNodes[0];
      if (chkbox != null && chkbox.checked == true) {
        _0x2abee6++;
      }
    }
    let _0x4fd3f8 = confirm('Удалить выделенные из базы? Количество: ' + _0x2abee6);
    if (_0x4fd3f8) {
      let _0x127e7d = [];
      let _0x4bec6c = [];
      for (i = 0; i < rowCount; i++) {
        row = table.rows[i];
        chkbox = row.cells[1].childNodes[0];
        if (chkbox != null && chkbox.checked == true) {
          if (row.className == 'item') {
            _0x127e7d.push(items[Number(row.id)].appid + items[Number(row.id)].name);
          } else if (row.className == 'group' && row.id != '0') {
            _0x4bec6c.push(parseInt(row.id));
          }
        }
      }
      deleteItems(_0x127e7d, _0x4bec6c, 0);
    }
  });
  $(document).on('click', 'button#CheckActualPrices_btn', function () {
    startTimerCheckActualPrices();
  });
  $(document).on('change', 'input.table', function (_0x41624f) {
    var _0x3aa424;
    switch (_0x41624f.currentTarget.name) {
      case 'b_summ':
        var _0x154a3e = _0x41624f.currentTarget.value.replace(',', '.');
        _0x154a3e = Number(_0x154a3e);
        if (isNaN(Number(_0x154a3e))) {
          _0x41624f.currentTarget.value = _0x41624f.currentTarget.defaultValue;
          return;
        }
        _0x154a3e = round(_0x154a3e * 100);
        _0x3aa424 = Number.parseInt(_0x41624f.currentTarget.id.replace('b_summ_', ''));
        runSQLupdate('b_summ', _0x154a3e, items[_0x3aa424].appid + items[_0x3aa424].name);
        items[_0x3aa424].b_summ = _0x154a3e;
        break;
      case 's_summ':
        _0x3aa424 = Number.parseInt(_0x41624f.currentTarget.id.replace('s_summ_', ''));
        var _0x154a3e = _0x41624f.currentTarget.value.replace(',', '.');
        _0x154a3e = Number(_0x154a3e);
        if (isNaN(Number(_0x154a3e))) {
          _0x41624f.currentTarget.value = _0x41624f.currentTarget.defaultValue;
          return;
        }
        var _0x2b5ce2 = getBuyerPays(_0x154a3e);
        _0x154a3e = round(_0x154a3e * 100);
        runSQLupdate('s_summ', _0x154a3e, items[_0x3aa424].appid + items[_0x3aa424].name);
        items[_0x3aa424].s_summ = _0x154a3e;
        items[_0x3aa424].s_summ_steam = _0x2b5ce2 * 100;
        $('#s_summ_steam_' + _0x3aa424)[0].value = _0x2b5ce2;
        break;
      case 'b_cnt':
        var _0x154a3e = _0x41624f.currentTarget.value.replace(',', '.');
        _0x154a3e = Number(_0x154a3e);
        if (isNaN(Number(_0x154a3e))) {
          _0x41624f.currentTarget.value = _0x41624f.currentTarget.defaultValue;
          return;
        }
        _0x154a3e = Number.parseInt(_0x154a3e);
        _0x3aa424 = Number.parseInt(_0x41624f.currentTarget.id.replace('b_cnt_', ''));
        runSQLupdate('b_cnt', _0x154a3e, items[_0x3aa424].appid + items[_0x3aa424].name);
        items[_0x3aa424].b_cnt = _0x154a3e;
        break;
      case 'b_on':
        _0x3aa424 = Number.parseInt(_0x41624f.currentTarget.id.replace('b_on_', ''));
        if (_0x41624f.currentTarget.checked) {
          runSQLupdate('b_on', 1, items[_0x3aa424].appid + items[_0x3aa424].name);
          items[_0x3aa424].b_on = 1;
        } else {
          runSQLupdate('b_on', 0, items[_0x3aa424].appid + items[_0x3aa424].name);
          items[_0x3aa424].b_on = 0;
        }
        break;
      case 's_on':
        _0x3aa424 = Number.parseInt(_0x41624f.currentTarget.id.replace('s_on_', ''));
        if (_0x41624f.currentTarget.checked) {
          runSQLupdate('s_on', 1, items[_0x3aa424].appid + items[_0x3aa424].name);
          items[_0x3aa424].s_on = 1;
        } else {
          runSQLupdate('s_on', 0, items[_0x3aa424].appid + items[_0x3aa424].name);
          items[_0x3aa424].s_on = 0;
        }
        break;
      case 's_summ_steam':
        _0x3aa424 = Number.parseInt(_0x41624f.currentTarget.id.replace('s_summ_steam_', ''));
        var _0x154a3e = _0x41624f.currentTarget.value.replace(',', '.');
        _0x154a3e = Number(_0x154a3e);
        if (isNaN(Number(_0x154a3e))) {
          _0x41624f.currentTarget.value = _0x41624f.currentTarget.defaultValue;
          return;
        }
        var _0x38071b = getSteamFee(_0x154a3e);
        _0x154a3e = getBuyerPays(_0x38071b);
        items[_0x3aa424].s_summ_steam = round(_0x154a3e * 100);
        items[_0x3aa424].s_summ = round(_0x38071b * 100);
        runSQLupdate('s_summ', round(_0x38071b * 100), items[_0x3aa424].appid + items[_0x3aa424].name);
        $('#s_summ_' + _0x3aa424)[0].value = _0x38071b;
        break;
      case 'min_float':
        _0x3aa424 = Number.parseInt(_0x41624f.currentTarget.id.replace('min_float_', ''));
        var _0x154a3e = _0x41624f.currentTarget.value.replace(',', '.');
        _0x154a3e = Number(_0x154a3e);
        if (isNaN(Number(_0x154a3e))) {
          _0x41624f.currentTarget.value = _0x41624f.currentTarget.defaultValue;
          return;
        }
        items[_0x3aa424].min_float = _0x154a3e;
        runSQLupdate('max_float', _0x154a3e, items[_0x3aa424].appid + items[_0x3aa424].name);
        break;
      case 'max_float':
        _0x3aa424 = Number.parseInt(_0x41624f.currentTarget.id.replace('max_float_', ''));
        var _0x154a3e = _0x41624f.currentTarget.value.replace(',', '.');
        _0x154a3e = Number(_0x154a3e);
        if (isNaN(Number(_0x154a3e))) {
          _0x41624f.currentTarget.value = _0x41624f.currentTarget.defaultValue;
          return;
        }
        items[_0x3aa424].max_float = _0x154a3e;
        runSQLupdate('min_float', _0x154a3e, items[_0x3aa424].appid + items[_0x3aa424].name);
        break;
    }
  });
  function changeSetting(_0x77e3b, _0x5e134c) {
    let _0x22132d;
    switch (_0x77e3b.name) {
      case 'cnt_for_move_to_osn_group':
        cnt_for_move_to_osn_group = Number(_0x77e3b.value);
        var _0x5aba4b = {};
        _0x5aba4b.cnt_for_move_to_osn_group = cnt_for_move_to_osn_group;
        chrome.storage.sync.set(_0x5aba4b);
        break;
      case 'hourForStats':
        hourForStats = _0x77e3b.value.substring(0, 2);
        var _0x370702 = {};
        _0x370702.hourForStats = hourForStats;
        chrome.storage.sync.set(_0x370702);
        break;
      case 'marketBuySellDiff':
        marketBuySellDiff = Number(_0x77e3b.value);
        var _0x44d270 = {};
        _0x44d270.marketBuySellDiff = marketBuySellDiff;
        chrome.storage.sync.set(_0x44d270);
        break;
      case 'getOrdersRefreshTime':
        if (Number(_0x77e3b.value) < 1) {
          var _0x1c4d16 = {};
          _0x1c4d16.getOrdersRefreshTime = 1;
          chrome.storage.sync.set(_0x1c4d16);
          getOrdersRefreshTime = 1;
        } else {
          chrome.storage.sync.set({ getOrdersRefreshTime: Number(_0x77e3b.value) });
          getOrdersRefreshTime = Number(_0x77e3b.value);
        }
        break;
      case 'sellInventoryRefreshTime':
        if (Number(_0x77e3b.value) < 1) {
          var _0x5b679d = {};
          _0x5b679d.sellInventoryRefreshTime = 1;
          chrome.storage.sync.set(_0x5b679d);
          sellInventoryRefreshTime = 1;
        } else {
          chrome.storage.sync.set({ sellInventoryRefreshTime: Number(_0x77e3b.value) });
          sellInventoryRefreshTime = Number(_0x77e3b.value);
        }
        break;
      case 'itemsOnSaleRefreshTime':
        if (Number(_0x77e3b.value) < 1) {
          var _0x131e28 = {};
          _0x131e28.itemsOnSaleRefreshTime = 1;
          chrome.storage.sync.set(_0x131e28);
          itemsOnSaleRefreshTime = 1;
        } else {
          chrome.storage.sync.set({ itemsOnSaleRefreshTime: Number(_0x77e3b.value) });
          itemsOnSaleRefreshTime = Number(_0x77e3b.value);
        }
        break;
      case 'dont_sell_if_stickers_price':
        chrome.storage.sync.set({ dont_sell_if_stickers_price: Number(_0x77e3b.value) });
        dont_sell_if_stickers_price = Number(_0x77e3b.value);
        break;
      case 'dont_sell_if_stickers_streak':
        if (Number(_0x77e3b.value) < 0 || Number(_0x77e3b.value) > 4) {
          alert('Значение может быть в промежутке (0 - 4)!');
          var _0x24dd4d = {};
          _0x24dd4d.dont_sell_if_stickers_streak = 0;
          chrome.storage.sync.set(_0x24dd4d);
          dont_sell_if_stickers_streak = 0;
        } else {
          chrome.storage.sync.set({ dont_sell_if_stickers_streak: Number(_0x77e3b.value) });
          dont_sell_if_stickers_streak = Number(_0x77e3b.value);
        }
        break;
      case 'sticker_overprice':
        var _0x4aabab = {};
        _0x4aabab.sticker_overprice = _0x77e3b.value;
        chrome.storage.sync.set(_0x4aabab);
        sticker_overprice = Number(_0x77e3b.value);
        break;
      case 'sticker_percent':
        var _0x2a5a8b = {};
        _0x2a5a8b.sticker_percent = _0x77e3b.value;
        chrome.storage.sync.set(_0x2a5a8b);
        sticker_percent = Number(_0x77e3b.value);
        break;
      case 'sellWithStickers':
        var _0x36b650 = {};
        _0x36b650.sellWithStickers = _0x77e3b.checked;
        chrome.storage.sync.set(_0x36b650);
        sellWithStickers = _0x77e3b.checked;
        break;
      case 'showItemsCntSalesDay':
        var _0x4b8225 = {};
        _0x4b8225.showItemsCntSalesDay = _0x77e3b.checked;
        chrome.storage.sync.set(_0x4b8225);
        showItemsCntSalesDay = _0x77e3b.checked;
        _0x1177f8();
        break;
      case 'showItemsCurProfitPercent':
        var _0x313ca8 = {};
        _0x313ca8.showItemsCurProfitPercent = _0x77e3b.checked;
        chrome.storage.sync.set(_0x313ca8);
        showItemsCurProfitPercent = _0x77e3b.checked;
        _0x1177f8();
        break;
      case 'showItemsCurKoefOrder':
        var _0xac1aff = {};
        _0xac1aff.showItemsCurKoefOrder = _0x77e3b.checked;
        chrome.storage.sync.set(_0xac1aff);
        showItemsCurKoefOrder = _0x77e3b.checked;
        _0x1177f8();
        break;
      case 'AOSettings':
        var _0x2be1fd = {};
        _0x2be1fd.AOSettings = _0x77e3b.checked;
        chrome.storage.sync.set(_0x2be1fd);
        AOSettings = _0x77e3b.checked;
        _0x1177f8();
        break;
      case 'autoIncOrders':
        var _0x22bed8 = {};
        _0x22bed8.autoIncOrders = _0x77e3b.checked;
        chrome.storage.sync.set(_0x22bed8);
        autoIncOrders = _0x77e3b.checked;
        break;
      case 'listingPlace_use_percent':
        var _0x3eb3eb = {};
        _0x3eb3eb.listingPlace_use_percent = _0x77e3b.checked;
        chrome.storage.sync.set(_0x3eb3eb);
        listingPlace_use_percent = _0x77e3b.checked;
        break;
      case 'proxy':
        var _0xd68a0f = {};
        _0xd68a0f.proxy = _0x77e3b.value;
        chrome.storage.sync.set(_0xd68a0f);
        proxy = _0x77e3b.value;
        if (proxy == '') {
          clearProxy();
        } else {
          changeProxy(proxy);
        }
        break;
      case 'autologInSteamAcc':
        if (autologInSteamAcc) {
          autologInSteamAcc = false;
          var _0x30c023 = {};
          _0x30c023.autologInSteamAcc = false;
          chrome.storage.sync.set(_0x30c023);
          return;
        }
        if (_0x5e134c != 'importSetting') {
          let _0x516968 = prompt('Для работы данной функции далее необходимо будет ввести логин, пароль и ма-файл от Steam аккаунта. Важно понимать, что хранить эти данные в боте НЕБЕЗОПАСНО, так как в случае утечки данных, вы потеряете свой Steam аккаунт навегда! Для продолжения введите ниже фразу "Я понимаю и осознаю риск, продолжить."');
          if (_0x516968 != 'Я понимаю и осознаю риск, продолжить.') {
            _0x77e3b.checked = false;
            return;
          }
        }
        string = prompt('Введите логин аккаунта');
        var _0x5ccd8c = {};
        _0x5ccd8c.SteamAcc_login = string;
        chrome.storage.sync.set(_0x5ccd8c);
        string = prompt('Введите пароль аккаунта');
        var _0x54f7d7 = {};
        _0x54f7d7.SteamAcc_password = string;
        chrome.storage.sync.set(_0x54f7d7);
        string = prompt('Введите shared_secret (находится в maFile, если открыть его через блокнот)');
        var _0xf87f80 = {};
        _0xf87f80.SteamAcc_shared_secret = string;
        chrome.storage.sync.set(_0xf87f80);
        var _0x2265df = {};
        _0x2265df.autologInSteamAcc = _0x77e3b.checked;
        chrome.storage.sync.set(_0x2265df);
        autologInSteamAcc = _0x77e3b.checked;
        break;
      case 'telegramThisIsMain':
        var _0x434325 = {};
        _0x434325.telegramThisIsMain = _0x77e3b.checked;
        chrome.storage.sync.set(_0x434325);
        telegramThisIsMain = _0x77e3b.checked;
        break;
      case 'telegram_alert_logout':
        var _0x5e0afc = {};
        _0x5e0afc.telegram_alert_logout = _0x77e3b.checked;
        chrome.storage.sync.set(_0x5e0afc);
        telegram_alert_logout = _0x77e3b.checked;
        break;
      case 'telegram_alert_login':
        var _0x35fabd = {};
        _0x35fabd.telegram_alert_login = _0x77e3b.checked;
        chrome.storage.sync.set(_0x35fabd);
        telegram_alert_login = _0x77e3b.checked;
        break;
      case 'telegram_alert_SlivBalance':
        var _0x21d3e4 = {};
        _0x21d3e4.telegram_alert_SlivBalance = _0x77e3b.checked;
        chrome.storage.sync.set(_0x21d3e4);
        telegram_alert_SlivBalance = _0x77e3b.checked;
        break;
      case 'telegram_alert_filterstickers':
        var _0x3b2284 = {};
        _0x3b2284.telegram_alert_filterstickers = _0x77e3b.checked;
        chrome.storage.sync.set(_0x3b2284);
        telegram_alert_filterstickers = _0x77e3b.checked;
        break;
      case 'telegram_alert_filterfloat':
        var _0x606058 = {};
        _0x606058.telegram_alert_filterfloat = _0x77e3b.checked;
        chrome.storage.sync.set(_0x606058);
        telegram_alert_filterfloat = _0x77e3b.checked;
        break;
      case 'telegram_alert_stickersprice':
        var _0x12dc3b = {};
        _0x12dc3b.telegram_alert_stickersprice = _0x77e3b.checked;
        chrome.storage.sync.set(_0x12dc3b);
        telegram_alert_stickersprice = _0x77e3b.checked;
        break;
      case 'telegram_alert_stickersstreak':
        var _0x1b3fce = {};
        _0x1b3fce.telegram_alert_stickersstreak = _0x77e3b.checked;
        chrome.storage.sync.set(_0x1b3fce);
        telegram_alert_stickersstreak = _0x77e3b.checked;
        break;
      case 'autoStart':
        var _0x43910b = {};
        _0x43910b.autoStart = _0x77e3b.checked;
        chrome.storage.sync.set(_0x43910b);
        autoStart = _0x77e3b.checked;
        break;
      case 'checkSDASettings':
        var _0x2458eb = {};
        _0x2458eb.checkSDASettings = _0x77e3b.checked;
        chrome.storage.sync.set(_0x2458eb);
        checkSDASettings = _0x77e3b.checked;
        break;
      case 'soundNotifications':
        var _0x1f84b5 = {};
        _0x1f84b5.soundNotifications = _0x77e3b.checked;
        chrome.storage.sync.set(_0x1f84b5);
        soundNotifications = _0x77e3b.checked;
        break;
      case 'checkActualPrices':
        if (!checkActualPrices && _0x77e3b.checked) {
          if (_0x5e134c != 'importSetting') {
            q = confirm('Включение данной настройки увеличивает вероятность получения микро-бана, вы уверены?');
          } else {
            q = true;
          }
          if (q) {
            var _0x3e1b31 = {};
            _0x3e1b31.checkActualPrices = _0x77e3b.checked;
            chrome.storage.sync.set(_0x3e1b31);
            checkActualPrices = _0x77e3b.checked;
          } else {
            _0x77e3b.checked = false;
          }
        } else {
          var _0x56bb38 = {};
          _0x56bb38.checkActualPrices = _0x77e3b.checked;
          chrome.storage.sync.set(_0x56bb38);
          checkActualPrices = _0x77e3b.checked;
        }
        break;
      case 'importFileWithNoAnalyse':
        var _0x31bf87 = {};
        _0x31bf87.importFileWithNoAnalyse = _0x77e3b.checked;
        chrome.storage.sync.set(_0x31bf87);
        importFileWithNoAnalyse = _0x77e3b.checked;
        break;
      case 'removeFromSaleDays_skipWithStickers':
        var _0x1b5aef = {};
        _0x1b5aef.removeFromSaleDays_skipWithStickers = _0x77e3b.checked;
        chrome.storage.sync.set(_0x1b5aef);
        removeFromSaleDays_skipWithStickers = _0x77e3b.checked;
        break;
      case 'removeFromSaleDays_ignoreOrders':
        var _0x540e76 = {};
        _0x540e76.removeFromSaleDays_ignoreOrders = _0x77e3b.checked;
        chrome.storage.sync.set(_0x540e76);
        removeFromSaleDays_ignoreOrders = _0x77e3b.checked;
        break;
      case 'removeFromSaleIfKonkurent':
        var _0x3e5964 = {};
        _0x3e5964.removeFromSaleIfKonkurent = _0x77e3b.checked;
        chrome.storage.sync.set(_0x3e5964);
        removeFromSaleIfKonkurent = _0x77e3b.checked;
        break;
      case 'updateItemsPrices_settings':
        var _0x4cf7dc = {};
        _0x4cf7dc.updateItemsPrices_settings = _0x77e3b.checked;
        chrome.storage.sync.set(_0x4cf7dc);
        updateItemsPrices_settings = _0x77e3b.checked;
        break;
      case 'ignoreMissing':
        var _0x430de3 = {};
        _0x430de3.ignoreMissing = _0x77e3b.checked;
        chrome.storage.sync.set(_0x430de3);
        ignoreMissing = _0x77e3b.checked;
        break;
      case 'dontSelTradable':
        var _0x2a9e37 = {};
        _0x2a9e37.dontSelTradable = _0x77e3b.checked;
        chrome.storage.sync.set(_0x2a9e37);
        dontSelTradable = _0x77e3b.checked;
        break;
      case 'checkHistogramBeforeBuy':
        var _0x1480a5 = {};
        _0x1480a5.checkHistogramBeforeBuy = _0x77e3b.checked;
        chrome.storage.sync.set(_0x1480a5);
        checkHistogramBeforeBuy = _0x77e3b.checked;
        break;
      case 'checkHistogramBeforeSell':
        var _0x5eb254 = {};
        _0x5eb254.checkHistogramBeforeSell = _0x77e3b.checked;
        chrome.storage.sync.set(_0x5eb254);
        checkHistogramBeforeSell = _0x77e3b.checked;
        break;
      case 'checkFloat':
        var _0x423416 = {};
        _0x423416.checkFloat = _0x77e3b.checked;
        chrome.storage.sync.set(_0x423416);
        checkFloat = _0x77e3b.checked;
        _0x1177f8();
        break;
      case 'countDayHistoryGraph':
        countDayHistoryGraph = Number(_0x77e3b.value);
        if (countDayHistoryGraph > 30) {
          countDayHistoryGraph = 30;
        } else if (countDayHistoryGraph < 1) {
          countDayHistoryGraph = 1;
        }
        var _0x33d8fa = {};
        _0x33d8fa.countDayHistoryGraph = _0x77e3b.value;
        chrome.storage.sync.set(_0x33d8fa);
        _0x77e3b.value = countDayHistoryGraph;
        break;
      case 'alg_sell_qoeff':
        if (_0x5e134c != 'importSetting') {
          q = confirm('ПРЕДУПРЕЖДЕНИЕ!!! Если вы не знаете АБСОЛЮТНО ТОЧНО, что делает эта настройка, оставьте значение 1, иначе бот будет работать некорректно!!!');
        } else {
          q = true;
        }
        if (q) {
          alg_sell_qoeff = Number(_0x77e3b.value);
          var _0xe490a8 = {};
          _0xe490a8.alg_sell_qoeff = _0x77e3b.value;
          chrome.storage.sync.set(_0xe490a8);
          document.getElementById('alg_sell_qoeff').value = alg_sell_qoeff;
        } else {
          document.getElementById('alg_sell_qoeff').value = 1;
          alg_sell_qoeff = 1;
          var _0x13de48 = {};
          _0x13de48.alg_sell_qoeff = _0x77e3b.value;
          chrome.storage.sync.set(_0x13de48);
        }
        break;
      case 'alg_buy_qoeff':
        if (_0x5e134c != 'importSetting') {
          q = confirm('ПРЕДУПРЕЖДЕНИЕ!!! Если вы не знаете АБСОЛЮТНО ТОЧНО, что делает эта настройка, оставьте значение 1, иначе бот будет работать некорректно!!!');
        } else {
          q = true;
        }
        if (q) {
          alg_buy_qoeff = Number(_0x77e3b.value);
          var _0x6a7d25 = {};
          _0x6a7d25.alg_buy_qoeff = _0x77e3b.value;
          chrome.storage.sync.set(_0x6a7d25);
          document.getElementById('alg_buy_qoeff').value = alg_buy_qoeff;
        } else {
          document.getElementById('alg_buy_qoeff').value = 1;
          alg_buy_qoeff = 1;
          var _0x3913dc = {};
          _0x3913dc.alg_buy_qoeff = _0x77e3b.value;
          chrome.storage.sync.set(_0x3913dc);
        }
        break;
      case 'percentLimit':
        percentLimit = Number(_0x77e3b.value);
        if (percentLimit < 20) {
          if (_0x5e134c != 'importSetting') {
            q = confirm('Установка этого значения меньше 20 может привести к некорректному расчету цен, вы уверены?');
          } else {
            q = true;
          }
          if (!q) {
            percentLimit = 20;
            document.getElementsByName('percentLimit')[0].value = percentLimit;
          }
        }
        var _0x305afb = {};
        _0x305afb.percentLimit = percentLimit;
        chrome.storage.sync.set(_0x305afb);
        break;
      case 'profitPercent':
        var _0x335b38 = {};
        _0x335b38.profitPercent = _0x77e3b.value;
        chrome.storage.sync.set(_0x335b38);
        profitPercent = Number(_0x77e3b.value);
        break;
      case 'percentSlivBalance':
        if (hourForStats == '') {
          alert('Защита от слива не будет работать, так как у вас не задано время сбора статистики!');
        }
        _0x22132d = Number(_0x77e3b.value);
        if (_0x22132d < 1) {
          _0x22132d = '';
          _0x77e3b.value = '';
        }
        var _0x3b5ee9 = {};
        _0x3b5ee9.percentSlivBalance = _0x22132d;
        chrome.storage.sync.set(_0x3b5ee9);
        percentSlivBalance = _0x22132d;
        break;
      case 'alert_onsale_cnt':
        _0x22132d = Number(_0x77e3b.value);
        if (_0x22132d < 1) {
          _0x22132d = '';
          document.getElementsByName('alert_onsale_cnt')[0].value = '';
        } else if (_0x22132d > 100) {
          _0x22132d = 100;
          document.getElementsByName('alert_onsale_cnt')[0].value = '100';
        }
        var _0x205af8 = {};
        _0x205af8.alert_onsale_cnt = _0x22132d;
        chrome.storage.sync.set(_0x205af8);
        alert_onsale_cnt = _0x22132d;
        break;
      case 'max_cnt_items_for_orders':
        _0x22132d = Number(_0x77e3b.value);
        if (_0x22132d < 1) {
          document.getElementsByName('max_cnt_items_for_orders')[0].value = '';
          _0x22132d = 0;
        }
        var _0x7455e3 = {};
        _0x7455e3.max_cnt_items_for_orders = _0x22132d;
        chrome.storage.sync.set(_0x7455e3);
        max_cnt_items_for_orders = _0x22132d;
        break;
      case 'minProfit':
        var _0x207a0e = {};
        _0x207a0e.minProfit = _0x77e3b.value;
        chrome.storage.sync.set(_0x207a0e);
        minProfit = Number(_0x77e3b.value);
        break;
      case 'profitPercent_min':
        var _0x5efab3 = {};
        _0x5efab3.profitPercent_min = _0x77e3b.value;
        chrome.storage.sync.set(_0x5efab3);
        profitPercent_min = Number(_0x77e3b.value);
        break;
      case 'checkLowProfitTime':
        checkLowProfitTime = _0x77e3b.value.substring(0, 2);
        var _0x317ce9 = {};
        _0x317ce9.checkLowProfitTime = checkLowProfitTime;
        chrome.storage.sync.set(_0x317ce9);
        break;
      case 'turnAllOrdersOnTime':
        turnAllOrdersOnTime = _0x77e3b.value.substring(0, 2);
        var _0x553b2c = {};
        _0x553b2c.turnAllOrdersOnTime = turnAllOrdersOnTime;
        chrome.storage.sync.set(_0x553b2c);
        break;
      case 'cntSalesMonth':
        var _0x33cc62 = {};
        _0x33cc62.cntSalesMonth = _0x77e3b.value;
        chrome.storage.sync.set(_0x33cc62);
        cntSalesMonth = Number(_0x77e3b.value);
        break;
      case 'monthTrend':
        var _0x506fee = {};
        _0x506fee.monthTrend = _0x77e3b.value;
        chrome.storage.sync.set(_0x506fee);
        monthTrend = Number(_0x77e3b.value);
        break;
      case 'monthTrend_up':
        var _0x16eb20 = {};
        _0x16eb20.monthTrend_up = _0x77e3b.value;
        chrome.storage.sync.set(_0x16eb20);
        monthTrend_up = Number(_0x77e3b.value);
        break;
      case 'weekTrend':
        var _0x5aa693 = {};
        _0x5aa693.weekTrend = _0x77e3b.value;
        chrome.storage.sync.set(_0x5aa693);
        weekTrend = Number(_0x77e3b.value);
        break;
      case 'weekTrend_up':
        var _0x317c50 = {};
        _0x317c50.weekTrend_up = _0x77e3b.value;
        chrome.storage.sync.set(_0x317c50);
        weekTrend_up = Number(_0x77e3b.value);
        break;
      case 'dayTrend':
        var _0x548346 = {};
        _0x548346.dayTrend = _0x77e3b.value;
        chrome.storage.sync.set(_0x548346);
        dayTrend = Number(_0x77e3b.value);
        break;
      case 'dayTrend_up':
        var _0x36d819 = {};
        _0x36d819.dayTrend_up = _0x77e3b.value;
        chrome.storage.sync.set(_0x36d819);
        dayTrend_up = Number(_0x77e3b.value);
        break;
      case 'ordersPlace':
        var _0x36c3dc = {};
        _0x36c3dc.ordersPlace = _0x77e3b.value;
        chrome.storage.sync.set(_0x36c3dc);
        ordersPlace = Number(_0x77e3b.value);
        break;
      case 'cancelOrderIfLow':
        var _0x46f5fd = {};
        _0x46f5fd.cancelOrderIfLow = _0x77e3b.checked;
        chrome.storage.sync.set(_0x46f5fd);
        cancelOrderIfLow = _0x77e3b.checked;
        break;
      case 'placeMoreThen1000orders':
        if (placeMoreThen1000orders || !_0x77e3b.checked) {
          var _0x1e72ea = {};
          _0x1e72ea.placeMoreThen1000orders = _0x77e3b.checked;
          chrome.storage.sync.set(_0x1e72ea);
          placeMoreThen1000orders = _0x77e3b.checked;
        } else {
          if (_0x5e134c != 'importSetting') {
            q = confirm('ПРЕДУПРЕЖДЕНИЕ!!! При включении данной настройки бот может работать некорректно, продолжить?');
          } else {
            q = true;
          }
          if (q) {
            var _0x30f56b = {};
            _0x30f56b.placeMoreThen1000orders = _0x77e3b.checked;
            chrome.storage.sync.set(_0x30f56b);
            placeMoreThen1000orders = _0x77e3b.checked;
          } else {
            placeMoreThen1000orders = false;
            document.getElementsByName('placeMoreThen1000orders')[0].checked = false;
          }
        }
        break;
      case 'listingPlace':
        var _0x44caca = {};
        _0x44caca.listingPlace = _0x77e3b.value;
        chrome.storage.sync.set(_0x44caca);
        listingPlace = Number(_0x77e3b.value);
        break;
      case 'removeFromSaleDays':
        var _0x40a08c = {};
        _0x40a08c.removeFromSaleDays = _0x77e3b.value;
        chrome.storage.sync.set(_0x40a08c);
        removeFromSaleDays = Number(_0x77e3b.value);
        break;
      case 'orderPercent':
        var _0x58599e = {};
        _0x58599e.orderPercent = _0x77e3b.value;
        chrome.storage.sync.set(_0x58599e);
        orderPercent = Number(_0x77e3b.value);
        break;
      case 'dateReportStart':
        var _0x4d27a9 = {};
        _0x4d27a9.dateReportStart = _0x77e3b.value;
        chrome.storage.sync.set(_0x4d27a9);
        break;
      case 'telegram_chat_id':
        var _0xd6724a = {};
        _0xd6724a.telegram_chat_id = _0x77e3b.value;
        chrome.storage.sync.set(_0xd6724a);
        telegram_chat_id = _0x77e3b.value;
        break;
      case 'query_delay':
        if (Number(_0x77e3b.value) != 0 && Number(_0x77e3b.value) < 2000) {
          var _0x482feb = {};
          _0x482feb.query_delay = 2000;
          chrome.storage.sync.set(_0x482feb);
          query_delay = 2000;
        } else {
          chrome.storage.sync.set({ query_delay: Number(_0x77e3b.value) });
          query_delay = Number(_0x77e3b.value);
        }
        break;
      case 'group_profitPercent':
        changeGroupSettings('profitPercent', _0x77e3b.value);
        break;
      case 'group_minProfit':
        changeGroupSettings('minProfit', _0x77e3b.value);
        break;
      case 'group_profitPercent_min':
        changeGroupSettings('profitPercent_min', _0x77e3b.value);
        break;
      case 'group_countDayHistoryGraph':
        changeGroupSettings('countDayHistoryGraph', _0x77e3b.value);
        break;
      case 'group_percentLimit':
        changeGroupSettings('percentLimit', _0x77e3b.value);
        break;
      case 'group_algoritm':
        changeGroupSettings('algoritm', _0x77e3b.value);
        break;
      case 'group_algoritm_buy':
        changeGroupSettings('algoritm_buy', _0x77e3b.value);
        break;
      case 'group_orderPercent':
        changeGroupSettings('orderPercent', _0x77e3b.value);
        break;
      case 'group_ordersPlace':
        changeGroupSettings('ordersPlace', _0x77e3b.value);
        break;
      case 'group_cancelOrderIfLow':
        changeGroupSettings('cancelOrderIfLow', _0x77e3b.checked);
        break;
      case 'group_dontDeleteOrders':
        changeGroupSettings('dontDeleteOrders', _0x77e3b.checked);
        break;
      case 'group_cntSalesMonth':
        changeGroupSettings('cntSalesMonth', _0x77e3b.value);
        break;
      case 'group_listingPlace':
        changeGroupSettings('listingPlace', _0x77e3b.value);
        break;
      case 'group_monthTrend':
        changeGroupSettings('monthTrend', _0x77e3b.value);
        break;
      case 'group_monthTrend_up':
        changeGroupSettings('monthTrend_up', _0x77e3b.value);
        break;
      case 'group_weekTrend':
        changeGroupSettings('weekTrend', _0x77e3b.value);
        break;
      case 'group_weekTrend_up':
        changeGroupSettings('weekTrend_up', _0x77e3b.value);
        break;
      case 'group_dayTrend':
        changeGroupSettings('dayTrend', _0x77e3b.value);
        break;
      case 'group_dayTrend_up':
        changeGroupSettings('dayTrend_up', _0x77e3b.value);
        break;
      case 'group_alg_sell_qoeff':
        changeGroupSettings('alg_sell_qoeff', _0x77e3b.value);
        break;
      case 'group_alg_buy_qoeff':
        changeGroupSettings('alg_buy_qoeff', _0x77e3b.value);
        break;
      case 'logs_cnt':
        var _0x4abbcf = {};
        _0x4abbcf.logs_cnt = _0x77e3b.value;
        chrome.storage.sync.set(_0x4abbcf);
        logs_cnt = Number(_0x77e3b.value);
        let _0x3cd6db = $('#log')[0].children.length - logs_cnt - 1;
        if ($('#log')[0].children.length > logs_cnt) {
          for (let _0x23a096 = 0; _0x23a096 <= _0x3cd6db; _0x23a096++) {
            $('#log')[0].lastChild.remove();
          }
        }
        break;
      case 'perenos_v_osn_group':
        var _0x23fc04 = {};
        _0x23fc04.perenos_v_osn_group = _0x77e3b.checked;
        chrome.storage.sync.set(_0x23fc04);
        perenos_v_osn_group = _0x77e3b.checked;
        break;
      case 'perenos_v_temp_group':
        var _0x3f941a = {};
        _0x3f941a.perenos_v_temp_group = _0x77e3b.checked;
        chrome.storage.sync.set(_0x3f941a);
        perenos_v_temp_group = _0x77e3b.checked;
        break;
      case 'algoritm':
        var _0x3eb6e2 = {};
        _0x3eb6e2.algoritm = _0x77e3b.value;
        chrome.storage.sync.set(_0x3eb6e2);
        algoritm = _0x77e3b.value;
        break;
      case 'algoritm_buy':
        var _0xe93d47 = {};
        _0xe93d47.algoritm_buy = _0x77e3b.value;
        chrome.storage.sync.set(_0xe93d47);
        algoritm_buy = _0x77e3b.value;
        break;
      case 'logs_info':
        var _0x28bf51 = {};
        _0x28bf51.logs_info = _0x77e3b.value;
        chrome.storage.sync.set(_0x28bf51);
        logs_info = Number(_0x77e3b.value);
        if (logs_info == 3) {
          $('#logs_cnt')[0].hidden = false;
        } else {
          $('#logs_cnt')[0].hidden = true;
        }
        break;
      case 'server':
        var _0x11c698 = {};
        _0x11c698.server = _0x77e3b.value;
        chrome.storage.sync.set(_0x11c698);
        server = Number(_0x77e3b.value);
        server_url = servers[server];
        if (_0x5e134c != 'importSetting') {
          chrome.tabs.reload();
        }
        break;
      case 'group_algoritm':
        changeGroupSettings('algoritm', _0x77e3b.value);
        break;
      case 'group_algoritm_buy':
        changeGroupSettings('algoritm_buy', _0x77e3b.value);
        break;
      case 'appid':
        switch (_0x77e3b.value) {
          case '730':
            $('#filters_tf2')[0].hidden = true;
            $('#filters_csgo')[0].hidden = false;
            $('#filters_dota2')[0].hidden = true;
            break;
          case '440':
            $('#filters_tf2')[0].hidden = false;
            $('#filters_csgo')[0].hidden = true;
            $('#filters_dota2')[0].hidden = true;
            break;
          case '570':
            $('#filters_tf2')[0].hidden = true;
            $('#filters_csgo')[0].hidden = true;
            $('#filters_dota2')[0].hidden = false;
            break;
          default:
            $('#filters_tf2')[0].hidden = true;
            $('#filters_csgo')[0].hidden = true;
            $('#filters_dota2')[0].hidden = true;
            break;
        }
        break;
      case 'checkLowProfitDeleteOrderAlgoritm':
        var _0x621d9a = {};
        _0x621d9a.checkLowProfitDeleteOrderAlgoritm = _0x77e3b.value;
        chrome.storage.sync.set(_0x621d9a);
        checkLowProfitDeleteOrderAlgoritm = _0x77e3b.value;
        break;
      case 'checkLowProfitUpdatePriceAlgoritm':
        var _0x3b8cb3 = {};
        _0x3b8cb3.checkLowProfitUpdatePriceAlgoritm = _0x77e3b.value;
        chrome.storage.sync.set(_0x3b8cb3);
        checkLowProfitUpdatePriceAlgoritm = _0x77e3b.value;
        break;
      case 'group_percent':
        var _0x1be542 = {};
        _0x1be542.group_percent = _0x77e3b.value;
        chrome.storage.sync.set(_0x1be542);
        group_percent = _0x77e3b.value;
        break;
      case 'group_temp':
        var _0x18851e = {};
        _0x18851e.group_temp = _0x77e3b.value;
        chrome.storage.sync.set(_0x18851e);
        group_temp = _0x77e3b.value;
        break;
    }
  }
  $(document).on('change', 'input.settings', function (_0x2f413e) {
    changeSetting(_0x2f413e.currentTarget, '');
  });
  $(document).on('change', 'input.group_b_cnt', function (_0x3ed7ab) {
    switch (_0x3ed7ab.currentTarget.name) {
      case 'group_b_cnt':
        var _0x4d1a07 = Number(_0x3ed7ab.currentTarget.id);
        var _0x272af1 = Number(_0x3ed7ab.currentTarget.value);
        var _0x3c6471;
        for (var _0x52b550 = 0; _0x52b550 < groups.length; _0x52b550++) {
          if (groups[_0x52b550].id == _0x4d1a07) {
            _0x3c6471 = _0x52b550;
            break;
          }
        }
        if (groups[_0x3c6471].order_percent == 'true') {
          groups[_0x3c6471].order_percent_cnt = Number(_0x3ed7ab.currentTarget.value);
          var _0x48db9d = 'update [group] set order_percent_cnt = ' + _0x3ed7ab.currentTarget.value + ' where id = ' + _0x4d1a07 + '';
          db.transaction(function (_0x1592e6) {
            _0x1592e6.executeSql(_0x48db9d, [], function () {
            }, function (_0x135032, _0x2d649e) {
              logSQLError(_0x48db9d, _0x2d649e);
            });
          });
        } else {
          var _0x347118 = 'update item set b_cnt = ' + _0x272af1 + ' where id_group = ' + _0x4d1a07;
          db.transaction(function (_0x23dc79) {
            _0x23dc79.executeSql(_0x347118, [], function () {
              for (var _0x1e0b96 = 0; _0x1e0b96 < items.length; _0x1e0b96++) {
                if (items[_0x1e0b96].id_group == _0x4d1a07) {
                  items[_0x1e0b96].b_cnt = _0x272af1;
                  $('#b_cnt_' + _0x1e0b96)[0].value = _0x272af1;
                }
              }
            }, function (_0x4383e0, _0xaa94c3) {
              logSQLError(_0x347118, _0xaa94c3);
            });
          });
        }
        break;
      case 'group_b_cnt_max':
        var _0x4d1a07 = _0x3ed7ab.currentTarget.id.replace('group_b_cnt_max_', '');
        var _0x272af1 = Number(_0x3ed7ab.currentTarget.value);
        var _0x3c6471;
        for (var _0x52b550 = 0; _0x52b550 < groups.length; _0x52b550++) {
          if (groups[_0x52b550].id == _0x4d1a07) {
            _0x3c6471 = _0x52b550;
            break;
          }
        }
        if (groups[_0x3c6471].order_percent == 'true') {
          groups[_0x3c6471].order_max = Number(_0x3ed7ab.currentTarget.value);
          var _0x48db9d = 'update [group] set order_max = ' + _0x3ed7ab.currentTarget.value + ' where id = ' + _0x4d1a07 + '';
          db.transaction(function (_0x4dce45) {
            _0x4dce45.executeSql(_0x48db9d, [], function () {
            }, function (_0x38c961, _0xb6d946) {
              logSQLError(_0x48db9d, _0xb6d946);
            });
          });
        }
        break;
    }
  });
  $(document).on('change', 'select.settings', function (_0x57fb8c) {
    changeSetting(_0x57fb8c.currentTarget, '');
  });
  $(document).on('click', 'button.tableOrder', function (_0xe8495) {
    var _0x58ee9b = [];
    let _0x5019ee = {};
    _0x5019ee.name = items[_0xe8495.currentTarget.id].name;
    _0x5019ee.appid = items[_0xe8495.currentTarget.id].appid;
    _0x5019ee.buyorderid = items[_0xe8495.currentTarget.id].buyorderid;
    _0x5019ee.b_summ = items[_0xe8495.currentTarget.id].b_summ;
    _0x58ee9b.push(_0x5019ee);
    cancelBuyOrder(_0x58ee9b, 0);
  });
  $(document).on('click', 'button.tableOnSale', function (_0xb7473f) {
    removeFromSale(items[Number(_0xb7473f.currentTarget.id)].removeIds, 0);
  });
  $(document).on('click', 'button.group', function (_0x53839f) {
    switch (_0x53839f.currentTarget.id) {
      case 'b':
        var _0xa43a8b = Number(_0x53839f.currentTarget.parentElement.parentElement.id);
        var _0x2fcb6c;
        if (_0x53839f.currentTarget.name == 'b_on') {
          _0x2fcb6c = 1;
        } else {
          _0x2fcb6c = 0;
        }
        var _0x1a8c27 = 'update item set b_on = ' + _0x2fcb6c + ' where id_group = ' + _0xa43a8b;
        db.transaction(function (_0x348d07) {
          _0x348d07.executeSql(_0x1a8c27, [], function () {
            for (var _0x57fb1d = 0; _0x57fb1d < items.length; _0x57fb1d++) {
              if (items[_0x57fb1d].id_group == _0xa43a8b) {
                items[_0x57fb1d].b_on = _0x2fcb6c;
                if (_0x2fcb6c) {
                  $('#b_on_' + _0x57fb1d)[0].checked = true;
                } else {
                  $('#b_on_' + _0x57fb1d)[0].checked = false;
                }
              }
            }
          }, function (_0x365b51, _0x1d21a3) {
            logSQLError(_0x1a8c27, _0x1d21a3);
          });
        });
        break;
      case 's':
        var _0xa43a8b = Number(_0x53839f.currentTarget.parentElement.parentElement.id);
        var _0x309061;
        if (_0x53839f.currentTarget.name == 's_on') {
          _0x309061 = 1;
        } else {
          _0x309061 = 0;
        }
        var _0x1a8c27 = 'update item set s_on = ' + _0x309061 + ' where id_group = ' + _0xa43a8b;
        db.transaction(function (_0x2fcfa3) {
          _0x2fcfa3.executeSql(_0x1a8c27, [], function () {
            for (var _0x4115ee = 0; _0x4115ee < items.length; _0x4115ee++) {
              if (items[_0x4115ee].id_group == _0xa43a8b) {
                items[_0x4115ee].s_on = _0x309061;
                if (_0x309061) {
                  $('#s_on_' + _0x4115ee)[0].checked = true;
                } else {
                  $('#s_on_' + _0x4115ee)[0].checked = false;
                }
              }
            }
          }, function (_0x238d05, _0x48c6c9) {
            logSQLError(_0x1a8c27, _0x48c6c9);
          });
        });
        break;
    }
  });
  $(document).on('click', 'td.table', function (_0x10ca75) {
    items.sort(function (_0x4d093a, _0x4955ff) {
      var _0x30eb69 = _0x4d093a[_0x10ca75.currentTarget.id];
      var _0x277a16 = _0x4955ff[_0x10ca75.currentTarget.id];
      if (_0x4d093a[_0x10ca75.currentTarget.id] > _0x4955ff[_0x10ca75.currentTarget.id]) {
        return -1;
      }
      if (_0x4d093a[_0x10ca75.currentTarget.id] < _0x4955ff[_0x10ca75.currentTarget.id]) {
        return 1;
      }
      return 0;
    });
    _0x1177f8();
  });
  $(document).on('click', 'button.addToGroup', function (_0x5a5271) {
    table = document.getElementById('tableID');
    rowCount = table.rows.length;
    var _0x57dc7e = [];
    for (i = 0; i < rowCount; i++) {
      row = table.rows[i];
      chkbox = row.cells[1].childNodes[0];
      if (chkbox != null && chkbox.checked == true && row.className == 'item') {
        _0x57dc7e.push(items[row.id].appid + items[row.id].name);
      }
    }
    addItemsToGroup(_0x57dc7e, parseInt(_0x5a5271.currentTarget.id), true);
  });
  $(document).on('click', 'button.hideOpen', function (_0x28bbe0) {
    var _0x8018a3;
    if (_0x28bbe0.currentTarget.innerHTML == '+') {
      _0x8018a3 = 'update [group] set open = 1 where id = ' + _0x28bbe0.currentTarget.id;
    } else {
      _0x8018a3 = 'update [group] set open = 0 where id = ' + _0x28bbe0.currentTarget.id;
    }
    db.transaction(function (_0x2067aa) {
      _0x2067aa.executeSql(_0x8018a3, [], function () {
        if (_0x28bbe0.currentTarget.innerText == '+') {
          $('tbody#group' + _0x28bbe0.currentTarget.id)[0].hidden = false;
        } else {
          $('tbody#group' + _0x28bbe0.currentTarget.id)[0].hidden = true;
        }
        var _0x323eb0 = groups.map(function (_0x82f050) {
          return _0x82f050.id;
        }).indexOf(Number(_0x28bbe0.currentTarget.id));
        if (_0x28bbe0.currentTarget.innerHTML == '+') {
          _0x28bbe0.currentTarget.innerHTML = '-';
          _0x28bbe0.currentTarget.classList.add('open');
          groups[_0x323eb0].open = 1;
        } else {
          _0x28bbe0.currentTarget.innerText = '+';
          _0x28bbe0.currentTarget.classList.remove('open');
          groups[_0x323eb0].open = 0;
        }
      }, function (_0x48604b, _0x1d19ce) {
        logSQLError(_0x8018a3, _0x1d19ce);
      });
    });
  });
  $(document).on('change', 'input.group_checkbox', function (_0xf0422d) {
    table = document.getElementById('tableID');
    rowCount = table.rows.length;
    let _0x42225c = _0xf0422d.currentTarget.id.replace('group_checkbox_', '');
    for (i = 0; i < rowCount; i++) {
      row = table.rows[i];
      if (row.className == 'item' && row.parentElement.id == 'group' + _0x42225c) {
        row.cells[1].childNodes[0].checked = _0xf0422d.currentTarget.checked;
        items.forEach(_0x20d5ed => {
          if (_0x20d5ed.id_group == _0x42225c) {
            _0x20d5ed.checked = _0xf0422d.currentTarget.checked;
          }
        });
      }
    }
    findCheckedItemsCnt();
  });
  $(document).on('change', 'input.group_b_cnt_percent', function (_0x6934ee) {
    var _0x133699;
    let _0x563639 = _0x6934ee.currentTarget.id.replace('group_b_cnt_percent_', '');
    if (_0x6934ee.currentTarget.checked) {
      _0x133699 = 'update [group] set order_percent = "true" where id = "' + _0x563639 + '"';
      $('#group_b_cnt_max_' + _0x563639)[0].hidden = false;
    } else {
      _0x133699 = 'update [group] set order_percent = "false" where id = "' + _0x563639 + '"';
      $('#group_b_cnt_max_' + _0x563639)[0].hidden = true;
    }
    for (var _0x17f88d = 0; _0x17f88d < groups.length; _0x17f88d++) {
      if (groups[_0x17f88d].id == _0x6934ee.currentTarget.id) {
        groups[_0x17f88d].order_percent = '' + _0x6934ee.currentTarget.checked;
        break;
      }
    }
    db.transaction(function (_0x349180) {
      _0x349180.executeSql(_0x133699, [], function () {
      }, function (_0x263ca8, _0x515670) {
        logSQLError(_0x133699, _0x515670);
      });
    });
  });
  $(document).on('change', 'input.all_name_checkbox', function (_0x573403) {
    table = document.getElementById('tableID');
    rowCount = table.rows.length;
    for (i = 0; i < rowCount; i++) {
      row = table.rows[i];
      row.cells[1].childNodes[0].checked = _0x573403.currentTarget.checked;
    }
    items.forEach(_0x51b1e1 => {
      _0x51b1e1.checked = _0x573403.currentTarget.checked;
    });
    findCheckedItemsCnt();
  });
  $(document).on('change', 'input.itemCheckbox', function (_0x1136c6) {
    var _0xc1c980 = Number(_0x1136c6.currentTarget.parentElement.parentElement.id);
    items[_0xc1c980].checked = _0x1136c6.currentTarget.checked;
    findCheckedItemsCnt();
  });
  $(document).on('change', 'input.group_name', function (_0xa88254) {
    str = 'update "group" set name = "' + _0xa88254.currentTarget.value + '" where name = "' + _0xa88254.currentTarget.defaultValue + '"';
    db.transaction(function (_0x2a828d) {
      _0x2a828d.executeSql(str, [], function (_0xf74074, _0x28722e) {
        t = groups.map(function (_0x5b087a) {
          return _0x5b087a.name;
        }).indexOf(_0xa88254.currentTarget.defaultValue);
        if (t != -1) {
          groups[t].name = _0xa88254.currentTarget.value;
        }
      }, function (_0x574ab9, _0x1f0ce7) {
        logSQLError(str, _0x1f0ce7);
      });
    });
  });
  $(document).on('click', 'button.addGroup', function () {
    var _0x451c26 = prompt('Введите имя группы', 'Новая группа');
    if (_0x451c26 != null) {
      str = 'insert into "group" (name, sort, quantity, type, open)';
      str += ' values ("' + _0x451c26 + '", 0, 0, 0, 1)';
      db.transaction(function (_0x44eff2) {
        _0x44eff2.executeSql(str, [], function (_0x3fe25d, _0x37f960) {
          str = 'select id from "group" where name = "' + _0x451c26 + '"';
          db.transaction(function (_0x14e92d) {
            _0x14e92d.executeSql(str, [], function (_0x354c00, _0x301e61) {
              let _0x3b8287 = {};
              _0x3b8287.id = _0x301e61.rows[0].id;
              _0x3b8287.name = _0x451c26;
              _0x3b8287.open = 1;
              _0x3b8287.quantity = 0;
              _0x3b8287.order_percent = '';
              _0x3b8287.order_percent_cnt = '';
              _0x3b8287.order_max = '';
              _0x3b8287.on_sale_cnt = '';
              _0x3b8287.order_cnt = '';
              groups.push(_0x3b8287);
              groups.sort(function (_0x328adb, _0x5bb2b5) {
                var _0x2aaead = _0x328adb.name;
                var _0x4c729f = _0x5bb2b5.name;
                if (_0x328adb.name < _0x5bb2b5.name) {
                  return -1;
                }
                if (_0x328adb.name > _0x5bb2b5.name) {
                  return 1;
                }
                return 0;
              });
              let _0x50b125 = {};
              _0x50b125.group_id = _0x301e61.rows[0].id;
              _0x50b125.profitPercent = '';
              _0x50b125.minProfit = '';
              _0x50b125.profitPercent_min = '';
              _0x50b125.countDayHistoryGraph = '';
              _0x50b125.percentLimit = '';
              _0x50b125.algoritm = '';
              _0x50b125.algoritm_buy = '';
              _0x50b125.orderPercent = '';
              _0x50b125.ordersPlace = '';
              _0x50b125.cancelOrderIfLow = '';
              _0x50b125.dontDeleteOrders = '';
              _0x50b125.cntSalesMonth = '';
              _0x50b125.listingPlace = '';
              _0x50b125.monthTrend = '';
              _0x50b125.monthTrend_up = '';
              _0x50b125.weekTrend = '';
              _0x50b125.weekTrend_up = '';
              _0x50b125.dayTrend = '';
              _0x50b125.dayTrend_up = '';
              _0x50b125.settings_not_null = false;
              _0x50b125.alg_buy_qoeff = '';
              _0x50b125.alg_sell_qoeff = '';
              group_settings.push(_0x50b125);
              let _0x1e8547 = 'insert into group_settings (group_id)';
              _0x1e8547 += ' values (' + _0x50b125.group_id + ')';
              db.transaction(function (_0x2fafe2) {
                _0x2fafe2.executeSql(_0x1e8547, [], function () {
                }, function (_0x1d663d, _0x30e2f5) {
                  logSQLError(_0x1e8547, _0x30e2f5);
                });
              });
              _0x1177f8();
            }, function (_0x53a01d, _0x1ce9c4) {
              logSQLError(str, _0x1ce9c4);
            });
          });
        }, function (_0xdee31b, _0x38afb6) {
          logSQLError(str, _0x38afb6);
        });
      });
    }
  });
  $(document).on('click', 'button.group_settings', function (_0x3562f2) {
    current_group_edit_id = _0x3562f2.currentTarget.id;
    var _0x27ef5f = null;
    for (var _0x184733 = 0; _0x184733 < group_settings.length; _0x184733++) {
      if (group_settings[_0x184733].group_id == current_group_edit_id) {
        _0x27ef5f = _0x184733;
      }
    }
    if (_0x27ef5f == null) {
      var _0x2901d1 = {};
      _0x2901d1.group_id = current_group_edit_id;
      _0x2901d1.profitPercent = '';
      _0x2901d1.minProfit = '';
      _0x2901d1.profitPercent_min = '';
      _0x2901d1.countDayHistoryGraph = '';
      _0x2901d1.percentLimit = '';
      _0x2901d1.algoritm = '';
      _0x2901d1.algoritm_buy = '';
      _0x2901d1.orderPercent = '';
      _0x2901d1.ordersPlace = '';
      _0x2901d1.cancelOrderIfLow = '';
      _0x2901d1.dontDeleteOrders = '';
      _0x2901d1.cntSalesMonth = '';
      _0x2901d1.listingPlace = '';
      _0x2901d1.monthTrend = '';
      _0x2901d1.monthTrend_up = '';
      _0x2901d1.weekTrend = '';
      _0x2901d1.weekTrend_up = '';
      _0x2901d1.dayTrend = '';
      _0x2901d1.dayTrend_up = '';
      _0x2901d1.alg_buy_qoeff = '';
      _0x2901d1.alg_sell_qoeff = '';
      group_settings.push(_0x2901d1);
      _0x27ef5f = group_settings.length - 1;
      var _0x167129 = 'insert into group_settings (group_id)';
      _0x167129 += ' values (' + current_group_edit_id + ')';
      db.transaction(function (_0x1fa59f) {
        _0x1fa59f.executeSql(_0x167129, [], function () {
        }, function (_0x3cac5e, _0x2c9d7c) {
          logSQLError(_0x167129, _0x2c9d7c);
        });
      });
    }
    $('#group_profitPercent')[0].value = group_settings[_0x27ef5f].profitPercent;
    $('#group_minProfit')[0].value = group_settings[_0x27ef5f].minProfit;
    $('#group_profitPercent_min')[0].value = group_settings[_0x27ef5f].profitPercent_min;
    $('#group_countDayHistoryGraph')[0].value = group_settings[_0x27ef5f].countDayHistoryGraph;
    $('#group_percentLimit')[0].value = group_settings[_0x27ef5f].percentLimit;
    $('#group_algoritm')[0].value = group_settings[_0x27ef5f].algoritm;
    $('#group_algoritm_buy')[0].value = group_settings[_0x27ef5f].algoritm_buy;
    $('#group_orderPercent')[0].value = group_settings[_0x27ef5f].orderPercent;
    $('#group_ordersPlace')[0].value = group_settings[_0x27ef5f].ordersPlace;
    $('#group_cancelOrderIfLow')[0].checked = group_settings[_0x27ef5f].cancelOrderIfLow;
    $('#group_dontDeleteOrders')[0].checked = group_settings[_0x27ef5f].dontDeleteOrders;
    $('#group_cntSalesMonth')[0].value = group_settings[_0x27ef5f].cntSalesMonth;
    $('#group_listingPlace')[0].value = group_settings[_0x27ef5f].listingPlace;
    $('#group_monthTrend')[0].value = group_settings[_0x27ef5f].monthTrend;
    $('#group_monthTrend_up')[0].value = group_settings[_0x27ef5f].monthTrend_up;
    $('#group_weekTrend')[0].value = group_settings[_0x27ef5f].weekTrend;
    $('#group_weekTrend_up')[0].value = group_settings[_0x27ef5f].weekTrend_up;
    $('#group_dayTrend')[0].value = group_settings[_0x27ef5f].dayTrend;
    $('#group_dayTrend_up')[0].value = group_settings[_0x27ef5f].dayTrend_up;
    $('#groupSettings').show();
    $('#groupSettings')[0].hidden = false;
    $('#group_alg_sell_qoeff')[0].value = group_settings[_0x27ef5f].alg_sell_qoeff;
    $('#group_alg_buy_qoeff')[0].value = group_settings[_0x27ef5f].alg_buy_qoeff;
  });
  $(document).on('click', 'button#closeGroupSettings', function () {
    $('#groupSettings').hide();
  });
  $(document).on('click', 'button#deleteGroupSettings', function () {
    var _0x3e6ebe = null;
    for (var _0x21e8db = 0; _0x21e8db < group_settings.length; _0x21e8db++) {
      if (group_settings[_0x21e8db].group_id == current_group_edit_id) {
        _0x3e6ebe = _0x21e8db;
        break;
      }
    }
    group_settings[_0x3e6ebe].profitPercent = '';
    group_settings[_0x3e6ebe].minProfit = '';
    group_settings[_0x3e6ebe].profitPercent_min = '';
    group_settings[_0x3e6ebe].countDayHistoryGraph = '';
    group_settings[_0x3e6ebe].percentLimit = '';
    group_settings[_0x3e6ebe].algoritm = '';
    group_settings[_0x3e6ebe].algoritm_buy = '';
    group_settings[_0x3e6ebe].orderPercent = '';
    group_settings[_0x3e6ebe].ordersPlace = '';
    group_settings[_0x3e6ebe].cancelOrderIfLow = '';
    group_settings[_0x3e6ebe].dontDeleteOrders = '';
    group_settings[_0x3e6ebe].cntSalesMonth = '';
    group_settings[_0x3e6ebe].listingPlace = '';
    group_settings[_0x3e6ebe].monthTrend = '';
    group_settings[_0x3e6ebe].monthTrend_up = '';
    group_settings[_0x3e6ebe].weekTrend = '';
    group_settings[_0x3e6ebe].weekTrend_up = '';
    group_settings[_0x3e6ebe].dayTrend = '';
    group_settings[_0x3e6ebe].dayTrend_up = '';
    group_settings[_0x3e6ebe].alg_sell_qoeff = '';
    group_settings[_0x3e6ebe].alg_buy_qoeff = '';
    $('#group_profitPercent')[0].value = '';
    $('#group_minProfit')[0].value = '';
    $('#group_profitPercent_min')[0].value = '';
    $('#group_countDayHistoryGraph')[0].value = '';
    $('#group_percentLimit')[0].value = '';
    $('#group_algoritm')[0].value = '';
    $('#group_algoritm_buy')[0].value = '';
    $('#group_orderPercent')[0].value = '';
    $('#group_ordersPlace')[0].value = '';
    $('#group_cancelOrderIfLow')[0].value = '';
    $('#group_dontDeleteOrders')[0].value = '';
    $('#group_cntSalesMonth')[0].value = '';
    $('#group_listingPlace')[0].value = '';
    $('#group_monthTrend')[0].value = '';
    $('#group_monthTrend_up')[0].value = '';
    $('#group_weekTrend')[0].value = '';
    $('#group_weekTrend_up')[0].value = '';
    $('#group_dayTrend')[0].value = '';
    $('#group_dayTrend_up')[0].value = '';
    $('#group_alg_sell_qoeff')[0].value = '';
    $('#group_alg_buy_qoeff')[0].value = '';
    var _0xb45e98 = {};
    _0xb45e98.group_id = group_settings[_0x3e6ebe].group_id;
    _0xb45e98.profitPercent = '';
    _0xb45e98.minProfit = '';
    _0xb45e98.profitPercent_min = '';
    _0xb45e98.countDayHistoryGraph = '';
    _0xb45e98.percentLimit = '';
    _0xb45e98.algoritm = '';
    _0xb45e98.algoritm_buy = '';
    _0xb45e98.orderPercent = '';
    _0xb45e98.ordersPlace = '';
    _0xb45e98.cancelOrderIfLow = '';
    _0xb45e98.dontDeleteOrders = '';
    _0xb45e98.cntSalesMonth = '';
    _0xb45e98.listingPlace = '';
    _0xb45e98.monthTrend = '';
    _0xb45e98.monthTrend_up = '';
    _0xb45e98.weekTrend = '';
    _0xb45e98.weekTrend_up = '';
    _0xb45e98.dayTrend = '';
    _0xb45e98.dayTrend_up = '';
    items.forEach(_0x2b87ff => {
      if (_0x2b87ff.id_group = group_settings[_0x3e6ebe].group_id) {
        _0x2b87ff.group_settings = _0xb45e98;
      }
    });
    var _0xc88037 = 'update group_settings set p1 ="", p0="", p2="", p3="", profitPercent="", minProfit="", countDayHistoryGraph="", algoritm="", algoritm_buy="", percentLimit="", orderPercent="", ordersPlace="", cancelOrderIfLow="", cntSalesMonth="", listingPlace="", monthTrend="", monthTrend_up="", weekTrend="", weekTrend_up="", dayTrend="", dayTrend_up="" where group_id = ' + group_settings[_0x3e6ebe].group_id;
    db.transaction(function (_0x28db64) {
      _0x28db64.executeSql(_0xc88037, [], function () {
      }, function (_0x1a10af, _0x1f9b1b) {
        logSQLError(_0xc88037, _0x1f9b1b);
      });
    });
  });
  $(document).on('click', 'button#on_work_on', function () {
    table = document.getElementById('tableID');
    rowCount = table.rows.length;
    var _0x526930 = [];
    for (i = 0; i < rowCount; i++) {
      row = table.rows[i];
      chkbox = row.cells[1].childNodes[0];
      if (chkbox != null && chkbox.checked == true && row.className == 'item') {
        var _0x3091fb = {};
        _0x3091fb.name = items[row.id].name;
        _0x3091fb.appid = items[row.id].appid;
        _0x526930.push(_0x3091fb);
      }
    }
    turnItemOnWork(_0x526930, true, 0, '');
  });
  $(document).on('click', 'button#on_work_off', function () {
    table = document.getElementById('tableID');
    rowCount = table.rows.length;
    var _0x34aeea = [];
    for (i = 0; i < rowCount; i++) {
      row = table.rows[i];
      chkbox = row.cells[1].childNodes[0];
      if (chkbox != null && chkbox.checked == true && row.className == 'item') {
        var _0x441190 = {};
        _0x441190.name = items[row.id].name;
        _0x441190.appid = items[row.id].appid;
        _0x34aeea.push(_0x441190);
      }
    }
    turnItemOnWork(_0x34aeea, false, 0, '');
  });
  $(document).on('click', 'button#deleteOrders', function () {
    table = document.getElementById('tableID');
    rowCount = table.rows.length;
    var _0x35869e = [];
    for (i = 0; i < rowCount; i++) {
      row = table.rows[i];
      chkbox = row.cells[1].childNodes[0];
      if (chkbox != null && chkbox.checked == true && row.className == 'item' && items[row.id].buyorderid != 0) {
        let _0x1f1e1c = {};
        _0x1f1e1c.name = items[row.id].name;
        _0x1f1e1c.appid = items[row.id].appid;
        _0x1f1e1c.buyorderid = items[row.id].buyorderid;
        _0x1f1e1c.b_summ = items[row.id].b_summ;
        _0x35869e.push(_0x1f1e1c);
      }
    }
    cancelBuyOrder(_0x35869e, 0);
  });
  $(document).on('click', 'button#deleteOrdersByDate', function () {
    let _0x5ed712 = new Date();
    _0x5ed712 = String(_0x5ed712.getDate()).padStart(2, '0') + '.' + String(_0x5ed712.getMonth() + 1).padStart(2, '0') + '.' + _0x5ed712.getFullYear();
    _0x5ed712 = prompt('Введите дату начала удаления заказов', _0x5ed712);
    if (_0x5ed712 == null) {
      return;
    }
    _0x5ed712 = _0x5ed712.split('.');
    if (new Date(_0x5ed712[1] + '.' + _0x5ed712[0] + '.' + _0x5ed712[2]) == 'Invalid Date') {
      alert('Введена некорректная дата');
      return;
    }
    table = document.getElementById('tableID');
    rowCount = table.rows.length;
    var _0x48c0b4 = [];
    for (i = 0; i < rowCount; i++) {
      row = table.rows[i];
      chkbox = row.cells[1].childNodes[0];
      if (chkbox != null && chkbox.checked == true && row.className == 'item' && items[row.id].buyorderid != 0) {
        if (items[row.id].order_date >= '' + _0x5ed712[2] + _0x5ed712[1] + _0x5ed712[0]) {
          let _0x5b78a4 = {};
          _0x5b78a4.name = items[row.id].name;
          _0x5b78a4.buyorderid = items[row.id].buyorderid;
          _0x5b78a4.b_summ = items[row.id].b_summ;
          _0x48c0b4.push(_0x5b78a4);
        }
      }
    }
    if (_0x48c0b4.length > 0) {
      cancelBuyOrder(_0x48c0b4, 0);
    }
  });
  $(document).on('click', 'button#analyseFile', function () {
    if (document.getElementById('fileForAnalysis').value != '') {
      if (document.getElementById('appidForAnalysis').value != '') {
        var _0x4528e1 = new XMLHttpRequest();
        let _0x3c5331 = document.getElementById('fileForAnalysis').value;
        _0x3c5331 = _0x3c5331.substring(_0x3c5331.lastIndexOf('\\') + 1, _0x3c5331.length);
        _0x4528e1.open('GET', _0x3c5331, true);
        _0x4528e1.responseType = 'text';
        _0x4528e1.onload = function (_0x27996e) {
          var _0x3091ce = this.response.split('\n');
          let _0x40dc0f = [];
          createProgressBar('analyseFileBar', 'Загружаю информацию', _0x3091ce.length - 1);
          let _0xf24d37 = document.getElementById('appidForAnalysis').value;
          findItem_nameid(_0x3091ce, _0x40dc0f, 0, document.getElementById('appidForAnalysis').value);
        };
        _0x4528e1.send();
        _0x4528e1.onerror = function () {
          alert('Файл ' + _0x3c5331 + ' в папке с ботом не найден!');
        };
      } else {
        alert('Не указан appid игры для анализа!');
      }
    } else {
      alert('Не указан файл для анализа!');
    }
  });
  function findItem_nameid(_0x36557b, _0x4d561a, _0x2d1add, _0xbd4bfc) {
    if (_0x2d1add < _0x36557b.length) {
      updateProgressBar('analyseFileBar', _0x2d1add);
      var _0x2d9477 = items.map(function (_0x4e5fd6) {
        return _0x4e5fd6.appid + _0x4e5fd6.name;
      }).indexOf(_0xbd4bfc + _0x36557b[_0x2d1add].replace('\r', ''));
      if (_0x2d9477 == -1) {
        var _0x3ab265 = {};
        $.ajax({
          url: 'https://steamcommunity.com/market/listings/' + _0xbd4bfc + '/' + _0x36557b[_0x2d1add],
          dataType: 'html',
          type: 'get',
          async: true,
          cache: false,
          success: function (_0x37d4f0) {
            let _0x36611b;
            switch (_0xbd4bfc) {
              case 433850:
                _0x36611b = 1;
                break;
              case 322330:
                _0x36611b = 1;
                break;
              case 753:
                _0x36611b = 6;
                break;
              default:
                _0x36611b = 2;
                break;
            }
            _0x3ab265.name = _0x36557b[_0x2d1add].replace('\r', '');
            _0x3ab265.name_real = $(_0x37d4f0).find('span.market_listing_item_name')[0].innerText;
            _0x3ab265.item_nameid = Number(_0x37d4f0.substring(_0x37d4f0.search('Market_LoadOrderSpread') + 24, _0x37d4f0.search('PollOnUserActionAfterInterval') - 23));
            _0x3ab265.appid = _0xbd4bfc;
            _0x3ab265.b_summ = 0;
            _0x3ab265.s_summ = 0;
            _0x3ab265.s_summ_steam = 0;
            _0x3ab265.priceOnSale = '';
            _0x3ab265.min_float = 0;
            _0x3ab265.max_float = 1;
            _0x3ab265.b_cnt = 0;
            _0x3ab265.b_on = 0;
            _0x3ab265.s_on = 0;
            _0x3ab265.id_group = 0;
            _0x3ab265.name_group = 'Без группы';
            _0x3ab265.on_sale_cnt = 0;
            _0x3ab265.on_sale_cnt_stcrs = 0;
            _0x3ab265.order_cnt = 0;
            _0x3ab265.buyorderid = 0;
            _0x3ab265.priceHistory = null;
            _0x3ab265.order_date = '';
            _0x3ab265.resale_cnt = 0;
            _0x3ab265.removeIds = [];
            _0x3ab265.contextid = _0x36611b;
            _0x3ab265.cntSalesDay = '';
            var _0x537e60 = {};
            _0x537e60.profitPercent = '';
            _0x537e60.minProfit = '';
            _0x537e60.profitPercent_min = '';
            _0x537e60.alg_sell_qoeff = '';
            _0x537e60.alg_buy_qoeff = '';
            _0x537e60.countDayHistoryGraph = '';
            _0x537e60.percentLimit = '';
            _0x537e60.algoritm = '';
            _0x537e60.algoritm_buy = '';
            _0x537e60.orderPercent = '';
            _0x537e60.ordersPlace = '';
            _0x537e60.cancelOrderIfLow = '';
            _0x537e60.dontDeleteOrders = '';
            _0x537e60.cntSalesMonth = '';
            _0x537e60.listingPlace = '';
            _0x537e60.monthTrend = '';
            _0x537e60.monthTrend_up = '';
            _0x537e60.weekTrend = '';
            _0x537e60.weekTrend_up = '';
            _0x537e60.dayTrend = '';
            _0x537e60.dayTrend_up = '';
            _0x3ab265.group_settings = _0x537e60;
            if (_0x3ab265.name != '' && _0x3ab265.name_real != '' && isNaN(_0x3ab265.item_nameid) == false) {
              _0x4d561a.push(_0x3ab265);
            }
            log(_0x3ab265.name + ' загружен');
            setTimeout(function () {
              findItem_nameid(_0x36557b, _0x4d561a, _0x2d1add + 1, _0xbd4bfc);
            }, query_delay);
          },
          error: function (_0x4ed562) {
            log(_0x36557b[_0x2d1add] + 'STEAM ERROR: Ошибка загрузки');
            setTimeout(function () {
              findItem_nameid(_0x36557b, _0x4d561a, _0x2d1add + 1, _0xbd4bfc);
            }, query_delay);
            if (_0x4ed562.status == 429) {
              logMicroBan();
            }
          }
        });
      } else {
        findItem_nameid(_0x36557b, _0x4d561a, _0x2d1add + 1, _0xbd4bfc);
      }
    } else {
      deleteProgressBar('analyseFileBar');
      if (importFileWithNoAnalyse == true) {
        addItems(_0x4d561a, 0);
      } else {
        analyzeWorking = true;
        analyzeOrders(_0x4d561a, 0, 'a', 'button');
      }
    }
  }
  function addItems(_0x567f0f, _0x1c612f, _0x57c2ca) {
    if (_0x1c612f < _0x567f0f.length) {
      var _0x48e8df;
      switch (Number(_0x567f0f[_0x1c612f].appid)) {
        case 433850:
          _0x48e8df = 1;
          break;
        case 322330:
          _0x48e8df = 1;
          break;
        case 753:
          _0x48e8df = 6;
          break;
        default:
          _0x48e8df = 2;
          break;
      }
      let _0x281148 = _0x567f0f[_0x1c612f].id_group == undefined ? 0 : _0x567f0f[_0x1c612f].id_group;
      let _0x2f7d77 = _0x567f0f[_0x1c612f].min_float == undefined ? 0 : _0x567f0f[_0x1c612f].min_float;
      let _0x3353d9 = _0x567f0f[_0x1c612f].max_float == undefined ? 1 : _0x567f0f[_0x1c612f].max_float;
      let _0x2380d1 = _0x567f0f[_0x1c612f].url == undefined ? '' : _0x567f0f[_0x1c612f].url;
      let _0x25fae0 = _0x567f0f[_0x1c612f].b_cnt == undefined ? 0 : _0x567f0f[_0x1c612f].b_cnt;
      let _0x3e9eab = _0x567f0f[_0x1c612f].s_on == undefined ? 0 : _0x567f0f[_0x1c612f].s_on;
      let _0x5b6e34 = _0x567f0f[_0x1c612f].b_on == undefined ? 0 : _0x567f0f[_0x1c612f].b_on;
      let _0x4913d7 = _0x567f0f[_0x1c612f].b_summ == undefined ? 0 : _0x567f0f[_0x1c612f].b_summ;
      let _0x342ca0 = _0x567f0f[_0x1c612f].s_summ == undefined ? 0 : _0x567f0f[_0x1c612f].s_summ;
      let _0x4f147c = _0x567f0f[_0x1c612f].resale_cnt == undefined ? 0 : _0x567f0f[_0x1c612f].resale_cnt;
      var _0x4f1147 = 'insert into item (name, type, sort, url, market_hash_name, b_min, filter, item_nameid, buy_type, appid, contextid, id_group, b_cnt, b_summ, b_on, s_summ, s_on, publisher_fee_percent, min_float, max_float,resale_cnt)';
      _0x4f1147 += ' values ("' + _0x567f0f[_0x1c612f].name_real.replace('  ', ' ') + '", null, "", "' + _0x2380d1 + '", "' + _0x567f0f[_0x1c612f].name + '", 0, "", ' + _0x567f0f[_0x1c612f].item_nameid + ', ' + _0x48e8df + ', ' + _0x567f0f[_0x1c612f].appid + ', ' + _0x48e8df + ', ' + _0x281148 + ',' + _0x25fae0 + ',' + _0x4913d7 + ',' + _0x5b6e34 + ',' + _0x342ca0 + ',' + _0x3e9eab + ',10,' + _0x2f7d77 + ',' + _0x3353d9 + ',' + _0x4f147c + ')';
      db.transaction(function (_0x1af8e1) {
        _0x1af8e1.executeSql(_0x4f1147, [], function () {
          items.push(_0x567f0f[_0x1c612f]);
          setTimeout(function () {
            addItems(_0x567f0f, _0x1c612f + 1, _0x57c2ca);
          }, 0);
        }, function (_0x595045, _0x264d21) {
          logSQLError(_0x4f1147, _0x264d21);
          addItems(_0x567f0f, _0x1c612f + 1, _0x57c2ca);
        });
      });
    } else if (_0x57c2ca == 'STEparse') {
      var _0x21c07a = {};
      _0x21c07a.type = 'STEparse_ended';
      chrome.runtime.sendMessage(_0x21c07a);
      setTimeout(function () {
        chrome.tabs.reload(thisTabid);
      }, 2000);
    } else {
      _0x1177f8();
      log('Добавление завершено');
    }
  }
  $(document).on('click', 'button#clearLogs', function () {
    document.getElementById('log').innerHTML = '';
  });
  $(document).on('click', '.menu_bttn_wrapper', function () {
    $('html').toggleClass('open');
  });
  $(document).on('click', 'button#updateItemsPrices', function () {
    log('Начинаю пересчет');
    table = document.getElementById('tableID');
    rowCount = table.rows.length;
    var _0x2189d1 = [];
    for (i = 0; i < rowCount; i++) {
      row = table.rows[i];
      chkbox = row.cells[1].childNodes[0];
      if (chkbox != null && chkbox.checked == true) {
        if (row.className == 'item') {
          if (updateItemsPrices_settings) {
            if (items[row.id].on_sale_cnt == 0 && items[row.id].on_sale_cnt_stcrs == 0 && items[row.id].order_cnt == 0) {
              _0x2189d1.push(items[row.id]);
            }
          } else {
            _0x2189d1.push(items[row.id]);
          }
        }
      }
    }
    updateItemsPricesByAnalyzis(_0x2189d1, 0, 'button');
  });
  $(document).on('click', 'button#calc_cntSalesDay', function () {
    let _0x28125f = document.getElementById('tableID');
    let _0x510a55 = _0x28125f.rows.length;
    let _0x3b5e2e = [];
    for (i = 0; i < _0x28125f.rows.length; i++) {
      row = _0x28125f.rows[i];
      chkbox = row.cells[1].childNodes[0];
      if (chkbox != null && chkbox.checked == true) {
        if (row.className == 'item') {
          _0x3b5e2e.push(items[row.id]);
        }
      }
    }
    analyzeOrders(_0x3b5e2e, 0, 'a', 'calc_cntSalesDay');
  });
  $(document).on('click', 'button#calc_CurKoefOrder', function () {
    let _0x40f065 = document.getElementById('tableID');
    let _0x1a8f21 = _0x40f065.rows.length;
    let _0x35d01b = [];
    for (i = 0; i < _0x40f065.rows.length; i++) {
      row = _0x40f065.rows[i];
      chkbox = row.cells[1].childNodes[0];
      if (chkbox != null && chkbox.checked == true) {
        if (row.className == 'item') {
          items[row.id].calc_CurKoefOrder = '';
          if (items[row.id].order_cnt > 0) {
            _0x35d01b.push(items[row.id]);
          }
        }
      }
    }
    analyzeOrders(_0x35d01b, 0, 'a', 'calc_CurKoefOrder');
  });
  $(document).on('click', 'button#profit', function () {
    var _0x3c9488 = document.getElementById('profitDate').value;
    _0x3c9488 = Number('' + _0x3c9488.substring(0, 4) + _0x3c9488.substring(5, 7) + _0x3c9488.substring(8, 10));
    var _0x5bfe98 = [];
    profit(_0x3c9488, 0, true, _0x5bfe98);
  });
  $(document).on('click', 'button#addMissingItems', function () {
    getInventory('addMissingItems');
  });
  $(document).on('click', 'button#checkItems', function () {
    table = document.getElementById('tableID');
    rowCount = table.rows.length;
    var _0x20dff0 = false;
    for (i = 0; i < rowCount; i++) {
      row = table.rows[i];
      chkbox = row.cells[1].childNodes[0];
      if (_0x20dff0 == false && chkbox != null && chkbox.checked == true) {
        _0x20dff0 = true;
      } else if (_0x20dff0 == true && chkbox != null && chkbox.checked == false) {
        chkbox.checked = true;
        items[Number(row.id)].checked = true;
      } else if (_0x20dff0 == true && chkbox != null && chkbox.checked == true) {
        break;
      }
    }
    findCheckedItemsCnt();
  });
  $(document).on('click', 'button#filter_stickers_button', function () {
    $('#filter_stickers')[0].hidden = false;
  });
  $(document).on('click', 'button#filter_stickers_list_close', function () {
    $('#filter_stickers')[0].hidden = true;
  });
  $(document).on('click', 'button#enterSecrteKey', function () {
    asksecretkey();
  });
  $(document).on('change', 'textarea#filter_stickers_list', function (_0x429153) {
    var _0xb9e790 = _0x429153.currentTarget.value.split(';');
    var _0x387557 = 'delete from filterstickers';
    db.transaction(function (_0x3db1be) {
      _0x3db1be.executeSql('delete from filterstickers', [], function () {
        filter_stickers = [];
        SQL_add_filter_stickers(_0xb9e790, 0);
      }, function (_0xbfc894, _0x5c6646) {
        logSQLError('delete from filterstickers', _0x5c6646);
      });
    });
  });
  $(document).on('click', 'button#filter_stickers_list_clear', function () {
    var _0x574fbe = 'delete from filterstickers';
    db.transaction(function (_0x1d2100) {
      _0x1d2100.executeSql('delete from filterstickers', [], function () {
        $('#filter_stickers_list')[0].value = '';
      }, function (_0x3f20ac, _0x240eb7) {
        logSQLError('delete from filterstickers', _0x240eb7);
      });
    });
  });
  function addMissingItems(_0x44eb06) {
    importFileWithNoAnalyse = true;
    let _0x372c32 = [];
    let _0x139ebc = [];
    _0x44eb06.assets.forEach(_0x2ebe4a => {
      if (!_0x139ebc.includes(_0x2ebe4a.appid)) {
        _0x139ebc.push(_0x2ebe4a.appid);
      }
    });
    _0x44eb06.assets.forEach(_0x3453b4 => {
      let _0x2ba22f = _0x44eb06.descriptions.map(function (_0x3da969) {
        return _0x3da969.classid + _0x3da969.instanceid;
      }).indexOf(_0x3453b4.classid + _0x3453b4.instanceid);
      if (_0x2ba22f == -1) {
        log('>Блять пиздец не должно быть такой ошибки');
        return;
      } else {
        _0x3453b4.descriptions = _0x44eb06.descriptions[_0x2ba22f];
      }
      _0x2ba22f = items.map(function (_0x47e255) {
        return _0x47e255.appid + _0x47e255.name;
      }).indexOf(_0x3453b4.descriptions.appid + _0x3453b4.descriptions.market_hash_name);
      if (_0x2ba22f == -1) {
        _0x372c32.push(_0x3453b4);
      }
    });
    if (_0x372c32.length > 0) {
      _0x139ebc.forEach(_0x2fbb7d => {
        let _0x11d26b = [];
        _0x372c32.forEach(_0x54bb06 => {
          if (_0x54bb06.appid == _0x2fbb7d && _0x54bb06.descriptions.marketable) {
            if (!_0x11d26b.includes(_0x54bb06.descriptions.market_hash_name)) {
              _0x11d26b.push(_0x54bb06.descriptions.market_hash_name);
            }
          }
        });
        let _0x3561a2 = [];
        findItem_nameid(_0x11d26b, _0x3561a2, 0, _0x2fbb7d);
      });
    }
  }
  
  function openBotPage() {
    chrome.tabs.query({ url: this.location.origin + '/index.html' }, function (_0x5175be) {
      if (_0x5175be.length == 0) {
        chrome.tabs.create({
          active: false,
          url: this.location.origin + '/index.html'
        });
      } else {
        chrome.tabs.getCurrent(function _0x2f7ac5(_0x5766b8) {
          var _0x58bd31 = {};
          _0x58bd31.active = true;
          chrome.tabs.update(_0x5766b8.id, _0x58bd31, _0x2042e4 => {
          });
        });
      }
    });
  }
  openBotPage();
  
  $(document).on('click', 'button#regSteamid', function () {
    log('<a target="_blank" class="add-account-btn" href="">Привязать аккаунт</a>');
    $('.add-account-btn').attr('href', 'https://stetrade.ru/lk/accounts/?addAccount=true&accountName=' + accName + '&steamId=' + accID + '');
    log('Чтобы привязать ваш Steam аккаунт, нажмите на "Привязать аккаунт" ниже, а затем обновите эту страницу');
  });
  $(document).on('click', 'button#updateItemSellPricesByQoeff', function () {
    var _0xfae1cf = prompt('Введите коэффициент корректировки (число, на которое будет умножена цена продажи предмета)', '');
    if (_0xfae1cf == null || _0xfae1cf == '') {
      return;
    }
    log('Начинаю пересчет');
    table = document.getElementById('tableID');
    rowCount = table.rows.length;
    var _0x392256 = [];
    for (i = 0; i < rowCount; i++) {
      row = table.rows[i];
      chkbox = row.cells[1].childNodes[0];
      if (chkbox != null && chkbox.checked == true) {
        if (row.className == 'item') {
          items[row.id].s_summ = Math.round(items[row.id].s_summ * _0xfae1cf);
          _0x392256.push(items[row.id]);
        }
      }
    }
    updateItemsBuySellPrices(_0x392256, 0, 'refreshTable');
  });
  $(document).on('click', 'button#updateItemBuyPricesByQoeff', function () {
    var _0x3d0769 = prompt('Введите коэффициент корректировки (число, на которое будет умножена цена покупки предмета)', '');
    if (_0x3d0769 == null || _0x3d0769 == '') {
      return;
    }
    log('Начинаю пересчет');
    table = document.getElementById('tableID');
    rowCount = table.rows.length;
    var _0x2af0ed = [];
    for (i = 0; i < rowCount; i++) {
      row = table.rows[i];
      chkbox = row.cells[1].childNodes[0];
      if (chkbox != null && chkbox.checked == true) {
        if (row.className == 'item') {
          items[row.id].b_summ = Math.round(items[row.id].b_summ * _0x3d0769);
          _0x2af0ed.push(items[row.id]);
        }
      }
    }
    updateItemsBuySellPrices(_0x2af0ed, 0, 'refreshTable');
  });
  
  chrome.tabs.getCurrent(function _0x54c996(_0x5867c3) {
    var _0x9f0aee = {};
    _0x9f0aee.active = true;
    chrome.tabs.update(_0x5867c3.id, _0x9f0aee, _0x54d162 => {
    });
  });
  $(document).on('click', 'button#openParser', function () {
    var _0x69b6f8 = {};
    _0x69b6f8.url = 'parser.html';
    chrome.tabs.create(_0x69b6f8);
  });
  $(document).on('click', 'button#calc_cnt', function () {
    STEparse('calc_cnt');
  });
  $(document).on('click', 'button#save_to_file', function () {
    STEparse('save_to_file');
  });
  $(document).on('click', 'button#add_to_base', function () {
    STEparse('add_to_base');
  });
  function findCheckedItemsCnt() {
    let _0x51e9ec = document.getElementById('tableID');
    let _0x1f4d67 = 0;
    for (let _0x582b17 = 0; _0x582b17 < _0x51e9ec.rows.length; _0x582b17++) {
      let _0x3bd631 = _0x51e9ec.rows[_0x582b17];
      chkbox = _0x51e9ec.rows[_0x582b17].cells[1].childNodes[0];
      if (chkbox != null && chkbox.checked == true && _0x51e9ec.rows[_0x582b17].className == 'item') {
        _0x1f4d67++;
      }
    }
    if (_0x1f4d67 > 0) {
      $('#checkedItemsCnt')[0].hidden = false;
      $('#checkedItemsCnt')[0].innerText = 'Выделено: ' + _0x1f4d67;
    } else {
      $('#checkedItemsCnt')[0].hidden = true;
    }
  }
  $(document).on('click', 'button#exportSQLBase', function () {
    alert('В разработке');
    return;
    let _0x5032e7 = new XMLHttpRequest();
    _0x5032e7.open('GET', '/db/1', true);
    _0x5032e7.responseType = 'arraybuffer';
    _0x5032e7.onload = function (_0x2ce629) {
      let _0x3da9b5 = new Uint8Array(this.response);
      let _0x39e565 = new SQL.Database(_0x3da9b5);
      db.transaction(function (_0x5462f1) {
        let _0x4f2c69 = 'select * from item';
        _0x5462f1.executeSql(_0x4f2c69, [], function (_0x3a79ad, _0x46195d) {
          for (let _0x4278b2 = 0; _0x4278b2 < _0x46195d.rows.length; _0x4278b2++) {
            let _0x5f4067 = _0x46195d.rows.item(_0x4278b2);
            _0x4f2c69 = 'insert into item (name, type, sort, url, market_hash_name, b_min, filter, item_nameid, buy_type, appid, contextid, id_group, b_cnt, b_summ, b_on, s_summ, s_on, publisher_fee_percent, min_float, max_float, order_date, resale_cnt)';
            _0x4f2c69 += ' values ("' + _0x5f4067.name + '", "", "", "' + _0x5f4067.url + '", "' + _0x5f4067.market_hash_name + '", 0, "", "' + _0x5f4067.item_nameid + '", 2, ' + _0x5f4067.appid + ', 2, ' + _0x5f4067.id_group + ',' + _0x5f4067.b_cnt + ',' + _0x5f4067.b_summ + ',' + _0x5f4067.b_on + ',' + _0x5f4067.s_summ + ',' + _0x5f4067.s_on + ',10, ' + _0x5f4067.min_float + ',' + _0x5f4067.max_float + ',' + _0x5f4067.order_date + ',' + _0x5f4067.resale_cnt + ')';
            _0x39e565.run(_0x4f2c69);
          }
          db.transaction(function (_0x39c0e5) {
            _0x4f2c69 = 'select * from filterstickers';
            _0x39c0e5.executeSql(_0x4f2c69, [], function (_0x2270c9, _0x414b11) {
              for (let _0x5b78ca = 0; _0x5b78ca < _0x414b11.rows.length; _0x5b78ca++) {
                let _0x4d4319 = _0x414b11.rows.item(_0x5b78ca);
                _0x4f2c69 = 'insert into filterstickers (name)';
                _0x4f2c69 += ' values ("' + _0x4d4319.name + '")';
                _0x39e565.run(_0x4f2c69);
              }
              db.transaction(function (_0x19f1d1) {
                _0x4f2c69 = 'select * from `group`';
                _0x19f1d1.executeSql(_0x4f2c69, [], function (_0x477474, _0x2b3ca8) {
                  for (let _0x70fb0f = 0; _0x70fb0f < _0x2b3ca8.rows.length; _0x70fb0f++) {
                    let _0x474647 = _0x2b3ca8.rows.item(_0x70fb0f);
                    _0x4f2c69 = 'insert into `group` (id, name, sort, quantity, type, open, order_percent_cnt, order_percent, order_max)';
                    _0x4f2c69 += ' values ("' + _0x474647.id + '","' + _0x474647.name + '","' + _0x474647.sort + '","' + _0x474647.quantity + '","' + _0x474647.type + '","' + _0x474647.open + '","' + _0x474647.order_percent_cnt + '","' + _0x474647.order_percent + '","' + _0x474647.order_max + '")';
                    _0x39e565.run(_0x4f2c69);
                  }
                  db.transaction(function (_0x358d4a) {
                    _0x4f2c69 = 'select * from group_settings';
                    _0x358d4a.executeSql(_0x4f2c69, [], function (_0x3c3a42, _0x31f9cc) {
                      for (let _0x124ff3 = 0; _0x124ff3 < _0x31f9cc.rows.length; _0x124ff3++) {
                        let _0x6c4ace = _0x31f9cc.rows.item(_0x124ff3);
                        _0x4f2c69 = 'insert into group_settings (group_id, profitPercent, minProfit, countSalesHour, countDayHistoryGraph, percentLimit, algoritm, orderPercent, cntSalesMonth, listingPlace, monthTrend, weekTrend, dayTrend,p0,p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14, monthTrend_up, weekTrend_up, dayTrend_up,cancelOrderIfLow,algoritm_buy)';
                        _0x4f2c69 += ' values ("' + _0x6c4ace.group_id + '","' + _0x6c4ace.profitPercent + '","' + _0x6c4ace.minProfit + '","' + _0x6c4ace.countSalesHour + '","' + _0x6c4ace.countDayHistoryGraph + '","' + _0x6c4ace.percentLimit + '","' + _0x6c4ace.algoritm + '","' + _0x6c4ace.orderPercent + '","' + _0x6c4ace.cntSalesMonth + '","' + _0x6c4ace.listingPlace + '","' + _0x6c4ace.monthTrend + '","' + _0x6c4ace.weekTrend + '","' + _0x6c4ace.dayTrend + '","' + _0x6c4ace.p0 + '","' + _0x6c4ace.p1 + '","' + _0x6c4ace.p2 + '","' + _0x6c4ace.p3 + '","' + _0x6c4ace.p4 + '","' + _0x6c4ace.p5 + '","' + _0x6c4ace.p6 + '","' + _0x6c4ace.p7 + '","' + _0x6c4ace.p8 + '","' + _0x6c4ace.p9 + '","' + _0x6c4ace.p10 + '","' + _0x6c4ace.p11 + '","' + _0x6c4ace.p12 + '","' + _0x6c4ace.p13 + '",' + _0x6c4ace.p14 + ',"' + _0x6c4ace.monthTrend_up + '","' + _0x6c4ace.weekTrend_up + '","' + _0x6c4ace.dayTrend_up + '","' + _0x6c4ace.cancelOrderIfLow + '","' + _0x6c4ace.algoritm_buy + '")';
                        _0x39e565.run(_0x4f2c69);
                      }
                      db.transaction(function (_0x25cc53) {
                        _0x4f2c69 = 'select * from saleshistory';
                        _0x25cc53.executeSql(_0x4f2c69, [], function (_0x3b20f3, _0x163822) {
                          for (let _0x165a85 = 0; _0x165a85 < _0x163822.rows.length; _0x165a85++) {
                            let _0x2992e9 = _0x163822.rows.item(_0x165a85);
                            _0x4f2c69 = 'insert into saleshistory (game, date, name,type, price)';
                            _0x4f2c69 += ' values ("' + _0x2992e9.game + '","' + _0x2992e9.date + '","' + _0x2992e9.name + '","' + _0x2992e9.type + '","' + _0x2992e9.price + '")';
                            _0x39e565.run(_0x4f2c69);
                          }
                          db.transaction(function (_0x4685e4) {
                            _0x4f2c69 = 'select * from stats';
                            _0x4685e4.executeSql(_0x4f2c69, [], function (_0x5d9f62, _0x3b0809) {
                              for (let _0x208ed9 = 0; _0x208ed9 < _0x3b0809.rows.length; _0x208ed9++) {
                                let _0x24d0ad = _0x3b0809.rows.item(_0x208ed9);
                                _0x4f2c69 = 'insert into stats (date, balance, sumonsale)';
                                _0x4f2c69 += ' values ("' + _0x24d0ad.date + '","' + _0x24d0ad.balance + '","' + _0x24d0ad.sumonsale + '")';
                                _0x39e565.run(_0x4f2c69);
                              }
                              let _0x54e5f8 = _0x39e565.export();
                              const _0x565e79 = document.createElement('a');
                              _0x565e79.style.display = 'none';
                              document.body.appendChild(_0x565e79);
                              var _0x2b4cb8 = {};
                              _0x2b4cb8.type = 'application/octet-stream';
                              const _0x4faf72 = new Blob([_0x54e5f8], _0x2b4cb8);
                              const _0x11864a = URL.createObjectURL(_0x4faf72);
                              _0x565e79.href = _0x11864a;
                              _0x565e79.href = URL.createObjectURL(_0x4faf72);
                              _0x565e79.download = '1';
                              _0x565e79.click();
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    };
    _0x5032e7.send();
  });
  $(document).on('click', 'button#exportSetting', function () {
    let _0x5eafc6 = {};
    _0x5eafc6.autoStart = autoStart;
    _0x5eafc6.countDayHistoryGraph = countDayHistoryGraph;
    _0x5eafc6.percentLimit = percentLimit;
    _0x5eafc6.profitPercent = profitPercent;
    _0x5eafc6.minProfit = minProfit;
    _0x5eafc6.profitPercent_min = profitPercent_min;
    _0x5eafc6.checkLowProfitTime = checkLowProfitTime;
    _0x5eafc6.turnAllOrdersOnTime = turnAllOrdersOnTime;
    _0x5eafc6.cntSalesMonth = cntSalesMonth;
    _0x5eafc6.algoritm = algoritm;
    _0x5eafc6.algoritm_buy = algoritm_buy;
    _0x5eafc6.ordersPlace = ordersPlace;
    _0x5eafc6.cancelOrderIfLow = cancelOrderIfLow;
    _0x5eafc6.listingPlace = listingPlace;
    _0x5eafc6.monthTrend = monthTrend;
    _0x5eafc6.monthTrend_up = monthTrend_up;
    _0x5eafc6.weekTrend = weekTrend;
    _0x5eafc6.weekTrend_up = weekTrend_up;
    _0x5eafc6.dayTrend = dayTrend;
    _0x5eafc6.dayTrend_up = dayTrend_up;
    _0x5eafc6.telegram_update_id = telegram_update_id;
    _0x5eafc6.telegram_chat_id = telegram_chat_id;
    _0x5eafc6.telegram_alert_logout = telegram_alert_logout;
    _0x5eafc6.telegram_alert_login = telegram_alert_login;
    _0x5eafc6.telegram_alert_SlivBalance = telegram_alert_SlivBalance;
    _0x5eafc6.telegram_alert_filterstickers = telegram_alert_filterstickers;
    _0x5eafc6.telegram_alert_filterfloat = telegram_alert_filterfloat;
    _0x5eafc6.telegram_alert_stickersprice = telegram_alert_stickersprice;
    _0x5eafc6.telegram_alert_stickersstreak = telegram_alert_stickersstreak;
    _0x5eafc6.query_delay = query_delay;
    _0x5eafc6.itemsOnSaleRefreshTime = itemsOnSaleRefreshTime;
    _0x5eafc6.sellInventoryRefreshTime = sellInventoryRefreshTime;
    _0x5eafc6.getOrdersRefreshTime = getOrdersRefreshTime;
    _0x5eafc6.sticker_overprice = sticker_overprice;
    _0x5eafc6.sticker_percent = sticker_percent;
    _0x5eafc6.sellWithStickers = sellWithStickers;
    _0x5eafc6.logs_info = logs_info;
    _0x5eafc6.autoIncOrders = autoIncOrders;
    _0x5eafc6.autologInSteamAcc = autologInSteamAcc;
    _0x5eafc6.checkSDASettings = checkSDASettings;
    _0x5eafc6.checkActualPrices = checkActualPrices;
    _0x5eafc6.removeFromSaleDays_skipWithStickers = removeFromSaleDays_skipWithStickers;
    _0x5eafc6.removeFromSaleDays_ignoreOrders = removeFromSaleDays_ignoreOrders;
    _0x5eafc6.ignoreMissing = ignoreMissing;
    _0x5eafc6.dontSelTradable = dontSelTradable;
    _0x5eafc6.checkHistogramBeforeBuy = checkHistogramBeforeBuy;
    _0x5eafc6.checkHistogramBeforeSell = checkHistogramBeforeSell;
    _0x5eafc6.AOSettings = AOSettings;
    _0x5eafc6.removeFromSaleIfKonkurent = removeFromSaleIfKonkurent;
    _0x5eafc6.removeFromSaleDays = removeFromSaleDays;
    _0x5eafc6.orderPercent = orderPercent;
    _0x5eafc6.checkFloat = checkFloat;
    _0x5eafc6.hourForStats = hourForStats;
    _0x5eafc6.percentSlivBalance = percentSlivBalance;
    _0x5eafc6.alert_onsale_cnt = alert_onsale_cnt;
    _0x5eafc6.max_cnt_items_for_orders = max_cnt_items_for_orders;
    _0x5eafc6.telegramThisIsMain = telegramThisIsMain;
    _0x5eafc6.checkLowProfitDeleteOrderAlgoritm = checkLowProfitDeleteOrderAlgoritm;
    _0x5eafc6.checkLowProfitUpdatePriceAlgoritm = checkLowProfitUpdatePriceAlgoritm;
    _0x5eafc6.alg_sell_qoeff = alg_sell_qoeff;
    _0x5eafc6.alg_buy_qoeff = alg_buy_qoeff;
    _0x5eafc6.placeMoreThen1000orders = placeMoreThen1000orders;
    _0x5eafc6.dont_sell_if_stickers_price = dont_sell_if_stickers_price;
    _0x5eafc6.dont_sell_if_stickers_streak = dont_sell_if_stickers_streak;
    _0x5eafc6.server = server;
    _0x5eafc6.perenos_v_osn_group = perenos_v_osn_group;
    _0x5eafc6.perenos_v_temp_group = perenos_v_temp_group;
    _0x5eafc6.group_percent = group_percent;
    _0x5eafc6.group_temp = group_temp;
    _0x5eafc6.cnt_for_move_to_osn_group = cnt_for_move_to_osn_group;
    _0x5eafc6.theme = localStorage.getItem('theme');
    _0x5eafc6.listingPlace_use_percent = listingPlace_use_percent;
    _0x5eafc6.showItemsCntSalesDay = showItemsCntSalesDay;
    _0x5eafc6.showItemsCurProfitPercent = showItemsCurProfitPercent;
    _0x5eafc6.showItemsCurKoefOrder = showItemsCurKoefOrder;
    _0x5eafc6 = JSON.stringify(_0x5eafc6, null, 2);
    const _0x192872 = document.createElement('a');
    _0x192872.style.display = 'none';
    document.body.appendChild(_0x192872);
    var _0x3a8cf1 = {};
    _0x3a8cf1.type = 'application/octet-stream';
    const _0x4ead71 = new Blob([_0x5eafc6], _0x3a8cf1);
    const _0x436255 = URL.createObjectURL(_0x4ead71);
    _0x192872.href = _0x436255;
    _0x192872.href = URL.createObjectURL(_0x4ead71);
    _0x192872.download = 'config.json';
    _0x192872.click();
  });
  $(document).on('click', 'button#importSetting', function () {
    let _0xb51d42 = new XMLHttpRequest();
    let _0x249390 = 'config.json';
    _0x249390 = _0x249390.substring(_0x249390.lastIndexOf('\\') + 1, _0x249390.length);
    _0xb51d42.open('GET', _0x249390, true);
    _0xb51d42.responseType = 'json';
    _0xb51d42.onload = function (_0x2d26b7) {
      let _0x350eac = this.response;
      for (let _0x282667 in this.response) {
        let _0x2467c3 = {};
        _0x2467c3.name = _0x282667;
        _0x2467c3.value = this.response[_0x282667];
        _0x2467c3.checked = this.response[_0x282667];
        changeSetting(_0x2467c3, 'importSetting');
      }
      chrome.tabs.reload();
    };
    _0xb51d42.send();
    _0xb51d42.onerror = function () {
      alert('Файл ' + _0x249390 + ' в папке с ботом не найден!');
    };
  });
  $(document).on('click', 'button#getExchangeRates', function () {
    $.ajax({
      url: servers[server] + '/exchangeRates.php',
      type: 'post',
      dataType: 'json',
      cache: false,
      success: function (_0x235bb3) {
        _0x235bb3 = JSON.parse(_0x235bb3.rates);
        let _0x59d249 = [];
        for (let _0x3452e3 in _0x2daec8) {
          let _0x3020cc = {};
          _0x3020cc.id = _0x3452e3;
          _0x3020cc.code = _0x2daec8[_0x3452e3];
          _0x3020cc.name = _0x46f474[_0x2daec8[_0x3452e3]].long;
          _0x3020cc.value = round(_0x235bb3[_0x3020cc.code]);
          _0x59d249.push(_0x3020cc);
        }
        let _0x290eee = '';
        _0x290eee += '<table><tr><td>id</td><td>Код</td><td>Название</td><td>Значение</td></tr>';
        for (let _0x190396 = 0; _0x190396 < _0x59d249.length; _0x190396++) {
          _0x290eee += '<tr>';
          _0x290eee += '<td>' + _0x59d249[_0x190396].id + '</td><td>' + _0x59d249[_0x190396].code + '</td><td>' + _0x59d249[_0x190396].name + '</td><td>' + _0x59d249[_0x190396].value + '</td>';
          _0x290eee += '</tr>';
        }
        _0x290eee += '</table>';
        document.getElementById('report').innerHTML = _0x290eee;
      },
      error: function () {
      }
    });
  });
  $(document).on('click', 'button#openReports', function (_0x1ac5f9) {
    var _0x2a07ea = {};
    _0x2a07ea.url = 'reports.html';
    chrome.tabs.create(_0x2a07ea);
  });
  $(document).on('click', 'button#loadHistoryToSQL', function () {
    document.getElementById('report').innerHTML = 'Начинаю загрузку';
    var _0x5c0324;
    var _0x5bf93e;
    _0x5c0324 = document.getElementById('dateReportStart').value;
    _0x5c0324 = _0x5c0324.substring(0, 4) + _0x5c0324.substring(5, 7) + _0x5c0324.substring(8, 10);
    _0x5bf93e = document.getElementById('dateReportEnd').value;
    _0x5bf93e = _0x5bf93e.substring(0, 4) + _0x5bf93e.substring(5, 7) + _0x5bf93e.substring(8, 10);
    var _0xd3d1eb = 'select listingid from saleshistory where date >= ' + _0x5c0324 + ' and date <= ' + _0x5bf93e;
    db.transaction(function (_0xe1fe4c) {
      _0xe1fe4c.executeSql(_0xd3d1eb, [], function (_0x2c1e40, _0x3e698e) {
        let _0x2332af = new Set();
        for (var _0x36b191 = 0; _0x36b191 < _0x3e698e.rows.length; _0x36b191++) {
          _0x2332af.add(_0x3e698e.rows[_0x36b191].listingid);
        }
        var _0x5faad7 = [];
        loadHistoryToSQL(_0x5c0324, _0x5bf93e, 0, true, _0x2332af, _0x5faad7);
      }, function (_0x56bd34, _0x427845) {
        logSQLError(_0xd3d1eb, _0x427845);
      });
    });
  });
  $(document).on('click', 'button#runSqlQuery', function () {
    runSqlQuery();
  });
  $(document).on('click', 'button#clearHistorySQL', function () {
    clearHistorySQL();
  });
  $(document).on('click', 'button#deleteStats', function () {
    let _0x37c33e = confirm('Удалить всю статистику?');
    if (!_0x37c33e) {
      return;
    }
    let _0x50cf55 = 'delete from stats';
    db.transaction(function (_0x5e8e97) {
      _0x5e8e97.executeSql('delete from stats', [], function (_0x3ecad4, _0x2b4819) {
        document.getElementById('report').innerHTML = 'успешное удаление';
      }, function (_0x1ec8c6, _0x2091ae) {
        document.getElementById('report').innerHTML = _0x2091ae.message;
      });
    });
  });
  $(document).on('click', 'button#reportHistory', function () {
    var _0x3e258f;
    var _0x2285ff;
    _0x3e258f = document.getElementById('dateReportStart').value;
    _0x3e258f = _0x3e258f.substring(0, 4) + _0x3e258f.substring(5, 7) + _0x3e258f.substring(8, 10);
    _0x2285ff = document.getElementById('dateReportEnd').value;
    _0x2285ff = _0x2285ff.substring(0, 4) + _0x2285ff.substring(5, 7) + _0x2285ff.substring(8, 10);
    var _0x275930 = 'select * from saleshistory where date >= ' + _0x3e258f + ' and date <= ' + _0x2285ff + ' order by date';
    db.transaction(function (_0x520ad4) {
      _0x520ad4.executeSql(_0x275930, [], function (_0x580b33, _0x5018df) {
        var _0x3a250c = '<table>';
        arr = _0x5018df.rows;
        for (var _0x5aa48f = 0; _0x5aa48f < arr.length; _0x5aa48f++) {
          _0x3a250c += '<tr>';
          for (key in arr[_0x5aa48f]) {
            _0x3a250c += '<td>';
            _0x3a250c += arr[_0x5aa48f][key];
            _0x3a250c += '</td>';
          }
          _0x3a250c += '</tr>';
        }
        _0x3a250c += '</table>';
        document.getElementById('report').innerHTML = _0x3a250c;
      }, function (_0xbe10e8, _0x434371) {
        document.getElementById('report').innerHTML = _0x434371.message;
      });
    });
  });
  $(document).on('click', 'button#reportStatsAllDays', function () {
    let _0x195056 = $('#dateReportStart')[0].value.substring(0, 4) + $('#dateReportStart')[0].value.substring(5, 7) + $('#dateReportStart')[0].value.substring(8, 10) + '00';
    let _0x1f39dc = $('#dateReportEnd')[0].value.substring(0, 4) + $('#dateReportEnd')[0].value.substring(5, 7) + $('#dateReportEnd')[0].value.substring(8, 10) + '23';
    var _0x442001 = 'select * from stats where date <= ' + _0x1f39dc + ' and date >= ' + _0x195056;
    db.transaction(function (_0x59e096) {
      _0x59e096.executeSql(_0x442001, [], function (_0x46f0bc, _0xe21466) {
        let _0x19513f = [];
        for (let _0x259d61 = 0; _0x259d61 < _0xe21466.rows.length; _0x259d61++) {
          _0x19513f.push(_0xe21466.rows[_0x259d61]);
        }
        for (let _0x50640d = 0; _0x50640d < _0x19513f.length; _0x50640d++) {
          if (_0x19513f[_0x50640d].date < 100000000) {
            _0x19513f[_0x50640d].date = Number(_0x19513f[_0x50640d].date + hourForStats);
          }
        }
        var _0x4ac1f4 = '<style type="text/css">';
        let _0x39357f = 'white';
        if (localStorage.getItem('theme') == 'Steam') {
          _0x39357f = '#252734';
        }
        let _0x270674 = 1;
        let _0x140a48 = 1;
        for (var _0x1d4e21 = 0; _0x1d4e21 < _0x19513f.length; _0x1d4e21++) {
          let _0x24cd5b = round(_0x19513f[_0x1d4e21].balance * 100 / (_0x19513f[_0x1d4e21].balance + _0x19513f[_0x1d4e21].sumonsale));
          _0x4ac1f4 += 'td.balance' + _0x1d4e21 + '{ background: linear-gradient(to right, rgba(35, 190, 81, 0.15) ' + _0x24cd5b + '%, ' + _0x39357f + ' ' + _0x24cd5b + '%);}';
          _0x24cd5b = round(_0x19513f[_0x1d4e21].sumonsale * 100 / (_0x19513f[_0x1d4e21].balance + _0x19513f[_0x1d4e21].sumonsale));
          _0x4ac1f4 += 'td.sumonsale' + _0x1d4e21 + '{ background: linear-gradient(to left, rgba(35, 190, 81, 0.15) ' + _0x24cd5b + '%, ' + _0x39357f + ' ' + _0x24cd5b + '%);}';
          let _0x2c3695 = round((_0x19513f[_0x1d4e21].balance + _0x19513f[_0x1d4e21].sumonsale - _0x140a48) * 100 / _0x140a48);
          let _0x9ea69a;
          let _0x54952a;
          let _0x15d532;
          let _0xa9bfd0;
          if (_0x1d4e21 != 0) {
            if (String(_0x19513f[_0x1d4e21].date).substr(8, 2) == hourForStats) {
              if (_0x2c3695 <= -0.5) {
                _0x4ac1f4 += 'td.percentProfit' + _0x1d4e21 + '{ background: rgb(255, 13, 48, 0.27)}';
              } else if (_0x2c3695 <= 0) {
                _0x9ea69a = -_0x2c3695 * 100 / 0.5;
                _0x54952a = 255 - 7 * _0x9ea69a / 100;
                _0x15d532 = 235 - 130 * _0x9ea69a / 100;
                _0xa9bfd0 = 132 - 25 * _0x9ea69a / 100;
                _0x4ac1f4 += 'td.percentProfit' + _0x1d4e21 + '{ background: rgb(' + _0x54952a + ', ' + _0x15d532 + ', ' + _0xa9bfd0 + ')}';
              } else if (_0x2c3695 <= 1) {
                _0x9ea69a = _0x2c3695 * 100 / 1;
                _0x54952a = 255 - 156 * _0x9ea69a / 100;
                _0x15d532 = 235 - 45 * _0x9ea69a / 100;
                _0xa9bfd0 = 132 + 9 * _0x9ea69a / 100;
                _0x4ac1f4 += 'td.percentProfit' + _0x1d4e21 + '{ background: rgb(' + _0x54952a + ', ' + _0x15d532 + ', ' + _0xa9bfd0 + ')}';
              } else {
                _0x4ac1f4 += 'td.percentProfit' + _0x1d4e21 + '{ background: rgb(15, 179, 100, 0.27)}';
              }
            }
          }
          _0x270674 = _0x19513f[_0x1d4e21].balance + _0x19513f[_0x1d4e21].sumonsale;
          if (String(_0x19513f[_0x1d4e21].date).substr(8, 2) == hourForStats) {
            _0x140a48 = _0x19513f[_0x1d4e21].balance + _0x19513f[_0x1d4e21].sumonsale;
          }
        }
        _0x4ac1f4 += '</style>';
        _0x4ac1f4 += '<table border="1" cellspacing="10"><tr><td>Дата</td><td>Баланс</td><td>На продаже</td><td>Сумма</td><td>Профит</td><td>Процент профита</td></tr>';
        _0x270674 = 1;
        _0x140a48 = 1;
        for (var _0x1d4e21 = 0; _0x1d4e21 < _0x19513f.length; _0x1d4e21++) {
          if (String(_0x19513f[_0x1d4e21].date).substr(8, 2) == hourForStats) {
            _0x4ac1f4 += '<tr class="day">';
          } else {
            _0x4ac1f4 += '<tr>';
          }
          let _0x875d25 = _0x19513f[_0x1d4e21].date.toString();
          _0x4ac1f4 += '<td>' + _0x875d25.substring(0, 4) + '-' + _0x875d25.substring(4, 6) + '-' + _0x875d25.substring(6, 8) + ' ' + _0x875d25.substring(8, 10) + ':00</td>';
          _0x4ac1f4 += '<td class="balance' + _0x1d4e21 + '">' + format(_0x19513f[_0x1d4e21].balance) + '</td>';
          _0x4ac1f4 += '<td class="sumonsale' + _0x1d4e21 + '">' + format(_0x19513f[_0x1d4e21].sumonsale) + '</td>';
          _0x4ac1f4 += '<td>' + format(_0x19513f[_0x1d4e21].balance + _0x19513f[_0x1d4e21].sumonsale) + '</td>';
          if (_0x1d4e21 != 0) {
            if (String(_0x19513f[_0x1d4e21].date).substr(8, 2) == hourForStats) {
              _0x4ac1f4 += '<td>' + format(_0x19513f[_0x1d4e21].balance + _0x19513f[_0x1d4e21].sumonsale - _0x140a48) + '</td>';
              _0x4ac1f4 += '<td class="percentProfit' + _0x1d4e21 + '">' + format((_0x19513f[_0x1d4e21].balance + _0x19513f[_0x1d4e21].sumonsale - _0x140a48) * 100 / _0x140a48) + '</td>';
            } else {
              _0x4ac1f4 += '<td>' + format(_0x19513f[_0x1d4e21].balance + _0x19513f[_0x1d4e21].sumonsale - _0x270674) + '</td>';
              _0x4ac1f4 += '<td class="percentProfit' + _0x1d4e21 + '">' + format((_0x19513f[_0x1d4e21].balance + _0x19513f[_0x1d4e21].sumonsale - _0x270674) * 100 / _0x270674) + '</td>';
            }
          } else {
            _0x4ac1f4 += '<td></td><td></td>';
          }
          _0x270674 = _0x19513f[_0x1d4e21].balance + _0x19513f[_0x1d4e21].sumonsale;
          if (String(_0x19513f[_0x1d4e21].date).substr(8, 2) == hourForStats) {
            _0x140a48 = _0x19513f[_0x1d4e21].balance + _0x19513f[_0x1d4e21].sumonsale;
          }
          _0x4ac1f4 += '</tr>';
        }
        _0x4ac1f4 += '</table>';
        document.getElementById('report').innerHTML = _0x4ac1f4;
      }, function (_0x25f923, _0x241e6e) {
        document.getElementById('report').innerHTML = _0x241e6e.message;
      });
    });
  });
  $(document).on('click', 'button#reportStatsDays', function () {
    let _0x2e9efd = $('#dateReportStart')[0].value.substring(0, 4) + $('#dateReportStart')[0].value.substring(5, 7) + $('#dateReportStart')[0].value.substring(8, 10) + '00';
    let _0x31ada1 = $('#dateReportEnd')[0].value.substring(0, 4) + $('#dateReportEnd')[0].value.substring(5, 7) + $('#dateReportEnd')[0].value.substring(8, 10) + '23';
    var _0x8e5d6b = 'select * from stats where date <= ' + _0x31ada1 + ' and date >= ' + _0x2e9efd;
    db.transaction(function (_0x5b881c) {
      _0x5b881c.executeSql(_0x8e5d6b, [], function (_0x2bf77f, _0x3a2ead) {
        let _0x3a2281 = [];
        for (let _0x1b366a = 0; _0x1b366a < _0x3a2ead.rows.length; _0x1b366a++) {
          _0x3a2281.push(_0x3a2ead.rows[_0x1b366a]);
        }
        for (let _0x347e18 = 0; _0x347e18 < _0x3a2281.length; _0x347e18++) {
          if (_0x3a2281[_0x347e18].date < 100000000) {
            _0x3a2281[_0x347e18].date = Number(_0x3a2281[_0x347e18].date + hourForStats);
          }
        }
        let _0x402347 = [];
        for (let _0x3b6654 = 0; _0x3b6654 < _0x3a2281.length; _0x3b6654++) {
          if (String(_0x3a2281[_0x3b6654].date).substr(8, 2) == hourForStats) {
            _0x402347.push(_0x3a2281[_0x3b6654]);
          }
        }
        _0x3a2281 = _0x402347;
        var _0x11cae4 = '<style type="text/css">';
        let _0x2704fa = 1;
        for (var _0x59d76a = 0; _0x59d76a < _0x3a2281.length; _0x59d76a++) {
          let _0x232666 = round(_0x3a2281[_0x59d76a].balance * 100 / (_0x3a2281[_0x59d76a].balance + _0x3a2281[_0x59d76a].sumonsale));
          let _0x1e6548 = 'white';
          if (localStorage.getItem('theme') == 'Steam') {
            _0x1e6548 = '#252734';
          }
          _0x11cae4 += 'td.balance' + _0x59d76a + '{ background: linear-gradient(to right, rgba(35, 190, 81, 0.15) ' + _0x232666 + '%, ' + _0x1e6548 + ' ' + _0x232666 + '%);}';
          _0x232666 = round(_0x3a2281[_0x59d76a].sumonsale * 100 / (_0x3a2281[_0x59d76a].balance + _0x3a2281[_0x59d76a].sumonsale));
          _0x11cae4 += 'td.sumonsale' + _0x59d76a + '{ background: linear-gradient(to left, rgba(35, 190, 81, 0.15) ' + _0x232666 + '%, ' + _0x1e6548 + ' ' + _0x232666 + '%);}';
          let _0x5cc1bf = round((_0x3a2281[_0x59d76a].balance + _0x3a2281[_0x59d76a].sumonsale - _0x2704fa) * 100 / _0x2704fa);
          let _0x3c7b87;
          let _0x1f4bfa;
          let _0x21ff87;
          let _0x2640bd;
          if (_0x59d76a != 0) {
            if (_0x5cc1bf <= -0.5) {
              _0x11cae4 += 'td.percentProfit' + _0x59d76a + '{ background: rgb(255, 13, 48, 0.27)}';
            } else if (_0x5cc1bf <= 0) {
              _0x3c7b87 = -_0x5cc1bf * 100 / 0.5;
              _0x1f4bfa = 255 - 7 * _0x3c7b87 / 100;
              _0x21ff87 = 235 - 130 * _0x3c7b87 / 100;
              _0x2640bd = 132 - 25 * _0x3c7b87 / 100;
              _0x11cae4 += 'td.percentProfit' + _0x59d76a + '{ background: rgb(' + _0x1f4bfa + ', ' + _0x21ff87 + ', ' + _0x2640bd + ')}';
            } else if (_0x5cc1bf <= 1) {
              _0x3c7b87 = _0x5cc1bf * 100 / 1;
              _0x1f4bfa = 255 - 156 * _0x3c7b87 / 100;
              _0x21ff87 = 235 - 45 * _0x3c7b87 / 100;
              _0x2640bd = 132 + 9 * _0x3c7b87 / 100;
              _0x11cae4 += 'td.percentProfit' + _0x59d76a + '{ background: rgb(' + _0x1f4bfa + ', ' + _0x21ff87 + ', ' + _0x2640bd + ')}';
            } else {
              _0x11cae4 += 'td.percentProfit' + _0x59d76a + '{ background: rgb(15, 179, 100, 0.27)}';
            }
          }
          _0x2704fa = _0x3a2281[_0x59d76a].balance + _0x3a2281[_0x59d76a].sumonsale;
        }
        _0x11cae4 += '</style>';
        _0x11cae4 += '<table><tr><td>Дата</td><td>Баланс</td><td>На продаже</td><td>Сумма</td><td>Профит</td><td>Процент профита</td></tr>';
        _0x2704fa = 1;
        for (var _0x59d76a = 0; _0x59d76a < _0x3a2281.length; _0x59d76a++) {
          _0x11cae4 += '<tr>';
          let _0x1ce109 = _0x3a2281[_0x59d76a].date.toString();
          _0x11cae4 += '<td>' + _0x1ce109.substring(0, 4) + '-' + _0x1ce109.substring(4, 6) + '-' + _0x1ce109.substring(6, 8) + '</td>';
          _0x11cae4 += '<td class="balance' + _0x59d76a + '">' + format(_0x3a2281[_0x59d76a].balance) + '</td>';
          _0x11cae4 += '<td class="sumonsale' + _0x59d76a + '">' + format(_0x3a2281[_0x59d76a].sumonsale) + '</td>';
          _0x11cae4 += '<td>' + format(_0x3a2281[_0x59d76a].balance + _0x3a2281[_0x59d76a].sumonsale) + '</td>';
          if (_0x59d76a != 0) {
            if (_0x3a2281[_0x59d76a].balance + _0x3a2281[_0x59d76a].sumonsale - _0x2704fa > 0) {
              _0x11cae4 += '<td class="report_profit_green">';
            } else {
              _0x11cae4 += '<td class="report_profit_red">';
            }
            _0x11cae4 += format(_0x3a2281[_0x59d76a].balance + _0x3a2281[_0x59d76a].sumonsale - _0x2704fa) + '</td>';
            _0x11cae4 += '<td class="percentProfit' + _0x59d76a + '">' + format((_0x3a2281[_0x59d76a].balance + _0x3a2281[_0x59d76a].sumonsale - _0x2704fa) * 100 / _0x2704fa) + '</td>';
          } else {
            _0x11cae4 += '<td></td><td></td>';
          }
          _0x2704fa = _0x3a2281[_0x59d76a].balance + _0x3a2281[_0x59d76a].sumonsale;
          _0x11cae4 += '</tr>';
        }
        _0x11cae4 += '</table>';
        document.getElementById('report').innerHTML = _0x11cae4;
      }, function (_0x2547d7, _0x3880fc) {
        document.getElementById('report').innerHTML = _0x3880fc.message;
      });
    });
  });
  $(document).on('click', 'button#reportStatsAll', function () {
    let _0x1f10cd = $('#dateReportStart')[0].value.substring(0, 4) + $('#dateReportStart')[0].value.substring(5, 7) + $('#dateReportStart')[0].value.substring(8, 10) + '00';
    let _0x4bc969 = $('#dateReportEnd')[0].value.substring(0, 4) + $('#dateReportEnd')[0].value.substring(5, 7) + $('#dateReportEnd')[0].value.substring(8, 10) + '23';
    var _0x56256c = 'select * from stats where date <= ' + _0x4bc969 + ' and date >= ' + _0x1f10cd;
    db.transaction(function (_0x2edc5f) {
      _0x2edc5f.executeSql(_0x56256c, [], function (_0x2a0da2, _0x93db6e) {
        let _0x1974ec = [];
        for (let _0x2b7b71 = 0; _0x2b7b71 < _0x93db6e.rows.length; _0x2b7b71++) {
          _0x1974ec.push(_0x93db6e.rows[_0x2b7b71]);
        }
        for (let _0x5bfb32 = 0; _0x5bfb32 < _0x1974ec.length; _0x5bfb32++) {
          if (_0x1974ec[_0x5bfb32].date < 100000000) {
            _0x1974ec[_0x5bfb32].date = Number(_0x1974ec[_0x5bfb32].date + hourForStats);
          }
        }
        var _0x3d4d41 = '<style type="text/css">';
        let _0x2cecfc = 'white';
        if (localStorage.getItem('theme') == 'Steam') {
          _0x2cecfc = '#252734';
        }
        let _0xe64b1f = 1;
        for (var _0x582ec8 = 0; _0x582ec8 < _0x1974ec.length; _0x582ec8++) {
          let _0xa0a735 = round(_0x1974ec[_0x582ec8].balance * 100 / (_0x1974ec[_0x582ec8].balance + _0x1974ec[_0x582ec8].sumonsale));
          _0x3d4d41 += 'td.balance' + _0x582ec8 + '{ background: linear-gradient(to right, rgba(35, 190, 81, 0.15) ' + _0xa0a735 + '%, ' + _0x2cecfc + ' ' + _0xa0a735 + '%);}';
          _0xa0a735 = round(_0x1974ec[_0x582ec8].sumonsale * 100 / (_0x1974ec[_0x582ec8].balance + _0x1974ec[_0x582ec8].sumonsale));
          _0x3d4d41 += 'td.sumonsale' + _0x582ec8 + '{ background: linear-gradient(to left, rgba(35, 190, 81, 0.15) ' + _0xa0a735 + '%, ' + _0x2cecfc + ' ' + _0xa0a735 + '%);}';
          let _0x3e2327 = round((_0x1974ec[_0x582ec8].balance + _0x1974ec[_0x582ec8].sumonsale - _0xe64b1f) * 100 / _0xe64b1f);
          let _0x4866c6;
          let _0x453b6e;
          let _0xb63ce0;
          let _0xec35cc;
          if (_0x582ec8 != 0) {
            if (_0x3e2327 <= -0.5) {
              _0x3d4d41 += 'td.percentProfit' + _0x582ec8 + '{ background: rgb(255, 13, 48, 0.27)}';
            } else if (_0x3e2327 <= 0) {
              _0x4866c6 = -_0x3e2327 * 100 / 0.5;
              _0x453b6e = 255 - 7 * _0x4866c6 / 100;
              _0xb63ce0 = 235 - 130 * _0x4866c6 / 100;
              _0xec35cc = 132 - 25 * _0x4866c6 / 100;
              _0x3d4d41 += 'td.percentProfit' + _0x582ec8 + '{ background: rgb(' + _0x453b6e + ', ' + _0xb63ce0 + ', ' + _0xec35cc + ')}';
            } else if (_0x3e2327 <= 1) {
              _0x4866c6 = _0x3e2327 * 100 / 1;
              _0x453b6e = 255 - 156 * _0x4866c6 / 100;
              _0xb63ce0 = 235 - 45 * _0x4866c6 / 100;
              _0xec35cc = 132 + 9 * _0x4866c6 / 100;
              _0x3d4d41 += 'td.percentProfit' + _0x582ec8 + '{ background: rgb(' + _0x453b6e + ', ' + _0xb63ce0 + ', ' + _0xec35cc + ')}';
            } else {
              _0x3d4d41 += 'td.percentProfit' + _0x582ec8 + '{ background: rgb(15, 179, 100, 0.27)}';
            }
          }
          _0xe64b1f = _0x1974ec[_0x582ec8].balance + _0x1974ec[_0x582ec8].sumonsale;
        }
        _0x3d4d41 += '</style>';
        _0x3d4d41 += '<table border="1" cellspacing="10"><tr><td>Дата</td><td>Баланс</td><td>На продаже</td><td>Сумма</td><td>Профит</td><td>Процент профита</td></tr>';
        _0xe64b1f = 1;
        for (var _0x582ec8 = 0; _0x582ec8 < _0x1974ec.length; _0x582ec8++) {
          _0x3d4d41 += '<tr>';
          let _0x85b468 = _0x1974ec[_0x582ec8].date.toString();
          _0x3d4d41 += '<td>' + _0x85b468.substring(0, 4) + '-' + _0x85b468.substring(4, 6) + '-' + _0x85b468.substring(6, 8) + ' ' + _0x85b468.substring(8, 10) + ':00</td>';
          _0x3d4d41 += '<td class="balance' + _0x582ec8 + '">' + format(_0x1974ec[_0x582ec8].balance) + '</td>';
          _0x3d4d41 += '<td class="sumonsale' + _0x582ec8 + '">' + format(_0x1974ec[_0x582ec8].sumonsale) + '</td>';
          _0x3d4d41 += '<td>' + format(_0x1974ec[_0x582ec8].balance + _0x1974ec[_0x582ec8].sumonsale) + '</td>';
          if (_0x582ec8 != 0) {
            _0x3d4d41 += '<td>' + format(_0x1974ec[_0x582ec8].balance + _0x1974ec[_0x582ec8].sumonsale - _0xe64b1f) + '</td>';
            _0x3d4d41 += '<td class="percentProfit' + _0x582ec8 + '">' + format((_0x1974ec[_0x582ec8].balance + _0x1974ec[_0x582ec8].sumonsale - _0xe64b1f) * 100 / _0xe64b1f) + '</td>';
          } else {
            _0x3d4d41 += '<td></td><td></td>';
          }
          _0xe64b1f = _0x1974ec[_0x582ec8].balance + _0x1974ec[_0x582ec8].sumonsale;
          _0x3d4d41 += '</tr>';
        }
        _0x3d4d41 += '</table>';
        document.getElementById('report').innerHTML = _0x3d4d41;
      }, function (_0x3f85b7, _0xa8b43a) {
        document.getElementById('report').innerHTML = _0xa8b43a.message;
      });
    });
  });
  $(document).on('click', 'button#reportProfitMonth', function () {
    var _0x19e92c;
    var _0x2a3b56;
    _0x19e92c = document.getElementById('dateReportStart').value;
    _0x19e92c = _0x19e92c.substring(0, 4) + _0x19e92c.substring(5, 7) + _0x19e92c.substring(8, 10);
    _0x2a3b56 = document.getElementById('dateReportEnd').value;
    _0x2a3b56 = _0x2a3b56.substring(0, 4) + _0x2a3b56.substring(5, 7) + _0x2a3b56.substring(8, 10);
    var _0x5e2f4b = 'select * from saleshistory where date >= ' + _0x19e92c + ' and date <= ' + _0x2a3b56 + ' order by date';
    db.transaction(function (_0x28fa06) {
      _0x28fa06.executeSql(_0x5e2f4b, [], function (_0x1addcc, _0x2b408d) {
        var _0x12d1d1 = [];
        for (var _0x59b0c9 = 0; _0x59b0c9 < _0x2b408d.rows.length; _0x59b0c9++) {
          _0x12d1d1.push(_0x2b408d.rows[_0x59b0c9]);
        }
        var _0x50f073 = [];
        var _0x405863 = [];
        var _0x5d19ee = [];
        _0x12d1d1.sort(function (_0x2418b9, _0x5c2c23) {
          var _0x13be3e = _0x2418b9.price;
          var _0x242d7c = _0x5c2c23.price;
          if (_0x2418b9.price < _0x5c2c23.price) {
            return -1;
          }
          if (_0x2418b9.price > _0x5c2c23.price) {
            return 1;
          }
          return 0;
        });
        for (var _0x59b0c9 = 0; _0x59b0c9 < _0x12d1d1.length; _0x59b0c9++) {
          if (_0x12d1d1[_0x59b0c9].type == 'Buy') {
            _0x405863.push(_0x12d1d1[_0x59b0c9]);
          } else if (_0x12d1d1[_0x59b0c9].type == 'Sold') {
            _0x5d19ee.push(_0x12d1d1[_0x59b0c9]);
          }
        }
        for (var _0x59b0c9 = 0; _0x59b0c9 < _0x405863.length; _0x59b0c9++) {
          t = _0x5d19ee.map(function (_0x23f7c1) {
            return _0x23f7c1.appid + _0x23f7c1.name;
          }).indexOf(_0x405863[_0x59b0c9].appid + _0x405863[_0x59b0c9].name);
          if (t != -1) {
            var _0x1aafab = {};
            _0x1aafab.name = _0x405863[_0x59b0c9].name;
            _0x1aafab.b = _0x405863[_0x59b0c9].price;
            _0x1aafab.s = _0x5d19ee[t].price;
            _0x1aafab.p = Number(_0x5d19ee[t].price) - Number(_0x405863[_0x59b0c9].price);
            _0x1aafab.date = _0x5d19ee[t].date;
            _0x50f073.push(_0x1aafab);
            _0x5d19ee.splice(t, 1);
          }
        }
        _0x50f073.sort(function (_0x1c983f, _0x522ca1) {
          var _0x22af49 = _0x1c983f.date;
          var _0x1b9c40 = _0x522ca1.date;
          if (_0x1c983f.date < _0x522ca1.date) {
            return -1;
          }
          if (_0x1c983f.date > _0x522ca1.date) {
            return 1;
          }
          return 0;
        });
        var _0x32bc13 = [];
        _0x1aafab = {};
        _0x1aafab.date = _0x19e92c;
        _0x1aafab.p = 0;
        var _0x38facf = 0;
        _0x32bc13.push(_0x1aafab);
        var _0x4d8ac3 = _0x19e92c;
        for (var _0x59b0c9 = 0; _0x59b0c9 < _0x50f073.length; _0x59b0c9++) {
          if (_0x4d8ac3 == _0x50f073[_0x59b0c9].date) {
            _0x32bc13[_0x38facf].p += _0x50f073[_0x59b0c9].p;
          } else {
            _0x4d8ac3 = _0x50f073[_0x59b0c9].date;
            _0x1aafab = {};
            _0x1aafab.date = _0x50f073[_0x59b0c9].date;
            _0x1aafab.p = 0;
            _0x32bc13.push(_0x1aafab);
            _0x38facf++;
          }
        }
        var _0x4117ab = '<table>';
        for (var _0x59b0c9 = 0; _0x59b0c9 < _0x32bc13.length; _0x59b0c9++) {
          var _0xbd34dc = String(_0x32bc13[_0x59b0c9].date);
          _0xbd34dc = _0xbd34dc.substring(0, 4) + '-' + _0xbd34dc.substring(4, 6) + '-' + _0xbd34dc.substring(6, 8);
          _0x4117ab += '<tr><td>' + _0xbd34dc + '</td><td>' + round(_0x32bc13[_0x59b0c9].p / 100) + '</td></tr>';
        }
        _0x4117ab += '</table>';
        document.getElementById('report').innerHTML = _0x4117ab;
      }, function (_0x4bc7ab, _0x4c0ced) {
        document.getElementById('report').innerHTML = _0x4c0ced.message;
      });
    });
  });
  $(document).on('click', 'button#reportProfitAvg', function () {
    var _0x109bbb;
    var _0x5b8e3f;
    _0x109bbb = document.getElementById('dateReportStart').value;
    _0x109bbb = _0x109bbb.substring(0, 4) + _0x109bbb.substring(5, 7) + _0x109bbb.substring(8, 10);
    _0x5b8e3f = document.getElementById('dateReportEnd').value;
    _0x5b8e3f = _0x5b8e3f.substring(0, 4) + _0x5b8e3f.substring(5, 7) + _0x5b8e3f.substring(8, 10);
    var _0x23920d = 'select * from saleshistory where date >= ' + _0x109bbb + ' and date <= ' + _0x5b8e3f + ' order by date';
    db.transaction(function (_0x67fd85) {
      _0x67fd85.executeSql(_0x23920d, [], function (_0x22bc0d, _0x486d3c) {
        var _0x16e8bd = [];
        for (var _0x2ad7c2 = 0; _0x2ad7c2 < _0x486d3c.rows.length; _0x2ad7c2++) {
          _0x16e8bd.push(_0x486d3c.rows[_0x2ad7c2]);
        }
        var _0x491fa5 = [];
        var _0x2e7af6 = [];
        var _0x1f5b7d = [];
        _0x16e8bd.forEach(_0x2975b6 => {
          var _0x45a724 = _0x2e7af6.map(function (_0x18c601) {
            return _0x18c601.appid + _0x18c601.name;
          }).indexOf(_0x2975b6.appid + _0x2975b6.name);
          if (_0x2975b6.type == 'Buy' && _0x45a724 == -1) {
            var _0x2c73a9 = [];
            _0x16e8bd.forEach(_0x3f58d7 => {
              if (_0x2975b6.name == _0x3f58d7.name) {
                _0x2c73a9.push(_0x3f58d7.price);
              }
            });
            var _0x45c516;
            if (_0x2c73a9.length > 2) {
              var _0x31ef0b = Math.floor(_0x2c73a9.length / 2);
              _0x2c73a9.sort(function (_0x4e6434, _0x244dc2) {
                return _0x4e6434 - _0x244dc2;
              });
              if (_0x2c73a9.length % 2 != 0) {
                _0x45c516 = _0x2c73a9[_0x31ef0b];
              } else {
                _0x45c516 = (_0x2c73a9[_0x31ef0b] + _0x2c73a9[_0x31ef0b + 1]) / 2;
              }
            } else if (_0x2c73a9.length == 2) {
              _0x45c516 = (_0x2c73a9[0] + _0x2c73a9[1]) / 2;
            } else if (_0x2c73a9.length == 1) {
              _0x45c516 = _0x2c73a9[0];
            } else {
              _0x45c516 = 0;
            }
            var _0x364385 = {};
            _0x364385.name = _0x2975b6.name;
            _0x364385.price = _0x45c516;
            _0x2e7af6.push(_0x364385);
          }
        });
        _0x16e8bd.forEach(_0x487ac4 => {
          if (_0x487ac4.type == 'Sold') {
            var _0x5590ac = _0x2e7af6.map(function (_0x37557f) {
              return _0x37557f.appid + _0x37557f.name;
            }).indexOf(_0x487ac4.appid + _0x487ac4.name);
            if (_0x5590ac != -1) {
              var _0x50993a = {};
              _0x50993a.name = _0x487ac4.name;
              _0x50993a.b = _0x2e7af6[_0x5590ac].price;
              _0x50993a.s = _0x487ac4.price;
              _0x50993a.p = _0x487ac4.price - _0x2e7af6[_0x5590ac].price;
              _0x50993a.date = _0x487ac4.date;
              _0x491fa5.push(_0x50993a);
            }
          }
        });
        _0x491fa5.sort(function (_0x374dbf, _0x3c17b1) {
          var _0x1e3ed9 = _0x374dbf.date;
          var _0x52df90 = _0x3c17b1.date;
          if (_0x374dbf.date < _0x3c17b1.date) {
            return -1;
          }
          if (_0x374dbf.date > _0x3c17b1.date) {
            return 1;
          }
          return 0;
        });
        var _0x348ca7 = [];
        var _0x4240b0 = {};
        _0x4240b0.date = _0x109bbb;
        _0x4240b0.p = 0;
        var _0x67a100 = 0;
        _0x348ca7.push(_0x4240b0);
        var _0x3e34be = _0x109bbb;
        for (var _0x2ad7c2 = 0; _0x2ad7c2 < _0x491fa5.length; _0x2ad7c2++) {
          if (_0x3e34be == _0x491fa5[_0x2ad7c2].date) {
            _0x348ca7[_0x67a100].p += _0x491fa5[_0x2ad7c2].p;
          } else {
            _0x3e34be = _0x491fa5[_0x2ad7c2].date;
            _0x4240b0 = {};
            _0x4240b0.date = _0x491fa5[_0x2ad7c2].date;
            _0x4240b0.p = 0;
            _0x348ca7.push(_0x4240b0);
            _0x67a100++;
          }
        }
        var _0x4fa095 = '<table>';
        for (var _0x2ad7c2 = 0; _0x2ad7c2 < _0x348ca7.length; _0x2ad7c2++) {
          var _0x37ba31 = String(_0x348ca7[_0x2ad7c2].date);
          _0x37ba31 = _0x37ba31.substring(0, 4) + '-' + _0x37ba31.substring(4, 6) + '-' + _0x37ba31.substring(6, 8);
          _0x4fa095 += '<tr><td>' + _0x37ba31 + '</td><td>' + round(_0x348ca7[_0x2ad7c2].p / 100) + '</td></tr>';
        }
        _0x4fa095 += '</table>';
        document.getElementById('report').innerHTML = _0x4fa095;
      }, function (_0x197ad5, _0x475783) {
        document.getElementById('report').innerHTML = _0x475783.message;
      });
    });
  });
  $(document).on('click', 'button#reportProfitOptimist', function () {
    var _0x1880a7;
    var _0x21c1b6;
    _0x1880a7 = document.getElementById('dateReportStart').value;
    _0x1880a7 = _0x1880a7.substring(0, 4) + _0x1880a7.substring(5, 7) + _0x1880a7.substring(8, 10);
    _0x21c1b6 = document.getElementById('dateReportEnd').value;
    _0x21c1b6 = _0x21c1b6.substring(0, 4) + _0x21c1b6.substring(5, 7) + _0x21c1b6.substring(8, 10);
    var _0x3d7055 = 'select * from saleshistory where date >= ' + _0x1880a7 + ' and date <= ' + _0x21c1b6 + ' order by date';
    db.transaction(function (_0x569817) {
      _0x569817.executeSql(_0x3d7055, [], function (_0x242171, _0x28d326) {
        var _0x38da10 = [];
        for (var _0x5f4e97 = 0; _0x5f4e97 < _0x28d326.rows.length; _0x5f4e97++) {
          _0x38da10.push(_0x28d326.rows[_0x5f4e97]);
        }
        var _0x333387 = [];
        var _0x42fe17 = [];
        var _0x20528a = [];
        for (var _0x5f4e97 = 0; _0x5f4e97 < _0x38da10.length; _0x5f4e97++) {
          if (_0x38da10[_0x5f4e97].type == 'Buy') {
            _0x42fe17.push(_0x38da10[_0x5f4e97]);
          } else if (_0x38da10[_0x5f4e97].type == 'Sold') {
            _0x20528a.push(_0x38da10[_0x5f4e97]);
          }
        }
        _0x42fe17.forEach(_0x3fc28f => {
          for (var _0x4a7f47 = 0; _0x4a7f47 < _0x20528a.length; _0x4a7f47++) {
            if (_0x3fc28f.name == _0x20528a[_0x4a7f47].name && _0x3fc28f.price < _0x20528a[_0x4a7f47].price) {
              var _0x1e265c = {};
              _0x1e265c.name = _0x3fc28f.name;
              _0x1e265c.b = _0x3fc28f.price;
              _0x1e265c.s = _0x20528a[_0x4a7f47].price;
              _0x1e265c.p = _0x20528a[_0x4a7f47].price - _0x3fc28f.price;
              _0x1e265c.date = _0x3fc28f.date;
              _0x333387.push(_0x1e265c);
              _0x20528a.splice(_0x4a7f47, 1);
              break;
            }
          }
        });
        _0x333387.sort(function (_0x568127, _0x58dcd8) {
          var _0x1d5b6e = _0x568127.date;
          var _0x5cb680 = _0x58dcd8.date;
          if (_0x568127.date < _0x58dcd8.date) {
            return -1;
          }
          if (_0x568127.date > _0x58dcd8.date) {
            return 1;
          }
          return 0;
        });
        var _0x2cdba5 = [];
        var _0x127623 = {};
        _0x127623.date = _0x1880a7;
        _0x127623.p = 0;
        var _0x2493eb = 0;
        _0x2cdba5.push(_0x127623);
        var _0x1e4586 = _0x1880a7;
        for (var _0x5f4e97 = 0; _0x5f4e97 < _0x333387.length; _0x5f4e97++) {
          if (_0x1e4586 == _0x333387[_0x5f4e97].date) {
            _0x2cdba5[_0x2493eb].p += _0x333387[_0x5f4e97].p;
          } else {
            _0x1e4586 = _0x333387[_0x5f4e97].date;
            _0x127623 = {};
            _0x127623.date = _0x333387[_0x5f4e97].date;
            _0x127623.p = 0;
            _0x2cdba5.push(_0x127623);
            _0x2493eb++;
          }
        }
        var _0x9befcf = '<table>';
        for (var _0x5f4e97 = 0; _0x5f4e97 < _0x2cdba5.length; _0x5f4e97++) {
          var _0x31c2af = String(_0x2cdba5[_0x5f4e97].date);
          _0x31c2af = _0x31c2af.substring(0, 4) + '-' + _0x31c2af.substring(4, 6) + '-' + _0x31c2af.substring(6, 8);
          _0x9befcf += '<tr><td>' + _0x31c2af + '</td><td>' + round(_0x2cdba5[_0x5f4e97].p / 100) + '</td></tr>';
        }
        _0x9befcf += '</table>';
        document.getElementById('report').innerHTML = _0x9befcf;
      }, function (_0x291ecd, _0x1a133f) {
        document.getElementById('report').innerHTML = _0x1a133f.message;
      });
    });
  });
  window.onload = function () {
    chrome.storage.sync.get(function (_0xbf891) {
      if (_0xbf891.server) {
        if (document.URL.indexOf('index') != -1) {
          document.getElementById('server').value = _0xbf891.server;
        }
        server = Number(_0xbf891.server);
        server_url = servers[server];
      } else {
        if (document.URL.indexOf('index') != -1) {
          document.getElementById('server').value = 1;
        }
        server = 1;
        server_url = servers[server];
      }
      getAccID();
      getCurrentVersion();
    });
  };
  function asksecretkey() {
    let _0x32fa09 = prompt('Введите секретный ключ', '');
    if (_0x32fa09 != null && _0x32fa09 != '') {
      var _0x119074 = {};
      _0x119074.secretkey = _0x32fa09;
      chrome.storage.sync.set(_0x119074, function () {
      });
      secretkey = _0x32fa09;
      chrome.tabs.reload();
    }
  }
  function getCurrentVersion() {
    $.ajax({
      url: servers[server] + '/version.php',
      type: 'post',
      dataType: 'json',
      cache: false,
      success: function (_0x4f5897) {
        log('Текущая версия сервера: ' + _0x4f5897);
        if (_0x4f5897 > 1.55) {
          log('<div class="alert_icon"></div>Инструкция по обновлению, список изменений и ссылка на обновление доступны по адресу: <br><a target="blank" href="https://stetrade.ru/lk/services/ste-pro/">https://stetrade.ru/lk/services/ste-pro/</a>', 'err_msg');
          log('<div class="alert_icon"></div>Доступна новая версия бота. Текущая версия: ' + m.version + ', актуальная версия: ' + _0x4f5897, 'err_msg');
        }
      },
      error: function (_0x3ffcd0) {
        log('Ошибка проверки версии');
      }
    });
  }
  function loadSettingsReport() {
    chrome.storage.sync.get(function (_0xe7c6f7) {
      if (_0xe7c6f7.dateReportStart && document.getElementById('dateReportStart')) {
        document.getElementById('dateReportStart').value = _0xe7c6f7.dateReportStart;
      }
      if (_0xe7c6f7.hourForStats) {
        hourForStats = _0xe7c6f7.hourForStats;
      } else {
        hourForStats = '00';
      }
      let _0x3f5f52 = new Date();
      _0x3f5f52 = _0x3f5f52.getFullYear() + '-' + String(_0x3f5f52.getMonth() + 1).padStart(2, '0') + '-' + String(_0x3f5f52.getDate()).padStart(2, '0');
      $('#dateReportEnd')[0].value = _0x3f5f52;
    });
  }
  function loadSettingsParser() {
    chrome.storage.sync.get(function (_0xc047ca) {
      if (_0xc047ca.secretkey) {
        secretkey = _0xc047ca.secretkey;
      } else {
        asksecretkey();
      }
      $.ajax({
        url: 'https://steamcommunity.com/',
        type: 'get',
        dataType: 'html',
        cache: false,
        success: function (_0x4cbfe2) {
          if (!$(_0x4cbfe2).find('#account_pulldown')[0]) {
            log('<div class="alert_icon"></div>Войдите в свой аккаунт Steam', 'err_msg');
          } else if (_0x4cbfe2.substring(_0x4cbfe2.indexOf('lang') + 6, _0x4cbfe2.indexOf('lang') + 8) != 'en') {
            log('<div class="alert_icon"></div>Смените язык на английский в Steam', 'err_msg');
          } else {
            accID = _0x4cbfe2.substring(_0x4cbfe2.indexOf('g_steamID') + 13, _0x4cbfe2.indexOf(';', _0x4cbfe2.indexOf('g_steamID')) - 1);
          }
          $.ajax({
            url: servers[server] + '/mod_pars.php',
            type: 'post',
            data: {
              p: '"getAllApp"',
              secretkey: JSON.stringify(secretkey),
              steamid: JSON.stringify(accID)
            },
            success: function (_0x483b36) {
              if (_0x483b36 == 'nolic') {
                log('У вас нет доступа к этому модулю', '', 'log_parser');
                return;
              }
              _0x483b36 = JSON.parse(_0x483b36);
              _0x483b36.forEach(_0x32e692 => {
                $('#appid').append(new Option(_0x32e692.app_name, _0x32e692.appid));
              });
              log('Модуль загружен', '', 'log_parser');
            },
            error: function () {
              log('Cервер модуля парсинга не доступен', '', 'log_parser');
            }
          });
        },
        error: function (_0x4b3192) {
          log('STEAM EROR: Ошибка получения SteamID');
        }
      });
    });
  }
  function loadSettings() {
    chrome.storage.sync.get(function (_0x25055b) {
      if (AOSettings) {
        if (_0x25055b.listingPlace_use_percent != undefined) {
          document.getElementsByName('listingPlace_use_percent')[0].checked = _0x25055b.listingPlace_use_percent;
          listingPlace_use_percent = _0x25055b.listingPlace_use_percent;
        } else {
          document.getElementsByName('listingPlace_use_percent')[0].checked = false;
          listingPlace_use_percent = false;
        }
        if (_0x25055b.checkLowProfitTime) {
          $('#checkLowProfitTime')[0].value = _0x25055b.checkLowProfitTime + ':00';
          checkLowProfitTime = _0x25055b.checkLowProfitTime;
        } else {
          checkLowProfitTime = '';
        }
        if (_0x25055b.algoritm) {
          document.getElementById('algoritm').value = _0x25055b.algoritm;
          algoritm = _0x25055b.algoritm;
        } else {
          document.getElementById('algoritm').value = 'HG';
          algoritm = 'HG';
        }
        if (_0x25055b.algoritm_buy) {
          document.getElementById('algoritm_buy').value = _0x25055b.algoritm_buy;
          algoritm_buy = _0x25055b.algoritm_buy;
        } else {
          document.getElementById('algoritm_buy').value = algoritm;
          algoritm_buy = algoritm;
        }
        if (_0x25055b.checkLowProfitDeleteOrderAlgoritm) {
          document.getElementById('checkLowProfitDeleteOrderAlgoritm').value = _0x25055b.checkLowProfitDeleteOrderAlgoritm;
          checkLowProfitDeleteOrderAlgoritm = _0x25055b.checkLowProfitDeleteOrderAlgoritm;
        } else {
          document.getElementById('checkLowProfitDeleteOrderAlgoritm').value = 'sell';
          checkLowProfitDeleteOrderAlgoritm = 'sell';
        }
        if (_0x25055b.checkLowProfitUpdatePriceAlgoritm) {
          document.getElementById('checkLowProfitUpdatePriceAlgoritm').value = _0x25055b.checkLowProfitUpdatePriceAlgoritm;
          checkLowProfitUpdatePriceAlgoritm = _0x25055b.checkLowProfitUpdatePriceAlgoritm;
        } else {
          document.getElementById('checkLowProfitUpdatePriceAlgoritm').value = 'sell';
          checkLowProfitUpdatePriceAlgoritm = 'sell';
        }
        if (_0x25055b.checkActualPrices != undefined) {
          document.getElementsByName('checkActualPrices')[0].checked = _0x25055b.checkActualPrices;
          checkActualPrices = _0x25055b.checkActualPrices;
        } else {
          document.getElementsByName('checkActualPrices')[0].checked = false;
          checkActualPrices = false;
        }
        if (_0x25055b.removeFromSaleDays_skipWithStickers != undefined) {
          document.getElementsByName('removeFromSaleDays_skipWithStickers')[0].checked = _0x25055b.removeFromSaleDays_skipWithStickers;
          removeFromSaleDays_skipWithStickers = _0x25055b.removeFromSaleDays_skipWithStickers;
        } else {
          document.getElementsByName('removeFromSaleDays_skipWithStickers')[0].checked = false;
          removeFromSaleDays_skipWithStickers = false;
        }
        if (_0x25055b.removeFromSaleDays_ignoreOrders != undefined) {
          document.getElementsByName('removeFromSaleDays_ignoreOrders')[0].checked = _0x25055b.removeFromSaleDays_ignoreOrders;
          removeFromSaleDays_ignoreOrders = _0x25055b.removeFromSaleDays_ignoreOrders;
        } else {
          document.getElementsByName('removeFromSaleDays_ignoreOrders')[0].checked = false;
          removeFromSaleDays_ignoreOrders = false;
        }
        if (_0x25055b.removeFromSaleIfKonkurent != undefined) {
          document.getElementsByName('removeFromSaleIfKonkurent')[0].checked = _0x25055b.removeFromSaleIfKonkurent;
          removeFromSaleIfKonkurent = _0x25055b.removeFromSaleIfKonkurent;
        } else {
          document.getElementsByName('removeFromSaleIfKonkurent')[0].checked = false;
          removeFromSaleIfKonkurent = false;
        }
        if (_0x25055b.updateItemsPrices_settings != undefined) {
          document.getElementsByName('updateItemsPrices_settings')[0].checked = _0x25055b.updateItemsPrices_settings;
          updateItemsPrices_settings = _0x25055b.updateItemsPrices_settings;
        } else {
          document.getElementsByName('updateItemsPrices_settings')[0].checked = false;
          updateItemsPrices_settings = false;
        }
        if (_0x25055b.countDayHistoryGraph) {
          document.getElementById('countDayHistoryGraph').value = Number(_0x25055b.countDayHistoryGraph);
          countDayHistoryGraph = Number(_0x25055b.countDayHistoryGraph);
        } else {
          document.getElementById('countDayHistoryGraph').value = 7;
          countDayHistoryGraph = 7;
        }
        if (_0x25055b.alg_buy_qoeff) {
          document.getElementById('alg_buy_qoeff').value = Number(_0x25055b.alg_buy_qoeff);
          alg_buy_qoeff = Number(_0x25055b.alg_buy_qoeff);
        } else {
          document.getElementById('alg_buy_qoeff').value = 1;
          alg_buy_qoeff = 1;
        }
        if (_0x25055b.alg_sell_qoeff) {
          document.getElementById('alg_sell_qoeff').value = Number(_0x25055b.alg_sell_qoeff);
          alg_sell_qoeff = Number(_0x25055b.alg_sell_qoeff);
        } else {
          document.getElementById('alg_sell_qoeff').value = 1;
          alg_sell_qoeff = 1;
        }
        if (_0x25055b.percentLimit) {
          document.getElementsByName('percentLimit')[0].value = Number(_0x25055b.percentLimit);
          percentLimit = Number(_0x25055b.percentLimit);
        } else {
          document.getElementsByName('percentLimit')[0].value = 100;
          percentLimit = 100;
        }
        if (_0x25055b.profitPercent) {
          document.getElementsByName('profitPercent')[0].value = Number(_0x25055b.profitPercent);
          profitPercent = Number(_0x25055b.profitPercent);
        } else {
          document.getElementsByName('profitPercent')[0].value = 1;
          profitPercent = 1;
        }
        if (_0x25055b.minProfit) {
          document.getElementsByName('minProfit')[0].value = Number(_0x25055b.minProfit);
          minProfit = Number(_0x25055b.minProfit);
        } else {
          document.getElementsByName('minProfit')[0].value = 0.01;
          minProfit = 0.01;
        }
        if (_0x25055b.profitPercent_min) {
          document.getElementsByName('profitPercent_min')[0].value = Number(_0x25055b.profitPercent_min);
          profitPercent_min = Number(_0x25055b.profitPercent_min);
        } else {
          document.getElementsByName('profitPercent_min')[0].value = 0.01;
          profitPercent_min = 0.01;
        }
        if (_0x25055b.cntSalesMonth) {
          document.getElementsByName('cntSalesMonth')[0].value = Number(_0x25055b.cntSalesMonth);
          cntSalesMonth = Number(_0x25055b.cntSalesMonth);
        } else {
          document.getElementsByName('cntSalesMonth')[0].value = '';
          cntSalesMonth = 0;
        }
        if (_0x25055b.weekTrend) {
          document.getElementsByName('weekTrend')[0].value = Number(_0x25055b.weekTrend);
          weekTrend = Number(_0x25055b.weekTrend);
        } else {
          document.getElementsByName('weekTrend')[0].value = '';
          weekTrend = 0;
        }
        if (_0x25055b.weekTrend_up) {
          document.getElementsByName('weekTrend_up')[0].value = Number(_0x25055b.weekTrend_up);
          weekTrend_up = Number(_0x25055b.weekTrend_up);
        } else {
          document.getElementsByName('weekTrend_up')[0].value = '';
          weekTrend_up = 0;
        }
        if (_0x25055b.dayTrend) {
          document.getElementsByName('dayTrend')[0].value = Number(_0x25055b.dayTrend);
          dayTrend = Number(_0x25055b.dayTrend);
        } else {
          document.getElementsByName('dayTrend')[0].value = '';
          dayTrend = 0;
        }
        if (_0x25055b.dayTrend_up) {
          document.getElementsByName('dayTrend_up')[0].value = Number(_0x25055b.dayTrend_up);
          dayTrend_up = Number(_0x25055b.dayTrend_up);
        } else {
          document.getElementsByName('dayTrend_up')[0].value = '';
          dayTrend_up = 0;
        }
        if (_0x25055b.monthTrend) {
          document.getElementsByName('monthTrend')[0].value = Number(_0x25055b.monthTrend);
          monthTrend = Number(_0x25055b.monthTrend);
        } else {
          document.getElementsByName('monthTrend')[0].value = '';
          monthTrend = 0;
        }
        if (_0x25055b.monthTrend_up) {
          document.getElementsByName('monthTrend_up')[0].value = Number(_0x25055b.monthTrend_up);
          monthTrend_up = Number(_0x25055b.monthTrend_up);
        } else {
          document.getElementsByName('monthTrend_up')[0].value = '';
          monthTrend_up = 0;
        }
        if (_0x25055b.ordersPlace) {
          document.getElementsByName('ordersPlace')[0].value = Number(_0x25055b.ordersPlace);
          ordersPlace = Number(_0x25055b.ordersPlace);
        } else {
          document.getElementsByName('ordersPlace')[0].value = '';
          ordersPlace = 0;
        }
        if (_0x25055b.listingPlace) {
          document.getElementsByName('listingPlace')[0].value = Number(_0x25055b.listingPlace);
          listingPlace = Number(_0x25055b.listingPlace);
        } else {
          document.getElementsByName('listingPlace')[0].value = '';
          listingPlace = 0;
        }
        if (_0x25055b.removeFromSaleDays) {
          document.getElementsByName('removeFromSaleDays')[0].value = Number(_0x25055b.removeFromSaleDays);
          removeFromSaleDays = Number(_0x25055b.removeFromSaleDays);
        } else {
          document.getElementsByName('removeFromSaleDays')[0].value = 0;
          removeFromSaleDays = 0;
        }
        if (_0x25055b.orderPercent) {
          document.getElementsByName('orderPercent')[0].value = Number(_0x25055b.orderPercent);
          orderPercent = Number(_0x25055b.orderPercent);
        } else {
          document.getElementsByName('orderPercent')[0].value = 0;
          orderPercent = 0;
        }
        if (_0x25055b.showItemsCntSalesDay != undefined) {
          document.getElementsByName('showItemsCntSalesDay')[0].checked = _0x25055b.showItemsCntSalesDay;
          showItemsCntSalesDay = _0x25055b.showItemsCntSalesDay;
        } else {
          document.getElementsByName('showItemsCntSalesDay')[0].checked = false;
          showItemsCntSalesDay = false;
        }
        if (_0x25055b.showItemsCurProfitPercent != undefined) {
          document.getElementsByName('showItemsCurProfitPercent')[0].checked = _0x25055b.showItemsCurProfitPercent;
          showItemsCurProfitPercent = _0x25055b.showItemsCurProfitPercent;
        } else {
          document.getElementsByName('showItemsCurProfitPercent')[0].checked = false;
          showItemsCurProfitPercent = false;
        }
        if (_0x25055b.showItemsCurKoefOrder != undefined) {
          document.getElementsByName('showItemsCurKoefOrder')[0].checked = _0x25055b.showItemsCurKoefOrder;
          showItemsCurKoefOrder = _0x25055b.showItemsCurKoefOrder;
        } else {
          document.getElementsByName('showItemsCurKoefOrder')[0].checked = false;
          showItemsCurKoefOrder = false;
        }
        if (_0x25055b.soundNotifications != undefined) {
          document.getElementsByName('soundNotifications')[0].checked = _0x25055b.soundNotifications;
          soundNotifications = _0x25055b.soundNotifications;
        } else {
          document.getElementsByName('soundNotifications')[0].checked = false;
          soundNotifications = false;
        }
        if (_0x25055b.cnt_for_move_to_osn_group) {
          document.getElementsByName('cnt_for_move_to_osn_group')[0].value = Number(_0x25055b.cnt_for_move_to_osn_group);
          cnt_for_move_to_osn_group = Number(_0x25055b.cnt_for_move_to_osn_group);
        } else {
          document.getElementsByName('cnt_for_move_to_osn_group')[0].value = 1000;
          cnt_for_move_to_osn_group = 1000;
        }
      }
      if (_0x25055b.dateReportStart && document.getElementById('dateReportStart')) {
        document.getElementById('dateReportStart').value = _0x25055b.dateReportStart;
      }
      if (_0x25055b.dateReportEnd && document.getElementById('dateReportEnd')) {
        document.getElementById('dateReportEnd').value = _0x25055b.dateReportEnd;
      }
      if (_0x25055b.hourForStats) {
        $('#hourForStats')[0].value = _0x25055b.hourForStats + ':00';
        hourForStats = _0x25055b.hourForStats;
      } else {
        hourForStats = '';
      }
      if (_0x25055b.turnAllOrdersOnTime) {
        $('#turnAllOrdersOnTime')[0].value = _0x25055b.turnAllOrdersOnTime + ':00';
        turnAllOrdersOnTime = _0x25055b.turnAllOrdersOnTime;
      } else {
        turnAllOrdersOnTime = '';
      }
      if (_0x25055b.importFileWithNoAnalyse != undefined) {
        document.getElementsByName('importFileWithNoAnalyse')[0].checked = _0x25055b.importFileWithNoAnalyse;
        importFileWithNoAnalyse = _0x25055b.importFileWithNoAnalyse;
      } else {
        document.getElementsByName('importFileWithNoAnalyse')[0].checked = true;
        importFileWithNoAnalyse = true;
      }
      if (_0x25055b.percentSlivBalance) {
        document.getElementsByName('percentSlivBalance')[0].value = Number(_0x25055b.percentSlivBalance);
        percentSlivBalance = Number(_0x25055b.percentSlivBalance);
      } else {
        document.getElementsByName('percentSlivBalance')[0].value = '';
        percentSlivBalance = '';
      }
      if (_0x25055b.proxy) {
        document.getElementsByName('proxy')[0].value = _0x25055b.proxy;
        proxy = _0x25055b.proxy;
        if (proxy == '') {
          clearProxy();
        } else {
          changeProxy(proxy);
        }
      } else {
        document.getElementsByName('proxy')[0].value = '';
        proxy = '';
      }
      if (_0x25055b.alert_onsale_cnt) {
        document.getElementsByName('alert_onsale_cnt')[0].value = Number(_0x25055b.alert_onsale_cnt);
        alert_onsale_cnt = Number(_0x25055b.alert_onsale_cnt);
      } else {
        document.getElementsByName('alert_onsale_cnt')[0].value = '';
        alert_onsale_cnt = '';
      }
      if (_0x25055b.max_cnt_items_for_orders) {
        document.getElementsByName('max_cnt_items_for_orders')[0].value = Number(_0x25055b.max_cnt_items_for_orders);
        max_cnt_items_for_orders = Number(_0x25055b.max_cnt_items_for_orders);
      } else {
        document.getElementsByName('max_cnt_items_for_orders')[0].value = '';
        max_cnt_items_for_orders = 0;
      }
      if (_0x25055b.cancelOrderIfLow) {
        document.getElementsByName('cancelOrderIfLow')[0].checked = _0x25055b.cancelOrderIfLow;
        cancelOrderIfLow = _0x25055b.cancelOrderIfLow;
      } else {
        document.getElementsByName('cancelOrderIfLow')[0].checked = false;
        cancelOrderIfLow = false;
      }
      if (_0x25055b.placeMoreThen1000orders) {
        document.getElementsByName('placeMoreThen1000orders')[0].checked = _0x25055b.placeMoreThen1000orders;
        placeMoreThen1000orders = _0x25055b.placeMoreThen1000orders;
      } else {
        document.getElementsByName('placeMoreThen1000orders')[0].checked = false;
        placeMoreThen1000orders = false;
      }
      if (_0x25055b.messagesSTEdatetime) {
        messagesSTEdatetime = _0x25055b.messagesSTEdatetime;
      } else {
        var _0x4d761c = new Date();
        var _0x3c8605 = _0x4d761c.getFullYear() + String(_0x4d761c.getMonth() + 1).padStart(2, '0') + String(_0x4d761c.getDate()).padStart(2, '0') + String(_0x4d761c.getHours()).padStart(2, '0') + String(_0x4d761c.getMinutes()).padStart(2, '0') + String(_0x4d761c.getSeconds()).padStart(2, '0');
        messagesSTEdatetime = _0x3c8605;
      }
      if (_0x25055b.AOSettings != undefined) {
        document.getElementsByName('AOSettings')[0].checked = _0x25055b.AOSettings;
        AOSettings = _0x25055b.AOSettings;
      } else {
        document.getElementsByName('AOSettings')[0].checked = false;
        AOSettings = false;
      }
      if (_0x25055b.itemsOnSaleRefreshTime) {
        document.getElementsByName('itemsOnSaleRefreshTime')[0].value = Number(_0x25055b.itemsOnSaleRefreshTime);
        itemsOnSaleRefreshTime = Number(_0x25055b.itemsOnSaleRefreshTime);
      } else {
        document.getElementsByName('itemsOnSaleRefreshTime')[0].value = 1;
        itemsOnSaleRefreshTime = 1;
      }
      if (_0x25055b.dont_sell_if_stickers_price) {
        document.getElementsByName('dont_sell_if_stickers_price')[0].value = Number(_0x25055b.dont_sell_if_stickers_price);
        dont_sell_if_stickers_price = Number(_0x25055b.dont_sell_if_stickers_price);
      } else {
        document.getElementsByName('dont_sell_if_stickers_price')[0].value = '';
        dont_sell_if_stickers_price = 0;
      }
      if (_0x25055b.dont_sell_if_stickers_streak) {
        document.getElementsByName('dont_sell_if_stickers_streak')[0].value = Number(_0x25055b.dont_sell_if_stickers_streak);
        dont_sell_if_stickers_streak = Number(_0x25055b.dont_sell_if_stickers_streak);
      } else {
        document.getElementsByName('dont_sell_if_stickers_streak')[0].value = '';
        dont_sell_if_stickers_streak = 0;
      }
      if (_0x25055b.sellInventoryRefreshTime) {
        document.getElementsByName('sellInventoryRefreshTime')[0].value = Number(_0x25055b.sellInventoryRefreshTime);
        sellInventoryRefreshTime = Number(_0x25055b.sellInventoryRefreshTime);
      } else {
        document.getElementsByName('sellInventoryRefreshTime')[0].value = 1;
        sellInventoryRefreshTime = 1;
      }
      if (_0x25055b.getOrdersRefreshTime) {
        document.getElementsByName('getOrdersRefreshTime')[0].value = Number(_0x25055b.getOrdersRefreshTime);
        getOrdersRefreshTime = Number(_0x25055b.getOrdersRefreshTime);
      } else {
        document.getElementsByName('getOrdersRefreshTime')[0].value = 1;
        getOrdersRefreshTime = 1;
      }
      if (_0x25055b.sticker_overprice) {
        document.getElementsByName('sticker_overprice')[0].value = Number(_0x25055b.sticker_overprice);
        sticker_overprice = Number(_0x25055b.sticker_overprice);
      } else {
        document.getElementsByName('sticker_overprice')[0].value = 1;
        sticker_overprice = 1;
      }
      if (_0x25055b.sticker_percent) {
        document.getElementsByName('sticker_percent')[0].value = Number(_0x25055b.sticker_percent);
        sticker_percent = Number(_0x25055b.sticker_percent);
      } else {
        document.getElementsByName('sticker_percent')[0].value = 1;
        sticker_percent = 1;
      }
      if (_0x25055b.sellWithStickers != undefined) {
        document.getElementsByName('sellWithStickers')[0].checked = _0x25055b.sellWithStickers;
        sellWithStickers = _0x25055b.sellWithStickers;
      } else {
        document.getElementsByName('sellWithStickers')[0].checked = true;
        sellWithStickers = true;
      }
      if (_0x25055b.logs_info) {
        document.getElementById('logs_info').value = _0x25055b.logs_info;
        logs_info = Number(_0x25055b.logs_info);
      } else {
        document.getElementById('logs_info').value = 2;
        logs_info = 2;
      }
      if (logs_info == 3) {
        $('#logs_cnt')[0].hidden = false;
      } else {
        $('#logs_cnt')[0].hidden = true;
      }
      if (_0x25055b.autoIncOrders != undefined) {
        document.getElementsByName('autoIncOrders')[0].checked = _0x25055b.autoIncOrders;
        autoIncOrders = _0x25055b.autoIncOrders;
      } else {
        document.getElementsByName('autoIncOrders')[0].checked = false;
        autoIncOrders = false;
      }
      if (_0x25055b.autologInSteamAcc != undefined) {
        document.getElementsByName('autologInSteamAcc')[0].checked = _0x25055b.autologInSteamAcc;
        autologInSteamAcc = _0x25055b.autologInSteamAcc;
      } else {
        document.getElementsByName('autologInSteamAcc')[0].checked = false;
        autologInSteamAcc = false;
      }
      if (_0x25055b.checkSDASettings != undefined) {
        document.getElementsByName('checkSDASettings')[0].checked = _0x25055b.checkSDASettings;
        checkSDASettings = _0x25055b.checkSDASettings;
      } else {
        document.getElementsByName('checkSDASettings')[0].checked = true;
        checkSDASettings = true;
      }
      if (_0x25055b.ignoreMissing != undefined) {
        document.getElementsByName('ignoreMissing')[0].checked = _0x25055b.ignoreMissing;
        ignoreMissing = _0x25055b.ignoreMissing;
      } else {
        document.getElementsByName('ignoreMissing')[0].checked = false;
        ignoreMissing = false;
      }
      if (_0x25055b.dontSelTradable != undefined) {
        document.getElementsByName('dontSelTradable')[0].checked = _0x25055b.dontSelTradable;
        dontSelTradable = _0x25055b.dontSelTradable;
      } else {
        document.getElementsByName('dontSelTradable')[0].checked = false;
        dontSelTradable = false;
      }
      if (_0x25055b.checkHistogramBeforeBuy != undefined) {
        document.getElementsByName('checkHistogramBeforeBuy')[0].checked = _0x25055b.checkHistogramBeforeBuy;
        checkHistogramBeforeBuy = _0x25055b.checkHistogramBeforeBuy;
      } else {
        document.getElementsByName('checkHistogramBeforeBuy')[0].checked = true;
        checkHistogramBeforeBuy = true;
      }
      if (_0x25055b.checkHistogramBeforeSell != undefined) {
        document.getElementsByName('checkHistogramBeforeSell')[0].checked = _0x25055b.checkHistogramBeforeSell;
        checkHistogramBeforeSell = _0x25055b.checkHistogramBeforeSell;
      } else {
        document.getElementsByName('checkHistogramBeforeSell')[0].checked = true;
        checkHistogramBeforeSell = true;
      }
      if (_0x25055b.checkFloat != undefined) {
        document.getElementsByName('checkFloat')[0].checked = _0x25055b.checkFloat;
        checkFloat = _0x25055b.checkFloat;
      } else {
        document.getElementsByName('checkFloat')[0].checked = false;
        checkFloat = false;
      }
      if (_0x25055b.telegram_update_id) {
        telegram_update_id = _0x25055b.telegram_update_id;
      } else {
        telegram_update_id = 0;
      }
      if (_0x25055b.telegram_chat_id) {
        document.getElementById('telegram_chat_id').value = _0x25055b.telegram_chat_id;
        telegram_chat_id = _0x25055b.telegram_chat_id;
      } else {
        document.getElementById('telegram_chat_id').value = '';
        telegram_chat_id = '';
      }
      if (telegram_chat_id != '') {
        checkTelegramMessages();
      }
      if (_0x25055b.telegramThisIsMain != undefined) {
        document.getElementsByName('telegramThisIsMain')[0].checked = _0x25055b.telegramThisIsMain;
        telegramThisIsMain = _0x25055b.telegramThisIsMain;
      } else {
        document.getElementsByName('telegramThisIsMain')[0].checked = true;
        telegramThisIsMain = true;
      }
      if (_0x25055b.telegram_alert_logout != undefined) {
        document.getElementsByName('telegram_alert_logout')[0].checked = _0x25055b.telegram_alert_logout;
        telegram_alert_logout = _0x25055b.telegram_alert_logout;
      } else {
        document.getElementsByName('telegram_alert_logout')[0].checked = true;
        telegram_alert_logout = true;
      }
      if (_0x25055b.telegram_alert_login != undefined) {
        document.getElementsByName('telegram_alert_login')[0].checked = _0x25055b.telegram_alert_login;
        telegram_alert_login = _0x25055b.telegram_alert_login;
      } else {
        document.getElementsByName('telegram_alert_login')[0].checked = true;
        telegram_alert_login = true;
      }
      if (_0x25055b.telegram_alert_SlivBalance != undefined) {
        document.getElementsByName('telegram_alert_SlivBalance')[0].checked = _0x25055b.telegram_alert_SlivBalance;
        telegram_alert_SlivBalance = _0x25055b.telegram_alert_SlivBalance;
      } else {
        document.getElementsByName('telegram_alert_SlivBalance')[0].checked = true;
        telegram_alert_SlivBalance = true;
      }
      if (_0x25055b.telegram_alert_filterstickers != undefined) {
        document.getElementsByName('telegram_alert_filterstickers')[0].checked = _0x25055b.telegram_alert_filterstickers;
        telegram_alert_filterstickers = _0x25055b.telegram_alert_filterstickers;
      } else {
        document.getElementsByName('telegram_alert_filterstickers')[0].checked = true;
        telegram_alert_filterstickers = true;
      }
      if (_0x25055b.telegram_alert_filterfloat != undefined) {
        document.getElementsByName('telegram_alert_filterfloat')[0].checked = _0x25055b.telegram_alert_filterfloat;
        telegram_alert_filterfloat = _0x25055b.telegram_alert_filterfloat;
      } else {
        document.getElementsByName('telegram_alert_filterfloat')[0].checked = true;
        telegram_alert_filterfloat = true;
      }
      if (_0x25055b.telegram_alert_stickersprice != undefined) {
        document.getElementsByName('telegram_alert_stickersprice')[0].checked = _0x25055b.telegram_alert_stickersprice;
        telegram_alert_stickersprice = _0x25055b.telegram_alert_stickersprice;
      } else {
        document.getElementsByName('telegram_alert_stickersprice')[0].checked = true;
        telegram_alert_stickersprice = true;
      }
      if (_0x25055b.telegram_alert_stickersstreak != undefined) {
        document.getElementsByName('telegram_alert_stickersstreak')[0].checked = _0x25055b.telegram_alert_stickersstreak;
        telegram_alert_stickersstreak = _0x25055b.telegram_alert_stickersstreak;
      } else {
        document.getElementsByName('telegram_alert_stickersstreak')[0].checked = true;
        telegram_alert_stickersstreak = true;
      }
      if (_0x25055b.query_delay) {
        document.getElementById('query_delay').value = _0x25055b.query_delay;
        query_delay = _0x25055b.query_delay;
      } else {
        document.getElementById('query_delay').value = 0;
        query_delay = 0;
      }
      if (_0x25055b.logs_cnt) {
        document.getElementById('logs_cnt').value = _0x25055b.logs_cnt;
        logs_cnt = _0x25055b.logs_cnt;
      } else {
        document.getElementById('logs_cnt').value = '';
        logs_cnt = '';
      }
    });
  }
  function loadSqlBase() {
    db = openDatabase('dbSTH', '', 'STEtrade', 1000000000);
    if (document.URL.indexOf('report') != -1) {
      loadSettingsReport();
      return;
    } else if (document.URL.indexOf('parser') != -1) {
      loadSettingsParser();
      return;
    }
    checkSqlBase();
    db.transaction(function (_0x5ada56) {
      var _0x1b4fb4 = 'select item.name as name_real,  * from item left join [group] on id_group = [group].id left join group_settings on id_group = group_id ';
      _0x1b4fb4 += 'order by [group].name, item.name';
      _0x5ada56.executeSql(_0x1b4fb4, [], function (_0x29f6fc, _0x429b39) {
        for (var _0xb4557 = 0; _0xb4557 < _0x429b39.rows.length; _0xb4557++) {
          var _0x999948 = _0x429b39.rows.item(_0xb4557);
          var _0x3ebd5d = {};
          _0x3ebd5d.name = _0x999948.market_hash_name.replace('↵', '').replace('↵', '').replace('	', '').trim();
          _0x3ebd5d.name_real = _0x999948.name_real.replace('  ', ' ');
          _0x3ebd5d.item_nameid = _0x999948.item_nameid;
          _0x3ebd5d.appid = _0x999948.appid;
          _0x3ebd5d.url = _0x999948.url;
          _0x3ebd5d.b_summ = Math.round(_0x999948.b_summ);
          _0x3ebd5d.s_summ = Math.round(_0x999948.s_summ);
          _0x3ebd5d.s_summ_steam = round(getBuyerPays(_0x999948.s_summ / 100) * 100);
          _0x3ebd5d.CurProfitPercent = getCurProfitPercent(_0x3ebd5d);
          _0x3ebd5d.priceOnSale = '';
          _0x3ebd5d.min_float = _0x999948.max_float == 0 ? '' : _0x999948.max_float;
          _0x3ebd5d.max_float = _0x999948.min_float == 1 || _0x999948.min_float == 0 ? '' : _0x999948.min_float;
          _0x3ebd5d.b_cnt = _0x999948.b_cnt;
          _0x3ebd5d.b_on = _0x999948.b_on;
          _0x3ebd5d.s_on = _0x999948.s_on;
          if (_0x999948.name == null) {
            _0x3ebd5d.id_group = 0;
          } else {
            _0x3ebd5d.id_group = _0x999948.id_group;
          }
          _0x3ebd5d.name_group = _0x999948.name;
          _0x3ebd5d.on_sale_cnt = '';
          _0x3ebd5d.on_sale_cnt_stcrs = '';
          _0x3ebd5d.order_cnt = '';
          _0x3ebd5d.buyorderid = '';
          _0x3ebd5d.priceHistory = null;
          _0x3ebd5d.order_date = _0x999948.order_date;
          _0x3ebd5d.resale_cnt = Number(_0x999948.resale_cnt);
          _0x3ebd5d.checked = false;
          _0x3ebd5d.inv_cnt = 0;
          _0x3ebd5d.removeIds = [];
          _0x3ebd5d.cntSalesDay = '';
          _0x3ebd5d.CurKoefOrder = 0;
          _0x3ebd5d.Date_last_sell = _0x999948.date_last_sell;
          var _0x5716d1 = {};
          _0x5716d1.profitPercent = _0x999948.profitPercent == null || _0x999948.profitPercent == '' ? '' : Number(_0x999948.profitPercent);
          _0x5716d1.minProfit = _0x999948.minProfit == null || _0x999948.minProfit == '' ? '' : Number(_0x999948.minProfit);
          _0x5716d1.profitPercent_min = _0x999948.p1 == null || _0x999948.p1 == '' ? '' : Number(_0x999948.p1);
          _0x5716d1.alg_sell_qoeff = _0x999948.p2 == null || _0x999948.p2 == '' ? '' : Number(_0x999948.p2);
          _0x5716d1.alg_buy_qoeff = _0x999948.p3 == null || _0x999948.p3 == '' ? '' : Number(_0x999948.p3);
          _0x5716d1.countDayHistoryGraph = _0x999948.countDayHistoryGraph == null || _0x999948.countDayHistoryGraph == '' ? '' : Number(_0x999948.countDayHistoryGraph);
          _0x5716d1.percentLimit = _0x999948.percentLimit == null || _0x999948.percentLimit == '' ? '' : Number(_0x999948.percentLimit);
          _0x5716d1.algoritm = _0x999948.algoritm == null || _0x999948.algoritm == '' ? '' : _0x999948.algoritm;
          _0x5716d1.algoritm_buy = _0x999948.algoritm_buy == null || _0x999948.algoritm_buy == '' ? '' : _0x999948.algoritm_buy;
          _0x5716d1.orderPercent = _0x999948.orderPercent == null || _0x999948.orderPercent == '' ? '' : Number(_0x999948.orderPercent);
          _0x5716d1.ordersPlace = _0x999948.ordersPlace == null || _0x999948.ordersPlace == '' ? '' : Number(_0x999948.ordersPlace);
          _0x5716d1.cancelOrderIfLow = _0x999948.cancelOrderIfLow == null || _0x999948.cancelOrderIfLow == '' ? '' : _0x999948.cancelOrderIfLow;
          _0x5716d1.dontDeleteOrders = _0x999948.p0 == null || _0x999948.p0 == '' ? '' : _0x999948.p0;
          _0x5716d1.cntSalesMonth = _0x999948.cntSalesMonth == null || _0x999948.cntSalesMonth == '' ? '' : Number(_0x999948.cntSalesMonth);
          _0x5716d1.listingPlace = _0x999948.listingPlace == null || _0x999948.listingPlace == '' ? '' : Number(_0x999948.listingPlace);
          _0x5716d1.monthTrend = _0x999948.monthTrend == null || _0x999948.monthTrend == '' ? '' : Number(_0x999948.monthTrend);
          _0x5716d1.monthTrend_up = _0x999948.monthTrend_up == null || _0x999948.monthTrend_up == '' ? '' : Number(_0x999948.monthTrend_up);
          _0x5716d1.weekTrend = _0x999948.weekTrend == null || _0x999948.weekTrend == '' ? '' : Number(_0x999948.weekTrend);
          _0x5716d1.weekTrend_up = _0x999948.weekTrend_up == null || _0x999948.weekTrend_up == '' ? '' : Number(_0x999948.weekTrend_up);
          _0x5716d1.dayTrend = _0x999948.dayTrend == null || _0x999948.dayTrend == '' ? '' : Number(_0x999948.dayTrend);
          _0x5716d1.dayTrend_up = _0x999948.dayTrend_up == null || _0x999948.dayTrend_up == '' ? '' : Number(_0x999948.dayTrend_up);
          _0x3ebd5d.group_settings = _0x5716d1;
          items.push(_0x3ebd5d);
        }
        loadSqlGroups();
        loadSqlFilterSticker();
      }, function (_0xd18755, _0x47d8b0) {
        checkSqlBase();
        logSQLError(_0x1b4fb4, _0x47d8b0);
        setTimeout(function () {
          chrome.tabs.reload();
        }, 1000);
      });
    });
  }
  function loadSqlFilterSticker() {
    var _0xfdb56b = 'select name from filterstickers';
    db.transaction(function (_0x543ff3) {
      _0x543ff3.executeSql('select name from filterstickers', [], function (_0x596df9, _0x16d27f) {
        var _0x1314be = '';
        for (var _0x1c77b3 = 0; _0x1c77b3 < _0x16d27f.rows.length; _0x1c77b3++) {
          filter_stickers.push(_0x16d27f.rows.item(_0x1c77b3).name.toLowerCase());
          _0x1314be += _0x16d27f.rows.item(_0x1c77b3).name.toLowerCase() + ';';
        }
        $('#filter_stickers_list')[0].value = _0x1314be;
      }, function (_0x430504, _0x2e0494) {
        logSQLError('select name from filterstickers', _0x2e0494);
      });
    });
  }
  function checkSqlBase() {
    var _0x4d32a9 = 'CREATE TABLE IF NOT EXISTS `group` ( `id` INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT , `name` VARCHAR(255), `sort` INTEGER DEFAULT 0, `quantity` INTEGER(1) DEFAULT 0, `type` TINYINT(4) DEFAULT 0, `open` TINYINT(1) DEFAULT 1 , order_percent_cnt int, order_percent bool, order_max int)';
    db.transaction(function (_0xd8cea8) {
      _0xd8cea8.executeSql(_0x4d32a9, [], function () {
        _0x4d32a9 = 'CREATE TABLE IF NOT EXISTS `item` ( `id` INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT , `name` VARCHAR(255), `type` VARCHAR(255), `sort` INTEGER DEFAULT 0, ';
        _0x4d32a9 += '`url` VARCHAR(255), `market_hash_name` VARCHAR(255), `b_min` INTEGER(1) DEFAULT 0, `filter` VARCHAR(255), `item_nameid` INTEGER(1) DEFAULT 0, `buy_type` TINYINT(1) DEFAULT 0,';
        _0x4d32a9 += '`appid` INTEGER(1) DEFAULT 0, `contextid` INTEGER(1) DEFAULT 0, `id_group` INTEGER DEFAULT 0, `b_cnt` INTEGER(1) DEFAULT 0, `b_summ` INTEGER(1) DEFAULT 0, `b_on` TINYINT(1)';
        _0x4d32a9 += 'DEFAULT 0, `s_summ` INTEGER(1) DEFAULT 0, `s_on` TINYINT(1) DEFAULT 0, `publisher_fee_percent` INTEGER(1) DEFAULT 10, `min_float` FLOAT(1) DEFAULT 1, `max_float` FLOAT(1)  DEFAULT 0 , order_date date NULL, resale_cnt int)';
        db.transaction(function (_0x6bb384) {
          _0x6bb384.executeSql(_0x4d32a9, [], function () {
            _0x4d32a9 = 'CREATE TABLE IF NOT EXISTS `saleshistory` ( `id` INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT , `game` VARCHAR(1000), `date` INTEGER, `name` VARCHAR(1000), `type` VARCHAR(10), `price` INTEGER, listingid varchar)';
            db.transaction(function (_0x503794) {
              _0x503794.executeSql(_0x4d32a9, [], function () {
                _0x4d32a9 = 'CREATE TABLE IF NOT EXISTS `group_settings` ( `id` INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT , `group_id` INTEGER, `profitPercent` INTEGER, `minProfit` INTEGER, `countSalesHour` INTEGER,';
                _0x4d32a9 += ' `countDayHistoryGraph` INTEGER, `percentLimit` INTEGER, `algoritm` varchar(10), `algoritm_buy` varchar(10), `orderPercent` INTEGER, `ordersPlace` INTEGER, `cancelOrderIfLow` bool, `cntSalesMonth` INTEGER, `listingPlace` INTEGER, `monthTrend` INTEGER, `monthTrend_up` INTEGER,';
                _0x4d32a9 += ' `weekTrend` INTEGER, `weekTrend_up` INTEGER, `dayTrend` INTEGER, `dayTrend_up` INTEGER, `p0` INTEGER, `p1` INTEGER, `p2` INTEGER, `p3` INTEGER, `p4` INTEGER, `p5` INTEGER, `p6` INTEGER, `p7` INTEGER, `p8` INTEGER, `p9` INTEGER, `p10` INTEGER, `p11` INTEGER, `p12` INTEGER, `p13` INTEGER, `p14` INTEGER)';
                db.transaction(function (_0x2cf1e6) {
                  _0x2cf1e6.executeSql(_0x4d32a9, [], function () {
                  }, function (_0xa7206f, _0x1b90ca) {
                    logSQLError(_0x4d32a9, _0x1b90ca);
                  });
                });
              }, function (_0x47831f, _0x8f66cf) {
                logSQLError(_0x4d32a9, _0x8f66cf);
              });
            });
          }, function (_0x58c054, _0x22a921) {
            logSQLError(_0x4d32a9, _0x22a921);
          });
        });
      }, function (_0x424003, _0x44d7e0) {
        logSQLError(_0x4d32a9, _0x44d7e0);
      });
    });
    let _0x1c85d7 = 'CREATE TABLE IF NOT EXISTS `filterstickers` ( `id` INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT , `name` VARCHAR(1000))';
    db.transaction(function (_0x276b3c) {
      _0x276b3c.executeSql('CREATE TABLE IF NOT EXISTS `filterstickers` ( `id` INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT , `name` VARCHAR(1000))', [], function (_0x2612e4, _0x313dbb) {
      }, function (_0x18faf0, _0x524125) {
      });
    });
    let _0x724ae5 = 'CREATE TABLE IF NOT EXISTS `stats` ( `id` INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT , `date` int, `balance` int, `sumonsale` int);';
    db.transaction(function (_0x3c5c04) {
      _0x3c5c04.executeSql('CREATE TABLE IF NOT EXISTS `stats` ( `id` INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT , `date` int, `balance` int, `sumonsale` int);', [], function (_0x40bf02, _0x4923b8) {
      }, function (_0x1bcd5a, _0xc3c3f3) {
      });
    });
    let _0x364292 = 'ALTER TABLE group_settings ADD COLUMN algoritm_buy varchar(10)';
    db.transaction(function (_0x389fad) {
      _0x389fad.executeSql('ALTER TABLE group_settings ADD COLUMN algoritm_buy varchar(10)', [], function (_0x31f70b, _0x4805a5) {
      }, function (_0x3c85b4, _0x5267c4) {
      });
    });
    let _0x71e91a = 'ALTER TABLE item ADD COLUMN date_last_sell date';
    db.transaction(function (_0xf8ab6c) {
      _0xf8ab6c.executeSql('ALTER TABLE item ADD COLUMN date_last_sell date', [], function (_0x28ed8f, _0x4060ee) {
      }, function (_0x1fa3bf, _0xcd60e3) {
      });
    });
  }
  function loadSqlGroups() {
    db1 = openDatabase('dbSTH', '', 'DB for mw_auto_sb', 1000000000);
    db1.transaction(function (_0x42450c) {
      var _0x46f430 = 'select * from "group" order by name';
      _0x42450c.executeSql('select * from "group" order by name', [], function (_0x3a16d9, _0x39a21c) {
        for (var _0xb8e4a = 0; _0xb8e4a < _0x39a21c.rows.length; _0xb8e4a++) {
          var _0x448534 = {};
          var _0x37e39c = _0x39a21c.rows.item(_0xb8e4a);
          _0x448534.id = _0x37e39c.id;
          _0x448534.name = _0x37e39c.name;
          _0x448534.quantity = _0x37e39c.quantity;
          _0x448534.open = _0x37e39c.open;
          _0x448534.order_percent = _0x37e39c.order_percent;
          _0x448534.order_percent_cnt = _0x37e39c.order_percent_cnt;
          _0x448534.order_max = _0x37e39c.order_max;
          _0x448534.on_sale_cnt = '';
          _0x448534.order_cnt = '';
          groups.push(_0x448534);
        }
        var _0x448534 = {};
        _0x448534.id = 0;
        _0x448534.name = '*';
        _0x448534.quantity = 0;
        _0x448534.open = 1;
        _0x448534.order_percent = 'false';
        _0x448534.order_percent_cnt = null;
        _0x448534.order_max = null;
        _0x448534.on_sale_cnt = '';
        _0x448534.order_cnt = '';
        groups.push(_0x448534);
        groups.sort(function (_0x25f1d2, _0x256b01) {
          var _0x5d25c4 = _0x25f1d2.name;
          var _0x5e3e99 = _0x256b01.name;
          if (_0x25f1d2.name < _0x256b01.name) {
            return -1;
          }
          if (_0x25f1d2.name > _0x256b01.name) {
            return 1;
          }
          return 0;
        });
      }, function (_0x43c2f7, _0x234471) {
        logSQLError('select * from "group" order by name', _0x234471);
      });
      chrome.storage.sync.get(function () {
        groups.forEach(_0x5e488f => {
          $('#group_percent').append(new Option(_0x5e488f.name, _0x5e488f.id));
          $('#group_temp').append(new Option(_0x5e488f.name, _0x5e488f.id));
        });
        if (AOSettings) {
          chrome.storage.sync.get(function (_0x41b12b) {
            if (_0x41b12b.group_percent) {
              document.getElementById('group_percent').value = _0x41b12b.group_percent;
              group_percent = Number(_0x41b12b.group_percent);
            } else {
              document.getElementById('group_percent').value = '';
              group_percent = 0;
            }
            if (_0x41b12b.group_temp) {
              document.getElementById('group_temp').value = _0x41b12b.group_temp;
              group_temp = Number(_0x41b12b.group_temp);
            } else {
              document.getElementById('group_temp').value = '';
              group_temp = 0;
            }
            if (_0x41b12b.perenos_v_temp_group) {
              document.getElementById('perenos_v_temp_group').checked = _0x41b12b.perenos_v_temp_group;
              perenos_v_temp_group = _0x41b12b.perenos_v_temp_group;
            } else {
              document.getElementById('perenos_v_temp_group').checked = false;
              perenos_v_temp_group = false;
            }
            if (_0x41b12b.perenos_v_osn_group) {
              document.getElementById('perenos_v_osn_group').checked = _0x41b12b.perenos_v_osn_group;
              perenos_v_osn_group = _0x41b12b.perenos_v_osn_group;
            } else {
              document.getElementById('perenos_v_osn_group').checked = false;
              perenos_v_osn_group = false;
            }
          });
        }
      });
    });
    db1.transaction(function (_0x31b0fb) {
      var _0xe12f74 = 'select * from "group_settings"';
      _0x31b0fb.executeSql('select * from "group_settings"', [], function (_0x494898, _0x30cdb6) {
        for (var _0x3378a7 = 0; _0x3378a7 < _0x30cdb6.rows.length; _0x3378a7++) {
          var _0x1690d3 = {};
          var _0x4c0b06 = _0x30cdb6.rows.item(_0x3378a7);
          _0x1690d3.group_id = Number(_0x4c0b06.group_id);
          _0x1690d3.profitPercent = _0x4c0b06.profitPercent == null || _0x4c0b06.profitPercent == '' ? '' : Number(_0x4c0b06.profitPercent);
          _0x1690d3.minProfit = _0x4c0b06.minProfit == null || _0x4c0b06.minProfit == '' ? '' : Number(_0x4c0b06.minProfit);
          _0x1690d3.profitPercent_min = _0x4c0b06.p1 == null || _0x4c0b06.p1 == '' ? '' : Number(_0x4c0b06.p1);
          _0x1690d3.alg_sell_qoeff = _0x4c0b06.p2 == null || _0x4c0b06.p2 == '' ? '' : Number(_0x4c0b06.p2);
          _0x1690d3.alg_buy_qoeff = _0x4c0b06.p3 == null || _0x4c0b06.p3 == '' ? '' : Number(_0x4c0b06.p3);
          _0x1690d3.countDayHistoryGraph = _0x4c0b06.countDayHistoryGraph == null || _0x4c0b06.countDayHistoryGraph == '' ? '' : Number(_0x4c0b06.countDayHistoryGraph);
          _0x1690d3.percentLimit = _0x4c0b06.percentLimit == null || _0x4c0b06.percentLimit == '' ? '' : Number(_0x4c0b06.percentLimit);
          _0x1690d3.algoritm = _0x4c0b06.algoritm == null || _0x4c0b06.algoritm == '' ? '' : _0x4c0b06.algoritm;
          _0x1690d3.algoritm_buy = _0x4c0b06.algoritm_buy == null || _0x4c0b06.algoritm_buy == '' ? '' : _0x4c0b06.algoritm_buy;
          _0x1690d3.orderPercent = _0x4c0b06.orderPercent == null || _0x4c0b06.orderPercent == '' ? '' : Number(_0x4c0b06.orderPercent);
          _0x1690d3.ordersPlace = _0x4c0b06.ordersPlace == null || _0x4c0b06.ordersPlace == '' ? '' : Number(_0x4c0b06.ordersPlace);
          _0x1690d3.cancelOrderIfLow = _0x4c0b06.cancelOrderIfLow == null || _0x4c0b06.cancelOrderIfLow == '' ? '' : _0x4c0b06.cancelOrderIfLow;
          _0x1690d3.dontDeleteOrders = _0x4c0b06.p0 == null || _0x4c0b06.p0 == '' ? '' : _0x4c0b06.p0;
          _0x1690d3.cntSalesMonth = _0x4c0b06.cntSalesMonth == null || _0x4c0b06.cntSalesMonth == '' ? '' : Number(_0x4c0b06.cntSalesMonth);
          _0x1690d3.listingPlace = _0x4c0b06.listingPlace == null || _0x4c0b06.listingPlace == '' ? '' : Number(_0x4c0b06.listingPlace);
          _0x1690d3.monthTrend = _0x4c0b06.monthTrend == null || _0x4c0b06.monthTrend == '' ? '' : Number(_0x4c0b06.monthTrend);
          _0x1690d3.monthTrend_up = _0x4c0b06.monthTrend_up == null || _0x4c0b06.monthTrend_up == '' ? '' : Number(_0x4c0b06.monthTrend_up);
          _0x1690d3.weekTrend = _0x4c0b06.weekTrend == null || _0x4c0b06.weekTrend == '' ? '' : Number(_0x4c0b06.weekTrend);
          _0x1690d3.weekTrend_up = _0x4c0b06.weekTrend_up == null || _0x4c0b06.weekTrend_up == '' ? '' : Number(_0x4c0b06.weekTrend_up);
          _0x1690d3.dayTrend = _0x4c0b06.dayTrend == null || _0x4c0b06.dayTrend == '' ? '' : Number(_0x4c0b06.dayTrend);
          _0x1690d3.dayTrend_up = _0x4c0b06.dayTrend_up == null || _0x4c0b06.dayTrend_up == '' ? '' : Number(_0x4c0b06.dayTrend_up);
          if (_0x1690d3.alg_sell_qoeff == '' && _0x1690d3.alg_buy_qoeff == '' && _0x1690d3.profitPercent == '' && _0x1690d3.minProfit == '' && _0x1690d3.profitPercent_min == '' && _0x1690d3.countDayHistoryGraph == '' && _0x1690d3.algoritm == '' && _0x1690d3.algoritm_buy == '' && _0x1690d3.percentLimit == '' && _0x1690d3.orderPercent == '' && _0x1690d3.ordersPlace == '' && _0x1690d3.cancelOrderIfLow == false && _0x1690d3.dontDeleteOrders == false && _0x1690d3.cntSalesMonth == '' && _0x1690d3.listingPlace == '' && _0x1690d3.monthTrend == '' && _0x1690d3.monthTrend_up == '' && _0x1690d3.weekTrend == '' && _0x1690d3.weekTrend_up == '' && _0x1690d3.dayTrend == '' && _0x1690d3.dayTrend_up == '') {
            _0x1690d3.settings_not_null = false;
          } else {
            _0x1690d3.settings_not_null = true;
          }
          group_settings.push(_0x1690d3);
        }
        drawItems();
        if (autoStart) {
          setTimeout(function () {
            if (!working && autoStart) {
              startWork(false);
            }
          }, 5000);
        }
      }, function (_0x3d4bd3, _0x233540) {
        logSQLError('select * from "group_settings"', _0x233540);
      });
    });
  }
  function getAccID() {
    var _0x28c578 = {
      url: 'https://steamcommunity.com/',
      name: 'sessionid'
    };
    chrome.cookies.get(_0x28c578, function (_0x1bfe9b) {
      sessionid = _0x1bfe9b.value;
    });
    chrome.storage.sync.get(function (_0x5c314f) {
      if (document.URL.indexOf('index') != -1) {
        if (_0x5c314f.secretkey) {
          secretkey = _0x5c314f.secretkey;
        } else {
          _0x591bbf();
        }
        if (_0x5c314f.currency) {
          currency.id = _0x5c314f.currency;
          log('Ваша валюта: ' + _0x46f474[_0x2daec8[currency.id]].long);
        }
        if (_0x5c314f.autoStart != undefined) {
          document.getElementsByName('autoStart')[0].checked = _0x5c314f.autoStart;
          autoStart = _0x5c314f.autoStart;
        } else {
          document.getElementsByName('autoStart')[0].checked = false;
          autoStart = false;
        }
        $.ajax({
          url: 'https://steamcommunity.com/market/',
          type: 'get',
          dataType: 'html',
          cache: false,
          success: function (_0x41f9e5) {
            if (!$(_0x41f9e5).find('#account_pulldown')[0]) {
              log('<div class="alert_icon"></div>Войдите в свой аккаунт Steam', 'err_msg');
            } else if (_0x41f9e5.substring(_0x41f9e5.indexOf('lang') + 6, _0x41f9e5.indexOf('lang') + 8) != 'en') {
              log('<div class="alert_icon"></div>Смените язык на английский в Steam', 'err_msg');
            } else {
              accID = _0x41f9e5.substring(_0x41f9e5.indexOf('g_steamID') + 13, _0x41f9e5.indexOf(';', _0x41f9e5.indexOf('g_steamID')) - 1);
              accName = $(_0x41f9e5).find('span.persona.online')[0].innerText;
              document.getElementById('user_name').innerText = accName;
              document.getElementById('user_avatar').style.backgroundImage = 'url("' + $(_0x41f9e5).find('a.user_avatar')[0].children[0].src + '")';
              let _0x5883dd = JSON.parse(_0x41f9e5.match(/{"wallet_currency"[0-9a-zA-Z,-_"]+}/)[0]);
              if (currency.id != _0x5883dd.wallet_currency) {
                currency.id = _0x5883dd.wallet_currency;
                log('Валюта обновилась');
                log('Ваша валюта: ' + _0x46f474[_0x2daec8[currency.id]].long);
                var _0x382808 = { currency: currency.id };
                chrome.storage.sync.set(_0x382808);
              }
              balance = round(_0x5883dd.wallet_balance / 100);
              document.getElementById('balance').innerText = format(balance);
              let _0x247ccb = JSON.stringify(accID);
              let _0x2aa0d8 = JSON.stringify(secretkey);
              AOSettings = true;
              $('#settings_page')[0].innerHTML = $('#settings_page')[0].innerHTML;
              $('#AOSettings')[0].hidden = false;
              $('#updateItemsPrices')[0].hidden = false;
              $('#updateItemsPrices_settings')[0].hidden = false;
              $('#updateItemsPricesLabel')[0].hidden = false;
              $('#updateItemsPrices_table11')[0].hidden = false;
              log('STEtrade(про) вечная подписка');
              guid_fs = 9999999;
              guid_fifo = 9999999;
              guid_di = 9999999;
              guid_di = 9999999;
              loadSettings();
              loadSqlBase();
            }
          },
          error: function () {
            log('STEAM EROR: Ошибка получения SteamID');
          }
        });
      } else {
        loadSqlBase();
      }
    });
  }
  // This function adds prices to items for sale based on their appid and name
  // It takes an array of items as input
  function addPriceToItemsForSale(_0x33dfda) {
    // Loop through each item in the array
    _0x33dfda.forEach(_0x42ac36 => {
      // Find the index of the item in the items array based on its appid and name
      t = items.map(function (_0x1cfadc) {
        return _0x1cfadc.appid + _0x1cfadc.name;
      }).indexOf(_0x42ac36.appid + _0x42ac36.name);
      // If the item is not found in the items array, log a message or ignore it based on the ignoreMissing variable
      if (t == -1) {
        if (!ignoreMissing) {
          log(_0x42ac36.name + ' нет в базе!');
        }
      } else {
        // If the item has stickers and is not a souvenir, calculate the price based on the sticker percentage and overprice
        if (_0x42ac36.stickers.length > 0 && _0x42ac36.name.indexOf('Souvenir') == -1) {
          var _0x3a4c19 = 0;
          _0x42ac36.message = '<br>Stickers:<br>';
          _0x42ac36.message += _0x42ac36.stickers_img;
          _0x42ac36.message += '<br>';
          for (var _0x458390 = 0; _0x458390 < _0x42ac36.stickers.length; _0x458390++) {
            _0x3a4c19 += _0x42ac36.stickers[_0x458390].price;
            _0x42ac36.message += _0x42ac36.stickers[_0x458390].name + ' - ' + _0x42ac36.stickers[_0x458390].price + '<br>';
          }
          _0x3a4c19 = round(_0x3a4c19 * sticker_percent / 100);
          if (_0x3a4c19 > sticker_overprice) {
            _0x42ac36.price = round(items[t].s_summ + _0x3a4c19 * 100);
          } else {
            _0x42ac36.price = round(items[t].s_summ + sticker_overprice * 100);
          }
        } else {
          // If the item does not have stickers or is a souvenir, set the price to the item's s_summ value
          _0x42ac36.price = round(items[t].s_summ);
        }
        // If the item has a listing and checkHistogramBeforeSell is true, adjust the price based on the buyer's fee
        if (_0x42ac36.listing && checkHistogramBeforeSell) {
          if (getBuyerPays(round(_0x42ac36.price / 100)) < _0x42ac36.listing[0]) {
            _0x42ac36.price = round(getSteamFee(_0x42ac36.listing[0] - 0.01) * 100);
          }
        }
        // If the item's price is higher than the items s_summ value, add a message indicating the price difference
        if (_0x42ac36.price > items[t].s_summ) {
          _0x42ac36.message += ' Дороже на ' + round((_0x42ac36.price - round(items[t].s_summ)) / 100);
        }
      }
    });
    // Create a new array to hold the items that will be sold
    let _0x3d9143 = [];
    // Loop through each item in the input array again
    for (let _0x5789fd = 0; _0x5789fd < _0x33dfda.length; _0x5789fd++) {
      // If the item has stickers and is not a souvenir and the sticker overprice is greater than 0, check if the item has a sticker streak or exceeds the sticker price limit
      if (_0x33dfda[_0x5789fd].stickers.length > 0 && _0x33dfda[_0x5789fd].name.indexOf('Souvenir') == -1 && sticker_overprice > 0) {
        let _0x2ffaf1 = 0;
        for (let _0x3e93a8 = 0; _0x3e93a8 < _0x33dfda[_0x5789fd].stickers.length; _0x3e93a8++) {
          _0x2ffaf1 += _0x33dfda[_0x5789fd].stickers[_0x3e93a8].price;
        }
        let _0x103a95 = [];
        for (let _0x598c89 = 0; _0x598c89 < _0x33dfda[_0x5789fd].stickers.length; _0x598c89++) {
          let _0x20fd01 = true;
          for (let _0x178c59 = 0; _0x178c59 < _0x103a95.length; _0x178c59++) {
            if (_0x103a95[_0x178c59].name == _0x33dfda[_0x5789fd].stickers[_0x598c89].name) {
              _0x103a95[_0x178c59].cnt++;
              _0x20fd01 = false;
            }
          }
          if (_0x20fd01) {
            let _0x4d99d3 = {};
            _0x4d99d3.name = _0x33dfda[_0x5789fd].stickers[_0x598c89].name;
            _0x4d99d3.cnt = 1;
            _0x103a95.push(_0x4d99d3);
          }
        }
        let _0x3d6ba6 = -1;
        for (let _0x434354 = 0; _0x434354 < _0x103a95.length; _0x434354++) {
          if (_0x103a95[_0x434354].cnt >= dont_sell_if_stickers_streak) {
            _0x3d6ba6 = _0x434354;
          }
        }
        // If the item has a sticker streak, log a message or ignore it based on the telegram_alert_stickersstreak variable and add it to the arrayOfIgnoredAssets
        if (dont_sell_if_stickers_streak > 0 && _0x3d6ba6 >= 0) {
          log('Стрик из стикеров на предмете ' + getLinkItem(_0x33dfda[_0x5789fd]) + ': ' + _0x103a95[_0x3d6ba6].cnt + ' шт. ' + _0x103a95[_0x3d6ba6].name);
          if (telegram_alert_stickersstreak) {
            sendMsgTelegramBot('Стрик из стикеров на предмете ' + _0x33dfda[_0x5789fd].name + ': ' + _0x103a95[_0x3d6ba6].cnt + ' шт. ' + _0x103a95[_0x3d6ba6].name);
          }
          arrayOfIgnoredAssets.push(_0x33dfda[_0x5789fd].assetid);
        // If the item exceeds the sticker price limit, log a message or ignore it based on the telegram_alert_stickersprice variable and add it to the arrayOfIgnoredAssets
        } else if (dont_sell_if_stickers_price > 0 && _0x2ffaf1 > dont_sell_if_stickers_price) {
          log('Сумма стикеров предмета ' + getLinkItem(_0x33dfda[_0x5789fd]) + ': ' + round(_0x2ffaf1));
          if (telegram_alert_stickersprice) {
            sendMsgTelegramBot('Сумма стикеров предмета ' + _0x33dfda[_0x5789fd].name + ': ' + round(_0x2ffaf1));
          }
          arrayOfIgnoredAssets.push(_0x33dfda[_0x5789fd].assetid);
        } else if (_0x2ffaf1 != 0) {
          // If the item passes all checks, add it to the _0x3d9143 array
          _0x3d9143.push(_0x33dfda[_0x5789fd]);
        } else {
          // If the item's sticker price cannot be calculated, log a message
          log('Не смог расчитать цену стикеров у предмета ' + getLinkItem(_0x33dfda[_0x5789fd]));
        }
      } else {
        // If the item does not have stickers or is a souvenir, add it to the _0x3d9143 array
        _0x3d9143.push(_0x33dfda[_0x5789fd]);
      }
    }
    // Set the myInventoryItemsCount variable to the length of the _0x3d9143 array and sell the items in the array
    myInventoryItemsCount = _0x3d9143.length;
    sellItem(_0x3d9143, 0);
  }
  // Функция для фильтрации инвентаря и отправки данных на сервер
  function filterInventory(_0x4bd7cd) {
    // Получаем данные из хранилища браузера
    chrome.storage.sync.get(function (_0x4f77e3) {
      // Обрабатываем данные из хранилища браузера
      id = guid_fs;
      arrayOfIgnoredAssets = arrayOfIgnoredAssets;
      refreshItemsInv(items);
      analyzeWorking = analyzeWorking;
      balance = balance;
      orders_sum = orders_sum;
      orders_cnt = orders_cnt;
  
      // Обрабатываем данные из функции
      for (let i = 0; i < items.length; i++) {
        log(items[i].name_real);
      }
  
      if ("fo" == 'fifo') {
        analyzeWorking = true;
        timerSellInventoryWorking = false;
        findItemsForOrders('a', 'пиздец ты любопытный!');
      } else {
        if (items == null || items.length == 0) {
          arr = [];
        } else {
          arr = items;
        }
        if (arr.length > 0) {
          log('Найдено на продажу предметов: ' + arr.length);
          if (alert_onsale_cnt != '' && alert_onsale_cnt <= arr.length) {
            sendMsgTelegramBot('Найдено на продажу предметов: ' + arr.length);
          }
          tempListing = [];
          var _0x350fee = [];
          if (checkFloat) {
            filterByFloat(arr, 0, _0x350fee);
          } else {
            addListingToItemsForSale(arr, 0);
          }
        } else {
          if (!analyzeWorking && balance * 10 > orders_sum && (orders_cnt < 1000 || placeMoreThen1000orders)) {
            SDA_not_confirmed = [];
            analyzeWorking = true;
            timerSellInventoryWorking = false;
            findItemsForOrders('a', 'пиздец ты любопытный!');
          } else {
            timerSellInventoryWorking = false;
            let _0x521a7c = new Date();
            let _0x4b177c = Number(_0x521a7c.getHours());
            let _0x470c7f = String(_0x521a7c.getDate()).padStart(2, '0');
            let _0x85990b = String(_0x521a7c.getMonth() + 1).padStart(2, '0');
            let _0x4cdf73 = _0x521a7c.getFullYear();
            _0x521a7c = '' + _0x4cdf73 + _0x85990b + _0x470c7f;
            if (checkLowProfitTime != '' && _0x4b177c == checkLowProfitTime && checkLowProfitDate != _0x521a7c) {
              checkLowProfit();
            }
          }
        }
      }
    })
  }
  
          
  
        
      
  
  
  
  
  function refreshItemsInv(itemInventory) {
    // Цикл по элементам инвентаря
    for (let i = 0; i < itemInventory.length; i++) {
      // Если количество элементов инвентаря не равно 0
      if (itemInventory[i].inv_cnt != 0) {
        // Обновляем количество элементов
        items[i].inv_cnt = itemInventory[i].inv_cnt;
        // Обновляем отображение количества элементов
        $('#inv_cnt_' + i)[0].innerHTML = itemInventory[i].inv_cnt;
      } else {
        // Если количество элементов равно 0, то обновляем значение на 0
        items[i].inv_cnt = 0;
        // Убираем отображение количества элементов
        $('#inv_cnt_' + i)[0].innerHTML = '';
      }
    }
  }
  
  // Функция обновляет товары на распродаже
  
  function refreshItemsOnSale(_0x56301a) {
  
    // Инициализируем переменные для хранения количества товаров на распродаже
    on_sale_cnt = 0;
    on_sale_cnt_stcrs = 0;
    
    // Итерируемся по товарам
    for (var _0x3542d4 = 0; _0x3542d4 < items.length; _0x3542d4++) {
    items[_0x3542d4].on_sale_cnt = '';
    items[_0x3542d4].on_sale_cnt_stcrs = '';
    items[_0x3542d4].priceOnSale = '';
    
    // Вычисляем, если был изменен ценник на товары в распродаже
    _0x56301a.forEach(_0x58236e => {
      if (items[_0x3542d4].name == _0x58236e.name) {
        if (items[_0x3542d4].priceOnSale > _0x58236e.price || items[_0x3542d4].priceOnSale == '') {
          items[_0x3542d4].priceOnSale = _0x58236e.price;
        }
        if (_0x58236e.stickers && _0x58236e.stickers.length > 0 && _0x58236e.name.indexOf('Souvenir') == -1) {
          items[_0x3542d4].on_sale_cnt_stcrs = Number(items[_0x3542d4].on_sale_cnt_stcrs) + 1;
          on_sale_cnt_stcrs++;
        } else {
          items[_0x3542d4].on_sale_cnt = Number(items[_0x3542d4].on_sale_cnt) + 1;
          on_sale_cnt++;
        }
      }
    });
    
    // Проверяем, существует ли у товара количество на распродаже
    if (items[_0x3542d4].on_sale_cnt == '') {
      items[_0x3542d4].on_sale_cnt = 0;
    }
    
    // Проверяем, существует ли у товара количество подарков на распродаже
    if (items[_0x3542d4].on_sale_cnt_stcrs == '') {
      items[_0x3542d4].on_sale_cnt_stcrs = 0;
    }
    
    // Если товар находится на распродаже, обновляем его количество и выводим соответствующее сообщение с кнопкой "X"
    if (items[_0x3542d4].on_sale_cnt != 0 || items[_0x3542d4].on_sale_cnt_stcrs != 0) {
      $($('#on_sale_cnt_' + _0x3542d4)[0]).addClass('color_onsale');
      $('#on_sale_cnt_' + _0x3542d4)[0].innerHTML = '<span> ' + items[_0x3542d4].on_sale_cnt + ' / ' + items[_0x3542d4].on_sale_cnt_stcrs + '</span><button class = "tableOnSale" id=' + _0x3542d4 + '>X</button>';
    } else {
      $($('#on_sale_cnt_' + _0x3542d4)[0]).removeClass('color_onsale');
      $('#on_sale_cnt_' + _0x3542d4)[0].innerHTML = items[_0x3542d4].on_sale_cnt + ' / ' + items[_0x3542d4].on_sale_cnt_stcrs;
    }
    }
    
    // Итерируемся по группам
    for (var _0x3542d4 = 0; _0x3542d4 < groups.length; _0x3542d4++) {
    groups[_0x3542d4].on_sale_cnt = 0;
    
    // Итерируемся по товарам и увеличиваем счетчик товаров в распродаже для данной группы
    items.forEach(_0x1a080d => {
      if (_0x1a080d.id_group == groups[_0x3542d4].id && (_0x1a080d.on_sale_cnt != 0 || _0x1a080d.on_sale_cnt_stcrs != 0)) {
        groups[_0x3542d4].on_sale_cnt += 1;
      }
    });
    
    // Обновляем соответствующее поле в таблице
    $('#group_on_sale_cnt_' + _0x3542d4)[0].innerText = groups[_0x3542d4].on_sale_cnt;
    }
    
    // Обновляем количество товаров на распродаже на странице
    $('#on_sale_cnt')[0].innerHTML = on_sale_cnt + '/' + on_sale_cnt_stcrs;
    
    // Проверяем, есть ли товары, отсутствующие в базе, и выводим соответствующее сообщение
    let _0x4aeee1 = [];
    if (!ignoreMissing) {
    _0x56301a.forEach(_0x1e0281 => {
    if (items.map(function (_0x20d816) {
    return _0x20d816.appid + _0x20d816.name;
    }).indexOf(_0x1e0281.appid + _0x1e0281.name) == -1 && _0x4aeee1.indexOf(_0x1e0281.appid + _0x1e0281.name) == -1) {
    _0x4aeee1.push(_0x1e0281.appid + _0x1e0281.name);
    if (_0x1e0281.appid == '730') {
    log('<a href="https://steamcommunity.com/market/listings/' + _0x1e0281.appid + '/' + _0x1e0281.name + '" target="_blank">' + _0x1e0281.name + '</a> нет в базе');
    } else {
    log(_0x1e0281.name + ' нет в базе');
    }
    }
    });
    }
    
    // Обновляем время последнего обновления количества товаров на распродаже
    var _0x581bad = new Date();
    var _0x84541 = String(_0x581bad.getHours()).padStart(2, '0') + ':' + String(_0x581bad.getMinutes()).padStart(2, '0');
    document.getElementById('itemsOnSaleRefreshTimeLable').innerHTML = _0x84541;
    if (timerGetItemsOnSaleWorking) {
    timerGetItemsOnSaleWorking = false;
    }
    }
  function startTimerIsLogin() {
    $.get('https://steamcommunity.com/market/', {
      type: 'get',
      dataType: 'html',
      cache: false
    }).done(function (_0x490a78) {
      var _0x372424 = $(_0x490a78).find('a.global_action_link')[0].innerText;
      if (($(_0x490a78).find('a.global_action_link')[0].innerHTML == 'login' || !$(_0x490a78).find('#account_pulldown')[0]) && login_error == false) {
        var _0x3d864a = {};
        _0x3d864a.active = false;
        _0x3d864a.url = 'https://steamcommunity.com/';
        chrome.tabs.create(_0x3d864a);
        login_error_cnt++;
        if (login_error_cnt < 3) {
          return;
        }
        login_error = true;
        if (telegram_alert_logout) {
          sendMsgTelegramBot('Logout');
        }
        if (autologInSteamAcc) {
          logInSteamAcc('SteamLogin_page_load');
        }
        return;
      } else if ($(_0x490a78).find('a.global_action_link')[0].innerHTML == 'login' || !$(_0x490a78).find('#account_pulldown')[0]) {
        if (autologInSteamAcc) {
          logInSteamAcc('SteamLogin_page_load');
        }
        return;
      } else if (login_error && autologInSteamAcc) {
        var _0x4601b2 = {};
        _0x4601b2.url = 'https://steamcommunity.com/';
        _0x4601b2.name = 'sessionid';
        chrome.cookies.get(_0x4601b2, function (_0x5899f3) {
          sessionid = _0x5899f3.value;
        });
        if (telegram_alert_login) {
          sendMsgTelegramBot('Log in success');
        }
        openBotPage();
      }
      if (login_error_cnt > 0) {
        chrome.tabs.query({ url: 'https://steamcommunity.com/' }, function (_0x40c706) {
          _0x40c706.forEach(_0x16ed4a => {
            chrome.tabs.remove(_0x16ed4a.id);
          });
        });
      }
      login_error = false;
      login_error_cnt = 0;
      accID = _0x490a78.substring(_0x490a78.indexOf('g_steamID') + 13, _0x490a78.indexOf(';', _0x490a78.indexOf('g_steamID')) - 1);
      let _0x1f6bd0 = JSON.parse(_0x490a78.match(/{"wallet_currency"[0-9a-zA-Z,-_"]+}/)[0]);
      balance = round(_0x1f6bd0.wallet_balance / 100);
      document.getElementById('balance').innerText = format(balance);
      if (stats_balance == undefined) {
        stats_balance = balance;
      }
      if (percentSlivBalance != '' & hourForStats != '') {
        if (100 - balance * 100 / stats_balance > percentSlivBalance) {
          let _0x1b1e6b = 'Защита от слива баланса\nУдаляю все заказы\nНачальный баланс: ' + stats_balance + '\nТекущий баланс: ' + balance + '\nРазница: ' + round(balance - stats_balance) + '\nПроцент: ' + round(100 - balance * 100 / stats_balance);
          stats_balance = balance;
          var _0x5004fe = [];
          items.forEach(_0x510a16 => {
            _0x510a16.b_on = 0;
            if (_0x510a16.group_settings.dontDeleteOrders != 1) {
              if (_0x510a16.buyorderid != '') {
                let _0x5ee1c2 = {};
                _0x5ee1c2.name = _0x510a16.name;
                _0x5ee1c2.appid = _0x510a16.appid;
                _0x5ee1c2.buyorderid = _0x510a16.buyorderid;
                _0x5ee1c2.b_summ = _0x510a16.b_summ;
                _0x5ee1c2.item_nameid = _0x510a16.item_nameid;
                _0x5004fe.push(_0x5ee1c2);
              }
            }
          });
          cancelBuyOrder(_0x5004fe, 0);
          let _0x25016a = 'update item set b_on = 0';
          db.transaction(function (_0x41a20) {
            _0x41a20.executeSql('update item set b_on = 0', [], function () {
            }, function (_0x559264, _0x415d6f) {
              logSQLError('update item set b_on = 0', _0x415d6f);
            });
          });
          turnAllOrdersOnTime = '';
          $('#turnAllOrdersOnTime')[0].value = '';
          var _0x48e3e0 = {};
          _0x48e3e0.turnAllOrdersOnTime = turnAllOrdersOnTime;
          chrome.storage.sync.set(_0x48e3e0);
          if (telegram_alert_SlivBalance) {
            sendMsgTelegramBot(_0x1b1e6b);
          }
        }
      }
    }).fail(function (_0x3ba58f) {
      log('STEAM ERROR: Не могу получить баланс');
      if (_0x3ba58f.status == 429) {
        logMicroBan();
      }
    });
  }
  function startTimerGetItemsOnSale() {
    timerGetItemsOnSaleWorking_cnt++;
    if (!timerGetItemsOnSaleWorking || timerGetItemsOnSaleWorking_cnt > 60) {
      timerGetItemsOnSaleWorking_cnt = 0;
      timerGetItemsOnSaleWorking = true;
      getMyListings();
    }
  }
  function startTimerSellInventory() {
    timerSellInventoryWorking_cnt++;
    if (!timerSellInventoryWorking || timerSellInventoryWorking_cnt > 10) {
      timerSellInventoryWorking_cnt = 0;
      timerSellInventoryWorking = true;
      var _0x3b3413 = new Date();
      var _0x315ea7 = String(_0x3b3413.getHours()).padStart(2, '0') + ':' + String(_0x3b3413.getMinutes()).padStart(2, '0');
      document.getElementById('sellInventoryRefreshTimeLable').innerHTML = _0x315ea7;
      getInventory('');
    }
  }
  function startTimerGetOrders() {
    orders = [];
    getBuyOrders();
  }
  function startTimerCheckActualPrices() {
    var _0x297d29 = [];
    for (var _0x2f07b1 = 0; _0x2f07b1 < items.length; _0x2f07b1++) {
      if (items[_0x2f07b1].order_cnt > 0) {
        _0x297d29.push(items[_0x2f07b1]);
      }
    }
    analyzeOrders(_0x297d29, 0, 'a', 'CheckActualPrices');
  }
  function runSQLinsert(_0x4305b3, _0x21a920, _0x3bbfa6, _0x47e41e, _0x3cb294, _0x5c5763) {
    var _0x354d52;
    switch (Number(_0x3bbfa6)) {
      case 433850:
        _0x354d52 = 1;
        break;
      case 322330:
        _0x354d52 = 1;
        break;
      case 753:
        _0x354d52 = 6;
        break;
      default:
        _0x354d52 = 2;
        break;
    }
    str = 'insert into item (name, type, sort, url, market_hash_name, b_min, filter, item_nameid, buy_type, appid, contextid, id_group, b_cnt, b_summ, b_on, s_summ, s_on, publisher_fee_percent, min_float, max_float)';
    str += ' values ("' + _0x21a920 + '", "' + _0x3cb294 + '", "", "' + _0x5c5763 + '", "' + _0x4305b3 + '", 0, "", ' + _0x47e41e + ', ' + _0x354d52 + ', ' + _0x3bbfa6 + ', ' + _0x354d52 + ', 0,0,0,0,0,0,10,1,0)';
    db.transaction(function (_0xeea135) {
      _0xeea135.executeSql(str, [], function (_0x5200ae, _0x77b0a6) {
        log(_0x21a920 + ' добавлен в базу');
        var _0x24d55 = {};
        _0x24d55.name = _0x4305b3;
        _0x24d55.name_real = _0x21a920;
        _0x24d55.item_nameid = Number(_0x47e41e);
        _0x24d55.appid = _0x3bbfa6;
        _0x24d55.url = _0x5c5763;
        _0x24d55.b_summ = 0;
        _0x24d55.s_summ = 0;
        _0x24d55.s_summ_steam = 0;
        _0x24d55.priceOnSale = '';
        _0x24d55.min_float = 0;
        _0x24d55.max_float = 1;
        _0x24d55.contextid = _0x354d52;
        _0x24d55.b_cnt = 0;
        _0x24d55.b_on = 0;
        _0x24d55.s_on = 0;
        _0x24d55.id_group = 0;
        _0x24d55.name_group = 0;
        _0x24d55.on_sale_cnt = '';
        _0x24d55.on_sale_cnt_stcrs = '';
        _0x24d55.order_cnt = '';
        _0x24d55.buyorderid = 0;
        _0x24d55.priceHistory = null;
        _0x24d55.order_date = '';
        _0x24d55.resale_cnt = 0;
        _0x24d55.checked = false;
        _0x24d55.removeIds = [];
        _0x24d55.inv_cnt = 0;
        _0x24d55.cntSalesDay = '';
        var _0xf54313 = {};
        _0xf54313.profitPercent = '';
        _0xf54313.minProfit = '';
        _0xf54313.profitPercent_min = '';
        _0xf54313.countDayHistoryGraph = '';
        _0xf54313.percentLimit = '';
        _0xf54313.algoritm = '';
        _0xf54313.algoritm_buy = '';
        _0xf54313.orderPercent = '';
        _0xf54313.ordersPlace = '';
        _0xf54313.cancelOrderIfLow = '';
        _0xf54313.dontDeleteOrders = '';
        _0xf54313.cntSalesMonth = '';
        _0xf54313.listingPlace = '';
        _0xf54313.monthTrend = '';
        _0xf54313.monthTrend_up = '';
        _0xf54313.weekTrend = '';
        _0xf54313.weekTrend_up = '';
        _0xf54313.dayTrend = '';
        _0xf54313.dayTrend_up = '';
        _0xf54313.alg_sell_qoeff = '';
        _0xf54313.alg_buy_qoeff = '';
        _0x24d55.group_settings = _0xf54313;
        items.push(_0x24d55);
        _0x1177f8();
      }, function (_0x3987ac, _0xb4ad20) {
        logSQLError(str, _0xb4ad20);
      });
    });
  }
  function runSQLupdate(_0x4471e3, _0x13091c, _0xbf04bd) {
    let _0x268ddb = 'update item set ' + _0x4471e3 + ' = ' + _0x13091c + ' where appid || market_hash_name = "' + _0xbf04bd + '"';
    db.transaction(function (_0x5718a6) {
      _0x5718a6.executeSql(_0x268ddb, [], function () {
        a = 1;
      }, function (_0x5de0db, _0x478836) {
        logSQLError(_0x268ddb, _0x478836);
      });
    });
  }
  chrome.runtime.onMessage.addListener(function (_0x414a18, _0x4a428e) {
    switch (_0x414a18.type) {
      case 'listings_del':
        var _0x49a4ce = [];
        var _0x15e3c3 = [];
        _0x49a4ce.push(_0x414a18.message);
        deleteItems(_0x49a4ce, _0x15e3c3, 0);
        break;
      case 'listings':
        db.transaction(function (_0x435b6c) {
          var _0x317df8 = 'select * from item where market_hash_name = "' + _0x414a18.name + '" and appid = "' + _0x414a18.appid + '"';
          _0x435b6c.executeSql(_0x317df8, [], function (_0x222eac, _0x1ef1db) {
            if (_0x1ef1db.rows.length == 0) {
              runSQLinsert(_0x414a18.name.replace('  ', ' '), _0x414a18.name, _0x414a18.appid, _0x414a18.item_nameid, _0x414a18.item_type, _0x414a18.url);
            }
          }, function (_0x5c910e, _0x40017d) {
            logSQLError(_0x317df8, _0x40017d);
          });
        });
        break;
      case 'findItemInItems':
        var _0x5b7fa5 = items.map(function (_0x282847) {
          return _0x282847.appid + _0x282847.name;
        }).indexOf(_0x414a18.message);
        if (_0x5b7fa5 == -1) {
          chrome.tabs.sendMessage(_0x4a428e.tab.id, {
            found: false,
            type: 'false'
          });
        } else {
          chrome.tabs.sendMessage(_0x4a428e.tab.id, {
            found: true,
            type: 'true',
            b_cnt: items[_0x5b7fa5].b_cnt,
            b_on: items[_0x5b7fa5].b_on,
            b_summ: items[_0x5b7fa5].b_summ,
            s_summ: items[_0x5b7fa5].s_summ,
            s_summ_steam: items[_0x5b7fa5].s_summ_steam,
            s_on: items[_0x5b7fa5].s_on
          });
        }
        break;
      case 'removeFromSale':
        log(_0x414a18.message);
        break;
      case 'removeFromSaleEnded':
        log('Удаление с продажи завершено');
        break;
      case 'edit_b_summ':
        var _0x4da5a0 = items.map(function (_0x165cba) {
          return _0x165cba.appid + _0x165cba.name;
        }).indexOf(_0x414a18.message);
        if (_0x4da5a0 != -1) {
          $('#b_summ_' + _0x4da5a0)[0].value = _0x414a18.num;
          var _0x5356ec = round(_0x414a18.num * 100);
          items[_0x4da5a0].b_summ = _0x5356ec;
          runSQLupdate('b_summ', _0x5356ec, items[_0x4da5a0].appid + items[_0x4da5a0].name);
        }
        break;
      case 'edit_s_summ':
        var _0x4da5a0 = items.map(function (_0x498a50) {
          return _0x498a50.appid + _0x498a50.name;
        }).indexOf(_0x414a18.message);
        if (_0x4da5a0 != -1) {
          $('#s_summ_' + _0x4da5a0)[0].value = _0x414a18.num;
          var _0x5356ec = round(_0x414a18.num * 100);
          items[_0x4da5a0].s_summ = _0x5356ec;
          var _0xd341f2 = getBuyerPays(_0x5356ec);
          items[_0x4da5a0].s_summ_steam = _0xd341f2;
          $('#s_summ_steam_' + _0x4da5a0)[0].value = round(_0xd341f2 / 100);
          runSQLupdate('s_summ', _0x5356ec, items[_0x4da5a0].appid + items[_0x4da5a0].name);
        }
        break;
      case 'edit_b_cnt':
        var _0x4da5a0 = items.map(function (_0x43dae5) {
          return _0x43dae5.appid + _0x43dae5.name;
        }).indexOf(_0x414a18.message);
        if (_0x4da5a0 != -1) {
          $('#b_cnt_' + _0x4da5a0)[0].value = _0x414a18.num;
          items[_0x4da5a0].b_cnt = _0x414a18.num;
          runSQLupdate('b_cnt', _0x414a18.num, items[_0x4da5a0].appid + items[_0x4da5a0].name);
        }
        break;
      case 'edit_b_on':
        var _0x4da5a0 = items.map(function (_0x3a6177) {
          return _0x3a6177.appid + _0x3a6177.name;
        }).indexOf(_0x414a18.message);
        if (_0x4da5a0 != -1) {
          $('#b_on_' + _0x4da5a0)[0].checked = _0x414a18.b_on;
          items[_0x4da5a0].b_on = _0x414a18.b_on;
          runSQLupdate('b_on', _0x414a18.b_on, items[_0x4da5a0].appid + items[_0x4da5a0].name);
        }
        break;
      case 'edit_s_on':
        var _0x4da5a0 = items.map(function (_0x36e078) {
          return _0x36e078.appid + _0x36e078.name;
        }).indexOf(_0x414a18.message);
        if (_0x4da5a0 != -1) {
          $('#s_on_' + _0x4da5a0)[0].checked = _0x414a18.s_on;
          items[_0x4da5a0].s_on = _0x414a18.s_on;
          runSQLupdate('s_on', _0x414a18.s_on, items[_0x4da5a0].appid + items[_0x4da5a0].name);
        }
        break;
      case 'edit_s_summ_steam':
        var _0x4da5a0 = items.map(function (_0x522566) {
          return _0x522566.appid + _0x522566.name;
        }).indexOf(_0x414a18.message);
        if (_0x4da5a0 != -1) {
          var _0x5a32fd = getSteamFee(_0x414a18.num);
          var _0x5356ec = getBuyerPays(_0x5a32fd);
          items[_0x4da5a0].s_summ_steam = round(_0x5356ec * 100);
          items[_0x4da5a0].s_summ = round(_0x5a32fd * 100);
          runSQLupdate('s_summ', round(_0x5a32fd * 100), items[_0x4da5a0].appid + items[_0x4da5a0].name);
          $('#s_summ_' + _0x4da5a0)[0].value = _0x5a32fd;
          $('#s_summ_steam_' + _0x4da5a0)[0].value = _0x5356ec;
        }
        break;
      case 'STEparse_add_to_base':
        let _0x5490a7 = [];
        _0x414a18.items.forEach(_0x1cdf11 => {
          let _0x441512 = items.map(function (_0x2209b0) {
            return _0x2209b0.appid + _0x2209b0.name;
          }).indexOf(_0x1cdf11.appid + _0x1cdf11.name);
          if (_0x441512 == -1) {
            _0x5490a7.push(_0x1cdf11);
          }
        });
        addItems(_0x5490a7, 0, 'STEparse');
        break;
      case 'STEparse_ended':
        log('Загрузка завершена', '', 'log_parser');
        break;
      case 'SteamLogin_checkCode_IncorrectCode':
        if (autologInSteamAcc) {
          logInSteamAcc('IncorrectCode');
        }
        break;
      case 'SteamLogin_page_load':
        if (autologInSteamAcc) {
          logInSteamAcc('SteamLogin_page_load');
        }
        break;
    }
  });
  function deleteItems(_0x269d81, _0x14e3d8, _0x155214) {
    if (_0x269d81.length == 0) {
      deleteGroups(_0x14e3d8, 0);
      return;
    }
    let _0x234237 = 'delete from item where appid || market_hash_name in (';
    _0x269d81.forEach(_0x50c8fc => {
      _0x234237 += '"' + _0x50c8fc + '",';
    });
    _0x234237 = _0x234237.substring(0, _0x234237.length - 1) + ')';
    db.transaction(function (_0x11b421) {
      _0x11b421.executeSql(_0x234237, [], function () {
        _0x269d81.forEach(_0x45edb3 => {
          let _0x35f765 = items.map(function (_0x52a026) {
            return _0x52a026.appid + _0x52a026.name;
          }).indexOf(_0x45edb3);
          items.splice(_0x35f765, 1);
        });
        deleteGroups(_0x14e3d8, 0);
      }, function (_0x351e0f, _0x47e101) {
        logSQLError(_0x234237, _0x47e101);
      });
    });
  }
  function deleteGroups(_0x5b1361, _0x10d61c) {
    if (_0x10d61c < _0x5b1361.length) {
      var _0x256c69 = 'update item set id_group = 0 where id_group = (select id from "group" where id = ' + _0x5b1361[_0x10d61c] + ')';
      db.transaction(function (_0x1bfd47) {
        _0x1bfd47.executeSql(_0x256c69, [], function () {
          for (var _0x45f975 = 0; _0x45f975 < items.length; _0x45f975++) {
            if (items[_0x45f975].id_group == _0x5b1361[_0x10d61c]) {
              items[_0x45f975].id_group = 0;
              items[_0x45f975].name_group = 0;
            }
          }
          _0x256c69 = 'delete from "group" where id = "' + _0x5b1361[_0x10d61c] + '"';
          db.transaction(function (_0x1b6c3a) {
            _0x1b6c3a.executeSql(_0x256c69, [], function () {
              t = groups.map(function (_0x31f31d) {
                return _0x31f31d.id;
              }).indexOf(_0x5b1361[_0x10d61c]);
              if (t != -1) {
                groups.splice(t, 1);
              }
              deleteGroups(_0x5b1361, _0x10d61c + 1);
            }, function (_0x1042fe, _0x5ab97e) {
              logSQLError(_0x256c69, _0x5ab97e);
            });
          });
        }, function (_0x237259, _0x4a1ad0) {
          logSQLError(_0x256c69, _0x4a1ad0);
        });
      });
    } else {
      _0x1177f8();
      findCheckedItemsCnt();
    }
  }
  function addItemsToGroup(_0x455eae, _0x393497, _0x56afa4) {
    if (_0x455eae.length == 0) {
      findCheckedItemsCnt();
      return;
    }
    let _0x2186d7 = 'update item set id_group = ' + _0x393497 + ' where appid || market_hash_name in (';
    _0x455eae.forEach(_0xdeaba4 => {
      _0x2186d7 += '"' + _0xdeaba4 + '",';
    });
    _0x2186d7 = _0x2186d7.substring(0, _0x2186d7.length - 1) + ')';
    db.transaction(function (_0x27b4a0) {
      _0x27b4a0.executeSql(_0x2186d7, [], function () {
        _0x455eae.forEach(_0xed96f7 => {
          t = items.map(function (_0x27ede9) {
            return _0x27ede9.appid + _0x27ede9.name;
          }).indexOf(_0xed96f7);
          let _0x33bc50 = groups.map(function (_0x2560f3) {
            return _0x2560f3.id;
          }).indexOf(_0x393497);
          if (t != -1 && _0x33bc50 != -1) {
            items[t].id_group = _0x393497;
            items[t].name_group = groups[_0x33bc50].name;
            items[t].checked = false;
            group_settings.forEach(_0x2649e3 => {
              if (_0x2649e3.group_id == _0x393497) {
                items[t].group_settings = _0x2649e3;
              }
            });
          }
        });
        if (_0x56afa4) {
          _0x1177f8();
          findCheckedItemsCnt();
        }
      }, function (_0x330ba1, _0x4f5656) {
        logSQLError(_0x2186d7, _0x4f5656);
      });
    });
  }
  function turnItemOnWork(_0x294fda, _0x2eb610, _0x17420d, _0x5a961b) {
    if (_0x17420d < _0x294fda.length) {
      if (_0x2eb610) {
        str = 'update item set b_on = 1 where appid || market_hash_name = "' + (_0x294fda[_0x17420d].appid + _0x294fda[_0x17420d].name) + '"';
      } else {
        str = 'update item set b_on = 0 where appid ||  market_hash_name = "' + (_0x294fda[_0x17420d].appid + _0x294fda[_0x17420d].name) + '"';
      }
      db.transaction(function (_0x4f8902) {
        _0x4f8902.executeSql(str, [], function (_0x24b3d2, _0x4cd6eb) {
          let _0x59efa3 = items.map(function (_0x55ada9) {
            return _0x55ada9.appid + _0x55ada9.name;
          }).indexOf(_0x294fda[_0x17420d].appid + _0x294fda[_0x17420d].name);
          if (_0x59efa3 != -1) {
            if (_0x2eb610) {
              items[_0x59efa3].b_on = 1;
            } else {
              items[_0x59efa3].b_on = 0;
            }
          }
          setTimeout(function () {
            turnItemOnWork(_0x294fda, _0x2eb610, _0x17420d + 1, _0x5a961b);
          }, 0);
        }, function (_0x2cb32d, _0x4bb571) {
          logSQLError(str, _0x4bb571);
        });
      });
    } else {
      switch (_0x5a961b) {
        case 'auto':
          break;
        default:
          _0x1177f8();
          break;
      }
    }
  }
  function analyzeOrders(_0x321b49, _0x3dc26c, _0x425b61, _0xbffd80) {
    if (!working && _0xbffd80 != 'button') {
      deleteProgressBar('analyzeOrders');
      return;
    }
    if (_0x3dc26c == 0) {
      createProgressBar('analyzeOrders', 'Анализ предметов', _0x321b49.length - 1);
    }
    if (_0x3dc26c < _0x321b49.length) {
      updateProgressBar('analyzeOrders', _0x3dc26c);
      if (_0x425b61 == 'a') {
        log(_0x321b49.length + ' / ' + Number(_0x3dc26c + 1));
      }
      var _0xd84ab3 = _0x321b49[_0x3dc26c].group_settings;
      var _0x618865 = _0x321b49[_0x3dc26c].group_settings.profitPercent == '' ? profitPercent : _0x321b49[_0x3dc26c].group_settings.profitPercent;
      var _0xfeca95 = _0x321b49[_0x3dc26c].group_settings.minProfit == '' ? minProfit : _0x321b49[_0x3dc26c].group_settings.minProfit;
      var _0x21aa53 = _0x321b49[_0x3dc26c].group_settings.profitPercent_min == '' ? profitPercent_min : _0x321b49[_0x3dc26c].group_settings.profitPercent_min;
      var _0x467c3b = _0x321b49[_0x3dc26c].group_settings.countDayHistoryGraph == '' ? countDayHistoryGraph : _0x321b49[_0x3dc26c].group_settings.countDayHistoryGraph;
      var _0x3892d0 = _0x321b49[_0x3dc26c].group_settings.percentLimit == '' ? percentLimit : _0x321b49[_0x3dc26c].group_settings.percentLimit;
      var _0xa5943e = _0x321b49[_0x3dc26c].group_settings.algoritm == '' ? algoritm : _0x321b49[_0x3dc26c].group_settings.algoritm;
      var _0x22f018 = _0x321b49[_0x3dc26c].group_settings.algoritm_buy == '' ? algoritm_buy : _0x321b49[_0x3dc26c].group_settings.algoritm_buy;
      var _0x1a5b85 = _0x321b49[_0x3dc26c].group_settings.orderPercent == '' ? orderPercent : _0x321b49[_0x3dc26c].group_settings.orderPercent;
      var _0x10252d = _0x321b49[_0x3dc26c].group_settings.ordersPlace == '' ? ordersPlace : _0x321b49[_0x3dc26c].group_settings.ordersPlace;
      var _0xc43acb = _0x321b49[_0x3dc26c].group_settings.cntSalesMonth == '' ? cntSalesMonth : _0x321b49[_0x3dc26c].group_settings.cntSalesMonth;
      var _0x513967 = _0x321b49[_0x3dc26c].group_settings.listingPlace == '' ? listingPlace : _0x321b49[_0x3dc26c].group_settings.listingPlace;
      var _0x57ca3a = _0x321b49[_0x3dc26c].group_settings.monthTrend == '' ? monthTrend : _0x321b49[_0x3dc26c].group_settings.monthTrend;
      var _0x1843c5 = _0x321b49[_0x3dc26c].group_settings.monthTrend_up == '' ? monthTrend_up : _0x321b49[_0x3dc26c].group_settings.monthTrend_up;
      var _0x630089 = _0x321b49[_0x3dc26c].group_settings.weekTrend == '' ? weekTrend : _0x321b49[_0x3dc26c].group_settings.weekTrend;
      var _0x3b564e = _0x321b49[_0x3dc26c].group_settings.weekTrend_up == '' ? weekTrend_up : _0x321b49[_0x3dc26c].group_settings.weekTrend_up;
      var _0x19c4c8 = _0x321b49[_0x3dc26c].group_settings.dayTrend == '' ? dayTrend : _0x321b49[_0x3dc26c].group_settings.dayTrend;
      var _0x5e08d1 = _0x321b49[_0x3dc26c].group_settings.dayTrend_up == '' ? dayTrend_up : _0x321b49[_0x3dc26c].group_settings.dayTrend_up;
      var _0x2f3e38 = _0x321b49[_0x3dc26c].group_settings.alg_buy_qoeff == '' ? alg_buy_qoeff : _0x321b49[_0x3dc26c].group_settings.alg_buy_qoeff;
      var _0x4ebd6f = _0x321b49[_0x3dc26c].group_settings.alg_sell_qoeff == '' ? alg_sell_qoeff : _0x321b49[_0x3dc26c].group_settings.alg_sell_qoeff;
      switch (_0x425b61) {
        case 'a':
          let _0x418408;
          if (_0x321b49[_0x3dc26c].name.indexOf('&') != -1) {
            _0x418408 = encodeURIComponent(_0x321b49[_0x3dc26c].name);
          } else {
            _0x418408 = encodeURI(_0x321b49[_0x3dc26c].name);
          }
          let _0x4f277f = 'https://steamcommunity.com/market/pricehistory?country=US&currency=' + currency.id + '&appid=' + _0x321b49[_0x3dc26c].appid + '&market_hash_name=' + _0x418408;
          $.ajax({
            url: _0x4f277f,
            dataType: 'json',
            type: 'get',
            async: true,
            cache: false,
            success: function (_0x4e891d) {
              if (_0x4e891d.price_prefix == '$' && currency.id != 1) {
                analyzeOrders(_0x321b49, _0x3dc26c, 'a', _0xbffd80);
                return;
              }
              _0x321b49[_0x3dc26c].priceHistory = _0x4e891d.prices;
                
  
              convertPriceHistory(_0x321b49[_0x3dc26c]);
              let _0x7e3e53 = JSON.stringify(_0x321b49[_0x3dc26c]);
              let _0x50b0e6 = JSON.stringify(currency.id);
              let _0x5bfb4b = JSON.stringify(_0x618865);
              let _0x4cbd60 = JSON.stringify(_0xfeca95);
              let _0x12a0e9 = JSON.stringify(balance);
              let _0x1af362 = JSON.stringify(_0x467c3b);
              let _0x5eece6 = JSON.stringify(_0x3892d0);
              let _0x12855c = JSON.stringify(accID);
              let _0x5361e6 = '"расчет предмета"';
              let _0x346b65 = JSON.stringify(new Date());
              let _0x5c44e0 = JSON.stringify(guid_calc);
              let _0x2abc1f = JSON.stringify(secretkey);
              $.ajax({
                url: servers[server],
                type: 'post',
                dataType: 'json',
                cache: false,
                data: {
                  item: _0x7e3e53,
                  c: _0x50b0e6,
                  countDayHistoryGraph: _0x1af362,
                  percentLimit: _0x5eece6,
                  profitPercent: _0x5bfb4b,
                  b: _0x12a0e9,
                  minProfit: _0x4cbd60,
                  steamid: _0x12855c,
                  logAction: '"расчет предмета"',
                  logDate: _0x346b65,
                  secretkey: _0x2abc1f,
                  id: _0x5c44e0,
                  p: 'calc',
                  version: '"1.55"'
                },
                success: function (_0x2ba55b) {
                  if (_0x2ba55b == 'g') {
                    log('перезапустите бота');
                    return;
                  }
                  if (_0x2ba55b == 'version') {
                    log('<div class="alert_icon"></div>Инструкция по обновлению, список изменений и ссылка на обновление доступны по адресу: <br><a target="blank" href="https://stetrade.ru/lk/services/ste-pro/">https://stetrade.ru/lk/services/ste-pro/</a>', 'err_msg');
                    log('<div class="alert_icon"></div>Версия бота не совпадает с версией сервера');
                    return;
                  }
                  if (_0x2ba55b == 'nolic') {
                    log('У вас нет доступа к про версии');
                    return;
                  }
                  if (_0x2ba55b[2] == undefined || _0x2ba55b[2] != 'OK') {
                    log(getLinkItem(_0x321b49[_0x3dc26c]) + ' Не могу вычислить цену предмета');
                    setTimeout(function () {
                      analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
                    }, query_delay);
                    return;
                  }
                  _0x321b49[_0x3dc26c] = _0x2ba55b[1];
                  guid_calc = _0x2ba55b[0];
                  setTimeout(function () {
                    analyzeOrders(_0x321b49, _0x3dc26c, 'b', _0xbffd80);
                  }, query_delay);
                },
                error: function () {
                  log(getLinkItem(_0x321b49[_0x3dc26c]) + ' Не могу вычислить цену предмета');
                  setTimeout(function () {
                    analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
                  }, query_delay);
                }
              });
            },
            error: function () {
              log(_0x321b49[_0x3dc26c].name + ' STEAM EROR Загрузка истории цен');
              setTimeout(function () {
                analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
              }, query_delay);
            }
          });
          break;
        case 'b':
          if (showItemsCntSalesDay) {
            let _0x29becb = items.map(function (_0x5524dc) {
              return _0x5524dc.appid + _0x5524dc.name;
            }).indexOf(_0x321b49[_0x3dc26c].appid + _0x321b49[_0x3dc26c].name);
            if (_0x29becb != -1) {
              items[_0x29becb].cntSalesDay = _0x321b49[_0x3dc26c].countSalesMonth;
              $('#cntSalesDay_' + _0x29becb)[0].innerHTML = _0x321b49[_0x3dc26c].countSalesMonth;
            }
          }
          if (_0xbffd80 == 'calc_cntSalesDay' || _0xbffd80 == 'calc_CurKoefOrder') {
            analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
            return;
          }
          let _0xd41f57;
          switch (_0xa5943e) {
            case 'HG':
              _0x321b49[_0x3dc26c].s_summ = round(_0x321b49[_0x3dc26c].HGsellPrice * 100);
              break;
            case 'HSG':
              _0x321b49[_0x3dc26c].s_summ = round(_0x321b49[_0x3dc26c].H2sellPrice * 100);
              break;
            case 'AVG':
              _0x321b49[_0x3dc26c].s_summ = round(_0x321b49[_0x3dc26c].AVsellPrice * 100);
              break;
            case 'LG':
              _0x321b49[_0x3dc26c].s_summ = round(_0x321b49[_0x3dc26c].LGsellPrice * 100);
              break;
            case 'BG':
              _0x321b49[_0x3dc26c].s_summ = round(_0x321b49[_0x3dc26c].BGsellPrice * 100);
              break;
          }
          switch (_0x22f018) {
            case 'HG':
              _0x321b49[_0x3dc26c].b_summ = round(_0x321b49[_0x3dc26c].HGbuyPrice * 100);
              _0xd41f57 = round(_0x321b49[_0x3dc26c].HGsellPrice * 100);
              break;
            case 'HSG':
              _0x321b49[_0x3dc26c].b_summ = round(_0x321b49[_0x3dc26c].H2buyPrice * 100);
              _0xd41f57 = round(_0x321b49[_0x3dc26c].H2sellPrice * 100);
              break;
            case 'AVG':
              _0x321b49[_0x3dc26c].b_summ = round(_0x321b49[_0x3dc26c].AVbuyPrice * 100);
              _0xd41f57 = round(_0x321b49[_0x3dc26c].AVsellPrice * 100);
              break;
            case 'LG':
              _0x321b49[_0x3dc26c].b_summ = round(_0x321b49[_0x3dc26c].LGbuyPrice * 100);
              _0xd41f57 = round(_0x321b49[_0x3dc26c].LGsellPrice * 100);
              break;
            case 'BG':
              _0x321b49[_0x3dc26c].b_summ = round(_0x321b49[_0x3dc26c].BGbuyPrice * 100);
              _0xd41f57 = round(_0x321b49[_0x3dc26c].BGsellPrice * 100);
              break;
          }
          _0x321b49[_0x3dc26c].s_summ = Math.round(_0x321b49[_0x3dc26c].s_summ * _0x4ebd6f);
          _0x321b49[_0x3dc26c].b_summ = Math.round(_0x321b49[_0x3dc26c].b_summ * _0x2f3e38);
          _0xd41f57 = Math.round(_0xd41f57 * _0x4ebd6f);
          if (_0xbffd80 == 'checkLowProfit') {
            let _0x3aa87f = items.map(function (_0x26cef9) {
              return _0x26cef9.appid + _0x26cef9.name;
            }).indexOf(_0x321b49[_0x3dc26c].appid + _0x321b49[_0x3dc26c].name);
            if (_0x3aa87f == -1 || items[_0x3aa87f].s_summ == (checkLowProfitUpdatePriceAlgoritm == 'sell' ? _0x321b49[_0x3dc26c].s_summ : _0xd41f57)) {
              analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
              return;
            }
            let _0x426fbe = [];
            let _0x82bb66 = (checkLowProfitDeleteOrderAlgoritm == 'sell' ? _0x321b49[_0x3dc26c].s_summ : _0xd41f57) - items[_0x3aa87f].b_summ;
            if (_0x21aa53 * items[_0x3aa87f].b_summ / 100 > _0xfeca95 * 100) {
              _0xfeca95 = _0x21aa53 * items[_0x3aa87f].b_summ / 100;
            } else {
              _0xfeca95 = _0xfeca95 * 100;
            }
            if (items[_0x3aa87f].s_summ - (checkLowProfitUpdatePriceAlgoritm == 'sell' ? _0x321b49[_0x3dc26c].s_summ : _0xd41f57) < 0) {
              _0x321b49[_0x3dc26c].b_summ = items[_0x3aa87f].b_summ;
              _0x426fbe.push(_0x321b49[_0x3dc26c]);
              log(getLinkItem(items[_0x3aa87f]) + ' Цена продажи изменилась: ' + round(items[_0x3aa87f].s_summ / 100) + ' => ' + round((checkLowProfitUpdatePriceAlgoritm == 'sell' ? _0x321b49[_0x3dc26c].s_summ : _0xd41f57) / 100));
            } else if (_0x82bb66 < _0xfeca95) {
              _0x426fbe.push(_0x321b49[_0x3dc26c]);
              let _0x217302 = {};
              let _0x121a51 = [];
              _0x217302.name = items[_0x3aa87f].name;
              _0x217302.appid = items[_0x3aa87f].appid;
              _0x217302.buyorderid = items[_0x3aa87f].buyorderid;
              _0x217302.b_summ = items[_0x3aa87f].b_summ;
              _0x121a51.push(_0x217302);
              log(getLinkItem(items[_0x3aa87f]) + ' Цена продажи изменилась: ' + round(items[_0x3aa87f].s_summ / 100) + ' => ' + round((checkLowProfitDeleteOrderAlgoritm == 'sell' ? _0x321b49[_0x3dc26c].s_summ : _0xd41f57) / 100));
              if (items[_0x3aa87f].group_settings.dontDeleteOrders != 1) {
                cancelBuyOrder(_0x121a51, 0);
              }
            } else {
              _0x321b49[_0x3dc26c].b_summ = items[_0x3aa87f].b_summ;
              _0x426fbe.push(_0x321b49[_0x3dc26c]);
              log(getLinkItem(items[_0x3aa87f]) + ' Цена продажи изменилась: ' + round(items[_0x3aa87f].s_summ / 100) + ' => ' + round((checkLowProfitUpdatePriceAlgoritm == 'sell' ? _0x321b49[_0x3dc26c].s_summ : _0xd41f57) / 100));
            }
            updateItemsBuySellPrices(_0x426fbe, 0);
            analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
            return;
          }
          var _0x396632 = round(_0x321b49[_0x3dc26c].monthTrend[0] * 100 / _0x321b49[_0x3dc26c].monthTrend[_0x321b49[_0x3dc26c].monthTrend.length - 1]);
          var _0x274c8c = round(_0x321b49[_0x3dc26c].monthTrend[0] * 100 / (_0x321b49[_0x3dc26c].monthTrend[6] == undefined ? 1 : _0x321b49[_0x3dc26c].monthTrend[6]));
          var _0xe0a5f1 = round(_0x321b49[_0x3dc26c].dayTrend[0] * 100 / _0x321b49[_0x3dc26c].dayTrend[1]);
          if ((100 - _0x396632 <= _0x57ca3a || _0x57ca3a == 0) && (_0x396632 - 100 <= _0x1843c5 || _0x1843c5 == 0)) {
            if ((100 - _0x274c8c <= _0x630089 || _0x630089 == 0) && (_0x274c8c - 100 <= _0x3b564e || _0x3b564e == 0)) {
              if ((100 - _0xe0a5f1 <= _0x19c4c8 || _0x19c4c8 == 0) && (_0xe0a5f1 - 100 <= _0x5e08d1 || _0x5e08d1 == 0)) {
                if (_0x321b49[_0x3dc26c].countSalesMonth >= _0xc43acb || _0xc43acb == 0) {
                  let _0x47a0bb = 'https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=' + currency.id + '&item_nameid=' + _0x321b49[_0x3dc26c].item_nameid + '&two_factor=0';
                  $.ajax({
                    url: _0x47a0bb,
                    dataType: 'json',
                    type: 'get',
                    async: true,
                    cache: true,
                    success: function (_0x541d58) {
                      if (_0x541d58.buy_order_graph == undefined || _0x541d58.buy_order_graph[0] == undefined || _0x541d58.buy_order_graph[0][0] == undefined) {
                        setTimeout(function () {
                          analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
                        }, query_delay);
                        if (_0xbffd80 == 'auto') {
                          let _0x3e3cee = [];
                          _0x3e3cee.push(_0x321b49[_0x3dc26c]);
                          turnItemOnWork(_0x3e3cee, false, 0, 'auto');
                        }
                        return;
                      }
                      let _0x3b1f4f = 0;
                      let _0x16cf4d = 0;
                      if (_0xa5943e == 'OG') {
                        _0x16cf4d = round(round(_0x541d58.buy_order_graph[0][0] * (100 - _0x1a5b85) / 100) * 100);
                        _0x3b1f4f = Math.round(_0x16cf4d * (1 + _0x618865 / 100)) - _0x16cf4d;
                        if (_0x3b1f4f / 100 < _0xfeca95) {
                          _0x321b49[_0x3dc26c].s_summ = _0x16cf4d + round(_0xfeca95 * 100);
                        } else {
                          _0x321b49[_0x3dc26c].s_summ = Math.round(_0x16cf4d * (1 + _0x618865 / 100));
                        }
                      }
                      if (_0x22f018 == 'OG') {
                        _0x321b49[_0x3dc26c].b_summ = round(round(_0x541d58.buy_order_graph[0][0] * (100 - _0x1a5b85) / 100) * 100);
                      }
                      if (_0x321b49[_0x3dc26c].s_summ - _0x321b49[_0x3dc26c].b_summ < _0xfeca95 * 100) {
                        _0x321b49[_0x3dc26c].b_summ = _0x321b49[_0x3dc26c].s_summ - _0xfeca95 * 100;
                      }
                      _0x321b49[_0x3dc26c].s_summ_steam = getBuyerPays(_0x321b49[_0x3dc26c].s_summ);
                      if (_0x541d58.buy_order_graph) {
                        let _0x348588 = true;
                        for (var _0x2d9884 = 0; _0x2d9884 < _0x541d58.buy_order_graph.length; _0x2d9884++) {
                          if (_0x321b49[_0x3dc26c].b_summ > round(_0x541d58.buy_order_graph[0][0] * 100) || _0x10252d == 0) {
                            _0x348588 = false;
                            break;
                          }
                          if (_0x321b49[_0x3dc26c].b_summ >= round(_0x541d58.buy_order_graph[_0x2d9884][0] * 100)) {
                            _0x348588 = false;
                            if (_0x321b49[_0x3dc26c].countSalesMonth * _0x10252d >= _0x541d58.buy_order_graph[_0x2d9884][1]) {
                              break;
                            } else {
                              log(getLinkItem(_0x321b49[_0x3dc26c]) + ' продаж в день: ' + _0x321b49[_0x3dc26c].countSalesMonth + ', место в очереди: ' + _0x541d58.buy_order_graph[_0x2d9884][1], 'filter_msg');
                              if (_0xbffd80 == 'auto') {
                                var _0x3bc871 = [];
                                _0x3bc871.push(_0x321b49[_0x3dc26c]);
                                turnItemOnWork(_0x3bc871, false, 0, 'auto');
                              }
                              setTimeout(function () {
                                analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
                              }, query_delay);
                              return;
                            }
                          }
                        }
                        if (_0x348588 && _0x22f018 != 'OG') {
                          log(getLinkItem(_0x321b49[_0x3dc26c]) + ' Цена покупки (' + round(_0x321b49[_0x3dc26c].b_summ / 100) + ') слишком низкая, нет конкурентов', 'filter_msg');
                          if (_0xbffd80 == 'auto') {
                            var _0x3bc871 = [];
                            _0x3bc871.push(_0x321b49[_0x3dc26c]);
                            turnItemOnWork(_0x3bc871, false, 0, 'auto');
                          }
                          setTimeout(function () {
                            analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
                          }, query_delay);
                          return;
                        }
                        if (listingPlace_use_percent) {
                          _0x513967 = round(_0x321b49[_0x3dc26c].countSalesMonth * _0x513967 / 100);
                        }
                        _0x348588 = true;
                        for (let _0x48209e = 0; _0x48209e < _0x541d58.sell_order_graph.length; _0x48209e++) {
                          if (_0x321b49[_0x3dc26c].s_summ_steam < _0x541d58.sell_order_graph[0][0] * 100 || _0x513967 == 0) {
                            _0x348588 = false;
                            break;
                          }
                          if (_0x321b49[_0x3dc26c].s_summ_steam <= round(_0x541d58.sell_order_graph[_0x48209e][0] * 100)) {
                            _0x348588 = false;
                            if (_0x541d58.sell_order_graph[_0x48209e][1] <= _0x513967) {
                              break;
                            } else {
                              log(getLinkItem(_0x321b49[_0x3dc26c]) + ' листинг: ' + round(_0x321b49[_0x3dc26c].s_summ_steam / 100) + ' место в очереди: ' + _0x541d58.sell_order_graph[_0x48209e][1], 'filter_msg');
                              if (_0xbffd80 == 'auto') {
                                var _0x3bc871 = [];
                                _0x3bc871.push(_0x321b49[_0x3dc26c]);
                                turnItemOnWork(_0x3bc871, false, 0, 'auto');
                              }
                              setTimeout(function () {
                                analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
                              }, query_delay);
                              return;
                            }
                          }
                        }
                        if (_0x348588) {
                          log(getLinkItem(_0x321b49[_0x3dc26c]) + ' Цена продажи (' + round(_0x321b49[_0x3dc26c].s_summ / 100) + ') слишком высокая, нет конкурентов', 'filter_msg');
                          if (_0xbffd80 == 'auto') {
                            var _0x3bc871 = [];
                            _0x3bc871.push(_0x321b49[_0x3dc26c]);
                            turnItemOnWork(_0x3bc871, false, 0, 'auto');
                          }
                          setTimeout(function () {
                            analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
                          }, query_delay);
                          return;
                        }
                        switch (_0xbffd80) {
                          case 'auto':
                            var _0x533797 = [];
                            _0x533797.push(_0x321b49[_0x3dc26c]);
                            findItemsForOrders('c', _0x533797);
                            break;
                          case 'button':
                            var _0x27fe03 = [];
                            _0x27fe03.push(_0x321b49[_0x3dc26c]);
                            addItems(_0x27fe03, 0);
                            break;
                        }
                        setTimeout(function () {
                          analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
                        }, query_delay);
                      } else {
                        setTimeout(function () {
                          analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
                        }, query_delay);
                      }
                    },
                    error: function (_0xb4fdcc) {
                      log(getLinkItem(_0x321b49[_0x3dc26c]) + ' STEAM ERROR Загрузка стакана заказов');
                      if (_0xb4fdcc.status == 429) {
                        logMicroBan(true);
                      }
                      if (_0xbffd80 == 'auto') {
                        var _0x12e6b4 = [];
                        _0x12e6b4.push(_0x321b49[_0x3dc26c]);
                        turnItemOnWork(_0x12e6b4, false, 0, 'auto');
                      }
                      setTimeout(function () {
                        analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
                      }, query_delay);
                      return;
                    }
                  });
                } else {
                  log(getLinkItem(_0x321b49[_0x3dc26c]) + ' продаж в месяц: ' + _0x321b49[_0x3dc26c].countSalesMonth, 'filter_msg');
                  if (_0xbffd80 == 'auto') {
                    var _0x40a943 = [];
                    _0x40a943.push(_0x321b49[_0x3dc26c]);
                    turnItemOnWork(_0x40a943, false, 0, 'auto');
                  }
                  setTimeout(function () {
                    analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
                  }, query_delay);
                  return;
                }
              } else {
                log(getLinkItem(_0x321b49[_0x3dc26c]) + ' тренд24: ' + _0xe0a5f1 + '%', 'filter_msg');
                if (_0xbffd80 == 'auto') {
                  var _0x40a943 = [];
                  _0x40a943.push(_0x321b49[_0x3dc26c]);
                  turnItemOnWork(_0x40a943, false, 0, 'auto');
                }
                setTimeout(function () {
                  analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
                }, query_delay);
                return;
              }
            } else {
              log(getLinkItem(_0x321b49[_0x3dc26c]) + ' недельный тренд: ' + _0x274c8c + '%', 'filter_msg');
              if (_0xbffd80 == 'auto') {
                var _0x40a943 = [];
                _0x40a943.push(_0x321b49[_0x3dc26c]);
                turnItemOnWork(_0x40a943, false, 0, 'auto');
              }
              setTimeout(function () {
                analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
              }, query_delay);
              return;
            }
          } else {
            log(getLinkItem(_0x321b49[_0x3dc26c]) + ' месячный тренд: ' + _0x396632 + '%', 'filter_msg');
            if (_0xbffd80 == 'auto') {
              var _0x40a943 = [];
              _0x40a943.push(_0x321b49[_0x3dc26c]);
              turnItemOnWork(_0x40a943, false, 0, 'auto');
            }
            setTimeout(function () {
              analyzeOrders(_0x321b49, _0x3dc26c + 1, 'a', _0xbffd80);
            }, query_delay);
            return;
          }
      }
    } else {
      deleteProgressBar('analyzeOrders');
      setTimeout(function () {
        analyzeWorking = false;
        drawItems();
      }, getOrdersRefreshTime * 1000 * 60);
      switch (_0xbffd80) {
        case 'button':
          _0x1177f8();
          if (soundNotifications) {
            var _0x529cd4 = new Audio();
            _0x529cd4.preload = 'auto';
            _0x529cd4.src = '/music/analyze_finish.mp3';
            _0x529cd4.play();
          }
          break;
        case 'CheckActualPrices':
          if (soundNotifications) {
            var _0x529cd4 = new Audio();
            _0x529cd4.preload = 'auto';
            _0x529cd4.src = '/music/analyze_finish.mp3';
            _0x529cd4.play();
          }
          break;
        case 'calc_cntSalesDay':
          break;
        case 'calc_CurKoefOrder':
          getItemsCurKoefOrder(_0x321b49, 0);
          break;
      }
    }
  }
  function updateItemsBuySellPrices(_0x27fe81, _0x477241, _0x435394) {
    if (_0x477241 < _0x27fe81.length) {
      // Проверяем, что индекс элемента не выходит за пределы массива
      if (_0x27fe81[_0x477241].b_summ >= _0x27fe81[_0x477241].s_summ) {
        // Если сумма покупки больше или равна сумме продажи, устанавливаем сумму продажи на единицу больше суммы покупки
        _0x27fe81[_0x477241].s_summ = _0x27fe81[_0x477241].b_summ + 1;
      }
      // Формируем SQL-запрос для обновления цен в базе данных
      let _0x38df80 = 'update item set b_summ = ' + _0x27fe81[_0x477241].b_summ + ', s_summ = ' + _0x27fe81[_0x477241].s_summ + ', resale_cnt = ' + (_0x27fe81[_0x477241].resale_cnt == '' ? 0 : _0x27fe81[_0x477241].resale_cnt) + ' where appid || market_hash_name = "' + (_0x27fe81[_0x477241].appid + _0x27fe81[_0x477241].name) + '"';
      // Выполняем SQL-запрос в транзакции базы данных
      db.transaction(function (_0x591361) {
        _0x591361.executeSql(_0x38df80, [], function () {
          // Выводим сообщение о том, что цены были обновлены для данного предмета
          log(getLinkItem(_0x27fe81[_0x477241]) + ' цены обновились');
          // Обновляем информацию о предмете в массиве items
          t = items.map(function (_0x495c2d) {
            return _0x495c2d.appid + _0x495c2d.name;
          }).indexOf(_0x27fe81[_0x477241].appid + _0x27fe81[_0x477241].name);
          items[t].b_summ = _0x27fe81[_0x477241].b_summ;
          items[t].s_summ = _0x27fe81[_0x477241].s_summ;
          items[t].s_summ_steam = getBuyerPays(_0x27fe81[_0x477241].s_summ);
          items[t].CurProfitPercent = getCurProfitPercent(items[t]);
          // Рекурсивно вызываем функцию для обновления цен для следующего элемента в массиве
          updateItemsBuySellPrices(_0x27fe81, _0x477241 + 1, _0x435394);
        }, function (_0x1b4ae3, _0x57676a) {
          // Если произошла ошибка при выполнении SQL-запроса, выводим сообщение об ошибке
          logSQLError(_0x38df80, _0x57676a);
        });
      });
    } else if (_0x435394 == 'refreshTable') {
      // Если все элементы в массиве были обработаны и _0x435394 равно 'refreshTable', вызываем функцию _0x1177f8 для обновления таблицы
      
      _0x1177f8();
      
    }
  }
  
  /**
   * Функция преобразования истории цен в формат, понятный для дальнейшей обработки
   * @param {Object} _0x41a685 - объект с историей цен
   * @param {Array} _0x41a685.priceHistory - массив с историей цен
   * @param {Array} _0x41a685.convertedPriceHistory - массив с преобразованной историей цен
   */
  function convertPriceHistory(_0x41a685) {
    // Создаем массив для преобразованной истории цен
    var _0x36fda4 = [];
    // Создаем объект даты
    var _0x383752 = new Date();
    // Устанавливаем количество дней, за которые нужно преобразовать историю цен
    let _0x24dfa1;
    if (_0x41a685.priceHistory.length < 720) {
      _0x24dfa1 = Math.round(_0x41a685.priceHistory.length / 24);
    } else {
      _0x24dfa1 = 30;
    }
    // Проходим по каждому часу в выбранном временном промежутке
    for (let _0x76b7be = 0; _0x76b7be < _0x24dfa1 * 24; _0x76b7be++) {
      // Уменьшаем дату на 1 час
      _0x383752 = new Date(_0x383752 - 3600000);
      // Получаем год, месяц, день и час
      var _0x22b235 = _0x383752.getFullYear();
      var _0x59c6fc = _0x383752.getMonth() + 1;
      var _0x282906 = _0x383752.getHours();
      // Добавляем нули для форматирования
      if (_0x59c6fc < 10) {
        _0x59c6fc = '0' + _0x59c6fc;
      }
      var _0x575a63 = _0x383752.getDate();
      if (_0x575a63 < 10) {
        _0x575a63 = '0' + _0x575a63;
      }
      if (_0x282906 < 10) {
        _0x282906 = '0' + _0x282906;
      }
      // Создаем объект с датой и временем
      var _0x1c6100 = {};
      _0x1c6100[0] = parseInt('' + _0x22b235 + _0x59c6fc + _0x575a63 + _0x282906);
      _0x1c6100[1] = 0;
      _0x1c6100[2] = 0;
      // Добавляем объект в массив
      _0x36fda4.push(_0x1c6100);
    }
    // Инициализируем переменные для обработки истории цен
    var _0x34de71 = 0;
    var _0x828bbd = 0;
    var _0x540b58 = false;
    // Проходим по каждой записи в истории цен
    while (_0x828bbd < _0x24dfa1 * 24 && _0x34de71 < (_0x24dfa1 + 1) * 24 && _0x34de71 < _0x41a685.priceHistory.length) {
      // Получаем год, месяц, день и час из записи истории цен
      var _0x22b235 = _0x41a685.priceHistory[_0x41a685.priceHistory.length - _0x34de71 - 1][0].substring(7, 11);
      var _0x59c6fc = months.indexOf(_0x41a685.priceHistory[_0x41a685.priceHistory.length - _0x34de71 - 1][0].substring(0, 3)) + 1;
      var _0x575a63 = _0x41a685.priceHistory[_0x41a685.priceHistory.length - _0x34de71 - 1][0].substring(4, 6);
      var _0x282906 = _0x41a685.priceHistory[_0x41a685.priceHistory.length - _0x34de71 - 1][0].substring(12, 14);
      // Добавляем нули для форматирования
       if (_0x59c6fc < 10) {
        _0x59c6fc = '0' + _0x59c6fc;
      } 
      // Создаем объект с датой и временем
      var _0xa7c8db = _0x22b235 + _0x59c6fc + _0x575a63 + _0x282906;
    //  var _0xa7c8db = _0x22b235 + _0x59c6fc + _0x575a63 + _0x282906;
      // Если дата и время совпадают, добавляем цену и объем в массив с преобразованной историей цен
      if (_0x36fda4[_0x828bbd][0] == _0xa7c8db) {
        _0x36fda4[_0x828bbd][1] = _0x41a685.priceHistory[_0x41a685.priceHistory.length - _0x34de71 - 1][1];
        _0x36fda4[_0x828bbd][2] = parseInt(_0x41a685.priceHistory[_0x41a685.priceHistory.length - _0x34de71 - 1][2]);
        _0x540b58 = true;
        _0x828bbd++;
        _0x34de71++;
      } 
      // Если дата и время из записи истории цен меньше, чем в массиве с преобразованной историей цен, увеличиваем индекс массива с историей цен
      else if (_0x36fda4[_0x828bbd][0] > _0xa7c8db) {
        _0x828bbd++;
      } 
      // Если дата и время из записи истории цен больше, чем в массиве с преобразованной историей цен, увеличиваем индекс массива с историей цен
      else if (_0x540b58 && _0x36fda4[_0x828bbd][0] < _0xa7c8db) {
        _0x34de71++;
      } 
      // Если дата и время из записи истории цен меньше, чем в массиве с преобразованной историей цен, увеличиваем индекс массива с преобразованной историей цен
      else if (_0x540b58) {
        _0x828bbd++;
      } 
      // Если дата и время из записи истории цен больше, чем в массиве с преобразованной историей цен, увеличиваем индекс массива с историей цен
      else {
        _0x34de71++;
      }
    }
    // Добавляем преобразованную историю цен в объект
    _0x41a685.convertedPriceHistory = _0x36fda4;
    
  /*   const settings = {
      analysisPeriod: countDayHistoryGraph, // период анализа в днях
      profitPercent: profitPercent, // процент прибыли
      profitPercent_min: profitPercent_min, // минимальный процент прибыли
      lowProfit: minProfit, // низкий процент прибыли
      corridorPercent: percentLimit, // процент коридора
      sellAlgorithmCoefficient: alg_sell_qoeff, // коэффициент продажи
      buyAlgorithmCoefficient: alg_buy_qoeff, // коэффициент покупки
    };
   
    calculatePricesconverted(_0x36fda4,settings); */
  }
  /*   stockData - массив объектов, содержащих данные о ценах акций, включая цену и количество.
    minimumProfit - минимальная прибыль, которую требуется получить от сделки.
    profitRate - коэффициент прибыли, который определяет, какую прибыль можно ожидать от инвестиций.
    analysisPeriod - период анализа, который определяет, сколько последних дней нужно анализировать для принятия решения о покупке или продаже.
    lowProfitParam - параметр низкой прибыли, который определяет минимальный порог прибыли, при котором рекомендуется покупать акции.
    percentageCorridorParam - процентный коридор, который определяет, насколько можно отклоняться от средней цены при покупке или продаже акций.
    purchaseCoefficient - коэффициент покупки, который определяет, насколько нужно уменьшить сумму инвестиций для уменьшения рисков.
    salesCoefficient - коэффициент продажи, который определяет, насколько нужно увеличить целевую прибыль при продаже акций.
    salesVolume - объем продаж, который определяет, сколько акций нужно продать для достижения целевой прибыли. */
  
  // Функция принимает два аргумента: _0x38793c - строку, _0xb44996 - массив объектов
  // Функция для поиска товаров для ордеров
  // Принимает два параметра: тип ордера и массив товаров
  function findItemsForOrders(_0x565f8b, _0x4560a8) {
    // Используется оператор switch для обработки разных типов ордеров
    switch (_0x565f8b) {
      // Если тип ордера 'a', то вызываем функцию findItemsForOrders()
      case 'a':
        findItemsForOrders();
        break;
      // Если тип ордера 'b', то проверяем длину массива товаров
      case 'b':
        if (_0x4560a8.length > 0) {
          // Если есть настройки AOSettings, то вызываем функцию analyzeOrders()
          if (AOSettings) {
            log('Начинаю анализ ордеров');
            analyzeOrders(_0x4560a8, 0, 'a', 'auto');
          } else {
            // Если нет настроек AOSettings, то вызываем функцию findItemsForOrders() с типом ордера 'c'
            findItemsForOrders('c', _0x4560a8);
          }
        } else {
          // Если длина массива товаров равна 0, то завершаем работу функции
          analyzeWorking = false;
          let _0x5adcd6 = new Date();
          let _0x43ead8 = Number(_0x5adcd6.getHours());
          let _0x18934b = String(_0x5adcd6.getDate()).padStart(2, '0');
          let _0x773633 = String(_0x5adcd6.getMonth() + 1).padStart(2, '0');
          let _0xd63ee9 = _0x5adcd6.getFullYear();
          _0x5adcd6 = '' + _0xd63ee9 + _0x773633 + _0x18934b;
          if (checkLowProfitTime != '' && _0x43ead8 == checkLowProfitTime && checkLowProfitDate != _0x5adcd6) {
            checkLowProfit();
          }
        }
        break;
      // Если тип ордера 'c', то вызываем функции incOrders(), createBuyOrder(), updateItemsBuySellPrices() и drawItems()
      case 'c':
        if (autoIncOrders) {
          incOrders(_0x4560a8);
        }
        if (AOSettings) {
          for (let _0x365e9b = 0; _0x365e9b < groups.length; _0x365e9b++) {
            if (groups[_0x365e9b].order_percent == 'true') {
              for (let _0x468a68 = 0; _0x468a68 < _0x4560a8.length; _0x468a68++) {
                if (_0x4560a8[_0x468a68].id_group == groups[_0x365e9b].id) {
                  let _0xfbc88f = Math.round(_0x4560a8[_0x468a68].countSalesMonth * (groups[_0x365e9b].order_percent_cnt / 100));
                  if (_0xfbc88f > groups[_0x365e9b].order_max && groups[_0x365e9b].order_max != null && groups[_0x365e9b].order_max != '') {
                    _0xfbc88f = groups[_0x365e9b].order_max;
                  }
                  _0x4560a8[_0x468a68].b_cnt = _0xfbc88f == 0 ? 1 : _0xfbc88f;
                }
              }
            }
          }
        }
        createBuyOrder(_0x4560a8, 0);
        if (AOSettings) {
          updateItemsBuySellPrices(_0x4560a8, 0);
          drawItems();
        }
        break;
    }
  }
  // Функция анализирует список предметов на продаже и определяет, какие из них нужно снять с продажи
  // Входной параметр - массив объектов предметов на продаже
  function analyzeOnSaleItems(_0x23f50d) {
    // Создаем пустые массивы для хранения предметов, которые нужно снять с продажи, и предметов, которые нужно пересчитать и снять с продажи
    let _0x90aeca = [];
    let _0x46f3d6 = [];
    let _0x238791 = [];
    // Проходим по всем предметам на продаже
    for (let _0x90791d = 0; _0x90791d < _0x23f50d.length; _0x90791d++) {
        // Получаем текущую дату и дату, когда был добавлен предмет на продажу
        var _0x32e211 = new Date();
        var _0x36f590 = String(_0x23f50d[_0x90791d].date);
        _0x36f590 = new Date(_0x36f590.substring(0, 4) + '-' + _0x36f590.substring(4, 6) + '-' + _0x36f590.substring(6, 8));
        // Вычисляем количество дней, прошедших с момента добавления предмета на продажу
        var _0x10ef43 = Math.round((_0x32e211 - _0x36f590) / 86400000);
        // Если количество дней больше заданного значения, то проверяем, нужно ли снять предмет с продажи
        if (_0x10ef43 > removeFromSaleDays) {
            // Ищем предмет в списке всех предметов
            let _0x40d7fa = items.map(function (_0x3da301) {
                return _0x3da301.appid + _0x3da301.name;
            }).indexOf(_0x23f50d[_0x90791d].appid + _0x23f50d[_0x90791d].name);
            // Если предмет найден в списке всех предметов, то проверяем, нужно ли снять его с продажи
            if (_0x40d7fa != -1) {
                // Если у предмета нет заказов, то добавляем его в список предметов, которые нужно снять с продажи
                if (items[_0x40d7fa].order_cnt == 0) {
                    let _0x51bfa2 = _0x90aeca.map(function (_0x34f26d) {
                        return _0x34f26d.appid + _0x34f26d.name;
                    }).indexOf(items[_0x40d7fa].appid + items[_0x40d7fa].name);
                    if (_0x51bfa2 == -1) {
                        _0x90aeca.push(items[_0x40d7fa]);
                    }
                // Если у предмета есть заказы, то проверяем, нужно ли его снять с продажи, игнорируя заказы
                } else if (removeFromSaleDays_ignoreOrders) {
                    // Если у предмета есть стикеры и нужно их игнорировать, то ничего не делаем
                    if (removeFromSaleDays_skipWithStickers && _0x23f50d[_0x90791d].stickers.length > 0) {
                    } else {
                        // Добавляем предмет в список предметов, которые нужно снять с продажи
                        _0x46f3d6.push(_0x23f50d[_0x90791d].removeId);
                        // Если предмет еще не добавлен в список предметов для пересчета, то добавляем его
                        if (_0x238791.indexOf(items[_0x40d7fa].name) == -1) {
                            _0x238791.push(items[_0x40d7fa].name);
                            log(getLinkItem(items[_0x40d7fa]) + ' Будет снят с продажи без пересчета');
                        }
                    }
                // Если у предмета есть заказы, то проверяем, нужно ли его снять с продажи, учитывая заказы
                } else if (removeFromSaleDays_skipWithStickers && _0x23f50d[_0x90791d].stickers.length > 0) {
                } else if (_0x238791.indexOf(items[_0x40d7fa].name) == -1) {
                    _0x238791.push(items[_0x40d7fa].name);
                    log(getLinkItem(items[_0x40d7fa]) + ' Есть активный заказаз, не будет пересчитан');
                }
            }
        }
    }
    // Очищаем список предметов для пересчета
    _0x238791 = [];
    // Если есть предметы, которые нужно снять с продажи, то снимаем их
    if (_0x46f3d6.length > 0) {
        removeFromSale(_0x46f3d6, 0);
    }
    // Если есть предметы, которые нужно пересчитать и снять с продажи, то пересчитываем их и снимаем с продажи
    if (_0x90aeca.length > 0) {
        analyzeWorking = true;
        _0x90aeca.forEach(_0x51ea5f => {
            let _0x544e21 = items.map(function (_0xc6b6b5) {
                return _0xc6b6b5.appid + _0xc6b6b5.name;
            }).indexOf(_0x51ea5f.appid + _0x51ea5f.name);
            // Если предмет еще не добавлен в список предметов для пересчета, то добавляем его
            if (_0x238791.indexOf(_0x51ea5f.name) == -1) {
                _0x238791.push(_0x51ea5f.name);
                log(getLinkItem(_0x51ea5f) + ' Будет пересчитан и снят с продажи');
            }
            // Если включена опция переноса предметов во временную группу, то перемещаем предмет в эту группу
            if (AOSettings && perenos_v_temp_group) {
                let _0x4826cd = [];
                if (_0x51ea5f.id_group == group_percent) {
                    _0x51ea5f.id_group = group_temp;
                    _0x4826cd.push(_0x51ea5f.appid + _0x51ea5f.name);
                    addItemsToGroup(_0x4826cd, group_temp, false);
                    runSQLupdate('b_cnt', 1, _0x51ea5f.appid + _0x51ea5f.name);
                    items[_0x544e21].b_cnt = 1;
                    log(getLinkItem(_0x51ea5f) + ' перемещен в тестовую группу');
                }
            }
        });
        // Пересчитываем цены и снимаем предметы с продажи
        updateItemsPricesByAnalyzis(_0x90aeca, 0, 'removeFromSale');
    }
  }
  function drawItems() {
    groups.sort(function (_0x499abd, _0x1254dd) {
      var _0x513696 = _0x499abd.name;
      var _0x521cf5 = _0x1254dd.name;
      if (_0x499abd.name < _0x1254dd.name) {
        return -1;
      }
      if (_0x499abd.name > _0x1254dd.name) {
        return 1;
      }
      return 0;
    });
    var _0x510b9f = '';
    document.getElementById('dataTable').innerHTML = _0x510b9f;
    _0x510b9f += '<table id = "tableID" class = "tab">';
    _0x510b9f += '<thead><tr><td></td><td><input class = "all_name_checkbox" type="checkbox" id="all_name_checkbox"><label for="all_name_checkbox"></label></td><td class = "table" id = "name">Наименование</td>';
    _0x510b9f += showItemsCntSalesDay ? '<td class = "table" id = "showItemsCntSalesDay_column">Cnt</td>' : '';
    _0x510b9f += '<td class = "table" id = "inv_cnt">Inv</td><td class = "table" id = "on_sale_cnt">' + on_sale_cnt + '/' + on_sale_cnt_stcrs + '</td>';
    _0x510b9f += '<td class = "table" id = "order_cnt"></td><td class = "table" id = "order_date">Дата ордера</td><td class = "table" id = "b_cnt">Количество</td>';
    _0x510b9f += '<td class = "table" id = "b_on">Buy</td><td class = "table" id = "b_summ">Покупка</td><td class = "table" id = "s_summ">Продажа</td>';
    _0x510b9f += '<td class = "table" id = "s_summ_steam">Цена steam</td>';
    _0x510b9f += '<td class = "table" id = "s_on">Sell</td>';
    if (checkFloat) {
      _0x510b9f += '<td class = "table" id = "max_float">minFv</td>';
      _0x510b9f += '<td class = "table" id = "min_float">maxFv</td>';
    }
    if (AOSettings) {
      _0x510b9f += '<td class = "table" id = "resale_cnt">#</td>';
    }
    _0x510b9f += '</tr></<thead>';
    var _0x250fd7;
    for (var _0x2617df = 0; _0x2617df < groups.length; _0x2617df++) {
      _0x510b9f += '<tbody id = "' + groups[_0x2617df].id + '"><tr class = "group" id="' + groups[_0x2617df].id + '" name = "' + groups[_0x2617df].name + '">';
      if (groups[_0x2617df].open) {
        _0x510b9f += '<td><button class = "hideOpen open" id="' + groups[_0x2617df].id + '" name = "hideOpen">-</button></td>';
        _0x250fd7 = 'unhidden';
      } else {
        _0x510b9f += '<td><button class = "hideOpen" id="' + groups[_0x2617df].id + '" name = "hideOpen">+</button></td>';
        _0x250fd7 = 'hidden';
      }
      _0x510b9f += '<td><input class = "group_checkbox" type="checkbox" id="group_checkbox_' + groups[_0x2617df].id + '"><label for="group_checkbox_' + groups[_0x2617df].id + '"></label></td>';
      _0x510b9f += '<td><button class = "addToGroup" id="' + groups[_0x2617df].id + '" name = "+"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '<path d="M14.0625 6.5625H8.4375V0.9375C8.4375 0.68886 8.33873 0.450403 8.16291 0.274588C7.9871 0.0987722 7.74864 0 7.5 0C7.25136 0 7.0129 0.0987722 6.83709 0.274588C6.66127 0.450403 6.5625 0.68886 6.5625 0.9375V6.5625H0.9375C0.68886 6.5625 0.450403 6.66127 0.274588 6.83709C0.0987722 7.0129 0 7.25136 0 7.5C0 7.74864 0.0987722 7.9871 0.274588 8.16291C0.450403 8.33873 0.68886 8.4375 0.9375 8.4375H6.5625V14.0625C6.5625 14.3111 6.66127 14.5496 6.83709 14.7254C7.0129 14.9012 7.25136 15 7.5 15C7.74864 15 7.9871 14.9012 8.16291 14.7254C8.33873 14.5496 8.4375 14.3111 8.4375 14.0625V8.4375H14.0625C14.3111 8.4375 14.5496 8.33873 14.7254 8.16291C14.9012 7.9871 15 7.74864 15 7.5C15 7.25136 14.9012 7.0129 14.7254 6.83709C14.5496 6.66127 14.3111 6.5625 14.0625 6.5625Z" fill="white"/>\n' + '</svg></button>';
      _0x510b9f += '<input class = "group_name" id="' + groups[_0x2617df].id + '" type="text" size="20" value="' + groups[_0x2617df].name + '"/>';
      if (AOSettings) {
        if (groups[_0x2617df].id != 0) {
          var _0xe852cd;
          for (var _0xb4ff75 = 0; _0xb4ff75 < groups.length; _0xb4ff75++) {
            if (groups[_0xb4ff75].group_id == groups[_0x2617df].id) {
              _0xe852cd = _0xb4ff75;
              break;
            }
          }
          if (_0xe852cd != undefined && groups[_0xe852cd].settings_not_null) {
            _0x510b9f += ' <button class = "group_settings settings_not_null" id="' + groups[_0x2617df].id + '" ></button></td>';
          } else {
            _0x510b9f += ' <button class = "group_settings" id="' + groups[_0x2617df].id + '" ></button></td>';
          }
        }
      }
      _0x510b9f += showItemsCntSalesDay ? '<td></td>' : '';
      _0x510b9f += '<td></td>';
      _0x510b9f += '<td id="group_on_sale_cnt_' + _0x2617df + '" align="right">' + groups[_0x2617df].on_sale_cnt + '</td>';
      _0x510b9f += '<td id="group_order_cnt_' + _0x2617df + '" align="right">' + groups[_0x2617df].order_cnt + '</td>';
      _0x510b9f += '<td></td>';
      _0x510b9f += '<td><input class = "group_b_cnt" id=' + groups[_0x2617df].id + ' name="group_b_cnt" size="1"';
      if (groups[_0x2617df].order_percent == 'false') {
        _0x510b9f += ' value="">';
      } else {
        if (groups[_0x2617df].order_percent_cnt == null) {
          _0x510b9f += ' value="">';
        } else {
          _0x510b9f += ' value="' + groups[_0x2617df].order_percent_cnt + '">';
        }
      }
      if (AOSettings) {
        _0x510b9f += '<input id="group_b_cnt_percent_' + groups[_0x2617df].id + '" class="group_b_cnt_percent" type="checkbox"';
        if (groups[_0x2617df].order_percent == 'true') {
          _0x510b9f += ' checked >';
        } else {
          _0x510b9f += ' unchecked >';
        }
        var _0x3e9541 = '';
        if (groups[_0x2617df].order_max != null) {
          _0x3e9541 = groups[_0x2617df].order_max;
        }
        _0x510b9f += '<label class="group_b_cnt_percent_label" for="group_b_cnt_percent_' + groups[_0x2617df].id + '"></label><input id="group_b_cnt_max_' + groups[_0x2617df].id + '" name="group_b_cnt_max" class="group_b_cnt" size="1" value="' + _0x3e9541 + '"';
        if (groups[_0x2617df].order_percent == 'true') {
          _0x510b9f += ' unhidden>';
        } else {
          _0x510b9f += ' hidden>';
        }
      }
      _0x510b9f += '</td>';
      _0x510b9f += '<td><button class = "group" id="b" name = "b_on">on</button><button class = "group" id="b" name = "b_off">off</button></td>';
      _0x510b9f += '<td colspan="3"></td>';
      _0x510b9f += '<td><button class = "group" id="s" name = "s_on">on</button><button class = "group" id="s" name = "s_off">off</button></td><td></td>';
      if (checkFloat) {
        _0x510b9f += '<td></td><td></td>';
      }
      _0x510b9f += '</tr>';
      _0x510b9f += '</tbody>';
      _0x510b9f += '<tbody ' + _0x250fd7 + ' id = "group' + groups[_0x2617df].id + '">';
      for (var _0x5ec708 = 0; items.length > _0x5ec708; _0x5ec708++) {
        if (items[_0x5ec708].id_group == groups[_0x2617df].id) {
          _0x510b9f += _0x9e8119(_0x5ec708, _0x250fd7);
        }
      }
      _0x510b9f += '</tbody>';
    }
    document.getElementById('dataTable').innerHTML = _0x510b9f;
  }
  function _0x9e8119(_0x2006ef, _0x79fee0) {
    var _0x4f203b = '<tr class = "item" id="' + _0x2006ef + '"><td></td>';
    if (items[_0x2006ef].checked) {
      _0x4f203b += '<td><input checked class = "itemCheckbox" type="checkbox" id="itemCheckbox' + _0x2006ef + '"><label for="itemCheckbox' + _0x2006ef + '"></label></td>';
    } else {
      _0x4f203b += '<td><input unchecked class = "itemCheckbox" type="checkbox" id="itemCheckbox' + _0x2006ef + '"><label for="itemCheckbox' + _0x2006ef + '"></label></td>';
    }
    if (items[_0x2006ef].url) {
      _0x4f203b += '<td><a href="' + items[_0x2006ef].url + '" target="_blank">' + items[_0x2006ef].name_real + '</a></td>';
    } else {
      _0x4f203b += '<td><a href="https://steamcommunity.com/market/listings/' + items[_0x2006ef].appid + '/' + items[_0x2006ef].name + '" target="_blank">' + items[_0x2006ef].name_real + '</a></td>';
    }
    if (showItemsCntSalesDay) {
      if (items[_0x2006ef].cntSalesDay > 0) {
        _0x4f203b += '<td id = "cntSalesDay_' + _0x2006ef + '" align = "center">' + items[_0x2006ef].cntSalesDay + '</td>';
      } else {
        _0x4f203b += '<td id = "cntSalesDay_' + _0x2006ef + '" align = "center"></td>';
      }
    }
    if (items[_0x2006ef].inv_cnt > 0) {
      _0x4f203b += '<td id = "inv_cnt_' + _0x2006ef + '" align = "center">' + items[_0x2006ef].inv_cnt + '</td>';
    } else {
      _0x4f203b += '<td id = "inv_cnt_' + _0x2006ef + '" align = "center"></td>';
    }
    if (items[_0x2006ef].on_sale_cnt != 0 || items[_0x2006ef].on_sale_cnt_stcrs != 0) {
      _0x4f203b += '<td id = "on_sale_cnt_' + _0x2006ef + '" align = "center" class="color_onsale"><span>' + items[_0x2006ef].on_sale_cnt + ' / ' + items[_0x2006ef].on_sale_cnt_stcrs + '</span><button class = "tableOnSale" id=' + _0x2006ef + '><svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '<path d="M1.20702 0.196958C1.07469 0.0691489 0.897453 -0.0015721 0.713486 2.65237e-05C0.529519 0.00162515 0.353539 0.0754158 0.22345 0.205505C0.0933609 0.335594 0.0195703 0.511573 0.0179716 0.69554C0.016373 0.879507 0.0870941 1.05674 0.214903 1.18907L4.26686 5.24103L0.214201 9.29298C0.147188 9.35771 0.0937355 9.43513 0.0569634 9.52073C0.0201913 9.60633 0.000836052 9.6984 2.64918e-05 9.79156C-0.000783069 9.88473 0.0169694 9.97712 0.0522483 10.0633C0.0875273 10.1496 0.139626 10.2279 0.205505 10.2938C0.271383 10.3597 0.349723 10.4118 0.435951 10.447C0.52218 10.4823 0.614571 10.5001 0.707734 10.4993C0.800897 10.4985 0.892966 10.4791 0.978568 10.4423C1.06417 10.4056 1.14159 10.3521 1.20632 10.2851L5.25897 6.23314L9.31093 10.2851C9.44326 10.4129 9.62049 10.4836 9.80446 10.482C9.98843 10.4804 10.1644 10.4066 10.2945 10.2765C10.4246 10.1465 10.4984 9.97048 10.5 9.78651C10.5016 9.60255 10.4309 9.42531 10.303 9.29298L6.25109 5.24103L10.303 1.18907C10.4309 1.05674 10.5016 0.879507 10.5 0.69554C10.4984 0.511573 10.4246 0.335594 10.2945 0.205505C10.1644 0.0754158 9.98843 0.00162515 9.80446 2.65237e-05C9.62049 -0.0015721 9.44326 0.0691489 9.31093 0.196958L5.25897 4.24891L1.20702 0.196256V0.196958Z" fill="white"/>\n' + '</svg></button></td>';
    } else {
      _0x4f203b += '<td id = "on_sale_cnt_' + _0x2006ef + '" align = "center">' + items[_0x2006ef].on_sale_cnt + ' / ' + items[_0x2006ef].on_sale_cnt_stcrs + '</td>';
    }
    if (items[_0x2006ef].order_cnt != 0) {
      _0x4f203b += '<td id = "order_cnt_' + _0x2006ef + '" align = "right" class="color_order"><span>' + items[_0x2006ef].order_cnt + '</span><button class = "tableOrder" id=' + _0x2006ef + '>X</button></td>';
    } else {
      _0x4f203b += '<td id = "order_cnt_' + _0x2006ef + '" align = "right"><span>' + items[_0x2006ef].order_cnt + '</span></td>';
    }
    if (items[_0x2006ef].order_date) {
      var _0x1c8756 = String(items[_0x2006ef].order_date).substring(6, 8) + '.' + String(items[_0x2006ef].order_date).substring(4, 6) + '.' + String(items[_0x2006ef].order_date).substring(0, 4);
    } else {
      var _0x1c8756 = '';
    }
    _0x4f203b += '<td align = "right">' + _0x1c8756 + '</td>';
    _0x4f203b += '<td><input id="b_cnt_' + _0x2006ef + '"class = "table" name="b_cnt" size="1" value="' + items[_0x2006ef].b_cnt + '"> ';
    switch (items[_0x2006ef].appid) {
      case 730:
        _0x4f203b += '<img src="ico/csgo.jpg" border=0 height=16 width=16</img></td>';
        break;
      case 570:
        _0x4f203b += '<img src="ico/dota.jpg" border=0 height=16 width=16</img></td>';
        break;
      case 440:
        _0x4f203b += '<img src="ico/teamfortress2.jpg" border=0 height=16 width=16</img></td>';
        break;
      case 252490:
        _0x4f203b += '<img src="ico/rust.jpg" border=0 height=16 width=16</img></td>';
        break;
      default:
        _0x4f203b += '</td>';
        break;
    }
    var _0x23dcc1;
    if (items[_0x2006ef].b_on) {
      _0x23dcc1 = 'checked';
    } else {
      _0x23dcc1 = 'unchecked';
    }
    _0x4f203b += '<td><label class="switch"><input class="table" id="b_on_' + _0x2006ef + '" type="checkbox" name = "b_on" ' + _0x23dcc1 + '><span class="slider"></span></label></td>';
    _0x4f203b += '<td><input class = "table" id=b_summ_' + _0x2006ef + ' name="b_summ" size="3" value="' + round(items[_0x2006ef].b_summ / 100) + '"></td>';
    _0x4f203b += '<td><input class = "table" id=s_summ_' + _0x2006ef + ' name="s_summ" size="3" value="' + round(items[_0x2006ef].s_summ / 100) + '"></td>';
    _0x4f203b += '<td><input class = "table" id=s_summ_steam_' + _0x2006ef + ' name="s_summ_steam" size="3" value="' + round(items[_0x2006ef].s_summ_steam / 100) + '"></td>';
    if (items[_0x2006ef].s_on) {
      _0x23dcc1 = 'checked';
    } else {
      _0x23dcc1 = 'unchecked';
    }
    _0x4f203b += '<td><label class="switch"><input class="table" id="s_on_' + _0x2006ef + '" type="checkbox" name = "s_on" ' + _0x23dcc1 + '><span class="slider"></span></label></td>';
    if (checkFloat) {
      _0x4f203b += '<td><input class = "table" id=min_float_' + _0x2006ef + ' name="min_float" size="3" value="' + items[_0x2006ef].min_float + '"></td>';
      _0x4f203b += '<td><input class = "table" id=max_float_' + _0x2006ef + ' name="max_float" size="3" value="' + items[_0x2006ef].max_float + '"></td>';
    }
    if (AOSettings) {
      _0x4f203b += '<td>' + items[_0x2006ef].resale_cnt + '</td>';
    }
    _0x4f203b += '</tr>';
    return _0x4f203b;
  }
  function changeGroupSettings(_0x1ca533, _0x483d93) {
    var _0x22ed9e = null;
    for (var _0x3e8f5c = 0; _0x3e8f5c < group_settings.length; _0x3e8f5c++) {
      if (group_settings[_0x3e8f5c].group_id == current_group_edit_id) {
        _0x22ed9e = _0x3e8f5c;
        break;
      }
    }
    if (_0x22ed9e != null) {
      if (_0x1ca533 == 'algoritm' || _0x1ca533 == 'algoritm_buy') {
        group_settings[_0x22ed9e][_0x1ca533] = _0x483d93;
      } else {
        group_settings[_0x22ed9e][_0x1ca533] = _0x483d93 == '' ? '' : Number(_0x483d93);
      }
      items.forEach(_0x264029 => {
        if (_0x264029.id_group == group_settings[_0x22ed9e].group_id) {
          _0x264029.group_settings[_0x1ca533] = group_settings[_0x22ed9e][_0x1ca533];
        }
      });
      let _0x3cf8ec = _0x1ca533;
      if (_0x1ca533 == 'dontDeleteOrders') {
        _0x3cf8ec = 'p0';
      }
      if (_0x1ca533 == 'profitPercent_min') {
        _0x3cf8ec = 'p1';
      }
      if (_0x1ca533 == 'alg_sell_qoeff') {
        _0x3cf8ec = 'p2';
      }
      if (_0x1ca533 == 'alg_buy_qoeff') {
        _0x3cf8ec = 'p3';
      }
      let _0x42d00a = 'update group_settings set ' + _0x3cf8ec + ' = "' + group_settings[_0x22ed9e][_0x1ca533] + '" where group_id = ' + group_settings[_0x22ed9e].group_id;
      db.transaction(function (_0x1992a7) {
        _0x1992a7.executeSql(_0x42d00a, [], function () {
        }, function (_0x20f883, _0x1504e3) {
          logSQLError(_0x42d00a, _0x1504e3);
        });
      });
    }
  }
  function checkDateHistory(_0x5b2b64, _0xda5a9, _0x58816e) {
    var _0x4a5bb4 = new Date();
    var _0x4b0091 = String(_0x4a5bb4.getDate()).padStart(2, '0');
    var _0x506ea2 = String(_0x4a5bb4.getMonth() + 1).padStart(2, '0');
    var _0x215d0d = _0x4a5bb4.getFullYear();
    var _0x3b37bc = Number(_0x215d0d + _0x506ea2 + _0x4b0091);
    var _0x5495d5 = [];
    if (_0x5b2b64 == _0x3b37bc) {
      document.getElementById('report').innerHTML = 'Нельзя загружать данные за сегодня';
    } else if (_0x5b2b64 > _0x3b37bc) {
      alert('дата больше текущей!');
    } else if (_0xda5a9 == 0) {
      loadHistoryToSQL(_0x5b2b64, 0, true, _0x5495d5);
    } else if (_0x5b2b64 < _0xda5a9) {
      document.getElementById('report').innerHTML = 'Нет данных за указанный период, очисчтите историю и загрузите заново';
    } else if (_0x5b2b64 < _0x58816e) {
      loadHistoryToSQL(_0x58816e + 1, 0, true, _0x5495d5);
    } else if (_0x5b2b64 > _0x58816e) {
      loadHistoryToSQL(_0x5b2b64, 0, true, _0x5495d5);
    } else {
      document.getElementById('report').innerHTML = 'Данные актуальны';
    }
  }
  function loadHistoryToSQL(_0x24e982, _0x3c8c2d, _0x22581b, _0x42849d, _0x248e92, _0x20ddd3) {
    if (_0x42849d) {
      $.ajax({
        url: 'https://steamcommunity.com/market/myhistory/render/?query=&norender=1&start=' + _0x22581b * 500 + '&count=500',
        type: 'get',
        dataType: 'json',
        async: true,
        cache: false,
        success: function (_0x3e2b00) {
          if (_0x3e2b00.events != null) {
            _0x3e2b00.events.forEach(_0x582b3b => {
              if ((_0x582b3b.event_type == 3 || _0x582b3b.event_type == 4) && !_0x248e92.has(_0x582b3b.listingid) && _0x42849d) {
                var _0x328f33 = {};
                var _0x1fe48d = new Date(_0x582b3b.time_event * 1000);
                var _0x17e981 = String(_0x1fe48d.getDate()).padStart(2, '0');
                var _0x33805e = String(_0x1fe48d.getMonth() + 1).padStart(2, '0');
                var _0x4d7e41 = _0x1fe48d.getFullYear();
                _0x328f33.date = Number(_0x4d7e41 + _0x33805e + _0x17e981);
                _0x328f33.id = _0x582b3b.listingid;
                switch (_0x582b3b.event_type) {
                  case 2:
                    _0x328f33.type = 'Canceled';
                    break;
                  case 1:
                    _0x328f33.type = 'Created';
                    break;
                  case 3:
                    _0x328f33.type = 'Sold';
                    _0x328f33.price = _0x3e2b00.purchases[_0x582b3b.listingid + '_' + _0x582b3b.purchaseid].received_amount;
                    break;
                  case 4:
                    _0x328f33.type = 'Buy';
                    _0x328f33.price = _0x3e2b00.purchases[_0x582b3b.listingid + '_' + _0x582b3b.purchaseid].paid_amount + _0x3e2b00.purchases[_0x582b3b.listingid + '_' + _0x582b3b.purchaseid].paid_fee;
                    break;
                }
                _0x328f33.game = _0x3e2b00.listings[_0x582b3b.listingid].publisher_fee_app;
                _0x328f33.name = _0x3e2b00.assets[_0x3e2b00.listings[_0x582b3b.listingid].publisher_fee_app][_0x3e2b00.listings[_0x582b3b.listingid].asset.contextid][_0x3e2b00.listings[_0x582b3b.listingid].asset.id].market_hash_name;
                if (_0x328f33.date < _0x24e982 || _0x328f33.date > _0x3c8c2d) {
                  _0x42849d = false;
                } else {
                  _0x20ddd3.push(_0x328f33);
                }
              }
            });
            if (_0x20ddd3.length > 0) {
              $('#report').prepend('<table><tr><td>Гружу данные за ' + _0x20ddd3[_0x20ddd3.length - 1].date + '</td></tr></table>');
            }
            loadHistoryToSQL(_0x24e982, _0x3c8c2d, _0x22581b + 1, _0x42849d, _0x248e92, _0x20ddd3);
          } else {
            loadHistoryToSQL(_0x24e982, _0x3c8c2d, _0x22581b + 1, _0x42849d, _0x248e92, _0x20ddd3);
          }
        },
        error: function (_0x724b5d) {
          document.getElementById('report').innerHTML = 'Ошибка загрузки';
        }
      });
    } else {
      loadToSQL(_0x20ddd3, 0);
    }
  }
  function loadToSQL(_0x9f377b, _0x46a39e) {
    if (_0x46a39e < _0x9f377b.length) {
      var _0x460c5f = 'insert into saleshistory (listingid, game, date, name, type, price)';
      _0x460c5f += ' values ("' + _0x9f377b[_0x46a39e].id + '", "' + _0x9f377b[_0x46a39e].game + '", "' + _0x9f377b[_0x46a39e].date + '", "' + _0x9f377b[_0x46a39e].name + '","' + _0x9f377b[_0x46a39e].type + '","' + _0x9f377b[_0x46a39e].price + '")';
      db.transaction(function (_0x28b338) {
        _0x28b338.executeSql(_0x460c5f, [], function () {
          setTimeout(function () {
            document.getElementById('report').innerHTML = _0x46a39e;
            loadToSQL(_0x9f377b, _0x46a39e + 1);
          }, 0);
        }, function (_0x290be8, _0x15c7c8) {
        });
      });
    } else {
      document.getElementById('report').innerHTML = '<table><tr><td>Загрузка завершена</td></tr></table>';
    }
  }
  function runSqlQuery() {
    var _0x4a2701 = $('#sqlQuery')[0].value;
    db.transaction(function (_0x161701) {
      _0x161701.executeSql($('#sqlQuery')[0].value, [], function (_0x5922a6, _0x74e448) {
        var _0x4425f5 = '<table>';
        arr = _0x74e448.rows;
        for (var _0x32dea1 = 0; _0x32dea1 < arr.length; _0x32dea1++) {
          _0x4425f5 += '<tr>';
          for (key in arr[_0x32dea1]) {
            _0x4425f5 += '<td>';
            _0x4425f5 += arr[_0x32dea1][key];
            _0x4425f5 += '</td>';
          }
          _0x4425f5 += '</tr>';
        }
        _0x4425f5 += '</table>';
        document.getElementById('report').innerHTML = _0x4425f5;
      }, function (_0x1a3e50, _0x3aa95f) {
        document.getElementById('report').innerHTML = _0x3aa95f.message;
      });
    });
  }
  function clearHistorySQL() {
    var _0x12765b = 'delete from saleshistory';
    db.transaction(function (_0x3e88b7) {
      _0x3e88b7.executeSql('delete from saleshistory', [], function () {
        document.getElementById('report').innerHTML = 'успешное удаление';
      }, function (_0x36f29a, _0x3c2f47) {
        document.getElementById('report').innerHTML = _0x3c2f47.message;
      });
    });
  }
  function log(_0x38519c, _0x18de87, _0x3ecb18) {
    if (_0x3ecb18 == undefined) {
      _0x3ecb18 = 'log';
    }
    let _0x19fba6 = new Date();
    let _0x39bdff = String(_0x19fba6.getHours()).padStart(2, '0') + ':' + String(_0x19fba6.getMinutes()).padStart(2, '0');
    switch (logs_info) {
      case 0:
        break;
      case 1:
        if (_0x18de87 == 'err_msg') {
          $('#' + _0x3ecb18).prepend('<div class="' + _0x18de87 + '">' + _0x39bdff + ' ' + _0x38519c + '</div>');
        } else if (_0x18de87 == 'alert_msg') {
          $('#' + _0x3ecb18).prepend('<div class="' + _0x18de87 + '">' + _0x39bdff + ' ' + _0x38519c + '</div>');
        }
        break;
      case 2:
        $('#' + _0x3ecb18).prepend('<div class="' + _0x18de87 + '">' + _0x39bdff + ' ' + _0x38519c + '</div>');
        break;
      case 3:
        if ($('#log')[0].children.length > logs_cnt - 1 && logs_cnt != '') {
          $('#log')[0].lastChild.remove();
        }
        $('#' + _0x3ecb18).prepend('<div class="' + _0x18de87 + '">' + _0x39bdff + ' ' + _0x38519c + '</div>');
        break;
      default:
        $('#' + _0x3ecb18).prepend('<div class="' + _0x18de87 + '">' + _0x39bdff + ' ' + _0x38519c + '</div>');
        break;
    }
  }
  function SQL_add_filter_stickers(_0x6959b2, _0x37892e) {
    if (_0x37892e < _0x6959b2.length) {
      if (_0x6959b2[_0x37892e] != '') {
        var _0x3ff168 = 'insert into filterstickers (name)';
        _0x3ff168 += ' values ("' + _0x6959b2[_0x37892e].toLowerCase() + '")';
        db.transaction(function (_0x485c5d) {
          _0x485c5d.executeSql(_0x3ff168, [], function () {
            filter_stickers.push(_0x6959b2[_0x37892e].toLowerCase());
            SQL_add_filter_stickers(_0x6959b2, _0x37892e + 1);
          }, function (_0xa2fca7, _0x3e1a8b) {
            logSQLError(_0x3ff168, _0x3e1a8b);
          });
        });
      } else {
        SQL_add_filter_stickers(_0x6959b2, _0x37892e + 1);
      }
    } else {
      log('Настройки фильтров наклек обновлены');
    }
  }
  function checkItemsOnSaleOnOrders() {
    var _0x16c0f2 = [];
    items.forEach(_0x4ae819 => {
      if ((_0x4ae819.group_settings.cancelOrderIfLow == 1 || cancelOrderIfLow) && _0x4ae819.on_sale_cnt >= 0.5 && true && _0x4ae819.buyorderid != '') {
        let _0x5db71b = {};
        _0x5db71b.name = _0x4ae819.name;
        _0x5db71b.appid = _0x4ae819.appid;
        _0x5db71b.buyorderid = _0x4ae819.buyorderid;
        _0x5db71b.b_summ = _0x4ae819.b_summ;
        _0x16c0f2.push(_0x5db71b);
        log(getLinkItem(_0x4ae819) + ' слишком много на продаже, заказ будет снят');
        if (AOSettings && perenos_v_temp_group) {
          let _0x4b27d0 = [];
          if (_0x4ae819.id_group == group_percent) {
            _0x4ae819.id_group = group_temp;
            _0x4b27d0.push(_0x4ae819.appid + _0x4ae819.name);
            addItemsToGroup(_0x4b27d0, group_temp, false);
            runSQLupdate('b_cnt', 1, _0x4ae819.appid + _0x4ae819.name);
            _0x4ae819.b_cnt = 1;
            log(getLinkItem(_0x4ae819) + ' перемещен в тестовую группу');
          }
        }
      }
    });
    if (_0x16c0f2.length > 0) {
      cancelBuyOrder(_0x16c0f2, 0);
    }
  }
  function stats(_0x41834f) {
    let _0x162e4e = new Date();
    let _0x2dd038 = _0x162e4e.getHours();
    _0x162e4e = _0x162e4e.getFullYear() + String(_0x162e4e.getMonth() + 1).padStart(2, '0') + String(_0x162e4e.getDate()).padStart(2, '0') + (_0x2dd038 + '').padStart(2, '0');
    if (_0x2dd038 == Number(hourForStats)) {
      stats_balance = balance;
    }
    let _0x57d183 = 'select * from stats where date = ' + _0x162e4e;
    db.transaction(function (_0x135d3e) {
      _0x135d3e.executeSql(_0x57d183, [], function (_0x159c61, _0x7be170) {
        let _0x5a0e02 = _0x7be170.rows;
        if (_0x7be170.rows.length == 0) {
          _0x57d183 = 'insert into stats (date, balance, sumonsale) values(' + _0x162e4e + ', ' + balance + ', ' + _0x41834f + ')';
          db.transaction(function (_0x36ad5b) {
            _0x36ad5b.executeSql(_0x57d183, [], function () {
            }, function (_0x542cbf, _0x7e84ad) {
              logSQLError(_0x57d183, _0x7e84ad);
            });
          });
        } else if (_0x7be170.rows[0].balance + _0x7be170.rows[0].sumonsale < balance + _0x41834f) {
          _0x57d183 = 'update stats set balance = ' + balance + ', sumonsale = ' + _0x41834f + ' where date = ' + _0x162e4e;
          db.transaction(function (_0x123875) {
            _0x123875.executeSql(_0x57d183, [], function () {
            }, function (_0x1b2f53, _0x9c9567) {
              logSQLError(_0x57d183, _0x9c9567);
            });
          });
        }
      }, function (_0x40881c, _0x3978c4) {
        logSQLError(_0x57d183, _0x3978c4);
      });
    });
  }
  function createProgressBar(_0x5545a4, _0x2c4526, _0x31a5dc) {
    let _0x281cba = '<div><progress data-label="' + _0x2c4526 + '" class="progress_bar" id="' + _0x5545a4 + '" max="' + _0x31a5dc + '" value="0"></progress></div>';
    $('#progress_bar_div')[0].innerHTML = _0x281cba;
  }
  function deleteProgressBar(_0x5b9ff9) {
    if ($('#' + _0x5b9ff9 + '')[0] != undefined) {
      $('#' + _0x5b9ff9 + '')[0].remove();
    }
  }
  function updateProgressBar(_0x548cb5, _0x714332) {
    if ($('#' + _0x548cb5 + '')[0] != undefined) {
      $('#' + _0x548cb5 + '')[0].value = _0x714332;
    }
  }
  function checkLowProfit() {
    let _0x2c36c1 = [];
    items.forEach(_0xad1376 => {
      if (_0xad1376.buyorderid != '' && _0xad1376.group_settings.dontDeleteOrders != 1) {
        let _0x2265d9 = {};
        _0x2265d9.name = _0xad1376.name;
        _0x2265d9.b_summ = _0xad1376.b_summ;
        _0x2265d9.s_summ = _0xad1376.s_summ;
        _0x2265d9.group_settings = _0xad1376.group_settings;
        _0x2265d9.item_nameid = _0xad1376.item_nameid;
        _0x2265d9.appid = _0xad1376.appid;
        _0x2265d9.resale_cnt = _0xad1376.resale_cnt;
        _0x2c36c1.push(_0x2265d9);
      }
    });
    if (!analyzeWorking && _0x2c36c1.length > 0) {
      analyzeWorking = true;
      let _0x200c32 = new Date();
      let _0x56493c = String(_0x200c32.getDate()).padStart(2, '0');
      let _0x49e158 = String(_0x200c32.getMonth() + 1).padStart(2, '0');
      let _0xe29b2e = _0x200c32.getFullYear();
      _0x200c32 = '' + _0xe29b2e + _0x49e158 + _0x56493c;
      checkLowProfitDate = _0x200c32;
      log('Начинаю анализ текущих заказов на актуальность цен');
      analyzeOrders(_0x2c36c1, 0, 'a', 'checkLowProfit');
    }
  }
  function saveBaseOnSever() {
    let _0x365b9d = 50;
    let _0x3805fb = '';
    let _0x4996e6 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let _0x3fdce5 = 62;
    for (let _0x4105a4 = 0; _0x4105a4 < 50; _0x4105a4++) {
      _0x3805fb += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62));
    }
    let _0x2dbc84 = {};
    _0x2dbc84.items = items;
    _0x2dbc84.groups = groups;
    _0x2dbc84.group_settings = group_settings;
    let _0x3f7f4c = JSON.stringify(accID);
    let _0x2b47a1 = JSON.stringify(secretkey);
    let _0x29dfea = JSON.stringify(_0x2dbc84);
    let _0x5b41ed = '"upload"';
    let _0xcbd107 = JSON.stringify(_0x3805fb);
    $.ajax({
      url: 'http://steamtradeextensionz.ru/STEtrade/1.55/sb.php',
      type: 'post',
      dataType: 'json',
      cache: false,
      data: {
        logName: _0x3f7f4c,
        secretkey: _0x2b47a1,
        items: _0x29dfea,
        p: '"upload"',
        key: _0xcbd107,
        version: '"1.55"'
      },
      success: function (_0x5be78f) {
        if (_0x5be78f == 'nolic') {
          log('У вас нет подписки');
        } else {
          log('База успешно загружена на сервер');
          log('Ключ базы (без кавычек): "' + _0x3805fb + '"');
        }
      },
      error: function () {
        log('Ошибка загрузки Базы');
      }
    });
  }
  function loadBaseFromSever(_0x265a97) {
    let _0x3e7f51 = JSON.stringify(accID);
    let _0x516044 = JSON.stringify(secretkey);
    let _0x17c0b6 = JSON.stringify(_0x265a97);
    let _0x557df7 = _0x265a97 == undefined ? 'steamid' : 'key';
    _0x557df7 = JSON.stringify(_0x557df7);
    $.ajax({
      url: 'http://steamtradeextensionz.ru/STEtrade/1.55/sb.php',
      type: 'post',
      dataType: 'json',
      cache: false,
      data: {
        logName: _0x3e7f51,
        secretkey: _0x516044,
        key: _0x17c0b6,
        p: _0x557df7,
        version: '"1.55"'
      },
      success: function (_0x2e0c81) {
        let _0x3ddb1b = 'delete from item';
        db.transaction(function (_0x482e2d) {
          _0x482e2d.executeSql('delete from item', [], function () {
            log('Начинаю загрузку, подождите.');
          }, function () {
          });
        });
        addItems(_0x2e0c81, 0);
      },
      error: function (_0x2c07bb) {
        log('Ошибка загрузки Базы');
      }
    });
  }
  $(document).on('click', 'button#GetMarketDiff', function () {
    let _0x406573 = '"GetMarketDiffSelect"';
    var _0x367b55 = {};
    _0x367b55.p = '"GetMarketDiffSelect"';
    $.ajax({
      url: 'http://steamtradeextensionz.ru/STEtrade/steam_anal.php',
      type: 'post',
      dataType: 'json',
      cache: false,
      data: _0x367b55,
      success: function (_0x9bed41) {
        $('#graph')[0].style.width = 1000;
        $('#graph')[0].style.height = 200;
        let _0x51c0d6 = JSON.parse(_0x9bed41.msg);
        let _0x2ff9b1 = [];
        for (let _0x47b963 = _0x51c0d6.length - 1; _0x47b963 > 0; _0x47b963--) {
          _0x2ff9b1.push(_0x51c0d6[_0x47b963 - 1]);
        }
        let _0x29c54f = 200;
        let _0x36e99e = 925;
        let _0x99214f = 925 / _0x2ff9b1.length;
        $('#graph')[0].innerHTML = '';
        DL('G', 0, 0, 0, 200, 'black');
        DL('G', 0, 200, 925, 200, 'black');
        DL('G', 925, 200, 925, 0, 'black');
        DL('G', 925, 0, 0, 0, 'black');
        let _0x1384ef = 999999;
        let _0x3b631a = 0;
        for (let _0x2a6ff6 = 0; _0x2a6ff6 < _0x2ff9b1.length; _0x2a6ff6++) {
          if (_0x2ff9b1[_0x2a6ff6] > _0x3b631a) {
            _0x3b631a = _0x2ff9b1[_0x2a6ff6];
          }
          if (_0x2ff9b1[_0x2a6ff6] < _0x1384ef) {
            _0x1384ef = _0x2ff9b1[_0x2a6ff6];
          }
        }
        let _0x34c3ef = _0x3b631a - _0x1384ef;
        _0x34c3ef = 200 / _0x34c3ef;
        let _0x54a391 = [];
        for (let _0x2fec36 = 0; _0x2fec36 < _0x2ff9b1.length; _0x2fec36++) {
          if (_0x2ff9b1[_0x2fec36] != undefined) {
            let _0x31ed85 = {};
            _0x31ed85.x = round(_0x99214f * (_0x2fec36 - (_0x2ff9b1.length - _0x2ff9b1.length)) + _0x99214f / 2);
            _0x31ed85.y = round(200 - (_0x2ff9b1[_0x2fec36] - _0x1384ef) * _0x34c3ef);
            _0x54a391.push(_0x31ed85);
          }
        }
        let _0x17f116 = '';
        let _0x10cd7e = '';
        for (let _0x135156 = 0; _0x135156 < _0x54a391.length; _0x135156++) {
          let _0x333278 = round(_0x2ff9b1[_0x135156] * 100 / _0x2ff9b1[_0x135156 - 1] - 100);
          let _0x3a0a17 = _0x54a391[_0x135156].y;
          let _0x2dd21e = _0x54a391[_0x135156].x;
          if (_0x3a0a17 > 195) {
            _0x3a0a17 = 195;
          } else if (_0x3a0a17 < 15) {
            _0x3a0a17 = 15;
          }
          if (_0x2dd21e > 890) {
            _0x2dd21e = 890;
          }
          if (_0x135156 == 0) {
            _0x17f116 = '<path id="P' + _0x135156 + '" d="M ' + _0x54a391[_0x135156].x + ' ' + _0x54a391[_0x135156].y + ' ';
            _0x10cd7e += '<text x="' + _0x2dd21e + '" y="' + _0x3a0a17 + '">' + 0 + '</text>';
          } else {
            _0x17f116 += 'L ' + _0x54a391[_0x135156].x + ' ' + _0x54a391[_0x135156].y + ' ';
            _0x10cd7e += '<text ';
            _0x10cd7e += 'class="';
            if (_0x333278 > 1 || _0x333278 < -1) {
              _0x10cd7e += 'bold';
            }
            if (localStorage.getItem('theme') == 'Steam') {
              _0x10cd7e += ' white';
            }
            _0x10cd7e += '" ';
            _0x10cd7e += 'x="' + _0x2dd21e + '" y="' + _0x3a0a17 + '">' + _0x333278 + '</text>';
          }
        }
        _0x17f116 += '" fill="transparent" stroke="green" stroke-width="2"/>';
        _0x17f116 += _0x10cd7e;
        $('#graph')[0].innerHTML += _0x17f116;
        let _0x3a6a41 = '<table>';
        let _0x5dff21 = new Date();
        _0x5dff21 = _0x5dff21.setDate(_0x5dff21.getDate() - 28);
        _0x5dff21 = new Date(_0x5dff21);
        for (let _0x36fdbe = 1; _0x36fdbe < _0x2ff9b1.length; _0x36fdbe++) {
          _0x5dff21.setDate(_0x5dff21.getDate() + 1);
          day = new Date(_0x5dff21);
          _0x3a6a41 += '<tr>';
          d = day.getFullYear() + '-' + String(day.getMonth() + 1).padStart(2, '0') + '-' + String(day.getDate()).padStart(2, '0');
          _0x3a6a41 += '<td>' + d + '</td>';
          _0x3a6a41 += '<td>';
          _0x3a6a41 += round(_0x2ff9b1[_0x36fdbe] * 100 / _0x2ff9b1[_0x36fdbe - 1] - 100);
          _0x3a6a41 += '</td>';
          _0x3a6a41 += '</td></tr>';
        }
        _0x3a6a41 += '</table>';
        $('#report')[0].innerHTML = _0x3a6a41;
      },
      error: function () {
        log('Ошибка GetMarketDiff');
      }
    });
  });
  function DL(_0x310af4, _0x465eb7, _0x5fcd45, _0x1cff80, _0xacabb4, _0x5eaecb) {
    $('#graph')[0].innerHTML += '<line id = "L' + _0x310af4 + '"x1="' + _0x465eb7 + '" y1="' + _0x5fcd45 + '" x2="' + _0x1cff80 + '" y2="' + _0xacabb4 + '" stroke="' + _0x5eaecb + '" />';
  }
  function STEparse(_0x2eb123) {
    let _0x3c868f = [];
    let _0x59c0a1 = $($('#filters_dota2')).find('.settings');
    for (let _0xda29ea in _0x59c0a1) {
      if (_0x59c0a1[_0xda29ea].checked) {
        _0x3c868f.push(_0x59c0a1[_0xda29ea].id.replace('filter_dota2_Rarity_', '').replace('filter_dota2_', ''));
      }
    }
    let _0x16518f = '';
    if (_0x2eb123 == 'calc_cnt') {
      _0x16518f = 'calc_cnt';
    } else {
      _0x16518f = 'parse';
    }
    $.ajax({
      url: servers[server] + '/mod_pars.php',
      type: 'post',
      dataType: 'json',
      cache: false,
      data: {
        p: JSON.stringify(_0x16518f),
        secretkey: JSON.stringify(secretkey),
        steamid: JSON.stringify(accID),
        appid: JSON.stringify($('#appid')[0].value),
        price_min: JSON.stringify($('#price_min')[0].value),
        price_max: JSON.stringify($('#price_max')[0].value),
        cnt_sales_min: JSON.stringify($('#cnt_sales_min')[0].value),
        cnt_sales_max: JSON.stringify($('#cnt_sales_max')[0].value),
        filter_weapons: JSON.stringify($('#filter_weapons')[0].checked),
        filter_sticker: JSON.stringify($('#filter_sticker')[0].checked),
        filter_souvenir: JSON.stringify($('#filter_souvenir')[0].checked),
        filter_agent: JSON.stringify($('#filter_agent')[0].checked),
        filter_graffiti: JSON.stringify($('#filter_graffiti')[0].checked),
        filter_container: JSON.stringify($('#filter_container')[0].checked),
        dota2_filters: JSON.stringify(_0x3c868f)
      },
      success: function (_0x3ec1b2) {
        if (_0x3ec1b2 == 'nolic') {
          log('У вас нет доступа к этому модулю', '', 'log_parser');
          return;
        }
        switch (_0x2eb123) {
          case 'save_to_file':
            let _0x2fbdd2 = '';
            _0x3ec1b2.forEach(_0x23b418 => {
              _0x2fbdd2 += _0x23b418.hash_name + '\n';
            });
            _0x2fbdd2 = '';
            const _0x1217d0 = document.createElement('a');
            _0x1217d0.style.display = 'none';
            document.body.appendChild(_0x1217d0);
            var _0x7d2ffc = {};
            _0x7d2ffc.type = 'application/octet-stream';
            const _0x3d7c70 = new Blob([_0x2fbdd2], _0x7d2ffc);
            const _0x30704a = URL.createObjectURL(_0x3d7c70);
            _0x1217d0.href = _0x30704a;
            _0x1217d0.href = URL.createObjectURL(_0x3d7c70);
            _0x1217d0.download = '1.txt';
            _0x1217d0.click();
            break;
          case 'add_to_base':
            let _0x2ed20b = [];
            _0x3ec1b2.forEach(_0x11856e => {
              let _0x5821d4 = {};
              _0x5821d4.name_real = _0x11856e.name;
              _0x5821d4.name = _0x11856e.hash_name;
              _0x5821d4.item_nameid = _0x11856e.item_nameid;
              _0x5821d4.appid = _0x11856e.appid;
              _0x2ed20b.push(_0x5821d4);
            });
            log('Начинаю загрузку в базу, подождите', '', 'log_parser');
            log('После окончания загрузки бот будет перезагружен', '', 'log_parser');
            var _0x6dc6dc = {};
            _0x6dc6dc.type = 'STEparse_add_to_base';
            _0x6dc6dc.items = _0x2ed20b;
            chrome.runtime.sendMessage(_0x6dc6dc);
            break;
          case 'calc_cnt':
            log('Количество предметов: ' + _0x3ec1b2[0].cnt, '', 'log_parser');
            break;
        }
      },
      error: function () {
        log('Cервер модуля парсинга не доступен', '', 'log_parser');
      }
    });
  }
  function _0x1177f8() {
    if (document.getElementById('dataTable').innerHTML.indexOf('M14.0625 6.5625H8.4375V0.9375C8.4375 0.68886 8.33873 0.450403 8.16291 0.274588C7.9871 0.0987722 7.74864 0 7.5 0C7.25136 0 7.0129 0.0987722 6.83709 0.274588C6.66127 0.450403 6.5625 0.68886 6.5625 0.9375V6.5625H0.9375C0.68886 6.5625 0.450403 6.66127 0.274588 6.83709C0.0987722 7.0129 0 7.25136 0 7.5C0 7.74864 0.0987722 7.9871 0.274588 8.16291C0.450403 8.33873 0.68886 8.4375 0.9375 8.4375H6.5625V14.0625C6.5625 14.3111 6.66127 14.5496 6.83709 14.7254C7.0129 14.9012 7.25136 15 7.5 15C7.74864 15 7.9871 14.9012 8.16291 14.7254C8.33873 14.5496 8.4375 14.3111 8.4375 14.0625V8.4375H14.0625C14.3111 8.4375 14.5496 8.33873 14.7254 8.16291C14.9012 7.9871 15 7.74864 15 7.5C15 7.25136 14.9012 7.0129 14.7254 6.83709C14.5496 6.66127 14.3111 6.5625 14.0625 6.5625Z') == -1) {
      return;
    }
    groups.sort(function (_0x7286fe, _0x4dd516) {
      var _0x1e7970 = _0x7286fe.name;
      var _0x412881 = _0x4dd516.name;
      if (_0x7286fe.name < _0x4dd516.name) {
        return -1;
      }
      if (_0x7286fe.name > _0x4dd516.name) {
        return 1;
      }
      return 0;
    });
    var _0x545076 = '';
    document.getElementById('dataTable').innerHTML = _0x545076;
    _0x545076 += '<table id = "tableID" class = "tab">';
    _0x545076 += '<thead><tr><td></td><td><input class = "all_name_checkbox" type="checkbox" id="all_name_checkbox"><label for="all_name_checkbox"></label></td><td class = "table" id = "name">Наименование</td>';
    _0x545076 += '';
    _0x545076 += showItemsCurProfitPercent ? '<td class = "table" id = "CurProfitPercent">т_%проф</td>' : '';
    _0x545076 += showItemsCurKoefOrder ? '<td class = "table" id = "CurKoefOrder">т_коэф</td>' : '';
    _0x545076 += showItemsCntSalesDay ? '<td class = "table" id = "cntSalesDay">cnt</td>' : '';
    _0x545076 += '<td class = "table" id = "inv_cnt">inv</td><td class = "table" id = "on_sale_cnt">' + on_sale_cnt + '/' + on_sale_cnt_stcrs + '</td>';
    _0x545076 += '<td class = "table" id = "order_cnt"></td><td class = "table" id = "order_date">Дата ордера</td><td class = "table" id = "b_cnt">Количество</td>';
    _0x545076 += '<td class = "table" id = "b_on">Buy</td><td class = "table" id = "b_summ">Покупка</td><td class = "table" id = "s_summ">Продажа</td>';
    _0x545076 += '<td class = "table" id = "s_summ_steam">Цена steam</td>';
    _0x545076 += '<td class = "table" id = "s_on">Sell</td>';
    if (checkFloat) {
      _0x545076 += '<td class = "table" id = "max_float">minFv</td>';
      _0x545076 += '<td class = "table" id = "min_float">maxFv</td>';
    }
    if (AOSettings) {
      _0x545076 += '<td class = "table" id = "resale_cnt">#</td>';
    }
    _0x545076 += '</tr></<thead>';
    var _0x4984b3;
    for (var _0xd06a8d = 0; _0xd06a8d < groups.length; _0xd06a8d++) {
      _0x545076 += '<tbody id = "' + groups[_0xd06a8d].id + '"><tr class = "group" id="' + groups[_0xd06a8d].id + '" name = "' + groups[_0xd06a8d].name + '">';
      if (groups[_0xd06a8d].open) {
        _0x545076 += '<td><button class = "hideOpen open" id="' + groups[_0xd06a8d].id + '" name = "hideOpen">-</button></td>';
        _0x4984b3 = 'unhidden';
      } else {
        _0x545076 += '<td><button class = "hideOpen" id="' + groups[_0xd06a8d].id + '" name = "hideOpen">+</button></td>';
        _0x4984b3 = 'hidden';
      }
      _0x545076 += '<td><input class = "group_checkbox" type="checkbox" id="group_checkbox_' + groups[_0xd06a8d].id + '"><label for="group_checkbox_' + groups[_0xd06a8d].id + '"></label></td>';
      _0x545076 += '<td><button class = "addToGroup" id="' + groups[_0xd06a8d].id + '" name = "+"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M14.0625 6.5625H8.4375V0.9375C8.4375 0.68886 8.33873 0.450403 8.16291 0.274588C7.9871 0.0987722 7.74864 0 7.5 0C7.25136 0 7.0129 0.0987722 6.83709 0.274588C6.66127 0.450403 6.5625 0.68886 6.5625 0.9375V6.5625H0.9375C0.68886 6.5625 0.450403 6.66127 0.274588 6.83709C0.0987722 7.0129 0 7.25136 0 7.5C0 7.74864 0.0987722 7.9871 0.274588 8.16291C0.450403 8.33873 0.68886 8.4375 0.9375 8.4375H6.5625V14.0625C6.5625 14.3111 6.66127 14.5496 6.83709 14.7254C7.0129 14.9012 7.25136 15 7.5 15C7.74864 15 7.9871 14.9012 8.16291 14.7254C8.33873 14.5496 8.4375 14.3111 8.4375 14.0625V8.4375H14.0625C14.3111 8.4375 14.5496 8.33873 14.7254 8.16291C14.9012 7.9871 15 7.74864 15 7.5C15 7.25136 14.9012 7.0129 14.7254 6.83709C14.5496 6.66127 14.3111 6.5625 14.0625 6.5625Z" fill="white"/>\n</svg></button>';
      _0x545076 += '<input class = "group_name" id="' + groups[_0xd06a8d].id + '" type="text" size="20" value="' + groups[_0xd06a8d].name + '"/>';
      if (AOSettings) {
        if (groups[_0xd06a8d].id != 0) {
          var _0x5a4f6d;
          for (var _0x255f21 = 0; _0x255f21 < group_settings.length; _0x255f21++) {
            if (group_settings[_0x255f21].group_id == groups[_0xd06a8d].id) {
              _0x5a4f6d = _0x255f21;
              break;
            }
          }
          if (_0x5a4f6d != undefined && group_settings[_0x5a4f6d].settings_not_null) {
            _0x545076 += ' <button class = "group_settings settings_not_null" id="' + groups[_0xd06a8d].id + '" ></button></td>';
          } else {
            _0x545076 += ' <button class = "group_settings" id="' + groups[_0xd06a8d].id + '" ></button></td>';
          }
        }
      }
      _0x545076 += '';
      _0x545076 += showItemsCurProfitPercent ? '<td></td>' : '';
      _0x545076 += showItemsCurKoefOrder ? '<td></td>' : '';
      _0x545076 += showItemsCntSalesDay ? '<td></td>' : '';
      _0x545076 += '<td></td>';
      _0x545076 += '<td id="group_on_sale_cnt_' + _0xd06a8d + '" align="right">' + groups[_0xd06a8d].on_sale_cnt + '</td>';
      _0x545076 += '<td id="group_order_cnt_' + _0xd06a8d + '" align="right">' + groups[_0xd06a8d].order_cnt + '</td>';
      _0x545076 += '<td></td>';
      _0x545076 += '<td><input class = "group_b_cnt" id=' + groups[_0xd06a8d].id + ' name="group_b_cnt" size="1"';
      if (groups[_0xd06a8d].order_percent == 'false') {
        _0x545076 += ' value="">';
      } else if (groups[_0xd06a8d].order_percent_cnt == null) {
        _0x545076 += ' value="">';
      } else {
        _0x545076 += ' value="' + groups[_0xd06a8d].order_percent_cnt + '">';
      }
      if (AOSettings) {
        _0x545076 += '<input id="group_b_cnt_percent_' + groups[_0xd06a8d].id + '" class="group_b_cnt_percent" type="checkbox"';
        if (groups[_0xd06a8d].order_percent == 'true') {
          _0x545076 += ' checked >';
        } else {
          _0x545076 += ' unchecked >';
        }
        var _0x3ecb40 = '';
        if (groups[_0xd06a8d].order_max != null) {
          _0x3ecb40 = groups[_0xd06a8d].order_max;
        }
        _0x545076 += '<label class="group_b_cnt_percent_label" for="group_b_cnt_percent_' + groups[_0xd06a8d].id + '"></label><input id="group_b_cnt_max_' + groups[_0xd06a8d].id + '" name="group_b_cnt_max" class="group_b_cnt" size="1" value="' + _0x3ecb40 + '"';
        if (groups[_0xd06a8d].order_percent == 'true') {
          _0x545076 += ' unhidden>';
        } else {
          _0x545076 += ' hidden>';
        }
      }
      _0x545076 += '</td>';
      _0x545076 += '<td><button class = "group" id="b" name = "b_on">on</button><button class = "group" id="b" name = "b_off">off</button></td>';
      _0x545076 += '<td colspan="3"></td>';
      _0x545076 += '<td><button class = "group" id="s" name = "s_on">on</button><button class = "group" id="s" name = "s_off">off</button></td><td></td>';
      if (checkFloat) {
        _0x545076 += '<td></td><td></td>';
      }
      _0x545076 += '</tr>';
      _0x545076 += '</tbody>';
      _0x545076 += '<tbody ' + _0x4984b3 + ' id = "group' + groups[_0xd06a8d].id + '">';
      for (var _0x5333a2 = 0; items.length > _0x5333a2; _0x5333a2++) {
        if (items[_0x5333a2].id_group == groups[_0xd06a8d].id) {
          _0x545076 += _0x1f09fb(_0x5333a2, _0x4984b3);
        }
      }
      _0x545076 += '</tbody>';
    }
    document.getElementById('dataTable').innerHTML = _0x545076;
  }
  function _0x1f09fb(_0x1f3c67, _0x4270fd) {
    var _0x4c898d = '<tr class = "item" id="' + _0x1f3c67 + '"><td></td>';
    if (items[_0x1f3c67].checked) {
      _0x4c898d += '<td><input checked class = "itemCheckbox" type="checkbox" id="itemCheckbox' + _0x1f3c67 + '"><label for="itemCheckbox' + _0x1f3c67 + '"></label></td>';
    } else {
      _0x4c898d += '<td><input unchecked class = "itemCheckbox" type="checkbox" id="itemCheckbox' + _0x1f3c67 + '"><label for="itemCheckbox' + _0x1f3c67 + '"></label></td>';
    }
    if (items[_0x1f3c67].url) {
      _0x4c898d += '<td><a href="' + items[_0x1f3c67].url + '" target="_blank">' + items[_0x1f3c67].name_real + '</a></td>';
    } else {
      _0x4c898d += '<td><a href="https://steamcommunity.com/market/listings/' + items[_0x1f3c67].appid + '/' + items[_0x1f3c67].name + '" target="_blank">' + items[_0x1f3c67].name_real + '</a></td>';
    }
    if (showItemsCurProfitPercent) {
      if (items[_0x1f3c67].CurProfitPercent > 0) {
        _0x4c898d += '<td id = "CurProfitPercent_' + _0x1f3c67 + '" align = "center">' + items[_0x1f3c67].CurProfitPercent + '</td>';
      } else {
        _0x4c898d += '<td id = "CurProfitPercent_' + _0x1f3c67 + '" align = "center"></td>';
      }
    }
    if (showItemsCurKoefOrder) {
      if (items[_0x1f3c67].CurKoefOrder > 0) {
        _0x4c898d += '<td id = "CurKoefOrder_' + _0x1f3c67 + '" align = "center">' + items[_0x1f3c67].CurKoefOrder + '</td>';
      } else {
        _0x4c898d += '<td id = "CurKoefOrder_' + _0x1f3c67 + '" align = "center"></td>';
      }
    }
    if (showItemsCntSalesDay) {
      if (items[_0x1f3c67].cntSalesDay > 0) {
        _0x4c898d += '<td id = "cntSalesDay_' + _0x1f3c67 + '" align = "center">' + items[_0x1f3c67].cntSalesDay + '</td>';
      } else {
        _0x4c898d += '<td id = "cntSalesDay_' + _0x1f3c67 + '" align = "center"></td>';
      }
    }
    if (items[_0x1f3c67].inv_cnt > 0) {
      _0x4c898d += '<td id = "inv_cnt_' + _0x1f3c67 + '" align = "center">' + items[_0x1f3c67].inv_cnt + '</td>';
    } else {
      _0x4c898d += '<td id = "inv_cnt_' + _0x1f3c67 + '" align = "center"></td>';
    }
    if (items[_0x1f3c67].on_sale_cnt != 0 || items[_0x1f3c67].on_sale_cnt_stcrs != 0) {
      _0x4c898d += '<td id = "on_sale_cnt_' + _0x1f3c67 + '" align = "center" class="color_onsale"><span>' + items[_0x1f3c67].on_sale_cnt + ' / ' + items[_0x1f3c67].on_sale_cnt_stcrs + '</span><button class = "tableOnSale" id=' + _0x1f3c67 + '><svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M1.20702 0.196958C1.07469 0.0691489 0.897453 -0.0015721 0.713486 2.65237e-05C0.529519 0.00162515 0.353539 0.0754158 0.22345 0.205505C0.0933609 0.335594 0.0195703 0.511573 0.0179716 0.69554C0.016373 0.879507 0.0870941 1.05674 0.214903 1.18907L4.26686 5.24103L0.214201 9.29298C0.147188 9.35771 0.0937355 9.43513 0.0569634 9.52073C0.0201913 9.60633 0.000836052 9.6984 2.64918e-05 9.79156C-0.000783069 9.88473 0.0169694 9.97712 0.0522483 10.0633C0.0875273 10.1496 0.139626 10.2279 0.205505 10.2938C0.271383 10.3597 0.349723 10.4118 0.435951 10.447C0.52218 10.4823 0.614571 10.5001 0.707734 10.4993C0.800897 10.4985 0.892966 10.4791 0.978568 10.4423C1.06417 10.4056 1.14159 10.3521 1.20632 10.2851L5.25897 6.23314L9.31093 10.2851C9.44326 10.4129 9.62049 10.4836 9.80446 10.482C9.98843 10.4804 10.1644 10.4066 10.2945 10.2765C10.4246 10.1465 10.4984 9.97048 10.5 9.78651C10.5016 9.60255 10.4309 9.42531 10.303 9.29298L6.25109 5.24103L10.303 1.18907C10.4309 1.05674 10.5016 0.879507 10.5 0.69554C10.4984 0.511573 10.4246 0.335594 10.2945 0.205505C10.1644 0.0754158 9.98843 0.00162515 9.80446 2.65237e-05C9.62049 -0.0015721 9.44326 0.0691489 9.31093 0.196958L5.25897 4.24891L1.20702 0.196256V0.196958Z" fill="white"/>\n</svg></button></td>';
    } else {
      _0x4c898d += '<td id = "on_sale_cnt_' + _0x1f3c67 + '" align = "center">' + items[_0x1f3c67].on_sale_cnt + ' / ' + items[_0x1f3c67].on_sale_cnt_stcrs + '</td>';
    }
    if (items[_0x1f3c67].order_cnt != 0) {
      _0x4c898d += '<td id = "order_cnt_' + _0x1f3c67 + '" align = "right" class="color_order"><span>' + items[_0x1f3c67].order_cnt + '</span><button class = "tableOrder" id=' + _0x1f3c67 + '>X</button></td>';
    } else {
      _0x4c898d += '<td id = "order_cnt_' + _0x1f3c67 + '" align = "right"><span>' + items[_0x1f3c67].order_cnt + '</span></td>';
    }
    if (items[_0x1f3c67].order_date) {
      var _0x35af1b = String(items[_0x1f3c67].order_date).substring(6, 8) + '.' + String(items[_0x1f3c67].order_date).substring(4, 6) + '.' + String(items[_0x1f3c67].order_date).substring(0, 4);
    } else {
      var _0x35af1b = '';
    }
    _0x4c898d += '<td align = "right">' + _0x35af1b + '</td>';
    _0x4c898d += '<td><input id="b_cnt_' + _0x1f3c67 + '"class = "table" name="b_cnt" size="1" value="' + items[_0x1f3c67].b_cnt + '"> ';
    switch (items[_0x1f3c67].appid) {
      case 730:
        _0x4c898d += '<img src="ico/csgo.jpg" border=0 height=16 width=16</img></td>';
        break;
      case 570:
        _0x4c898d += '<img src="ico/dota.jpg" border=0 height=16 width=16</img></td>';
        break;
      case 440:
        _0x4c898d += '<img src="ico/teamfortress2.jpg" border=0 height=16 width=16</img></td>';
        break;
      case 252490:
        _0x4c898d += '<img src="ico/rust.jpg" border=0 height=16 width=16</img></td>';
        break;
      default:
        _0x4c898d += '</td>';
        break;
    }
    var _0x5bfef3;
    if (items[_0x1f3c67].b_on) {
      _0x5bfef3 = 'checked';
    } else {
      _0x5bfef3 = 'unchecked';
    }
    _0x4c898d += '<td><label class="switch"><input class="table" id="b_on_' + _0x1f3c67 + '" type="checkbox" name = "b_on" ' + _0x5bfef3 + '><span class="slider"></span></label></td>';
    _0x4c898d += '<td><input class = "table" id=b_summ_' + _0x1f3c67 + ' name="b_summ" size="3" value="' + round(items[_0x1f3c67].b_summ / 100) + '"></td>';
    _0x4c898d += '<td><input class = "table" id=s_summ_' + _0x1f3c67 + ' name="s_summ" size="3" value="' + round(items[_0x1f3c67].s_summ / 100) + '"></td>';
    _0x4c898d += '<td><input class = "table" id=s_summ_steam_' + _0x1f3c67 + ' name="s_summ_steam" size="3" value="' + round(items[_0x1f3c67].s_summ_steam / 100) + '"></td>';
    if (items[_0x1f3c67].s_on) {
      _0x5bfef3 = 'checked';
    } else {
      _0x5bfef3 = 'unchecked';
    }
    _0x4c898d += '<td><label class="switch"><input class="table" id="s_on_' + _0x1f3c67 + '" type="checkbox" name = "s_on" ' + _0x5bfef3 + '><span class="slider"></span></label></td>';
    if (checkFloat) {
      _0x4c898d += '<td><input class = "table" id=min_float_' + _0x1f3c67 + ' name="min_float" size="3" value="' + items[_0x1f3c67].min_float + '"></td>';
      _0x4c898d += '<td><input class = "table" id=max_float_' + _0x1f3c67 + ' name="max_float" size="3" value="' + items[_0x1f3c67].max_float + '"></td>';
    }
    if (AOSettings) {
      _0x4c898d += '<td>' + items[_0x1f3c67].resale_cnt + '</td>';
    }
    _0x4c898d += '</tr>';
    return _0x4c898d;
  }
  // Функция для загрузки стакана заказов с помощью AJAX-запроса
  function _0xf6e10d(_0x5cc42d, _0x51d56c) {
    // Проверяем, достигли ли мы конца массива
    if (_0x51d56c >= _0x5cc42d.length) {
      return;
    }
    // Формируем URL для запроса
    let _0x3a2d62 = 'https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=' + currency.id + '&item_nameid=' + _0x5cc42d[_0x51d56c].item_nameid + '&two_factor=0';
    // Отправляем AJAX-запрос
    $.ajax({
      url: _0x3a2d62,
      dataType: 'json',
      type: 'get',
      async: true,
      cache: true,
      success: function (_0x4e7312) {
        // Проверяем, получили ли мы корректный ответ от сервера
        if (_0x4e7312.buy_order_graph == undefined || _0x4e7312.buy_order_graph[0] == undefined || _0x4e7312.buy_order_graph[0][0] == undefined) {
          log('STEAM ERROR Загрузка стакана заказов');
          // Если ответ некорректный, повторяем запрос через некоторое время
          setTimeout(function () {
            _0xf6e10d(_0x5cc42d, _0x51d56c + 1);
          }, query_delay);
          return;
        }
        // Находим индекс элемента в массиве items, соответствующего текущему товару
        let _0x2e1f5e = items.map(function (_0x430d09) {
          return _0x430d09.appid + _0x430d09.name;
        }).indexOf(_0x5cc42d[_0x51d56c].appid + _0x5cc42d[_0x51d56c].name);
        // Устанавливаем CurKoefOrder в 999, чтобы отличать товары, для которых не удалось получить стакан заказов
        items[_0x2e1f5e].CurKoefOrder = 999;
        // Если получили корректный ответ, обрабатываем данные
        if (_0x4e7312.buy_order_graph) {
          for (let _0x1cafa3 = 0; _0x1cafa3 < _0x4e7312.buy_order_graph.length; _0x1cafa3++) {
            if (_0x5cc42d[_0x51d56c].b_summ >= round(_0x4e7312.buy_order_graph[_0x1cafa3][0] * 100)) {
              if (_0x5cc42d[_0x51d56c].countSalesMonth == '') {
                log(_0x5cc42d[_0x51d56c].name + ' Нет количества продаж');
                break;
              }
              // Вычисляем CurKoefOrder
              items[_0x2e1f5e].CurKoefOrder = round(_0x4e7312.buy_order_graph[_0x1cafa3][1] / _0x5cc42d[_0x51d56c].countSalesMonth);
              _0x1cafa3 = _0x4e7312.buy_order_graph.length;
            }
          }
        }
        // Рекурсивно вызываем функцию для следующего товара в массиве
        _0xf6e10d(_0x5cc42d, _0x51d56c + 1);
      },
      error: function (_0x32f9cd) {
        // Обрабатываем ошибку запроса
        log('STEAM ERROR Загрузка стакана заказов');
        _0xf6e10d(_0x5cc42d, _0x51d56c + 1);
        if (_0x32f9cd.status == 429) {
          logMicroBan(true);
        }
      }
    });
  }
  
  function getInventory(_0xe48889) {
    inventoryData = [];
    var _0x3db934 = 'select distinct appid, contextid from item where contextid > 0';
    db.transaction(function (_0x7a86ff) {
      _0x7a86ff.executeSql('select distinct appid, contextid from item where contextid > 0', [], function (_0x875e0a, _0x32fe30) {
        if (getInventoryGame_error) {
          getInventoryGame(_0x32fe30.rows, 0, '', _0xe48889, false);
        } else {
          getInventoryGame(_0x32fe30.rows, 0, '', _0xe48889, true);
        }
      }, function (_0x5303dc, _0x5de04b) {
        logSQLError('select distinct appid, contextid from item where contextid > 0', _0x5de04b);
        timerSellInventoryWorking = false;
      });
    });
  }
  // Функция getInventoryGame получает инвентарь пользователя для определенной игры на Steam
  // _0x3acddc - массив объектов, содержащих информацию об играх (appid и contextid)
  // _0x4d50e1 - индекс текущей игры в массиве _0x3acddc
  // _0x40c1b7 - id последнего предмета в инвентаре, используется для загрузки следующей страницы инвентаря
  // _0x4ba279 - дополнительный параметр, используется для вызова других функций после получения инвентаря
  // _0x5c6e4f - дополнительный параметр, не используется в функции
  
  function getInventoryGame(_0x3acddc, _0x4d50e1, _0x40c1b7, _0x4ba279, _0x5c6e4f) {
    // Проверяем, есть ли еще игры в массиве _0x3acddc
    if (_0x4d50e1 < _0x3acddc.length) {
      // Если есть, делаем ajax-запрос для получения инвентаря пользователя
      $.ajax({
        url: 'https://steamcommunity.com/inventory/' + accID + '/' + _0x3acddc[_0x4d50e1].appid + '/' + _0x3acddc[_0x4d50e1].contextid + '?&count=5000&start_assetid=' + _0x40c1b7,
        dataType: 'json',
        type: 'get',
        async: true,
        cache: false,
        success: function (_0x544310) {
          // Если у пользователя уже есть предметы в инвентаре, добавляем новые предметы и описания в массивы
          if (inventoryData.assets) {
            if (_0x544310.assets) {
              _0x544310.assets.forEach(_0x329a71 => {
                inventoryData.assets.push(_0x329a71);
              });
              _0x544310.descriptions.forEach(_0x5cc407 => {
                inventoryData.descriptions.push(_0x5cc407);
              });
            }
          } else {
            // Если у пользователя нет предметов в инвентаре, записываем полученный инвентарь в переменную inventoryData
            inventoryData = _0x544310;
          }
          // Если есть еще страницы инвентаря, загружаем следующую страницу
          if (_0x544310.last_assetid) {
            getInventoryGame(_0x3acddc, _0x4d50e1, _0x544310.last_assetid, _0x4ba279, _0x5c6e4f);
          } else {
            // Если страницы инвентаря закончились, переходим к следующей игре в массиве _0x3acddc
            getInventoryGame(_0x3acddc, _0x4d50e1 + 1, '', _0x4ba279, _0x5c6e4f);
          }
        },
        error: function (_0x3a5fee) {
          // Обработка ошибок
          getInventoryGame_error = true;
          getInventoryGame_error_cnt++;
          timerSellInventoryWorking = false;
          log('STEAM ERROR Загрузка инвентаря');
          if (_0x3a5fee.status == 429) {
            logMicroBan();
          }
        }
      });
    } else {
      // Если все игры в массиве _0x3acddc обработаны, вызываем другую функцию (если указан параметр _0x4ba279)
      getInventoryGame_error = false;
      getInventoryGame_error_cnt = 0;
      if (_0x4ba279 == 'addMissingItems') {
        addMissingItems(inventoryData);
        return;
      }
      // Обработка полученного инвентаря
      items.forEach(_0x1205b9 => {
        _0x1205b9.inv_cnt = 0;
      });
      if (inventoryData.assets && inventoryData.assets.length > 0) {
        filterInventory(inventoryData);
      } else if (!analyzeWorking && balance * 10 > orders_sum && orders_cnt < 1000) {
        timerSellInventoryWorking = false;
        analyzeWorking = true;
        findItemsForOrders('a', 'пиздец ты любопытный!');
      } else {
        timerSellInventoryWorking = false;
        let _0x43ec05 = new Date();
        let _0x1f11e2 = Number(_0x43ec05.getHours());
        let _0x50c223 = String(_0x43ec05.getDate()).padStart(2, '0');
        let _0x1f3fbf = String(_0x43ec05.getMonth() + 1).padStart(2, '0');
        let _0x24682a = _0x43ec05.getFullYear();
        _0x43ec05 = '' + _0x24682a + _0x1f3fbf + _0x50c223;
        if (checkLowProfitTime != '' && _0x1f11e2 == checkLowProfitTime && checkLowProfitDate != _0x43ec05) {
          checkLowProfit();
        }
      }
    }
  }
  function getMyListings() {
    $.ajax({
      url: 'https://steamcommunity.com/market/mylistings/render/?query=&norender=1&start=0&count=0',
      dataType: 'json',
      type: 'get',
      async: true,
      cache: false,
      success: function (_0x1fe5eb) {
        if (_0x1fe5eb.total_count == 0) {
          myItemsOnSaleError = true;
          myItemsOnSaleError_cnt++;
        } else {
          myItemsOnSaleError_cnt = 0;
        }
        var _0x23eb65 = [];
        getMyItemsOnSale(_0x1fe5eb.total_count, 0, _0x23eb65);
        if (SDARemove.length > 0 && _0x1fe5eb.listings_to_confirm && _0x1fe5eb.listings_to_confirm.length > 0) {
          var _0x38c7c3 = [];
          _0x1fe5eb.listings_to_confirm.forEach(_0x3879f2 => {
            SDARemove.forEach(_0x1631e7 => {
              if (_0x3879f2.asset.id == _0x1631e7) {
                _0x38c7c3.push(_0x3879f2.listingid);
              }
            });
          });
          SDARemove = [];
          removeFromSale(_0x38c7c3, 0);
        }
      },
      error: function (_0x1ed0e7) {
        log('STEAM ERROR Загрузка списка на продаже');
        myItemsOnSaleError = true;
        if (timerGetItemsOnSaleWorking) {
          timerGetItemsOnSaleWorking = false;
        }
        if (_0x1ed0e7.status == 429) {
          logMicroBan();
        }
      }
    });
  }
  // Функция getMyItemsOnSale получает список предметов, которые выставлены на продажу
  function getMyItemsOnSale(_0x27840d, _0x20b398, _0x3c36fb) {
    // Проверяем, если цена нашего предмета меньше, чем заданная цена, то делаем запрос на сервер
    if (_0x20b398 * 100 < _0x27840d) {
      $.ajax({
        url: 'https://steamcommunity.com/market/mylistings/render/?query=&norender=1&start=' + _0x20b398 * 100 + '&count=100',
        dataType: 'json',
        type: 'get',
        async: true,
        cache: false,
        success: function (_0x2ba907) {
          var _0x1364bf = _0x2ba907.listings;
          if (_0x1364bf != null) {
            // Проходимся по всем предметам в списке и извлекаем информацию о каждом из них
            _0x1364bf.forEach(_0x53ffe4 => {
              var _0x54ad9a = {};
              _0x54ad9a.name = _0x53ffe4.asset.market_hash_name;
              if (_0x54ad9a.name == '') {
                return;
              }
              var _0x19d124 = new Date(_0x53ffe4.time_created * 1000);
              _0x19d124 = Number(_0x19d124.getFullYear() + String(_0x19d124.getMonth() + 1).padStart(2, '0') + String(_0x19d124.getDate()).padStart(2, '0'));
              _0x54ad9a.date = _0x19d124;
              var _0x12233f = [];
              var _0x4d7042 = _0x53ffe4.asset.descriptions;
              if (_0x53ffe4.asset.appid == '730' && _0x53ffe4.asset.descriptions != undefined) {
                // Если предмет относится к CS:GO и имеет описание, то извлекаем информацию о стикерах
                for (var _0x516a6b = _0x53ffe4.asset.descriptions.length - 1; _0x516a6b >= 0; _0x516a6b--) {
                  if (_0x53ffe4.asset.descriptions[_0x516a6b].value.indexOf('sticker_info') != -1) {
                    var _0x3afa9a = _0x53ffe4.asset.descriptions[_0x516a6b].value.indexOf('Sticker: ') + 8;
                    var _0x2afead = _0x53ffe4.asset.descriptions[_0x516a6b].value.indexOf('</center></div>');
                    var _0x330dbe = _0x53ffe4.asset.descriptions[_0x516a6b].value.substring(_0x3afa9a, _0x2afead).split(',');
                    for (var _0x2a2971 = 0; _0x2a2971 < _0x330dbe.length; _0x2a2971++) {
                      var _0x4d1d32 = {};
                      _0x4d1d32.name = _0x330dbe[_0x2a2971].substring(1, _0x330dbe[_0x2a2971].length);
                      _0x4d1d32.price = 0;
                      _0x12233f.push(_0x4d1d32);
                    }
                    break;
                  }
                }
              }
              _0x54ad9a.stickers = _0x12233f;
              _0x54ad9a.removeId = _0x53ffe4.listingid;
              _0x54ad9a.priceOnSale = _0x53ffe4.price;
              if (_0x54ad9a.stickers.length == 0) {
                _0x54ad9a.price = _0x53ffe4.price + _0x53ffe4.publisher_fee + _0x53ffe4.steam_fee;
              } else {
                _0x54ad9a.price = '';
              }
              _0x54ad9a.appid = _0x53ffe4.asset.appid;
              _0x3c36fb.push(_0x54ad9a);
            });
          }
          setTimeout(function () {
            getMyItemsOnSale(_0x27840d, _0x20b398 + 1, _0x3c36fb);
          }, 200);
        },
        error: function (_0x69f861) {
          log('STEAM ERROR Загрузка списка на продаже');
          getMyItemsOnSale(_0x27840d, _0x20b398 + 1, _0x3c36fb);
          myItemsOnSaleError = true;
          if (_0x69f861.status == 429) {
            logMicroBan();
          }
        }
      });
    } else {
      // Если список предметов на продаже загружен, то проходимся по всем предметам и извлекаем информацию о каждом из них
      items.forEach(_0x4cc79d => {
        _0x4cc79d.removeIds = [];
        _0x3c36fb.forEach(_0x35e715 => {
          if (_0x4cc79d.name == _0x35e715.name) {
            _0x4cc79d.removeIds.push(_0x35e715.removeId);
          }
        });
      });
      var _0x5f32aa = 0;
      _0x3c36fb.forEach(_0xaf37db => {
        _0x5f32aa += _0xaf37db.priceOnSale;
      });
      on_sale_sum = round(_0x5f32aa / 100);
      document.getElementById('on_sale_sum').innerHTML = format(_0x5f32aa / 100);
      $('#user_sum')[0].innerHTML = format(on_sale_sum + balance);
      let _0x1bb4ed = new Date();
      let _0x3b7191 = Number(_0x1bb4ed.getHours());
      if (hourForStats != '') {
        stats(round(_0x5f32aa / 100));
      }
      let _0x3862a0 = String(_0x1bb4ed.getDate()).padStart(2, '0');
      let _0x5d18f3 = String(_0x1bb4ed.getMonth() + 1).padStart(2, '0');
      let _0x389574 = _0x1bb4ed.getFullYear();
      _0x1bb4ed = '' + _0x389574 + _0x5d18f3 + _0x3862a0;
      if (checkLowProfitTime != '' && _0x3b7191 == checkLowProfitTime && checkLowProfitDate != _0x1bb4ed) {
        checkLowProfit();
      }
      if (turnAllOrdersOnTime != '' && _0x3b7191 == turnAllOrdersOnTime && turnAllOrdersOnTimeDate != _0x1bb4ed && balance * 10 > orders_sum && orders_cnt < 1000) {
        turnAllOrdersOnTimeDate = _0x1bb4ed;
        turnItemOnWork(items, true, 0, '');
      }
      var _0x49b73d;
      if (_0x3c36fb.length != _0x27840d || myItemsOnSaleError_cnt > 0 && myItemsOnSaleError_cnt <= 2) {
        myItemsOnSaleError = true;
      } else {
        myItemsOnSaleError = false;
      }
      refreshItemsOnSale(_0x3c36fb, _0x49b73d);
      if (AOSettings && removeFromSaleDays != 0) {
        analyzeOnSaleItems(_0x3c36fb);
      }
      if (AOSettings && removeFromSaleIfKonkurent) {
        var _0x3917fb = [];
        items.forEach(_0xa130b7 => {
          if (_0xa130b7.priceOnSale != '' && _0xa130b7.s_summ_steam < _0xa130b7.priceOnSale) {
            _0x3917fb.push(_0xa130b7);
          }
        });
        if (_0x3917fb.length > 0) {
          var _0x50abbd = [];
          removeFromSaleIfKonkurentFunction(_0x3c36fb, _0x3917fb, _0x50abbd, 0);
        }
      }
      if (!myItemsOnSaleError && !getBuyOrders_error) {
        checkItemsOnSaleOnOrders();
      }
    }
  }
  // Функция, которая отправляет AJAX-запрос на получение списка покупок пользователя на торговой площадке Steam.
  function getBuyOrders() {
    $.ajax({
      url: 'https://steamcommunity.com/market/mylistings/render/?query=&norender=1&start=0&count=0',
      dataType: 'json',
      type: 'get',
      async: true,
      cache: false,
      success: function (_0x7b978b) {
        // Обработка успешного ответа от сервера
        if (_0x7b978b.buy_orders.length == 0) {
          getBuyOrders_error = true;
          getBuyOrders_error_cnt++;
        } else {
          getBuyOrders_error_cnt = 0;
        }
        if (getBuyOrders_error_cnt > 0 && getBuyOrders_error_cnt <= 2) {
          getBuyOrders_error = true;
        } else {
          getBuyOrders_error = false;
        }
        // Обработка списка покупок
        _0x7b978b.buy_orders.forEach(_0xcafd10 => {
          var _0x5e46a9 = {};
          _0x5e46a9.count = Number(_0xcafd10.quantity_remaining);
          _0x5e46a9.name = _0xcafd10.hash_name;
          _0x5e46a9.buyorderid = _0xcafd10.buy_orderid;
          _0x5e46a9.price = round(Number(_0xcafd10.price) / 100);
          if (_0xcafd10.description) {
            _0x5e46a9.appid = _0xcafd10.description.appid;
          } else {
            _0x5e46a9.appid = _0xcafd10.appid;
          }
          orders.push(_0x5e46a9);
        });
        // Обновление цен на предметы
        let _0xc38d80 = [];
        for (var _0x511e69 = 0; _0x511e69 < orders.length; _0x511e69++) {
          var _0x322400 = items.map(function (_0x57fe05) {
            return _0x57fe05.appid + _0x57fe05.name;
          }).indexOf(orders[_0x511e69].appid + orders[_0x511e69].name);
          if (AOSettings) {
            if (_0x322400 != -1 && items[_0x322400].b_summ != round(orders[_0x511e69].price * 100)) {
              items[_0x322400].b_summ = round(orders[_0x511e69].price * 100);
              _0xc38d80.push(items[_0x322400]);
            }
          }
        }
        if (_0xc38d80.length > 0) {
          updateItemsBuySellPrices(_0xc38d80, 0);
          _0x1177f8();
        }
        // Обновление информации о предметах и группах
        for (var _0x511e69 = 0; _0x511e69 < items.length; _0x511e69++) {
          var _0x12e66e = orders.map(function (_0x1105dc) {
            return _0x1105dc.appid + _0x1105dc.name;
          }).indexOf(items[_0x511e69].appid + items[_0x511e69].name);
          if (_0x12e66e != -1) {
            items[_0x511e69].order_cnt = Number(orders[_0x12e66e].count);
            items[_0x511e69].buyorderid = orders[_0x12e66e].buyorderid;
            orders.splice(_0x12e66e, 1);
            $($('#order_cnt_' + _0x511e69)[0]).addClass('color_order');
            $('#order_cnt_' + _0x511e69)[0].innerHTML = '<span>' + items[_0x511e69].order_cnt + '</span><button class = "tableOrder" id=' + _0x511e69 + '>X</button>';
          } else {
            items[_0x511e69].order_cnt = 0;
            items[_0x511e69].buyorderid = '';
            $($('#order_cnt_' + _0x511e69)[0]).removeClass('color_order');
            $('#order_cnt_' + _0x511e69)[0].innerHTML = items[_0x511e69].order_cnt;
          }
        }
        for (var _0x511e69 = 0; _0x511e69 < groups.length; _0x511e69++) {
          groups[_0x511e69].order_cnt = 0;
          items.forEach(_0x43f514 => {
            if (_0x43f514.id_group == groups[_0x511e69].id && _0x43f514.order_cnt != 0) {
              groups[_0x511e69].order_cnt += 1;
            }
          });
          $('#group_order_cnt_' + _0x511e69)[0].innerText = groups[_0x511e69].order_cnt;
        }
        // Обновление информации о количестве покупок
        $('#order_cnt')[0].innerText = _0x7b978b.buy_orders.length;
        orders_cnt = _0x7b978b.buy_orders.length;
        // Обработка отсутствующих предметов в базе данных
        if (!ignoreMissing && orders.length > 0) {
          orders.forEach(_0x425b0c => {
            if (_0x425b0c.appid == 730) {
              log('<a href="https://steamcommunity.com/market/listings/' + _0x425b0c.appid + '/' + _0x425b0c.name + '" target="_blank">' + _0x425b0c.name + '</a> нет в базе');
            } else {
              log(_0x425b0c.name + ' нет в базе');
            }
          });
        }
        // Обновление времени последнего обновления
        var _0xc9da67 = new Date();
        var _0x1052ae = String(_0xc9da67.getHours()).padStart(2, '0') + ':' + String(_0xc9da67.getMinutes()).padStart(2, '0');
        document.getElementById('getOrdersRefreshTimeLable').innerHTML = _0x1052ae;
      },
      error: function (_0x307db2) {
        // Обработка ошибки при получении списка покупок
        log('STEAM ERROR Загрузка списка на продаже');
        getBuyOrders_error = true;
        if (_0x307db2.status == 429) {
          logMicroBan();
        }
      }
    });
  }
  
  function getARCoefficients(prices, errors) {
    const X = prices.map(price => [price, 1]); 
    const Y = errors.map(error => [error]);
  
    const Xt = transpose(X);  
    const XX = matrixMultiplication(Xt, X);  
    const XY = matrixMultiplication(Xt, errors);
    
    const a = matrixDivision(XY, XX);  
    
    const ar1 = a[0][0];
    const ar2 = a[1][0];
    
    return {
      ar1, 
      ar2 
    };
  }
  
  function matrixMultiplication(a, b) {
    const result = [];
    for (let i = 0; i < a.length; i++) {
      result[i] = [];
      for (let j = 0; j < b[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < a[0].length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result.length === 1 ? result[0] : result; // handle column vectors
  }
  
  function matrixDivision(a, b) {
    const bInv = invert(b); // invert b using Gauss-Jordan elimination
    return matrixMultiplication(a, bInv); // multiply a by the inverse of b
  }
  
  function invert(a) {
    const n = a.length;
    const b = [];
    for (let i = 0; i < n; i++) {
      b[i] = [];
      for (let j = 0; j < n; j++) {
        b[i][j] = i === j ? 1 : 0; // create the identity matrix
      }
    }
    for (let i = 0; i < n; i++) {
      const pivot = a[i][i];
      for (let j = 0; j < n; j++) {
        a[i][j] /= pivot;
        b[i][j] /= pivot;
      }
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          const factor = a[j][i];
          for (let k = 0; k < n; k++) {
            a[j][k] -= factor * a[i][k];
            b[j][k] -= factor * b[i][k];
          }
        }
      }
    }
    return b;
  }
  
  function transpose(a) {
    const m = a.length;
    const n = a[0].length;
    const b = [];
    for (let j = 0; j < n; j++) {
      b[j] = [];
      for (let i = 0; i < m; i++) {
        b[j][i] = a[i][j];
      }
    }
    return b;
  }
  
  
  function calculatePricesregres(data, settings) {  
  
    // Получаем настройки
    const analysisPeriod = settings.analysisPeriod;
  
    // Получаем текущую дату
    const currentDate = new Date();
  
    // Вычисляем дату начала анализа
    const startDate = new Date(currentDate.getTime() - (analysisPeriod * 24 * 60 * 60 * 1000));
  
    // Инициализируем переменные
    let sumClosePrices = 0;
    let prevClosePrices = []; 
    let errors = [];
  
    // Делаем реверс итерации по данным, получаем цены закрытия за период анализа 
    data.reverse().forEach((item) => {
      const itemDate = new Date(item[0]);
      if (itemDate >= startDate && itemDate <= currentDate) {
        sumClosePrices += round(item[1]);  
        prevClosePrices.push(round(item[1]));
      }
    })
  
    // Вычисляем среднее значение цен закрытия
    const sma = sumClosePrices / prevClosePrices.length;     
    let { coefficientA, coefficientB } = getARCoefficients(prevClosePrices, errors); 
    for(let i = 0; i < prevClosePrices.length; i++) {     
      const arForecast = coefficientA +  coefficientB * prevClosePrices[i];   
      const forecast = calculateForecast(arForecast, sma);  
      const error = calculateError(forecast, prevClosePrices[i]);
      errors.push(error);
    }
  
  
  
  
    // Получаем результаты для каждой цены закрытия
    const result = [];       
    for(let i = 0; i < prevClosePrices.length; i++){
      // Получаем продажную цену 
      const sellPrice = forecast;      
      // Получаем покупную цену 
      const buyPrice = forecast; 
      result.push({               
        sellPrice,               
        buyPrice             
      })
    }                               
  
    // Возвращаем результат
    return result;
  }
  function calculatePricesbyhis(settings, item_nameid,currency) {
    const result = []; // Результирующий массив
    const analysisPeriod = settings.analysisPeriod; // Период анализа в днях
    const profitPercent = settings.profitPercent; // Процент прибыли
    const profitMinimum = settings.profitPercent_min; // Минимальный процент прибыли
    const lowProfit = settings.minProfit || profitMinimum * 0.01; // Минимальная прибыль
    const corridorPercent = settings.corridorPercent; // Процент коридора
    const sellFactor = settings.sellAlgorithmCoefficient || 1; // Коэффициент продажи
    const buyFactor = settings.buyAlgorithmCoefficient || 1; // Коэффициент покупки
    const movingAveragePeriod = settings.analysisPeriod || 7; // Период скользящего среднего по умолчанию - 7 дней
  
    $.ajax({
      url: 'https://steamcommunity.com/market/itemordershistogram?language=english&currency='+currency+'&item_nameid=' + item_nameid,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        const buyOrders = data.buy_order_graph;
        const sellOrders = data.sell_order_graph;
  const highest_buy_order= data.highest_buy_order;
  const lowest_sell_order=data.lowest_sell_order;
  
        // Do something with the buyOrders and sellOrders arrays
  
        if (data.length === 0) { // Если массив данных пустой, возвращаем пустой массив
          return result;
        }
  
        const buyPricesarray = [];
        const sellPricesarray = [];
  
        buyOrders.forEach((order) => {
          const buyPrice = order[0];
          const buyQuantity = order[1];
          buyPricesarray.push({ price: buyPrice, quantity: buyQuantity });
        });
  
        sellOrders.forEach((order) => {
          const sellPrice = order[0];
          const sellQuantity = order[1];
          sellPricesarray.push({ price: sellPrice, quantity: sellQuantity });
        });
  
        let buyPrice = 0;
        let buyCount = 0;
        buyPricesarray.forEach((item) => {
          buyPrice += Number(item.price);
          buyCount += Number(item.quantity);
        });
  
        let sellPrice = 0;
        let sellCount = 0;
        sellPricesarray.forEach((item) => {
          sellPrice += Number(item.price);
          sellCount += Number(item.quantity);
        });
  
        const totalPricebuy = buyPrice; // Общая цена покупок
        const totalQuantitybuy = buyCount ; // Количество товаров покупок
        const totalPriceSell = sellPrice; // Общая цена продаж
        const totalQuantitySell = sellCount ; // Количество товаров продаж
  
        const pricesb = []; // Массив цен для вычисления скользящего среднего
        const pricess = [];
        // Проходим по всем элементам массива buyPrices
        buyPricesarray.forEach((item) => {
          pricesb.push(Number(item.price)); // Добавляем цену в массив цен для вычисления скользящего среднего
        });
  
        // Проходим по всем элементам массива sellPrices
        sellPricesarray.forEach((item) => {
          pricess.push(Number(item.price)); // Добавляем цену в массив цен для вычисления скользящего среднего
        });
  
        let averagePrice = calculateMovingAverage(pricesb, movingAveragePeriod); // Средняя цена (вычисляем скользящее среднее)
        let profit = averagePrice * (profitPercent / 100); // Прибыль
        let minimumPrice = averagePrice + (averagePrice * (profitMinimum / 100)); // Минимальная цена
        let lowPrice = averagePrice + (averagePrice * lowProfit); // Низкая цена
        let upperCorridor = averagePrice + (averagePrice * (corridorPercent / 100)); // Верхний коридор
        let lowerCorridor = averagePrice - (averagePrice * (corridorPercent / 100)); // Нижний коридор
        // Цена продажи
        buyPrice = Math.max(lowPrice, Math.min(lowerCorridor, averagePrice + profit * buyFactor)); // Цена покупки
        averagePrice = calculateMovingAverage(pricess, movingAveragePeriod); // Средняя цена (вычисляем скользящее среднее)
        profit = averagePrice * (profitPercent / 100); // Прибыль
        minimumPrice = averagePrice + (averagePrice * (profitMinimum / 100)); // Минимальная цена
        lowPrice = averagePrice + (averagePrice * lowProfit); // Низкая цена
        upperCorridor = averagePrice + (averagePrice * (corridorPercent / 100)); // Верхний коридор
        lowerCorridor = averagePrice - (averagePrice * (corridorPercent / 100)); // Нижний коридор
        sellPrice = Math.max(minimumPrice, Math.min(upperCorridor, averagePrice + profit * sellFactor)); // Цена продажи
        const margin = sellPrice - buyPrice; // Маржа
  
        const resultObj = { // Создаем объект с результатами
          avgPrice: averagePrice.toFixed(2), // Средняя цена
          profit: profit.toFixed(2), // Прибыль
          minimumPrice: minimumPrice.toFixed(2), // Минимальная цена
          lowPrice: lowPrice.toFixed(2), // Низкая цена
          upperCorridor: upperCorridor.toFixed(2), // Верхний коридор
          lowerCorridor: lowerCorridor.toFixed(2), // Нижний коридор
          sellPrice: sellPrice.toFixed(2), // Цена продажи
          buyPrice: buyPrice.toFixed(2), // Цена покупки
          margin: margin.toFixed(2), // Маржа
          buyOrders: buyPrice, // Массив покупок
          sellOrders: sellPrice ,// Массив продаж
          highest_buy_order:highest_buy_order,
          lowest_sell_order:lowest_sell_order
        };
        log('itemordershistogram !!!'+JSON.stringify(resultObj)); // Выводим результаты в консоль
        result.push(resultObj); // Добавляем объект с результатами в результирующий массив
        return result; // Возвращаем результирующий массив
      },
      error: function(error) {
        console.error(error);
      }
    });
  }
  
  
  
  
   /*   const settings = {
      analysisPeriod: countDayHistoryGraph, // период анализа в днях
      profitPercent: profitPercent, // процент прибыли
      profitPercent_min: profitPercent_min, // минимальный процент прибыли
      minProfit: minProfit, // низкий процент прибыли
      corridorPercent: percentLimit, // процент коридора
      sellAlgorithmCoefficient: alg_sell_qoeff, // коэффициент продажи
      buyAlgorithmCoefficient: alg_buy_qoeff, // коэффициент покупки
    };
  */

    function calculatePrices(data, settings) {
      const result = []; // Результирующий массив
      const analysisPeriod = settings.analysisPeriod; // Период анализа в днях
      const currentDate = new Date(); // Текущая дата
      const startDate = new Date(currentDate.getTime() - (analysisPeriod * 24 * 60 * 60 * 1000)); // Дата начала анализа
      const profitPercent = settings.profitPercent; // Процент прибыли
      const profitMinimum = settings.profitPercent_min; // Минимальный процент прибыли
      const lowProfit = settings.minProfit || profitMinimum * 0.01; // Минимальная прибыль
      const corridorPercent = settings.corridorPercent; // Процент коридора
      const sellFactor = settings.sellAlgorithmCoefficient || 1; // Коэффициент продажи
      const buyFactor = settings.buyAlgorithmCoefficient || 1; // Коэффициент покупки
      const movingAveragePeriod = settings.analysisPeriod || 7; // Период скользящего среднего по умолчанию - 7 дней
      const trendPeriod = settings.analysisPeriod; // Период тренда (в днях)
      let trendDirection = ''; // Направление тренда
      
      if (data.length === 0) { // Если массив данных пустой, возвращаем пустой массив
        return result;
      }
      
      const smoothing = 0.2; // Коэффициент "забывания" прошлых значений
    
       
      
      let price = 0; // Общая цена
      let count = 0; // Количество товаров
      let prices = []; // Массив цен для вычисления скользящего среднего
      let trendPricescalc = []; // Массив цен для вычисления тренда
      // Проходим по всем элементам массива данных
      data.reverse().forEach((item) => {
      const copyd = JSON.stringify(item[0]); // Копируем дату
      const itemDate = new Date(item[0]); // Создаем объект даты
      if (itemDate >= startDate && itemDate <= currentDate) { // Если дата входит в период анализа
      price += raund(item[1]); // Добавляем цену к общей цене
      count += Number(item[2]); // Добавляем количество товаров
      prices.push(raund(item[1])); // Добавляем цену в массив цен для вычисления скользящего среднего
      trendPricescalc.push({ date: itemDate.getTime(), price: raund(item[1]) });
      }
      });
      const totalPrice = price; // Общая цена
      let averagePrice = calculateMovingAverage(prices, movingAveragePeriod); // Средняя цена (вычисляем скользящее среднее)
      const profit = averagePrice * (profitPercent / 100); // Прибыль
      const minimumPrice = averagePrice + (averagePrice * (profitMinimum / 100)); // Минимальная цена
      const lowPrice = averagePrice + (averagePrice * lowProfit); // Низкая цена
      const upperCorridor = averagePrice + (averagePrice * (corridorPercent / 100)); // Верхний коридор
      const lowerCorridor = averagePrice - (averagePrice * (corridorPercent / 100)); // Нижний коридор
      const sellPrice = Math.max(minimumPrice, Math.min(upperCorridor, averagePrice + profit * sellFactor)); // Цена продажи
      const buyPrice = Math.max(lowPrice, Math.min(lowerCorridor, averagePrice + profit * buyFactor)); // Цена покупки
      const margin = sellPrice - buyPrice; // Маржа
      let previousAverage = 0; // Предыдущее среднее
    let previousLastPrice; 
    // Используем экспоненциально взвешенное среднее
    for (let i = 0; i < prices.length; i++) {
      lastPrice = prices[i];  
      averagePrice = lastPrice * smoothing + (1 - smoothing) * previousAverage;    
      previousLastPrice = lastPrice;    
      previousAverage = averagePrice;  
    }
    
    
    let sumX = 0; 
    let sumY = 0;   
    let sumXSq = 0;
    let allXi = [];  // Массив со всеми xi
    let allYi = [];  // Массив со всеми yi
    let n = trendPricescalc.length; 
    for (let i = 0; i < trendPricescalc.length; i++) {
      const xi = trendPricescalc[i].date;  
      const yi = trendPricescalc[i].price;  
     
      sumX += xi;   
      sumY += yi;        
      sumXSq += Math.pow(xi, 2);
      
      allXi.push(xi);  // Добавляем каждое xi в массив
      allYi.push(yi);  // Добавляем каждое yi в массив
    }
    
    const regCoef = calculateWeightedRegression(allXi, allYi);  
    
    
    const trendSlope = ((n * regCoef - sumX * sumY) /  
                          (n * sumXSq - Math.pow(sumX, 2)));
      const futurePrices = []; // Массив прогнозируемых цен
      for (let i = 1; i <= settings.analysisPeriod; i++) { // Прогнозируем цены на следующие 7 дней
        const futureDate = new Date(currentDate.getTime() + (i * 24 * 60 * 60 * 1000)); // Создаем объект даты для будущей даты
        const futureDateNum = futureDate.getTime(); // Преобразуем будущую дату в числовой формат
        const futurePrice = parseInt(trendSlope) * futureDateNum + averagePrice; // Прогнозируем цену на будущую дату
        futurePrices.push({ date: new Date(futureDateNum), price: raund(futurePrice) }); // Добавляем объект {date, price} в массив прогнозируемых цен
      }
      const trendPrices = prices.slice(-trendPeriod); // Массив прогнозируемых цен
      const trendSum = trendPrices.reduce((sum, price) => sum + price, 0);
      const trendAverage = trendSum / trendPeriod;
      const currentPrice = prices[prices.length - 1]; // Текущая цена
      if (currentPrice > trendAverage) {
        trendDirection = 'up';
      } else if (currentPrice < trendAverage) {
        trendDirection = 'down';
      } else {
        trendDirection = 'flat';
      }
      mostfreque=calculateMostFrequentAmount(prices,upperCorridor,lowerCorridor);
      const resultObj = { // Создаем объект с результатами
        mostfreque:Number(mostfreque),
        totalprice: Number(totalPrice.toFixed(2)), // Общая цена
        count: Number(count), // Количество товаров
        avgPrice: Number(averagePrice.toFixed(2)), // Средняя цена
        profit: Number(profit.toFixed(2)), // Прибыль
        minimumPrice: Number(minimumPrice.toFixed(2)), // Минимальная цена
        lowPrice: Number(lowPrice.toFixed(2)), // Низкая цена
        upperCorridor: Number(upperCorridor.toFixed(2)), // Верхний коридор
        lowerCorridor: Number(lowerCorridor.toFixed(2)), // Нижний коридор
        sellPrice: Number(sellPrice.toFixed(2)), // Цена продажи
        buyPrice:Number( buyPrice.toFixed(2)), // Цена покупки
        margin: Number(margin.toFixed(2)), // Маржа
        trendDirection: trendDirection+'('+trendSlope.toFixed(8)+')', // Направление тренда
        trendPrices:trendPrices,
        getBuyerPayssellPrice: getBuyerPays(sellPrice),
        getSteamFeesellPrice:getSteamFee(sellPrice),
        getBuyerPaysbuyPrice: getBuyerPays(buyPrice),
        getSteamFeebuyPrice:getSteamFee(buyPrice)
       // futurePrices: futurePrices
      };
    
      log('STEAMCALC !!!'+JSON.stringify(resultObj)); // Выводим результаты в консоль
      result.push(resultObj); // Добавляем объект с результатами в результирующий массив
      return result; // Возвращаем результирующий массив
    }

    const TSA = require('timeseries-analysis');

  function calculatePricestimeseriesConverted(data, settings) {
      const result = [];
    const analysisPeriod = settings.analysisPeriod;
    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime() - (analysisPeriod * 24 * 60 * 60 * 1000));
    const profitPercent = settings.profitPercent;
    const profitMinimum = settings.profitPercent_min;
    const lowProfit = settings.minProfit || profitMinimum * 0.01;
    const corridorPercent = settings.corridorPercent;
    const sellFactor = settings.sellAlgorithmCoefficient || 1;
    const buyFactor =  settings.buyAlgorithmCoefficient || 1;
  
  
      // проверка на пустой массив данных
      if (data.length === 0) {
          return result;
      }
  let tsData= [];
      let price = 0; // общая стоимость товаров
      let count = 0; // общее количество товаров
      let itemDate;
      let prices = []; 
      data.forEach((item) => {
         // Извлекаем год, месяц и день из даты в формате YYYYMMDD
          const copyd = JSON.stringify(item[0]);
          const y = copyd.slice(0, 4);
          const m = copyd.slice(4, 6);
          const d = copyd.slice(6, 8);
          // Преобразуем дату из строки в объект Date
          itemDate = new Date(`${y}-${m}-${d}`);

          if (itemDate >= startDate && itemDate <= currentDate) {
            
              price += item[1]; // добавляем стоимость товара в общую стоимость
              count += Number(item[2]); // добавляем количество товара в общее количество
              prices.push(item[1]);
              tsData.push([itemDate, item[1]]);
          }
      });
      const t = new TSA.main(tsData);
      const totalPrice = round(price); // Общая стоимость товаров
      const averagePriceTSAArray = t.ma({ period: analysisPeriod }).output();
      const averagePrice = averagePriceTSAArray[averagePriceTSAArray.length - 1][1];
      
    //  const averagePrice = t.mean(); // Средняя цена за единицу товара, или 0, если count === 0
      const profit = averagePrice * (profitPercent / 100);
      const minimumPrice = averagePrice + (averagePrice * (profitMinimum / 100));
      const lowPrice = averagePrice + (averagePrice * (lowProfit / 100));
      const upperCorridor = averagePrice + (averagePrice * (corridorPercent / 100));
      const lowerCorridor = averagePrice - (averagePrice * (corridorPercent / 100));
  
      t.smoother({ period: analysisPeriod }).save('smoothed');
      const bestSettings = t.regression_forecast_optimize();
  
      t.sliding_regression_forecast({
          method: bestSettings.method,
          sample: bestSettings.sample,
          degree: bestSettings.degree,
      });
  
      const forecast = t.data[Number(bestSettings.sample)][1];
      console.log(t.chart({main:true}));
      const predictedSellPrice = Math.max(minimumPrice, Math.min(upperCorridor, forecast + profit * sellFactor));
      const predictedBuyPrice = Math.max(lowPrice, Math.min(lowerCorridor, forecast + profit * buyFactor));
      const steamFee = getSteamFee(predictedSellPrice);
      const buyerPays = getBuyerPays(predictedSellPrice);
      const predictedAvgPrice = forecast;
      const predictedProfit = predictedAvgPrice * (profitPercent / 100);
      const predictedUpperCorridor = predictedAvgPrice + (predictedAvgPrice * (corridorPercent / 100));
      const predictedLowerCorridor = predictedAvgPrice - (predictedAvgPrice * (corridorPercent / 100));
  
      const averagePriceTSA = t.ma({ period: analysisPeriod }).output().reduce((sum, item) => sum + item[1], 0) / analysisPeriod;
      const competitiveness = averagePriceTSA / minimumPrice;
  
      const resultObj = {
    count:count,
    total:round(totalPrice),
    avgPrice:round(averagePrice),
    profit:round(profit),
    minimumPrice:round(minimumPrice),
    lowPrice:round(lowPrice),
    upperCorridor:round(upperCorridor),
    lowerCorridor:round(lowerCorridor),
    predictedSellPrice:round(predictedSellPrice),
    predictedBuyPrice:round(predictedBuyPrice),
    predictedAvgPrice:round(predictedAvgPrice),
    predictedProfit:round(predictedProfit),
    predictedUpperCorridor:round(predictedUpperCorridor),
    predictedLowerCorridor:round(predictedLowerCorridor),
    competitiveness: round(competitiveness),
    steamFee: steamFee,
    buyerPays: buyerPays
    };
    log('calculatePricestimeseriesConverted !!!'+JSON.stringify(resultObj)); // Выводим результаты в консоль
    result.push(resultObj);
    return result;
  }

  function calculatePricestimeseries(data, settings) {
    const result = [];
    const analysisPeriod = settings.analysisPeriod;
    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime() - (analysisPeriod * 24 * 60 * 60 * 1000));
    const profitPercent = settings.profitPercent;
    const profitMinimum = settings.profitPercent_min;
    const lowProfit = settings.minProfit || profitMinimum * 0.01;
    const corridorPercent = settings.corridorPercent;
    const sellFactor = settings.sellAlgorithmCoefficient || 1;
    const buyFactor = settings.buyAlgorithmCoefficient || 1;

    // Проверка на пустой массив данных
    if (data.length === 0) {
        return result;
    }

    let price = 0; // Общая стоимость товаров
    let count = 0; // Общее количество товаров
    let itemDate;
    let tsData = [];
    data.forEach((item) => {
        itemDate = new Date(item[0]);
        if (itemDate >= startDate && itemDate <= currentDate) {
            price += item[1]; // Добавляем стоимость товара в общую стоимость
            count += Number(item[2]); // Добавляем количество товара в общее количество
            tsData.push([itemDate, item[1]]);
        }
    });

    const t = new TSA.main(tsData);
    const totalPrice = round(price); // Общая стоимость товаров
    const averagePriceTSAArray = t.ma({ period: analysisPeriod }).output();
    const averagePrice = averagePriceTSAArray[averagePriceTSAArray.length - 1][1];
    
  //  const averagePrice = t.mean(); // Средняя цена за единицу товара, или 0, если count === 0
    const profit = averagePrice * (profitPercent / 100);
    const minimumPrice = averagePrice + (averagePrice * (profitMinimum / 100));
    const lowPrice = averagePrice + (averagePrice * (lowProfit / 100));
    const upperCorridor = averagePrice + (averagePrice * (corridorPercent / 100));
    const lowerCorridor = averagePrice - (averagePrice * (corridorPercent / 100));

    t.smoother({ period: analysisPeriod }).save('smoothed');
    const bestSettings = t.regression_forecast_optimize();

    t.sliding_regression_forecast({
        method: bestSettings.method,
        sample: bestSettings.sample,
        degree: bestSettings.degree,
    });

    const forecast = t.data[Number(bestSettings.sample)][1];
    console.log(t.chart({main:true}));
    const predictedSellPrice = Math.max(minimumPrice, Math.min(upperCorridor, forecast + profit * sellFactor));
    const predictedBuyPrice = Math.max(lowPrice, Math.min(lowerCorridor, forecast + profit * buyFactor));
    const steamFee = getSteamFee(predictedSellPrice);
    const buyerPays = getBuyerPays(predictedSellPrice);
    const predictedAvgPrice = forecast;
    const predictedProfit = predictedAvgPrice * (profitPercent / 100);
    const predictedUpperCorridor = predictedAvgPrice + (predictedAvgPrice * (corridorPercent / 100));
    const predictedLowerCorridor = predictedAvgPrice - (predictedAvgPrice * (corridorPercent / 100));

    const averagePriceTSA = t.ma({ period: analysisPeriod }).output().reduce((sum, item) => sum + item[1], 0) / analysisPeriod;
    const competitiveness = averagePriceTSA / minimumPrice;

    const resultObj = {
  count:count,
  total:round(totalPrice),
  avgPrice:round(averagePrice),
  profit:round(profit),
  minimumPrice:round(minimumPrice),
  lowPrice:round(lowPrice),
  upperCorridor:round(upperCorridor),
  lowerCorridor:round(lowerCorridor),
  predictedSellPrice:round(predictedSellPrice),
  predictedBuyPrice:round(predictedBuyPrice),
  predictedAvgPrice:round(predictedAvgPrice),
  predictedProfit:round(predictedProfit),
  predictedUpperCorridor:round(predictedUpperCorridor),
  predictedLowerCorridor:round(predictedLowerCorridor),
  competitiveness: round(competitiveness),
  steamFee: steamFee,
  buyerPays: buyerPays
  };
  log('calculatePricestimeseries !!!'+JSON.stringify(resultObj)); // Выводим результаты в консоль
  result.push(resultObj);
  return result;
}
    function calculateMovingAverage(prices, period) {
      let sum = 0;
      const length = Math.min(prices.length, period);
      for (let i = 0; i < length; i++) {
        sum += prices[prices.length - 1 - i];
      }
      return sum / length;
    }
  
    // Функция вычисления тренда
    function calculateTrend(pricescalc, period) {
  
      const buffer = new timeseries.main(timeseries.adapter.fromArray(pricescalc[0].date), pricescalc.map((item) => item.price));
      const trend = buffer.ma(period);
      return trend[trend.length - 1] > 0 ? 'up' : trend[trend.length - 1] < 0 ? 'down' : 'side';
    }
  
    // Округление до 2 знаков после запятой
    function raund(x) {
      return Math.round(x * 100) / 100;
    }
  
  
  
  
  function calculateMostFrequentAmount(prices, upperCorridor, lowerCorridor) {
    const amountCounts = new Map();
    let mostFrequentAmount = null;
    let mostFrequentCount = 0;
    for (const price of prices) {
      const isWithinCorridor = (price >= lowerCorridor && price <= upperCorridor);
      if (!isWithinCorridor) {
        continue; // Пропускаем цены, не входящие в коридор
      }
      const count = amountCounts.get(price) || 0;
      amountCounts.set(price, count + 1);
      if (count + 1 > mostFrequentCount) {
        mostFrequentAmount = price;
        mostFrequentCount = count + 1;
      }
    }
    return mostFrequentAmount;
  }
  
  
  function calculatePricesconverted(data, settings) {
    const result = []; // Результирующий массив
    const analysisPeriod = settings.analysisPeriod; // Период анализа в днях
    const currentDate = new Date(); // Текущая дата
    const startDate = new Date(currentDate.getTime() - (analysisPeriod * 24 * 60 * 60 * 1000)); // Дата начала анализа
    const profitPercent = settings.profitPercent; // Процент прибыли
    const profitMinimum = settings.profitPercent_min; // Минимальный процент прибыли
    const lowProfit = settings.minProfit || profitMinimum * 0.01; // Минимальная прибыль
    const corridorPercent = settings.corridorPercent; // Процент коридора
    const sellFactor = settings.sellAlgorithmCoefficient || 1; // Коэффициент продажи
    const buyFactor = settings.buyAlgorithmCoefficient || 1; // Коэффициент покупки
    const movingAveragePeriod = settings.analysisPeriod || 7; // Период скользящего среднего по умолчанию - 7 дней
    const trendPeriod = settings.analysisPeriod; // Период тренда (в днях)
    let trendDirection = ''; // Направление тренда
    if (data.length === 0) { // Если массив данных пустой, возвращаем пустой массив
      return result;
    }
    
    let price = 0; // Общая цена
    let count = 0; // Количество товаров
    let prices = []; // Массив цен для вычисления скользящего среднего
    let trendPrices = []; // Массив цен для вычисления тренда
    
    // Проходим по всем элементам массива данных
    data.forEach((item) => {
      const copyd = JSON.stringify(item[0]); // Копируем дату
      const y = copyd.slice(0, 4); // Извлекаем год
      const m = copyd.slice(4, 6); // Извлекаем месяц
      const d = copyd.slice(6, 8); // Извлекаем день
      const itemDate = new Date(`${y}-${m}-${d}`); // Создаем объект даты
      if (itemDate >= startDate && itemDate <= currentDate) { // Если дата входит в период анализа
        price += round(item[1]); // Добавляем цену к общей цене
        count += item[2]; // Добавляем количество товаров
        prices.push(round(item[1])); // Добавляем цену в массив цен для вычисления скользящего среднего
        trendPrices.push({ date: itemDate.getTime(), price: round(item[1]) }); // Добавляем объект {date, price} в массив цен для вычисления тренда
      }
    });
    
    const totalPrice = price; // Общая цена
    const averagePrice = calculateMovingAverage(prices, movingAveragePeriod); // Средняя цена (вычисляем скользящее среднее)
    const profit = averagePrice * (profitPercent / 100); // Прибыль
    const minimumPrice = averagePrice + (averagePrice * (profitMinimum / 100)); // Минимальная цена
    const lowPrice = averagePrice + (averagePrice * lowProfit); // Низкая цена
    const upperCorridor = averagePrice + (averagePrice * (corridorPercent / 100)); // Верхний коридор
    const lowerCorridor = averagePrice - (averagePrice * (corridorPercent / 100)); // Нижний коридор
    const sellPrice = Math.max(minimumPrice, Math.min(upperCorridor, averagePrice + profit * sellFactor)); // Цена продажи
    const buyPrice = Math.max(lowPrice, Math.min(lowerCorridor, averagePrice + profit * buyFactor)); // Цена покупки
    const margin = sellPrice - buyPrice; // Маржа
    const MostFrequentAmount=calculateMostFrequentAmount(prices,upperCorridor,lowerCorridor); // Часто встречающаяся цена
    const trendSlope = calculateTrendSlope(trendPrices); // Коэффициент наклона линии тренда
    const futurePrices = []; // Массив прогнозируемых цен
    for (let i = 1; i <= settings.analysisPeriod; i++) { // Прогнозируем цены на следующие 7 дней
      const futureDate = new Date(currentDate.getTime() + (i * 24 * 60 * 60 * 1000)); // Создаем объект даты для будущей даты
      const futureDateNum = futureDate.getTime(); // Преобразуем будущую дату в числовой формат
      const futurePrice = parseInt(trendSlope) * futureDateNum + averagePrice; // Прогнозируем цену на будущую дату
      futurePrices.push({ date: new Date(futureDateNum), price: round(futurePrice) }); // Добавляем объект {date, price} в массив прогнозируемых цен
    }
    const trendPricesupdw = prices.slice(-trendPeriod);
    const trendSum = trendPricesupdw.reduce((sum, price) => sum + price, 0);
    const trendAverage = trendSum / trendPeriod;
    const currentPrice = prices[prices.length - 1];
    if (currentPrice > trendAverage) {
      trendDirection = 'up';
    } else if (currentPrice < trendAverage) {
      trendDirection = 'down';
    } else {
      trendDirection = 'flat';
    }
    const resultObj = { // Создаем объект с результатами
      MostFrequentAmount:Number(MostFrequentAmount),
      totalprice: Number(totalPrice.toFixed(2)), // Общая цена
      count: Number(count), // Количество товаров
      avgPrice: Number(averagePrice.toFixed(2)), // Средняя цена
      profit: Number(profit.toFixed(2)), // Прибыль
      minimumPrice: Number(minimumPrice.toFixed(2)), // Минимальная цена
      lowPrice: Number(lowPrice.toFixed(2)), // Низкая цена
      upperCorridor: Number(upperCorridor.toFixed(2)), // Верхний коридор
      lowerCorridor: Number(lowerCorridor.toFixed(2)), // Нижний коридор
      sellPrice: Number(sellPrice.toFixed(2)), // Цена продажи
      buyPrice:Number( buyPrice.toFixed(2)), // Цена покупки
      margin: Number(margin.toFixed(2)), // Маржа
      trendDirection: trendDirection, // Направление тренда
      trendPrices:trendPricesupdw,
      getBuyerPayssellPrice: getBuyerPays(sellPrice),
      getSteamFeesellPrice:getSteamFee(sellPrice),
      getBuyerPaysbuyPrice: getBuyerPays(buyPrice),
      getSteamFeebuyPrice:getSteamFee(buyPrice)
      //futurePrices: futurePrices // Прогнозируемые цены на следующие 7 дней
  
    };
  
    log('STEAMCONVERTED !!!'+JSON.stringify(resultObj)); // Выводим результаты в консоль
    //getBuyerPays();
    result.push(resultObj); // Добавляем объект с результатами в результирующий массив
    return result; // Возвращаем результирующий массив
  }
  
  // Функция для вычисления коэффициента наклона линии тренда
  
  /**
   * Вычисляет коэффициент наклона линии тренда с помощью линейной регрессии.
   * @param {Array} prices - Массив объектов с свойствами `date` и `price`.
   * @returns {Number} Коэффициент наклона линии тренда.
   */
  function calculateTrendSlope(trendPrices) {
    const n = trendPrices.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;
    for (let i = 0; i < n; i++) {
      const x = trendPrices[i].date;
      const y = round(trendPrices[i].price);
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumX2 += x * x;
    }
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    return slope.toFixed(8);
  }
  // Эта функция вычисляет взвешенную регрессию двух массивов данных - x и y.
  
  function calculateWeightedRegression(x, y) {
    let n = x.length;  // определение длины массива
    let sumX = 0;      // инициализация переменной для суммирования значений массива x
    let sumY = 0;      // инициализация переменной для суммирования значений массива y
    let sumXY = 0;     // инициализация переменной для суммирования произведений значений x и y
    let sumX2 = 0;     // инициализация переменной для суммирования квадратов значений x
  
    // Цикл для суммирования значений массивов
    for (let i = 0; i < n; i++) {
      sumX += x[i];               // Суммирование значения x[i] в переменной sumX
      sumY += y[i];               // Суммирование значения y[i] в переменной sumY
      sumXY += x[i] * y[i];       // Суммирование произведения x[i] и y[i] в переменной sumXY
      sumX2 += x[i] * x[i];       // Суммирование квадратов x[i] в переменной sumX2
    }  
  
    return (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);  // Возвращение результата вычисления взвешенной регрессии
  }
  
  
  // Функция вычисления скользящего среднего
  //function calculateMovingAverage(prices, period) {
  //  if (prices.length < period) { // Если длина массива цен меньше, чем период скользящего среднего, возвращаем 0
  //    return 0;
  //  }
  //  const sum = prices.slice(-period).reduce((acc, val) => acc + val, 0); // Суммируем цены за последние period дней
   // return sum / period; // Вычисляем среднее значение
  //}
  
  
  // Функция добавляет цены продажи к элементам в массиве для продажи
  // _0x34099c - массив элементов для продажи
  // _0x23a363 - индекс текущего элемента в массиве
  function addListingToItemsForSale(_0x34099c, _0x23a363) {
  
    // Проверяем, работает ли программа
    if (!working) {
        return;
    }
  
    // Проверяем, есть ли еще элементы в массиве для обработки
    if (_0x23a363 < _0x34099c.length) {
  
        // Ищем текущий элемент во временном массиве tempListing
        let _0x454479 = tempListing.map(function (_0x157d60) {
            return _0x157d60.appid + _0x157d60.name;
        }).indexOf(_0x34099c[_0x23a363].appid + _0x34099c[_0x23a363].name);
  
        // Если элемент не найден во временном массиве tempListing
        if (_0x454479 == -1) {
  
            // Ищем текущий элемент в главном массиве items
            let _0x9f0958 = items.map(function (_0xdd1d54) {
                return _0xdd1d54.appid + _0xdd1d54.name;
            }).indexOf(_0x34099c[_0x23a363].appid + _0x34099c[_0x23a363].name);
  
            // Если элемент найден в главном массиве items
            if (_0x9f0958 != -1) {
  
                // Формируем запрос на получение стакана заказов для текущего элемента
                let _0x4b4a27 = 'https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=' + currency.id + '&item_nameid=' + items[_0x9f0958].item_nameid + '&two_factor=0';
  
                // Отправляем запрос на получение стакана заказов для текущего элемента
                $.ajax({
                    url: _0x4b4a27,
                    dataType: 'json',
                    type: 'get',
                    async: true,
                    cache: true,
                    success: function (_0x291457) {
  
                        // Если стакан заказов получен успешно
                        if (_0x291457.sell_order_graph != undefined) {
  
                            // Формируем список цен продажи
                            let _0x590222 = _0x291457.sell_order_graph;
                            let _0x566145 = [];
                            let _0x5c1f5a = 0;
                            for (let _0x23fefa = 0; _0x23fefa < _0x291457.sell_order_graph.length; _0x23fefa++) {
                                if (_0x5c1f5a < 10) {
                                    for (let _0x2326c7 = 0; _0x2326c7 < _0x291457.sell_order_graph[_0x23fefa][1]; _0x2326c7++) {
                                        if (_0x5c1f5a < 10) {
                                            _0x566145.push(_0x291457.sell_order_graph[_0x23fefa][0]);
                                            _0x5c1f5a++;
                                        } else {
                                            break;
                                        }
                                    }
                                } else {
                                    break;
                                }
                            }
  
                            // Сортируем список цен продажи по возрастанию
                            _0x566145.sort(function (_0x2b419e, _0x595c02) {
                                return _0x2b419e - _0x595c02;
                            });
  
                            // Добавляем список цен продажи к текущему элементу и сохраняем его во временном массиве tempListing
                            _0x34099c[_0x23a363].listing = _0x566145;
                            let _0xf92d8f = {};
                            _0xf92d8f.name = _0x34099c[_0x23a363].name;
                            _0xf92d8f.listing = _0x566145;
                            tempListing.push(_0xf92d8f);
                        }
  
                        // Вызываем функцию рекурсивно для следующего элемента в массиве
                        setTimeout(function () {
                            addListingToItemsForSale(_0x34099c, _0x23a363 + 1);
                        }, 0);
                    },
                    error: function (_0x341443) {
                      
  
                        // Выводим сообщение об ошибке в консоль
                        log('STEAM ERROR Загрузка стакана заказов');
  
                        // Вызываем функцию рекурсивно для следующего элемента в массиве
                        addListingToItemsForSale(_0x34099c, _0x23a363 + 1);
  
                        // Проверяем, был ли получен код ошибки 429 (слишком много запросов)
                        if (_0x341443.status == 429) {
                            logMicroBan(true);
                        }
                    }
                });
            } else {
  
                // Если элемент не найден в главном массиве items и ignoreMissing равен false
                if (!ignoreMissing) {
                    log(_0x34099c[_0x23a363].name + ' нет в базе');
                }
  
                // Вызываем функцию рекурсивно для следующего элемента в массиве
                addListingToItemsForSale(_0x34099c, _0x23a363 + 1);
            }
        } else {
  
            // Если элемент найден во временном массиве tempListing
            _0x34099c[_0x23a363].listing = tempListing[_0x454479].listing;
  
            // Вызываем функцию рекурсивно для следующего элемента в массиве
            addListingToItemsForSale(_0x34099c, _0x23a363 + 1);
        }
    } else if (sellWithStickers) {
  
        // Если все элементы в массиве обработаны и sellWithStickers равен true, вызываем функцию addStickerPrice
        addStickerPrice(_0x34099c, 0);
    } else {
  
        // Если все элементы в массиве обработаны и sellWithStickers равен false, вызываем функцию addPriceToItemsForSale
        addPriceToItemsForSale(_0x34099c);
    }
  }
  
  
  function addStickerPrice(_0x45deda, _0x314cb9) {
    if (_0x314cb9 < _0x45deda.length) {
      if (_0x45deda[_0x314cb9].stickers.length > 0 && _0x45deda[_0x314cb9].name.indexOf('Souvenir') == -1) {
        findStickerPrice(_0x45deda, _0x45deda[_0x314cb9].stickers, _0x314cb9, 0);
      } else {
        setTimeout(function () {
          addStickerPrice(_0x45deda, _0x314cb9 + 1);
        }, 0);
      }
    } else {
      addPriceToItemsForSale(_0x45deda);
    }
  }
  function findStickerPrice(_0x130a9d, _0x58c82f, _0x4c95c0, _0x2ae99c) {
    if (!working) {
      return;
    }
    if (_0x2ae99c < _0x58c82f.length) {
      let _0x2577a5;
      if (_0x58c82f[_0x2ae99c].type == 'patch') {
        _0x2577a5 = 'Patch | ';
      } else {
        _0x2577a5 = 'Sticker | ';
      }
      $.get('https://steamcommunity.com/market/pricehistory/', {
        country: 'US',
        currency: currency.id,
        appid: 730,
        cache: false,
        market_hash_name: _0x2577a5 + _0x58c82f[_0x2ae99c].name
      }).done(function (_0x5a8150) {
        if (_0x5a8150.price_prefix == '$' && currency.id != 1) {
          findStickerPrice(_0x130a9d, _0x58c82f, _0x4c95c0, _0x2ae99c);
          return;
        }
        var _0x34d89d = _0x5a8150.prices;
        var _0x4a36a4 = [];
        var _0x520102 = 0;
        for (k = 1; k <= 168; k++) {
          if (_0x5a8150.prices[_0x5a8150.prices.length - k] != undefined) {
            _0x4a36a4[_0x520102] = round(_0x5a8150.prices[_0x5a8150.prices.length - k][1]);
            _0x520102++;
          }
        }
        var _0x2b5c71 = Math.floor(_0x4a36a4.length / 2);
        _0x4a36a4.sort(function (_0xceda52, _0x2ee3af) {
          return _0xceda52 - _0x2ee3af;
        });
        if (_0x4a36a4.length % 2) {
          medianPrice = _0x4a36a4[_0x2b5c71];
        } else {
          medianPrice = (_0x4a36a4[_0x2b5c71] + _0x4a36a4[_0x2b5c71 + 1]) / 2;
        }
        _0x58c82f[_0x2ae99c].price = round(medianPrice);
        setTimeout(function () {
          findStickerPrice(_0x130a9d, _0x58c82f, _0x4c95c0, _0x2ae99c + 1);
        }, 0);
      }).fail(function () {
        findStickerPrice(_0x130a9d, _0x58c82f, _0x4c95c0, _0x2ae99c + 1);
      });
    } else {
      addStickerPrice(_0x130a9d, _0x4c95c0 + 1);
    }
  }
  function filterByFloat(_0x71cd3, _0x5e0fb2, _0x51407d) {
    if (!working) {
      return;
    }
    if (_0x5e0fb2 < _0x71cd3.length) {
      if (_0x71cd3[_0x5e0fb2].appid == 730 && _0x71cd3[_0x5e0fb2].float != '' && (_0x71cd3[_0x5e0fb2].min_float != '' || _0x71cd3[_0x5e0fb2].max_float != '')) {
        $.get('https://api.csgofloat.com/?url=' + _0x71cd3[_0x5e0fb2].float).done(function (_0x50e8a7) {
          var _0x10bbe3 = _0x50e8a7.iteminfo.floatvalue;
          if (_0x50e8a7.iteminfo.floatvalue >= _0x71cd3[_0x5e0fb2].min_float && (_0x50e8a7.iteminfo.floatvalue <= _0x71cd3[_0x5e0fb2].max_float || _0x71cd3[_0x5e0fb2].max_float == '')) {
            log(getLinkItem(_0x71cd3[_0x5e0fb2]) + ' Найден предмет с флоат: ' + _0x50e8a7.iteminfo.floatvalue);
            if (telegram_alert_filterfloat) {
              sendMsgTelegramBot(_0x71cd3[_0x5e0fb2].name + ' Найден предмет с флоат: ' + _0x50e8a7.iteminfo.floatvalue);
            }
            arrayOfIgnoredAssets.push(_0x71cd3[_0x5e0fb2].assetid);
          } else {
            _0x51407d.push(_0x71cd3[_0x5e0fb2]);
          }
          filterByFloat(_0x71cd3, _0x5e0fb2 + 1, _0x51407d);
        }).fail(function () {
          filterByFloat(_0x71cd3, _0x5e0fb2 + 1, _0x51407d);
          log(getLinkItem(_0x71cd3[_0x5e0fb2]) + ' Не могу вычислить флоат');
        });
      } else {
        _0x51407d.push(_0x71cd3[_0x5e0fb2]);
        filterByFloat(_0x71cd3, _0x5e0fb2 + 1, _0x51407d);
      }
    } else {
      addListingToItemsForSale(_0x51407d, 0);
    }
  }
  function updateItemsPricesByAnalyzis(_0x19f59d, _0x354770, _0x71969b) {
    if (_0x354770 == 0) {
      createProgressBar('updateItemsPricesByAnalyzisBar', 'Пересчет предметов', _0x19f59d.length - 1);
    }
    if (_0x354770 < _0x19f59d.length) {
      updateProgressBar('updateItemsPricesByAnalyzisBar', _0x354770);
      log('Пересчет цены: ' + getLinkItem(_0x19f59d[_0x354770]));
      var _0x48b85b = items.map(function (_0x5e28d3) {
        return _0x5e28d3.appid + _0x5e28d3.name;
      }).indexOf(_0x19f59d[_0x354770].appid + _0x19f59d[_0x354770].name);
      var _0x3c89c6 = items[_0x48b85b].group_settings;
      var _0x91892d = items[_0x48b85b].group_settings.profitPercent == '' ? profitPercent : items[_0x48b85b].group_settings.profitPercent;
      var _0x1c5fe1 = items[_0x48b85b].group_settings.minProfit == '' ? minProfit : items[_0x48b85b].group_settings.minProfit;
      var _0x359514 = items[_0x48b85b].group_settings.countDayHistoryGraph == '' ? countDayHistoryGraph : items[_0x48b85b].group_settings.countDayHistoryGraph;
      var _0x58864e = items[_0x48b85b].group_settings.percentLimit == '' ? percentLimit : items[_0x48b85b].group_settings.percentLimit;
      var _0x187910 = items[_0x48b85b].group_settings.algoritm == '' ? algoritm : items[_0x48b85b].group_settings.algoritm;
      var _0x4f3cbc = items[_0x48b85b].group_settings.algoritm_buy == '' ? algoritm_buy : items[_0x48b85b].group_settings.algoritm_buy;
      var _0x579ad0 = items[_0x48b85b].group_settings.orderPercent == '' ? orderPercent : items[_0x48b85b].group_settings.orderPercent;
      var _0x2d13e7 = items[_0x48b85b].group_settings.alg_buy_qoeff == '' ? alg_buy_qoeff : items[_0x48b85b].group_settings.alg_buy_qoeff;
      var _0x433a2c = items[_0x48b85b].group_settings.alg_sell_qoeff == '' ? alg_sell_qoeff : items[_0x48b85b].group_settings.alg_sell_qoeff;
      let _0x5194f0;
      if (_0x19f59d[_0x354770].name.indexOf('&') != -1 || _0x19f59d[_0x354770].name.indexOf('#') != -1) {
        _0x5194f0 = encodeURIComponent(_0x19f59d[_0x354770].name);
      } else {
        _0x5194f0 = encodeURI(_0x19f59d[_0x354770].name);
      }
  
      let _0x41efb8 = 'https://steamcommunity.com/market/pricehistory?country=US&currency=' + currency.id + '&appid=' + _0x19f59d[_0x354770].appid + '&market_hash_name=' + _0x5194f0;
      $.ajax({
        url: _0x41efb8,
        dataType: 'json',
        type: 'get',
        async: true,
        cache: true,
        success: function (_0x240e5b) {
          if (_0x240e5b.price_prefix == '$' && currency.id != 1) {
            updateItemsPricesByAnalyzis(_0x19f59d, _0x354770, _0x71969b);
            return;
          }
          _0x19f59d[_0x354770].priceHistory = _0x240e5b.prices;
  
         
         ;
         
         convertPriceHistory(_0x19f59d[_0x354770]);
         const settings = {
          analysisPeriod: countDayHistoryGraph, // период анализа в днях
          profitPercent: profitPercent, // процент прибыли в виде десятичной дроби
          profitPercent_min: profitPercent_min, // минимальный процент прибыли в виде десятичной дроби
          minProfit: minProfit, // низкий процент прибыли в виде десятичной дроби
          corridorPercent: percentLimit, // процент коридора в виде десятичной дроби
          sellAlgorithmCoefficient: alg_sell_qoeff, // коэффициент продажи
          buyAlgorithmCoefficient: alg_buy_qoeff, // коэффициент покупки
        };
        //calculatePricesbyhis(settings,_0x19f59d[_0x354770].item_nameid,currency.id);
        var try2 = calculatePricestimeseries(_0x240e5b.prices,settings);
        var try4 = calculatePricestimeseriesConverted(_0x19f59d[_0x354770].convertedPriceHistory,settings);
         var try1 =  calculatePricesconverted(_0x19f59d[_0x354770].convertedPriceHistory,settings);
         
         var try3 =  calculatePrices(_0x240e5b.prices,settings);
          switch (_0x187910) {
            case 'HG':
              var sprice = round(try2[0].predictedSellPrice * 100);
             // var sprice = round(try2[0].sellPrice * 100);
              break;
            case 'HSG':
              try1 = round(_0x55dc9c[1].H2sellPrice * 100);
              break;
            case 'AVG':
              try1 = round(_0x55dc9c[1].AVsellPrice * 100);
              break;
            case 'LG':
              try1 = round(_0x55dc9c[1].LGsellPrice * 100);
              break;
            case 'BG':
              try1 = round(_0x55dc9c[1].BGsellPrice * 100);
              break;
          }
          switch (_0x4f3cbc) {
            case 'HG':
             var bprice = round(try2[0].predictedBuyPrice * 100);
            // var bprice = round(try2[0].buyPrice * 100); 
             break;
            case 'HSG':
              try1 = round(_0x55dc9c[1].H2buyPrice * 100);
              break;
            case 'AVG':
              try1= round(_0x55dc9c[1].AVbuyPrice * 100);
              break;
            case 'LG':
              try1 = round(_0x55dc9c[1].LGbuyPrice * 100);
              break;
            case 'BG':
              try1= round(_0x55dc9c[1].BGbuyPrice * 100);
              break;
          }
          sprice = Math.round(sprice * _0x433a2c);
          bprice = Math.round(bprice * _0x2d13e7);
          _0x19f59d[_0x354770].b_summ= bprice;
          _0x19f59d[_0x354770].s_summ=sprice;
          if (_0x19f59d[_0x354770].s_summ - _0x19f59d[_0x354770].b_summ < _0x1c5fe1 * 100) {
            _0x19f59d[_0x354770].b_summ = _0x19f59d[_0x354770].s_summ - _0x1c5fe1 * 100;
          }
          if (_0x187910 == 'OG' || _0x4f3cbc == 'OG') {
            var _0x2e7558 = items.map(function (_0x34162b) {
              return _0x34162b.appid + _0x34162b.name;
            }).indexOf(_0x55dc9c[1].appid + _0x55dc9c[1].name);
            _0x55dc9c[1].item_nameid = items[_0x2e7558].item_nameid;
            let _0x2be1ad = 'https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=' + currency.id + '&item_nameid=' + _0x55dc9c[1].item_nameid + '&two_factor=0';
            $.ajax({
              url: _0x2be1ad,
              dataType: 'json',
              type: 'get',
              async: true,
              cache: true,
              success: function (_0x64d658) {
                if (_0x187910 == 'OG') {
                  let _0xbe2d90 = round(round(_0x64d658.buy_order_graph[0][0] * (100 - _0x579ad0) / 100) * 100);
                  var _0x4656a2 = Math.round(_0xbe2d90 * (1 + _0x91892d / 100)) - _0xbe2d90;
                  if (_0x4656a2 / 100 < _0x1c5fe1) {
                    _0x55dc9c[1].s_summ = _0xbe2d90 + round(_0x1c5fe1 * 100);
                  } else {
                    _0x55dc9c[1].s_summ = Math.round(_0xbe2d90 * (1 + _0x91892d / 100));
                  }
                }
                if (_0x4f3cbc == 'OG') {
                  _0x55dc9c[1].b_summ = round(round(_0x64d658.buy_order_graph[0][0] * (100 - _0x579ad0) / 100) * 100);
                }
                if (_0x19f59d[_0x354770].s_summ - _0x19f59d[_0x354770].b_summ < _0x1c5fe1 * 100) {
                  _0x19f59d[_0x354770].b_summ = _0x19f59d[_0x354770].s_summ - _0x1c5fe1 * 100;
                }
                _0x19f59d[_0x354770].s_summ_steam = getBuyerPays(_0x19f59d[_0x354770].s_summ);
                var _0x309e28 = items.map(function (_0x1932ec) {
                  return _0x1932ec.appid + _0x1932ec.name;
                }).indexOf(_0x55dc9c[1].appid + _0x55dc9c[1].name);
                if (_0x309e28 != -1) {
                  if (_0x71969b == 'removeFromSale') {
                    _0x55dc9c[1].resale_cnt = items[_0x309e28].resale_cnt++;
                  }
                  items[_0x309e28].b_summ = _0x55dc9c[1].b_summ;
                  items[_0x309e28].s_summ = _0x55dc9c[1].s_summ;
                  items[_0x309e28].s_summ_steam = _0x55dc9c[1].s_summ_steam;
                  let _0x584537 = [];
                  _0x584537.push(items[_0x309e28]);
                  updateItemsBuySellPrices(_0x584537, 0);
                  switch (_0x71969b) {
                    case 'removeFromSale':
                      removeFromSaleArray(_0x584537, 0);
                      break;
                  }
                  setTimeout(function () {
                    updateItemsPricesByAnalyzis(_0x19f59d, _0x354770 + 1, _0x71969b);
                  }, query_delay);
                } else {
                  setTimeout(function () {
                    updateItemsPricesByAnalyzis(_0x19f59d, _0x354770 + 1, _0x71969b);
                  }, query_delay);
                }
              },
              error: function (_0x4b2102) {
                log(getLinkItem(_0x19f59d[_0x354770]) + 'STEAM ERROR Загрузка стакана заказов');
                setTimeout(function () {
                  updateItemsPricesByAnalyzis(_0x19f59d, _0x354770 + 1, _0x71969b);
                }, query_delay);
                if (_0x4b2102.status == 429) {
                  logMicroBan(true);
                }
              }
            });
          } else {
            _0x19f59d[_0x354770].s_summ_steam = getBuyerPays(sprice);
            var _0x2e7558 = items.map(function (_0x5482de) {
              return _0x5482de.appid + _0x5482de.name;
            }).indexOf(_0x19f59d[_0x354770].appid + _0x19f59d[_0x354770].name);
            if (_0x2e7558 != -1) {
              if (_0x71969b == 'removeFromSale') {
                _0x19f59d[_0x354770].resale_cnt = items[_0x2e7558].resale_cnt++;
              }
              items[_0x2e7558].b_summ = _0x19f59d[_0x354770].b_summ;
              items[_0x2e7558].s_summ = _0x19f59d[_0x354770].s_summ;
              items[_0x2e7558].s_summ_steam = _0x19f59d[_0x354770].s_summ_steam;
              let _0x3006cd = [];
              _0x3006cd.push(items[_0x2e7558]);
              updateItemsBuySellPrices(_0x3006cd, 0);
              switch (_0x71969b) {
                case 'removeFromSale':
                  removeFromSaleArray(_0x3006cd, 0);
                  break;
              }
              setTimeout(function () {
                updateItemsPricesByAnalyzis(_0x19f59d, _0x354770 + 1, _0x71969b);
              }, query_delay);
            }
          }
        },
        error: function () {
          log(getLinkItem(_0x19f59d[_0x354770]) + ' Не могу рассчитать цену');
          updateItemsPricesByAnalyzis(_0x19f59d, _0x354770 + 1, _0x71969b);
        }
      });
    }
  }
  /*        var _0x4e2088 = JSON.stringify(_0x19f59d[_0x354770]);
          var _0x3cfc2a = JSON.stringify(currency.id);
          var _0x4b7599 = JSON.stringify(_0x91892d);
          var _0x3a1c48 = JSON.stringify(_0x1c5fe1);
          var _0x46ed00 = JSON.stringify(_0x359514);
          var _0x421150 = JSON.stringify(_0x58864e);
          var _0x4dc9d6 = JSON.stringify(accID);
          var _0x229dd3 = '"расчет предмета"';
          var _0x555f8f = JSON.stringify(new Date());
          var _0x3022cb = JSON.stringify(guid_calc);
          var _0x2ba0a1 = JSON.stringify(secretkey);
          $.ajax({
            url: servers[server],
            type: 'post',
            dataType: 'json',
            cache: false,
            data: {
              item: _0x4e2088,
              currency: _0x3cfc2a,
              countDayHistoryGraph: _0x46ed00,
              percentLimit: _0x421150,
              profitPercent: _0x4b7599,
              minProfit: _0x3a1c48,
              steamid: _0x4dc9d6,
              logAction: '"расчет предмета"',
              logDate: _0x555f8f,
              id: _0x3022cb,
              secretkey: _0x2ba0a1,
              p: 'calc',
              version: '"1.55"'
            },
            success: function (_0x55dc9c) {
              if (_0x55dc9c == 'g') {
                log('перезапустите бота');
                return;
              }
              if (_0x55dc9c == 'version') {
                log('<div class="alert_icon"></div>Инструкция по обновлению, список изменений и ссылка на обновление доступны по адресу: <br><a target="blank" href="https://stetrade.ru/lk/services/ste-pro/">https://stetrade.ru/lk/services/ste-pro/</a>', 'err_msg');
                log('<div class="alert_icon"></div>Версия бота не совпадает с версией сервера');
                return;
              }
              if (_0x55dc9c == 'nolic') {
                log('У вас нет доступа к про версии');
                return;
              }
              if (_0x55dc9c[2] == undefined || _0x55dc9c[2] != 'OK') {
                log(getLinkItem(_0x19f59d[_0x354770]) + ' Не могу рассчитать цену');
                updateItemsPricesByAnalyzis(_0x19f59d, _0x354770 + 1, _0x71969b);
                return;
              }
              let _0x52af5d = _0x55dc9c[1];
              guid_calc = _0x55dc9c[0];
              if (showItemsCntSalesDay) {
                let _0x2a8d04 = items.map(function (_0x55eba6) {
                  return _0x55eba6.appid + _0x55eba6.name;
                }).indexOf(_0x55dc9c[1].appid + _0x55dc9c[1].name);
                items[_0x2a8d04].cntSalesDay = _0x55dc9c[1].countSalesMonth;
                $('#cntSalesDay_' + _0x2a8d04)[0].innerHTML = _0x55dc9c[1].countSalesMonth;
              }
              switch (_0x187910) {
                case 'HG':
                  _0x55dc9c[1].s_summ = round(_0x55dc9c[1].HGsellPrice * 100);
                  break;
                case 'HSG':
                  _0x55dc9c[1].s_summ = round(_0x55dc9c[1].H2sellPrice * 100);
                  break;
                case 'AVG':
                  _0x55dc9c[1].s_summ = round(_0x55dc9c[1].AVsellPrice * 100);
                  break;
                case 'LG':
                  _0x55dc9c[1].s_summ = round(_0x55dc9c[1].LGsellPrice * 100);
                  break;
                case 'BG':
                  _0x55dc9c[1].s_summ = round(_0x55dc9c[1].BGsellPrice * 100);
                  break;
              }
              switch (_0x4f3cbc) {
                case 'HG':
                  _0x55dc9c[1].b_summ = round(_0x55dc9c[1].HGbuyPrice * 100);
                  break;
                case 'HSG':
                  _0x55dc9c[1].b_summ = round(_0x55dc9c[1].H2buyPrice * 100);
                  break;
                case 'AVG':
                  _0x55dc9c[1].b_summ = round(_0x55dc9c[1].AVbuyPrice * 100);
                  break;
                case 'LG':
                  _0x55dc9c[1].b_summ = round(_0x55dc9c[1].LGbuyPrice * 100);
                  break;
                case 'BG':
                  _0x55dc9c[1].b_summ = round(_0x55dc9c[1].BGbuyPrice * 100);
                  break;
              }
              _0x55dc9c[1].s_summ = Math.round(_0x55dc9c[1].s_summ * _0x433a2c);
              _0x55dc9c[1].b_summ = Math.round(_0x55dc9c[1].b_summ * _0x2d13e7);
              if (_0x19f59d[_0x354770].s_summ - _0x19f59d[_0x354770].b_summ < _0x1c5fe1 * 100) {
                _0x19f59d[_0x354770].b_summ = _0x19f59d[_0x354770].s_summ - _0x1c5fe1 * 100;
              } 
   
    });
    } else {
      deleteProgressBar('updateItemsPricesByAnalyzisBar');
      _0x1177f8();
      if (_0x71969b == 'removeFromSale') {
        analyzeWorking = false;
      }
    }
  } */
  function removeFromSaleArray(_0x4be62e, _0x3c81e1) {
    setTimeout(function () {
      var _0x3e4b2a = items.map(function (_0x4e2a8f) {
        return _0x4e2a8f.appid + _0x4e2a8f.name;
      }).indexOf(_0x4be62e[_0x3c81e1].appid + _0x4be62e[_0x3c81e1].name);
      if (_0x3e4b2a != -1) {
        removeFromSale(items[_0x3e4b2a].removeIds, 0);
      }
      _0x3c81e1++;
      if (_0x3c81e1 < _0x4be62e.length) {
        removeFromSaleArray(_0x4be62e, _0x3c81e1);
      }
    }, query_delay);
  }
  function sendMsgTelegramBot(_0x144a8f, _0x543d66) {
    let _0x5d0402 = new Date();
    _0x5d0402 = '[object Object]';
    _0x144a8f = _0x5d0402 + ' ' + accName + '\n' + _0x144a8f;
    let _0x306cfd = JSON.stringify(_0x144a8f);
    let _0x162f1f = JSON.stringify(telegram_chat_id);
    let _0x55c106 = '"sendMessage"';
    $.ajax({
      url: servers[server] + '/telegram.php',
      type: 'post',
      dataType: 'json',
      cache: false,
      data: {
        msg: _0x306cfd,
        chat_id: _0x162f1f,
        telegram_param: '"sendMessage"',
        keyboard: JSON.stringify(_0x543d66)
      },
      success: function () {
      },
      error: function () {
      }
    });
  }
  function checkTelegramMessages() {
    var _0x261eb2 = JSON.stringify(telegram_update_id);
    var _0x500262 = JSON.stringify(telegram_chat_id);
    var _0x16985c = '"checkMessages"';
    var _0x40b4e4 = {};
    _0x40b4e4.update_id = _0x261eb2;
    _0x40b4e4.chat_id = _0x500262;
    _0x40b4e4.telegram_param = '"checkMessages"';
    _0x40b4e4.acc = accName;
    $.ajax({
      url: servers[server] + '/telegram.php',
      type: 'post',
      dataType: 'json',
      cache: false,
      data: _0x40b4e4,
      success: function (_0x565ff7) {
        if (_0x565ff7 == 'no messages') {
          setTimeout(function () {
            checkTelegramMessages();
          }, AOSettings ? 10000 : 60000);
          return;
        }
        telegram_update_id = _0x565ff7[1];
        var _0x42da69 = {};
        _0x42da69.telegram_update_id = _0x565ff7[1];
        chrome.storage.sync.set(_0x42da69);
        if (_0x565ff7[0].indexOf('setset') != -1) {
          checkTelegramMessages_setset(_0x565ff7);
        } else if (_0x565ff7[2] == 'callback' && telegramThisIsMain) {
          checkTelegramMessages_callback(_0x565ff7);
        } else {
          checkTelegramMessages_message(_0x565ff7);
        }
        setTimeout(function () {
          checkTelegramMessages();
        }, AOSettings ? 10000 : 60000);
      },
      error: function (_0xd7f3f7) {
        setTimeout(function () {
          checkTelegramMessages();
        }, AOSettings ? 10000 : 60000);
      },
      timeout: 10000
    });
  }
  function checkTelegramMessages_callback(_0x40144f) {
    let _0x5a2460;
    switch (_0x40144f[0]) {
      case 'ordersPlace':
        var _0x5b8af3 = {};
        _0x5b8af3.text = '0';
        _0x5b8af3.callback_data = 'setset_ordersPlace_0';
        var _0x577a44 = {};
        _0x577a44.text = '1';
        _0x577a44.callback_data = 'setset_ordersPlace_1';
        var _0x53ee47 = {};
        _0x53ee47.text = '2';
        _0x53ee47.callback_data = 'setset_ordersPlace_2';
        var _0x3da50c = {};
        _0x3da50c.text = '3';
        _0x3da50c.callback_data = 'setset_ordersPlace_3';
        var _0x22c929 = {};
        _0x22c929.text = '4';
        _0x22c929.callback_data = 'setset_ordersPlace_4';
        var _0x100f4b = {};
        _0x100f4b.text = '5';
        _0x100f4b.callback_data = 'setset_ordersPlace_5';
        var _0x510a33 = {};
        _0x510a33.inline_keyboard = [[
          _0x5b8af3,
          _0x577a44,
          _0x53ee47,
          _0x3da50c,
          _0x22c929,
          _0x100f4b
        ]];
        _0x5a2460 = _0x510a33;
        sendMsgTelegramBot('Коэф стакана - выберите значение', _0x5a2460);
        break;
      case 'cntSalesMonth':
        var _0x34c978 = {};
        _0x34c978.text = '0';
        _0x34c978.callback_data = 'setset_cntSalesMonth_0';
        var _0x24a1a6 = {};
        _0x24a1a6.text = '10';
        _0x24a1a6.callback_data = 'setset_cntSalesMonth_10';
        var _0x29418f = {};
        _0x29418f.text = '20';
        _0x29418f.callback_data = 'setset_cntSalesMonth_20';
        var _0x46b95c = {};
        _0x46b95c.text = '30';
        _0x46b95c.callback_data = 'setset_cntSalesMonth_30';
        var _0x3a5b3b = {};
        _0x3a5b3b.text = '40';
        _0x3a5b3b.callback_data = 'setset_cntSalesMonth_40';
        var _0x221663 = {};
        _0x221663.text = '50';
        _0x221663.callback_data = 'setset_cntSalesMonth_50';
        var _0x27d72d = {};
        _0x27d72d.text = '80';
        _0x27d72d.callback_data = 'setset_cntSalesMonth_80';
        var _0x2df6ae = {};
        _0x2df6ae.text = '100';
        _0x2df6ae.callback_data = 'setset_cntSalesMonth_100';
        var _0x4d400c = {};
        _0x4d400c.inline_keyboard = [[
          _0x34c978,
          _0x24a1a6,
          _0x29418f,
          _0x46b95c,
          _0x3a5b3b,
          _0x221663,
          _0x27d72d,
          _0x2df6ae
        ]];
        _0x5a2460 = _0x4d400c;
        sendMsgTelegramBot('Продаж в день за месяц - выберите значение', _0x5a2460);
        break;
      case 'listingPlace':
        var _0x24c593 = {};
        _0x24c593.text = '0';
        _0x24c593.callback_data = 'setset_listingPlace_0';
        var _0x24a03a = {};
        _0x24a03a.text = '10';
        _0x24a03a.callback_data = 'setset_listingPlace_10';
        var _0x119c1f = {};
        _0x119c1f.text = '20';
        _0x119c1f.callback_data = 'setset_listingPlace_20';
        var _0x327d8a = {};
        _0x327d8a.text = '30';
        _0x327d8a.callback_data = 'setset_listingPlace_30';
        var _0x26e0c4 = {};
        _0x26e0c4.text = '40';
        _0x26e0c4.callback_data = 'setset_listingPlace_40';
        var _0x373c09 = {};
        _0x373c09.text = '50';
        _0x373c09.callback_data = 'setset_listingPlace_50';
        var _0x4a4add = {};
        _0x4a4add.inline_keyboard = [[
          _0x24c593,
          _0x24a03a,
          _0x119c1f,
          _0x327d8a,
          _0x26e0c4,
          _0x373c09
        ]];
        _0x5a2460 = _0x4a4add;
        sendMsgTelegramBot('Место в листинге - выберите значение', _0x5a2460);
        break;
      case 'percentSlivBalance':
        var _0x14b85d = {};
        _0x14b85d.text = '0';
        _0x14b85d.callback_data = 'setset_percentSlivBalance_0';
        var _0x3892d5 = {};
        _0x3892d5.text = '5';
        _0x3892d5.callback_data = 'setset_percentSlivBalance_5';
        var _0x18834d = {};
        _0x18834d.text = '10';
        _0x18834d.callback_data = 'setset_percentSlivBalance_10';
        var _0x48c979 = {};
        _0x48c979.text = '20';
        _0x48c979.callback_data = 'setset_percentSlivBalance_20';
        var _0x134370 = {};
        _0x134370.text = '30';
        _0x134370.callback_data = 'setset_percentSlivBalance_30';
        var _0x2644fc = {};
        _0x2644fc.text = '40';
        _0x2644fc.callback_data = 'setset_percentSlivBalance_40';
        var _0x37908d = {};
        _0x37908d.text = '50';
        _0x37908d.callback_data = 'setset_percentSlivBalance_50';
        var _0x877172 = {};
        _0x877172.inline_keyboard = [[
          _0x14b85d,
          _0x3892d5,
          _0x18834d,
          _0x48c979,
          _0x134370,
          _0x2644fc,
          _0x37908d
        ]];
        _0x5a2460 = _0x877172;
        sendMsgTelegramBot('Если баланс упал на указанный % - выберите значение', _0x5a2460);
        break;
      case 'countDayHistoryGraph':
        var _0x1e5e8b = {};
        _0x1e5e8b.text = '1';
        _0x1e5e8b.callback_data = 'setset_countDayHistoryGraph_1';
        var _0x57da2a = {};
        _0x57da2a.text = '2';
        _0x57da2a.callback_data = 'setset_countDayHistoryGraph_2';
        var _0x295a37 = {};
        _0x295a37.text = '3';
        _0x295a37.callback_data = 'setset_countDayHistoryGraph_3';
        var _0x5cdd32 = {};
        _0x5cdd32.text = '4';
        _0x5cdd32.callback_data = 'setset_countDayHistoryGraph_4';
        var _0x12e855 = {};
        _0x12e855.text = '5';
        _0x12e855.callback_data = 'setset_countDayHistoryGraph_5';
        var _0x4e36dd = {};
        _0x4e36dd.text = '6';
        _0x4e36dd.callback_data = 'setset_countDayHistoryGraph_6';
        var _0xcec3a1 = {};
        _0xcec3a1.text = '7';
        _0xcec3a1.callback_data = 'setset_countDayHistoryGraph_7';
        var _0x315892 = {};
        _0x315892.text = '12';
        _0x315892.callback_data = 'setset_countDayHistoryGraph_12';
        var _0x18ff41 = {};
        _0x18ff41.text = '14';
        _0x18ff41.callback_data = 'setset_countDayHistoryGraph_14';
        var _0x3c78ed = {};
        _0x3c78ed.text = '21';
        _0x3c78ed.callback_data = 'setset_countDayHistoryGraph_21';
        var _0xf93e68 = {};
        _0xf93e68.text = '28';
        _0xf93e68.callback_data = 'setset_countDayHistoryGraph_28';
        var _0x234cdd = {};
        _0x234cdd.inline_keyboard = [
          [
            _0x1e5e8b,
            _0x57da2a,
            _0x295a37,
            _0x5cdd32,
            _0x12e855,
            _0x4e36dd
          ],
          [
            _0xcec3a1,
            _0x315892,
            _0x18ff41,
            _0x3c78ed,
            _0xf93e68
          ]
        ];
        _0x5a2460 = _0x234cdd;
        sendMsgTelegramBot('Период анализа - выберите значение', _0x5a2460);
        break;
      case 'turnAllOrdersOnTime':
        var _0x42f6ce = {};
        _0x42f6ce.text = 'выкл';
        _0x42f6ce.callback_data = 'setset_turnAllOrdersOnTime_выкл';
        var _0x279bcb = {};
        _0x279bcb.text = '00';
        _0x279bcb.callback_data = 'setset_turnAllOrdersOnTime_00';
        var _0x38ec9c = {};
        _0x38ec9c.text = '03';
        _0x38ec9c.callback_data = 'setset_turnAllOrdersOnTime_03';
        var _0x4044c5 = {};
        _0x4044c5.text = '06';
        _0x4044c5.callback_data = 'setset_turnAllOrdersOnTime_06';
        var _0x22cdad = {};
        _0x22cdad.text = '09';
        _0x22cdad.callback_data = 'setset_turnAllOrdersOnTime_09';
        var _0x532779 = {};
        _0x532779.text = '12';
        _0x532779.callback_data = 'setset_turnAllOrdersOnTime_12';
        var _0x4f6213 = {};
        _0x4f6213.text = '15';
        _0x4f6213.callback_data = 'setset_turnallordersontime_15';
        var _0x3ed89a = {};
        _0x3ed89a.text = '18';
        _0x3ed89a.callback_data = 'setset_turnallordersontime_18';
        var _0x21ea93 = {};
        _0x21ea93.text = '21';
        _0x21ea93.callback_data = 'setset_cturnallordersontime_21';
        var _0x4bf160 = {};
        _0x4bf160.inline_keyboard = [[
          _0x42f6ce,
          _0x279bcb,
          _0x38ec9c,
          _0x4044c5,
          _0x22cdad,
          _0x532779,
          _0x4f6213,
          _0x3ed89a,
          _0x21ea93
        ]];
        _0x5a2460 = _0x4bf160;
        sendMsgTelegramBot('Время вкл заказов в работу - выберите значение', _0x5a2460);
        break;
    }
  }
  function checkTelegramMessages_setset(_0x3709f3) {
    let _0x400b21 = _0x3709f3[0].split('_');
    _0x400b21[2] = _0x400b21[2] == 0 ? '' : _0x400b21[2];
    switch (_0x400b21[1]) {
      case 'ordersPlace':
        ordersPlace = Number(_0x400b21[2]);
        $('#ordersPlace')[0].value = ordersPlace;
        var _0x1ca40e = {};
        _0x1ca40e.ordersPlace = ordersPlace;
        chrome.storage.sync.set(_0x1ca40e);
        break;
      case 'cntSalesMonth':
        cntSalesMonth = Number(_0x400b21[2]);
        $('#cntSalesMonth')[0].value = cntSalesMonth;
        var _0x34063c = {};
        _0x34063c.cntSalesMonth = cntSalesMonth;
        chrome.storage.sync.set(_0x34063c);
        break;
      case 'listingPlace':
        listingPlace = Number(_0x400b21[2]);
        $('#listingPlace')[0].value = listingPlace;
        var _0x56daee = {};
        _0x56daee.listingPlace = listingPlace;
        chrome.storage.sync.set(_0x56daee);
        break;
      case 'percentSlivBalance':
        percentSlivBalance = Number(_0x400b21[2]);
        $('#percentSlivBalance')[0].value = percentSlivBalance;
        var _0x328a44 = {};
        _0x328a44.percentSlivBalance = percentSlivBalance;
        chrome.storage.sync.set(_0x328a44);
        break;
      case 'countDayHistoryGraph':
        countDayHistoryGraph = Number(_0x400b21[2]);
        $('#countDayHistoryGraph')[0].value = countDayHistoryGraph;
        var _0x2e9ec3 = {};
        _0x2e9ec3.countDayHistoryGraph = countDayHistoryGraph;
        chrome.storage.sync.set(_0x2e9ec3);
        break;
      case 'turnAllOrdersOnTime':
        turnAllOrdersOnTime = _0x400b21[2];
        turnAllOrdersOnTime = turnAllOrdersOnTime == 'выкл' ? '' : turnAllOrdersOnTime;
        $('#turnAllOrdersOnTime')[0].value = turnAllOrdersOnTime + ':00';
        var _0xf483de = {};
        _0xf483de.turnAllOrdersOnTime = turnAllOrdersOnTime;
        chrome.storage.sync.set(_0xf483de);
        break;
    }
    sendMsgTelegramBot('Настройка изменена');
  }
  function checkTelegramMessages_message(_0xaa8cfc) {
    switch (_0xaa8cfc[0]) {
      case '/info':
        _0x3e5126 = 'Сумма: ' + document.getElementById('user_sum').innerText + '\n';
        _0x3e5126 += 'Баланс: ' + document.getElementById('balance').innerText + '\n';
        _0x3e5126 += 'На продаже: ' + document.getElementById('on_sale_sum').innerText + '\n';
        _0x3e5126 += 'Заказы: ' + document.getElementById('orders_sum').innerText + '\n';
        _0x3e5126 += 'Предметов на продажу: ' + (myInventoryItemsCount == undefined ? 0 : myInventoryItemsCount);
        sendMsgTelegramBot(_0x3e5126);
        break;
      case '/removeallorders':
        var _0x1961ce = [];
        items.forEach(_0x3df9cc => {
          _0x3df9cc.b_on = 0;
          if (_0x3df9cc.buyorderid != '' && _0x3df9cc.group_settings.dontDeleteOrders != 1) {
            let _0x478ac = {};
            _0x478ac.name = _0x3df9cc.name;
            _0x478ac.appid = _0x3df9cc.appid;
            _0x478ac.buyorderid = _0x3df9cc.buyorderid;
            _0x478ac.b_summ = _0x3df9cc.b_summ;
            _0x1961ce.push(_0x478ac);
          }
        });
        cancelBuyOrder(_0x1961ce, 0);
        sendMsgTelegramBot('Удаляю все заказы');
        str = 'update item set b_on = 0';
        db.transaction(function (_0x4721de) {
          _0x4721de.executeSql(str, [], function () {
          }, function (_0x302ec1, _0x18f95c) {
            logSQLError(str, _0x18f95c);
          });
        });
        break;
      case '/removeallfromsale':
        var _0x1961ce = [];
        items.forEach(_0x403be1 => {
          _0x403be1.s_on = 0;
          if (_0x403be1.removeIds.length > 0) {
            _0x403be1.removeIds.forEach(_0x42fe8d => {
              _0x1961ce.push(_0x42fe8d);
            });
          }
        });
        removeFromSale(_0x1961ce, 0);
        sendMsgTelegramBot('Удаляю все предметы с продажи');
        break;
      case '/turnallorderson':
        turnItemOnWork(items, true, 0, '');
        sendMsgTelegramBot('Включил все предметы в покупку');
        break;
      case '/stop':
        if (working) {
          startWork(true);
          chrome.tabs.reload(tabid);
          sendMsgTelegramBot('Остановил работу');
        }
        break;
      case '/start':
        if (!working) {
          startWork(false);
          sendMsgTelegramBot('Начал работу');
        }
        break;
      case '/reload':
        sendMsgTelegramBot('Ушел на перезагрузку');
        chrome.tabs.reload(tabid);
        chrome.tabs.reload();
        break;
      case '/help':
        if (!telegramThisIsMain) {
          return;
        }
        _0x3e5126 = '/info - Информация\n';
        _0x3e5126 += '/stats - Статистика\n';
        _0x3e5126 += '/stats5 - Статистика за 5 дней\n';
        _0x3e5126 += '/log - Показать лог бота\n';
        _0x3e5126 += '/start - Начать работу\n';
        _0x3e5126 += '/stop - Остановить работу\n';
        _0x3e5126 += '/reload - Перезагрузить бота\n';
        _0x3e5126 += '/removeallorders - Удалить все заказы\n';
        _0x3e5126 += '/removeallfromsale - Снять все с продажи\n';
        _0x3e5126 += '/turnallorderson - Включить все в работу\n';
        _0x3e5126 += '/updatepricesbyanalysis - Сделать пересчет цен всех предметов\n';
        _0x3e5126 += '/changesettings - Изменить настройку на всех ботах\n';
        sendMsgTelegramBot(_0x3e5126);
        break;
      case '/log':
        var _0x3e5126 = '';
        var _0x24708f = $('#log')[0].children;
        for (var _0x4e97c6 = 0; _0x4e97c6 < $('#log')[0].children.length; _0x4e97c6++) {
          _0x3e5126 += $('#log')[0].children[_0x4e97c6].innerText + '\n';
          if (_0x4e97c6 == 9) {
            break;
          }
        }
        sendMsgTelegramBot(_0x3e5126);
        break;
      case '/stats':
        str = 'select * from (select * from stats order by date desc limit 24) order by date';
        db.transaction(function (_0x3586a0) {
          _0x3586a0.executeSql(str, [], function (_0x4441e9, _0x49a2be) {
            let _0x358fe6 = '';
            let _0x36df51 = _0x49a2be.rows;
            let _0x261eab = [];
            for (let _0x28e0b8 = 0; _0x28e0b8 < _0x49a2be.rows.length; _0x28e0b8++) {
              if (String(_0x49a2be.rows[_0x28e0b8].date).substr(8, 2) == hourForStats) {
                _0x261eab.push(_0x49a2be.rows[_0x28e0b8]);
              }
            }
            let _0x57d6c3 = 1;
            for (var _0x4dd9de = 0; _0x4dd9de < _0x261eab.length; _0x4dd9de++) {
              let _0x2e3892 = _0x261eab[_0x4dd9de].date.toString();
              _0x358fe6 += _0x2e3892.substring(0, 4) + '-' + _0x2e3892.substring(4, 6) + '-' + _0x2e3892.substring(6, 8) + '\n';
              _0x358fe6 += 'Баланс: ' + format(_0x261eab[_0x4dd9de].balance) + '\n';
              _0x358fe6 += 'На продаже: ' + format(_0x261eab[_0x4dd9de].sumonsale) + '\n';
              _0x358fe6 += 'Сумма: ' + format(_0x261eab[_0x4dd9de].balance + _0x261eab[_0x4dd9de].sumonsale) + '\n';
              if (_0x4dd9de != 0) {
                _0x358fe6 += 'Профит: ' + format((_0x261eab[_0x4dd9de].balance + _0x261eab[_0x4dd9de].sumonsale - _0x57d6c3) * 100 / _0x57d6c3) + '\n';
              }
              _0x358fe6 += '\n';
              _0x57d6c3 = _0x261eab[_0x4dd9de].balance + _0x261eab[_0x4dd9de].sumonsale;
            }
            sendMsgTelegramBot(_0x358fe6);
          }, function () {
          });
        });
        break;
      case '/stats5':
        str = 'select * from (select * from stats order by date desc limit 120) order by date';
        db.transaction(function (_0x386d1c) {
          _0x386d1c.executeSql(str, [], function (_0xde97df, _0x1fc09f) {
            let _0x5543b5 = '';
            let _0x203122 = _0x1fc09f.rows;
            let _0x1a938b = [];
            for (let _0x1a34de = 0; _0x1a34de < _0x1fc09f.rows.length; _0x1a34de++) {
              if (String(_0x1fc09f.rows[_0x1a34de].date).substr(8, 2) == hourForStats) {
                _0x1a938b.push(_0x1fc09f.rows[_0x1a34de]);
              }
            }
            let _0x3c2cc1 = 1;
            for (var _0x58c83a = 0; _0x58c83a < _0x1a938b.length; _0x58c83a++) {
              let _0x3b1665 = _0x1a938b[_0x58c83a].date.toString();
              _0x5543b5 += _0x3b1665.substring(0, 4) + '-' + _0x3b1665.substring(4, 6) + '-' + _0x3b1665.substring(6, 8) + '\n';
              _0x5543b5 += 'Баланс: ' + format(_0x1a938b[_0x58c83a].balance) + '\n';
              _0x5543b5 += 'На продаже: ' + format(_0x1a938b[_0x58c83a].sumonsale) + '\n';
              _0x5543b5 += 'Сумма: ' + format(_0x1a938b[_0x58c83a].balance + _0x1a938b[_0x58c83a].sumonsale) + '\n';
              if (_0x58c83a != 0) {
                _0x5543b5 += 'Профит: ' + format((_0x1a938b[_0x58c83a].balance + _0x1a938b[_0x58c83a].sumonsale - _0x3c2cc1) * 100 / _0x3c2cc1) + '\n';
              }
              _0x5543b5 += '\n';
              _0x3c2cc1 = _0x1a938b[_0x58c83a].balance + _0x1a938b[_0x58c83a].sumonsale;
            }
            sendMsgTelegramBot(_0x5543b5);
          }, function (_0x33d87a, _0x3a4e65) {
          });
        });
        break;
      case '/updatepricesbyanalysis':
        log('Начинаю пересчет');
        updateItemsPricesByAnalyzis(items, 0, 'button');
        sendMsgTelegramBot('Начал пересчет цен');
        break;
      case '/changesettings':
        if (!telegramThisIsMain) {
          return;
        }
        var _0x5963c3 = {};
        _0x5963c3.text = 'Коэф стакана ';
        _0x5963c3.callback_data = 'ordersPlace';
        var _0x3bc0d9 = {};
        _0x3bc0d9.text = 'Продаж в день';
        _0x3bc0d9.callback_data = 'cntSalesMonth';
        var _0x264df3 = {};
        _0x264df3.text = 'Место в листинге';
        _0x264df3.callback_data = 'listingPlace';
        var _0x95eafc = {};
        _0x95eafc.text = 'Баланс упал (%)';
        _0x95eafc.callback_data = 'percentSlivBalance';
        var _0x529148 = {};
        _0x529148.text = 'Период анализа';
        _0x529148.callback_data = 'countDayHistoryGraph';
        var _0x50f916 = {};
        _0x50f916.text = 'Время вкл заказов';
        _0x50f916.callback_data = 'turnAllOrdersOnTime';
        var _0x1541ed = {};
        _0x1541ed.inline_keyboard = [
          [
            _0x5963c3,
            _0x3bc0d9,
            _0x264df3
          ],
          [
            _0x95eafc,
            _0x529148,
            _0x50f916
          ]
        ];
        sendMsgTelegramBot('Выберите настройку: ', _0x1541ed);
        break;
    }
  }
  // Функция для снятия товаров с продажи, если их цена ниже, чем у конкурентов
  function removeFromSaleIfKonkurentFunction(_0x384a28, _0x45aa59, _0x877fd1, _0x5999be) {
    // Проверяем, не остановлена ли работа скрипта
    if (!working) {
      return;
    }
    // Проверяем, достигли ли мы конца массива товаров
    if (_0x5999be < _0x45aa59.length) {
      // Формируем URL для запроса
      let _0x2f0000 = 'https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=' + currency.id + '&item_nameid=' + _0x45aa59[_0x5999be].item_nameid + '&two_factor=0';
      // Отправляем AJAX-запрос
      $.ajax({
        url: _0x2f0000,
        dataType: 'json',
        type: 'get',
        async: true,
        cache: true,
        success: function (_0x5dda28) {
          // Получаем цену продажи товара на Steam
          var _0xc02ce3 = round(_0x5dda28.sell_order_graph[0][0] * 100);
          // Проверяем, не ниже ли цена продажи товара, чем у конкурентов
          if (_0x45aa59[_0x5999be].s_summ_steam < _0xc02ce3 - 1 && _0xc02ce3 != _0x45aa59[_0x5999be].priceOnSale || _0xc02ce3 == _0x45aa59[_0x5999be].priceOnSale && _0x5dda28.sell_order_graph[0][1] != 1) {
            // Если цена продажи ниже, чем у конкурентов, снимаем товар с продажи
            for (var _0x3037bb = 0; _0x3037bb < _0x384a28.length; _0x3037bb++) {
              if (_0x45aa59[_0x5999be].name == _0x384a28[_0x3037bb].name && _0x45aa59[_0x5999be].priceOnSale == _0x384a28[_0x3037bb].price) {
                log(getLinkItem(_0x45aa59[_0x5999be]) + ' Снимаю с продажи, текущая цена: ' + _0x45aa59[_0x5999be].priceOnSale + ' конкурент: ' + _0xc02ce3);
                _0x877fd1.push(_0x384a28[_0x3037bb].removeId);
                break;
              }
            }
          }
          // Рекурсивно вызываем функцию для следующего товара в массиве
          setTimeout(function () {
            removeFromSaleIfKonkurentFunction(_0x384a28, _0x45aa59, _0x877fd1, _0x5999be + 1);
          }, query_delay);
        },
        error: function (_0x458f09) {
          // Обрабатываем ошибку запроса
          log('STEAM ERROR Загрузка стакана заказов');
          setTimeout(function () {
            removeFromSaleIfKonkurentFunction(_0x384a28, _0x45aa59, _0x877fd1, _0x5999be + 1);
          }, query_delay);
          if (_0x458f09.status == 429) {
            logMicroBan(true);
          }
        }
      });
    } else if (_0x877fd1.length > 0) {
      // Если есть товары, которые нужно снять с продажи, вызываем функцию для снятия товаров с продажи
      removeFromSale(_0x877fd1, 0);
    }
  }
  
  function logInSteamAcc(_0x1e9a89) {
    var _0x47d169 = {};
    _0x47d169.url = 'https://steamcommunity.com/login/home/?goto=';
    chrome.tabs.query(_0x47d169, function (_0x4710ec) {
      if (_0x4710ec.length == 0) {
        var _0x2367f5 = {};
        _0x2367f5.active = false;
        _0x2367f5.url = 'https://steamcommunity.com/login/home/?goto=';
        chrome.tabs.create(_0x2367f5);
      } else {
        chrome.storage.sync.get(function (_0x1557bb) {
          let _0x30c23d = _0x1557bb.SteamAcc_shared_secret;
          var _0x4c1428 = {};
          _0x4c1428.steam_secret_key = _0x1557bb.SteamAcc_shared_secret;
          $.ajax({
            url: servers[server] + '/getAuthCode.php',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: _0x4c1428,
            success: function (_0x1bdc07) {
              tab_login = _0x4710ec[0].id;
              sendMessage_logInSteamAcc(_0x1e9a89, tab_login, _0x1bdc07);
            },
            error: function () {
              log('Cервер кодов не доступен');
            }
          });
        });
      }
    });
  }
  function sendMessage_logInSteamAcc(_0x5b9a41, _0x5b4163, _0xce4cd6) {
    var _0x5a1c40 = {};
    _0x5a1c40.active = true;
    chrome.tabs.update(_0x5b4163, _0x5a1c40, _0x7148b6 => {
    });
    chrome.storage.sync.get(function (_0x37f036) {
      let _0x1dd153 = _0x37f036.SteamAcc_login;
      let _0xe46864 = _0x37f036.SteamAcc_password;
      var _0x358b14 = {};
      _0x358b14.param = _0x5b9a41;
      _0x358b14.code = _0xce4cd6;
      _0x358b14.login = _0x37f036.SteamAcc_login;
      _0x358b14.password = _0x37f036.SteamAcc_password;
      chrome.tabs.sendMessage(_0x5b4163, _0x358b14, function (_0x49a1e2) {
        if (_0x49a1e2 == undefined) {
          chrome.tabs.reload(_0x5b4163);
        }
        setTimeout(function () {
          chrome.tabs.remove(_0x5b4163);
        }, 600000);
      });
    });
  }
  function changeProxy(_0x4c8cb6) {
    let _0x14f879 = _0x4c8cb6.split(':');
    localStorage.proxy = _0x14f879[0];
    localStorage.port = _0x14f879[1];
    localStorage.login = _0x14f879[2];
    localStorage.password = _0x14f879[3];
    var _0x1cd1b1 = {
      mode: 'fixed_servers',
      rules: {
        singleProxy: {
          scheme: 'http',
          host: localStorage.proxy,
          port: Number(localStorage.port)
        }
      }
    };
    var _0x9302d4 = {};
    _0x9302d4.value = _0x1cd1b1;
    _0x9302d4.scope = 'regular';
    chrome.proxy.settings.set(_0x9302d4, function () {
      var _0x10c6ed = {};
      _0x10c6ed.incognito = false;
      chrome.proxy.settings.get(_0x10c6ed, function (_0x1e2528) {
        log('Прокси сменился на: ' + _0x1e2528.value.rules.singleProxy.host);
      });
    });
  }
  function clearProxy() {
    var _0x1e6320 = {};
    _0x1e6320.scope = 'regular';
    chrome.proxy.settings.clear(_0x1e6320, function () {
    });
    log('Прокси выключен');
  }
  function removeRequestRule(_0x48da93) {
    var _0x3454ef = {};
    _0x3454ef.removeRuleIds = [_0x48da93];
    chrome.declarativeNetRequest.updateSessionRules(_0x3454ef);
  }
  function createBuyOrder(_0x57ea83, _0x5dfc39) {
    if (!working) {
      return;
    }
    if (checkHistogramBeforeBuy) {
      if (_0x5dfc39 < _0x57ea83.length) {
        let _0x49d96a = 'https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=' + currency.id + '&item_nameid=' + _0x57ea83[_0x5dfc39].item_nameid + '&two_factor=0';
        $.ajax({
          url: _0x49d96a,
          dataType: 'json',
          type: 'get',
          async: true,
          cache: true,
          success: function (_0x588b5c) {
            var _0x457d9e = Number(_0x588b5c.highest_buy_order);
            if (_0x57ea83[_0x5dfc39].b_summ > _0x457d9e) {
              placeOrder(_0x57ea83, _0x5dfc39, _0x457d9e + 1, ' дешевле чем базе!!!');
            } else {
              placeOrder(_0x57ea83, _0x5dfc39, _0x57ea83[_0x5dfc39].b_summ, '');
            }
          },
          error: function () {
            placeOrder(_0x57ea83, _0x5dfc39, _0x57ea83[_0x5dfc39].b_summ, ' заказ выставлен без анализа');
          }
        });
      } else if (!AOSettings) {
        getBuyOrders();
        analyzeWorking = false;
      }
    } else {
      placeOrder(_0x57ea83, _0x5dfc39, _0x57ea83[_0x5dfc39].b_summ, '');
    }
  }
  function placeOrder(_0x5d6e97, _0x2894f2, _0xd87716, _0x207606) {
    if (!working) {
      return;
    }
    let _0x48570f = 'https://steamcommunity.com/market/createbuyorder';
    $.ajax({
      type: 'POST',
      url: 'https://steamcommunity.com/market/createbuyorder',
      data: {
        sessionid: sessionid,
        currency: currency.id,
        appid: _0x5d6e97[_0x2894f2].appid,
        market_hash_name: _0x5d6e97[_0x2894f2].name,
        price_total: _0xd87716 * _0x5d6e97[_0x2894f2].b_cnt,
        quantity: _0x5d6e97[_0x2894f2].b_cnt
      },
      success: function (_0x11dc7d) {
        switch (_0x11dc7d.success) {
          case 1:
            log(getLinkItem(_0x5d6e97[_0x2894f2]) + ' заказ размещен кол-во:' + _0x5d6e97[_0x2894f2].b_cnt + ' цена:' + _0xd87716 / 100 + _0x207606, 'order_msg');
            if (_0x5d6e97[_0x2894f2] != undefined) {
              today = new Date();
              dd = String(today.getDate()).padStart(2, '0');
              mm = String(today.getMonth() + 1).padStart(2, '0');
              yyyy = today.getFullYear();
              today = Number(yyyy + mm + dd);
              st1 = 'update item set order_date = ' + today + ' , resale_cnt = 0, b_summ =' + _0xd87716 + ' , b_cnt = ' + _0x5d6e97[_0x2894f2].b_cnt + ' where market_hash_name = "' + _0x5d6e97[_0x2894f2].name + '" and appid = "' + _0x5d6e97[_0x2894f2].appid + '"';
              db.transaction(function (_0x5da0e6) {
                _0x5da0e6.executeSql(st1, [], function () {
                  var _0x22bfac = items.map(function (_0x1510f3) {
                    return _0x1510f3.appid + _0x1510f3.name;
                  }).indexOf(_0x5d6e97[_0x2894f2].appid + _0x5d6e97[_0x2894f2].name);
                  items[_0x22bfac].order_date = today;
                  items[_0x22bfac].b_summ = _0xd87716;
                  items[_0x22bfac].b_cnt = _0x5d6e97[_0x2894f2].b_cnt;
                  items[_0x22bfac].resale_cnt = 0;
                  items[_0x22bfac].CurKoefOrder = '';
                }, function (_0x31fe59, _0x54415c) {
                  logSQLError(st1, _0x54415c);
                });
              });
            }
            createBuyOrder(_0x5d6e97, _0x2894f2 + 1);
            break;
          case 2:
            log(getLinkItem(_0x5d6e97[_0x2894f2]) + ' Некорректная цена: "' + _0xd87716 + '" или количество: "' + _0x5d6e97[_0x2894f2].b_cnt + '" в заказе - ' + _0x11dc7d.message);
            createBuyOrder(_0x5d6e97, _0x2894f2 + 1);
            break;
          case 10:
            log(getLinkItem(_0x5d6e97[_0x2894f2]) + ' Сервера Steam глючат, заказ не был размещен - ' + _0x11dc7d.message);
            createBuyOrder(_0x5d6e97, _0x2894f2 + 1);
            break;
          case 15:
            log(getLinkItem(_0x5d6e97[_0x2894f2]) + ' Код ошибки 15 ' + _0x11dc7d.message, 'order_msg');
            if (_0x5d6e97[_0x2894f2] != undefined) {
              today = new Date();
              dd = String(today.getDate()).padStart(2, '0');
              mm = String(today.getMonth() + 1).padStart(2, '0');
              yyyy = today.getFullYear();
              today = Number(yyyy + mm + dd);
              st1 = 'update item set order_date = ' + today + ' , resale_cnt = 0, b_cnt = ' + _0x5d6e97[_0x2894f2].b_cnt + ' where market_hash_name = "' + _0x5d6e97[_0x2894f2].name + '" and appid = "' + _0x5d6e97[_0x2894f2].appid + '"';
              db.transaction(function (_0x1b037a) {
                _0x1b037a.executeSql(st1, [], function (_0x5567fb, _0xd3315c) {
                  var _0x41951d = items.map(function (_0x50bad5) {
                    return _0x50bad5.appid + _0x50bad5.name;
                  }).indexOf(_0x5d6e97[_0x2894f2].appid + _0x5d6e97[_0x2894f2].name);
                  items[_0x41951d].order_date = today;
                  items[_0x41951d].b_cnt = items[_0x2894f2].b_cnt;
                  items[_0x41951d].resale_cnt = 0;
                }, function (_0x509fee, _0x18b712) {
                  logSQLError(st1, _0x18b712);
                });
              });
            }
            createBuyOrder(_0x5d6e97, _0x2894f2 + 1);
            break;
          case 25:
            log(getLinkItem(_0x5d6e97[_0x2894f2]) + ' Не хватает баланса для заказа ' + _0x11dc7d.message);
            st1 = 'update item set b_on = 0 where appid || market_hash_name = "' + _0x5d6e97[_0x2894f2].appid + _0x5d6e97[_0x2894f2].name + '"';
            db.transaction(function (_0x2d9f17) {
              _0x2d9f17.executeSql(st1, [], function (_0x148891, _0x115f2c) {
                var _0x5a35a3 = items.map(function (_0x3f90d5) {
                  return _0x3f90d5.appid + _0x3f90d5.name;
                }).indexOf(_0x5d6e97[_0x2894f2].appid + _0x5d6e97[_0x2894f2].name);
                items[_0x5a35a3].b_on = 0;
                $('#b_on_' + _0x5a35a3)[0].checked = false;
              }, function (_0x37b675, _0x40baca) {
                logSQLError(st1, _0x40baca);
              });
            });
            createBuyOrder(_0x5d6e97, _0x2894f2 + 1);
            break;
          case 29:
            log(getLinkItem(_0x5d6e97[_0x2894f2]) + ' ' + _0x11dc7d.message);
            createBuyOrder(_0x5d6e97, _0x2894f2 + 1);
            break;
          case 107:
            log(getLinkItem(_0x5d6e97[_0x2894f2]) + ' Не хватает баланса для заказа ' + _0x11dc7d.message);
            st1 = 'update item set b_on = 0 where appid || market_hash_name = "' + _0x5d6e97[_0x2894f2].appid + _0x5d6e97[_0x2894f2].name + '"';
            db.transaction(function (_0x95acb9) {
              _0x95acb9.executeSql(st1, [], function (_0x1826d2, _0x19c26e) {
                var _0x501f41 = items.map(function (_0x3e3c03) {
                  return _0x3e3c03.appid + _0x3e3c03.name;
                }).indexOf(_0x5d6e97[_0x2894f2].appid + _0x5d6e97[_0x2894f2].name);
                items[_0x501f41].b_on = 0;
                $('#b_on_' + _0x501f41)[0].checked = false;
              }, function (_0x4d6dab, _0x431067) {
                logSQLError(st1, _0x431067);
              });
            });
            createBuyOrder(_0x5d6e97, _0x2894f2 + 1);
            break;
          default:
            log(getLinkItem(_0x5d6e97[_0x2894f2]) + ' ' + _0x11dc7d.message);
            createBuyOrder(_0x5d6e97, _0x2894f2 + 1);
            break;
        }
      },
      error: function (_0x444436) {
        log(getLinkItem(_0x5d6e97[_0x2894f2]) + ' ' + _0x444436.statusText);
        createBuyOrder(_0x5d6e97, _0x2894f2 + 1);
      },
      dataType: 'json'
    });
  }
  function removeFromSale(_0x55382e, _0xad9c8d) {
    if (!working) {
      return;
    }
    if (_0xad9c8d < _0x55382e.length) {
      var _0x409906 = {};
      _0x409906.sessionid = sessionid;
      $.ajax({
        type: 'POST',
        url: 'https://steamcommunity.com/market/removelisting/' + _0x55382e[_0xad9c8d],
        data: _0x409906,
        dataType: 'json',
        success: function (_0x2d2213) {
          removeFromSale(_0x55382e, _0xad9c8d + 1);
        },
        error: function (_0x3d2be0) {
          console.log(_0x3d2be0.statusText);
          removeFromSale(_0x55382e, _0xad9c8d + 1);
        }
      });
    } else {
      log('Удаление с продажи завершено');
    }
  }
  function sellItem(_0x52aa32, _0x3434c0) {
    if (!working) {
      return;
    }
    if (_0x3434c0 < _0x52aa32.length) {
      var _0x3bd6ba = {};
      _0x3bd6ba.sessionid = sessionid;
      _0x3bd6ba.appid = _0x52aa32[_0x3434c0].appid;
      _0x3bd6ba.contextid = _0x52aa32[_0x3434c0].contextid;
      _0x3bd6ba.assetid = _0x52aa32[_0x3434c0].assetid;
      _0x3bd6ba.amount = 1;
      _0x3bd6ba.price = _0x52aa32[_0x3434c0].price;
      $.ajax({
        type: 'POST',
        url: 'https://steamcommunity.com/market/sellitem',
        dataType: 'json',
        data: _0x3bd6ba,
        success: function (_0x3b13df) {
          if (_0x3b13df.success) {
            log(getLinkItem(_0x52aa32[_0x3434c0]) + ' ' + _0x52aa32[_0x3434c0].message, 'sell_msg');
          } else if (_0x3b13df.message == 'You already have a listing for this item pending confirmation. Please confirm or cancel the existing listing.') {
            let _0x55ec0d = _0x52aa32[_0x3434c0];
            log(_0x52aa32[_0x3434c0].name + ' Не подтвердили продажу в Steam Guard');
            if (checkSDASettings) {
              SDARemove.push(_0x52aa32[_0x3434c0].assetid);
            }
            if (SDA_not_confirmed[_0x52aa32[_0x3434c0].assetid] == undefined) {
              SDA_not_confirmed[_0x52aa32[_0x3434c0].assetid] = 0;
            } else {
              let _0x2fe010 = new Date();
              let _0x38010e = String(_0x2fe010.getDate()).padStart(2, '0');
              let _0x45969b = String(_0x2fe010.getMonth() + 1).padStart(2, '0');
              let _0x4a15ea = _0x2fe010.getFullYear();
              _0x2fe010 = '' + _0x4a15ea + _0x45969b + _0x38010e;
              SDA_not_confirmed[_0x52aa32[_0x3434c0].assetid]++;
              if (SDA_not_confirmed[_0x52aa32[_0x3434c0].assetid] >= 2 && SDA_not_confirmed_date != _0x2fe010) {
                sendMsgTelegramBot('SDA не подтверждает операции, проверьте!');
                SDA_not_confirmed_date = _0x2fe010;
              }
            }
          } else {
            log(getLinkItem(_0x52aa32[_0x3434c0]) + ' ' + _0x3b13df.message);
          }
          sellItem(_0x52aa32, _0x3434c0 + 1);
        },
        error: function (_0x5f7481) {
          log(getLinkItem(_0x52aa32[_0x3434c0]) + ' ' + (_0x5f7481.responseJSON == undefined || _0x5f7481.responseJSON.message == undefined ? '' : _0x5f7481.responseJSON.message));
          sellItem(_0x52aa32, _0x3434c0 + 1);
        }
      });
    } else {
      timerSellInventoryWorking = false;
      log('Выставление на продажу завершено');
    }
  }
  function cancelBuyOrder(_0x5803bc, _0x4ee846) {
    if (!working) {
      return;
    }
    if (_0x4ee846 < _0x5803bc.length) {
      var _0x2ccba2 = {};
      _0x2ccba2.sessionid = sessionid;
      _0x2ccba2.buy_orderid = _0x5803bc[_0x4ee846].buyorderid;
      $.ajax({
        type: 'POST',
        url: 'https://steamcommunity.com/market/cancelbuyorder/',
        data: _0x2ccba2,
        dataType: 'json',
        success: function (_0x5ab9df) {
          if (_0x5ab9df.success) {
            log(getLinkItem(_0x5803bc[_0x4ee846]) + ' заказ снят, цена: ' + round(_0x5803bc[_0x4ee846].b_summ / 100));
          } else {
            log(getLinkItem(_0x5803bc[_0x4ee846]) + ' заказ видимо не снят');
          }
          cancelBuyOrder(_0x5803bc, _0x4ee846 + 1);
        },
        error: function (_0x3f57d2) {
          log(getLinkItem(_0x5803bc[_0x4ee846]) + ' заказ видимо не снят');
          cancelBuyOrder(_0x5803bc, _0x4ee846 + 1);
        }
      });
    } else {
      getBuyOrders();
    }
  }
  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(function (_0x4a38a3) {
  });
  function getItemsCurKoefOrder(_0x281198, _0x2175c5) {
    if (_0x2175c5 >= _0x281198.length) {
      log('Данные по текущим коэф стакана обновлены');
      _0x1177f8();
      return;
    }
    let _0x575f36 = 'https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=' + currency.id + '&item_nameid=' + _0x281198[_0x2175c5].item_nameid + '&two_factor=0';
    $.ajax({
      url: _0x575f36,
      dataType: 'json',
      type: 'get',
      async: true,
      cache: true,
      success: function (_0x47f37e) {
        if (_0x47f37e.buy_order_graph == undefined || _0x47f37e.buy_order_graph[0] == undefined || _0x47f37e.buy_order_graph[0][0] == undefined) {
          setTimeout(function () {
            getItemsCurKoefOrder(_0x281198, _0x2175c5 + 1);
          }, query_delay);
          return;
        }
        let _0x585a9e = items.map(function (_0x5e44b6) {
          return _0x5e44b6.appid + _0x5e44b6.name;
        }).indexOf(_0x281198[_0x2175c5].appid + _0x281198[_0x2175c5].name);
        items[_0x585a9e].CurKoefOrder = 999;
        if (_0x47f37e.buy_order_graph) {
          for (let _0x10acff = 0; _0x10acff < _0x47f37e.buy_order_graph.length; _0x10acff++) {
            if (_0x281198[_0x2175c5].b_summ >= round(_0x47f37e.buy_order_graph[_0x10acff][0] * 100)) {
              if (_0x281198[_0x2175c5].countSalesMonth == '') {
                log(_0x281198[_0x2175c5].name + ' Нет количества продаж');
                break;
              }
              items[_0x585a9e].CurKoefOrder = round(_0x47f37e.buy_order_graph[_0x10acff][1] / _0x281198[_0x2175c5].countSalesMonth);
              _0x10acff = _0x47f37e.buy_order_graph.length;
            }
          }
        }
        getItemsCurKoefOrder(_0x281198, _0x2175c5 + 1);
      },
      error: function () {
        setTimeout(function () {
          getItemsCurKoefOrder(_0x281198, _0x2175c5 + 1);
        }, query_delay);
      }
    });
  }
  function loadHistoryOneTime(_0x42167a, _0x51f5c0, _0x34d746, _0x41b177) {
    if (_0x41b177) {
      for (let _0x1c1be3 in _0x51f5c0) {
        runSQLupdate('date_last_sell', _0x51f5c0[_0x1c1be3], _0x1c1be3);
      }
      return;
    }
    $.ajax({
      url: 'https://steamcommunity.com/market/myhistory/render/?query=&norender=1&start=' + _0x34d746 * 500 + '&count=500',
      type: 'get',
      dataType: 'json',
      async: true,
      cache: false,
      success: function (_0x367900) {
        if (!_0x367900.events) {
          loadHistoryOneTime(_0x42167a, _0x51f5c0, _0x34d746 + 1, _0x41b177);
          return;
        }
        _0x367900.events.forEach(_0x35dba7 => {
          if (_0x35dba7.event_type == 3) {
            var _0x145dca = new Date(_0x35dba7.time_event * 1000);
            var _0x14ce8f = String(_0x145dca.getDate()).padStart(2, '0');
            var _0x52440e = String(_0x145dca.getMonth() + 1).padStart(2, '0');
            var _0x2c8cfa = _0x145dca.getFullYear();
            let _0x5934fd = Number(_0x2c8cfa + _0x52440e + _0x14ce8f);
            let _0x383351 = _0x367900.listings[_0x35dba7.listingid].publisher_fee_app;
            let _0x1a160f = _0x367900.assets[_0x367900.listings[_0x35dba7.listingid].publisher_fee_app][_0x367900.listings[_0x35dba7.listingid].asset.contextid][_0x367900.listings[_0x35dba7.listingid].asset.id].market_hash_name;
            if (_0x51f5c0[_0x367900.listings[_0x35dba7.listingid].publisher_fee_app + _0x367900.assets[_0x367900.listings[_0x35dba7.listingid].publisher_fee_app][_0x367900.listings[_0x35dba7.listingid].asset.contextid][_0x367900.listings[_0x35dba7.listingid].asset.id].market_hash_name] == undefined) {
              _0x51f5c0[_0x367900.listings[_0x35dba7.listingid].publisher_fee_app + _0x367900.assets[_0x367900.listings[_0x35dba7.listingid].publisher_fee_app][_0x367900.listings[_0x35dba7.listingid].asset.contextid][_0x367900.listings[_0x35dba7.listingid].asset.id].market_hash_name] = _0x5934fd;
            }
            if (_0x5934fd < _0x42167a) {
              _0x41b177 = true;
            }
          }
        });
        loadHistoryOneTime(_0x42167a, _0x51f5c0, _0x34d746 + 1, _0x41b177);
      },
      error: function () {
        loadHistoryOneTime(_0x42167a, _0x51f5c0, _0x34d746 + 1, _0x41b177);
      }
    });
  }
  function _0x350a66() {
    $.ajax({
      url: 'https://steamcommunity.com/market/myhistory/render/?query=&norender=1&start=0&count=100',
      type: 'get',
      dataType: 'json',
      async: true,
      cache: false,
      success: function (_0x531eb1) {
        let _0x10547c = _0x531eb1.events;
        for (let _0x712618 = 0; _0x712618 < _0x531eb1.events.length - 1; _0x712618++) {
          let _0x2b7f42 = _0x531eb1.assets[_0x531eb1.listings[_0x531eb1.events[_0x712618].listingid].publisher_fee_app][_0x531eb1.listings[_0x531eb1.events[_0x712618].listingid].asset.contextid][_0x531eb1.listings[_0x531eb1.events[_0x712618].listingid].asset.id].market_hash_name;
          let _0x1ea913 = _0x531eb1.assets[_0x531eb1.listings[_0x531eb1.events[_0x712618 + 1].listingid].publisher_fee_app][_0x531eb1.listings[_0x531eb1.events[_0x712618 + 1].listingid].asset.contextid][_0x531eb1.listings[_0x531eb1.events[_0x712618 + 1].listingid].asset.id].market_hash_name;
          if (_0x531eb1.events[_0x712618].event_type == 1 && _0x531eb1.events[_0x712618 + 1].event_type == 4 && _0x531eb1.assets[_0x531eb1.listings[_0x531eb1.events[_0x712618].listingid].publisher_fee_app][_0x531eb1.listings[_0x531eb1.events[_0x712618].listingid].asset.contextid][_0x531eb1.listings[_0x531eb1.events[_0x712618].listingid].asset.id].market_hash_name == _0x531eb1.assets[_0x531eb1.listings[_0x531eb1.events[_0x712618 + 1].listingid].publisher_fee_app][_0x531eb1.listings[_0x531eb1.events[_0x712618 + 1].listingid].asset.contextid][_0x531eb1.listings[_0x531eb1.events[_0x712618 + 1].listingid].asset.id].market_hash_name) {
            let _0x4a9e46 = _0x531eb1.purchases[_0x531eb1.events[_0x712618 + 1].listingid + '_' + _0x531eb1.events[_0x712618 + 1].purchaseid].paid_amount + _0x531eb1.purchases[_0x531eb1.events[_0x712618 + 1].listingid + '_' + _0x531eb1.events[_0x712618 + 1].purchaseid].paid_fee;
            let _0x4a57d4 = _0x531eb1.listings[_0x531eb1.events[_0x712618].listingid].original_price;
            if (_0x531eb1.listings[_0x531eb1.events[_0x712618].listingid].original_price <= _0x4a9e46) {
              console.log(_0x531eb1.assets[_0x531eb1.listings[_0x531eb1.events[_0x712618].listingid].publisher_fee_app][_0x531eb1.listings[_0x531eb1.events[_0x712618].listingid].asset.contextid][_0x531eb1.listings[_0x531eb1.events[_0x712618].listingid].asset.id].market_hash_name);
              console.log(_0x4a9e46);
              console.log(_0x531eb1.listings[_0x531eb1.events[_0x712618].listingid].original_price);
              sendMsgTelegramBot(_0x531eb1.assets[_0x531eb1.listings[_0x531eb1.events[_0x712618].listingid].publisher_fee_app][_0x531eb1.listings[_0x531eb1.events[_0x712618].listingid].asset.contextid][_0x531eb1.listings[_0x531eb1.events[_0x712618].listingid].asset.id].market_hash_name);
            }
          }
        }
      },
      error: function () {
        log('checkKrivieItems error');
      }
    });
  }
  // Функция для расчета комиссии Steam
  function getSteamFee(price) {
    // Округляем цену до целых копеек
    const roundedPrice = Math.round(price * 100);
    // Вычисляем сумму комиссии
    const feeAmount = calculateFeeAmount(roundedPrice, 0.10);
    // Вычитаем комиссию из цены и округляем до целых рублей
    const priceAfterFees = Math.round((roundedPrice - feeAmount.fees) / 100);
    return priceAfterFees;
  }
  
  // Функция для расчета суммы, которую покупатель должен заплатить
  function getBuyerPays(price) {
    // Округляем цену до целых копеек
    const roundedPrice = Math.round(price * 100);
    // Вычисляем сумму, которую нужно отправить, чтобы получить желаемую сумму после вычета комиссии
    const amountToSend = calculateAmountToSendForDesiredReceivedAmount(roundedPrice, 0.10);
    // Округляем сумму, которую нужно отправить, до целых рублей
    const buyerPays = Math.round(amountToSend.amount / 100);
    return buyerPays;
  }
  
  // Функция для расчета суммы, которую нужно отправить, чтобы получить желаемую сумму после вычета комиссии
  function calculateAmountToSendForDesiredReceivedAmount(price, publisherFee) {
    // Если значение publisherFee не задано, то устанавливаем его равным 0
    publisherFee = publisherFee || 0;
    // Вычисляем сумму комиссии Steam
    const steamFee = Math.max(Math.floor(price * 0.05), 1);
    // Вычисляем сумму комиссии для издателя
    const totalPublisherFee = Math.floor(price * publisherFee);
    // Вычисляем общую сумму комиссии
    const totalFees = steamFee + totalPublisherFee;
    // Вычисляем сумму, которую нужно отправить, чтобы получить желаемую сумму после вычета комиссии
    const amountToSend = price + totalFees;
    return {
      steamFee: steamFee,
      publisherFee: totalPublisherFee,
      fees: totalFees,
      amount: amountToSend
    };
  }
  
  // Функция для расчета суммы комиссии
  function calculateFeeAmount(price, publisherFee) {
    // Если значение publisherFee не задано, то устанавливаем его равным 0
    publisherFee = publisherFee || 0;
    let feeAmount = 0;
    let iterations = 0;
    // Вычисляем сумму, которую нужно отправить, чтобы получить желаемую сумму после вычета комиссии
    let amountToSend = calculateAmountToSendForDesiredReceivedAmount(price, publisherFee);
    // Пока сумма, которую нужно отправить, не будет равна желаемой сумме или количество итераций не превысит 10
    while (amountToSend.amount !== price && iterations < 10) {
      // Если сумма, которую нужно отправить, больше желаемой суммы
      if (amountToSend.amount > price) {
        // Уменьшаем сумму, которую нужно отправить, на 1 и пересчитываем комиссию
        amountToSend = calculateAmountToSendForDesiredReceivedAmount(amountToSend.amount - 1, publisherFee);
        // Добавляем разницу между желаемой суммой и суммой, которую нужно отправить, к комиссии Steam
        amountToSend.steamFee += price - amountToSend.amount;
        // Добавляем разницу между желаемой суммой и суммой, которую нужно отправить, к общей комиссии
        amountToSend.fees += price - amountToSend.amount;
        // Устанавливаем сумму, которую нужно отправить, равной желаемой сумме
        amountToSend.amount = price;
        break;
      } else {
        // Увеличиваем сумму, которую нужно отправить, на 1 и пересчитываем комиссию
        amountToSend = calculateAmountToSendForDesiredReceivedAmount(amountToSend.amount + 1, publisherFee);
      }
      iterations++;
    }
    // Устанавливаем сумму комиссии равной общей комиссии
    feeAmount = amountToSend.fees;
    return {
      fees: feeAmount
    };
  }
  function logSQLError(_0x43a6f9, _0x1c614f) {
    log('Ошибка выполнения скрипта:<br>' + _0x43a6f9 + '<br>Ошибка:<br>' + _0x1c614f.message);
  }
  function round(_0x50434d) {
    return Math.round(_0x50434d * 100) / 100;
  }
  function incOrders(_0x2856f9) {
    let _0x2110eb = [];
    _0x2856f9.forEach(_0x9c9d8f => {
      _0x9c9d8f.b_cnt++;
      if (AOSettings && perenos_v_osn_group) {
        if (_0x9c9d8f.b_cnt >= cnt_for_move_to_osn_group && _0x9c9d8f.id_group == group_temp) {
          _0x9c9d8f.id_group = group_percent;
          _0x2110eb.push(_0x9c9d8f.appid + _0x9c9d8f.name);
          log(getLinkItem(_0x9c9d8f) + ' перемещен в рабочую группу');
        }
      }
    });
    if (AOSettings && perenos_v_osn_group && _0x2110eb.length > 0) {
      addItemsToGroup(_0x2110eb, group_percent, false);
    }
  }
  $(document).ready(function () {
    $('#groupSettings').hide();
    function _0xcc7126() {
      var _0x26c14e = $('#to_top');
      if ($(window).scrollTop() > 500) {
        $('#nav-icon2').addClass('top');
        var _0x2b7bb7 = ($(window).width() - 1100) / 2;
        if (_0x2b7bb7 >= 0) {
          var _0x4a6304 = {};
          _0x4a6304.right = '0';
          _0x26c14e.css(_0x4a6304);
        } else {
          var _0x38b06c = {};
          _0x38b06c.right = '20px';
          _0x38b06c.left = 'auto';
          _0x26c14e.css(_0x38b06c);
        }
        _0x26c14e.show();
        $('#help').show();
      } else {
        $('#nav-icon2').removeClass('top');
        _0x26c14e.hide();
        $('#help').hide();
      }
    }
    setInterval(_0xcc7126, 200);
    $('#to_top').on('click', function () {
      var _0x2d7ed4 = {};
      _0x2d7ed4.scrollTop = 0;
      $('html, body').animate(_0x2d7ed4, 200);
    });
    $('body').on('click', '.logs-btn', function () {
      $('.logs').toggleClass('hide');
    });
    $('body').on('click', '.close-setting-btn', function () {
      $('.settings-block').toggleClass('hide-setting');
      if ($('.settings-block').hasClass('hide-setting')) {
        $('.close-setting-btn').text('Показать настройки');
      } else {
        $('.close-setting-btn').text('Скрыть настройки');
      }
    });
    $('body').on('click', '.close-log-btn', function () {
      $('.logs-block').toggleClass('hide-setting');
      if ($('.logs-block').hasClass('hide-setting')) {
        $('.close-log-btn').text('Показать логи');
      } else {
        $('.close-log-btn').text('Скрыть логи');
      }
    });
    $('body').on('click', '#startWork', function () {
      if ($('.logs').hasClass('hide')) {
        $('.logs').toggleClass('hide');
      }
    });
    $(document).ready(function () {
      $('body').on('click', '.set_group .slider', function () {
        $(this).parent('div').find('input[type=checkbox]').trigger('click');
      });
      $('body').on('click', '.file-open', function () {
        $('#fileForAnalysis').trigger('click');
      });
      $('body').on('change', '#fileForAnalysis', function () {
        var _0x9bc777 = $('#fileForAnalysis')[0].files[0];
        if ($('#fileForAnalysis')[0].files[0]) {
          $('.file-open').text($('#fileForAnalysis')[0].files[0].name);
        }
      });
      $('body').on('click', '.theme-settings__btn', function () {
        var _0xfe8110 = $(this).data('theme');
        if (_0xfe8110 == 'Simple') {
          $('link[rel=stylesheet]')[4].disabled = true;
          $('link[rel=stylesheet]')[5].disabled = false;
          localStorage.removeItem('' + _0xfe8110 + '');
          localStorage.setItem('theme', '' + _0xfe8110 + '');
        } else {
          $('link[rel=stylesheet]')[4].disabled = false;
          $('link[rel=stylesheet]')[5].disabled = true;
          $('body').removeClass('Classic Dark Steam');
          $('body').addClass(_0xfe8110);
          localStorage.removeItem('' + _0xfe8110 + '');
          localStorage.setItem('theme', '' + _0xfe8110 + '');
          $(this).addClass('active').siblings().removeClass('active');
        }
      });
      if (localStorage.getItem('theme')) {
        var _0x29beba = localStorage.getItem('theme');
        if (_0x29beba == 'Simple') {
          $('link[rel=stylesheet]')[4].disabled = true;
          $('link[rel=stylesheet]')[5].disabled = false;
        } else {
          $('link[rel=stylesheet]')[4].disabled = false;
          $('link[rel=stylesheet]')[5].disabled = true;
          $('body').addClass('' + _0x29beba + '');
          $('.theme-settings__btn').removeClass('active');
          $('.theme-settings__btn').each(function () {
            if ($(this).data('theme') == localStorage.getItem('theme')) {
              $(this).addClass('active');
            }
          });
        }
      }
    });
  });
  function getLinkItem(_0x1896a7) {
    var _0x45b36c = items.map(function (_0x4aa761) {
      return _0x4aa761.appid + _0x4aa761.name;
    }).indexOf(_0x1896a7.appid + _0x1896a7.name);
    if (_0x45b36c != -1) {
      if (items[_0x45b36c].url) {
        return '<a href="' + items[_0x45b36c].url + '" target="_blank">' + items[_0x45b36c].name_real + '</a>';
      } else {
        return '<a href="https://steamcommunity.com/market/listings/' + items[_0x45b36c].appid + '/' + items[_0x45b36c].name + '" target="_blank">' + items[_0x45b36c].name_real + '</a>';
      }
    } else {
      return _0x1896a7.name;
    }
  }
  var _0x2daec8 = {};
  _0x2daec8['1'] = 'USD';
  _0x2daec8['2'] = 'GBP';
  _0x2daec8['3'] = 'EUR';
  _0x2daec8['4'] = 'CHF';
  _0x2daec8['5'] = 'RUB';
  _0x2daec8['6'] = 'PLN';
  _0x2daec8['7'] = 'BRL';
  _0x2daec8['8'] = 'JPY';
  _0x2daec8['9'] = 'NOK';
  _0x2daec8['10'] = 'IDR';
  _0x2daec8['11'] = 'MYR';
  _0x2daec8['12'] = 'PHP';
  _0x2daec8['13'] = 'SGD';
  _0x2daec8['14'] = 'THB';
  _0x2daec8['15'] = 'VND';
  _0x2daec8['16'] = 'KRW';
  _0x2daec8['17'] = 'TRY';
  _0x2daec8['18'] = 'UAH';
  _0x2daec8['19'] = 'MXN';
  _0x2daec8['20'] = 'CAD';
  _0x2daec8['21'] = 'AUD';
  _0x2daec8['22'] = 'NZD';
  _0x2daec8['23'] = 'CNY';
  _0x2daec8['24'] = 'INR';
  _0x2daec8['25'] = 'CLP';
  _0x2daec8['26'] = 'PEN';
  _0x2daec8['27'] = 'COP';
  _0x2daec8['28'] = 'ZAR';
  _0x2daec8['29'] = 'HKD';
  _0x2daec8['30'] = 'TWD';
  _0x2daec8['31'] = 'SAR';
  _0x2daec8['32'] = 'AED';
  _0x2daec8['34'] = 'ARS';
  _0x2daec8['35'] = 'ILS';
  _0x2daec8['37'] = 'KZT';
  _0x2daec8['38'] = 'KWD';
  _0x2daec8['39'] = 'QAR';
  _0x2daec8['40'] = 'CRC';
  _0x2daec8['41'] = 'UYU';
  var _0xfd702a = {};
  _0xfd702a.short = 'USD';
  _0xfd702a.long = 'United States dollar';
  _0xfd702a.sign = '$';
  var _0x3ccd23 = {};
  _0x3ccd23.short = 'EUR';
  _0x3ccd23.long = 'Euro';
  _0x3ccd23.sign = '€';
  var _0x489271 = {};
  _0x489271.short = 'GBP';
  _0x489271.long = 'Pound sterling';
  _0x489271.sign = '£';
  var _0x5aa01b = {};
  _0x5aa01b.short = 'KEY';
  _0x5aa01b.long = 'Case Key';
  _0x5aa01b.sign = 'K';
  var _0x125429 = {};
  _0x125429.short = 'CNY';
  _0x125429.long = 'Renminbi';
  _0x125429.sign = '¥';
  var _0x1afba2 = {};
  _0x1afba2.short = 'JPY';
  _0x1afba2.long = 'Japanese yen';
  _0x1afba2.sign = '¥';
  var _0x335181 = {};
  _0x335181.short = 'CAD';
  _0x335181.long = 'Canadian dollar';
  _0x335181.sign = 'C$';
  var _0x5b815d = {};
  _0x5b815d.short = 'AUD';
  _0x5b815d.long = 'Australian dollar';
  _0x5b815d.sign = 'A$';
  var _0x453bcf = {};
  _0x453bcf.short = 'HKD';
  _0x453bcf.long = 'Hong Kong dollar';
  _0x453bcf.sign = 'HK$';
  var _0x39948e = {};
  _0x39948e.short = 'ISK';
  _0x39948e.long = 'Icelandic króna';
  _0x39948e.sign = 'kr';
  var _0x409b8a = {};
  _0x409b8a.short = 'PHP';
  _0x409b8a.long = 'Philippine peso';
  _0x409b8a.sign = '₱';
  var _0x454bdf = {};
  _0x454bdf.short = 'DKK';
  _0x454bdf.long = 'Danish krone';
  _0x454bdf.sign = 'kr';
  var _0x733c09 = {};
  _0x733c09.short = 'HUF';
  _0x733c09.long = 'Hungarian forint';
  _0x733c09.sign = 'Ft';
  var _0x279bc4 = {};
  _0x279bc4.short = 'CZK';
  _0x279bc4.long = 'Czech koruna';
  _0x279bc4.sign = 'Kč';
  var _0x98e9be = {};
  _0x98e9be.short = 'RON';
  _0x98e9be.long = 'Romanian leu';
  _0x98e9be.sign = 'L';
  var _0xd653b5 = {};
  _0xd653b5.short = 'SEK';
  _0xd653b5.long = 'Swedish krona';
  _0xd653b5.sign = 'kr';
  var _0x29cafc = {};
  _0x29cafc.short = 'IDR';
  _0x29cafc.long = 'Indonesian rupiah';
  _0x29cafc.sign = 'Rp';
  var _0x17c9f4 = {};
  _0x17c9f4.short = 'INR';
  _0x17c9f4.long = 'Indian rupee';
  _0x17c9f4.sign = '₹';
  var _0x29f23c = {};
  _0x29f23c.short = 'BRL';
  _0x29f23c.long = 'Brazilian real';
  _0x29f23c.sign = 'R$';
  var _0x3d0992 = {};
  _0x3d0992.short = 'RUB';
  _0x3d0992.long = 'Russian ruble';
  _0x3d0992.sign = '₽';
  var _0x192747 = {};
  _0x192747.short = 'HRK';
  _0x192747.long = 'Croatian kuna';
  _0x192747.sign = 'kn';
  var _0x3b07f2 = {};
  _0x3b07f2.short = 'THB';
  _0x3b07f2.long = 'Thai baht';
  _0x3b07f2.sign = '฿';
  var _0x6d9bb3 = {};
  _0x6d9bb3.short = 'CHF';
  _0x6d9bb3.long = 'Swiss franc';
  _0x6d9bb3.sign = 'CHF';
  var _0x5b913f = {};
  _0x5b913f.short = 'MYR';
  _0x5b913f.long = 'Malaysian ringgit';
  _0x5b913f.sign = 'RM';
  var _0x108703 = {};
  _0x108703.short = 'BGN';
  _0x108703.long = 'Bulgarian lev';
  _0x108703.sign = 'лв';
  var _0x762ba3 = {};
  _0x762ba3.short = 'TRY';
  _0x762ba3.long = 'Turkish lira';
  _0x762ba3.sign = '₺';
  var _0x14fcbe = {};
  _0x14fcbe.short = 'NOK';
  _0x14fcbe.long = 'Norwegian krone';
  _0x14fcbe.sign = 'kr';
  var _0x1b8ae0 = {};
  _0x1b8ae0.short = 'NZD';
  _0x1b8ae0.long = 'New Zealand dollar';
  _0x1b8ae0.sign = 'NZ$';
  var _0x3e077d = {};
  _0x3e077d.short = 'ZAR';
  _0x3e077d.long = 'South African rand';
  _0x3e077d.sign = 'R';
  var _0x591631 = {};
  _0x591631.short = 'MXN';
  _0x591631.long = 'Mexican peso';
  _0x591631.sign = 'Mex$';
  var _0x21026e = {};
  _0x21026e.short = 'SGD';
  _0x21026e.long = 'Singapore dollar';
  _0x21026e.sign = 'S$';
  var _0x178dae = {};
  _0x178dae.short = 'ILS';
  _0x178dae.long = 'Israeli new shekel';
  _0x178dae.sign = '₪';
  var _0x44275c = {};
  _0x44275c.short = 'KRW';
  _0x44275c.long = 'South Korean won';
  _0x44275c.sign = '₩';
  var _0x4d4fcb = {};
  _0x4d4fcb.short = 'PLN';
  _0x4d4fcb.long = 'Polish złoty';
  _0x4d4fcb.sign = 'zł';
  var _0x271f4d = {};
  _0x271f4d.short = 'BTC';
  _0x271f4d.long = 'Bitcoin';
  _0x271f4d.sign = '₿';
  var _0xe8b6c3 = {};
  _0xe8b6c3.short = 'MBC';
  _0xe8b6c3.long = 'μBTC (you-bit or 0.000001 of a Bitcoin)';
  _0xe8b6c3.sign = 'μ₿';
  var _0x2b7818 = {};
  _0x2b7818.short = 'ETH';
  _0x2b7818.long = 'Ethereum';
  _0x2b7818.sign = 'Ξ';
  var _0x60bf19 = {};
  _0x60bf19.short = 'FET';
  _0x60bf19.long = 'Finney (0.001 of an Ether)';
  _0x60bf19.sign = 'fΞ';
  var _0x2bcbaf = {};
  _0x2bcbaf.short = 'AED';
  _0x2bcbaf.long = 'United Arab Emirates Dirham';
  _0x2bcbaf.sign = 'د.إ';
  var _0x4e67d7 = {};
  _0x4e67d7.short = 'ARS';
  _0x4e67d7.long = 'Argentine Peso';
  _0x4e67d7.sign = 'AP$';
  var _0x4336f9 = {};
  _0x4336f9.short = 'CLP';
  _0x4336f9.long = 'Chilean Peso';
  _0x4336f9.sign = 'CP$';
  var _0x3ffe58 = {};
  _0x3ffe58.short = 'COP';
  _0x3ffe58.long = 'Colombian Peso';
  _0x3ffe58.sign = 'COL$';
  var _0x5f575b = {};
  _0x5f575b.short = 'CRC';
  _0x5f575b.long = 'Costa Rican Colón';
  _0x5f575b.sign = '₡';
  var _0x213a48 = {};
  _0x213a48.short = 'KWD';
  _0x213a48.long = 'Kuwaiti Dinar';
  _0x213a48.sign = 'د.ك';
  var _0x171d3a = {};
  _0x171d3a.short = 'KZT';
  _0x171d3a.long = 'Kazakhstani Tenge';
  _0x171d3a.sign = '₸';
  var _0x169a8c = {};
  _0x169a8c.short = 'PEN';
  _0x169a8c.long = 'Peruvian Nuevo Sol';
  _0x169a8c.sign = 'S/';
  var _0x21dfa6 = {};
  _0x21dfa6.short = 'QAR';
  _0x21dfa6.long = 'Qatari Riyal';
  _0x21dfa6.sign = 'ر.ق';
  var _0x4c742c = {};
  _0x4c742c.short = 'SAR';
  _0x4c742c.long = 'Saudi Riyal';
  _0x4c742c.sign = '﷼';
  var _0x291ff4 = {};
  _0x291ff4.short = 'TWD';
  _0x291ff4.long = 'New Taiwan Dollar';
  _0x291ff4.sign = 'NT$';
  var _0x37731d = {};
  _0x37731d.short = 'UAH';
  _0x37731d.long = 'Ukrainian Hryvnia';
  _0x37731d.sign = '₴';
  var _0xc256ed = {};
  _0xc256ed.short = 'UYU';
  _0xc256ed.long = 'Uruguayan Peso';
  _0xc256ed.sign = '$U';
  var _0x286c60 = {};
  _0x286c60.short = 'VND';
  _0x286c60.long = 'Vietnamese Dong';
  _0x286c60.sign = '₫';
  var _0x1886f9 = {};
  _0x1886f9.short = 'GEL';
  _0x1886f9.long = 'Georgian Lari';
  _0x1886f9.sign = '₾';
  var _0x46f474 = {};
  _0x46f474.USD = _0xfd702a;
  _0x46f474.EUR = _0x3ccd23;
  _0x46f474.GBP = _0x489271;
  _0x46f474.KEY = _0x5aa01b;
  _0x46f474.CNY = _0x125429;
  _0x46f474.JPY = _0x1afba2;
  _0x46f474.CAD = _0x335181;
  _0x46f474.AUD = _0x5b815d;
  _0x46f474.HKD = _0x453bcf;
  _0x46f474.ISK = _0x39948e;
  _0x46f474.PHP = _0x409b8a;
  _0x46f474.DKK = _0x454bdf;
  _0x46f474.HUF = _0x733c09;
  _0x46f474.CZK = _0x279bc4;
  _0x46f474.RON = _0x98e9be;
  _0x46f474.SEK = _0xd653b5;
  _0x46f474.IDR = _0x29cafc;
  _0x46f474.INR = _0x17c9f4;
  _0x46f474.BRL = _0x29f23c;
  _0x46f474.RUB = _0x3d0992;
  _0x46f474.HRK = _0x192747;
  _0x46f474.THB = _0x3b07f2;
  _0x46f474.CHF = _0x6d9bb3;
  _0x46f474.MYR = _0x5b913f;
  _0x46f474.BGN = _0x108703;
  _0x46f474.TRY = _0x762ba3;
  _0x46f474.NOK = _0x14fcbe;
  _0x46f474.NZD = _0x1b8ae0;
  _0x46f474.ZAR = _0x3e077d;
  _0x46f474.MXN = _0x591631;
  _0x46f474.SGD = _0x21026e;
  _0x46f474.ILS = _0x178dae;
  _0x46f474.KRW = _0x44275c;
  _0x46f474.PLN = _0x4d4fcb;
  _0x46f474.BTC = _0x271f4d;
  _0x46f474.MBC = _0xe8b6c3;
  _0x46f474.ETH = _0x2b7818;
  _0x46f474.FET = _0x60bf19;
  _0x46f474.AED = _0x2bcbaf;
  _0x46f474.ARS = _0x4e67d7;
  _0x46f474.CLP = _0x4336f9;
  _0x46f474.COP = _0x3ffe58;
  _0x46f474.CRC = _0x5f575b;
  _0x46f474.KWD = _0x213a48;
  _0x46f474.KZT = _0x171d3a;
  _0x46f474.PEN = _0x169a8c;
  _0x46f474.QAR = _0x21dfa6;
  _0x46f474.SAR = _0x4c742c;
  _0x46f474.TWD = _0x291ff4;
  _0x46f474.UAH = _0x37731d;
  _0x46f474.UYU = _0xc256ed;
  _0x46f474.VND = _0x286c60;
  _0x46f474.GEL = _0x1886f9;
  function format(_0x34fd89) {
    return round(_0x34fd89).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  function logMicroBan(_0x100386) {
    log('Вы получили микробан, рекомендуется выключить бота и подождать', 'err_msg');
    if (_0x100386) {
      sendMsgTelegramBot('Микробан, рекомендуется выключить бота вручную');
    }
  }
  function getCurProfitPercent(_0x1b415f) {
    return round(_0x1b415f.s_summ * 100 / _0x1b415f.b_summ - 100);
  }
  },{"timeseries-analysis":4}],2:[function(require,module,exports){
  var _			= require("underscore");
  
  
  
  // Util: encoding
  var simpleEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  // This function scales the submitted values so that
  // maxVal becomes the highest value.
  function simpleEncode(valueArray,maxValue) {
    var chartData = ['s:'];
    for (var i = 0; i < valueArray.length; i++) {
      var currentValue = valueArray[i];
      if (!isNaN(currentValue) && currentValue >= 0) {
        chartData.push(simpleEncoding.charAt(Math.round((simpleEncoding.length-1) *
        currentValue / maxValue)));
      }
      else {
        chartData.push('_');
      }
    }
    return chartData.join('');
  }
  
  // Same as simple encoding, but for extended encoding.
  var EXTENDED_MAP= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.';
  var EXTENDED_MAP_LENGTH = EXTENDED_MAP.length;
  
  function extendedEncode(arrVals, maxVal) {
    var chartData = 'e:';
  
    for(i = 0, len = arrVals.length; i < len; i++) {
      // In case the array vals were translated to strings.
      var numericVal = new Number(arrVals[i]);
      // Scale the value to maxVal.
      var scaledVal = Math.floor(EXTENDED_MAP_LENGTH *
      EXTENDED_MAP_LENGTH * numericVal / maxVal);
  
      if(scaledVal > (EXTENDED_MAP_LENGTH * EXTENDED_MAP_LENGTH) - 1) {
        chartData += "..";
      } else if (scaledVal < 0) {
        chartData += '__';
      } else {
        // Calculate first and second digits and add them to the output.
        var quotient = Math.floor(scaledVal / EXTENDED_MAP_LENGTH);
        var remainder = scaledVal - EXTENDED_MAP_LENGTH * quotient;
        chartData += EXTENDED_MAP.charAt(quotient) + EXTENDED_MAP.charAt(remainder);
      }
    }
  
    return chartData;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  var google_image_chart = {
    url:		"https://chart.googleapis.com/chart",
    build:		function(params) {
      var i;
      var paramsArray = [];
      for (i in params) {
        paramsArray.push(i+"="+params[i]);
      }
      return google_image_chart.url+"?"+paramsArray.join("&");
    }
  };
  
  
  /* Candlestick */
  google_image_chart.candlestick = function(options) {
    this.options = _.extend({
      width:		800,
      height:		200,
      volume:		true,
      spacing:	2,
      autoscale:	true
    },options);
  }
  google_image_chart.candlestick.prototype.fromYahoo = function(data) {
    var scope 	= this;
    
    this.data 	= data;
    this.n		= data.length;
    
    var prices = {
      l:	[],
      o:	[],
      c:	[],
      h:	[]
    };
    this.chd 	= [];
    
    /*
      L
      O
      C
      H
    */
      
    _.each(data, function(point) {
      prices.l.push(point.low);
      prices.o.push(point.open);
      prices.c.push(point.close);
      prices.h.push(point.high);
    });
    this.min 	= _.min(prices.l);
    this.max 	= _.max(prices.h);
    
    
    // Prepend and append -1 values, to have the chart with full candles, not crossing the Y axis
    
    prices.l.splice(0,0,-1);
    prices.o.splice(0,0,-1);
    prices.c.splice(0,0,-1);
    prices.h.splice(0,0,-1);
    
    prices.l.push(-1);
    prices.o.push(-1);
    prices.c.push(-1);
    prices.h.push(-1);
    
    
    this.chd.push(prices.l.join(","));
    this.chd.push(prices.o.join(","));
    this.chd.push(prices.c.join(","));
    this.chd.push(prices.h.join(","));
    
  }
  google_image_chart.candlestick.prototype.render = function() {
    var params = {};
    
    params['cht'] = "lc";
    params['chd'] = "t0:"+this.chd.join('|');
    
    params['chs'] 	= this.options.width+"x"+this.options.height;
    
    params['chm'] = "F,,0,-1,"+(Math.floor(this.options.width/this.n)*0.8);
    
    if (this.options.autoscale) {
      params['chds'] 	= this.min+","+this.max;
      //params['chxt'] 	= "y";
      //params['chxr'] 	= "0,"+this.min+","+this.max+",10";
    }
    
    return google_image_chart.build(params);
  }
  
  
  
  
  /* Bar (volume) */
  google_image_chart.bar = function(options) {
    this.options = _.extend({
      width:		800,
      height:		200,
      volume:		true,
      spacing:	2,
      autoscale:	true
    },options);
  }
  google_image_chart.bar.prototype.fromYahoo = function(data, key) {
    var scope 	= this;
    
    this.data 	= data;
    this.n		= data.length;
    var points	= [];
      
    _.each(data, function(point) {
      points.push(point[key]);
    });
    
    this.min 	= _.min(points);
    this.max 	= _.max(points);
    
    /*
    // Prepend and append -1 values, to have the chart with full candles, not crossing the Y axis
    points.splice(0,0,-1);
    points.push(-1);
    */
    
    this.chd = simpleEncode(points, this.max);
    
  }
  google_image_chart.bar.prototype.render = function() {
    var params = {};
    
    params['cht'] 	= "bvs";
    params['chco'] 	= "76A4FB";
    params['chd'] 	= this.chd;
    
    params['chs'] 	= this.options.width+"x"+this.options.height;
    
    params['chbh'] = "a";
    
    
    /*
    if (this.options.autoscale) {
      params['chds'] 	= this.min+","+this.max;
      params['chxt'] 	= "y";
      params['chxr'] 	= "0,"+this.min+","+this.max+",10";
    }
    */
    return google_image_chart.build(params);
  }
  
  
  
  
  /* Line (Indicators) */
  google_image_chart.line = function(options) {
    this.options = _.extend({
      width:		800,
      height:		200,
      bands:		false,
      autoscale:	true,
      hlines:		false	// Horizontal lines are a new serie, since Google Image doesn't support it...
    },options);
    
    
    this.datasets	= {};
    this.chd 		= [];
    this.chco		= [];
    
    this.min 		= 10000000000;
    this.max 		= -10000000000;
    
    
    
    this.rainbow 	= new Rainbow();
    this.rainbow.setSpectrum("76A4FB","E15393");
  }
  google_image_chart.line.prototype.fromYahoo = function(data) {
    var scope 	= this;
    
    this.data 	= data;
    this.n		= data.length;
    
    this.datasets	= {};
    this.chd 		= [];
    this.chco		= [];
    
    var prices		= {
      high:	"B61717",
      low:	"3283E4",
      //open:	"A5E036",
      close:	"222222"
    };
    
    for (price in prices) {
      scope.datasets[price] = {
        data:	[],
        min:	0,
        max:	0
      };
      _.each(data, function(datapoint) {
        scope.datasets[price].data.push(datapoint[price]);
      });
      
      scope.datasets[price].min 		= _.min(scope.datasets[price].data);
      scope.datasets[price].max 		= _.max(scope.datasets[price].data);
      
      
      
      if (scope.datasets[price].min < scope.min) {
        scope.min = scope.datasets[price].min;
      }
      if (scope.datasets[price].max > scope.max) {
        scope.max = scope.datasets[price].max;
      }
    }
    for (price in prices) {
      
      scope.chd.push(scope.datasets[price].data);
      
      scope.chco.push(prices[price]);
    }
    
  }
  google_image_chart.line.prototype.fromTradeStudio = function(data) {
    var scope 		= this;
    
    this.data 		= data;
    this.n			= data.length;
    
    _.each(data, function(dataset) {
      scope.datasets[dataset.name] = {
        data:	[],
        min:	0,
        max:	0
      };
      _.each(dataset.data, function(datapoint) {
        scope.datasets[dataset.name].data.push(datapoint[1]);
      });
      
      scope.datasets[dataset.name].min 		= _.min(scope.datasets[dataset.name].data);
      scope.datasets[dataset.name].max 		= _.max(scope.datasets[dataset.name].data);
      
      if (scope.datasets[dataset.name].min < scope.min) {
        scope.min = scope.datasets[dataset.name].min;
      }
      if (scope.datasets[dataset.name].max > scope.max) {
        scope.max = scope.datasets[dataset.name].max;
      }
    });
    
    _.each(data, function(dataset) {
      
      scope.chd.push(scope.datasets[dataset.name].data);
      if (dataset.color) {
        scope.chco.push(dataset.color);
      } else {
        scope.chco.push("AUTO");
      }
    });
    
  }
  google_image_chart.line.prototype.fromTimeseries = function(data) {
    var scope 		= this;
    
    this.data 		= data;
    this.n			= data.length;
    
    var name 		= _.uniqueId('chart_');
    
    scope.datasets[name] = {
      data:	[],
      min:	0,
      max:	0
    };
    _.each(data, function(datapoint) {
      scope.datasets[name].data.push(datapoint[1]);
    });
    
    scope.datasets[name].min 		= _.min(scope.datasets[name].data);
    scope.datasets[name].max 		= _.max(scope.datasets[name].data);
    
    if (scope.datasets[name].min < scope.min) {
      scope.min = scope.datasets[name].min;
    }
    if (scope.datasets[name].max > scope.max) {
      scope.max = scope.datasets[name].max;
    }
    scope.chd.push(scope.datasets[name].data);
    
    scope.chco.push("AUTO");
    
  }
  google_image_chart.line.prototype.fromArray = function(data) {
    var scope 		= this;
    
    this.data 		= data;
    this.n			= data.length;
    this.datasets	= {};
    this.chd 		= [];
    this.chco		= [];
    
    this.min 		= 10000000000;
    this.max 		= -10000000000;
    
    var c = 0;
    
    _.each(data, function(dataset, name) {
      c++;
      scope.datasets[name] = {
        data:	[],
        min:	0,
        max:	0
      };
      _.each(dataset, function(datapoint) {
        scope.datasets[name].data.push(datapoint);
      });
      
      scope.datasets[name].min 		= _.min(scope.datasets[name].data);
      scope.datasets[name].max 		= _.max(scope.datasets[name].data);
      
      if (scope.datasets[name].min < scope.min) {
        scope.min = scope.datasets[name].min;
      }
      if (scope.datasets[name].max > scope.max) {
        scope.max = scope.datasets[name].max;
      }
    });
    
    //console.log("Min", scope.min);
    //console.log("Max", scope.max);
    
    c = 0;
    _.each(data, function(dataset, name) {
      c++
      scope.chd.push(scope.datasets[name].data);
      
      if (dataset.color) {
        scope.chco.push(dataset.color);
      } else {
        scope.chco.push("AUTO");
        //var color = scope.rainbow.colorAt(c);
        //scope.chco.push(color);
      }
    });
    
    
  }
  google_image_chart.line.prototype.render = function() {
    var scope = this;
    
    var i;
    
    var params = {};
    
    params['cht'] 	= "lc";
    
    params['chs'] 	= this.options.width+"x"+this.options.height;
    
    params['chxt'] 	= "y";
    
    
    
    
    if (this.options.hlines) {
      // Add a new serie
      _.each(this.options.hlines, function(v) {
        var i;
        scope.chd.push([v,v]);
        scope.chco.push("ABABAB");
      });
    }
    
    // Encode the CHDs
    
    for (i=0;i<this.chd.length;i++) {
      if (scope.options.autoscale) {
        this.chd[i]	= _.map(this.chd[i], function(datapoint) {
          return datapoint-scope.min;
        });
        this.chd[i] = simpleEncode(this.chd[i], scope.max-scope.min);
      } else {
        this.chd[i] = simpleEncode(this.chd[i], scope.max);
      }
    }
    
    
    if (this.chd.length > 1) {
      // Remove the extra "s:" from the encoded data
      for (i=1;i<this.chd.length;i++) {
        this.chd[i] = this.chd[i].substr(2);
      }
    }
    
    params['chd'] 	= this.chd.join(",");
    
    
    // Process the colors;
    this.rainbow.setNumberRange(0, Math.max(this.chco.length, 1));
    for (i=0;i<this.chco.length;i++) {
      if (this.chco[i] == "AUTO") {
        this.chco[i] = this.rainbow.colorAt(i);
        //console.log("color "+i,this.chco[i]);
      }
    }
    params['chco'] 	= this.chco.join(","); //"76A4FB";
    
    
    
    if (this.options.bands) {
      var bands = [];
      _.each(this.options.bands, function(band) {
        bands.push("r,"+band.color+",0,"+band.from+","+band.to);
      });
      params['chm'] = bands.join("|");
    }
    
    
    if (this.options.autoscale) {
      params['chds'] 	= this.min+","+this.max;
      params['chxt'] 	= "y";
      params['chxr'] 	= "0,"+this.min+","+this.max+",10";
    }
    
    return google_image_chart.build(params);
  }
  
  
  exports.charts = google_image_chart;
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /*
  RainbowVis-JS 
  Released under MIT License
  */
  
  function Rainbow()
  {
    var gradients = null;
    var minNum = 0;
    var maxNum = 100;
    var colours = ['ff0000', 'ffff00', '00ff00', '0000ff']; 
    setColours(colours);
    
    function setColours (spectrum) 
    {
      if (spectrum.length < 2) {
        throw new Error('Rainbow must have two or more colours.');
      } else {
        var increment = (maxNum - minNum)/(spectrum.length - 1);
        var firstGradient = new ColourGradient();
        firstGradient.setGradient(spectrum[0], spectrum[1]);
        firstGradient.setNumberRange(minNum, minNum + increment);
        gradients = [ firstGradient ];
        
        for (var i = 1; i < spectrum.length - 1; i++) {
          var colourGradient = new ColourGradient();
          colourGradient.setGradient(spectrum[i], spectrum[i + 1]);
          colourGradient.setNumberRange(minNum + increment * i, minNum + increment * (i + 1)); 
          gradients[i] = colourGradient; 
        }
  
        colours = spectrum;
      }
    }
    this.setColors = this.setColours;
  
    this.setSpectrum = function () 
    {
      setColours(arguments);
    }
  
    this.setSpectrumByArray = function (array)
    {
      setColours(array);
    }
  
    this.colourAt = function (number)
    {
      if (isNaN(number)) {
        throw new TypeError(number + ' is not a number');
      } else if (gradients.length === 1) {
        return gradients[0].colourAt(number);
      } else {
        var segment = (maxNum - minNum)/(gradients.length);
        var index = Math.min(Math.floor((Math.max(number, minNum) - minNum)/segment), gradients.length - 1);
        return gradients[index].colourAt(number);
      }
    }
    this.colorAt = this.colourAt;
  
    this.setNumberRange = function (minNumber, maxNumber)
    {
      if (maxNumber > minNumber) {
        minNum = minNumber;
        maxNum = maxNumber;
        setColours(colours);
      } else {
        throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
      }
    }
  }
  
  function ColourGradient() 
  {
    var startColour = 'ff0000';
    var endColour = '0000ff';
    var minNum = 0;
    var maxNum = 100;
  
    this.setGradient = function (colourStart, colourEnd)
    {
      startColour = getHexColour(colourStart);
      endColour = getHexColour(colourEnd);
    }
  
    this.setNumberRange = function (minNumber, maxNumber)
    {
      if (maxNumber > minNumber) {
        minNum = minNumber;
        maxNum = maxNumber;
      } else {
        throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
      }
    }
  
    this.colourAt = function (number)
    {
      return calcHex(number, startColour.substring(0,2), endColour.substring(0,2)) 
        + calcHex(number, startColour.substring(2,4), endColour.substring(2,4)) 
        + calcHex(number, startColour.substring(4,6), endColour.substring(4,6));
    }
    
    function calcHex(number, channelStart_Base16, channelEnd_Base16)
    {
      var num = number;
      if (num < minNum) {
        num = minNum;
      }
      if (num > maxNum) {
        num = maxNum;
      } 
      var numRange = maxNum - minNum;
      var cStart_Base10 = parseInt(channelStart_Base16, 16);
      var cEnd_Base10 = parseInt(channelEnd_Base16, 16); 
      var cPerUnit = (cEnd_Base10 - cStart_Base10)/numRange;
      var c_Base10 = Math.round(cPerUnit * (num - minNum) + cStart_Base10);
      return formatHex(c_Base10.toString(16));
    }
  
    formatHex = function (hex) 
    {
      if (hex.length === 1) {
        return '0' + hex;
      } else {
        return hex;
      }
    } 
    
    function isHexColour(string)
    {
      var regex = /^#?[0-9a-fA-F]{6}$/i;
      return regex.test(string);
    }
  
    function getHexColour(string)
    {
      if (isHexColour(string)) {
        return string.substring(string.length - 6, string.length);
      } else {
        var colourNames =
        [
          ['red', 'ff0000'],
          ['lime', '00ff00'],
          ['blue', '0000ff'],
          ['yellow', 'ffff00'],
          ['orange', 'ff8000'],
          ['aqua', '00ffff'],
          ['fuchsia', 'ff00ff'],
          ['white', 'ffffff'],
          ['black', '000000'],
          ['gray', '808080'],
          ['grey', '808080'],
          ['silver', 'c0c0c0'],
          ['maroon', '800000'],
          ['olive', '808000'],
          ['green', '008000'],
          ['teal', '008080'],
          ['navy', '000080'],
          ['purple', '800080']
        ];
        for (var i = 0; i < colourNames.length; i++) {
          if (string.toLowerCase() === colourNames[i][0]) {
            return colourNames[i][1];
          }
        }
        throw new Error(string + ' is not a valid colour.');
      }
    }
  }
  
  
  exports.colors = Rainbow;
  },{"underscore":5}],3:[function(require,module,exports){
  //! moment.js
  //! version : 2.29.4
  //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
  //! license : MIT
  //! momentjs.com
  
  ;(function (global, factory) {
      typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
      typeof define === 'function' && define.amd ? define(factory) :
      global.moment = factory()
  }(this, (function () { 'use strict';
  
      var hookCallback;
  
      function hooks() {
          return hookCallback.apply(null, arguments);
      }
  
      // This is done to register the method called with moment()
      // without creating circular dependencies.
      function setHookCallback(callback) {
          hookCallback = callback;
      }
  
      function isArray(input) {
          return (
              input instanceof Array ||
              Object.prototype.toString.call(input) === '[object Array]'
          );
      }
  
      function isObject(input) {
          // IE8 will treat undefined and null as object if it wasn't for
          // input != null
          return (
              input != null &&
              Object.prototype.toString.call(input) === '[object Object]'
          );
      }
  
      function hasOwnProp(a, b) {
          return Object.prototype.hasOwnProperty.call(a, b);
      }
  
      function isObjectEmpty(obj) {
          if (Object.getOwnPropertyNames) {
              return Object.getOwnPropertyNames(obj).length === 0;
          } else {
              var k;
              for (k in obj) {
                  if (hasOwnProp(obj, k)) {
                      return false;
                  }
              }
              return true;
          }
      }
  
      function isUndefined(input) {
          return input === void 0;
      }
  
      function isNumber(input) {
          return (
              typeof input === 'number' ||
              Object.prototype.toString.call(input) === '[object Number]'
          );
      }
  
      function isDate(input) {
          return (
              input instanceof Date ||
              Object.prototype.toString.call(input) === '[object Date]'
          );
      }
  
      function map(arr, fn) {
          var res = [],
              i,
              arrLen = arr.length;
          for (i = 0; i < arrLen; ++i) {
              res.push(fn(arr[i], i));
          }
          return res;
      }
  
      function extend(a, b) {
          for (var i in b) {
              if (hasOwnProp(b, i)) {
                  a[i] = b[i];
              }
          }
  
          if (hasOwnProp(b, 'toString')) {
              a.toString = b.toString;
          }
  
          if (hasOwnProp(b, 'valueOf')) {
              a.valueOf = b.valueOf;
          }
  
          return a;
      }
  
      function createUTC(input, format, locale, strict) {
          return createLocalOrUTC(input, format, locale, strict, true).utc();
      }
  
      function defaultParsingFlags() {
          // We need to deep clone this object.
          return {
              empty: false,
              unusedTokens: [],
              unusedInput: [],
              overflow: -2,
              charsLeftOver: 0,
              nullInput: false,
              invalidEra: null,
              invalidMonth: null,
              invalidFormat: false,
              userInvalidated: false,
              iso: false,
              parsedDateParts: [],
              era: null,
              meridiem: null,
              rfc2822: false,
              weekdayMismatch: false,
          };
      }
  
      function getParsingFlags(m) {
          if (m._pf == null) {
              m._pf = defaultParsingFlags();
          }
          return m._pf;
      }
  
      var some;
      if (Array.prototype.some) {
          some = Array.prototype.some;
      } else {
          some = function (fun) {
              var t = Object(this),
                  len = t.length >>> 0,
                  i;
  
              for (i = 0; i < len; i++) {
                  if (i in t && fun.call(this, t[i], i, t)) {
                      return true;
                  }
              }
  
              return false;
          };
      }
  
      function isValid(m) {
          if (m._isValid == null) {
              var flags = getParsingFlags(m),
                  parsedParts = some.call(flags.parsedDateParts, function (i) {
                      return i != null;
                  }),
                  isNowValid =
                      !isNaN(m._d.getTime()) &&
                      flags.overflow < 0 &&
                      !flags.empty &&
                      !flags.invalidEra &&
                      !flags.invalidMonth &&
                      !flags.invalidWeekday &&
                      !flags.weekdayMismatch &&
                      !flags.nullInput &&
                      !flags.invalidFormat &&
                      !flags.userInvalidated &&
                      (!flags.meridiem || (flags.meridiem && parsedParts));
  
              if (m._strict) {
                  isNowValid =
                      isNowValid &&
                      flags.charsLeftOver === 0 &&
                      flags.unusedTokens.length === 0 &&
                      flags.bigHour === undefined;
              }
  
              if (Object.isFrozen == null || !Object.isFrozen(m)) {
                  m._isValid = isNowValid;
              } else {
                  return isNowValid;
              }
          }
          return m._isValid;
      }
  
      function createInvalid(flags) {
          var m = createUTC(NaN);
          if (flags != null) {
              extend(getParsingFlags(m), flags);
          } else {
              getParsingFlags(m).userInvalidated = true;
          }
  
          return m;
      }
  
      // Plugins that add properties should also add the key here (null value),
      // so we can properly clone ourselves.
      var momentProperties = (hooks.momentProperties = []),
          updateInProgress = false;
  
      function copyConfig(to, from) {
          var i,
              prop,
              val,
              momentPropertiesLen = momentProperties.length;
  
          if (!isUndefined(from._isAMomentObject)) {
              to._isAMomentObject = from._isAMomentObject;
          }
          if (!isUndefined(from._i)) {
              to._i = from._i;
          }
          if (!isUndefined(from._f)) {
              to._f = from._f;
          }
          if (!isUndefined(from._l)) {
              to._l = from._l;
          }
          if (!isUndefined(from._strict)) {
              to._strict = from._strict;
          }
          if (!isUndefined(from._tzm)) {
              to._tzm = from._tzm;
          }
          if (!isUndefined(from._isUTC)) {
              to._isUTC = from._isUTC;
          }
          if (!isUndefined(from._offset)) {
              to._offset = from._offset;
          }
          if (!isUndefined(from._pf)) {
              to._pf = getParsingFlags(from);
          }
          if (!isUndefined(from._locale)) {
              to._locale = from._locale;
          }
  
          if (momentPropertiesLen > 0) {
              for (i = 0; i < momentPropertiesLen; i++) {
                  prop = momentProperties[i];
                  val = from[prop];
                  if (!isUndefined(val)) {
                      to[prop] = val;
                  }
              }
          }
  
          return to;
      }
  
      // Moment prototype object
      function Moment(config) {
          copyConfig(this, config);
          this._d = new Date(config._d != null ? config._d.getTime() : NaN);
          if (!this.isValid()) {
              this._d = new Date(NaN);
          }
          // Prevent infinite loop in case updateOffset creates new moment
          // objects.
          if (updateInProgress === false) {
              updateInProgress = true;
              hooks.updateOffset(this);
              updateInProgress = false;
          }
      }
  
      function isMoment(obj) {
          return (
              obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
          );
      }
  
      function warn(msg) {
          if (
              hooks.suppressDeprecationWarnings === false &&
              typeof console !== 'undefined' &&
              console.warn
          ) {
              console.warn('Deprecation warning: ' + msg);
          }
      }
  
      function deprecate(msg, fn) {
          var firstTime = true;
  
          return extend(function () {
              if (hooks.deprecationHandler != null) {
                  hooks.deprecationHandler(null, msg);
              }
              if (firstTime) {
                  var args = [],
                      arg,
                      i,
                      key,
                      argLen = arguments.length;
                  for (i = 0; i < argLen; i++) {
                      arg = '';
                      if (typeof arguments[i] === 'object') {
                          arg += '\n[' + i + '] ';
                          for (key in arguments[0]) {
                              if (hasOwnProp(arguments[0], key)) {
                                  arg += key + ': ' + arguments[0][key] + ', ';
                              }
                          }
                          arg = arg.slice(0, -2); // Remove trailing comma and space
                      } else {
                          arg = arguments[i];
                      }
                      args.push(arg);
                  }
                  warn(
                      msg +
                          '\nArguments: ' +
                          Array.prototype.slice.call(args).join('') +
                          '\n' +
                          new Error().stack
                  );
                  firstTime = false;
              }
              return fn.apply(this, arguments);
          }, fn);
      }
  
      var deprecations = {};
  
      function deprecateSimple(name, msg) {
          if (hooks.deprecationHandler != null) {
              hooks.deprecationHandler(name, msg);
          }
          if (!deprecations[name]) {
              warn(msg);
              deprecations[name] = true;
          }
      }
  
      hooks.suppressDeprecationWarnings = false;
      hooks.deprecationHandler = null;
  
      function isFunction(input) {
          return (
              (typeof Function !== 'undefined' && input instanceof Function) ||
              Object.prototype.toString.call(input) === '[object Function]'
          );
      }
  
      function set(config) {
          var prop, i;
          for (i in config) {
              if (hasOwnProp(config, i)) {
                  prop = config[i];
                  if (isFunction(prop)) {
                      this[i] = prop;
                  } else {
                      this['_' + i] = prop;
                  }
              }
          }
          this._config = config;
          // Lenient ordinal parsing accepts just a number in addition to
          // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
          // TODO: Remove "ordinalParse" fallback in next major release.
          this._dayOfMonthOrdinalParseLenient = new RegExp(
              (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                  '|' +
                  /\d{1,2}/.source
          );
      }
  
      function mergeConfigs(parentConfig, childConfig) {
          var res = extend({}, parentConfig),
              prop;
          for (prop in childConfig) {
              if (hasOwnProp(childConfig, prop)) {
                  if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                      res[prop] = {};
                      extend(res[prop], parentConfig[prop]);
                      extend(res[prop], childConfig[prop]);
                  } else if (childConfig[prop] != null) {
                      res[prop] = childConfig[prop];
                  } else {
                      delete res[prop];
                  }
              }
          }
          for (prop in parentConfig) {
              if (
                  hasOwnProp(parentConfig, prop) &&
                  !hasOwnProp(childConfig, prop) &&
                  isObject(parentConfig[prop])
              ) {
                  // make sure changes to properties don't modify parent config
                  res[prop] = extend({}, res[prop]);
              }
          }
          return res;
      }
  
      function Locale(config) {
          if (config != null) {
              this.set(config);
          }
      }
  
      var keys;
  
      if (Object.keys) {
          keys = Object.keys;
      } else {
          keys = function (obj) {
              var i,
                  res = [];
              for (i in obj) {
                  if (hasOwnProp(obj, i)) {
                      res.push(i);
                  }
              }
              return res;
          };
      }
  
      var defaultCalendar = {
          sameDay: '[Today at] LT',
          nextDay: '[Tomorrow at] LT',
          nextWeek: 'dddd [at] LT',
          lastDay: '[Yesterday at] LT',
          lastWeek: '[Last] dddd [at] LT',
          sameElse: 'L',
      };
  
      function calendar(key, mom, now) {
          var output = this._calendar[key] || this._calendar['sameElse'];
          return isFunction(output) ? output.call(mom, now) : output;
      }
  
      function zeroFill(number, targetLength, forceSign) {
          var absNumber = '' + Math.abs(number),
              zerosToFill = targetLength - absNumber.length,
              sign = number >= 0;
          return (
              (sign ? (forceSign ? '+' : '') : '-') +
              Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
              absNumber
          );
      }
  
      var formattingTokens =
              /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
          localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
          formatFunctions = {},
          formatTokenFunctions = {};
  
      // token:    'M'
      // padded:   ['MM', 2]
      // ordinal:  'Mo'
      // callback: function () { this.month() + 1 }
      function addFormatToken(token, padded, ordinal, callback) {
          var func = callback;
          if (typeof callback === 'string') {
              func = function () {
                  return this[callback]();
              };
          }
          if (token) {
              formatTokenFunctions[token] = func;
          }
          if (padded) {
              formatTokenFunctions[padded[0]] = function () {
                  return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
              };
          }
          if (ordinal) {
              formatTokenFunctions[ordinal] = function () {
                  return this.localeData().ordinal(
                      func.apply(this, arguments),
                      token
                  );
              };
          }
      }
  
      function removeFormattingTokens(input) {
          if (input.match(/\[[\s\S]/)) {
              return input.replace(/^\[|\]$/g, '');
          }
          return input.replace(/\\/g, '');
      }
  
      function makeFormatFunction(format) {
          var array = format.match(formattingTokens),
              i,
              length;
  
          for (i = 0, length = array.length; i < length; i++) {
              if (formatTokenFunctions[array[i]]) {
                  array[i] = formatTokenFunctions[array[i]];
              } else {
                  array[i] = removeFormattingTokens(array[i]);
              }
          }
  
          return function (mom) {
              var output = '',
                  i;
              for (i = 0; i < length; i++) {
                  output += isFunction(array[i])
                      ? array[i].call(mom, format)
                      : array[i];
              }
              return output;
          };
      }
  
      // format date using native date object
      function formatMoment(m, format) {
          if (!m.isValid()) {
              return m.localeData().invalidDate();
          }
  
          format = expandFormat(format, m.localeData());
          formatFunctions[format] =
              formatFunctions[format] || makeFormatFunction(format);
  
          return formatFunctions[format](m);
      }
  
      function expandFormat(format, locale) {
          var i = 5;
  
          function replaceLongDateFormatTokens(input) {
              return locale.longDateFormat(input) || input;
          }
  
          localFormattingTokens.lastIndex = 0;
          while (i >= 0 && localFormattingTokens.test(format)) {
              format = format.replace(
                  localFormattingTokens,
                  replaceLongDateFormatTokens
              );
              localFormattingTokens.lastIndex = 0;
              i -= 1;
          }
  
          return format;
      }
  
      var defaultLongDateFormat = {
          LTS: 'h:mm:ss A',
          LT: 'h:mm A',
          L: 'MM/DD/YYYY',
          LL: 'MMMM D, YYYY',
          LLL: 'MMMM D, YYYY h:mm A',
          LLLL: 'dddd, MMMM D, YYYY h:mm A',
      };
  
      function longDateFormat(key) {
          var format = this._longDateFormat[key],
              formatUpper = this._longDateFormat[key.toUpperCase()];
  
          if (format || !formatUpper) {
              return format;
          }
  
          this._longDateFormat[key] = formatUpper
              .match(formattingTokens)
              .map(function (tok) {
                  if (
                      tok === 'MMMM' ||
                      tok === 'MM' ||
                      tok === 'DD' ||
                      tok === 'dddd'
                  ) {
                      return tok.slice(1);
                  }
                  return tok;
              })
              .join('');
  
          return this._longDateFormat[key];
      }
  
      var defaultInvalidDate = 'Invalid date';
  
      function invalidDate() {
          return this._invalidDate;
      }
  
      var defaultOrdinal = '%d',
          defaultDayOfMonthOrdinalParse = /\d{1,2}/;
  
      function ordinal(number) {
          return this._ordinal.replace('%d', number);
      }
  
      var defaultRelativeTime = {
          future: 'in %s',
          past: '%s ago',
          s: 'a few seconds',
          ss: '%d seconds',
          m: 'a minute',
          mm: '%d minutes',
          h: 'an hour',
          hh: '%d hours',
          d: 'a day',
          dd: '%d days',
          w: 'a week',
          ww: '%d weeks',
          M: 'a month',
          MM: '%d months',
          y: 'a year',
          yy: '%d years',
      };
  
      function relativeTime(number, withoutSuffix, string, isFuture) {
          var output = this._relativeTime[string];
          return isFunction(output)
              ? output(number, withoutSuffix, string, isFuture)
              : output.replace(/%d/i, number);
      }
  
      function pastFuture(diff, output) {
          var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
          return isFunction(format) ? format(output) : format.replace(/%s/i, output);
      }
  
      var aliases = {};
  
      function addUnitAlias(unit, shorthand) {
          var lowerCase = unit.toLowerCase();
          aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
      }
  
      function normalizeUnits(units) {
          return typeof units === 'string'
              ? aliases[units] || aliases[units.toLowerCase()]
              : undefined;
      }
  
      function normalizeObjectUnits(inputObject) {
          var normalizedInput = {},
              normalizedProp,
              prop;
  
          for (prop in inputObject) {
              if (hasOwnProp(inputObject, prop)) {
                  normalizedProp = normalizeUnits(prop);
                  if (normalizedProp) {
                      normalizedInput[normalizedProp] = inputObject[prop];
                  }
              }
          }
  
          return normalizedInput;
      }
  
      var priorities = {};
  
      function addUnitPriority(unit, priority) {
          priorities[unit] = priority;
      }
  
      function getPrioritizedUnits(unitsObj) {
          var units = [],
              u;
          for (u in unitsObj) {
              if (hasOwnProp(unitsObj, u)) {
                  units.push({ unit: u, priority: priorities[u] });
              }
          }
          units.sort(function (a, b) {
              return a.priority - b.priority;
          });
          return units;
      }
  
      function isLeapYear(year) {
          return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      }
  
      function absFloor(number) {
          if (number < 0) {
              // -0 -> 0
              return Math.ceil(number) || 0;
          } else {
              return Math.floor(number);
          }
      }
  
      function toInt(argumentForCoercion) {
          var coercedNumber = +argumentForCoercion,
              value = 0;
  
          if (coercedNumber !== 0 && isFinite(coercedNumber)) {
              value = absFloor(coercedNumber);
          }
  
          return value;
      }
  
      function makeGetSet(unit, keepTime) {
          return function (value) {
              if (value != null) {
                  set$1(this, unit, value);
                  hooks.updateOffset(this, keepTime);
                  return this;
              } else {
                  return get(this, unit);
              }
          };
      }
  
      function get(mom, unit) {
          return mom.isValid()
              ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
              : NaN;
      }
  
      function set$1(mom, unit, value) {
          if (mom.isValid() && !isNaN(value)) {
              if (
                  unit === 'FullYear' &&
                  isLeapYear(mom.year()) &&
                  mom.month() === 1 &&
                  mom.date() === 29
              ) {
                  value = toInt(value);
                  mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
                      value,
                      mom.month(),
                      daysInMonth(value, mom.month())
                  );
              } else {
                  mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
              }
          }
      }
  
      // MOMENTS
  
      function stringGet(units) {
          units = normalizeUnits(units);
          if (isFunction(this[units])) {
              return this[units]();
          }
          return this;
      }
  
      function stringSet(units, value) {
          if (typeof units === 'object') {
              units = normalizeObjectUnits(units);
              var prioritized = getPrioritizedUnits(units),
                  i,
                  prioritizedLen = prioritized.length;
              for (i = 0; i < prioritizedLen; i++) {
                  this[prioritized[i].unit](units[prioritized[i].unit]);
              }
          } else {
              units = normalizeUnits(units);
              if (isFunction(this[units])) {
                  return this[units](value);
              }
          }
          return this;
      }
  
      var match1 = /\d/, //       0 - 9
          match2 = /\d\d/, //      00 - 99
          match3 = /\d{3}/, //     000 - 999
          match4 = /\d{4}/, //    0000 - 9999
          match6 = /[+-]?\d{6}/, // -999999 - 999999
          match1to2 = /\d\d?/, //       0 - 99
          match3to4 = /\d\d\d\d?/, //     999 - 9999
          match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
          match1to3 = /\d{1,3}/, //       0 - 999
          match1to4 = /\d{1,4}/, //       0 - 9999
          match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
          matchUnsigned = /\d+/, //       0 - inf
          matchSigned = /[+-]?\d+/, //    -inf - inf
          matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
          matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
          matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
          // any word (or two) characters or numbers including two/three word month in arabic.
          // includes scottish gaelic two word and hyphenated months
          matchWord =
              /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
          regexes;
  
      regexes = {};
  
      function addRegexToken(token, regex, strictRegex) {
          regexes[token] = isFunction(regex)
              ? regex
              : function (isStrict, localeData) {
                    return isStrict && strictRegex ? strictRegex : regex;
                };
      }
  
      function getParseRegexForToken(token, config) {
          if (!hasOwnProp(regexes, token)) {
              return new RegExp(unescapeFormat(token));
          }
  
          return regexes[token](config._strict, config._locale);
      }
  
      // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
      function unescapeFormat(s) {
          return regexEscape(
              s
                  .replace('\\', '')
                  .replace(
                      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                      function (matched, p1, p2, p3, p4) {
                          return p1 || p2 || p3 || p4;
                      }
                  )
          );
      }
  
      function regexEscape(s) {
          return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      }
  
      var tokens = {};
  
      function addParseToken(token, callback) {
          var i,
              func = callback,
              tokenLen;
          if (typeof token === 'string') {
              token = [token];
          }
          if (isNumber(callback)) {
              func = function (input, array) {
                  array[callback] = toInt(input);
              };
          }
          tokenLen = token.length;
          for (i = 0; i < tokenLen; i++) {
              tokens[token[i]] = func;
          }
      }
  
      function addWeekParseToken(token, callback) {
          addParseToken(token, function (input, array, config, token) {
              config._w = config._w || {};
              callback(input, config._w, config, token);
          });
      }
  
      function addTimeToArrayFromToken(token, input, config) {
          if (input != null && hasOwnProp(tokens, token)) {
              tokens[token](input, config._a, config, token);
          }
      }
  
      var YEAR = 0,
          MONTH = 1,
          DATE = 2,
          HOUR = 3,
          MINUTE = 4,
          SECOND = 5,
          MILLISECOND = 6,
          WEEK = 7,
          WEEKDAY = 8;
  
      function mod(n, x) {
          return ((n % x) + x) % x;
      }
  
      var indexOf;
  
      if (Array.prototype.indexOf) {
          indexOf = Array.prototype.indexOf;
      } else {
          indexOf = function (o) {
              // I know
              var i;
              for (i = 0; i < this.length; ++i) {
                  if (this[i] === o) {
                      return i;
                  }
              }
              return -1;
          };
      }
  
      function daysInMonth(year, month) {
          if (isNaN(year) || isNaN(month)) {
              return NaN;
          }
          var modMonth = mod(month, 12);
          year += (month - modMonth) / 12;
          return modMonth === 1
              ? isLeapYear(year)
                  ? 29
                  : 28
              : 31 - ((modMonth % 7) % 2);
      }
  
      // FORMATTING
  
      addFormatToken('M', ['MM', 2], 'Mo', function () {
          return this.month() + 1;
      });
  
      addFormatToken('MMM', 0, 0, function (format) {
          return this.localeData().monthsShort(this, format);
      });
  
      addFormatToken('MMMM', 0, 0, function (format) {
          return this.localeData().months(this, format);
      });
  
      // ALIASES
  
      addUnitAlias('month', 'M');
  
      // PRIORITY
  
      addUnitPriority('month', 8);
  
      // PARSING
  
      addRegexToken('M', match1to2);
      addRegexToken('MM', match1to2, match2);
      addRegexToken('MMM', function (isStrict, locale) {
          return locale.monthsShortRegex(isStrict);
      });
      addRegexToken('MMMM', function (isStrict, locale) {
          return locale.monthsRegex(isStrict);
      });
  
      addParseToken(['M', 'MM'], function (input, array) {
          array[MONTH] = toInt(input) - 1;
      });
  
      addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
          var month = config._locale.monthsParse(input, token, config._strict);
          // if we didn't find a month name, mark the date as invalid.
          if (month != null) {
              array[MONTH] = month;
          } else {
              getParsingFlags(config).invalidMonth = input;
          }
      });
  
      // LOCALES
  
      var defaultLocaleMonths =
              'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                  '_'
              ),
          defaultLocaleMonthsShort =
              'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
          MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
          defaultMonthsShortRegex = matchWord,
          defaultMonthsRegex = matchWord;
  
      function localeMonths(m, format) {
          if (!m) {
              return isArray(this._months)
                  ? this._months
                  : this._months['standalone'];
          }
          return isArray(this._months)
              ? this._months[m.month()]
              : this._months[
                    (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                        ? 'format'
                        : 'standalone'
                ][m.month()];
      }
  
      function localeMonthsShort(m, format) {
          if (!m) {
              return isArray(this._monthsShort)
                  ? this._monthsShort
                  : this._monthsShort['standalone'];
          }
          return isArray(this._monthsShort)
              ? this._monthsShort[m.month()]
              : this._monthsShort[
                    MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
                ][m.month()];
      }
  
      function handleStrictParse(monthName, format, strict) {
          var i,
              ii,
              mom,
              llc = monthName.toLocaleLowerCase();
          if (!this._monthsParse) {
              // this is not used
              this._monthsParse = [];
              this._longMonthsParse = [];
              this._shortMonthsParse = [];
              for (i = 0; i < 12; ++i) {
                  mom = createUTC([2000, i]);
                  this._shortMonthsParse[i] = this.monthsShort(
                      mom,
                      ''
                  ).toLocaleLowerCase();
                  this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
              }
          }
  
          if (strict) {
              if (format === 'MMM') {
                  ii = indexOf.call(this._shortMonthsParse, llc);
                  return ii !== -1 ? ii : null;
              } else {
                  ii = indexOf.call(this._longMonthsParse, llc);
                  return ii !== -1 ? ii : null;
              }
          } else {
              if (format === 'MMM') {
                  ii = indexOf.call(this._shortMonthsParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._longMonthsParse, llc);
                  return ii !== -1 ? ii : null;
              } else {
                  ii = indexOf.call(this._longMonthsParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._shortMonthsParse, llc);
                  return ii !== -1 ? ii : null;
              }
          }
      }
  
      function localeMonthsParse(monthName, format, strict) {
          var i, mom, regex;
  
          if (this._monthsParseExact) {
              return handleStrictParse.call(this, monthName, format, strict);
          }
  
          if (!this._monthsParse) {
              this._monthsParse = [];
              this._longMonthsParse = [];
              this._shortMonthsParse = [];
          }
  
          // TODO: add sorting
          // Sorting makes sure if one month (or abbr) is a prefix of another
          // see sorting in computeMonthsParse
          for (i = 0; i < 12; i++) {
              // make the regex if we don't have it already
              mom = createUTC([2000, i]);
              if (strict && !this._longMonthsParse[i]) {
                  this._longMonthsParse[i] = new RegExp(
                      '^' + this.months(mom, '').replace('.', '') + '$',
                      'i'
                  );
                  this._shortMonthsParse[i] = new RegExp(
                      '^' + this.monthsShort(mom, '').replace('.', '') + '$',
                      'i'
                  );
              }
              if (!strict && !this._monthsParse[i]) {
                  regex =
                      '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                  this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
              }
              // test the regex
              if (
                  strict &&
                  format === 'MMMM' &&
                  this._longMonthsParse[i].test(monthName)
              ) {
                  return i;
              } else if (
                  strict &&
                  format === 'MMM' &&
                  this._shortMonthsParse[i].test(monthName)
              ) {
                  return i;
              } else if (!strict && this._monthsParse[i].test(monthName)) {
                  return i;
              }
          }
      }
  
      // MOMENTS
  
      function setMonth(mom, value) {
          var dayOfMonth;
  
          if (!mom.isValid()) {
              // No op
              return mom;
          }
  
          if (typeof value === 'string') {
              if (/^\d+$/.test(value)) {
                  value = toInt(value);
              } else {
                  value = mom.localeData().monthsParse(value);
                  // TODO: Another silent failure?
                  if (!isNumber(value)) {
                      return mom;
                  }
              }
          }
  
          dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
          mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
          return mom;
      }
  
      function getSetMonth(value) {
          if (value != null) {
              setMonth(this, value);
              hooks.updateOffset(this, true);
              return this;
          } else {
              return get(this, 'Month');
          }
      }
  
      function getDaysInMonth() {
          return daysInMonth(this.year(), this.month());
      }
  
      function monthsShortRegex(isStrict) {
          if (this._monthsParseExact) {
              if (!hasOwnProp(this, '_monthsRegex')) {
                  computeMonthsParse.call(this);
              }
              if (isStrict) {
                  return this._monthsShortStrictRegex;
              } else {
                  return this._monthsShortRegex;
              }
          } else {
              if (!hasOwnProp(this, '_monthsShortRegex')) {
                  this._monthsShortRegex = defaultMonthsShortRegex;
              }
              return this._monthsShortStrictRegex && isStrict
                  ? this._monthsShortStrictRegex
                  : this._monthsShortRegex;
          }
      }
  
      function monthsRegex(isStrict) {
          if (this._monthsParseExact) {
              if (!hasOwnProp(this, '_monthsRegex')) {
                  computeMonthsParse.call(this);
              }
              if (isStrict) {
                  return this._monthsStrictRegex;
              } else {
                  return this._monthsRegex;
              }
          } else {
              if (!hasOwnProp(this, '_monthsRegex')) {
                  this._monthsRegex = defaultMonthsRegex;
              }
              return this._monthsStrictRegex && isStrict
                  ? this._monthsStrictRegex
                  : this._monthsRegex;
          }
      }
  
      function computeMonthsParse() {
          function cmpLenRev(a, b) {
              return b.length - a.length;
          }
  
          var shortPieces = [],
              longPieces = [],
              mixedPieces = [],
              i,
              mom;
          for (i = 0; i < 12; i++) {
              // make the regex if we don't have it already
              mom = createUTC([2000, i]);
              shortPieces.push(this.monthsShort(mom, ''));
              longPieces.push(this.months(mom, ''));
              mixedPieces.push(this.months(mom, ''));
              mixedPieces.push(this.monthsShort(mom, ''));
          }
          // Sorting makes sure if one month (or abbr) is a prefix of another it
          // will match the longer piece.
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);
          for (i = 0; i < 12; i++) {
              shortPieces[i] = regexEscape(shortPieces[i]);
              longPieces[i] = regexEscape(longPieces[i]);
          }
          for (i = 0; i < 24; i++) {
              mixedPieces[i] = regexEscape(mixedPieces[i]);
          }
  
          this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
          this._monthsShortRegex = this._monthsRegex;
          this._monthsStrictRegex = new RegExp(
              '^(' + longPieces.join('|') + ')',
              'i'
          );
          this._monthsShortStrictRegex = new RegExp(
              '^(' + shortPieces.join('|') + ')',
              'i'
          );
      }
  
      // FORMATTING
  
      addFormatToken('Y', 0, 0, function () {
          var y = this.year();
          return y <= 9999 ? zeroFill(y, 4) : '+' + y;
      });
  
      addFormatToken(0, ['YY', 2], 0, function () {
          return this.year() % 100;
      });
  
      addFormatToken(0, ['YYYY', 4], 0, 'year');
      addFormatToken(0, ['YYYYY', 5], 0, 'year');
      addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');
  
      // ALIASES
  
      addUnitAlias('year', 'y');
  
      // PRIORITIES
  
      addUnitPriority('year', 1);
  
      // PARSING
  
      addRegexToken('Y', matchSigned);
      addRegexToken('YY', match1to2, match2);
      addRegexToken('YYYY', match1to4, match4);
      addRegexToken('YYYYY', match1to6, match6);
      addRegexToken('YYYYYY', match1to6, match6);
  
      addParseToken(['YYYYY', 'YYYYYY'], YEAR);
      addParseToken('YYYY', function (input, array) {
          array[YEAR] =
              input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
      });
      addParseToken('YY', function (input, array) {
          array[YEAR] = hooks.parseTwoDigitYear(input);
      });
      addParseToken('Y', function (input, array) {
          array[YEAR] = parseInt(input, 10);
      });
  
      // HELPERS
  
      function daysInYear(year) {
          return isLeapYear(year) ? 366 : 365;
      }
  
      // HOOKS
  
      hooks.parseTwoDigitYear = function (input) {
          return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
      };
  
      // MOMENTS
  
      var getSetYear = makeGetSet('FullYear', true);
  
      function getIsLeapYear() {
          return isLeapYear(this.year());
      }
  
      function createDate(y, m, d, h, M, s, ms) {
          // can't just apply() to create a date:
          // https://stackoverflow.com/q/181348
          var date;
          // the date constructor remaps years 0-99 to 1900-1999
          if (y < 100 && y >= 0) {
              // preserve leap years using a full 400 year cycle, then reset
              date = new Date(y + 400, m, d, h, M, s, ms);
              if (isFinite(date.getFullYear())) {
                  date.setFullYear(y);
              }
          } else {
              date = new Date(y, m, d, h, M, s, ms);
          }
  
          return date;
      }
  
      function createUTCDate(y) {
          var date, args;
          // the Date.UTC function remaps years 0-99 to 1900-1999
          if (y < 100 && y >= 0) {
              args = Array.prototype.slice.call(arguments);
              // preserve leap years using a full 400 year cycle, then reset
              args[0] = y + 400;
              date = new Date(Date.UTC.apply(null, args));
              if (isFinite(date.getUTCFullYear())) {
                  date.setUTCFullYear(y);
              }
          } else {
              date = new Date(Date.UTC.apply(null, arguments));
          }
  
          return date;
      }
  
      // start-of-first-week - start-of-year
      function firstWeekOffset(year, dow, doy) {
          var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
              fwd = 7 + dow - doy,
              // first-week day local weekday -- which local weekday is fwd
              fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
  
          return -fwdlw + fwd - 1;
      }
  
      // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
      function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
          var localWeekday = (7 + weekday - dow) % 7,
              weekOffset = firstWeekOffset(year, dow, doy),
              dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
              resYear,
              resDayOfYear;
  
          if (dayOfYear <= 0) {
              resYear = year - 1;
              resDayOfYear = daysInYear(resYear) + dayOfYear;
          } else if (dayOfYear > daysInYear(year)) {
              resYear = year + 1;
              resDayOfYear = dayOfYear - daysInYear(year);
          } else {
              resYear = year;
              resDayOfYear = dayOfYear;
          }
  
          return {
              year: resYear,
              dayOfYear: resDayOfYear,
          };
      }
  
      function weekOfYear(mom, dow, doy) {
          var weekOffset = firstWeekOffset(mom.year(), dow, doy),
              week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
              resWeek,
              resYear;
  
          if (week < 1) {
              resYear = mom.year() - 1;
              resWeek = week + weeksInYear(resYear, dow, doy);
          } else if (week > weeksInYear(mom.year(), dow, doy)) {
              resWeek = week - weeksInYear(mom.year(), dow, doy);
              resYear = mom.year() + 1;
          } else {
              resYear = mom.year();
              resWeek = week;
          }
  
          return {
              week: resWeek,
              year: resYear,
          };
      }
  
      function weeksInYear(year, dow, doy) {
          var weekOffset = firstWeekOffset(year, dow, doy),
              weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
          return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
      }
  
      // FORMATTING
  
      addFormatToken('w', ['ww', 2], 'wo', 'week');
      addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');
  
      // ALIASES
  
      addUnitAlias('week', 'w');
      addUnitAlias('isoWeek', 'W');
  
      // PRIORITIES
  
      addUnitPriority('week', 5);
      addUnitPriority('isoWeek', 5);
  
      // PARSING
  
      addRegexToken('w', match1to2);
      addRegexToken('ww', match1to2, match2);
      addRegexToken('W', match1to2);
      addRegexToken('WW', match1to2, match2);
  
      addWeekParseToken(
          ['w', 'ww', 'W', 'WW'],
          function (input, week, config, token) {
              week[token.substr(0, 1)] = toInt(input);
          }
      );
  
      // HELPERS
  
      // LOCALES
  
      function localeWeek(mom) {
          return weekOfYear(mom, this._week.dow, this._week.doy).week;
      }
  
      var defaultLocaleWeek = {
          dow: 0, // Sunday is the first day of the week.
          doy: 6, // The week that contains Jan 6th is the first week of the year.
      };
  
      function localeFirstDayOfWeek() {
          return this._week.dow;
      }
  
      function localeFirstDayOfYear() {
          return this._week.doy;
      }
  
      // MOMENTS
  
      function getSetWeek(input) {
          var week = this.localeData().week(this);
          return input == null ? week : this.add((input - week) * 7, 'd');
      }
  
      function getSetISOWeek(input) {
          var week = weekOfYear(this, 1, 4).week;
          return input == null ? week : this.add((input - week) * 7, 'd');
      }
  
      // FORMATTING
  
      addFormatToken('d', 0, 'do', 'day');
  
      addFormatToken('dd', 0, 0, function (format) {
          return this.localeData().weekdaysMin(this, format);
      });
  
      addFormatToken('ddd', 0, 0, function (format) {
          return this.localeData().weekdaysShort(this, format);
      });
  
      addFormatToken('dddd', 0, 0, function (format) {
          return this.localeData().weekdays(this, format);
      });
  
      addFormatToken('e', 0, 0, 'weekday');
      addFormatToken('E', 0, 0, 'isoWeekday');
  
      // ALIASES
  
      addUnitAlias('day', 'd');
      addUnitAlias('weekday', 'e');
      addUnitAlias('isoWeekday', 'E');
  
      // PRIORITY
      addUnitPriority('day', 11);
      addUnitPriority('weekday', 11);
      addUnitPriority('isoWeekday', 11);
  
      // PARSING
  
      addRegexToken('d', match1to2);
      addRegexToken('e', match1to2);
      addRegexToken('E', match1to2);
      addRegexToken('dd', function (isStrict, locale) {
          return locale.weekdaysMinRegex(isStrict);
      });
      addRegexToken('ddd', function (isStrict, locale) {
          return locale.weekdaysShortRegex(isStrict);
      });
      addRegexToken('dddd', function (isStrict, locale) {
          return locale.weekdaysRegex(isStrict);
      });
  
      addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
          var weekday = config._locale.weekdaysParse(input, token, config._strict);
          // if we didn't get a weekday name, mark the date as invalid
          if (weekday != null) {
              week.d = weekday;
          } else {
              getParsingFlags(config).invalidWeekday = input;
          }
      });
  
      addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
          week[token] = toInt(input);
      });
  
      // HELPERS
  
      function parseWeekday(input, locale) {
          if (typeof input !== 'string') {
              return input;
          }
  
          if (!isNaN(input)) {
              return parseInt(input, 10);
          }
  
          input = locale.weekdaysParse(input);
          if (typeof input === 'number') {
              return input;
          }
  
          return null;
      }
  
      function parseIsoWeekday(input, locale) {
          if (typeof input === 'string') {
              return locale.weekdaysParse(input) % 7 || 7;
          }
          return isNaN(input) ? null : input;
      }
  
      // LOCALES
      function shiftWeekdays(ws, n) {
          return ws.slice(n, 7).concat(ws.slice(0, n));
      }
  
      var defaultLocaleWeekdays =
              'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
          defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
          defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
          defaultWeekdaysRegex = matchWord,
          defaultWeekdaysShortRegex = matchWord,
          defaultWeekdaysMinRegex = matchWord;
  
      function localeWeekdays(m, format) {
          var weekdays = isArray(this._weekdays)
              ? this._weekdays
              : this._weekdays[
                    m && m !== true && this._weekdays.isFormat.test(format)
                        ? 'format'
                        : 'standalone'
                ];
          return m === true
              ? shiftWeekdays(weekdays, this._week.dow)
              : m
              ? weekdays[m.day()]
              : weekdays;
      }
  
      function localeWeekdaysShort(m) {
          return m === true
              ? shiftWeekdays(this._weekdaysShort, this._week.dow)
              : m
              ? this._weekdaysShort[m.day()]
              : this._weekdaysShort;
      }
  
      function localeWeekdaysMin(m) {
          return m === true
              ? shiftWeekdays(this._weekdaysMin, this._week.dow)
              : m
              ? this._weekdaysMin[m.day()]
              : this._weekdaysMin;
      }
  
      function handleStrictParse$1(weekdayName, format, strict) {
          var i,
              ii,
              mom,
              llc = weekdayName.toLocaleLowerCase();
          if (!this._weekdaysParse) {
              this._weekdaysParse = [];
              this._shortWeekdaysParse = [];
              this._minWeekdaysParse = [];
  
              for (i = 0; i < 7; ++i) {
                  mom = createUTC([2000, 1]).day(i);
                  this._minWeekdaysParse[i] = this.weekdaysMin(
                      mom,
                      ''
                  ).toLocaleLowerCase();
                  this._shortWeekdaysParse[i] = this.weekdaysShort(
                      mom,
                      ''
                  ).toLocaleLowerCase();
                  this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
              }
          }
  
          if (strict) {
              if (format === 'dddd') {
                  ii = indexOf.call(this._weekdaysParse, llc);
                  return ii !== -1 ? ii : null;
              } else if (format === 'ddd') {
                  ii = indexOf.call(this._shortWeekdaysParse, llc);
                  return ii !== -1 ? ii : null;
              } else {
                  ii = indexOf.call(this._minWeekdaysParse, llc);
                  return ii !== -1 ? ii : null;
              }
          } else {
              if (format === 'dddd') {
                  ii = indexOf.call(this._weekdaysParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._shortWeekdaysParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._minWeekdaysParse, llc);
                  return ii !== -1 ? ii : null;
              } else if (format === 'ddd') {
                  ii = indexOf.call(this._shortWeekdaysParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._weekdaysParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._minWeekdaysParse, llc);
                  return ii !== -1 ? ii : null;
              } else {
                  ii = indexOf.call(this._minWeekdaysParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._weekdaysParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._shortWeekdaysParse, llc);
                  return ii !== -1 ? ii : null;
              }
          }
      }
  
      function localeWeekdaysParse(weekdayName, format, strict) {
          var i, mom, regex;
  
          if (this._weekdaysParseExact) {
              return handleStrictParse$1.call(this, weekdayName, format, strict);
          }
  
          if (!this._weekdaysParse) {
              this._weekdaysParse = [];
              this._minWeekdaysParse = [];
              this._shortWeekdaysParse = [];
              this._fullWeekdaysParse = [];
          }
  
          for (i = 0; i < 7; i++) {
              // make the regex if we don't have it already
  
              mom = createUTC([2000, 1]).day(i);
              if (strict && !this._fullWeekdaysParse[i]) {
                  this._fullWeekdaysParse[i] = new RegExp(
                      '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
                      'i'
                  );
                  this._shortWeekdaysParse[i] = new RegExp(
                      '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
                      'i'
                  );
                  this._minWeekdaysParse[i] = new RegExp(
                      '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
                      'i'
                  );
              }
              if (!this._weekdaysParse[i]) {
                  regex =
                      '^' +
                      this.weekdays(mom, '') +
                      '|^' +
                      this.weekdaysShort(mom, '') +
                      '|^' +
                      this.weekdaysMin(mom, '');
                  this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
              }
              // test the regex
              if (
                  strict &&
                  format === 'dddd' &&
                  this._fullWeekdaysParse[i].test(weekdayName)
              ) {
                  return i;
              } else if (
                  strict &&
                  format === 'ddd' &&
                  this._shortWeekdaysParse[i].test(weekdayName)
              ) {
                  return i;
              } else if (
                  strict &&
                  format === 'dd' &&
                  this._minWeekdaysParse[i].test(weekdayName)
              ) {
                  return i;
              } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                  return i;
              }
          }
      }
  
      // MOMENTS
  
      function getSetDayOfWeek(input) {
          if (!this.isValid()) {
              return input != null ? this : NaN;
          }
          var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
          if (input != null) {
              input = parseWeekday(input, this.localeData());
              return this.add(input - day, 'd');
          } else {
              return day;
          }
      }
  
      function getSetLocaleDayOfWeek(input) {
          if (!this.isValid()) {
              return input != null ? this : NaN;
          }
          var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
          return input == null ? weekday : this.add(input - weekday, 'd');
      }
  
      function getSetISODayOfWeek(input) {
          if (!this.isValid()) {
              return input != null ? this : NaN;
          }
  
          // behaves the same as moment#day except
          // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
          // as a setter, sunday should belong to the previous week.
  
          if (input != null) {
              var weekday = parseIsoWeekday(input, this.localeData());
              return this.day(this.day() % 7 ? weekday : weekday - 7);
          } else {
              return this.day() || 7;
          }
      }
  
      function weekdaysRegex(isStrict) {
          if (this._weekdaysParseExact) {
              if (!hasOwnProp(this, '_weekdaysRegex')) {
                  computeWeekdaysParse.call(this);
              }
              if (isStrict) {
                  return this._weekdaysStrictRegex;
              } else {
                  return this._weekdaysRegex;
              }
          } else {
              if (!hasOwnProp(this, '_weekdaysRegex')) {
                  this._weekdaysRegex = defaultWeekdaysRegex;
              }
              return this._weekdaysStrictRegex && isStrict
                  ? this._weekdaysStrictRegex
                  : this._weekdaysRegex;
          }
      }
  
      function weekdaysShortRegex(isStrict) {
          if (this._weekdaysParseExact) {
              if (!hasOwnProp(this, '_weekdaysRegex')) {
                  computeWeekdaysParse.call(this);
              }
              if (isStrict) {
                  return this._weekdaysShortStrictRegex;
              } else {
                  return this._weekdaysShortRegex;
              }
          } else {
              if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                  this._weekdaysShortRegex = defaultWeekdaysShortRegex;
              }
              return this._weekdaysShortStrictRegex && isStrict
                  ? this._weekdaysShortStrictRegex
                  : this._weekdaysShortRegex;
          }
      }
  
      function weekdaysMinRegex(isStrict) {
          if (this._weekdaysParseExact) {
              if (!hasOwnProp(this, '_weekdaysRegex')) {
                  computeWeekdaysParse.call(this);
              }
              if (isStrict) {
                  return this._weekdaysMinStrictRegex;
              } else {
                  return this._weekdaysMinRegex;
              }
          } else {
              if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                  this._weekdaysMinRegex = defaultWeekdaysMinRegex;
              }
              return this._weekdaysMinStrictRegex && isStrict
                  ? this._weekdaysMinStrictRegex
                  : this._weekdaysMinRegex;
          }
      }
  
      function computeWeekdaysParse() {
          function cmpLenRev(a, b) {
              return b.length - a.length;
          }
  
          var minPieces = [],
              shortPieces = [],
              longPieces = [],
              mixedPieces = [],
              i,
              mom,
              minp,
              shortp,
              longp;
          for (i = 0; i < 7; i++) {
              // make the regex if we don't have it already
              mom = createUTC([2000, 1]).day(i);
              minp = regexEscape(this.weekdaysMin(mom, ''));
              shortp = regexEscape(this.weekdaysShort(mom, ''));
              longp = regexEscape(this.weekdays(mom, ''));
              minPieces.push(minp);
              shortPieces.push(shortp);
              longPieces.push(longp);
              mixedPieces.push(minp);
              mixedPieces.push(shortp);
              mixedPieces.push(longp);
          }
          // Sorting makes sure if one weekday (or abbr) is a prefix of another it
          // will match the longer piece.
          minPieces.sort(cmpLenRev);
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);
  
          this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
          this._weekdaysShortRegex = this._weekdaysRegex;
          this._weekdaysMinRegex = this._weekdaysRegex;
  
          this._weekdaysStrictRegex = new RegExp(
              '^(' + longPieces.join('|') + ')',
              'i'
          );
          this._weekdaysShortStrictRegex = new RegExp(
              '^(' + shortPieces.join('|') + ')',
              'i'
          );
          this._weekdaysMinStrictRegex = new RegExp(
              '^(' + minPieces.join('|') + ')',
              'i'
          );
      }
  
      // FORMATTING
  
      function hFormat() {
          return this.hours() % 12 || 12;
      }
  
      function kFormat() {
          return this.hours() || 24;
      }
  
      addFormatToken('H', ['HH', 2], 0, 'hour');
      addFormatToken('h', ['hh', 2], 0, hFormat);
      addFormatToken('k', ['kk', 2], 0, kFormat);
  
      addFormatToken('hmm', 0, 0, function () {
          return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
      });
  
      addFormatToken('hmmss', 0, 0, function () {
          return (
              '' +
              hFormat.apply(this) +
              zeroFill(this.minutes(), 2) +
              zeroFill(this.seconds(), 2)
          );
      });
  
      addFormatToken('Hmm', 0, 0, function () {
          return '' + this.hours() + zeroFill(this.minutes(), 2);
      });
  
      addFormatToken('Hmmss', 0, 0, function () {
          return (
              '' +
              this.hours() +
              zeroFill(this.minutes(), 2) +
              zeroFill(this.seconds(), 2)
          );
      });
  
      function meridiem(token, lowercase) {
          addFormatToken(token, 0, 0, function () {
              return this.localeData().meridiem(
                  this.hours(),
                  this.minutes(),
                  lowercase
              );
          });
      }
  
      meridiem('a', true);
      meridiem('A', false);
  
      // ALIASES
  
      addUnitAlias('hour', 'h');
  
      // PRIORITY
      addUnitPriority('hour', 13);
  
      // PARSING
  
      function matchMeridiem(isStrict, locale) {
          return locale._meridiemParse;
      }
  
      addRegexToken('a', matchMeridiem);
      addRegexToken('A', matchMeridiem);
      addRegexToken('H', match1to2);
      addRegexToken('h', match1to2);
      addRegexToken('k', match1to2);
      addRegexToken('HH', match1to2, match2);
      addRegexToken('hh', match1to2, match2);
      addRegexToken('kk', match1to2, match2);
  
      addRegexToken('hmm', match3to4);
      addRegexToken('hmmss', match5to6);
      addRegexToken('Hmm', match3to4);
      addRegexToken('Hmmss', match5to6);
  
      addParseToken(['H', 'HH'], HOUR);
      addParseToken(['k', 'kk'], function (input, array, config) {
          var kInput = toInt(input);
          array[HOUR] = kInput === 24 ? 0 : kInput;
      });
      addParseToken(['a', 'A'], function (input, array, config) {
          config._isPm = config._locale.isPM(input);
          config._meridiem = input;
      });
      addParseToken(['h', 'hh'], function (input, array, config) {
          array[HOUR] = toInt(input);
          getParsingFlags(config).bigHour = true;
      });
      addParseToken('hmm', function (input, array, config) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
          getParsingFlags(config).bigHour = true;
      });
      addParseToken('hmmss', function (input, array, config) {
          var pos1 = input.length - 4,
              pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
          getParsingFlags(config).bigHour = true;
      });
      addParseToken('Hmm', function (input, array, config) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
      });
      addParseToken('Hmmss', function (input, array, config) {
          var pos1 = input.length - 4,
              pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
      });
  
      // LOCALES
  
      function localeIsPM(input) {
          // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
          // Using charAt should be more compatible.
          return (input + '').toLowerCase().charAt(0) === 'p';
      }
  
      var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
          // Setting the hour should keep the time, because the user explicitly
          // specified which hour they want. So trying to maintain the same hour (in
          // a new timezone) makes sense. Adding/subtracting hours does not follow
          // this rule.
          getSetHour = makeGetSet('Hours', true);
  
      function localeMeridiem(hours, minutes, isLower) {
          if (hours > 11) {
              return isLower ? 'pm' : 'PM';
          } else {
              return isLower ? 'am' : 'AM';
          }
      }
  
      var baseConfig = {
          calendar: defaultCalendar,
          longDateFormat: defaultLongDateFormat,
          invalidDate: defaultInvalidDate,
          ordinal: defaultOrdinal,
          dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
          relativeTime: defaultRelativeTime,
  
          months: defaultLocaleMonths,
          monthsShort: defaultLocaleMonthsShort,
  
          week: defaultLocaleWeek,
  
          weekdays: defaultLocaleWeekdays,
          weekdaysMin: defaultLocaleWeekdaysMin,
          weekdaysShort: defaultLocaleWeekdaysShort,
  
          meridiemParse: defaultLocaleMeridiemParse,
      };
  
      // internal storage for locale config files
      var locales = {},
          localeFamilies = {},
          globalLocale;
  
      function commonPrefix(arr1, arr2) {
          var i,
              minl = Math.min(arr1.length, arr2.length);
          for (i = 0; i < minl; i += 1) {
              if (arr1[i] !== arr2[i]) {
                  return i;
              }
          }
          return minl;
      }
  
      function normalizeLocale(key) {
          return key ? key.toLowerCase().replace('_', '-') : key;
      }
  
      // pick the locale from the array
      // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
      // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
      function chooseLocale(names) {
          var i = 0,
              j,
              next,
              locale,
              split;
  
          while (i < names.length) {
              split = normalizeLocale(names[i]).split('-');
              j = split.length;
              next = normalizeLocale(names[i + 1]);
              next = next ? next.split('-') : null;
              while (j > 0) {
                  locale = loadLocale(split.slice(0, j).join('-'));
                  if (locale) {
                      return locale;
                  }
                  if (
                      next &&
                      next.length >= j &&
                      commonPrefix(split, next) >= j - 1
                  ) {
                      //the next array item is better than a shallower substring of this one
                      break;
                  }
                  j--;
              }
              i++;
          }
          return globalLocale;
      }
  
      function isLocaleNameSane(name) {
          // Prevent names that look like filesystem paths, i.e contain '/' or '\'
          return name.match('^[^/\\\\]*$') != null;
      }
  
      function loadLocale(name) {
          var oldLocale = null,
              aliasedRequire;
          // TODO: Find a better way to register and load all the locales in Node
          if (
              locales[name] === undefined &&
              typeof module !== 'undefined' &&
              module &&
              module.exports &&
              isLocaleNameSane(name)
          ) {
              try {
                  oldLocale = globalLocale._abbr;
                  aliasedRequire = require;
                  aliasedRequire('./locale/' + name);
                  getSetGlobalLocale(oldLocale);
              } catch (e) {
                  // mark as not found to avoid repeating expensive file require call causing high CPU
                  // when trying to find en-US, en_US, en-us for every format call
                  locales[name] = null; // null means not found
              }
          }
          return locales[name];
      }
  
      // This function will load locale and then set the global locale.  If
      // no arguments are passed in, it will simply return the current global
      // locale key.
      function getSetGlobalLocale(key, values) {
          var data;
          if (key) {
              if (isUndefined(values)) {
                  data = getLocale(key);
              } else {
                  data = defineLocale(key, values);
              }
  
              if (data) {
                  // moment.duration._locale = moment._locale = data;
                  globalLocale = data;
              } else {
                  if (typeof console !== 'undefined' && console.warn) {
                      //warn user if arguments are passed but the locale could not be set
                      console.warn(
                          'Locale ' + key + ' not found. Did you forget to load it?'
                      );
                  }
              }
          }
  
          return globalLocale._abbr;
      }
  
      function defineLocale(name, config) {
          if (config !== null) {
              var locale,
                  parentConfig = baseConfig;
              config.abbr = name;
              if (locales[name] != null) {
                  deprecateSimple(
                      'defineLocaleOverride',
                      'use moment.updateLocale(localeName, config) to change ' +
                          'an existing locale. moment.defineLocale(localeName, ' +
                          'config) should only be used for creating a new locale ' +
                          'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
                  );
                  parentConfig = locales[name]._config;
              } else if (config.parentLocale != null) {
                  if (locales[config.parentLocale] != null) {
                      parentConfig = locales[config.parentLocale]._config;
                  } else {
                      locale = loadLocale(config.parentLocale);
                      if (locale != null) {
                          parentConfig = locale._config;
                      } else {
                          if (!localeFamilies[config.parentLocale]) {
                              localeFamilies[config.parentLocale] = [];
                          }
                          localeFamilies[config.parentLocale].push({
                              name: name,
                              config: config,
                          });
                          return null;
                      }
                  }
              }
              locales[name] = new Locale(mergeConfigs(parentConfig, config));
  
              if (localeFamilies[name]) {
                  localeFamilies[name].forEach(function (x) {
                      defineLocale(x.name, x.config);
                  });
              }
  
              // backwards compat for now: also set the locale
              // make sure we set the locale AFTER all child locales have been
              // created, so we won't end up with the child locale set.
              getSetGlobalLocale(name);
  
              return locales[name];
          } else {
              // useful for testing
              delete locales[name];
              return null;
          }
      }
  
      function updateLocale(name, config) {
          if (config != null) {
              var locale,
                  tmpLocale,
                  parentConfig = baseConfig;
  
              if (locales[name] != null && locales[name].parentLocale != null) {
                  // Update existing child locale in-place to avoid memory-leaks
                  locales[name].set(mergeConfigs(locales[name]._config, config));
              } else {
                  // MERGE
                  tmpLocale = loadLocale(name);
                  if (tmpLocale != null) {
                      parentConfig = tmpLocale._config;
                  }
                  config = mergeConfigs(parentConfig, config);
                  if (tmpLocale == null) {
                      // updateLocale is called for creating a new locale
                      // Set abbr so it will have a name (getters return
                      // undefined otherwise).
                      config.abbr = name;
                  }
                  locale = new Locale(config);
                  locale.parentLocale = locales[name];
                  locales[name] = locale;
              }
  
              // backwards compat for now: also set the locale
              getSetGlobalLocale(name);
          } else {
              // pass null for config to unupdate, useful for tests
              if (locales[name] != null) {
                  if (locales[name].parentLocale != null) {
                      locales[name] = locales[name].parentLocale;
                      if (name === getSetGlobalLocale()) {
                          getSetGlobalLocale(name);
                      }
                  } else if (locales[name] != null) {
                      delete locales[name];
                  }
              }
          }
          return locales[name];
      }
  
      // returns locale data
      function getLocale(key) {
          var locale;
  
          if (key && key._locale && key._locale._abbr) {
              key = key._locale._abbr;
          }
  
          if (!key) {
              return globalLocale;
          }
  
          if (!isArray(key)) {
              //short-circuit everything else
              locale = loadLocale(key);
              if (locale) {
                  return locale;
              }
              key = [key];
          }
  
          return chooseLocale(key);
      }
  
      function listLocales() {
          return keys(locales);
      }
  
      function checkOverflow(m) {
          var overflow,
              a = m._a;
  
          if (a && getParsingFlags(m).overflow === -2) {
              overflow =
                  a[MONTH] < 0 || a[MONTH] > 11
                      ? MONTH
                      : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                      ? DATE
                      : a[HOUR] < 0 ||
                        a[HOUR] > 24 ||
                        (a[HOUR] === 24 &&
                            (a[MINUTE] !== 0 ||
                                a[SECOND] !== 0 ||
                                a[MILLISECOND] !== 0))
                      ? HOUR
                      : a[MINUTE] < 0 || a[MINUTE] > 59
                      ? MINUTE
                      : a[SECOND] < 0 || a[SECOND] > 59
                      ? SECOND
                      : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                      ? MILLISECOND
                      : -1;
  
              if (
                  getParsingFlags(m)._overflowDayOfYear &&
                  (overflow < YEAR || overflow > DATE)
              ) {
                  overflow = DATE;
              }
              if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                  overflow = WEEK;
              }
              if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                  overflow = WEEKDAY;
              }
  
              getParsingFlags(m).overflow = overflow;
          }
  
          return m;
      }
  
      // iso 8601 regex
      // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
      var extendedIsoRegex =
              /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
          basicIsoRegex =
              /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
          tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
          isoDates = [
              ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
              ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
              ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
              ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
              ['YYYY-DDD', /\d{4}-\d{3}/],
              ['YYYY-MM', /\d{4}-\d\d/, false],
              ['YYYYYYMMDD', /[+-]\d{10}/],
              ['YYYYMMDD', /\d{8}/],
              ['GGGG[W]WWE', /\d{4}W\d{3}/],
              ['GGGG[W]WW', /\d{4}W\d{2}/, false],
              ['YYYYDDD', /\d{7}/],
              ['YYYYMM', /\d{6}/, false],
              ['YYYY', /\d{4}/, false],
          ],
          // iso time formats and regexes
          isoTimes = [
              ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
              ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
              ['HH:mm:ss', /\d\d:\d\d:\d\d/],
              ['HH:mm', /\d\d:\d\d/],
              ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
              ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
              ['HHmmss', /\d\d\d\d\d\d/],
              ['HHmm', /\d\d\d\d/],
              ['HH', /\d\d/],
          ],
          aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
          // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
          rfc2822 =
              /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
          obsOffsets = {
              UT: 0,
              GMT: 0,
              EDT: -4 * 60,
              EST: -5 * 60,
              CDT: -5 * 60,
              CST: -6 * 60,
              MDT: -6 * 60,
              MST: -7 * 60,
              PDT: -7 * 60,
              PST: -8 * 60,
          };
  
      // date from iso format
      function configFromISO(config) {
          var i,
              l,
              string = config._i,
              match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
              allowTime,
              dateFormat,
              timeFormat,
              tzFormat,
              isoDatesLen = isoDates.length,
              isoTimesLen = isoTimes.length;
  
          if (match) {
              getParsingFlags(config).iso = true;
              for (i = 0, l = isoDatesLen; i < l; i++) {
                  if (isoDates[i][1].exec(match[1])) {
                      dateFormat = isoDates[i][0];
                      allowTime = isoDates[i][2] !== false;
                      break;
                  }
              }
              if (dateFormat == null) {
                  config._isValid = false;
                  return;
              }
              if (match[3]) {
                  for (i = 0, l = isoTimesLen; i < l; i++) {
                      if (isoTimes[i][1].exec(match[3])) {
                          // match[2] should be 'T' or space
                          timeFormat = (match[2] || ' ') + isoTimes[i][0];
                          break;
                      }
                  }
                  if (timeFormat == null) {
                      config._isValid = false;
                      return;
                  }
              }
              if (!allowTime && timeFormat != null) {
                  config._isValid = false;
                  return;
              }
              if (match[4]) {
                  if (tzRegex.exec(match[4])) {
                      tzFormat = 'Z';
                  } else {
                      config._isValid = false;
                      return;
                  }
              }
              config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
              configFromStringAndFormat(config);
          } else {
              config._isValid = false;
          }
      }
  
      function extractFromRFC2822Strings(
          yearStr,
          monthStr,
          dayStr,
          hourStr,
          minuteStr,
          secondStr
      ) {
          var result = [
              untruncateYear(yearStr),
              defaultLocaleMonthsShort.indexOf(monthStr),
              parseInt(dayStr, 10),
              parseInt(hourStr, 10),
              parseInt(minuteStr, 10),
          ];
  
          if (secondStr) {
              result.push(parseInt(secondStr, 10));
          }
  
          return result;
      }
  
      function untruncateYear(yearStr) {
          var year = parseInt(yearStr, 10);
          if (year <= 49) {
              return 2000 + year;
          } else if (year <= 999) {
              return 1900 + year;
          }
          return year;
      }
  
      function preprocessRFC2822(s) {
          // Remove comments and folding whitespace and replace multiple-spaces with a single space
          return s
              .replace(/\([^()]*\)|[\n\t]/g, ' ')
              .replace(/(\s\s+)/g, ' ')
              .replace(/^\s\s*/, '')
              .replace(/\s\s*$/, '');
      }
  
      function checkWeekday(weekdayStr, parsedInput, config) {
          if (weekdayStr) {
              // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
              var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                  weekdayActual = new Date(
                      parsedInput[0],
                      parsedInput[1],
                      parsedInput[2]
                  ).getDay();
              if (weekdayProvided !== weekdayActual) {
                  getParsingFlags(config).weekdayMismatch = true;
                  config._isValid = false;
                  return false;
              }
          }
          return true;
      }
  
      function calculateOffset(obsOffset, militaryOffset, numOffset) {
          if (obsOffset) {
              return obsOffsets[obsOffset];
          } else if (militaryOffset) {
              // the only allowed military tz is Z
              return 0;
          } else {
              var hm = parseInt(numOffset, 10),
                  m = hm % 100,
                  h = (hm - m) / 100;
              return h * 60 + m;
          }
      }
  
      // date and time from ref 2822 format
      function configFromRFC2822(config) {
          var match = rfc2822.exec(preprocessRFC2822(config._i)),
              parsedArray;
          if (match) {
              parsedArray = extractFromRFC2822Strings(
                  match[4],
                  match[3],
                  match[2],
                  match[5],
                  match[6],
                  match[7]
              );
              if (!checkWeekday(match[1], parsedArray, config)) {
                  return;
              }
  
              config._a = parsedArray;
              config._tzm = calculateOffset(match[8], match[9], match[10]);
  
              config._d = createUTCDate.apply(null, config._a);
              config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
  
              getParsingFlags(config).rfc2822 = true;
          } else {
              config._isValid = false;
          }
      }
  
      // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
      function configFromString(config) {
          var matched = aspNetJsonRegex.exec(config._i);
          if (matched !== null) {
              config._d = new Date(+matched[1]);
              return;
          }
  
          configFromISO(config);
          if (config._isValid === false) {
              delete config._isValid;
          } else {
              return;
          }
  
          configFromRFC2822(config);
          if (config._isValid === false) {
              delete config._isValid;
          } else {
              return;
          }
  
          if (config._strict) {
              config._isValid = false;
          } else {
              // Final attempt, use Input Fallback
              hooks.createFromInputFallback(config);
          }
      }
  
      hooks.createFromInputFallback = deprecate(
          'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
              'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
              'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
          function (config) {
              config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
          }
      );
  
      // Pick the first defined of two or three arguments.
      function defaults(a, b, c) {
          if (a != null) {
              return a;
          }
          if (b != null) {
              return b;
          }
          return c;
      }
  
      function currentDateArray(config) {
          // hooks is actually the exported moment object
          var nowValue = new Date(hooks.now());
          if (config._useUTC) {
              return [
                  nowValue.getUTCFullYear(),
                  nowValue.getUTCMonth(),
                  nowValue.getUTCDate(),
              ];
          }
          return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
      }
  
      // convert an array to a date.
      // the array should mirror the parameters below
      // note: all values past the year are optional and will default to the lowest possible value.
      // [year, month, day , hour, minute, second, millisecond]
      function configFromArray(config) {
          var i,
              date,
              input = [],
              currentDate,
              expectedWeekday,
              yearToUse;
  
          if (config._d) {
              return;
          }
  
          currentDate = currentDateArray(config);
  
          //compute day of the year from weeks and weekdays
          if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
              dayOfYearFromWeekInfo(config);
          }
  
          //if the day of the year is set, figure out what it is
          if (config._dayOfYear != null) {
              yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
  
              if (
                  config._dayOfYear > daysInYear(yearToUse) ||
                  config._dayOfYear === 0
              ) {
                  getParsingFlags(config)._overflowDayOfYear = true;
              }
  
              date = createUTCDate(yearToUse, 0, config._dayOfYear);
              config._a[MONTH] = date.getUTCMonth();
              config._a[DATE] = date.getUTCDate();
          }
  
          // Default to current date.
          // * if no year, month, day of month are given, default to today
          // * if day of month is given, default month and year
          // * if month is given, default only year
          // * if year is given, don't default anything
          for (i = 0; i < 3 && config._a[i] == null; ++i) {
              config._a[i] = input[i] = currentDate[i];
          }
  
          // Zero out whatever was not defaulted, including time
          for (; i < 7; i++) {
              config._a[i] = input[i] =
                  config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
          }
  
          // Check for 24:00:00.000
          if (
              config._a[HOUR] === 24 &&
              config._a[MINUTE] === 0 &&
              config._a[SECOND] === 0 &&
              config._a[MILLISECOND] === 0
          ) {
              config._nextDay = true;
              config._a[HOUR] = 0;
          }
  
          config._d = (config._useUTC ? createUTCDate : createDate).apply(
              null,
              input
          );
          expectedWeekday = config._useUTC
              ? config._d.getUTCDay()
              : config._d.getDay();
  
          // Apply timezone offset from input. The actual utcOffset can be changed
          // with parseZone.
          if (config._tzm != null) {
              config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
          }
  
          if (config._nextDay) {
              config._a[HOUR] = 24;
          }
  
          // check for mismatching day of week
          if (
              config._w &&
              typeof config._w.d !== 'undefined' &&
              config._w.d !== expectedWeekday
          ) {
              getParsingFlags(config).weekdayMismatch = true;
          }
      }
  
      function dayOfYearFromWeekInfo(config) {
          var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
  
          w = config._w;
          if (w.GG != null || w.W != null || w.E != null) {
              dow = 1;
              doy = 4;
  
              // TODO: We need to take the current isoWeekYear, but that depends on
              // how we interpret now (local, utc, fixed offset). So create
              // a now version of current config (take local/utc/offset flags, and
              // create now).
              weekYear = defaults(
                  w.GG,
                  config._a[YEAR],
                  weekOfYear(createLocal(), 1, 4).year
              );
              week = defaults(w.W, 1);
              weekday = defaults(w.E, 1);
              if (weekday < 1 || weekday > 7) {
                  weekdayOverflow = true;
              }
          } else {
              dow = config._locale._week.dow;
              doy = config._locale._week.doy;
  
              curWeek = weekOfYear(createLocal(), dow, doy);
  
              weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
  
              // Default to current week.
              week = defaults(w.w, curWeek.week);
  
              if (w.d != null) {
                  // weekday -- low day numbers are considered next week
                  weekday = w.d;
                  if (weekday < 0 || weekday > 6) {
                      weekdayOverflow = true;
                  }
              } else if (w.e != null) {
                  // local weekday -- counting starts from beginning of week
                  weekday = w.e + dow;
                  if (w.e < 0 || w.e > 6) {
                      weekdayOverflow = true;
                  }
              } else {
                  // default to beginning of week
                  weekday = dow;
              }
          }
          if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
              getParsingFlags(config)._overflowWeeks = true;
          } else if (weekdayOverflow != null) {
              getParsingFlags(config)._overflowWeekday = true;
          } else {
              temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
              config._a[YEAR] = temp.year;
              config._dayOfYear = temp.dayOfYear;
          }
      }
  
      // constant that refers to the ISO standard
      hooks.ISO_8601 = function () {};
  
      // constant that refers to the RFC 2822 form
      hooks.RFC_2822 = function () {};
  
      // date from string and format string
      function configFromStringAndFormat(config) {
          // TODO: Move this to another part of the creation flow to prevent circular deps
          if (config._f === hooks.ISO_8601) {
              configFromISO(config);
              return;
          }
          if (config._f === hooks.RFC_2822) {
              configFromRFC2822(config);
              return;
          }
          config._a = [];
          getParsingFlags(config).empty = true;
  
          // This array is used to make a Date, either with `new Date` or `Date.UTC`
          var string = '' + config._i,
              i,
              parsedInput,
              tokens,
              token,
              skipped,
              stringLength = string.length,
              totalParsedInputLength = 0,
              era,
              tokenLen;
  
          tokens =
              expandFormat(config._f, config._locale).match(formattingTokens) || [];
          tokenLen = tokens.length;
          for (i = 0; i < tokenLen; i++) {
              token = tokens[i];
              parsedInput = (string.match(getParseRegexForToken(token, config)) ||
                  [])[0];
              if (parsedInput) {
                  skipped = string.substr(0, string.indexOf(parsedInput));
                  if (skipped.length > 0) {
                      getParsingFlags(config).unusedInput.push(skipped);
                  }
                  string = string.slice(
                      string.indexOf(parsedInput) + parsedInput.length
                  );
                  totalParsedInputLength += parsedInput.length;
              }
              // don't parse if it's not a known token
              if (formatTokenFunctions[token]) {
                  if (parsedInput) {
                      getParsingFlags(config).empty = false;
                  } else {
                      getParsingFlags(config).unusedTokens.push(token);
                  }
                  addTimeToArrayFromToken(token, parsedInput, config);
              } else if (config._strict && !parsedInput) {
                  getParsingFlags(config).unusedTokens.push(token);
              }
          }
  
          // add remaining unparsed input length to the string
          getParsingFlags(config).charsLeftOver =
              stringLength - totalParsedInputLength;
          if (string.length > 0) {
              getParsingFlags(config).unusedInput.push(string);
          }
  
          // clear _12h flag if hour is <= 12
          if (
              config._a[HOUR] <= 12 &&
              getParsingFlags(config).bigHour === true &&
              config._a[HOUR] > 0
          ) {
              getParsingFlags(config).bigHour = undefined;
          }
  
          getParsingFlags(config).parsedDateParts = config._a.slice(0);
          getParsingFlags(config).meridiem = config._meridiem;
          // handle meridiem
          config._a[HOUR] = meridiemFixWrap(
              config._locale,
              config._a[HOUR],
              config._meridiem
          );
  
          // handle era
          era = getParsingFlags(config).era;
          if (era !== null) {
              config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
          }
  
          configFromArray(config);
          checkOverflow(config);
      }
  
      function meridiemFixWrap(locale, hour, meridiem) {
          var isPm;
  
          if (meridiem == null) {
              // nothing to do
              return hour;
          }
          if (locale.meridiemHour != null) {
              return locale.meridiemHour(hour, meridiem);
          } else if (locale.isPM != null) {
              // Fallback
              isPm = locale.isPM(meridiem);
              if (isPm && hour < 12) {
                  hour += 12;
              }
              if (!isPm && hour === 12) {
                  hour = 0;
              }
              return hour;
          } else {
              // this is not supposed to happen
              return hour;
          }
      }
  
      // date from string and array of format strings
      function configFromStringAndArray(config) {
          var tempConfig,
              bestMoment,
              scoreToBeat,
              i,
              currentScore,
              validFormatFound,
              bestFormatIsValid = false,
              configfLen = config._f.length;
  
          if (configfLen === 0) {
              getParsingFlags(config).invalidFormat = true;
              config._d = new Date(NaN);
              return;
          }
  
          for (i = 0; i < configfLen; i++) {
              currentScore = 0;
              validFormatFound = false;
              tempConfig = copyConfig({}, config);
              if (config._useUTC != null) {
                  tempConfig._useUTC = config._useUTC;
              }
              tempConfig._f = config._f[i];
              configFromStringAndFormat(tempConfig);
  
              if (isValid(tempConfig)) {
                  validFormatFound = true;
              }
  
              // if there is any input that was not parsed add a penalty for that format
              currentScore += getParsingFlags(tempConfig).charsLeftOver;
  
              //or tokens
              currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
  
              getParsingFlags(tempConfig).score = currentScore;
  
              if (!bestFormatIsValid) {
                  if (
                      scoreToBeat == null ||
                      currentScore < scoreToBeat ||
                      validFormatFound
                  ) {
                      scoreToBeat = currentScore;
                      bestMoment = tempConfig;
                      if (validFormatFound) {
                          bestFormatIsValid = true;
                      }
                  }
              } else {
                  if (currentScore < scoreToBeat) {
                      scoreToBeat = currentScore;
                      bestMoment = tempConfig;
                  }
              }
          }
  
          extend(config, bestMoment || tempConfig);
      }
  
      function configFromObject(config) {
          if (config._d) {
              return;
          }
  
          var i = normalizeObjectUnits(config._i),
              dayOrDate = i.day === undefined ? i.date : i.day;
          config._a = map(
              [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
              function (obj) {
                  return obj && parseInt(obj, 10);
              }
          );
  
          configFromArray(config);
      }
  
      function createFromConfig(config) {
          var res = new Moment(checkOverflow(prepareConfig(config)));
          if (res._nextDay) {
              // Adding is smart enough around DST
              res.add(1, 'd');
              res._nextDay = undefined;
          }
  
          return res;
      }
  
      function prepareConfig(config) {
          var input = config._i,
              format = config._f;
  
          config._locale = config._locale || getLocale(config._l);
  
          if (input === null || (format === undefined && input === '')) {
              return createInvalid({ nullInput: true });
          }
  
          if (typeof input === 'string') {
              config._i = input = config._locale.preparse(input);
          }
  
          if (isMoment(input)) {
              return new Moment(checkOverflow(input));
          } else if (isDate(input)) {
              config._d = input;
          } else if (isArray(format)) {
              configFromStringAndArray(config);
          } else if (format) {
              configFromStringAndFormat(config);
          } else {
              configFromInput(config);
          }
  
          if (!isValid(config)) {
              config._d = null;
          }
  
          return config;
      }
  
      function configFromInput(config) {
          var input = config._i;
          if (isUndefined(input)) {
              config._d = new Date(hooks.now());
          } else if (isDate(input)) {
              config._d = new Date(input.valueOf());
          } else if (typeof input === 'string') {
              configFromString(config);
          } else if (isArray(input)) {
              config._a = map(input.slice(0), function (obj) {
                  return parseInt(obj, 10);
              });
              configFromArray(config);
          } else if (isObject(input)) {
              configFromObject(config);
          } else if (isNumber(input)) {
              // from milliseconds
              config._d = new Date(input);
          } else {
              hooks.createFromInputFallback(config);
          }
      }
  
      function createLocalOrUTC(input, format, locale, strict, isUTC) {
          var c = {};
  
          if (format === true || format === false) {
              strict = format;
              format = undefined;
          }
  
          if (locale === true || locale === false) {
              strict = locale;
              locale = undefined;
          }
  
          if (
              (isObject(input) && isObjectEmpty(input)) ||
              (isArray(input) && input.length === 0)
          ) {
              input = undefined;
          }
          // object construction must be done this way.
          // https://github.com/moment/moment/issues/1423
          c._isAMomentObject = true;
          c._useUTC = c._isUTC = isUTC;
          c._l = locale;
          c._i = input;
          c._f = format;
          c._strict = strict;
  
          return createFromConfig(c);
      }
  
      function createLocal(input, format, locale, strict) {
          return createLocalOrUTC(input, format, locale, strict, false);
      }
  
      var prototypeMin = deprecate(
              'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
              function () {
                  var other = createLocal.apply(null, arguments);
                  if (this.isValid() && other.isValid()) {
                      return other < this ? this : other;
                  } else {
                      return createInvalid();
                  }
              }
          ),
          prototypeMax = deprecate(
              'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
              function () {
                  var other = createLocal.apply(null, arguments);
                  if (this.isValid() && other.isValid()) {
                      return other > this ? this : other;
                  } else {
                      return createInvalid();
                  }
              }
          );
  
      // Pick a moment m from moments so that m[fn](other) is true for all
      // other. This relies on the function fn to be transitive.
      //
      // moments should either be an array of moment objects or an array, whose
      // first element is an array of moment objects.
      function pickBy(fn, moments) {
          var res, i;
          if (moments.length === 1 && isArray(moments[0])) {
              moments = moments[0];
          }
          if (!moments.length) {
              return createLocal();
          }
          res = moments[0];
          for (i = 1; i < moments.length; ++i) {
              if (!moments[i].isValid() || moments[i][fn](res)) {
                  res = moments[i];
              }
          }
          return res;
      }
  
      // TODO: Use [].sort instead?
      function min() {
          var args = [].slice.call(arguments, 0);
  
          return pickBy('isBefore', args);
      }
  
      function max() {
          var args = [].slice.call(arguments, 0);
  
          return pickBy('isAfter', args);
      }
  
      var now = function () {
          return Date.now ? Date.now() : +new Date();
      };
  
      var ordering = [
          'year',
          'quarter',
          'month',
          'week',
          'day',
          'hour',
          'minute',
          'second',
          'millisecond',
      ];
  
      function isDurationValid(m) {
          var key,
              unitHasDecimal = false,
              i,
              orderLen = ordering.length;
          for (key in m) {
              if (
                  hasOwnProp(m, key) &&
                  !(
                      indexOf.call(ordering, key) !== -1 &&
                      (m[key] == null || !isNaN(m[key]))
                  )
              ) {
                  return false;
              }
          }
  
          for (i = 0; i < orderLen; ++i) {
              if (m[ordering[i]]) {
                  if (unitHasDecimal) {
                      return false; // only allow non-integers for smallest unit
                  }
                  if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                      unitHasDecimal = true;
                  }
              }
          }
  
          return true;
      }
  
      function isValid$1() {
          return this._isValid;
      }
  
      function createInvalid$1() {
          return createDuration(NaN);
      }
  
      function Duration(duration) {
          var normalizedInput = normalizeObjectUnits(duration),
              years = normalizedInput.year || 0,
              quarters = normalizedInput.quarter || 0,
              months = normalizedInput.month || 0,
              weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
              days = normalizedInput.day || 0,
              hours = normalizedInput.hour || 0,
              minutes = normalizedInput.minute || 0,
              seconds = normalizedInput.second || 0,
              milliseconds = normalizedInput.millisecond || 0;
  
          this._isValid = isDurationValid(normalizedInput);
  
          // representation for dateAddRemove
          this._milliseconds =
              +milliseconds +
              seconds * 1e3 + // 1000
              minutes * 6e4 + // 1000 * 60
              hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
          // Because of dateAddRemove treats 24 hours as different from a
          // day when working around DST, we need to store them separately
          this._days = +days + weeks * 7;
          // It is impossible to translate months into days without knowing
          // which months you are are talking about, so we have to store
          // it separately.
          this._months = +months + quarters * 3 + years * 12;
  
          this._data = {};
  
          this._locale = getLocale();
  
          this._bubble();
      }
  
      function isDuration(obj) {
          return obj instanceof Duration;
      }
  
      function absRound(number) {
          if (number < 0) {
              return Math.round(-1 * number) * -1;
          } else {
              return Math.round(number);
          }
      }
  
      // compare two arrays, return the number of differences
      function compareArrays(array1, array2, dontConvert) {
          var len = Math.min(array1.length, array2.length),
              lengthDiff = Math.abs(array1.length - array2.length),
              diffs = 0,
              i;
          for (i = 0; i < len; i++) {
              if (
                  (dontConvert && array1[i] !== array2[i]) ||
                  (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
              ) {
                  diffs++;
              }
          }
          return diffs + lengthDiff;
      }
  
      // FORMATTING
  
      function offset(token, separator) {
          addFormatToken(token, 0, 0, function () {
              var offset = this.utcOffset(),
                  sign = '+';
              if (offset < 0) {
                  offset = -offset;
                  sign = '-';
              }
              return (
                  sign +
                  zeroFill(~~(offset / 60), 2) +
                  separator +
                  zeroFill(~~offset % 60, 2)
              );
          });
      }
  
      offset('Z', ':');
      offset('ZZ', '');
  
      // PARSING
  
      addRegexToken('Z', matchShortOffset);
      addRegexToken('ZZ', matchShortOffset);
      addParseToken(['Z', 'ZZ'], function (input, array, config) {
          config._useUTC = true;
          config._tzm = offsetFromString(matchShortOffset, input);
      });
  
      // HELPERS
  
      // timezone chunker
      // '+10:00' > ['10',  '00']
      // '-1530'  > ['-15', '30']
      var chunkOffset = /([\+\-]|\d\d)/gi;
  
      function offsetFromString(matcher, string) {
          var matches = (string || '').match(matcher),
              chunk,
              parts,
              minutes;
  
          if (matches === null) {
              return null;
          }
  
          chunk = matches[matches.length - 1] || [];
          parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
          minutes = +(parts[1] * 60) + toInt(parts[2]);
  
          return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
      }
  
      // Return a moment from input, that is local/utc/zone equivalent to model.
      function cloneWithOffset(input, model) {
          var res, diff;
          if (model._isUTC) {
              res = model.clone();
              diff =
                  (isMoment(input) || isDate(input)
                      ? input.valueOf()
                      : createLocal(input).valueOf()) - res.valueOf();
              // Use low-level api, because this fn is low-level api.
              res._d.setTime(res._d.valueOf() + diff);
              hooks.updateOffset(res, false);
              return res;
          } else {
              return createLocal(input).local();
          }
      }
  
      function getDateOffset(m) {
          // On Firefox.24 Date#getTimezoneOffset returns a floating point.
          // https://github.com/moment/moment/pull/1871
          return -Math.round(m._d.getTimezoneOffset());
      }
  
      // HOOKS
  
      // This function will be called whenever a moment is mutated.
      // It is intended to keep the offset in sync with the timezone.
      hooks.updateOffset = function () {};
  
      // MOMENTS
  
      // keepLocalTime = true means only change the timezone, without
      // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
      // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
      // +0200, so we adjust the time as needed, to be valid.
      //
      // Keeping the time actually adds/subtracts (one hour)
      // from the actual represented time. That is why we call updateOffset
      // a second time. In case it wants us to change the offset again
      // _changeInProgress == true case, then we have to adjust, because
      // there is no such time in the given timezone.
      function getSetOffset(input, keepLocalTime, keepMinutes) {
          var offset = this._offset || 0,
              localAdjust;
          if (!this.isValid()) {
              return input != null ? this : NaN;
          }
          if (input != null) {
              if (typeof input === 'string') {
                  input = offsetFromString(matchShortOffset, input);
                  if (input === null) {
                      return this;
                  }
              } else if (Math.abs(input) < 16 && !keepMinutes) {
                  input = input * 60;
              }
              if (!this._isUTC && keepLocalTime) {
                  localAdjust = getDateOffset(this);
              }
              this._offset = input;
              this._isUTC = true;
              if (localAdjust != null) {
                  this.add(localAdjust, 'm');
              }
              if (offset !== input) {
                  if (!keepLocalTime || this._changeInProgress) {
                      addSubtract(
                          this,
                          createDuration(input - offset, 'm'),
                          1,
                          false
                      );
                  } else if (!this._changeInProgress) {
                      this._changeInProgress = true;
                      hooks.updateOffset(this, true);
                      this._changeInProgress = null;
                  }
              }
              return this;
          } else {
              return this._isUTC ? offset : getDateOffset(this);
          }
      }
  
      function getSetZone(input, keepLocalTime) {
          if (input != null) {
              if (typeof input !== 'string') {
                  input = -input;
              }
  
              this.utcOffset(input, keepLocalTime);
  
              return this;
          } else {
              return -this.utcOffset();
          }
      }
  
      function setOffsetToUTC(keepLocalTime) {
          return this.utcOffset(0, keepLocalTime);
      }
  
      function setOffsetToLocal(keepLocalTime) {
          if (this._isUTC) {
              this.utcOffset(0, keepLocalTime);
              this._isUTC = false;
  
              if (keepLocalTime) {
                  this.subtract(getDateOffset(this), 'm');
              }
          }
          return this;
      }
  
      function setOffsetToParsedOffset() {
          if (this._tzm != null) {
              this.utcOffset(this._tzm, false, true);
          } else if (typeof this._i === 'string') {
              var tZone = offsetFromString(matchOffset, this._i);
              if (tZone != null) {
                  this.utcOffset(tZone);
              } else {
                  this.utcOffset(0, true);
              }
          }
          return this;
      }
  
      function hasAlignedHourOffset(input) {
          if (!this.isValid()) {
              return false;
          }
          input = input ? createLocal(input).utcOffset() : 0;
  
          return (this.utcOffset() - input) % 60 === 0;
      }
  
      function isDaylightSavingTime() {
          return (
              this.utcOffset() > this.clone().month(0).utcOffset() ||
              this.utcOffset() > this.clone().month(5).utcOffset()
          );
      }
  
      function isDaylightSavingTimeShifted() {
          if (!isUndefined(this._isDSTShifted)) {
              return this._isDSTShifted;
          }
  
          var c = {},
              other;
  
          copyConfig(c, this);
          c = prepareConfig(c);
  
          if (c._a) {
              other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
              this._isDSTShifted =
                  this.isValid() && compareArrays(c._a, other.toArray()) > 0;
          } else {
              this._isDSTShifted = false;
          }
  
          return this._isDSTShifted;
      }
  
      function isLocal() {
          return this.isValid() ? !this._isUTC : false;
      }
  
      function isUtcOffset() {
          return this.isValid() ? this._isUTC : false;
      }
  
      function isUtc() {
          return this.isValid() ? this._isUTC && this._offset === 0 : false;
      }
  
      // ASP.NET json date format regex
      var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
          // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
          // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
          // and further modified to allow for strings containing both week and day
          isoRegex =
              /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  
      function createDuration(input, key) {
          var duration = input,
              // matching against regexp is expensive, do it on demand
              match = null,
              sign,
              ret,
              diffRes;
  
          if (isDuration(input)) {
              duration = {
                  ms: input._milliseconds,
                  d: input._days,
                  M: input._months,
              };
          } else if (isNumber(input) || !isNaN(+input)) {
              duration = {};
              if (key) {
                  duration[key] = +input;
              } else {
                  duration.milliseconds = +input;
              }
          } else if ((match = aspNetRegex.exec(input))) {
              sign = match[1] === '-' ? -1 : 1;
              duration = {
                  y: 0,
                  d: toInt(match[DATE]) * sign,
                  h: toInt(match[HOUR]) * sign,
                  m: toInt(match[MINUTE]) * sign,
                  s: toInt(match[SECOND]) * sign,
                  ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
              };
          } else if ((match = isoRegex.exec(input))) {
              sign = match[1] === '-' ? -1 : 1;
              duration = {
                  y: parseIso(match[2], sign),
                  M: parseIso(match[3], sign),
                  w: parseIso(match[4], sign),
                  d: parseIso(match[5], sign),
                  h: parseIso(match[6], sign),
                  m: parseIso(match[7], sign),
                  s: parseIso(match[8], sign),
              };
          } else if (duration == null) {
              // checks for null or undefined
              duration = {};
          } else if (
              typeof duration === 'object' &&
              ('from' in duration || 'to' in duration)
          ) {
              diffRes = momentsDifference(
                  createLocal(duration.from),
                  createLocal(duration.to)
              );
  
              duration = {};
              duration.ms = diffRes.milliseconds;
              duration.M = diffRes.months;
          }
  
          ret = new Duration(duration);
  
          if (isDuration(input) && hasOwnProp(input, '_locale')) {
              ret._locale = input._locale;
          }
  
          if (isDuration(input) && hasOwnProp(input, '_isValid')) {
              ret._isValid = input._isValid;
          }
  
          return ret;
      }
  
      createDuration.fn = Duration.prototype;
      createDuration.invalid = createInvalid$1;
  
      function parseIso(inp, sign) {
          // We'd normally use ~~inp for this, but unfortunately it also
          // converts floats to ints.
          // inp may be undefined, so careful calling replace on it.
          var res = inp && parseFloat(inp.replace(',', '.'));
          // apply sign while we're at it
          return (isNaN(res) ? 0 : res) * sign;
      }
  
      function positiveMomentsDifference(base, other) {
          var res = {};
  
          res.months =
              other.month() - base.month() + (other.year() - base.year()) * 12;
          if (base.clone().add(res.months, 'M').isAfter(other)) {
              --res.months;
          }
  
          res.milliseconds = +other - +base.clone().add(res.months, 'M');
  
          return res;
      }
  
      function momentsDifference(base, other) {
          var res;
          if (!(base.isValid() && other.isValid())) {
              return { milliseconds: 0, months: 0 };
          }
  
          other = cloneWithOffset(other, base);
          if (base.isBefore(other)) {
              res = positiveMomentsDifference(base, other);
          } else {
              res = positiveMomentsDifference(other, base);
              res.milliseconds = -res.milliseconds;
              res.months = -res.months;
          }
  
          return res;
      }
  
      // TODO: remove 'name' arg after deprecation is removed
      function createAdder(direction, name) {
          return function (val, period) {
              var dur, tmp;
              //invert the arguments, but complain about it
              if (period !== null && !isNaN(+period)) {
                  deprecateSimple(
                      name,
                      'moment().' +
                          name +
                          '(period, number) is deprecated. Please use moment().' +
                          name +
                          '(number, period). ' +
                          'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
                  );
                  tmp = val;
                  val = period;
                  period = tmp;
              }
  
              dur = createDuration(val, period);
              addSubtract(this, dur, direction);
              return this;
          };
      }
  
      function addSubtract(mom, duration, isAdding, updateOffset) {
          var milliseconds = duration._milliseconds,
              days = absRound(duration._days),
              months = absRound(duration._months);
  
          if (!mom.isValid()) {
              // No op
              return;
          }
  
          updateOffset = updateOffset == null ? true : updateOffset;
  
          if (months) {
              setMonth(mom, get(mom, 'Month') + months * isAdding);
          }
          if (days) {
              set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
          }
          if (milliseconds) {
              mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
          }
          if (updateOffset) {
              hooks.updateOffset(mom, days || months);
          }
      }
  
      var add = createAdder(1, 'add'),
          subtract = createAdder(-1, 'subtract');
  
      function isString(input) {
          return typeof input === 'string' || input instanceof String;
      }
  
      // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
      function isMomentInput(input) {
          return (
              isMoment(input) ||
              isDate(input) ||
              isString(input) ||
              isNumber(input) ||
              isNumberOrStringArray(input) ||
              isMomentInputObject(input) ||
              input === null ||
              input === undefined
          );
      }
  
      function isMomentInputObject(input) {
          var objectTest = isObject(input) && !isObjectEmpty(input),
              propertyTest = false,
              properties = [
                  'years',
                  'year',
                  'y',
                  'months',
                  'month',
                  'M',
                  'days',
                  'day',
                  'd',
                  'dates',
                  'date',
                  'D',
                  'hours',
                  'hour',
                  'h',
                  'minutes',
                  'minute',
                  'm',
                  'seconds',
                  'second',
                  's',
                  'milliseconds',
                  'millisecond',
                  'ms',
              ],
              i,
              property,
              propertyLen = properties.length;
  
          for (i = 0; i < propertyLen; i += 1) {
              property = properties[i];
              propertyTest = propertyTest || hasOwnProp(input, property);
          }
  
          return objectTest && propertyTest;
      }
  
      function isNumberOrStringArray(input) {
          var arrayTest = isArray(input),
              dataTypeTest = false;
          if (arrayTest) {
              dataTypeTest =
                  input.filter(function (item) {
                      return !isNumber(item) && isString(input);
                  }).length === 0;
          }
          return arrayTest && dataTypeTest;
      }
  
      function isCalendarSpec(input) {
          var objectTest = isObject(input) && !isObjectEmpty(input),
              propertyTest = false,
              properties = [
                  'sameDay',
                  'nextDay',
                  'lastDay',
                  'nextWeek',
                  'lastWeek',
                  'sameElse',
              ],
              i,
              property;
  
          for (i = 0; i < properties.length; i += 1) {
              property = properties[i];
              propertyTest = propertyTest || hasOwnProp(input, property);
          }
  
          return objectTest && propertyTest;
      }
  
      function getCalendarFormat(myMoment, now) {
          var diff = myMoment.diff(now, 'days', true);
          return diff < -6
              ? 'sameElse'
              : diff < -1
              ? 'lastWeek'
              : diff < 0
              ? 'lastDay'
              : diff < 1
              ? 'sameDay'
              : diff < 2
              ? 'nextDay'
              : diff < 7
              ? 'nextWeek'
              : 'sameElse';
      }
  
      function calendar$1(time, formats) {
          // Support for single parameter, formats only overload to the calendar function
          if (arguments.length === 1) {
              if (!arguments[0]) {
                  time = undefined;
                  formats = undefined;
              } else if (isMomentInput(arguments[0])) {
                  time = arguments[0];
                  formats = undefined;
              } else if (isCalendarSpec(arguments[0])) {
                  formats = arguments[0];
                  time = undefined;
              }
          }
          // We want to compare the start of today, vs this.
          // Getting start-of-today depends on whether we're local/utc/offset or not.
          var now = time || createLocal(),
              sod = cloneWithOffset(now, this).startOf('day'),
              format = hooks.calendarFormat(this, sod) || 'sameElse',
              output =
                  formats &&
                  (isFunction(formats[format])
                      ? formats[format].call(this, now)
                      : formats[format]);
  
          return this.format(
              output || this.localeData().calendar(format, this, createLocal(now))
          );
      }
  
      function clone() {
          return new Moment(this);
      }
  
      function isAfter(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
              return false;
          }
          units = normalizeUnits(units) || 'millisecond';
          if (units === 'millisecond') {
              return this.valueOf() > localInput.valueOf();
          } else {
              return localInput.valueOf() < this.clone().startOf(units).valueOf();
          }
      }
  
      function isBefore(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
              return false;
          }
          units = normalizeUnits(units) || 'millisecond';
          if (units === 'millisecond') {
              return this.valueOf() < localInput.valueOf();
          } else {
              return this.clone().endOf(units).valueOf() < localInput.valueOf();
          }
      }
  
      function isBetween(from, to, units, inclusivity) {
          var localFrom = isMoment(from) ? from : createLocal(from),
              localTo = isMoment(to) ? to : createLocal(to);
          if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
              return false;
          }
          inclusivity = inclusivity || '()';
          return (
              (inclusivity[0] === '('
                  ? this.isAfter(localFrom, units)
                  : !this.isBefore(localFrom, units)) &&
              (inclusivity[1] === ')'
                  ? this.isBefore(localTo, units)
                  : !this.isAfter(localTo, units))
          );
      }
  
      function isSame(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input),
              inputMs;
          if (!(this.isValid() && localInput.isValid())) {
              return false;
          }
          units = normalizeUnits(units) || 'millisecond';
          if (units === 'millisecond') {
              return this.valueOf() === localInput.valueOf();
          } else {
              inputMs = localInput.valueOf();
              return (
                  this.clone().startOf(units).valueOf() <= inputMs &&
                  inputMs <= this.clone().endOf(units).valueOf()
              );
          }
      }
  
      function isSameOrAfter(input, units) {
          return this.isSame(input, units) || this.isAfter(input, units);
      }
  
      function isSameOrBefore(input, units) {
          return this.isSame(input, units) || this.isBefore(input, units);
      }
  
      function diff(input, units, asFloat) {
          var that, zoneDelta, output;
  
          if (!this.isValid()) {
              return NaN;
          }
  
          that = cloneWithOffset(input, this);
  
          if (!that.isValid()) {
              return NaN;
          }
  
          zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
  
          units = normalizeUnits(units);
  
          switch (units) {
              case 'year':
                  output = monthDiff(this, that) / 12;
                  break;
              case 'month':
                  output = monthDiff(this, that);
                  break;
              case 'quarter':
                  output = monthDiff(this, that) / 3;
                  break;
              case 'second':
                  output = (this - that) / 1e3;
                  break; // 1000
              case 'minute':
                  output = (this - that) / 6e4;
                  break; // 1000 * 60
              case 'hour':
                  output = (this - that) / 36e5;
                  break; // 1000 * 60 * 60
              case 'day':
                  output = (this - that - zoneDelta) / 864e5;
                  break; // 1000 * 60 * 60 * 24, negate dst
              case 'week':
                  output = (this - that - zoneDelta) / 6048e5;
                  break; // 1000 * 60 * 60 * 24 * 7, negate dst
              default:
                  output = this - that;
          }
  
          return asFloat ? output : absFloor(output);
      }
  
      function monthDiff(a, b) {
          if (a.date() < b.date()) {
              // end-of-month calculations work correct when the start month has more
              // days than the end month.
              return -monthDiff(b, a);
          }
          // difference in months
          var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
              // b is in (anchor - 1 month, anchor + 1 month)
              anchor = a.clone().add(wholeMonthDiff, 'months'),
              anchor2,
              adjust;
  
          if (b - anchor < 0) {
              anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
              // linear across the month
              adjust = (b - anchor) / (anchor - anchor2);
          } else {
              anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
              // linear across the month
              adjust = (b - anchor) / (anchor2 - anchor);
          }
  
          //check for negative zero, return zero if negative zero
          return -(wholeMonthDiff + adjust) || 0;
      }
  
      hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
      hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';
  
      function toString() {
          return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
      }
  
      function toISOString(keepOffset) {
          if (!this.isValid()) {
              return null;
          }
          var utc = keepOffset !== true,
              m = utc ? this.clone().utc() : this;
          if (m.year() < 0 || m.year() > 9999) {
              return formatMoment(
                  m,
                  utc
                      ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                      : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
              );
          }
          if (isFunction(Date.prototype.toISOString)) {
              // native implementation is ~50x faster, use it when we can
              if (utc) {
                  return this.toDate().toISOString();
              } else {
                  return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
                      .toISOString()
                      .replace('Z', formatMoment(m, 'Z'));
              }
          }
          return formatMoment(
              m,
              utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
          );
      }
  
      /**
       * Return a human readable representation of a moment that can
       * also be evaluated to get a new moment which is the same
       *
       * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
       */
      function inspect() {
          if (!this.isValid()) {
              return 'moment.invalid(/* ' + this._i + ' */)';
          }
          var func = 'moment',
              zone = '',
              prefix,
              year,
              datetime,
              suffix;
          if (!this.isLocal()) {
              func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
              zone = 'Z';
          }
          prefix = '[' + func + '("]';
          year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
          datetime = '-MM-DD[T]HH:mm:ss.SSS';
          suffix = zone + '[")]';
  
          return this.format(prefix + year + datetime + suffix);
      }
  
      function format(inputString) {
          if (!inputString) {
              inputString = this.isUtc()
                  ? hooks.defaultFormatUtc
                  : hooks.defaultFormat;
          }
          var output = formatMoment(this, inputString);
          return this.localeData().postformat(output);
      }
  
      function from(time, withoutSuffix) {
          if (
              this.isValid() &&
              ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
          ) {
              return createDuration({ to: this, from: time })
                  .locale(this.locale())
                  .humanize(!withoutSuffix);
          } else {
              return this.localeData().invalidDate();
          }
      }
  
      function fromNow(withoutSuffix) {
          return this.from(createLocal(), withoutSuffix);
      }
  
      function to(time, withoutSuffix) {
          if (
              this.isValid() &&
              ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
          ) {
              return createDuration({ from: this, to: time })
                  .locale(this.locale())
                  .humanize(!withoutSuffix);
          } else {
              return this.localeData().invalidDate();
          }
      }
  
      function toNow(withoutSuffix) {
          return this.to(createLocal(), withoutSuffix);
      }
  
      // If passed a locale key, it will set the locale for this
      // instance.  Otherwise, it will return the locale configuration
      // variables for this instance.
      function locale(key) {
          var newLocaleData;
  
          if (key === undefined) {
              return this._locale._abbr;
          } else {
              newLocaleData = getLocale(key);
              if (newLocaleData != null) {
                  this._locale = newLocaleData;
              }
              return this;
          }
      }
  
      var lang = deprecate(
          'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
          function (key) {
              if (key === undefined) {
                  return this.localeData();
              } else {
                  return this.locale(key);
              }
          }
      );
  
      function localeData() {
          return this._locale;
      }
  
      var MS_PER_SECOND = 1000,
          MS_PER_MINUTE = 60 * MS_PER_SECOND,
          MS_PER_HOUR = 60 * MS_PER_MINUTE,
          MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
  
      // actual modulo - handles negative numbers (for dates before 1970):
      function mod$1(dividend, divisor) {
          return ((dividend % divisor) + divisor) % divisor;
      }
  
      function localStartOfDate(y, m, d) {
          // the date constructor remaps years 0-99 to 1900-1999
          if (y < 100 && y >= 0) {
              // preserve leap years using a full 400 year cycle, then reset
              return new Date(y + 400, m, d) - MS_PER_400_YEARS;
          } else {
              return new Date(y, m, d).valueOf();
          }
      }
  
      function utcStartOfDate(y, m, d) {
          // Date.UTC remaps years 0-99 to 1900-1999
          if (y < 100 && y >= 0) {
              // preserve leap years using a full 400 year cycle, then reset
              return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
          } else {
              return Date.UTC(y, m, d);
          }
      }
  
      function startOf(units) {
          var time, startOfDate;
          units = normalizeUnits(units);
          if (units === undefined || units === 'millisecond' || !this.isValid()) {
              return this;
          }
  
          startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  
          switch (units) {
              case 'year':
                  time = startOfDate(this.year(), 0, 1);
                  break;
              case 'quarter':
                  time = startOfDate(
                      this.year(),
                      this.month() - (this.month() % 3),
                      1
                  );
                  break;
              case 'month':
                  time = startOfDate(this.year(), this.month(), 1);
                  break;
              case 'week':
                  time = startOfDate(
                      this.year(),
                      this.month(),
                      this.date() - this.weekday()
                  );
                  break;
              case 'isoWeek':
                  time = startOfDate(
                      this.year(),
                      this.month(),
                      this.date() - (this.isoWeekday() - 1)
                  );
                  break;
              case 'day':
              case 'date':
                  time = startOfDate(this.year(), this.month(), this.date());
                  break;
              case 'hour':
                  time = this._d.valueOf();
                  time -= mod$1(
                      time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                      MS_PER_HOUR
                  );
                  break;
              case 'minute':
                  time = this._d.valueOf();
                  time -= mod$1(time, MS_PER_MINUTE);
                  break;
              case 'second':
                  time = this._d.valueOf();
                  time -= mod$1(time, MS_PER_SECOND);
                  break;
          }
  
          this._d.setTime(time);
          hooks.updateOffset(this, true);
          return this;
      }
  
      function endOf(units) {
          var time, startOfDate;
          units = normalizeUnits(units);
          if (units === undefined || units === 'millisecond' || !this.isValid()) {
              return this;
          }
  
          startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  
          switch (units) {
              case 'year':
                  time = startOfDate(this.year() + 1, 0, 1) - 1;
                  break;
              case 'quarter':
                  time =
                      startOfDate(
                          this.year(),
                          this.month() - (this.month() % 3) + 3,
                          1
                      ) - 1;
                  break;
              case 'month':
                  time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                  break;
              case 'week':
                  time =
                      startOfDate(
                          this.year(),
                          this.month(),
                          this.date() - this.weekday() + 7
                      ) - 1;
                  break;
              case 'isoWeek':
                  time =
                      startOfDate(
                          this.year(),
                          this.month(),
                          this.date() - (this.isoWeekday() - 1) + 7
                      ) - 1;
                  break;
              case 'day':
              case 'date':
                  time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                  break;
              case 'hour':
                  time = this._d.valueOf();
                  time +=
                      MS_PER_HOUR -
                      mod$1(
                          time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                          MS_PER_HOUR
                      ) -
                      1;
                  break;
              case 'minute':
                  time = this._d.valueOf();
                  time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                  break;
              case 'second':
                  time = this._d.valueOf();
                  time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                  break;
          }
  
          this._d.setTime(time);
          hooks.updateOffset(this, true);
          return this;
      }
  
      function valueOf() {
          return this._d.valueOf() - (this._offset || 0) * 60000;
      }
  
      function unix() {
          return Math.floor(this.valueOf() / 1000);
      }
  
      function toDate() {
          return new Date(this.valueOf());
      }
  
      function toArray() {
          var m = this;
          return [
              m.year(),
              m.month(),
              m.date(),
              m.hour(),
              m.minute(),
              m.second(),
              m.millisecond(),
          ];
      }
  
      function toObject() {
          var m = this;
          return {
              years: m.year(),
              months: m.month(),
              date: m.date(),
              hours: m.hours(),
              minutes: m.minutes(),
              seconds: m.seconds(),
              milliseconds: m.milliseconds(),
          };
      }
  
      function toJSON() {
          // new Date(NaN).toJSON() === null
          return this.isValid() ? this.toISOString() : null;
      }
  
      function isValid$2() {
          return isValid(this);
      }
  
      function parsingFlags() {
          return extend({}, getParsingFlags(this));
      }
  
      function invalidAt() {
          return getParsingFlags(this).overflow;
      }
  
      function creationData() {
          return {
              input: this._i,
              format: this._f,
              locale: this._locale,
              isUTC: this._isUTC,
              strict: this._strict,
          };
      }
  
      addFormatToken('N', 0, 0, 'eraAbbr');
      addFormatToken('NN', 0, 0, 'eraAbbr');
      addFormatToken('NNN', 0, 0, 'eraAbbr');
      addFormatToken('NNNN', 0, 0, 'eraName');
      addFormatToken('NNNNN', 0, 0, 'eraNarrow');
  
      addFormatToken('y', ['y', 1], 'yo', 'eraYear');
      addFormatToken('y', ['yy', 2], 0, 'eraYear');
      addFormatToken('y', ['yyy', 3], 0, 'eraYear');
      addFormatToken('y', ['yyyy', 4], 0, 'eraYear');
  
      addRegexToken('N', matchEraAbbr);
      addRegexToken('NN', matchEraAbbr);
      addRegexToken('NNN', matchEraAbbr);
      addRegexToken('NNNN', matchEraName);
      addRegexToken('NNNNN', matchEraNarrow);
  
      addParseToken(
          ['N', 'NN', 'NNN', 'NNNN', 'NNNNN'],
          function (input, array, config, token) {
              var era = config._locale.erasParse(input, token, config._strict);
              if (era) {
                  getParsingFlags(config).era = era;
              } else {
                  getParsingFlags(config).invalidEra = input;
              }
          }
      );
  
      addRegexToken('y', matchUnsigned);
      addRegexToken('yy', matchUnsigned);
      addRegexToken('yyy', matchUnsigned);
      addRegexToken('yyyy', matchUnsigned);
      addRegexToken('yo', matchEraYearOrdinal);
  
      addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
      addParseToken(['yo'], function (input, array, config, token) {
          var match;
          if (config._locale._eraYearOrdinalRegex) {
              match = input.match(config._locale._eraYearOrdinalRegex);
          }
  
          if (config._locale.eraYearOrdinalParse) {
              array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
          } else {
              array[YEAR] = parseInt(input, 10);
          }
      });
  
      function localeEras(m, format) {
          var i,
              l,
              date,
              eras = this._eras || getLocale('en')._eras;
          for (i = 0, l = eras.length; i < l; ++i) {
              switch (typeof eras[i].since) {
                  case 'string':
                      // truncate time
                      date = hooks(eras[i].since).startOf('day');
                      eras[i].since = date.valueOf();
                      break;
              }
  
              switch (typeof eras[i].until) {
                  case 'undefined':
                      eras[i].until = +Infinity;
                      break;
                  case 'string':
                      // truncate time
                      date = hooks(eras[i].until).startOf('day').valueOf();
                      eras[i].until = date.valueOf();
                      break;
              }
          }
          return eras;
      }
  
      function localeErasParse(eraName, format, strict) {
          var i,
              l,
              eras = this.eras(),
              name,
              abbr,
              narrow;
          eraName = eraName.toUpperCase();
  
          for (i = 0, l = eras.length; i < l; ++i) {
              name = eras[i].name.toUpperCase();
              abbr = eras[i].abbr.toUpperCase();
              narrow = eras[i].narrow.toUpperCase();
  
              if (strict) {
                  switch (format) {
                      case 'N':
                      case 'NN':
                      case 'NNN':
                          if (abbr === eraName) {
                              return eras[i];
                          }
                          break;
  
                      case 'NNNN':
                          if (name === eraName) {
                              return eras[i];
                          }
                          break;
  
                      case 'NNNNN':
                          if (narrow === eraName) {
                              return eras[i];
                          }
                          break;
                  }
              } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
                  return eras[i];
              }
          }
      }
  
      function localeErasConvertYear(era, year) {
          var dir = era.since <= era.until ? +1 : -1;
          if (year === undefined) {
              return hooks(era.since).year();
          } else {
              return hooks(era.since).year() + (year - era.offset) * dir;
          }
      }
  
      function getEraName() {
          var i,
              l,
              val,
              eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
              // truncate time
              val = this.clone().startOf('day').valueOf();
  
              if (eras[i].since <= val && val <= eras[i].until) {
                  return eras[i].name;
              }
              if (eras[i].until <= val && val <= eras[i].since) {
                  return eras[i].name;
              }
          }
  
          return '';
      }
  
      function getEraNarrow() {
          var i,
              l,
              val,
              eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
              // truncate time
              val = this.clone().startOf('day').valueOf();
  
              if (eras[i].since <= val && val <= eras[i].until) {
                  return eras[i].narrow;
              }
              if (eras[i].until <= val && val <= eras[i].since) {
                  return eras[i].narrow;
              }
          }
  
          return '';
      }
  
      function getEraAbbr() {
          var i,
              l,
              val,
              eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
              // truncate time
              val = this.clone().startOf('day').valueOf();
  
              if (eras[i].since <= val && val <= eras[i].until) {
                  return eras[i].abbr;
              }
              if (eras[i].until <= val && val <= eras[i].since) {
                  return eras[i].abbr;
              }
          }
  
          return '';
      }
  
      function getEraYear() {
          var i,
              l,
              dir,
              val,
              eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
              dir = eras[i].since <= eras[i].until ? +1 : -1;
  
              // truncate time
              val = this.clone().startOf('day').valueOf();
  
              if (
                  (eras[i].since <= val && val <= eras[i].until) ||
                  (eras[i].until <= val && val <= eras[i].since)
              ) {
                  return (
                      (this.year() - hooks(eras[i].since).year()) * dir +
                      eras[i].offset
                  );
              }
          }
  
          return this.year();
      }
  
      function erasNameRegex(isStrict) {
          if (!hasOwnProp(this, '_erasNameRegex')) {
              computeErasParse.call(this);
          }
          return isStrict ? this._erasNameRegex : this._erasRegex;
      }
  
      function erasAbbrRegex(isStrict) {
          if (!hasOwnProp(this, '_erasAbbrRegex')) {
              computeErasParse.call(this);
          }
          return isStrict ? this._erasAbbrRegex : this._erasRegex;
      }
  
      function erasNarrowRegex(isStrict) {
          if (!hasOwnProp(this, '_erasNarrowRegex')) {
              computeErasParse.call(this);
          }
          return isStrict ? this._erasNarrowRegex : this._erasRegex;
      }
  
      function matchEraAbbr(isStrict, locale) {
          return locale.erasAbbrRegex(isStrict);
      }
  
      function matchEraName(isStrict, locale) {
          return locale.erasNameRegex(isStrict);
      }
  
      function matchEraNarrow(isStrict, locale) {
          return locale.erasNarrowRegex(isStrict);
      }
  
      function matchEraYearOrdinal(isStrict, locale) {
          return locale._eraYearOrdinalRegex || matchUnsigned;
      }
  
      function computeErasParse() {
          var abbrPieces = [],
              namePieces = [],
              narrowPieces = [],
              mixedPieces = [],
              i,
              l,
              eras = this.eras();
  
          for (i = 0, l = eras.length; i < l; ++i) {
              namePieces.push(regexEscape(eras[i].name));
              abbrPieces.push(regexEscape(eras[i].abbr));
              narrowPieces.push(regexEscape(eras[i].narrow));
  
              mixedPieces.push(regexEscape(eras[i].name));
              mixedPieces.push(regexEscape(eras[i].abbr));
              mixedPieces.push(regexEscape(eras[i].narrow));
          }
  
          this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
          this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
          this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
          this._erasNarrowRegex = new RegExp(
              '^(' + narrowPieces.join('|') + ')',
              'i'
          );
      }
  
      // FORMATTING
  
      addFormatToken(0, ['gg', 2], 0, function () {
          return this.weekYear() % 100;
      });
  
      addFormatToken(0, ['GG', 2], 0, function () {
          return this.isoWeekYear() % 100;
      });
  
      function addWeekYearFormatToken(token, getter) {
          addFormatToken(0, [token, token.length], 0, getter);
      }
  
      addWeekYearFormatToken('gggg', 'weekYear');
      addWeekYearFormatToken('ggggg', 'weekYear');
      addWeekYearFormatToken('GGGG', 'isoWeekYear');
      addWeekYearFormatToken('GGGGG', 'isoWeekYear');
  
      // ALIASES
  
      addUnitAlias('weekYear', 'gg');
      addUnitAlias('isoWeekYear', 'GG');
  
      // PRIORITY
  
      addUnitPriority('weekYear', 1);
      addUnitPriority('isoWeekYear', 1);
  
      // PARSING
  
      addRegexToken('G', matchSigned);
      addRegexToken('g', matchSigned);
      addRegexToken('GG', match1to2, match2);
      addRegexToken('gg', match1to2, match2);
      addRegexToken('GGGG', match1to4, match4);
      addRegexToken('gggg', match1to4, match4);
      addRegexToken('GGGGG', match1to6, match6);
      addRegexToken('ggggg', match1to6, match6);
  
      addWeekParseToken(
          ['gggg', 'ggggg', 'GGGG', 'GGGGG'],
          function (input, week, config, token) {
              week[token.substr(0, 2)] = toInt(input);
          }
      );
  
      addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
          week[token] = hooks.parseTwoDigitYear(input);
      });
  
      // MOMENTS
  
      function getSetWeekYear(input) {
          return getSetWeekYearHelper.call(
              this,
              input,
              this.week(),
              this.weekday(),
              this.localeData()._week.dow,
              this.localeData()._week.doy
          );
      }
  
      function getSetISOWeekYear(input) {
          return getSetWeekYearHelper.call(
              this,
              input,
              this.isoWeek(),
              this.isoWeekday(),
              1,
              4
          );
      }
  
      function getISOWeeksInYear() {
          return weeksInYear(this.year(), 1, 4);
      }
  
      function getISOWeeksInISOWeekYear() {
          return weeksInYear(this.isoWeekYear(), 1, 4);
      }
  
      function getWeeksInYear() {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
      }
  
      function getWeeksInWeekYear() {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
      }
  
      function getSetWeekYearHelper(input, week, weekday, dow, doy) {
          var weeksTarget;
          if (input == null) {
              return weekOfYear(this, dow, doy).year;
          } else {
              weeksTarget = weeksInYear(input, dow, doy);
              if (week > weeksTarget) {
                  week = weeksTarget;
              }
              return setWeekAll.call(this, input, week, weekday, dow, doy);
          }
      }
  
      function setWeekAll(weekYear, week, weekday, dow, doy) {
          var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
              date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
  
          this.year(date.getUTCFullYear());
          this.month(date.getUTCMonth());
          this.date(date.getUTCDate());
          return this;
      }
  
      // FORMATTING
  
      addFormatToken('Q', 0, 'Qo', 'quarter');
  
      // ALIASES
  
      addUnitAlias('quarter', 'Q');
  
      // PRIORITY
  
      addUnitPriority('quarter', 7);
  
      // PARSING
  
      addRegexToken('Q', match1);
      addParseToken('Q', function (input, array) {
          array[MONTH] = (toInt(input) - 1) * 3;
      });
  
      // MOMENTS
  
      function getSetQuarter(input) {
          return input == null
              ? Math.ceil((this.month() + 1) / 3)
              : this.month((input - 1) * 3 + (this.month() % 3));
      }
  
      // FORMATTING
  
      addFormatToken('D', ['DD', 2], 'Do', 'date');
  
      // ALIASES
  
      addUnitAlias('date', 'D');
  
      // PRIORITY
      addUnitPriority('date', 9);
  
      // PARSING
  
      addRegexToken('D', match1to2);
      addRegexToken('DD', match1to2, match2);
      addRegexToken('Do', function (isStrict, locale) {
          // TODO: Remove "ordinalParse" fallback in next major release.
          return isStrict
              ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
              : locale._dayOfMonthOrdinalParseLenient;
      });
  
      addParseToken(['D', 'DD'], DATE);
      addParseToken('Do', function (input, array) {
          array[DATE] = toInt(input.match(match1to2)[0]);
      });
  
      // MOMENTS
  
      var getSetDayOfMonth = makeGetSet('Date', true);
  
      // FORMATTING
  
      addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');
  
      // ALIASES
  
      addUnitAlias('dayOfYear', 'DDD');
  
      // PRIORITY
      addUnitPriority('dayOfYear', 4);
  
      // PARSING
  
      addRegexToken('DDD', match1to3);
      addRegexToken('DDDD', match3);
      addParseToken(['DDD', 'DDDD'], function (input, array, config) {
          config._dayOfYear = toInt(input);
      });
  
      // HELPERS
  
      // MOMENTS
  
      function getSetDayOfYear(input) {
          var dayOfYear =
              Math.round(
                  (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
              ) + 1;
          return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
      }
  
      // FORMATTING
  
      addFormatToken('m', ['mm', 2], 0, 'minute');
  
      // ALIASES
  
      addUnitAlias('minute', 'm');
  
      // PRIORITY
  
      addUnitPriority('minute', 14);
  
      // PARSING
  
      addRegexToken('m', match1to2);
      addRegexToken('mm', match1to2, match2);
      addParseToken(['m', 'mm'], MINUTE);
  
      // MOMENTS
  
      var getSetMinute = makeGetSet('Minutes', false);
  
      // FORMATTING
  
      addFormatToken('s', ['ss', 2], 0, 'second');
  
      // ALIASES
  
      addUnitAlias('second', 's');
  
      // PRIORITY
  
      addUnitPriority('second', 15);
  
      // PARSING
  
      addRegexToken('s', match1to2);
      addRegexToken('ss', match1to2, match2);
      addParseToken(['s', 'ss'], SECOND);
  
      // MOMENTS
  
      var getSetSecond = makeGetSet('Seconds', false);
  
      // FORMATTING
  
      addFormatToken('S', 0, 0, function () {
          return ~~(this.millisecond() / 100);
      });
  
      addFormatToken(0, ['SS', 2], 0, function () {
          return ~~(this.millisecond() / 10);
      });
  
      addFormatToken(0, ['SSS', 3], 0, 'millisecond');
      addFormatToken(0, ['SSSS', 4], 0, function () {
          return this.millisecond() * 10;
      });
      addFormatToken(0, ['SSSSS', 5], 0, function () {
          return this.millisecond() * 100;
      });
      addFormatToken(0, ['SSSSSS', 6], 0, function () {
          return this.millisecond() * 1000;
      });
      addFormatToken(0, ['SSSSSSS', 7], 0, function () {
          return this.millisecond() * 10000;
      });
      addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
          return this.millisecond() * 100000;
      });
      addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
          return this.millisecond() * 1000000;
      });
  
      // ALIASES
  
      addUnitAlias('millisecond', 'ms');
  
      // PRIORITY
  
      addUnitPriority('millisecond', 16);
  
      // PARSING
  
      addRegexToken('S', match1to3, match1);
      addRegexToken('SS', match1to3, match2);
      addRegexToken('SSS', match1to3, match3);
  
      var token, getSetMillisecond;
      for (token = 'SSSS'; token.length <= 9; token += 'S') {
          addRegexToken(token, matchUnsigned);
      }
  
      function parseMs(input, array) {
          array[MILLISECOND] = toInt(('0.' + input) * 1000);
      }
  
      for (token = 'S'; token.length <= 9; token += 'S') {
          addParseToken(token, parseMs);
      }
  
      getSetMillisecond = makeGetSet('Milliseconds', false);
  
      // FORMATTING
  
      addFormatToken('z', 0, 0, 'zoneAbbr');
      addFormatToken('zz', 0, 0, 'zoneName');
  
      // MOMENTS
  
      function getZoneAbbr() {
          return this._isUTC ? 'UTC' : '';
      }
  
      function getZoneName() {
          return this._isUTC ? 'Coordinated Universal Time' : '';
      }
  
      var proto = Moment.prototype;
  
      proto.add = add;
      proto.calendar = calendar$1;
      proto.clone = clone;
      proto.diff = diff;
      proto.endOf = endOf;
      proto.format = format;
      proto.from = from;
      proto.fromNow = fromNow;
      proto.to = to;
      proto.toNow = toNow;
      proto.get = stringGet;
      proto.invalidAt = invalidAt;
      proto.isAfter = isAfter;
      proto.isBefore = isBefore;
      proto.isBetween = isBetween;
      proto.isSame = isSame;
      proto.isSameOrAfter = isSameOrAfter;
      proto.isSameOrBefore = isSameOrBefore;
      proto.isValid = isValid$2;
      proto.lang = lang;
      proto.locale = locale;
      proto.localeData = localeData;
      proto.max = prototypeMax;
      proto.min = prototypeMin;
      proto.parsingFlags = parsingFlags;
      proto.set = stringSet;
      proto.startOf = startOf;
      proto.subtract = subtract;
      proto.toArray = toArray;
      proto.toObject = toObject;
      proto.toDate = toDate;
      proto.toISOString = toISOString;
      proto.inspect = inspect;
      if (typeof Symbol !== 'undefined' && Symbol.for != null) {
          proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
              return 'Moment<' + this.format() + '>';
          };
      }
      proto.toJSON = toJSON;
      proto.toString = toString;
      proto.unix = unix;
      proto.valueOf = valueOf;
      proto.creationData = creationData;
      proto.eraName = getEraName;
      proto.eraNarrow = getEraNarrow;
      proto.eraAbbr = getEraAbbr;
      proto.eraYear = getEraYear;
      proto.year = getSetYear;
      proto.isLeapYear = getIsLeapYear;
      proto.weekYear = getSetWeekYear;
      proto.isoWeekYear = getSetISOWeekYear;
      proto.quarter = proto.quarters = getSetQuarter;
      proto.month = getSetMonth;
      proto.daysInMonth = getDaysInMonth;
      proto.week = proto.weeks = getSetWeek;
      proto.isoWeek = proto.isoWeeks = getSetISOWeek;
      proto.weeksInYear = getWeeksInYear;
      proto.weeksInWeekYear = getWeeksInWeekYear;
      proto.isoWeeksInYear = getISOWeeksInYear;
      proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
      proto.date = getSetDayOfMonth;
      proto.day = proto.days = getSetDayOfWeek;
      proto.weekday = getSetLocaleDayOfWeek;
      proto.isoWeekday = getSetISODayOfWeek;
      proto.dayOfYear = getSetDayOfYear;
      proto.hour = proto.hours = getSetHour;
      proto.minute = proto.minutes = getSetMinute;
      proto.second = proto.seconds = getSetSecond;
      proto.millisecond = proto.milliseconds = getSetMillisecond;
      proto.utcOffset = getSetOffset;
      proto.utc = setOffsetToUTC;
      proto.local = setOffsetToLocal;
      proto.parseZone = setOffsetToParsedOffset;
      proto.hasAlignedHourOffset = hasAlignedHourOffset;
      proto.isDST = isDaylightSavingTime;
      proto.isLocal = isLocal;
      proto.isUtcOffset = isUtcOffset;
      proto.isUtc = isUtc;
      proto.isUTC = isUtc;
      proto.zoneAbbr = getZoneAbbr;
      proto.zoneName = getZoneName;
      proto.dates = deprecate(
          'dates accessor is deprecated. Use date instead.',
          getSetDayOfMonth
      );
      proto.months = deprecate(
          'months accessor is deprecated. Use month instead',
          getSetMonth
      );
      proto.years = deprecate(
          'years accessor is deprecated. Use year instead',
          getSetYear
      );
      proto.zone = deprecate(
          'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
          getSetZone
      );
      proto.isDSTShifted = deprecate(
          'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
          isDaylightSavingTimeShifted
      );
  
      function createUnix(input) {
          return createLocal(input * 1000);
      }
  
      function createInZone() {
          return createLocal.apply(null, arguments).parseZone();
      }
  
      function preParsePostFormat(string) {
          return string;
      }
  
      var proto$1 = Locale.prototype;
  
      proto$1.calendar = calendar;
      proto$1.longDateFormat = longDateFormat;
      proto$1.invalidDate = invalidDate;
      proto$1.ordinal = ordinal;
      proto$1.preparse = preParsePostFormat;
      proto$1.postformat = preParsePostFormat;
      proto$1.relativeTime = relativeTime;
      proto$1.pastFuture = pastFuture;
      proto$1.set = set;
      proto$1.eras = localeEras;
      proto$1.erasParse = localeErasParse;
      proto$1.erasConvertYear = localeErasConvertYear;
      proto$1.erasAbbrRegex = erasAbbrRegex;
      proto$1.erasNameRegex = erasNameRegex;
      proto$1.erasNarrowRegex = erasNarrowRegex;
  
      proto$1.months = localeMonths;
      proto$1.monthsShort = localeMonthsShort;
      proto$1.monthsParse = localeMonthsParse;
      proto$1.monthsRegex = monthsRegex;
      proto$1.monthsShortRegex = monthsShortRegex;
      proto$1.week = localeWeek;
      proto$1.firstDayOfYear = localeFirstDayOfYear;
      proto$1.firstDayOfWeek = localeFirstDayOfWeek;
  
      proto$1.weekdays = localeWeekdays;
      proto$1.weekdaysMin = localeWeekdaysMin;
      proto$1.weekdaysShort = localeWeekdaysShort;
      proto$1.weekdaysParse = localeWeekdaysParse;
  
      proto$1.weekdaysRegex = weekdaysRegex;
      proto$1.weekdaysShortRegex = weekdaysShortRegex;
      proto$1.weekdaysMinRegex = weekdaysMinRegex;
  
      proto$1.isPM = localeIsPM;
      proto$1.meridiem = localeMeridiem;
  
      function get$1(format, index, field, setter) {
          var locale = getLocale(),
              utc = createUTC().set(setter, index);
          return locale[field](utc, format);
      }
  
      function listMonthsImpl(format, index, field) {
          if (isNumber(format)) {
              index = format;
              format = undefined;
          }
  
          format = format || '';
  
          if (index != null) {
              return get$1(format, index, field, 'month');
          }
  
          var i,
              out = [];
          for (i = 0; i < 12; i++) {
              out[i] = get$1(format, i, field, 'month');
          }
          return out;
      }
  
      // ()
      // (5)
      // (fmt, 5)
      // (fmt)
      // (true)
      // (true, 5)
      // (true, fmt, 5)
      // (true, fmt)
      function listWeekdaysImpl(localeSorted, format, index, field) {
          if (typeof localeSorted === 'boolean') {
              if (isNumber(format)) {
                  index = format;
                  format = undefined;
              }
  
              format = format || '';
          } else {
              format = localeSorted;
              index = format;
              localeSorted = false;
  
              if (isNumber(format)) {
                  index = format;
                  format = undefined;
              }
  
              format = format || '';
          }
  
          var locale = getLocale(),
              shift = localeSorted ? locale._week.dow : 0,
              i,
              out = [];
  
          if (index != null) {
              return get$1(format, (index + shift) % 7, field, 'day');
          }
  
          for (i = 0; i < 7; i++) {
              out[i] = get$1(format, (i + shift) % 7, field, 'day');
          }
          return out;
      }
  
      function listMonths(format, index) {
          return listMonthsImpl(format, index, 'months');
      }
  
      function listMonthsShort(format, index) {
          return listMonthsImpl(format, index, 'monthsShort');
      }
  
      function listWeekdays(localeSorted, format, index) {
          return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
      }
  
      function listWeekdaysShort(localeSorted, format, index) {
          return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
      }
  
      function listWeekdaysMin(localeSorted, format, index) {
          return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
      }
  
      getSetGlobalLocale('en', {
          eras: [
              {
                  since: '0001-01-01',
                  until: +Infinity,
                  offset: 1,
                  name: 'Anno Domini',
                  narrow: 'AD',
                  abbr: 'AD',
              },
              {
                  since: '0000-12-31',
                  until: -Infinity,
                  offset: 1,
                  name: 'Before Christ',
                  narrow: 'BC',
                  abbr: 'BC',
              },
          ],
          dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
          ordinal: function (number) {
              var b = number % 10,
                  output =
                      toInt((number % 100) / 10) === 1
                          ? 'th'
                          : b === 1
                          ? 'st'
                          : b === 2
                          ? 'nd'
                          : b === 3
                          ? 'rd'
                          : 'th';
              return number + output;
          },
      });
  
      // Side effect imports
  
      hooks.lang = deprecate(
          'moment.lang is deprecated. Use moment.locale instead.',
          getSetGlobalLocale
      );
      hooks.langData = deprecate(
          'moment.langData is deprecated. Use moment.localeData instead.',
          getLocale
      );
  
      var mathAbs = Math.abs;
  
      function abs() {
          var data = this._data;
  
          this._milliseconds = mathAbs(this._milliseconds);
          this._days = mathAbs(this._days);
          this._months = mathAbs(this._months);
  
          data.milliseconds = mathAbs(data.milliseconds);
          data.seconds = mathAbs(data.seconds);
          data.minutes = mathAbs(data.minutes);
          data.hours = mathAbs(data.hours);
          data.months = mathAbs(data.months);
          data.years = mathAbs(data.years);
  
          return this;
      }
  
      function addSubtract$1(duration, input, value, direction) {
          var other = createDuration(input, value);
  
          duration._milliseconds += direction * other._milliseconds;
          duration._days += direction * other._days;
          duration._months += direction * other._months;
  
          return duration._bubble();
      }
  
      // supports only 2.0-style add(1, 's') or add(duration)
      function add$1(input, value) {
          return addSubtract$1(this, input, value, 1);
      }
  
      // supports only 2.0-style subtract(1, 's') or subtract(duration)
      function subtract$1(input, value) {
          return addSubtract$1(this, input, value, -1);
      }
  
      function absCeil(number) {
          if (number < 0) {
              return Math.floor(number);
          } else {
              return Math.ceil(number);
          }
      }
  
      function bubble() {
          var milliseconds = this._milliseconds,
              days = this._days,
              months = this._months,
              data = this._data,
              seconds,
              minutes,
              hours,
              years,
              monthsFromDays;
  
          // if we have a mix of positive and negative values, bubble down first
          // check: https://github.com/moment/moment/issues/2166
          if (
              !(
                  (milliseconds >= 0 && days >= 0 && months >= 0) ||
                  (milliseconds <= 0 && days <= 0 && months <= 0)
              )
          ) {
              milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
              days = 0;
              months = 0;
          }
  
          // The following code bubbles up values, see the tests for
          // examples of what that means.
          data.milliseconds = milliseconds % 1000;
  
          seconds = absFloor(milliseconds / 1000);
          data.seconds = seconds % 60;
  
          minutes = absFloor(seconds / 60);
          data.minutes = minutes % 60;
  
          hours = absFloor(minutes / 60);
          data.hours = hours % 24;
  
          days += absFloor(hours / 24);
  
          // convert days to months
          monthsFromDays = absFloor(daysToMonths(days));
          months += monthsFromDays;
          days -= absCeil(monthsToDays(monthsFromDays));
  
          // 12 months -> 1 year
          years = absFloor(months / 12);
          months %= 12;
  
          data.days = days;
          data.months = months;
          data.years = years;
  
          return this;
      }
  
      function daysToMonths(days) {
          // 400 years have 146097 days (taking into account leap year rules)
          // 400 years have 12 months === 4800
          return (days * 4800) / 146097;
      }
  
      function monthsToDays(months) {
          // the reverse of daysToMonths
          return (months * 146097) / 4800;
      }
  
      function as(units) {
          if (!this.isValid()) {
              return NaN;
          }
          var days,
              months,
              milliseconds = this._milliseconds;
  
          units = normalizeUnits(units);
  
          if (units === 'month' || units === 'quarter' || units === 'year') {
              days = this._days + milliseconds / 864e5;
              months = this._months + daysToMonths(days);
              switch (units) {
                  case 'month':
                      return months;
                  case 'quarter':
                      return months / 3;
                  case 'year':
                      return months / 12;
              }
          } else {
              // handle milliseconds separately because of floating point math errors (issue #1867)
              days = this._days + Math.round(monthsToDays(this._months));
              switch (units) {
                  case 'week':
                      return days / 7 + milliseconds / 6048e5;
                  case 'day':
                      return days + milliseconds / 864e5;
                  case 'hour':
                      return days * 24 + milliseconds / 36e5;
                  case 'minute':
                      return days * 1440 + milliseconds / 6e4;
                  case 'second':
                      return days * 86400 + milliseconds / 1000;
                  // Math.floor prevents floating point math errors here
                  case 'millisecond':
                      return Math.floor(days * 864e5) + milliseconds;
                  default:
                      throw new Error('Unknown unit ' + units);
              }
          }
      }
  
      // TODO: Use this.as('ms')?
      function valueOf$1() {
          if (!this.isValid()) {
              return NaN;
          }
          return (
              this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6
          );
      }
  
      function makeAs(alias) {
          return function () {
              return this.as(alias);
          };
      }
  
      var asMilliseconds = makeAs('ms'),
          asSeconds = makeAs('s'),
          asMinutes = makeAs('m'),
          asHours = makeAs('h'),
          asDays = makeAs('d'),
          asWeeks = makeAs('w'),
          asMonths = makeAs('M'),
          asQuarters = makeAs('Q'),
          asYears = makeAs('y');
  
      function clone$1() {
          return createDuration(this);
      }
  
      function get$2(units) {
          units = normalizeUnits(units);
          return this.isValid() ? this[units + 's']() : NaN;
      }
  
      function makeGetter(name) {
          return function () {
              return this.isValid() ? this._data[name] : NaN;
          };
      }
  
      var milliseconds = makeGetter('milliseconds'),
          seconds = makeGetter('seconds'),
          minutes = makeGetter('minutes'),
          hours = makeGetter('hours'),
          days = makeGetter('days'),
          months = makeGetter('months'),
          years = makeGetter('years');
  
      function weeks() {
          return absFloor(this.days() / 7);
      }
  
      var round = Math.round,
          thresholds = {
              ss: 44, // a few seconds to seconds
              s: 45, // seconds to minute
              m: 45, // minutes to hour
              h: 22, // hours to day
              d: 26, // days to month/week
              w: null, // weeks to month
              M: 11, // months to year
          };
  
      // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
      function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
          return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
      }
  
      function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
          var duration = createDuration(posNegDuration).abs(),
              seconds = round(duration.as('s')),
              minutes = round(duration.as('m')),
              hours = round(duration.as('h')),
              days = round(duration.as('d')),
              months = round(duration.as('M')),
              weeks = round(duration.as('w')),
              years = round(duration.as('y')),
              a =
                  (seconds <= thresholds.ss && ['s', seconds]) ||
                  (seconds < thresholds.s && ['ss', seconds]) ||
                  (minutes <= 1 && ['m']) ||
                  (minutes < thresholds.m && ['mm', minutes]) ||
                  (hours <= 1 && ['h']) ||
                  (hours < thresholds.h && ['hh', hours]) ||
                  (days <= 1 && ['d']) ||
                  (days < thresholds.d && ['dd', days]);
  
          if (thresholds.w != null) {
              a =
                  a ||
                  (weeks <= 1 && ['w']) ||
                  (weeks < thresholds.w && ['ww', weeks]);
          }
          a = a ||
              (months <= 1 && ['M']) ||
              (months < thresholds.M && ['MM', months]) ||
              (years <= 1 && ['y']) || ['yy', years];
  
          a[2] = withoutSuffix;
          a[3] = +posNegDuration > 0;
          a[4] = locale;
          return substituteTimeAgo.apply(null, a);
      }
  
      // This function allows you to set the rounding function for relative time strings
      function getSetRelativeTimeRounding(roundingFunction) {
          if (roundingFunction === undefined) {
              return round;
          }
          if (typeof roundingFunction === 'function') {
              round = roundingFunction;
              return true;
          }
          return false;
      }
  
      // This function allows you to set a threshold for relative time strings
      function getSetRelativeTimeThreshold(threshold, limit) {
          if (thresholds[threshold] === undefined) {
              return false;
          }
          if (limit === undefined) {
              return thresholds[threshold];
          }
          thresholds[threshold] = limit;
          if (threshold === 's') {
              thresholds.ss = limit - 1;
          }
          return true;
      }
  
      function humanize(argWithSuffix, argThresholds) {
          if (!this.isValid()) {
              return this.localeData().invalidDate();
          }
  
          var withSuffix = false,
              th = thresholds,
              locale,
              output;
  
          if (typeof argWithSuffix === 'object') {
              argThresholds = argWithSuffix;
              argWithSuffix = false;
          }
          if (typeof argWithSuffix === 'boolean') {
              withSuffix = argWithSuffix;
          }
          if (typeof argThresholds === 'object') {
              th = Object.assign({}, thresholds, argThresholds);
              if (argThresholds.s != null && argThresholds.ss == null) {
                  th.ss = argThresholds.s - 1;
              }
          }
  
          locale = this.localeData();
          output = relativeTime$1(this, !withSuffix, th, locale);
  
          if (withSuffix) {
              output = locale.pastFuture(+this, output);
          }
  
          return locale.postformat(output);
      }
  
      var abs$1 = Math.abs;
  
      function sign(x) {
          return (x > 0) - (x < 0) || +x;
      }
  
      function toISOString$1() {
          // for ISO strings we do not use the normal bubbling rules:
          //  * milliseconds bubble up until they become hours
          //  * days do not bubble at all
          //  * months bubble up until they become years
          // This is because there is no context-free conversion between hours and days
          // (think of clock changes)
          // and also not between days and months (28-31 days per month)
          if (!this.isValid()) {
              return this.localeData().invalidDate();
          }
  
          var seconds = abs$1(this._milliseconds) / 1000,
              days = abs$1(this._days),
              months = abs$1(this._months),
              minutes,
              hours,
              years,
              s,
              total = this.asSeconds(),
              totalSign,
              ymSign,
              daysSign,
              hmsSign;
  
          if (!total) {
              // this is the same as C#'s (Noda) and python (isodate)...
              // but not other JS (goog.date)
              return 'P0D';
          }
  
          // 3600 seconds -> 60 minutes -> 1 hour
          minutes = absFloor(seconds / 60);
          hours = absFloor(minutes / 60);
          seconds %= 60;
          minutes %= 60;
  
          // 12 months -> 1 year
          years = absFloor(months / 12);
          months %= 12;
  
          // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
          s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
  
          totalSign = total < 0 ? '-' : '';
          ymSign = sign(this._months) !== sign(total) ? '-' : '';
          daysSign = sign(this._days) !== sign(total) ? '-' : '';
          hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';
  
          return (
              totalSign +
              'P' +
              (years ? ymSign + years + 'Y' : '') +
              (months ? ymSign + months + 'M' : '') +
              (days ? daysSign + days + 'D' : '') +
              (hours || minutes || seconds ? 'T' : '') +
              (hours ? hmsSign + hours + 'H' : '') +
              (minutes ? hmsSign + minutes + 'M' : '') +
              (seconds ? hmsSign + s + 'S' : '')
          );
      }
  
      var proto$2 = Duration.prototype;
  
      proto$2.isValid = isValid$1;
      proto$2.abs = abs;
      proto$2.add = add$1;
      proto$2.subtract = subtract$1;
      proto$2.as = as;
      proto$2.asMilliseconds = asMilliseconds;
      proto$2.asSeconds = asSeconds;
      proto$2.asMinutes = asMinutes;
      proto$2.asHours = asHours;
      proto$2.asDays = asDays;
      proto$2.asWeeks = asWeeks;
      proto$2.asMonths = asMonths;
      proto$2.asQuarters = asQuarters;
      proto$2.asYears = asYears;
      proto$2.valueOf = valueOf$1;
      proto$2._bubble = bubble;
      proto$2.clone = clone$1;
      proto$2.get = get$2;
      proto$2.milliseconds = milliseconds;
      proto$2.seconds = seconds;
      proto$2.minutes = minutes;
      proto$2.hours = hours;
      proto$2.days = days;
      proto$2.weeks = weeks;
      proto$2.months = months;
      proto$2.years = years;
      proto$2.humanize = humanize;
      proto$2.toISOString = toISOString$1;
      proto$2.toString = toISOString$1;
      proto$2.toJSON = toISOString$1;
      proto$2.locale = locale;
      proto$2.localeData = localeData;
  
      proto$2.toIsoString = deprecate(
          'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
          toISOString$1
      );
      proto$2.lang = lang;
  
      // FORMATTING
  
      addFormatToken('X', 0, 0, 'unix');
      addFormatToken('x', 0, 0, 'valueOf');
  
      // PARSING
  
      addRegexToken('x', matchSigned);
      addRegexToken('X', matchTimestamp);
      addParseToken('X', function (input, array, config) {
          config._d = new Date(parseFloat(input) * 1000);
      });
      addParseToken('x', function (input, array, config) {
          config._d = new Date(toInt(input));
      });
  
      //! moment.js
  
      hooks.version = '2.29.4';
  
      setHookCallback(createLocal);
  
      hooks.fn = proto;
      hooks.min = min;
      hooks.max = max;
      hooks.now = now;
      hooks.utc = createUTC;
      hooks.unix = createUnix;
      hooks.months = listMonths;
      hooks.isDate = isDate;
      hooks.locale = getSetGlobalLocale;
      hooks.invalid = createInvalid;
      hooks.duration = createDuration;
      hooks.isMoment = isMoment;
      hooks.weekdays = listWeekdays;
      hooks.parseZone = createInZone;
      hooks.localeData = getLocale;
      hooks.isDuration = isDuration;
      hooks.monthsShort = listMonthsShort;
      hooks.weekdaysMin = listWeekdaysMin;
      hooks.defineLocale = defineLocale;
      hooks.updateLocale = updateLocale;
      hooks.locales = listLocales;
      hooks.weekdaysShort = listWeekdaysShort;
      hooks.normalizeUnits = normalizeUnits;
      hooks.relativeTimeRounding = getSetRelativeTimeRounding;
      hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
      hooks.calendarFormat = getCalendarFormat;
      hooks.prototype = proto;
  
      // currently HTML5 input type only supports 24-hour formats
      hooks.HTML5_FMT = {
          DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
          DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
          DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
          DATE: 'YYYY-MM-DD', // <input type="date" />
          TIME: 'HH:mm', // <input type="time" />
          TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
          TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
          WEEK: 'GGGG-[W]WW', // <input type="week" />
          MONTH: 'YYYY-MM', // <input type="month" />
      };
  
      return hooks;
  
  })));
  
  },{}],4:[function(require,module,exports){
  var _ = require("underscore");
  var gimage = require("google-image-chart").charts;
  var moment = require("moment");
  
  var timeseries = function (data, options) {
    /*
      Data Format:
      [
        [Date Object, value],
        [Date Object, value]
      ]
    */
    this.options = _.extend({}, options);
  
    this.data = data;
    this.original = data.slice(0);
    this.buffer = [];
    this.saved = [];
  
    return this;
  };
  
  // Output the data
  timeseries.prototype.output = function () {
    return this.data;
  };
  
  // Save the data
  timeseries.prototype.save = function (name, options) {
    options = _.extend(
      {
        color: "AUTO",
      },
      options
    );
  
    this.saved.push({
      name: name,
      color: options.color,
      data: this.data.slice(0),
    });
    return this;
  };
  
  // Chart the data
  timeseries.prototype.chart = function (options) {
    options = _.extend(
      {
        main: false,
        width: 800,
        height: 200,
        bands: [],
        lines: [],
        points: [],
      },
      options
    );
  
    // Google Chart
    var chart = new gimage.line({
      width: options.width,
      height: options.height,
      bands: options.bands,
      hlines: options.lines,
      points: options.points,
      autoscale: true,
    });
    chart.fromTimeseries(this.data);
    // Include the original data
    if (options.main) {
      chart.fromTimeseries(this.original);
    }
  
    // Include saved data
    _.each(this.saved, function (saved) {
      chart.fromTimeseries(saved.data);
    });
  
    return chart.render();
  };
  
  // Basic utilities: Array fill, data cloning...
  // Returns an array filled with the specified value.
  timeseries.prototype.fill = function (value, n) {
    var array = [];
    var i;
    for (i = 0; i < n; i++) {
      array.push(value);
    }
    return array;
  };
  
  // Returns a clone of the data
  timeseries.prototype.clone = function () {
    var buffer = _.map(this.data, function (point) {
      return [point[0], point[1] * 1];
    });
    return buffer;
  };
  
  // Reset the data to its original dataset
  timeseries.prototype.reset = function () {
    this.data = this.original;
    return this;
  };
  
  // Convert the data to a 1D array
  timeseries.prototype.toArray = function () {
    return _.map(this.data, function (datapoint) {
      return datapoint[1];
    });
  };
  
  // Stats: Min, Max, Mean, Stdev
  timeseries.prototype.min = function () {
    var array = this.toArray();
    return _.min(array);
  };
  timeseries.prototype.max = function () {
    var array = this.toArray();
    return _.max(array);
  };
  timeseries.prototype.mean = function (data) {
    if (!data) {
      var data = this.data;
    }
    var sum = 0;
    var n = 0;
    _.each(data, function (datapoint) {
      sum += datapoint[1];
      n++;
    });
    return sum / n;
  };
  timeseries.prototype.stdev = function (data) {
    if (!data) {
      var data = this.data;
    }
    var sum = 0;
    var n = 0;
    var mean = this.mean();
    _.each(data, function (datapoint) {
      sum += (datapoint[1] - mean) * (datapoint[1] - mean);
      n++;
    });
    return Math.sqrt(sum / n);
  };
  
  // Offet the data
  timeseries.prototype.offset = function (value, data, ret) {
    if (!data) {
      var data = this.data;
    }
    var i;
    var j;
    var l = data.length;
    var sum = 0;
  
    // Reset the buffer
    this.buffer = data.slice(0);
  
    for (i = 0; i < l; i++) {
      this.buffer[i] = [this.buffer[i][0], this.buffer[i][1] + value];
    }
    if (!ret) {
      this.data = this.buffer;
      return this;
    } else {
      return this.buffer;
    }
  };
  
  // Moving Average
  timeseries.prototype.ma = function (options) {
    options = _.extend(
      {
        period: 12,
      },
      options
    );
    var i;
    var j;
    var l = this.data.length;
    var sum = 0;
  
    // Reset the buffer
    this.buffer = [];
  
    // Leave the datapoints [0;period[ intact
    this.buffer = this.data.slice(0, options.period);
  
    for (i = options.period; i < l; i++) {
      sum = 0;
      for (j = options.period; j > 0; j--) {
        sum += this.data[i - j][1];
      }
      this.buffer[i] = [this.data[i][0], sum / options.period];
    }
    this.data = this.buffer;
    return this;
  };
  timeseries.prototype.ema = function (options) {
    options = _.extend(
      {
        period: 12,
      },
      options
    );
    var i;
    var j;
    var l = this.data.length;
    var sum = 0;
  
    // Reset the buffer
    this.buffer = [];
  
    // Leave the datapoints [0;period[ intact
    this.buffer = this.data.slice(0, options.period);
  
    var m = 2 / (options.period + 1); // Multiplier
  
    for (i = options.period; i < l; i++) {
      this.buffer[i] = [
        this.data[i][0],
        (this.data[i][1] - this.data[i - 1][1]) * m + this.data[i - 1][1],
      ];
    }
    this.data = this.buffer;
    return this;
  };
  timeseries.prototype.lwma = function (options) {
    options = _.extend(
      {
        period: 12,
      },
      options
    );
    var i;
    var j;
    var l = this.data.length;
    var sum = 0;
    var n = 0;
  
    // Reset the buffer
    this.buffer = [];
  
    // Leave the datapoints [0;period[ intact
    this.buffer = this.data.slice(0, options.period);
  
    for (i = options.period; i < l; i++) {
      sum = 0;
      n = 0;
      for (j = options.period; j > 0; j--) {
        sum += this.data[i - j][1] * j;
        n += j;
      }
      this.buffer[i] = [this.data[i][0], sum / n];
    }
    this.data = this.buffer;
    return this;
  };
  
  // DSL, iTrend
  timeseries.prototype.dsp_itrend = function (options) {
    // By Ehler
    // http://www.davenewberg.com/Trading/TS_Code/Ehlers_Indicators/iTrend_Ind.html
    options = _.extend(
      {
        alpha: 0.7,
        use: "main",
      },
      options
    );
    var i;
    var j;
    var l = this.data.length;
  
    var trigger = [];
  
    // Reset the buffer
    this.buffer = [];
  
    // Leave the datapoints [0;period[ intact
    this.buffer = this.data.slice(0, 3);
    this.trigger = this.data.slice(0, 3);
  
    for (i = 3; i < l; i++) {
      this.buffer[i] = [
        this.data[i][0],
        (options.alpha - (options.alpha * options.alpha) / 4) * this.data[i][1] +
          0.5 * (options.alpha * options.alpha) * this.data[i - 1][1] -
          (options.alpha - 0.75 * (options.alpha * options.alpha)) *
            this.data[i - 2][1] +
          2 * (1 - options.alpha) * this.buffer[i - 1][1] -
          (1 - options.alpha) * (1 - options.alpha) * this.buffer[i - 2][1],
      ];
      this.trigger[i] = [
        this.data[i][0],
        2 * this.buffer[i][1] - this.buffer[i - 2][1],
      ];
    }
    if (options.use == "trigger") {
      this.data = this.trigger;
    } else {
      this.data = this.buffer;
    }
  
    return this;
  };
  
  // Pixelize - Domain reduction
  timeseries.prototype.pixelize = function (options) {
    options = _.extend(
      {
        grid: 20,
      },
      options
    );
  
    // Calculate the grid values
    var min = this.min();
    var max = this.max();
    var tile = (max - min) / options.grid;
  
    this.buffer = _.map(this.data, function (datapoint) {
      datapoint[1] = Math.round(datapoint[1] / tile) * tile;
      return datapoint;
    });
    this.data = this.buffer;
    return this;
  };
  
  // Iterative Noise Removal
  timeseries.prototype.smoother = function (options) {
    options = _.extend(
      {
        period: 1,
      },
      options
    );
    var i;
    var j;
    var l = this.data.length;
    var sum = 0;
  
    // Reset the buffer
    this.buffer = this.data.slice(0);
  
    for (j = 0; j < options.period; j++) {
      for (i = 3; i < l; i++) {
        this.buffer[i - 1] = [
          this.buffer[i - 1][0],
          (this.buffer[i - 2][1] + this.buffer[i][1]) / 2,
        ];
      }
    }
    this.data = this.buffer;
    return this;
  };
  
  // Extract the noise out of the data
  timeseries.prototype.noiseData = function () {
    var i;
    var j;
    var l = this.data.length;
    var sum = 0;
  
    // Reset the buffer
    this.buffer = [];
  
    for (i = 0; i < l; i++) {
      this.buffer[i] = [this.data[i][0], this.original[i][1] - this.data[i][1]];
    }
    this.data = this.buffer;
    return this;
  };
  
  // Oscillator function
  timeseries.prototype.osc = function () {
    var i;
    var j;
    var l = this.data.length;
    var sum = 0;
  
    // Reset the buffer
    this.buffer = [];
  
    for (i = 0; i < l; i++) {
      if (i <= 1) {
        this.buffer[i] = [this.data[i][0], 0];
      } else {
        this.buffer[i] = [this.data[i][0], this.data[i][1] - this.data[i - 1][1]];
      }
    }
    this.data = this.buffer;
    return this;
  };
  
  // Find the supports and resistances. Wrong algorithm.
  timeseries.prototype.supports = function (options) {
    options = _.extend(
      {
        grid: 40,
        threshold: 10,
      },
      options
    );
  
    // Calculate the grid values
    var min = this.min();
    var max = this.max();
    var tile = (max - min) / options.grid;
  
    var prices = {};
  
    _.each(this.data, function (datapoint) {
      var val = Math.round(datapoint[1] / tile) * tile;
      if (!prices[val]) {
        prices[val] = 0;
      }
      prices[val]++;
    });
  
    var ordered = [];
    var i;
    for (i in prices) {
      ordered.push({
        price: i,
        count: prices[i],
      });
    }
    ordered = ordered.sort(function (a, b) {
      return b.count - a.count;
    });
    ordered = _.filter(ordered, function (support) {
      return support.count >= options.threshold;
    });
    if (options.stats) {
      return ordered;
    }
  
    return _.map(ordered, function (support) {
      return support.price;
    });
  };
  
  // Standardize the data
  timeseries.prototype.standardize = function (options) {
    options = _.extend({}, options);
  
    var stdev = this.stdev();
    var mean = this.mean();
  
    this.data = _.map(this.data, function (datapoint) {
      datapoint[1] = (datapoint[1] - mean) / stdev;
      return datapoint;
    });
  
    return this;
  };
  
  // Slice the data
  timeseries.prototype.slice = function (from, to) {
    if (!from) {
      from = 0;
    }
    if (!to) {
      to = this.data.length - 1;
    }
  
    this.data = this.data.splice(from, to);
  
    return this;
  };
  
  // Find the cycle in the data
  timeseries.prototype.cycle = function (options) {
    options = _.extend(
      {
        period: 10,
        forecast: false,
        forecast_length: 20,
      },
      options
    );
  
    // Smooth the data
    this.smoother(options);
  
    // Copy the data
    var buffer = [];
    var buffer_forecast = [];
  
    var i;
    var j;
    var l = this.data.length;
    for (i = 0; i < 2; i++) {
      buffer[i] = [this.data[i][0], this.data[i][1]];
      buffer_forecast[i] = [this.data[i][0], this.data[i][1]];
    }
    for (i = 2; i < l; i++) {
      // We find the ratio
      var d1 = this.data[i][1] - this.data[i - 1][1];
      var d2 = this.data[i][1] - this.data[i - 2][1];
      var ratio = d1 / d2;
      console.log("ratio", ratio, d1, d2);
      buffer[i] = [this.data[i][0], this.data[i][1]];
  
      buffer_forecast[i] = [
        this.data[i][0],
        this.data[i][1],
        ratio,
        d1 > 0,
        d2 > 0,
      ];
    }
  
    if (options.forecast) {
      for (i = 2; i < l; i++) {
        if (options.forecast == i) {
          // Generate a two cycles sin wave
          var sin = [];
          for (j = 0; j < 720; j++) {
            sin.push(Math.sin((j * Math.PI) / 180));
          }
          console.log("sin", sin);
  
          // Find the closest sin wave
          var MSE = [];
          var minMSE = 10000000;
          var pos;
          for (j = 2; j < 720; j++) {
            var d1 = sin[j] - sin[j - 1];
            var d2 = sin[j] - sin[j - 2];
            var ratio = d1 / d2;
            var mse =
              (ratio - buffer_forecast[i][2]) * (ratio - buffer_forecast[i][2]);
            if (
              mse <= minMSE &&
              d1 > 0 == buffer_forecast[i][3] &&
              d2 > 0 == buffer_forecast[i][3]
            ) {
              minMSE = mse;
              pos = j;
            }
          }
          console.log("minMSE", minMSE, pos);
  
          for (j = 0; j <= options.forecast_length; j++) {
            buffer_forecast[i + j][1] = Math.sin(((pos + j) * Math.PI) / 180);
  
            //buffer_forecast[i+j][1] = sin[pos+j];
  
            console.log(
              "buffer_forecast[" + (i + j) + "]",
              pos + j,
              buffer_forecast[i + j][1]
            );
          }
  
          break;
        }
      }
      this.data = buffer_forecast;
    } else {
      this.data = buffer;
    }
  
    return this;
  };
  
  // Get the outliers from the dataset
  timeseries.prototype.outliers = function (options) {
    // Original code by Professor Hossein Arsham - http://home.ubalt.edu/ntsbarsh/Business-stat/otherapplets/Outlier.htm
    // Re-written for timeseries-analysis.
  
    options = _.extend(
      {
        threshold: 2.5,
      },
      options
    );
  
    // Create a copy of the data;
    this.buffer = this.data.slice(0);
  
    // standardize the data
    this.standardize();
  
    var outliers = [];
  
    _.each(this.data, function (datapoint) {
      if (Math.abs(datapoint[1]) > options.threshold) {
        outliers.push(datapoint);
      }
    });
  
    // restore the data
    this.data = this.buffer.slice(0);
    delete this.buffer;
  
    return outliers;
  };
  
  /* EXPERIMENTAL - AutoRegression Analysis */
  
  timeseries.prototype.regression_forecast = function (options) {
    options = _.extend(
      {
        method: "ARMaxEntropy", // ARMaxEntropy | ARLeastSquare
        // How many sample data points to train,
        // must option.sample < option.start and option.sample >= 3.
        // If growthSampleMode option is true, then it only as starting train sample
        // because it will growth from 0 to last trained data point to be used as sample.
        sample: null,
        // Where data points to start, must option.start > option.sample
        start: null,
        // How many points to forecast.
        n: null,
        // How many degree, must option.n >= 1.
        degree: 5,
        // Is the training only use last x sample data points or up to entire data points?
        growthSampleMode: false,
      },
      options
    );
  
    var l = this.data.length;
  
    // Configure default options.
    options.sample =
      options.sample === null ? Math.round(l * 0.2) : options.sample;
    options.start = options.start === null ? options.sample + 1 : options.start;
    options.n = options.n === null ? l - options.sample : options.n;
  
    // Remove the mean.
    var mean = this.mean();
    this.offset(-mean);
  
    // Temporary working datasets.
    // var backup 	= this.clone();
    var buffer = this.clone();
  
    // MSE atributtes.
    var knownValue = NaN;
    var dataCountMSE = 0;
    var MSE = 0;
  
    // Get different interval of time attribute from dataset.
    var timeDiff = Math.abs(buffer[1][0] - buffer[0][0]);
  
    for (var i = options.start - 1; i < options.start + options.n - 1; i++) {
      // Get sample as training dataset.
      var sample = options.growthSampleMode
        ? buffer.slice(i - options.sample - (i - (options.start - 1)), i)
        : buffer.slice(i - options.sample, i);
  
      // The current dataset when training is only a sample.
      this.data = sample;
  
      // Get the AR coeffs.
      var coeffs = this[options.method]({ degree: options.degree });
  
      // console.log({i, buffer: buffer.map(val=>[val[0], val[1]+mean]), coeffs, data: this.data.map(val=>[val[0], val[1]+mean])})
  
      // Preparing the datapoint to be forecasted.
      if (i < l) {
        knownValue = buffer[i][1] * 1;
        buffer[i][1] = 0;
      } else {
        buffer.push([new Date(new Date(buffer[i - 1][0]) + timeDiff), 0]);
      }
  
      // Get forecasted datapoint.
      for (var j = 0; j < coeffs.length; j++) {
        if (options.method == "ARMaxEntropy") {
          buffer[i][1] -= buffer[i - 1 - j][1] * coeffs[j];
        } else {
          buffer[i][1] += buffer[i - 1 - j][1] * coeffs[j];
        }
      }
  
      // Calculate squared error for MSE.
      // Only based the real observed data initially given.
      // If trained dataset used and got trained again, then it will not truly valid.
      if (i < l) {
        MSE += (knownValue - buffer[i][1]) * (knownValue - buffer[i][1]);
        dataCountMSE += 1;
        // console.log({knownValue, buffer: buffer[i][1], MSE});
      }
    }
  
    // Calculate mean for MSE.
    MSE /= dataCountMSE;
  
    // Replace the current model dataset to trained dataset.
    this.data = buffer;
  
    // Rollback the mean.
    this.offset(mean);
  
    // Get MSE.
    return MSE;
  };
  
  timeseries.prototype.regression_forecast_optimize = function (options) {
    options = _.extend(
      {
        data: this.data,
        maxPct: 0.2,
        maxSampleSize: false,
      },
      options
    );
  
    var l = options.data.length;
  
    var maxSampleSize = Math.round(l * options.maxPct);
    if (options.maxSampleSize) {
      maxSampleSize = Math.min(maxSampleSize, options.maxSampleSize);
    }
  
    var maxDegree = Math.round(maxSampleSize);
    var methods = ["ARMaxEntropy", "ARLeastSquare"];
    var ss; // sample size
    var deg; // degree
    var MSEData = [];
    var i;
    for (i = 0; i < methods.length; i++) {
      for (ss = 3; ss <= maxSampleSize; ss++) {
        for (deg = 1; deg <= maxDegree; deg++) {
          if (deg <= ss) {
            var mse = this.regression_forecast_mse({
              method: methods[i],
              sample: ss,
              degree: deg,
              data: options.data,
            });
            // console.log("Trying method("+methods[i]+") degree("+deg+") sample("+ss+")\t"+mse);
            if (!isNaN(mse)) {
              MSEData.push({
                MSE: mse,
                method: methods[i],
                degree: deg,
                sample: ss,
              });
            }
          } else {
            break;
          }
        }
      }
    }
  
    // Now we sort by MSE
    MSEData = MSEData.sort(function (a, b) {
      return a.MSE - b.MSE;
    });
  
    // console.log("Best Settings: ",MSEData[0]);
  
    // Return the best settings
    return MSEData[0];
  };
  // Calculate the MSE for a forecast, for a set of parameters
  timeseries.prototype.regression_forecast_mse = function (options) {
    options = _.extend(
      {
        method: "ARMaxEntropy", // ARMaxEntropy | ARLeastSquare
        sample: 50,
        degree: 5,
        data: this.data,
      },
      options
    );
  
    var i;
    var j;
    var l = options.data.length;
  
    var mean = this.mean(options.data);
    options.data = this.offset(-mean, options.data, true);
  
    var backup = _.map(options.data, function (item) {
      return [item[0], item[1] * 1];
    });
    var buffer = _.map(options.data, function (item) {
      return [item[0], item[1] * 1];
    });
  
    var MSE = 0;
    var n = 0;
    for (i = options.sample; i < l; i++) {
      var sample = buffer.slice(i - options.sample, i);
      // Get the AR coeffs
      var coeffs = this[options.method]({ degree: options.degree, data: sample });
      var knownValue = buffer[i][1] * 1;
      buffer[i][1] = 0;
      for (j = 0; j < coeffs.length; j++) {
        if (options.method == "ARMaxEntropy") {
          buffer[i][1] -= backup[i - 1 - j][1] * coeffs[j];
        } else {
          buffer[i][1] += backup[i - 1 - j][1] * coeffs[j];
        }
      }
  
      MSE += (knownValue - buffer[i][1]) * (knownValue - buffer[i][1]);
      n++;
    }
  
    MSE /= n;
  
    //this.data = buffer;
  
    // Put back the mean
    //this.offset(mean);
  
    return MSE;
  };
  timeseries.prototype.sliding_regression_forecast = function (options) {
    options = _.extend(
      {
        method: "ARMaxEntropy", // ARMaxEntropy | ARLeastSquare
        sample: 50,
        degree: 5,
      },
      options
    );
  
    var i;
    var j;
    var l = this.data.length;
  
    var mean = this.mean();
    this.offset(-mean);
    var backup = this.clone();
    var buffer = this.clone();
  
    for (i = options.sample; i < l; i++) {
      var sample = buffer.slice(i - options.sample, i);
      // console.log(sample)
      // The current data to process is only a sample of the real data.
      this.data = sample;
      // Get the AR coeffs
      var coeffs = this[options.method]({ degree: options.degree });
      // console.log("coeffs", coeffs)
      buffer[i][1] = 0; //backup[i][1]*1;
      for (j = 0; j < coeffs.length; j++) {
        if (options.method == "ARMaxEntropy") {
          buffer[i][1] -= backup[i - 1 - j][1] * coeffs[j];
        } else {
          buffer[i][1] += backup[i - 1 - j][1] * coeffs[j];
        }
      }
      //buffer[i][1] -
    }
  
    this.data = buffer;
  
    // Put back the mean
    this.offset(mean);
  
    return this;
  };
  
  // Autoregression method: MaxEntropy
  timeseries.prototype.ARMaxEntropy = function (options) {
    // Credits to Alex Sergejew, Nick Hawthorn, Rainer Hegger (1998)
    // Zero-Indexed arrays modification by Paul Sanders (the arrays were One-indexed, FORTRAN style)
    // Ported to Javascript by Julien Loutre for timeseries-analysis, from Paul Bourke's C code.
  
    options = _.extend(
      {
        degree: 5,
        data: this.data,
        intermediates: false, // Generates and returns the intermediates, a 2D array, instead of the coefficients.
      },
      options
    );
  
    var scope = this;
    var i;
    var length = options.data.length;
    var pef = this.fill(0, length);
    var per = this.fill(0, length);
    var ar = this.fill([], options.degree + 1);
    ar = _.map(ar, function (d1) {
      return scope.fill(0, options.degree + 1);
    });
    var h = this.fill(0, length);
    var g = this.fill(0, options.degree + 2);
  
    var t1, t2;
    var n;
  
    var coef = [];
  
    for (n = 1; n <= options.degree; n++) {
      var sn = 0.0;
      var sd = 0.0;
      var j;
      var jj = length - n;
  
      for (j = 0; j < jj; j++) {
        t1 = options.data[j + n][1] + pef[j];
        t2 = options.data[j][1] + per[j];
        sn -= 2.0 * t1 * t2;
        sd += t1 * t1 + t2 * t2;
      }
  
      t1 = g[n] = sn / sd;
      if (n != 1) {
        for (j = 1; j < n; j++) {
          h[j] = g[j] + t1 * g[n - j];
        }
        for (j = 1; j < n; j++) {
          g[j] = h[j];
        }
        jj--;
      }
  
      for (j = 0; j < jj; j++) {
        per[j] += t1 * pef[j] + t1 * options.data[j + n][1];
        pef[j] = pef[j + 1] + t1 * per[j + 1] + t1 * options.data[j + 1][1];
      }
  
      if (options.intermediates) {
        for (j = 0; j < n; j++) {
          ar[n][j] = g[j + 1];
        }
      }
    }
    if (!options.intermediates) {
      for (n = 0; n < options.degree; n++) {
        coef[n] = g[n + 1];
      }
      return coef;
    } else {
      return ar;
    }
  };
  
  // Autoregression method: Least Square
  timeseries.prototype.ARLeastSquare = function (options) {
    // Credits to Rainer Hegger (1998)
    // Ported to Javascript by Julien Loutre for timeseries-analysis, from Paul Bourke's C code.
    var scope = this;
  
    options = _.extend(
      {
        degree: 5,
        data: this.data,
      },
      options
    );
  
    var i, j, k, hj, hi;
    var coefficients = [];
  
    var length = options.data.length;
    var mat = this.fill([], options.degree);
    mat = _.map(mat, function (d1) {
      return scope.fill(0, options.degree);
    });
  
    for (i = 0; i < options.degree; i++) {
      coefficients[i] = 0.0;
      for (j = 0; j < options.degree; j++) {
        mat[i][j] = 0.0;
      }
    }
    for (i = options.degree - 1; i < length - 1; i++) {
      hi = i + 1;
      for (j = 0; j < options.degree; j++) {
        hj = i - j;
        coefficients[j] += options.data[hi][1] * options.data[hj][1];
        for (k = j; k < options.degree; k++) {
          mat[j][k] += options.data[hj][1] * options.data[i - k][1];
        }
      }
    }
    for (i = 0; i < options.degree; i++) {
      coefficients[i] /= length - options.degree;
      for (j = i; j < options.degree; j++) {
        mat[i][j] /= length - options.degree;
        mat[j][i] = mat[i][j];
      }
    }
  
    var solved = this.SolveLE(mat, coefficients, options.degree);
  
    return coefficients;
  };
  
  timeseries.prototype.SolveLE = function (mat, vec, n) {
    // Gaussian elimination solver.
    // Use the coefficients from the Least Square method and make it into the real AR coefficients.
    // Original code by Rainer Hegger (1998). Modified by Paul Bourke.
    // Ported to Javascript by Julien Loutre for timeseries-analysis, from Paul Bourke's C code.
  
    var i, j, k, maxi;
    var vswap = [];
    var mswap = [];
    var hvec = [];
    var max, h, pivot, q;
  
    for (i = 0; i < n - 1; i++) {
      max = Math.abs(mat[i][i]);
      maxi = i;
      for (j = i + 1; j < n; j++) {
        if ((h = Math.abs(mat[j][i])) > max) {
          max = h;
          maxi = j;
        }
      }
      if (maxi != i) {
        mswap = mat[i];
        mat[i] = mat[maxi];
        mat[maxi] = mswap;
        vswap = vec[i];
        vec[i] = vec[maxi];
        vec[maxi] = vswap;
      }
  
      hvec = mat[i];
      pivot = hvec[i];
      if (Math.abs(pivot) == 0.0) {
        // console.log("Singular matrix - fatal!");
        return false;
      }
      for (j = i + 1; j < n; j++) {
        q = -mat[j][i] / pivot;
        mat[j][i] = 0.0;
        for (k = i + 1; k < n; k++) {
          mat[j][k] += q * hvec[k];
        }
        vec[j] += q * vec[i];
      }
    }
    vec[n - 1] /= mat[n - 1][n - 1];
    for (i = n - 2; i >= 0; i--) {
      hvec = mat[i];
      for (j = n - 1; j > i; j--) {
        vec[i] -= hvec[j] * vec[j];
      }
      vec[i] /= hvec[i];
    }
  
    return vec;
  };
  
  // Regression analysis. Will most likely be re-written in the future.
  timeseries.prototype.regression_analysis = function (options) {
    // Original code by Professor Hossein Arsham - http://home.ubalt.edu/ntsbarsh/Business-stat/otherapplets/Trend.htm
    // Re-written for timeseries-analysis.
  
    options = _.extend(
      {
        threshold: 2.5,
      },
      options
    );
  
    var output = {};
  
    var i;
    var j;
    var E = this.data.length; //total number of input spaces
    var N = 0;
    var N1 = 0;
    var N2 = 0;
    var SUM = 0.0;
    var R = 1;
    var Median = 0;
    var theList = new Array();
    var cval = new Array();
    // Run through all the input, add those that have valid values
    var a = 0;
    for (i = 0; i < E; i++) {
      SUM += this.data[i][1];
      theList[a] = this.data[i][1];
      cval[a] = this.data[i][1];
      N++;
      a++;
    }
    //check for insufficient data
    if (N <= 10) {
      console.log("Insufficient data (min 10)");
      return false;
    }
    //sort the list
    for (i = 0; i < theList.length - 1; i++) {
      for (j = i + 1; j < theList.length; j++) {
        if (theList[j] < theList[i]) {
          temp = theList[i];
          theList[i] = theList[j];
          theList[j] = temp;
        }
      }
    }
    //calculate Median
    var aux = 0;
    if (N % 2 == 1) {
      aux = Math.floor(N / 2);
      Median = theList[aux];
    } else {
      Median = (theList[N / 2] + theList[N / 2 - 1]) / 2;
    }
  
    // Do the math
    var x = Median;
    var y = Math.round(100000 * x);
    var z = y / 100000;
    // run through each value and compare it with mean
    for (i = 0; i < E; i++) {
      //check if a value is present and discard the ties
      if (this.data[i][1] != x) {
        //check if it is greater than mean then adds one
        if (this.data[i][1] > x) {
          N1++;
          a = i;
          while (a > 0) {
            a--;
            if (this.data[a][1] != x) {
              break;
            }
          }
          if (this.data[a][1] < x) {
            R++;
          }
        }
        //if it is less than mean
        else if (this.data[i][1] < x) {
          N2++;
          a = i;
          while (a > 0) {
            a--;
            if (this.data[a][1] != x) {
              break;
            }
          }
          if (this.data[a][1] > x) {
            R++;
          }
        }
      }
    }
    //form.NR.value = R;     //value of x or "Scores"
    // What is the runs' statistic? I don't know...
    // Is it http://en.wikipedia.org/wiki/Wald%E2%80%93Wolfowitz_runs_test ?
    output.runs = R;
  
    //compute the expected mean and variance of R
    var EM = 1 + (2 * N1 * N2) / (N1 + N2); //Mean "Mu"
    var SD1 = [2 * N1 * N2 * (2 * N1 * N2 - N1 - N2)];
    var SD2 = Math.pow(N1 + N2, 2);
    var SD3 = N1 + N2 - 1;
    var SD4 = SD1 / (SD2 * SD3); //Standard deviation "Sigma"
    var SD = Math.sqrt(SD4);
    //calculating P value MStyle
    var z1 = (R - EM) / SD;
    var z2 = Math.abs(z1);
    var z = z2;
  
    /* Thanks to Jan de Leeuw for the following function */
    var t = z > 0 ? z : -z;
    var P1 = Math.pow(
      1 +
        t *
          (0.049867347 +
            t *
              (0.0211410061 +
                t *
                  (0.0032776263 +
                    t * (0.0000380036 + t * (0.0000488906 + t * 0.000005383))))),
      -16
    );
    var p = 1 - P1 / 2;
    var t = 1 - (z > 0 ? p : 1 - p); //this is P-value
  
    //rounding the value
    var t1 = Math.round(100000 * t);
    var t2 = t1 / 100000; //this is P-value too
    //form.PV.value = t2;
  
    //determine the conclusion
    // Encoding the trend value from 0 (no trend) to 3 (strong strend evidence)
    if (t2 < 0.01) {
      //form.CON.value = "Strong evidence for trend";
      output.trend = 3;
    } else if (t2 < 0.05 && t2 >= 0.01) {
      //form.CON.value = "Moderate evidence for trend";
      output.trend = 2;
    } else if (t2 < 0.1 && t2 >= 0.05) {
      //form.CON.value = "Suggestive evidence for trend";
      output.trend = 1;
    } else if (t2 >= 0.1) {
      //form.CON.value = "Little or no real evidences for trend";
      output.trend = 0;
    } else {
      //form.CON.value = "Strong evidence for trend";
      output.trend = 3;
    }
  
    //AUTO CORRELATION
    var DWNN = 0;
    var DWND = cval[0] * cval[0];
    for (i = 1; i < cval.length; i++) {
      DWNN = DWNN + (cval[i] - cval[i - 1]) * (cval[i] - cval[i - 1]);
      DWND = DWND + cval[i] * cval[i];
    }
    var DW = DWNN / DWND;
    DW = Math.round(DW * 100000) / 100000;
    //form.DW.value = DW;
    output.durbinWatson = DW;
  
    var Q01 = 2 - 4.6527 / Math.sqrt(N + 2);
    var Q05 = 2 - 3.2897 / Math.sqrt(N + 2);
  
    //determine the conclusion
    // Encode the correlation between 1 and 3
    if (DW >= Q01 || DW <= 4 - Q01) {
      //form.COND.value = "Moderate evidence againt autocorrelation";
      output.autocorrelation = 2;
    } else if (DW >= Q05 && DW <= 4 - Q05) {
      //form.COND.value = "Strong evidences against autocorrelation";
      output.autocorrelation = 3;
    } else {
      //form.COND.value = "Suggestive evidences for autocorrelation";
      output.autocorrelation = 1;
    }
  
    return output;
  };
  
  // Get the Durbin-Watson statistic
  // http://en.wikipedia.org/wiki/Durbin%E2%80%93Watson_statistic
  timeseries.prototype.durbinWatson = function () {
    return this.regression_analysis().durbinWatson;
  };
  
  // Data adapters
  var adapter = {};
  adapter.fromDB = function (data, options) {
    options = _.extend(
      {
        value: "close",
        date: "date",
      },
      options
    );
  
    return _.map(data, function (datapoint) {
      return [
        new Date(datapoint[options.date]).getTime(),
        datapoint[options.value],
      ];
    });
  };
  adapter.fromArray = function (data) {
    return _.map(data, function (datapoint) {
      return [new Date(), datapoint];
    });
  };
  adapter.geometric = function (options) {
    options = _.extend({}, options);
  
    var i;
    var j;
    var output = [];
    for (i = 0; i < 128; i++) {
      output.push([
        new Date(),
        Math.cos(i * 0.01) +
          0.75 * Math.cos(i * 0.03) +
          0.5 * Math.cos(i * 0.05) +
          0.25 * Math.cos(i * 0.11),
      ]);
    }
    return output;
  };
  adapter.complex = function (options) {
    options = _.extend(
      {
        cycles: 10,
        quality: 1,
        inertia: 0,
      },
      options
    );
  
    var i;
    var j;
    var output = [];
    for (i = 0; i < options.cycles; i++) {
      for (j = 0; j < 360; j += options.quality) {
        output.push([
          new Date(),
          (Math.sin((j * Math.PI) / 180) +
            Math.cos((j * 3 * Math.PI) / 180) -
            Math.sin((j * 2.4 * Math.PI) / 180)) *
            100,
        ]);
        options.quality += options.inertia;
      }
    }
    return output;
  };
  adapter.sin = function (options) {
    options = _.extend(
      {
        cycles: 4,
        quality: 2,
        inertia: 0,
      },
      options
    );
  
    var i;
    var j;
    var output = [];
    for (i = 0; i < options.cycles; i++) {
      for (j = 0; j < 360; j += options.quality) {
        output.push([new Date(), Math.cos((j * Math.PI) / 180) * 100]);
        options.quality += options.inertia;
      }
      console.log("options.quality", options.quality);
    }
    return output;
  };
  adapter.tan = function (options) {
    options = _.extend(
      {
        cycles: 1,
      },
      options
    );
    var i;
    var j;
    var output = [];
    for (i = 0; i < options.cycles; i++) {
      for (j = 0; j < 360; j++) {
        output.push([new Date(), Math.tan((j * Math.PI) / 180)]);
      }
    }
    return output;
  };
  
  exports.main = timeseries;
  exports.adapter = adapter;
  exports.version = "1.0.12";
  
  },{"google-image-chart":2,"moment":3,"underscore":5}],5:[function(require,module,exports){
  (function (global){(function (){
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('underscore', factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (function () {
      var current = global._;
      var exports = global._ = factory();
      exports.noConflict = function () { global._ = current; return exports; };
    }()));
  }(this, (function () {
    //     Underscore.js 1.13.6
    //     https://underscorejs.org
    //     (c) 2009-2022 Jeremy Ashkenas, Julian Gonggrijp, and DocumentCloud and Investigative Reporters & Editors
    //     Underscore may be freely distributed under the MIT license.
  
    // Current version.
    var VERSION = '1.13.6';
  
    // Establish the root object, `window` (`self`) in the browser, `global`
    // on the server, or `this` in some virtual machines. We use `self`
    // instead of `window` for `WebWorker` support.
    var root = (typeof self == 'object' && self.self === self && self) ||
              (typeof global == 'object' && global.global === global && global) ||
              Function('return this')() ||
              {};
  
    // Save bytes in the minified (but not gzipped) version:
    var ArrayProto = Array.prototype, ObjProto = Object.prototype;
    var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;
  
    // Create quick reference variables for speed access to core prototypes.
    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;
  
    // Modern feature detection.
    var supportsArrayBuffer = typeof ArrayBuffer !== 'undefined',
        supportsDataView = typeof DataView !== 'undefined';
  
    // All **ECMAScript 5+** native function implementations that we hope to use
    // are declared here.
    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeCreate = Object.create,
        nativeIsView = supportsArrayBuffer && ArrayBuffer.isView;
  
    // Create references to these builtin functions because we override them.
    var _isNaN = isNaN,
        _isFinite = isFinite;
  
    // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
    var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
    var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
  
    // The largest integer that can be represented exactly.
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  
    // Some functions take a variable number of arguments, or a few expected
    // arguments at the beginning and then a variable number of values to operate
    // on. This helper accumulates all remaining arguments past the function’s
    // argument length (or an explicit `startIndex`), into an array that becomes
    // the last argument. Similar to ES6’s "rest parameter".
    function restArguments(func, startIndex) {
      startIndex = startIndex == null ? func.length - 1 : +startIndex;
      return function() {
        var length = Math.max(arguments.length - startIndex, 0),
            rest = Array(length),
            index = 0;
        for (; index < length; index++) {
          rest[index] = arguments[index + startIndex];
        }
        switch (startIndex) {
          case 0: return func.call(this, rest);
          case 1: return func.call(this, arguments[0], rest);
          case 2: return func.call(this, arguments[0], arguments[1], rest);
        }
        var args = Array(startIndex + 1);
        for (index = 0; index < startIndex; index++) {
          args[index] = arguments[index];
        }
        args[startIndex] = rest;
        return func.apply(this, args);
      };
    }
  
    // Is a given variable an object?
    function isObject(obj) {
      var type = typeof obj;
      return type === 'function' || (type === 'object' && !!obj);
    }
  
    // Is a given value equal to null?
    function isNull(obj) {
      return obj === null;
    }
  
    // Is a given variable undefined?
    function isUndefined(obj) {
      return obj === void 0;
    }
  
    // Is a given value a boolean?
    function isBoolean(obj) {
      return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    }
  
    // Is a given value a DOM element?
    function isElement(obj) {
      return !!(obj && obj.nodeType === 1);
    }
  
    // Internal function for creating a `toString`-based type tester.
    function tagTester(name) {
      var tag = '[object ' + name + ']';
      return function(obj) {
        return toString.call(obj) === tag;
      };
    }
  
    var isString = tagTester('String');
  
    var isNumber = tagTester('Number');
  
    var isDate = tagTester('Date');
  
    var isRegExp = tagTester('RegExp');
  
    var isError = tagTester('Error');
  
    var isSymbol = tagTester('Symbol');
  
    var isArrayBuffer = tagTester('ArrayBuffer');
  
    var isFunction = tagTester('Function');
  
    // Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
    // v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
    var nodelist = root.document && root.document.childNodes;
    if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
      isFunction = function(obj) {
        return typeof obj == 'function' || false;
      };
    }
  
    var isFunction$1 = isFunction;
  
    var hasObjectTag = tagTester('Object');
  
    // In IE 10 - Edge 13, `DataView` has string tag `'[object Object]'`.
    // In IE 11, the most common among them, this problem also applies to
    // `Map`, `WeakMap` and `Set`.
    var hasStringTagBug = (
          supportsDataView && hasObjectTag(new DataView(new ArrayBuffer(8)))
        ),
        isIE11 = (typeof Map !== 'undefined' && hasObjectTag(new Map));
  
    var isDataView = tagTester('DataView');
  
    // In IE 10 - Edge 13, we need a different heuristic
    // to determine whether an object is a `DataView`.
    function ie10IsDataView(obj) {
      return obj != null && isFunction$1(obj.getInt8) && isArrayBuffer(obj.buffer);
    }
  
    var isDataView$1 = (hasStringTagBug ? ie10IsDataView : isDataView);
  
    // Is a given value an array?
    // Delegates to ECMA5's native `Array.isArray`.
    var isArray = nativeIsArray || tagTester('Array');
  
    // Internal function to check whether `key` is an own property name of `obj`.
    function has$1(obj, key) {
      return obj != null && hasOwnProperty.call(obj, key);
    }
  
    var isArguments = tagTester('Arguments');
  
    // Define a fallback version of the method in browsers (ahem, IE < 9), where
    // there isn't any inspectable "Arguments" type.
    (function() {
      if (!isArguments(arguments)) {
        isArguments = function(obj) {
          return has$1(obj, 'callee');
        };
      }
    }());
  
    var isArguments$1 = isArguments;
  
    // Is a given object a finite number?
    function isFinite$1(obj) {
      return !isSymbol(obj) && _isFinite(obj) && !isNaN(parseFloat(obj));
    }
  
    // Is the given value `NaN`?
    function isNaN$1(obj) {
      return isNumber(obj) && _isNaN(obj);
    }
  
    // Predicate-generating function. Often useful outside of Underscore.
    function constant(value) {
      return function() {
        return value;
      };
    }
  
    // Common internal logic for `isArrayLike` and `isBufferLike`.
    function createSizePropertyCheck(getSizeProperty) {
      return function(collection) {
        var sizeProperty = getSizeProperty(collection);
        return typeof sizeProperty == 'number' && sizeProperty >= 0 && sizeProperty <= MAX_ARRAY_INDEX;
      }
    }
  
    // Internal helper to generate a function to obtain property `key` from `obj`.
    function shallowProperty(key) {
      return function(obj) {
        return obj == null ? void 0 : obj[key];
      };
    }
  
    // Internal helper to obtain the `byteLength` property of an object.
    var getByteLength = shallowProperty('byteLength');
  
    // Internal helper to determine whether we should spend extensive checks against
    // `ArrayBuffer` et al.
    var isBufferLike = createSizePropertyCheck(getByteLength);
  
    // Is a given value a typed array?
    var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
    function isTypedArray(obj) {
      // `ArrayBuffer.isView` is the most future-proof, so use it when available.
      // Otherwise, fall back on the above regular expression.
      return nativeIsView ? (nativeIsView(obj) && !isDataView$1(obj)) :
                    isBufferLike(obj) && typedArrayPattern.test(toString.call(obj));
    }
  
    var isTypedArray$1 = supportsArrayBuffer ? isTypedArray : constant(false);
  
    // Internal helper to obtain the `length` property of an object.
    var getLength = shallowProperty('length');
  
    // Internal helper to create a simple lookup structure.
    // `collectNonEnumProps` used to depend on `_.contains`, but this led to
    // circular imports. `emulatedSet` is a one-off solution that only works for
    // arrays of strings.
    function emulatedSet(keys) {
      var hash = {};
      for (var l = keys.length, i = 0; i < l; ++i) hash[keys[i]] = true;
      return {
        contains: function(key) { return hash[key] === true; },
        push: function(key) {
          hash[key] = true;
          return keys.push(key);
        }
      };
    }
  
    // Internal helper. Checks `keys` for the presence of keys in IE < 9 that won't
    // be iterated by `for key in ...` and thus missed. Extends `keys` in place if
    // needed.
    function collectNonEnumProps(obj, keys) {
      keys = emulatedSet(keys);
      var nonEnumIdx = nonEnumerableProps.length;
      var constructor = obj.constructor;
      var proto = (isFunction$1(constructor) && constructor.prototype) || ObjProto;
  
      // Constructor is a special case.
      var prop = 'constructor';
      if (has$1(obj, prop) && !keys.contains(prop)) keys.push(prop);
  
      while (nonEnumIdx--) {
        prop = nonEnumerableProps[nonEnumIdx];
        if (prop in obj && obj[prop] !== proto[prop] && !keys.contains(prop)) {
          keys.push(prop);
        }
      }
    }
  
    // Retrieve the names of an object's own properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`.
    function keys(obj) {
      if (!isObject(obj)) return [];
      if (nativeKeys) return nativeKeys(obj);
      var keys = [];
      for (var key in obj) if (has$1(obj, key)) keys.push(key);
      // Ahem, IE < 9.
      if (hasEnumBug) collectNonEnumProps(obj, keys);
      return keys;
    }
  
    // Is a given array, string, or object empty?
    // An "empty" object has no enumerable own-properties.
    function isEmpty(obj) {
      if (obj == null) return true;
      // Skip the more expensive `toString`-based type checks if `obj` has no
      // `.length`.
      var length = getLength(obj);
      if (typeof length == 'number' && (
        isArray(obj) || isString(obj) || isArguments$1(obj)
      )) return length === 0;
      return getLength(keys(obj)) === 0;
    }
  
    // Returns whether an object has a given set of `key:value` pairs.
    function isMatch(object, attrs) {
      var _keys = keys(attrs), length = _keys.length;
      if (object == null) return !length;
      var obj = Object(object);
      for (var i = 0; i < length; i++) {
        var key = _keys[i];
        if (attrs[key] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    }
  
    // If Underscore is called as a function, it returns a wrapped object that can
    // be used OO-style. This wrapper holds altered versions of all functions added
    // through `_.mixin`. Wrapped objects may be chained.
    function _$1(obj) {
      if (obj instanceof _$1) return obj;
      if (!(this instanceof _$1)) return new _$1(obj);
      this._wrapped = obj;
    }
  
    _$1.VERSION = VERSION;
  
    // Extracts the result from a wrapped and chained object.
    _$1.prototype.value = function() {
      return this._wrapped;
    };
  
    // Provide unwrapping proxies for some methods used in engine operations
    // such as arithmetic and JSON stringification.
    _$1.prototype.valueOf = _$1.prototype.toJSON = _$1.prototype.value;
  
    _$1.prototype.toString = function() {
      return String(this._wrapped);
    };
  
    // Internal function to wrap or shallow-copy an ArrayBuffer,
    // typed array or DataView to a new view, reusing the buffer.
    function toBufferView(bufferSource) {
      return new Uint8Array(
        bufferSource.buffer || bufferSource,
        bufferSource.byteOffset || 0,
        getByteLength(bufferSource)
      );
    }
  
    // We use this string twice, so give it a name for minification.
    var tagDataView = '[object DataView]';
  
    // Internal recursive comparison function for `_.isEqual`.
    function eq(a, b, aStack, bStack) {
      // Identical objects are equal. `0 === -0`, but they aren't identical.
      // See the [Harmony `egal` proposal](https://wiki.ecmascript.org/doku.php?id=harmony:egal).
      if (a === b) return a !== 0 || 1 / a === 1 / b;
      // `null` or `undefined` only equal to itself (strict comparison).
      if (a == null || b == null) return false;
      // `NaN`s are equivalent, but non-reflexive.
      if (a !== a) return b !== b;
      // Exhaust primitive checks
      var type = typeof a;
      if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
      return deepEq(a, b, aStack, bStack);
    }
  
    // Internal recursive comparison function for `_.isEqual`.
    function deepEq(a, b, aStack, bStack) {
      // Unwrap any wrapped objects.
      if (a instanceof _$1) a = a._wrapped;
      if (b instanceof _$1) b = b._wrapped;
      // Compare `[[Class]]` names.
      var className = toString.call(a);
      if (className !== toString.call(b)) return false;
      // Work around a bug in IE 10 - Edge 13.
      if (hasStringTagBug && className == '[object Object]' && isDataView$1(a)) {
        if (!isDataView$1(b)) return false;
        className = tagDataView;
      }
      switch (className) {
        // These types are compared by value.
        case '[object RegExp]':
          // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
        case '[object String]':
          // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
          // equivalent to `new String("5")`.
          return '' + a === '' + b;
        case '[object Number]':
          // `NaN`s are equivalent, but non-reflexive.
          // Object(NaN) is equivalent to NaN.
          if (+a !== +a) return +b !== +b;
          // An `egal` comparison is performed for other numeric values.
          return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
          // Coerce dates and booleans to numeric primitive values. Dates are compared by their
          // millisecond representations. Note that invalid dates with millisecond representations
          // of `NaN` are not equivalent.
          return +a === +b;
        case '[object Symbol]':
          return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
        case '[object ArrayBuffer]':
        case tagDataView:
          // Coerce to typed array so we can fall through.
          return deepEq(toBufferView(a), toBufferView(b), aStack, bStack);
      }
  
      var areArrays = className === '[object Array]';
      if (!areArrays && isTypedArray$1(a)) {
          var byteLength = getByteLength(a);
          if (byteLength !== getByteLength(b)) return false;
          if (a.buffer === b.buffer && a.byteOffset === b.byteOffset) return true;
          areArrays = true;
      }
      if (!areArrays) {
        if (typeof a != 'object' || typeof b != 'object') return false;
  
        // Objects with different constructors are not equivalent, but `Object`s or `Array`s
        // from different frames are.
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(isFunction$1(aCtor) && aCtor instanceof aCtor &&
                                 isFunction$1(bCtor) && bCtor instanceof bCtor)
                            && ('constructor' in a && 'constructor' in b)) {
          return false;
        }
      }
      // Assume equality for cyclic structures. The algorithm for detecting cyclic
      // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
  
      // Initializing stack of traversed objects.
      // It's done here since we only need them for objects and arrays comparison.
      aStack = aStack || [];
      bStack = bStack || [];
      var length = aStack.length;
      while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        if (aStack[length] === a) return bStack[length] === b;
      }
  
      // Add the first object to the stack of traversed objects.
      aStack.push(a);
      bStack.push(b);
  
      // Recursively compare objects and arrays.
      if (areArrays) {
        // Compare array lengths to determine if a deep comparison is necessary.
        length = a.length;
        if (length !== b.length) return false;
        // Deep compare the contents, ignoring non-numeric properties.
        while (length--) {
          if (!eq(a[length], b[length], aStack, bStack)) return false;
        }
      } else {
        // Deep compare objects.
        var _keys = keys(a), key;
        length = _keys.length;
        // Ensure that both objects contain the same number of properties before comparing deep equality.
        if (keys(b).length !== length) return false;
        while (length--) {
          // Deep compare each member
          key = _keys[length];
          if (!(has$1(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
        }
      }
      // Remove the first object from the stack of traversed objects.
      aStack.pop();
      bStack.pop();
      return true;
    }
  
    // Perform a deep comparison to check if two objects are equal.
    function isEqual(a, b) {
      return eq(a, b);
    }
  
    // Retrieve all the enumerable property names of an object.
    function allKeys(obj) {
      if (!isObject(obj)) return [];
      var keys = [];
      for (var key in obj) keys.push(key);
      // Ahem, IE < 9.
      if (hasEnumBug) collectNonEnumProps(obj, keys);
      return keys;
    }
  
    // Since the regular `Object.prototype.toString` type tests don't work for
    // some types in IE 11, we use a fingerprinting heuristic instead, based
    // on the methods. It's not great, but it's the best we got.
    // The fingerprint method lists are defined below.
    function ie11fingerprint(methods) {
      var length = getLength(methods);
      return function(obj) {
        if (obj == null) return false;
        // `Map`, `WeakMap` and `Set` have no enumerable keys.
        var keys = allKeys(obj);
        if (getLength(keys)) return false;
        for (var i = 0; i < length; i++) {
          if (!isFunction$1(obj[methods[i]])) return false;
        }
        // If we are testing against `WeakMap`, we need to ensure that
        // `obj` doesn't have a `forEach` method in order to distinguish
        // it from a regular `Map`.
        return methods !== weakMapMethods || !isFunction$1(obj[forEachName]);
      };
    }
  
    // In the interest of compact minification, we write
    // each string in the fingerprints only once.
    var forEachName = 'forEach',
        hasName = 'has',
        commonInit = ['clear', 'delete'],
        mapTail = ['get', hasName, 'set'];
  
    // `Map`, `WeakMap` and `Set` each have slightly different
    // combinations of the above sublists.
    var mapMethods = commonInit.concat(forEachName, mapTail),
        weakMapMethods = commonInit.concat(mapTail),
        setMethods = ['add'].concat(commonInit, forEachName, hasName);
  
    var isMap = isIE11 ? ie11fingerprint(mapMethods) : tagTester('Map');
  
    var isWeakMap = isIE11 ? ie11fingerprint(weakMapMethods) : tagTester('WeakMap');
  
    var isSet = isIE11 ? ie11fingerprint(setMethods) : tagTester('Set');
  
    var isWeakSet = tagTester('WeakSet');
  
    // Retrieve the values of an object's properties.
    function values(obj) {
      var _keys = keys(obj);
      var length = _keys.length;
      var values = Array(length);
      for (var i = 0; i < length; i++) {
        values[i] = obj[_keys[i]];
      }
      return values;
    }
  
    // Convert an object into a list of `[key, value]` pairs.
    // The opposite of `_.object` with one argument.
    function pairs(obj) {
      var _keys = keys(obj);
      var length = _keys.length;
      var pairs = Array(length);
      for (var i = 0; i < length; i++) {
        pairs[i] = [_keys[i], obj[_keys[i]]];
      }
      return pairs;
    }
  
    // Invert the keys and values of an object. The values must be serializable.
    function invert(obj) {
      var result = {};
      var _keys = keys(obj);
      for (var i = 0, length = _keys.length; i < length; i++) {
        result[obj[_keys[i]]] = _keys[i];
      }
      return result;
    }
  
    // Return a sorted list of the function names available on the object.
    function functions(obj) {
      var names = [];
      for (var key in obj) {
        if (isFunction$1(obj[key])) names.push(key);
      }
      return names.sort();
    }
  
    // An internal function for creating assigner functions.
    function createAssigner(keysFunc, defaults) {
      return function(obj) {
        var length = arguments.length;
        if (defaults) obj = Object(obj);
        if (length < 2 || obj == null) return obj;
        for (var index = 1; index < length; index++) {
          var source = arguments[index],
              keys = keysFunc(source),
              l = keys.length;
          for (var i = 0; i < l; i++) {
            var key = keys[i];
            if (!defaults || obj[key] === void 0) obj[key] = source[key];
          }
        }
        return obj;
      };
    }
  
    // Extend a given object with all the properties in passed-in object(s).
    var extend = createAssigner(allKeys);
  
    // Assigns a given object with all the own properties in the passed-in
    // object(s).
    // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
    var extendOwn = createAssigner(keys);
  
    // Fill in a given object with default properties.
    var defaults = createAssigner(allKeys, true);
  
    // Create a naked function reference for surrogate-prototype-swapping.
    function ctor() {
      return function(){};
    }
  
    // An internal function for creating a new object that inherits from another.
    function baseCreate(prototype) {
      if (!isObject(prototype)) return {};
      if (nativeCreate) return nativeCreate(prototype);
      var Ctor = ctor();
      Ctor.prototype = prototype;
      var result = new Ctor;
      Ctor.prototype = null;
      return result;
    }
  
    // Creates an object that inherits from the given prototype object.
    // If additional properties are provided then they will be added to the
    // created object.
    function create(prototype, props) {
      var result = baseCreate(prototype);
      if (props) extendOwn(result, props);
      return result;
    }
  
    // Create a (shallow-cloned) duplicate of an object.
    function clone(obj) {
      if (!isObject(obj)) return obj;
      return isArray(obj) ? obj.slice() : extend({}, obj);
    }
  
    // Invokes `interceptor` with the `obj` and then returns `obj`.
    // The primary purpose of this method is to "tap into" a method chain, in
    // order to perform operations on intermediate results within the chain.
    function tap(obj, interceptor) {
      interceptor(obj);
      return obj;
    }
  
    // Normalize a (deep) property `path` to array.
    // Like `_.iteratee`, this function can be customized.
    function toPath$1(path) {
      return isArray(path) ? path : [path];
    }
    _$1.toPath = toPath$1;
  
    // Internal wrapper for `_.toPath` to enable minification.
    // Similar to `cb` for `_.iteratee`.
    function toPath(path) {
      return _$1.toPath(path);
    }
  
    // Internal function to obtain a nested property in `obj` along `path`.
    function deepGet(obj, path) {
      var length = path.length;
      for (var i = 0; i < length; i++) {
        if (obj == null) return void 0;
        obj = obj[path[i]];
      }
      return length ? obj : void 0;
    }
  
    // Get the value of the (deep) property on `path` from `object`.
    // If any property in `path` does not exist or if the value is
    // `undefined`, return `defaultValue` instead.
    // The `path` is normalized through `_.toPath`.
    function get(object, path, defaultValue) {
      var value = deepGet(object, toPath(path));
      return isUndefined(value) ? defaultValue : value;
    }
  
    // Shortcut function for checking if an object has a given property directly on
    // itself (in other words, not on a prototype). Unlike the internal `has`
    // function, this public version can also traverse nested properties.
    function has(obj, path) {
      path = toPath(path);
      var length = path.length;
      for (var i = 0; i < length; i++) {
        var key = path[i];
        if (!has$1(obj, key)) return false;
        obj = obj[key];
      }
      return !!length;
    }
  
    // Keep the identity function around for default iteratees.
    function identity(value) {
      return value;
    }
  
    // Returns a predicate for checking whether an object has a given set of
    // `key:value` pairs.
    function matcher(attrs) {
      attrs = extendOwn({}, attrs);
      return function(obj) {
        return isMatch(obj, attrs);
      };
    }
  
    // Creates a function that, when passed an object, will traverse that object’s
    // properties down the given `path`, specified as an array of keys or indices.
    function property(path) {
      path = toPath(path);
      return function(obj) {
        return deepGet(obj, path);
      };
    }
  
    // Internal function that returns an efficient (for current engines) version
    // of the passed-in callback, to be repeatedly applied in other Underscore
    // functions.
    function optimizeCb(func, context, argCount) {
      if (context === void 0) return func;
      switch (argCount == null ? 3 : argCount) {
        case 1: return function(value) {
          return func.call(context, value);
        };
        // The 2-argument case is omitted because we’re not using it.
        case 3: return function(value, index, collection) {
          return func.call(context, value, index, collection);
        };
        case 4: return function(accumulator, value, index, collection) {
          return func.call(context, accumulator, value, index, collection);
        };
      }
      return function() {
        return func.apply(context, arguments);
      };
    }
  
    // An internal function to generate callbacks that can be applied to each
    // element in a collection, returning the desired result — either `_.identity`,
    // an arbitrary callback, a property matcher, or a property accessor.
    function baseIteratee(value, context, argCount) {
      if (value == null) return identity;
      if (isFunction$1(value)) return optimizeCb(value, context, argCount);
      if (isObject(value) && !isArray(value)) return matcher(value);
      return property(value);
    }
  
    // External wrapper for our callback generator. Users may customize
    // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
    // This abstraction hides the internal-only `argCount` argument.
    function iteratee(value, context) {
      return baseIteratee(value, context, Infinity);
    }
    _$1.iteratee = iteratee;
  
    // The function we call internally to generate a callback. It invokes
    // `_.iteratee` if overridden, otherwise `baseIteratee`.
    function cb(value, context, argCount) {
      if (_$1.iteratee !== iteratee) return _$1.iteratee(value, context);
      return baseIteratee(value, context, argCount);
    }
  
    // Returns the results of applying the `iteratee` to each element of `obj`.
    // In contrast to `_.map` it returns an object.
    function mapObject(obj, iteratee, context) {
      iteratee = cb(iteratee, context);
      var _keys = keys(obj),
          length = _keys.length,
          results = {};
      for (var index = 0; index < length; index++) {
        var currentKey = _keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
    }
  
    // Predicate-generating function. Often useful outside of Underscore.
    function noop(){}
  
    // Generates a function for a given object that returns a given property.
    function propertyOf(obj) {
      if (obj == null) return noop;
      return function(path) {
        return get(obj, path);
      };
    }
  
    // Run a function **n** times.
    function times(n, iteratee, context) {
      var accum = Array(Math.max(0, n));
      iteratee = optimizeCb(iteratee, context, 1);
      for (var i = 0; i < n; i++) accum[i] = iteratee(i);
      return accum;
    }
  
    // Return a random integer between `min` and `max` (inclusive).
    function random(min, max) {
      if (max == null) {
        max = min;
        min = 0;
      }
      return min + Math.floor(Math.random() * (max - min + 1));
    }
  
    // A (possibly faster) way to get the current timestamp as an integer.
    var now = Date.now || function() {
      return new Date().getTime();
    };
  
    // Internal helper to generate functions for escaping and unescaping strings
    // to/from HTML interpolation.
    function createEscaper(map) {
      var escaper = function(match) {
        return map[match];
      };
      // Regexes for identifying a key that needs to be escaped.
      var source = '(?:' + keys(map).join('|') + ')';
      var testRegexp = RegExp(source);
      var replaceRegexp = RegExp(source, 'g');
      return function(string) {
        string = string == null ? '' : '' + string;
        return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
      };
    }
  
    // Internal list of HTML entities for escaping.
    var escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '`': '&#x60;'
    };
  
    // Function for escaping strings to HTML interpolation.
    var _escape = createEscaper(escapeMap);
  
    // Internal list of HTML entities for unescaping.
    var unescapeMap = invert(escapeMap);
  
    // Function for unescaping strings from HTML interpolation.
    var _unescape = createEscaper(unescapeMap);
  
    // By default, Underscore uses ERB-style template delimiters. Change the
    // following template settings to use alternative delimiters.
    var templateSettings = _$1.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
    };
  
    // When customizing `_.templateSettings`, if you don't want to define an
    // interpolation, evaluation or escaping regex, we need one that is
    // guaranteed not to match.
    var noMatch = /(.)^/;
  
    // Certain characters need to be escaped so that they can be put into a
    // string literal.
    var escapes = {
      "'": "'",
      '\\': '\\',
      '\r': 'r',
      '\n': 'n',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    };
  
    var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;
  
    function escapeChar(match) {
      return '\\' + escapes[match];
    }
  
    // In order to prevent third-party code injection through
    // `_.templateSettings.variable`, we test it against the following regular
    // expression. It is intentionally a bit more liberal than just matching valid
    // identifiers, but still prevents possible loopholes through defaults or
    // destructuring assignment.
    var bareIdentifier = /^\s*(\w|\$)+\s*$/;
  
    // JavaScript micro-templating, similar to John Resig's implementation.
    // Underscore templating handles arbitrary delimiters, preserves whitespace,
    // and correctly escapes quotes within interpolated code.
    // NB: `oldSettings` only exists for backwards compatibility.
    function template(text, settings, oldSettings) {
      if (!settings && oldSettings) settings = oldSettings;
      settings = defaults({}, settings, _$1.templateSettings);
  
      // Combine delimiters into one regular expression via alternation.
      var matcher = RegExp([
        (settings.escape || noMatch).source,
        (settings.interpolate || noMatch).source,
        (settings.evaluate || noMatch).source
      ].join('|') + '|$', 'g');
  
      // Compile the template source, escaping string literals appropriately.
      var index = 0;
      var source = "__p+='";
      text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
        source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
        index = offset + match.length;
  
        if (escape) {
          source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
        } else if (interpolate) {
          source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
        } else if (evaluate) {
          source += "';\n" + evaluate + "\n__p+='";
        }
  
        // Adobe VMs need the match returned to produce the correct offset.
        return match;
      });
      source += "';\n";
  
      var argument = settings.variable;
      if (argument) {
        // Insure against third-party code injection. (CVE-2021-23358)
        if (!bareIdentifier.test(argument)) throw new Error(
          'variable is not a bare identifier: ' + argument
        );
      } else {
        // If a variable is not specified, place data values in local scope.
        source = 'with(obj||{}){\n' + source + '}\n';
        argument = 'obj';
      }
  
      source = "var __t,__p='',__j=Array.prototype.join," +
        "print=function(){__p+=__j.call(arguments,'');};\n" +
        source + 'return __p;\n';
  
      var render;
      try {
        render = new Function(argument, '_', source);
      } catch (e) {
        e.source = source;
        throw e;
      }
  
      var template = function(data) {
        return render.call(this, data, _$1);
      };
  
      // Provide the compiled source as a convenience for precompilation.
      template.source = 'function(' + argument + '){\n' + source + '}';
  
      return template;
    }
  
    // Traverses the children of `obj` along `path`. If a child is a function, it
    // is invoked with its parent as context. Returns the value of the final
    // child, or `fallback` if any child is undefined.
    function result(obj, path, fallback) {
      path = toPath(path);
      var length = path.length;
      if (!length) {
        return isFunction$1(fallback) ? fallback.call(obj) : fallback;
      }
      for (var i = 0; i < length; i++) {
        var prop = obj == null ? void 0 : obj[path[i]];
        if (prop === void 0) {
          prop = fallback;
          i = length; // Ensure we don't continue iterating.
        }
        obj = isFunction$1(prop) ? prop.call(obj) : prop;
      }
      return obj;
    }
  
    // Generate a unique integer id (unique within the entire client session).
    // Useful for temporary DOM ids.
    var idCounter = 0;
    function uniqueId(prefix) {
      var id = ++idCounter + '';
      return prefix ? prefix + id : id;
    }
  
    // Start chaining a wrapped Underscore object.
    function chain(obj) {
      var instance = _$1(obj);
      instance._chain = true;
      return instance;
    }
  
    // Internal function to execute `sourceFunc` bound to `context` with optional
    // `args`. Determines whether to execute a function as a constructor or as a
    // normal function.
    function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
      if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
      var self = baseCreate(sourceFunc.prototype);
      var result = sourceFunc.apply(self, args);
      if (isObject(result)) return result;
      return self;
    }
  
    // Partially apply a function by creating a version that has had some of its
    // arguments pre-filled, without changing its dynamic `this` context. `_` acts
    // as a placeholder by default, allowing any combination of arguments to be
    // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
    var partial = restArguments(function(func, boundArgs) {
      var placeholder = partial.placeholder;
      var bound = function() {
        var position = 0, length = boundArgs.length;
        var args = Array(length);
        for (var i = 0; i < length; i++) {
          args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
        }
        while (position < arguments.length) args.push(arguments[position++]);
        return executeBound(func, bound, this, this, args);
      };
      return bound;
    });
  
    partial.placeholder = _$1;
  
    // Create a function bound to a given object (assigning `this`, and arguments,
    // optionally).
    var bind = restArguments(function(func, context, args) {
      if (!isFunction$1(func)) throw new TypeError('Bind must be called on a function');
      var bound = restArguments(function(callArgs) {
        return executeBound(func, bound, context, this, args.concat(callArgs));
      });
      return bound;
    });
  
    // Internal helper for collection methods to determine whether a collection
    // should be iterated as an array or as an object.
    // Related: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
    // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
    var isArrayLike = createSizePropertyCheck(getLength);
  
    // Internal implementation of a recursive `flatten` function.
    function flatten$1(input, depth, strict, output) {
      output = output || [];
      if (!depth && depth !== 0) {
        depth = Infinity;
      } else if (depth <= 0) {
        return output.concat(input);
      }
      var idx = output.length;
      for (var i = 0, length = getLength(input); i < length; i++) {
        var value = input[i];
        if (isArrayLike(value) && (isArray(value) || isArguments$1(value))) {
          // Flatten current level of array or arguments object.
          if (depth > 1) {
            flatten$1(value, depth - 1, strict, output);
            idx = output.length;
          } else {
            var j = 0, len = value.length;
            while (j < len) output[idx++] = value[j++];
          }
        } else if (!strict) {
          output[idx++] = value;
        }
      }
      return output;
    }
  
    // Bind a number of an object's methods to that object. Remaining arguments
    // are the method names to be bound. Useful for ensuring that all callbacks
    // defined on an object belong to it.
    var bindAll = restArguments(function(obj, keys) {
      keys = flatten$1(keys, false, false);
      var index = keys.length;
      if (index < 1) throw new Error('bindAll must be passed function names');
      while (index--) {
        var key = keys[index];
        obj[key] = bind(obj[key], obj);
      }
      return obj;
    });
  
    // Memoize an expensive function by storing its results.
    function memoize(func, hasher) {
      var memoize = function(key) {
        var cache = memoize.cache;
        var address = '' + (hasher ? hasher.apply(this, arguments) : key);
        if (!has$1(cache, address)) cache[address] = func.apply(this, arguments);
        return cache[address];
      };
      memoize.cache = {};
      return memoize;
    }
  
    // Delays a function for the given number of milliseconds, and then calls
    // it with the arguments supplied.
    var delay = restArguments(function(func, wait, args) {
      return setTimeout(function() {
        return func.apply(null, args);
      }, wait);
    });
  
    // Defers a function, scheduling it to run after the current call stack has
    // cleared.
    var defer = partial(delay, _$1, 1);
  
    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time. Normally, the throttled function will run
    // as much as it can, without ever going more than once per `wait` duration;
    // but if you'd like to disable the execution on the leading edge, pass
    // `{leading: false}`. To disable execution on the trailing edge, ditto.
    function throttle(func, wait, options) {
      var timeout, context, args, result;
      var previous = 0;
      if (!options) options = {};
  
      var later = function() {
        previous = options.leading === false ? 0 : now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      };
  
      var throttled = function() {
        var _now = now();
        if (!previous && options.leading === false) previous = _now;
        var remaining = wait - (_now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = _now;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
  
      throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
      };
  
      return throttled;
    }
  
    // When a sequence of calls of the returned function ends, the argument
    // function is triggered. The end of a sequence is defined by the `wait`
    // parameter. If `immediate` is passed, the argument function will be
    // triggered at the beginning of the sequence instead of at the end.
    function debounce(func, wait, immediate) {
      var timeout, previous, args, result, context;
  
      var later = function() {
        var passed = now() - previous;
        if (wait > passed) {
          timeout = setTimeout(later, wait - passed);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
          // This check is needed because `func` can recursively invoke `debounced`.
          if (!timeout) args = context = null;
        }
      };
  
      var debounced = restArguments(function(_args) {
        context = this;
        args = _args;
        previous = now();
        if (!timeout) {
          timeout = setTimeout(later, wait);
          if (immediate) result = func.apply(context, args);
        }
        return result;
      });
  
      debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = args = context = null;
      };
  
      return debounced;
    }
  
    // Returns the first function passed as an argument to the second,
    // allowing you to adjust arguments, run code before and after, and
    // conditionally execute the original function.
    function wrap(func, wrapper) {
      return partial(wrapper, func);
    }
  
    // Returns a negated version of the passed-in predicate.
    function negate(predicate) {
      return function() {
        return !predicate.apply(this, arguments);
      };
    }
  
    // Returns a function that is the composition of a list of functions, each
    // consuming the return value of the function that follows.
    function compose() {
      var args = arguments;
      var start = args.length - 1;
      return function() {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--) result = args[i].call(this, result);
        return result;
      };
    }
  
    // Returns a function that will only be executed on and after the Nth call.
    function after(times, func) {
      return function() {
        if (--times < 1) {
          return func.apply(this, arguments);
        }
      };
    }
  
    // Returns a function that will only be executed up to (but not including) the
    // Nth call.
    function before(times, func) {
      var memo;
      return function() {
        if (--times > 0) {
          memo = func.apply(this, arguments);
        }
        if (times <= 1) func = null;
        return memo;
      };
    }
  
    // Returns a function that will be executed at most one time, no matter how
    // often you call it. Useful for lazy initialization.
    var once = partial(before, 2);
  
    // Returns the first key on an object that passes a truth test.
    function findKey(obj, predicate, context) {
      predicate = cb(predicate, context);
      var _keys = keys(obj), key;
      for (var i = 0, length = _keys.length; i < length; i++) {
        key = _keys[i];
        if (predicate(obj[key], key, obj)) return key;
      }
    }
  
    // Internal function to generate `_.findIndex` and `_.findLastIndex`.
    function createPredicateIndexFinder(dir) {
      return function(array, predicate, context) {
        predicate = cb(predicate, context);
        var length = getLength(array);
        var index = dir > 0 ? 0 : length - 1;
        for (; index >= 0 && index < length; index += dir) {
          if (predicate(array[index], index, array)) return index;
        }
        return -1;
      };
    }
  
    // Returns the first index on an array-like that passes a truth test.
    var findIndex = createPredicateIndexFinder(1);
  
    // Returns the last index on an array-like that passes a truth test.
    var findLastIndex = createPredicateIndexFinder(-1);
  
    // Use a comparator function to figure out the smallest index at which
    // an object should be inserted so as to maintain order. Uses binary search.
    function sortedIndex(array, obj, iteratee, context) {
      iteratee = cb(iteratee, context, 1);
      var value = iteratee(obj);
      var low = 0, high = getLength(array);
      while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
      }
      return low;
    }
  
    // Internal function to generate the `_.indexOf` and `_.lastIndexOf` functions.
    function createIndexFinder(dir, predicateFind, sortedIndex) {
      return function(array, item, idx) {
        var i = 0, length = getLength(array);
        if (typeof idx == 'number') {
          if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
          } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
          }
        } else if (sortedIndex && idx && length) {
          idx = sortedIndex(array, item);
          return array[idx] === item ? idx : -1;
        }
        if (item !== item) {
          idx = predicateFind(slice.call(array, i, length), isNaN$1);
          return idx >= 0 ? idx + i : -1;
        }
        for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
          if (array[idx] === item) return idx;
        }
        return -1;
      };
    }
  
    // Return the position of the first occurrence of an item in an array,
    // or -1 if the item is not included in the array.
    // If the array is large and already in sort order, pass `true`
    // for **isSorted** to use binary search.
    var indexOf = createIndexFinder(1, findIndex, sortedIndex);
  
    // Return the position of the last occurrence of an item in an array,
    // or -1 if the item is not included in the array.
    var lastIndexOf = createIndexFinder(-1, findLastIndex);
  
    // Return the first value which passes a truth test.
    function find(obj, predicate, context) {
      var keyFinder = isArrayLike(obj) ? findIndex : findKey;
      var key = keyFinder(obj, predicate, context);
      if (key !== void 0 && key !== -1) return obj[key];
    }
  
    // Convenience version of a common use case of `_.find`: getting the first
    // object containing specific `key:value` pairs.
    function findWhere(obj, attrs) {
      return find(obj, matcher(attrs));
    }
  
    // The cornerstone for collection functions, an `each`
    // implementation, aka `forEach`.
    // Handles raw objects in addition to array-likes. Treats all
    // sparse array-likes as if they were dense.
    function each(obj, iteratee, context) {
      iteratee = optimizeCb(iteratee, context);
      var i, length;
      if (isArrayLike(obj)) {
        for (i = 0, length = obj.length; i < length; i++) {
          iteratee(obj[i], i, obj);
        }
      } else {
        var _keys = keys(obj);
        for (i = 0, length = _keys.length; i < length; i++) {
          iteratee(obj[_keys[i]], _keys[i], obj);
        }
      }
      return obj;
    }
  
    // Return the results of applying the iteratee to each element.
    function map(obj, iteratee, context) {
      iteratee = cb(iteratee, context);
      var _keys = !isArrayLike(obj) && keys(obj),
          length = (_keys || obj).length,
          results = Array(length);
      for (var index = 0; index < length; index++) {
        var currentKey = _keys ? _keys[index] : index;
        results[index] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
    }
  
    // Internal helper to create a reducing function, iterating left or right.
    function createReduce(dir) {
      // Wrap code that reassigns argument variables in a separate function than
      // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
      var reducer = function(obj, iteratee, memo, initial) {
        var _keys = !isArrayLike(obj) && keys(obj),
            length = (_keys || obj).length,
            index = dir > 0 ? 0 : length - 1;
        if (!initial) {
          memo = obj[_keys ? _keys[index] : index];
          index += dir;
        }
        for (; index >= 0 && index < length; index += dir) {
          var currentKey = _keys ? _keys[index] : index;
          memo = iteratee(memo, obj[currentKey], currentKey, obj);
        }
        return memo;
      };
  
      return function(obj, iteratee, memo, context) {
        var initial = arguments.length >= 3;
        return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
      };
    }
  
    // **Reduce** builds up a single result from a list of values, aka `inject`,
    // or `foldl`.
    var reduce = createReduce(1);
  
    // The right-associative version of reduce, also known as `foldr`.
    var reduceRight = createReduce(-1);
  
    // Return all the elements that pass a truth test.
    function filter(obj, predicate, context) {
      var results = [];
      predicate = cb(predicate, context);
      each(obj, function(value, index, list) {
        if (predicate(value, index, list)) results.push(value);
      });
      return results;
    }
  
    // Return all the elements for which a truth test fails.
    function reject(obj, predicate, context) {
      return filter(obj, negate(cb(predicate)), context);
    }
  
    // Determine whether all of the elements pass a truth test.
    function every(obj, predicate, context) {
      predicate = cb(predicate, context);
      var _keys = !isArrayLike(obj) && keys(obj),
          length = (_keys || obj).length;
      for (var index = 0; index < length; index++) {
        var currentKey = _keys ? _keys[index] : index;
        if (!predicate(obj[currentKey], currentKey, obj)) return false;
      }
      return true;
    }
  
    // Determine if at least one element in the object passes a truth test.
    function some(obj, predicate, context) {
      predicate = cb(predicate, context);
      var _keys = !isArrayLike(obj) && keys(obj),
          length = (_keys || obj).length;
      for (var index = 0; index < length; index++) {
        var currentKey = _keys ? _keys[index] : index;
        if (predicate(obj[currentKey], currentKey, obj)) return true;
      }
      return false;
    }
  
    // Determine if the array or object contains a given item (using `===`).
    function contains(obj, item, fromIndex, guard) {
      if (!isArrayLike(obj)) obj = values(obj);
      if (typeof fromIndex != 'number' || guard) fromIndex = 0;
      return indexOf(obj, item, fromIndex) >= 0;
    }
  
    // Invoke a method (with arguments) on every item in a collection.
    var invoke = restArguments(function(obj, path, args) {
      var contextPath, func;
      if (isFunction$1(path)) {
        func = path;
      } else {
        path = toPath(path);
        contextPath = path.slice(0, -1);
        path = path[path.length - 1];
      }
      return map(obj, function(context) {
        var method = func;
        if (!method) {
          if (contextPath && contextPath.length) {
            context = deepGet(context, contextPath);
          }
          if (context == null) return void 0;
          method = context[path];
        }
        return method == null ? method : method.apply(context, args);
      });
    });
  
    // Convenience version of a common use case of `_.map`: fetching a property.
    function pluck(obj, key) {
      return map(obj, property(key));
    }
  
    // Convenience version of a common use case of `_.filter`: selecting only
    // objects containing specific `key:value` pairs.
    function where(obj, attrs) {
      return filter(obj, matcher(attrs));
    }
  
    // Return the maximum element (or element-based computation).
    function max(obj, iteratee, context) {
      var result = -Infinity, lastComputed = -Infinity,
          value, computed;
      if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null)) {
        obj = isArrayLike(obj) ? obj : values(obj);
        for (var i = 0, length = obj.length; i < length; i++) {
          value = obj[i];
          if (value != null && value > result) {
            result = value;
          }
        }
      } else {
        iteratee = cb(iteratee, context);
        each(obj, function(v, index, list) {
          computed = iteratee(v, index, list);
          if (computed > lastComputed || (computed === -Infinity && result === -Infinity)) {
            result = v;
            lastComputed = computed;
          }
        });
      }
      return result;
    }
  
    // Return the minimum element (or element-based computation).
    function min(obj, iteratee, context) {
      var result = Infinity, lastComputed = Infinity,
          value, computed;
      if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null)) {
        obj = isArrayLike(obj) ? obj : values(obj);
        for (var i = 0, length = obj.length; i < length; i++) {
          value = obj[i];
          if (value != null && value < result) {
            result = value;
          }
        }
      } else {
        iteratee = cb(iteratee, context);
        each(obj, function(v, index, list) {
          computed = iteratee(v, index, list);
          if (computed < lastComputed || (computed === Infinity && result === Infinity)) {
            result = v;
            lastComputed = computed;
          }
        });
      }
      return result;
    }
  
    // Safely create a real, live array from anything iterable.
    var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
    function toArray(obj) {
      if (!obj) return [];
      if (isArray(obj)) return slice.call(obj);
      if (isString(obj)) {
        // Keep surrogate pair characters together.
        return obj.match(reStrSymbol);
      }
      if (isArrayLike(obj)) return map(obj, identity);
      return values(obj);
    }
  
    // Sample **n** random values from a collection using the modern version of the
    // [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
    // If **n** is not specified, returns a single random element.
    // The internal `guard` argument allows it to work with `_.map`.
    function sample(obj, n, guard) {
      if (n == null || guard) {
        if (!isArrayLike(obj)) obj = values(obj);
        return obj[random(obj.length - 1)];
      }
      var sample = toArray(obj);
      var length = getLength(sample);
      n = Math.max(Math.min(n, length), 0);
      var last = length - 1;
      for (var index = 0; index < n; index++) {
        var rand = random(index, last);
        var temp = sample[index];
        sample[index] = sample[rand];
        sample[rand] = temp;
      }
      return sample.slice(0, n);
    }
  
    // Shuffle a collection.
    function shuffle(obj) {
      return sample(obj, Infinity);
    }
  
    // Sort the object's values by a criterion produced by an iteratee.
    function sortBy(obj, iteratee, context) {
      var index = 0;
      iteratee = cb(iteratee, context);
      return pluck(map(obj, function(value, key, list) {
        return {
          value: value,
          index: index++,
          criteria: iteratee(value, key, list)
        };
      }).sort(function(left, right) {
        var a = left.criteria;
        var b = right.criteria;
        if (a !== b) {
          if (a > b || a === void 0) return 1;
          if (a < b || b === void 0) return -1;
        }
        return left.index - right.index;
      }), 'value');
    }
  
    // An internal function used for aggregate "group by" operations.
    function group(behavior, partition) {
      return function(obj, iteratee, context) {
        var result = partition ? [[], []] : {};
        iteratee = cb(iteratee, context);
        each(obj, function(value, index) {
          var key = iteratee(value, index, obj);
          behavior(result, value, key);
        });
        return result;
      };
    }
  
    // Groups the object's values by a criterion. Pass either a string attribute
    // to group by, or a function that returns the criterion.
    var groupBy = group(function(result, value, key) {
      if (has$1(result, key)) result[key].push(value); else result[key] = [value];
    });
  
    // Indexes the object's values by a criterion, similar to `_.groupBy`, but for
    // when you know that your index values will be unique.
    var indexBy = group(function(result, value, key) {
      result[key] = value;
    });
  
    // Counts instances of an object that group by a certain criterion. Pass
    // either a string attribute to count by, or a function that returns the
    // criterion.
    var countBy = group(function(result, value, key) {
      if (has$1(result, key)) result[key]++; else result[key] = 1;
    });
  
    // Split a collection into two arrays: one whose elements all pass the given
    // truth test, and one whose elements all do not pass the truth test.
    var partition = group(function(result, value, pass) {
      result[pass ? 0 : 1].push(value);
    }, true);
  
    // Return the number of elements in a collection.
    function size(obj) {
      if (obj == null) return 0;
      return isArrayLike(obj) ? obj.length : keys(obj).length;
    }
  
    // Internal `_.pick` helper function to determine whether `key` is an enumerable
    // property name of `obj`.
    function keyInObj(value, key, obj) {
      return key in obj;
    }
  
    // Return a copy of the object only containing the allowed properties.
    var pick = restArguments(function(obj, keys) {
      var result = {}, iteratee = keys[0];
      if (obj == null) return result;
      if (isFunction$1(iteratee)) {
        if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
        keys = allKeys(obj);
      } else {
        iteratee = keyInObj;
        keys = flatten$1(keys, false, false);
        obj = Object(obj);
      }
      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i];
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
      return result;
    });
  
    // Return a copy of the object without the disallowed properties.
    var omit = restArguments(function(obj, keys) {
      var iteratee = keys[0], context;
      if (isFunction$1(iteratee)) {
        iteratee = negate(iteratee);
        if (keys.length > 1) context = keys[1];
      } else {
        keys = map(flatten$1(keys, false, false), String);
        iteratee = function(value, key) {
          return !contains(keys, key);
        };
      }
      return pick(obj, iteratee, context);
    });
  
    // Returns everything but the last entry of the array. Especially useful on
    // the arguments object. Passing **n** will return all the values in
    // the array, excluding the last N.
    function initial(array, n, guard) {
      return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    }
  
    // Get the first element of an array. Passing **n** will return the first N
    // values in the array. The **guard** check allows it to work with `_.map`.
    function first(array, n, guard) {
      if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
      if (n == null || guard) return array[0];
      return initial(array, array.length - n);
    }
  
    // Returns everything but the first entry of the `array`. Especially useful on
    // the `arguments` object. Passing an **n** will return the rest N values in the
    // `array`.
    function rest(array, n, guard) {
      return slice.call(array, n == null || guard ? 1 : n);
    }
  
    // Get the last element of an array. Passing **n** will return the last N
    // values in the array.
    function last(array, n, guard) {
      if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
      if (n == null || guard) return array[array.length - 1];
      return rest(array, Math.max(0, array.length - n));
    }
  
    // Trim out all falsy values from an array.
    function compact(array) {
      return filter(array, Boolean);
    }
  
    // Flatten out an array, either recursively (by default), or up to `depth`.
    // Passing `true` or `false` as `depth` means `1` or `Infinity`, respectively.
    function flatten(array, depth) {
      return flatten$1(array, depth, false);
    }
  
    // Take the difference between one array and a number of other arrays.
    // Only the elements present in just the first array will remain.
    var difference = restArguments(function(array, rest) {
      rest = flatten$1(rest, true, true);
      return filter(array, function(value){
        return !contains(rest, value);
      });
    });
  
    // Return a version of the array that does not contain the specified value(s).
    var without = restArguments(function(array, otherArrays) {
      return difference(array, otherArrays);
    });
  
    // Produce a duplicate-free version of the array. If the array has already
    // been sorted, you have the option of using a faster algorithm.
    // The faster algorithm will not work with an iteratee if the iteratee
    // is not a one-to-one function, so providing an iteratee will disable
    // the faster algorithm.
    function uniq(array, isSorted, iteratee, context) {
      if (!isBoolean(isSorted)) {
        context = iteratee;
        iteratee = isSorted;
        isSorted = false;
      }
      if (iteratee != null) iteratee = cb(iteratee, context);
      var result = [];
      var seen = [];
      for (var i = 0, length = getLength(array); i < length; i++) {
        var value = array[i],
            computed = iteratee ? iteratee(value, i, array) : value;
        if (isSorted && !iteratee) {
          if (!i || seen !== computed) result.push(value);
          seen = computed;
        } else if (iteratee) {
          if (!contains(seen, computed)) {
            seen.push(computed);
            result.push(value);
          }
        } else if (!contains(result, value)) {
          result.push(value);
        }
      }
      return result;
    }
  
    // Produce an array that contains the union: each distinct element from all of
    // the passed-in arrays.
    var union = restArguments(function(arrays) {
      return uniq(flatten$1(arrays, true, true));
    });
  
    // Produce an array that contains every item shared between all the
    // passed-in arrays.
    function intersection(array) {
      var result = [];
      var argsLength = arguments.length;
      for (var i = 0, length = getLength(array); i < length; i++) {
        var item = array[i];
        if (contains(result, item)) continue;
        var j;
        for (j = 1; j < argsLength; j++) {
          if (!contains(arguments[j], item)) break;
        }
        if (j === argsLength) result.push(item);
      }
      return result;
    }
  
    // Complement of zip. Unzip accepts an array of arrays and groups
    // each array's elements on shared indices.
    function unzip(array) {
      var length = (array && max(array, getLength).length) || 0;
      var result = Array(length);
  
      for (var index = 0; index < length; index++) {
        result[index] = pluck(array, index);
      }
      return result;
    }
  
    // Zip together multiple lists into a single array -- elements that share
    // an index go together.
    var zip = restArguments(unzip);
  
    // Converts lists into objects. Pass either a single array of `[key, value]`
    // pairs, or two parallel arrays of the same length -- one of keys, and one of
    // the corresponding values. Passing by pairs is the reverse of `_.pairs`.
    function object(list, values) {
      var result = {};
      for (var i = 0, length = getLength(list); i < length; i++) {
        if (values) {
          result[list[i]] = values[i];
        } else {
          result[list[i][0]] = list[i][1];
        }
      }
      return result;
    }
  
    // Generate an integer Array containing an arithmetic progression. A port of
    // the native Python `range()` function. See
    // [the Python documentation](https://docs.python.org/library/functions.html#range).
    function range(start, stop, step) {
      if (stop == null) {
        stop = start || 0;
        start = 0;
      }
      if (!step) {
        step = stop < start ? -1 : 1;
      }
  
      var length = Math.max(Math.ceil((stop - start) / step), 0);
      var range = Array(length);
  
      for (var idx = 0; idx < length; idx++, start += step) {
        range[idx] = start;
      }
  
      return range;
    }
  
    // Chunk a single array into multiple arrays, each containing `count` or fewer
    // items.
    function chunk(array, count) {
      if (count == null || count < 1) return [];
      var result = [];
      var i = 0, length = array.length;
      while (i < length) {
        result.push(slice.call(array, i, i += count));
      }
      return result;
    }
  
    // Helper function to continue chaining intermediate results.
    function chainResult(instance, obj) {
      return instance._chain ? _$1(obj).chain() : obj;
    }
  
    // Add your own custom functions to the Underscore object.
    function mixin(obj) {
      each(functions(obj), function(name) {
        var func = _$1[name] = obj[name];
        _$1.prototype[name] = function() {
          var args = [this._wrapped];
          push.apply(args, arguments);
          return chainResult(this, func.apply(_$1, args));
        };
      });
      return _$1;
    }
  
    // Add all mutator `Array` functions to the wrapper.
    each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
      var method = ArrayProto[name];
      _$1.prototype[name] = function() {
        var obj = this._wrapped;
        if (obj != null) {
          method.apply(obj, arguments);
          if ((name === 'shift' || name === 'splice') && obj.length === 0) {
            delete obj[0];
          }
        }
        return chainResult(this, obj);
      };
    });
  
    // Add all accessor `Array` functions to the wrapper.
    each(['concat', 'join', 'slice'], function(name) {
      var method = ArrayProto[name];
      _$1.prototype[name] = function() {
        var obj = this._wrapped;
        if (obj != null) obj = method.apply(obj, arguments);
        return chainResult(this, obj);
      };
    });
  
    // Named Exports
  
    var allExports = {
      __proto__: null,
      VERSION: VERSION,
      restArguments: restArguments,
      isObject: isObject,
      isNull: isNull,
      isUndefined: isUndefined,
      isBoolean: isBoolean,
      isElement: isElement,
      isString: isString,
      isNumber: isNumber,
      isDate: isDate,
      isRegExp: isRegExp,
      isError: isError,
      isSymbol: isSymbol,
      isArrayBuffer: isArrayBuffer,
      isDataView: isDataView$1,
      isArray: isArray,
      isFunction: isFunction$1,
      isArguments: isArguments$1,
      isFinite: isFinite$1,
      isNaN: isNaN$1,
      isTypedArray: isTypedArray$1,
      isEmpty: isEmpty,
      isMatch: isMatch,
      isEqual: isEqual,
      isMap: isMap,
      isWeakMap: isWeakMap,
      isSet: isSet,
      isWeakSet: isWeakSet,
      keys: keys,
      allKeys: allKeys,
      values: values,
      pairs: pairs,
      invert: invert,
      functions: functions,
      methods: functions,
      extend: extend,
      extendOwn: extendOwn,
      assign: extendOwn,
      defaults: defaults,
      create: create,
      clone: clone,
      tap: tap,
      get: get,
      has: has,
      mapObject: mapObject,
      identity: identity,
      constant: constant,
      noop: noop,
      toPath: toPath$1,
      property: property,
      propertyOf: propertyOf,
      matcher: matcher,
      matches: matcher,
      times: times,
      random: random,
      now: now,
      escape: _escape,
      unescape: _unescape,
      templateSettings: templateSettings,
      template: template,
      result: result,
      uniqueId: uniqueId,
      chain: chain,
      iteratee: iteratee,
      partial: partial,
      bind: bind,
      bindAll: bindAll,
      memoize: memoize,
      delay: delay,
      defer: defer,
      throttle: throttle,
      debounce: debounce,
      wrap: wrap,
      negate: negate,
      compose: compose,
      after: after,
      before: before,
      once: once,
      findKey: findKey,
      findIndex: findIndex,
      findLastIndex: findLastIndex,
      sortedIndex: sortedIndex,
      indexOf: indexOf,
      lastIndexOf: lastIndexOf,
      find: find,
      detect: find,
      findWhere: findWhere,
      each: each,
      forEach: each,
      map: map,
      collect: map,
      reduce: reduce,
      foldl: reduce,
      inject: reduce,
      reduceRight: reduceRight,
      foldr: reduceRight,
      filter: filter,
      select: filter,
      reject: reject,
      every: every,
      all: every,
      some: some,
      any: some,
      contains: contains,
      includes: contains,
      include: contains,
      invoke: invoke,
      pluck: pluck,
      where: where,
      max: max,
      min: min,
      shuffle: shuffle,
      sample: sample,
      sortBy: sortBy,
      groupBy: groupBy,
      indexBy: indexBy,
      countBy: countBy,
      partition: partition,
      toArray: toArray,
      size: size,
      pick: pick,
      omit: omit,
      first: first,
      head: first,
      take: first,
      initial: initial,
      last: last,
      rest: rest,
      tail: rest,
      drop: rest,
      compact: compact,
      flatten: flatten,
      without: without,
      uniq: uniq,
      unique: uniq,
      union: union,
      intersection: intersection,
      difference: difference,
      unzip: unzip,
      transpose: unzip,
      zip: zip,
      object: object,
      range: range,
      chunk: chunk,
      mixin: mixin,
      'default': _$1
    };
  
    // Default Export
  
    // Add all of the Underscore functions to the wrapper object.
    var _ = mixin(allExports);
    // Legacy Node.js API.
    _._ = _;
  
    return _;
  
  })));
  
  
  }).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
  },{}]},{},[1]);
  