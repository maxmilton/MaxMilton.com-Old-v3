+++
date        = "2016-10-16T12:00:00+11:00"
title       = "Blood Glucose Conversion mmol/L – mg/dL"
author      = "Max Milton"
email       = "max@wearegenki.com"
tags        = ["nutrition"]
description = "Blood sugar conversion from mmol/L to mg/dL calculator and chart."
aliases     = ["/convert"]
+++

To make blood sugar conversion from mmol/L to mg/dL easy, I've put together a blood glucose conversion calculator and chart. If you're not sure what mmol/L or mg/dL mean, see [unit of measurement]({{< relref "blood-glucose-conversion-mmolL-to-mgdl.md#unit-of-measurement" >}}) below<!--more-->.

## Blood glucose conversion calculator

-----

<div class="row mb-2 flex-items-center text-center">
  <div class="col col-md-3">
    <label for="mmoll" class="lead">mmol/L</label>
    <input type="number" name="mmoll" id="mmoll" class="form-control form-control-lg" step="0.1" min="0" value="5">
  </div>
  <div class="col-1" style="font-size: 2rem; padding-top: 1rem; padding-left: 7px;">
    =
  </div>
  <div class="col col-md-3">
    <label for="mgdl" class="lead">mg/dL</label>
    <input type="number" name="mgdl" id="mgdl" class="form-control form-control-lg" min="0" value="90">
  </div>
</div>

<script>
(function(){
  var mmoll = document.getElementById('mmoll');
  var mgdl = document.getElementById('mgdl');
  var mass = 18.016;

  // Convert from mg/dL to mmol/L
  function getMgdl(){
    mgdl.value = Math.round(mmoll.value * mass);
  };

  // Convert from mmol/L to mg/dL
  function getMmoll(){
    var factor = (mgdl.value < mass) ? 100 : 10;
    mmoll.value = Math.round((mgdl.value / mass) * factor) / factor;
  };

  // Set number to decimal places to one for stepping up/down by 0.1
  mmoll.onfocus = function(){
    mmoll.value = Math.round(mmoll.value * 10) / 10;
    getMgdl();
  };

  mmoll.oninput = getMgdl;
  mgdl.oninput = getMmoll;
}());
</script>

-----

### Conversion formula

`mmol/L = mg/dL ÷ 18.016`

`mg/dL = 18.016 × mmol/L`

※ Note: 180.16 g/mol is the [molar mass](https://en.wikipedia.org/wiki/Molar_mass) of glucose.

## Blood glucose conversion chart

| mmol/L | mg/dL |
|--------|-------|
| 0.06   | 1     |
| 0.28   | 5     |
| 0.56   | 10    |
| 1.0    | 18    |
| 1.5    | 27    |
| 2.0    | 36    |
| 2.2    | 40    |
| 2.5    | 45    |
| 2.8    | 50    |
| 3.0    | 54    |
| 3.3    | 60    |
| 3.9    | 70    |
| 4.0    | 72    |
| 4.4    | 80    |
| 4.7    | 85    |
| 5.0    | 90    |
| 5.6    | 100   |
| 6.0    | 108   |
| 6.1    | 110   |
| 6.7    | 120   |
| 7.0    | 126   |
| 7.2    | 130   |
| 7.5    | 135   |
| 7.8    | 140   |
| 8.0    | 145   |
| 8.3    | 150   |
| 8.9    | 160   |
| 9.0    | 162   |
| 9.4    | 170   |
| 10.0   | 180   |
| 10.5   | 190   |
| 11.0   | 198   |
| 11.1   | 200   |
| 12.0   | 216   |
| 12.5   | 225   |
| 13.9   | 250   |
| 14.4   | 260   |
| 15.0   | 270   |
| 16.0   | 288   |
| 16.7   | 300   |
| 22.2   | 400   |
| 27.8   | 500   |
| 55.5   | 1000  |

## Unit of measurement

### mmol/L

Millimoles per litre, the SI unit (International System of Units) in medicine for measuring concentrations of substances in the blood.

Used in the UK, Canada, Australia, and China.

### mg/dL

Milligrams per decilitre, a unit used in medicine to measure the concentration of substances in the blood. 1 mg/dL equals 0.01 grams per litre (g/L).

Used in the U.S., France, Japan, Israel, and India.
