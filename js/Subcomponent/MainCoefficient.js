var React = require('react');
var Chart = require('chart.js');

class MainCoefficient extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidUpdate() {
        var percent = this.props.percentage;

        // chart config
        var context = this.refs.chart;

        Chart.pluginService.register({
            beforeDraw: function(chart) {
            if (chart.id == 0){

                var width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx;

                ctx.restore();
                var fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";

                var text = percent + "%",
                    textX = Math.round((width - ctx.measureText(text).width) / 2) + 5,
                    textY = height / 2 + 15;

                ctx.fillText(text, textX, textY);
                ctx.save();
                }
            }
        });

        var chart = new Chart(context, {
            type: 'doughnut',
            data: {
              datasets: [
                {
                  label: "Accuracy Coefficient",
                  backgroundColor: ["#000000", "rgba(255, 99, 132, 0.2)",],
                  data: [percent, 100 - percent]
                }
              ]
            },
            options: {
                responsive: true,
                tooltips: {enabled: false},
                title: {
                  fontSize: 20,
                  display: true,
                  text: 'Profile Similarity to Top Developers: ' + percent + "%"
                }
            }
        });
    }

    render() {
        return(
            <div>
                <canvas id = "chart" ref = "chart"> </canvas>
            </div>
        )
    }
}

export default MainCoefficient;
