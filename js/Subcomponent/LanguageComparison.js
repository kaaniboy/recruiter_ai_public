var React = require('react');
var Chart = require('chart.js');

class LanguageComparison extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidUpdate() {
        console.log("TEST: ");
        console.log(this.props.data.languages);
        // languages = this.props.data.languages;

        var context = this.refs.chart;
        context.height = 380;

        var chart = new Chart(context, {
            type: 'bar',
            data: {
                labels: Object.keys(this.props.data.languages), //languages.keys(),
                datasets: [
                {
                  backgroundColor: '#000000',
                  label: 'Language',
                  data: Object.values(this.props.data.languages), //languages.values(),
                },
              ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                  fontSize: 20,
                  display: true,
                  text: 'Language Experience (By Repositories)'
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                            autoSkip: false
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
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

export default LanguageComparison;
