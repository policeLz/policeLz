<template>
  <div>
    <topNav class="topNav"></topNav>
    <BMap class="bmap"></BMap>
  </div>
</template>

<script>
import topNav from '../../components/nav/topNav'
import BMap from '../../components/BMap/BMap'

export default {
  name: 'Main',
  components: {
    topNav,
    BMap
  }
}
</script>

<style>

.topNav{
  height:80px;
}
</style>
