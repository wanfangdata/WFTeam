<template>
  <div class="calendar-block-graph">
    <svg width="41" height="35">
      <g>
        <rect width="5" height="5" fill="#ebedf0" x="6" y="0"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="12" y="0"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="18" y="0"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="24" y="0"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="30" y="0"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="36" y="0"></rect>
      </g>
      <g>
        <rect width="5" height="5" fill="#ebedf0" x="0" y="6"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="6" y="6"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="12" y="6"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="18" y="6"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="24" y="6"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="30" y="6"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="36" y="6"></rect>
      </g>
      <g>
        <rect width="5" height="5" fill="#ebedf0" x="0" y="12"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="6" y="12"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="12" y="12"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="18" y="12"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="24" y="12"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="30" y="12"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="36" y="12"></rect>
      </g>
      <g>
        <rect width="5" height="5" fill="#ebedf0" x="0" y="18"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="6" y="18"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="12" y="18"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="18" y="18"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="24" y="18"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="30" y="18"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="36" y="18"></rect>
      </g>
      <g>
        <rect width="5" height="5" fill="#ebedf0" x="0" y="24"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="6" y="24"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="12" y="24"></rect>
        <rect width="5" height="5" fill="#ebedf0" x="18" y="24"></rect>
      </g>
    </svg>
  </div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'

export default {
  month: moment().startOf('month'),
  mandays: [
    '2017-08-01'
  ],
  computed: {
    calendarBlocks: function() {
      // 根据月份划分week，记录date、hours

      // 计算前置几个空block
      var fooDaysCount = month.day();
      if (fooDaysCount == 0) {
        fooDaysCount = 6;
      }
      else {
        fooDaysCount = fooDaysCount - 1;
      }

      for (var i = 0; i < fooDaysCount; i++) {
        mandays.shift(undefined);        
      }

      var weeks = _.chunk(mandays, 7);
      console.log(weeks);
      return weeks;
    }
  }
}
</script>

<style>
rect {
  shape-rendering: crispedges;
}
</style>
