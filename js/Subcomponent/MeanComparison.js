var React = require('react');
var Chart = require('chart.js');

class MeanComparison extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidUpdate() {
        var context = this.refs.chart;

        var chart = new Chart(context, {
            type: 'bar',
            data: {
                labels: ["Followers", "Repositories", "Stars", "Forks"],
                datasets: [
                {
                  label: "Searched Candidate",
                  backgroundColor: ['#000000','#000000','#000000','#000000'],
                  data: [this.props.data.followers, this.props.data.repositories, this.props.data.stars, this.props.data.forks],
                },
                {
                    label: "Average Top Developer",
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)'],
                    data: [this.props.data.mean_followers, this.props.data.mean_repositories, this.props.data.mean_stars, this.props.data.mean_forks],
                }
              ]
            },
            options: {
                title: {
                  fontSize: 20,
                  display: true,
                  text: 'Statistics Comparison'
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true
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

export default MeanComparison;
