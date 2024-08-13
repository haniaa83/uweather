import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import { parse } from 'path';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  global.lang = {ff:"vr",ffb:"vb"}

  


  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <video autoPlay loop style={{width:"138%" ,height:"250%" ,marginRight:"0%", marginTop:"0px",float:"right",paddingBottom:"20%"}}><source src='/ladan.mp4' type='video/mp4'></source></video>
      
      <Window title={"شرایط لحظه ای اب و هوا"} style={{ minHeight: 200, marginRight: "28%", width:"430px" , height:"470px" , background:"linear-gradient(to top left, #001172,#82B2FF)",color:"#FFFFFF",float:"right",marginTop:"-800px"}}>
        
          <pre style={{width:"400px",height:"25px",marginTop:"2%",marginRight:"20px",color:"#000",fontSize:"20px",textAlign:"left",borderRadius:"30px",backgroundColor:"#56B0F5"}}>
          <img src='/city.png' style={{width:"60px",float:"left",marginTop:"-3px"}}></img>location:{(props.loc.country[0].value)}-{(props.loc.region[0].value)}-{(props.loc.areaName[0].value)}
        
        <div style={{width:"400px",height:"25px",color:"#000",fontSize:"20px",textAlign:"left",borderRadius:"30px",backgroundColor:"#56B0F5",marginTop:"1%",}}>
       <img src='/time.png' style={{width:"60px",float:"left",marginTop:"-3px"}}></img> Time:{((props.info.localObsDateTime)as number)}
        </div>
        <br-x/>
        <br-x/>
        <hr style={{height:"4px",backgroundColor:"#fff"}}/>
           </pre>
           <div></div>
        <pre style={{marginTop:"60px",fontSize:"17px",paddingRight:"18%",}}>
        <img src='/rain.png' style={{width:"60px",float:"right",marginTop:"-3px",marginLeft:"-7px"}}></img>میزان بارندگی: {parseFloat(props.info.precipMM).toLocaleString("fa-IR")} میلی متر
        <br-x/>
        <br-x/>
        <br-x/>
        <br-x/>
        <img src='/humidity.png' style={{width:"100px",float:"right",marginTop:"-12px",marginLeft:"-30px",marginRight:"-21px"}}></img>رطوبت هوا: ٪ {parseFloat(props.info.humidity).toLocaleString("fa-IR")}
        <br-x/>
        <br-x/>
        <br-x/>
        <br-x/>
        <img src='/temp.png' style={{width:"100px",float:"right",marginTop:"-12px",marginLeft:"-33px",marginRight:"-24px"}}></img> دمای هوا: {parseFloat(props.info.temp_C).toLocaleString("fa-IR")} درجه سانتی گراد
        <br-x/>
        <br-x/>
        <br-x/>
        <br-x/>
        <img src='/sun2.png' style={{width:"70px",float:"right",marginTop:"-12px",marginLeft:"-25px",marginRight:"-7px"}}></img> شرح اب و هوا: افتابی  
        <br-x/>
        <br-x/>
        <br-x/>
        <br-x/>
        <img src='/sunrise1.png' style={{width:"70px",float:"right",marginTop:"-9px",marginLeft:"-16px",marginRight:"-9px"}}></img>ساعت طلوع افتاب: {(parseFloat((props.weather.astronomy[0].sunrise).slice(0, 2)).toLocaleString("fa-IR"))}:{(parseFloat((props.weather.astronomy[0].sunrise).slice(3, 5)).toLocaleString("fa-IR"))} صبح
        <br-x/>
        <br-x/>
        <br-x/>
        <br-x/>
        <img src='/sunrise1.png' style={{width:"70px",float:"right",marginTop:"-9px",marginLeft:"-16px",marginRight:"-9px"}}></img>ساعت غروب افتاب: {(parseFloat((props.weather.astronomy[0].sunset).slice(0, 2)).toLocaleString("fa-IR"))}:{(parseFloat((props.weather.astronomy[0].sunrise).slice(3, 5)).toLocaleString("fa-IR"))} عصر
        <br-x/>
        <br-x/>
        <br-x/>
        <br-x/>
        

        
        
        
       <p style={{color:"#808692",marginRight:"90px"}}>تیم پژوهشی تورینگ </p>
       
        
        
        
        </pre>
        
        
      </Window>


      
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

    let res =  await fetch("https://irmapserver.ir/research/api/weather/")
    let data = await res.json()
    let loc = data.nearest_area[0]
    let info = data.current_condition[0]
    let weather = data.weather[0]


  return {
    props: {
      data: global.QSON.stringify({
        loc,
        info,
        weather,
        session,
        // nlangs,
      })
    },
  }
}