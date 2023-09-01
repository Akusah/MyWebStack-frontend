<template>
  <!-- 柱状图容器 -->
  <div class="chart-container">
    <div class="chart-options">
      <h2 class="chart-title">网站Top点击量</h2>
      <el-select v-model="value" class="m-2" placeholder="选择查看网站数" @change="updateChart">
        <el-option value="5" label="前5个" />
        <el-option value="10" label="前10个" />
        <el-option value="15" label="前15个" />
        <el-option value="20" label="前20个" />
      </el-select>
    </div>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getWebInfo } from "@/api/web";
import router from "@/router";
export default {
  data() {
    return {
      value: "",
      chartData: [],
    };
  },
  mounted() {
    this.renderChart(5);
    // 添加点击事件监听器
    const chart = echarts.init(this.$refs.chart);
    chart.on("click", this.handleChartClick);

  },
  methods: {
    async renderChart(num) {
      const data = await getWebInfo(num);

      // 将数据转换为柱状图所需的格式
      const chartData = data.map((item) => ({
        webId: item.webId,
        clickCount: item.clickCount,
        webTitle: item.webTitle,
      }));


      // 将webId存储在数据项中
      chartData.forEach((item, index) => {
        item.webId = data[index].webId;
      });
      this.chartData = chartData;

      // 提取网页名称列表
      const weblist = chartData.map((item) => item.webTitle);

      // 初始化 echarts 实例
      const chart = echarts.init(this.$refs.chart);

      // 配置图表选项
      const option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: weblist,
          axisLabel: {
            formatter: "{value}",
          },
          axisPointer: {
            type: "shadow",
            handle: {
              show: true,
              margin: 30,
              color: "transparent",
            },
            triggerTooltip: true,
            status: "show",
            triggerOn: "mousemove",
          },
          triggerEvent: true, // 启用事件触发
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} 次",
          },
        },
        series: [
          {
            type: "bar",
            data: chartData.map((item) => item.clickCount),
          },
        ],
      };

      // 设置图表选项并渲染
      chart.setOption(option);
    },
    updateChart() {
      console.log(this.value);
      this.renderChart(this.value);
    },
    handleChartClick(event) {
      const dataIndex = event.dataIndex;
      const clickedWebId = this.chartData[dataIndex].webId;
      const routePath = {
        path: "/webPage",
        query: {
          webId: clickedWebId
        }
      };
      router.push(routePath)
    }
  },
};
</script>

<style>
.chart-container {
  width: 100%;
  height: 500px;
}

.chart {
  width: 100%;
  height: 100%;
}

.chart-options {
  display: flex;
}

.m-2 {
  padding-top: 25px;
  margin-left: 10px;
}
</style>
