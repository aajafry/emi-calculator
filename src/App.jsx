import { useState } from "react";
import './app.css';

export default function App() {

  //variable declaration.
  const [pAmt, setpAmt] = useState(0);
  const [interest, setInterest] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dpAmt, setdpAmt] = useState(0);
  const finalAmt = dpAmt ? (pAmt - dpAmt) : pAmt;

  // EMI Calculator formula. 
  const intr = interest / (12 * 100);
  const emi = duration ? Math.round(finalAmt * intr / (1 - (Math.pow(1/(1 + intr), duration )))) : 0;
  const totalAmt = emi * duration;
  const totalAmtOfCredit = Math.round((emi / intr) * (1 - Math.pow((1 + intr), (-duration))));
  const totalAmtOfInterest = Math.round(totalAmt - totalAmtOfCredit);

  return (
    <> 
      <h2>EMI CALCULATOR</h2>
      <form action="">
        <fieldset>
          <legend>Principal Amount</legend>
          <input 
            type="text" 
            value={pAmt}  
            onChange={(event) => setpAmt(event.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>Mounth Of Duration</legend>
          <input 
              type="text" 
              value={duration}  
              onChange={(event) => setDuration(event.target.value)}
            />
        </fieldset>
        
        <fieldset>
          <legend>Interest Rate</legend>
          <input 
            type="text" 
            value={interest}  
            onChange={(event) => setInterest(event.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>Down Payment</legend>
          <input 
            type="text" 
            value={dpAmt}  
            onChange={(event) => setdpAmt(event.target.value)}
          />
        </fieldset>

      </form>
      <hr />
      <table className="emi_Info">
        <tr>
          <th>Description</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Loan Amount : </td>
          <td><strong >{finalAmt} BDT</strong></td>
        </tr>
        <tr>
          <td>Interest : </td>
          <td><strong >{interest} %</strong></td>
        </tr>
        <tr>
          <td>Duration (Monthly) : </td>
          <td><strong >{duration}</strong></td>
        </tr>
        <tr>
          <td>EMI (Monthly): </td>
          <td><strong >{emi.toFixed(3)} BDT</strong></td>
        </tr>
        <tr>
          <td>Total Interest : </td>
          <td><strong >{totalAmtOfInterest.toFixed(3)} BDT</strong></td>
        </tr>
        <tr>
          <td>Total Amount Of Credit : </td>
          <td><strong >{totalAmtOfCredit.toFixed(3)} BDT</strong></td>
        </tr>
        <tr>
          <td>Total Amount (Interest + Credit) : </td>
          <td><strong >{totalAmt.toFixed(3)} BDT</strong></td>
        </tr>
        <tr>
          <td>Down Payment {(dpAmt/pAmt) * 100} % : </td>
          <td><strong >{dpAmt} BDT</strong></td>
        </tr>
      </table>
      
      <footer >
        Development by <a href="https://www.facebook.com/aajafry">Al Abed Jafry</a>
      </footer>
    </>
  );
}
