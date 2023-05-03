Here's the PHP version of the function:

function calculatePrices($data, $settings) {
  $result = array();
  $analysisPeriod = $settings['analysisPeriod'];
  $currentDate = new DateTime();
  $startDate = new DateTime();
  $startDate->setTimestamp($currentDate->getTimestamp() - ($analysisPeriod * 24 * 60 * 60)); // вычисляем дату начала периода
  
  foreach($data as $item) {
    // Извлекаем год, месяц и день из даты в формате YYYYMMDD
    $copyd = json_encode($item[0]);
    $y = substr($copyd, 0, 4);
    $m = substr($copyd, 4, 2);
    $d = substr($copyd, 6, 2);
    
    // Преобразуем дату из строки в объект DateTime
    $itemDate = new DateTime($y . '-' . $m . '-' . $d);
    
    if ($itemDate >= $startDate && $itemDate <= $currentDate) { // проверяем, что дата попадает в период анализа
      $itemPrice = $item[1];
      $profit = $itemPrice * ($settings['profitPercent'] / 100);
      $minProfit = $itemPrice * ($settings['minProfit'] / 100);
      $lowProfit = $settings['lowProfit'] ? $itemPrice * ($settings['lowProfit'] / 100) : $minProfit;
      $corridorPercent = $settings['corridorPercent'] / 100;
      $sellAlgorithmCoefficient = $settings['sellAlgorithmCoefficient'];
      $buyAlgorithmCoefficient = $settings['buyAlgorithmCoefficient'];
      
      // Расчет цены продажи
      $sellPrice = $itemPrice + $profit;
      if ($sellPrice < $lowProfit) {
        $sellPrice = $lowProfit;
      }
      if ($sellPrice > $itemPrice * (1 + $corridorPercent)) {
        $sellPrice = $itemPrice * (1 + $corridorPercent);
      }
      $sellPrice *= $sellAlgorithmCoefficient;
      
      // Расчет цены покупки
      $buyPrice = $itemPrice - $minProfit;
      if ($buyPrice < $lowProfit) {
        $buyPrice = $lowProfit;
      }
      if ($buyPrice < $itemPrice * (1 - $corridorPercent)) {
        $buyPrice = $itemPrice * (1 - $corridorPercent);
      }
      $buyPrice *= $buyAlgorithmCoefficient;
      
      $result[] = array('sellPrice' => $sellPrice, 'buyPrice' => $buyPrice);
    }
  }
  return $result;
}

And here's an example of how to call the function:

$data =  ... ; // an array of data in the format specified in the comments
$settings = array(
  'analysisPeriod' => 7,
  'profitPercent' => 10,
  'minProfit' => 5,
  'lowProfit' => 2,
  'corridorPercent' => 5,
  'sellAlgorithmCoefficient' => 1.2,
  'buyAlgorithmCoefficient' => 0.8
);

$results = calculatePrices($data, $settings);

// $results is an array of sellPrice/buyPrice pairs calculated by the function.
