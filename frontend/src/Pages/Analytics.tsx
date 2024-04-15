import React, { useEffect, useState } from 'react'
import UserModel from '../Interfaces/UserModel';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { useGetAnalyticsQuery } from '../apis/OrderAPI';
import {AnalyticsModel } from '../Interfaces/AnalyticsModel';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

export default function Analytics() {
    const userData: UserModel = useSelector((state: RootState) => state.UserStore);
    const [AnalyticalData,setAnalyticalData]=useState<AnalyticsModel>();
    const { data: analytics, isLoading, isError } = useGetAnalyticsQuery(null);
    useEffect(()=>{
        setAnalyticalData(analytics);
    },[analytics])
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;
   
    if(userData.role!="Admin"){
        return(<div>Access Denied</div>)
    }if(analytics==null){
return(<div>No data to show</div>)
    }
    const pieData = {
        labels: ['Pending', 'Confirmed', 'Delivered','Canceled'],
        datasets: [
          {
            data: [analytics?.pendingOrders, analytics?.confirmedOrders, analytics?.deliveredOrders, analytics?.canceledOrders],
            backgroundColor: ['#FF6384', '#36A2EB', '#28a745','#dc3545'],
            hoverBackgroundColor: ['#FF6344', '#36A2FB', '#28a785','#dc3525'],
          },
        ],
      };
      console.log(AnalyticalData)
  return (

    <div className='flex space-between my-4'>
         <div className=''>  
         <div className="orderdetails">
    <h4 className="orderdetail-item">
        <span className="detail-label">Total Orders:</span> 
        <span className="detail-value" style={{color: "" }}>{AnalyticalData?.totalOrders}</span>
    </h4>
    <h4 className="orderdetail-item">
        <span className="detail-label">Pending Orders:</span>
        <span className="detail-value" style={{color: "#f7ee71" }}>{AnalyticalData?.pendingOrders}</span>
    </h4>
    <h4 className="orderdetail-item">
        <span className="detail-label">Confirmed Orders:</span>
        <span className="detail-value" style={{color: "#3c96eb" }}>{AnalyticalData?.confirmedOrders}</span>
    </h4>
    <h4 className="orderdetail-item">
        <span className="detail-label">Delivered Orders:</span>
        <span className="detail-value" style={{color: "#28a745" }}>{AnalyticalData?.deliveredOrders}</span>
    </h4>
    <h4 className="orderdetail-item">
        <span className="detail-label">Canceled Orders:</span>
        <span className="detail-value my-3" style={{color: "#e72b44" }}>{AnalyticalData?.canceledOrders}</span>
    </h4>


<span className='mx-4 my-3 cartbtn' style={{backgroundColor:"black",letterSpacing:"2px",color:"white",padding:"14px 30px",border:"1px solid",cursor:"pointer"}}> <Link style={{textDecoration:"none",color:"white"}} to="/ManageOrders">Manage Orders</Link></span>
</div>
        </div>
      <div style={{ maxWidth: '450px', margin: 'auto' }}>
        <Pie data={pieData} />
      </div>
      <div className="orderdetails revenue mx-4 py-4 ">
      <h4 className="orderdetail-item my-2">
        <span className="detail-label">Total Revenue:</span>
        <span className="detail-value" style={{color: "#28a745" }}>{AnalyticalData?.totalRevenue}</span>
    </h4>
    <h4 className="orderdetail-item my-2">
        <span className="detail-label">Total Active Carts:</span>
        <span className="detail-value" style={{color: "#" }}>{AnalyticalData?.activeCarts}</span>
    </h4>
    
    <h4 className="orderdetail-item my-2">
        <span className="detail-label">Total User Accounts:</span>
        <span className="detail-value" style={{color: "#" }}>{AnalyticalData?.totalUserAccounts}</span>
    </h4>
    <h4 className="orderdetail-item my-2">
        <span className="detail-label">Total Products:</span>
        <span className="detail-value my-3" style={{color: "#" }}>{AnalyticalData?.totalProducts}</span>
    </h4>

    <span className='mx-4  cartbtn' style={{color:"black",marginTop:"70px",letterSpacing:"2px",padding:"14px 30px",border:"1px solid",cursor:"pointer"}}> <Link style={{textDecoration:"none",color:"black"}} to="/Products/List">Manage Products</Link></span>
      </div>
    </div>
   
  )
}
