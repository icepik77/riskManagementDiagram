import { useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

const TreeChart = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    // Данные для диаграммы
    var data = [{
      name: "Root",
      children: [{
        name: "A0",
        children: [{
          name: "A00",
          value: 88
        }, {
          name: "A01",
          value: 23
        }, {
          name: "A02",
          value: 25
        }]
      }, {
        name: "B0",
        children: [{
          name: "B10",
          value: 62
        }, {
          name: "B11",
          value: 4
        }]
      }, {
        name: "C0",
        children: [{
          name: "C20",
          value: 11
        }, {
          name: "C21",
          value: 92
        }, {
          name: "C22",
          value: 17
        }]
      }, {
        name: "D0",
        children: [{
          name: "D30",
          value: 95
        }, {
          name: "D31",
          value: 84
        }, {
          name: "D32",
          value: 75
        }]
      }]
    }];

    // Создание контейнера
    var container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout
      })
    );

    // Создание серии
    var series = container.children.push(
      am5hierarchy.Tree.new(root, {
        singleBranchOnly: false,
        downDepth: 1,
        initialDepth: 5,
        topDepth: 0,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        orientation: "horizontal"
      })
    );

    // Установка данных для серии
    series.data.setAll(data);
    series.set("selectedDataItem", series.dataItems[0]);

    return () => {
      root.dispose(); // Очистка ресурсов при размонтировании компонента
    };


  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default TreeChart;
