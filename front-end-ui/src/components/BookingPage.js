import React , {Component , Fragment} from 'react';
import { withStyles , makeStyles} from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { InputSwitch } from 'primereact/inputswitch';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import Button from '@material-ui/core/Button';


const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  
}));

class BookingPage extends Component{
  constructor(){
    super();
    this.state = {
      expanded1 : false,
      expanded2 : false,
      expanded3 : false,
      bookingForm : {
        noOfPersons : 1,
        flights : false,
        date : ""
      },
      bookingFormErrorMessage : {
        noOfPersons : "",
        flights : "",
        date : ""
      },
      bookingFormValid : {
        noOfPersons : false,
        date : false,
        flights : false,
        buttonActive : false
      },
      totalCharges : 0,
      bookingStatus : false,
      bookingFail : false
    }
  }

  handleChange2 = (event)=>{
    let name = event.target.name;
    let value = event.target.value;
    let { bookingForm } = this.state;
    bookingForm[name] = value;
    this.setState({ bookingForm : bookingForm });
    this.validateHandleChange2(name,value);
  }

  validateHandleChange2 = (field,value)=>{
      let { bookingFormErrorMessage , bookingFormValid} = this.state;
      switch(field){
        case 'noOfPersons':
          if (!(value >= 2 && value <= 5)){
            bookingFormErrorMessage.noOfPersons = "Persons should be more than 1 and less than or equal to 5";
            bookingFormValid.noOfPersons = false;
          }else{
            bookingFormErrorMessage.noOfPersons = "";
            bookingFormValid.noOfPersons = true;
          }
          break;
        case 'date':
          let d1 = new Date(value);
          let d2 = new Date();
          // console.log(d1)
          // console.log(d2)
          if(value === ""){
            bookingFormErrorMessage.date = "This field cant be empty!";
            bookingFormValid.date = false;
          }else{
            if(d2.getTime() > d1.getTime()){
              bookingFormErrorMessage.date = "Please select a valid date!";
              bookingFormValid.date = false;
            }else{
              bookingFormErrorMessage.date = "";
              bookingFormValid.date = true;
            }
          }
          break;
        default : break;
      }
      bookingFormValid.buttonActive = bookingFormValid.noOfPersons && bookingFormValid.date;
      this.setState({bookingFormErrorMessage : bookingFormErrorMessage , bookingFormValid : bookingFormValid });
  }

  handleChange = (panel) => {
    if(panel === 'panel1'){
      this.setState({expanded1:this.state.expanded1?false:true})
      this.setState({expanded2:false})
      this.setState({expanded3:false})
      } else if(panel === 'panel2'){
        this.setState({expanded1:false})
        this.setState({expanded2:this.state.expanded2?false:true})
        this.setState({expanded3:false})
        } else if(panel === 'panel3'){
          this.setState({expanded1:false})
          this.setState({expanded2:false})
          this.setState({expanded3:this.state.expanded3?false:true})
          } 
  };

  calculateCharges = ()=>{
    let { totalCharges } = this.state;
    totalCharges = this.state.bookingForm.noOfPersons * 2465;
    if(this.state.bookingForm.flights){
      totalCharges = totalCharges + 1000;
    }
    this.setState({ totalCharges : totalCharges},()=>{
      console.log(this.state.totalCharges);
    });
  }

  handleSubmit = (event)=>{
    event.preventDefault();
    let bookDetails = {};
    bookDetails.noOfPersons = this.state.bookingForm.noOfPersons;
    bookDetails.date = this.state.bookingForm.date;
    bookDetails.totalCharges = this.state.totalCharges;
    axios.post('http://localhost:4000/book/booking', bookDetails)
      .then(res =>{
        // console.log(res.data);
        this.setState({bookingStatus: "Booking Confirmed!!", bookingSuccess: true})
    }).catch(err =>{
      this.setState({bookingStatus: err.response.data.message, bookingSuccess: true, bookingFail: true})
    })
  }

  render(){
    return (
      <Fragment>
      <div className="row ">
      <div className="mts col-lg-4 offset-lg-1">
        <ExpansionPanel square expanded={this.state.expanded1} onChange={()=>this.handleChange('panel1')}>
          <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Collapsible Group Item #1</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel square expanded={this.state.expanded2} onChange={()=>this.handleChange('panel2')}>
          <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Collapsible Group Item #2</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel square expanded={this.state.expanded3} onChange={()=>this.handleChange('panel3')}>
          <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Collapsible Group Item #3</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <div className="mts col-lg-4 offset-lg-1">
      <Card  variant="outlined">
      <CardContent className='bg-light'>
        <form onSubmit={this.handleSubmit} className='text-left'>
            <div className="form-group">
                <label htmlFor="noOfPersons">Number of Travelers</label>
                <input
                    type="number"
                    id="noOfPersons"
                    className="form-control"
                    name="noOfPersons"
                    value={this.state.bookingForm.noOfPersons}
                    onChange={this.handleChange2}
                />
                {this.state.bookingFormErrorMessage.noOfPersons ?
                    <span className="text-danger">{this.state.bookingFormErrorMessage.noOfPersons}</span>
                    : null}
            </div>
            <div className="form-group">
                <label htmlFor="date">Trip start Date</label>
                <input
                    type="date"
                    id="date"
                    className="form-control"
                    name="date"
                    value={this.state.bookingForm.date}
                    onChange={this.handleChange2}
                />
                {this.state.bookingFormErrorMessage.date ?
                    <span className="text-danger">{this.state.bookingFormErrorMessage.date}</span>
                    : null}
            </div>
            <div className="form-group">
                <label>Include Flights:</label>&nbsp;
                <InputSwitch name="flights" id="flights"
                    checked={this.state.bookingForm.flights}
                    onChange={this.handleChange2} />
   {console.log(this.state.bookingFormValid.noOfPersons,this.state.bookingFormValid.date)}

            </div>
            {this.state.totalCharges?<div>
             {/* <div><span className="text text-left">Your trip ends on: {this.state.checkOutDate} </span> */}
              <h4 className="font-weight-bold"> You Pay: ${this.state.totalCharges}.00</h4><br/></div>:null}
                <button id="calculate" className="btn btn-success ml-3 form-group" disabled={!this.state.bookingFormValid.buttonActive} onClick={this.calculateCharges} type="button">Calculate Charges</button><br/>
                <button id="book" className="btn btn-info btn ml-3" type="submit" disabled={!this.state.bookingFormValid.buttonActive}>Confirm Booking</button>&nbsp;
                <button onClick={<Redirect to="/"></Redirect>} id='goBack' className='btn btn-info btn ' type='button' >Go Back</button><br/>
                <div>{this.state.bookingStatus?<div><h4 className="text-success">Booking Confirmed!</h4></div>:null}</div>
        </form>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
      </div>
      </div>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(BookingPage);