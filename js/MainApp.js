var React = require('react');
var ReactDOM = require('react-dom');
var Scroll = require('react-scroll');

var Link       = Scroll.Link;
var Element    = Scroll.Element;
var Events     = Scroll.Events;
var scroll     = Scroll.animateScroll;
var scrollSpy  = Scroll.scrollSpy;

// other components
import MeanComparison from './Subcomponent/MeanComparison';
import MainCoefficient from './Subcomponent/MainCoefficient';
import LanguageComparison from './Subcomponent/LanguageComparison';

class MainApp extends React.Component {

    // ==================== MAIN EVENTS ========================

    constructor(props){
        super(props);

        this.state = {
          data: {
            net: -1,

          }
        }

        var that = this;
        document.getElementById('submit_button').onclick = function() {
            console.log('asdfasdf');

            that.getData(document.getElementById('github_input').value);
            document.getElementById('loader').style.display = 'block';
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', (e)=> {this.handleScroll()}, true);
    }

    // ============================ EVENT HANDLERS ==========================

    handleScroll() {
        console.log(document.body.scrollTop);
        /** Handle different ranges of the scrolling here */
    }

    currScroll() {
        scroll.scrollToBottom({
            duration: 1500,
            delay: 100,
            smooth: true});
        console.log(document.body.scrollTop);
    }

    // ====================== DATA AJAX =================================
    getData(user){
        var that = this;

        fetch('/search/' + user).then(function(response){
            return response.json();
        }).then(function(response) {
            that.setState({
              data: response
            });

            that.currScroll();
            document.getElementById('loader').style.display = 'none';
            console.log(response);
        });
    }

    render() {
        return (
            <div id = "mainContainer" >
              <div className="row">
                <div className="col-md-4 col-md-offset-2">
                  <div id = "mainCoefficient">
                    <MainCoefficient percentage = {Math.floor(this.state.data.net * 100)}/>
                  </div>
                </div>
                <div className="col-md-4">
                  <div id = "meanComparison">
                    <MeanComparison data = {this.state.data}/>
                  </div>
                </div>
              </div>
              <br />
              <div className="row" style={{height: '250px'}}>
                <div className="col-md-4 col-md-offset-4">
                  <div id = "languageComparison">
                    <LanguageComparison data = {this.state.data}/>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default MainApp;
