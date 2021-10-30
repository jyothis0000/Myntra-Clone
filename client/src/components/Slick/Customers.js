import React,{Component} from 'react';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick/lib';

class Home extends Component {
    constructor() {
        
        super();
        this.state={
            imgs:[]
        };
}
componentDidMount() {
    fetch('http://localhost:5000/images/get')
      .then(res => res.json())
      .then(imgs => this.setState({imgs}, () => console.log('images fetched...', imgs)));
  }
 sliders(){
    return this.state.imgs.map(data => {
        return ( <div key={data.image} >
            <img className="img" src={data.image} alt={data.name} />
        </div>)
    });
 }

  render() {
      const settings = {
          dots: true,
          autoplay: true,
          autoplaySpeed: 2000,
          arrow: false
      }
      //
      return (
          <div className="slick">
               <Slider {...settings}> 
                  {this.sliders()}
               </Slider> 
          </div>
      );
  }
}
export default Home;
