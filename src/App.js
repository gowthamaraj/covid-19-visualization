import React from 'react';
import { BarChart, Bar, Cell, PieChart, Pie,AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip,ResponsiveContainer,Legend } from 'recharts';

class App extends React.Component {
  state = {data:[],country:[],population:[]}

  componentDidMount(){
    this.getData('India').then((data)=>{
      this.setState({
        data:data['data']
      })
    })
    this.getCountry().then((data)=>{
      this.setState({
        country:data['data']
      })
    })

  }

  getData =async (country)=>{
    const res = await fetch('http://127.0.0.1:5000/country?c='+country)
    const res_data = res.json()
    return res_data
  }
  getCountry = async ()=>{
    const res = await fetch('http://127.0.0.1:5000/all')
    const res_data = res.json()
    return res_data
  }
  getDate = async (date)=>{
    const res = await fetch('http://127.0.0.1:5000/date?d='+date)
    const res_data = res.json()
    return res_data
  }

  changeCountry = (e)=>{
    this.getData(`${e.target.value}`).then((data)=>{
      this.setState({
        data:data['data']
      })
    })
  }

  changeDate = (e)=>{
    this.getDate(e.target.value).then((data)=>{
      this.setState({
        population:data['data']
      })
    })
    
  }
 
  render(){
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#0066FE', '#22C49F', '#FFAA28', '#FF0042','#5588FE', '#00C70F'];
    return (
      
      <>
    <header className="text-center container-fluid bg-light">
      <h1 className="text-primary">COVID-19 Data Visualizer</h1>
    </header>



    <div className="row">
      
    <div style={{ width: '95%', height: '40vh' }} className="box col-md">
      <form style={{width:'90%',margin:'0 auto'}}>
          <select className="custom-select" onChange={this.changeCountry} defaultValue={'India'}>
          <option selected>Select the country</option>
          {this.state.country.map((item)=>{
            return(
              <option value={item} selected={item==="India"?"selected":""} key={item}>{item}</option>
            )
          })}
        </select>
      </form>
      
    <ResponsiveContainer>
    <AreaChart data={this.state.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Area type="monotone" dataKey="confirmed" fill="#888888" />
    <Area type="monotone" dataKey="deaths" fill="#FF3300" activeDot={{ r: 5 }} />
    <Area type="monotone" dataKey="recovered" fill="#00FF66" />
    <Legend />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="date"/>
    <YAxis />
    <Tooltip />
  </AreaChart></ResponsiveContainer>
    </div>
        
    <div style={{ width: '95%', height: '40vh'} } className="box col-md">
    <form style={{width:'90%',margin:'0 auto'}}>
    <div className="custom-date">
    <input type="date" id="dte" name="dte" onChange={this.changeDate}/>
    </div>
      </form>
      <ResponsiveContainer>
      <BarChart
        width={500}
        height={300}
        data={this.state.population}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="confirmed" stackId="a" fill="#8884d8" />
        <Bar dataKey="population" stackId="a" fill="#82ca9d" />
      </BarChart>
      </ResponsiveContainer>

      </div>
      
    </div>


    <div className="row">

      <div style={{ width: '95%', height: '40vh'} } className="box col-md">
        <div className="text-center">confirmed vs recovered (TOP 10)</div>
      <ResponsiveContainer>
      <BarChart
        width={500}
        height={300}
        data={this.state.population}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="confirmed" fill="#8884d8" />
        <Bar dataKey="recovered" fill="#82ca9d" />
      </BarChart>
      </ResponsiveContainer>

      </div>

      <div style={{ width: '95%', height: '40vh'}} className="box col-md">
        <p className="text-center">Population</p>
        <ResponsiveContainer>
      <PieChart
        width={500}
        height={300}
        margin={{
          top: 0, right: 0, left: 0, bottom: 0,
        }}
      >
        <Tooltip  />
        <Legend />
        <Pie data={[...this.state.population.map((item)=>({'population':item['population'],'name':item['country']}))]} dataKey="population" cx={'50%'} cy={'50%'} outerRadius={60} fill="#8884d8">
        {
          [...this.state.population.map((item)=>({'population':item['population'],'name':item['country']}))].map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
      </ResponsiveContainer>
      </div>
      </div>
    </>
  );
  }
  
}

export default App;
