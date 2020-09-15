<template>
  <div id="hello"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {
    this.chart1 = echarts.init(document.getElementById("hello"));
    this.chart1.setOption({
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  },
  data() {
    return {
      chart1: null,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#hello { 
  width: 800px;
  height: 600px;
}
</style>
