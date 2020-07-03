import React from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip,ResponsiveContainer,Legend } from 'recharts';

class App extends React.Component {
  state = {data:null}

  componentDidMount(){
    this.getData().then((data)=>{
      this.setState({
        data:data["data"]
      })
    }) 
  }

  async getData(){
    const res = await fetch('http://127.0.0.1:5000/')
    const res_data = res.json()
    return res_data
  }
  
  render(){
    return (
    <div style={{ width: '100%', height: '80vh' }}>
    <ResponsiveContainer>
    <AreaChart data={this.state.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Area type="monotone" dataKey="confirmed" fill="#00FF66" />
    <Area type="monotone" dataKey="deaths" fill="#FF3300" activeDot={{ r: 8 }} />
    <Area type="monotone" dataKey="recovered" fill="#888888" />
    <Legend />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
  </AreaChart></ResponsiveContainer>
    </div>
  );
  }
  
}

export default App;
