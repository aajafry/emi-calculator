/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

const Fieldset = ({ label, value, setter }) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      <input
        type="text"
        value={value}
        onChange={(event) => setter(event.target.value)}
      />
    </fieldset>
  );
};

export default function App() {
  //variable declaration.
  const [pAmt, setpAmt] = useState(0);
  const [interest, setInterest] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dpAmt, setdpAmt] = useState(0);

  // Convert input values to numbers for calculations
  const principalAmount = parseFloat(pAmt);
  const interestRate = parseFloat(interest);
  const loanDuration = parseFloat(duration);
  const downPaymentAmount = parseFloat(dpAmt);

  // Calculate final loan amount after down payment
  const finalAmt = downPaymentAmount
    ? principalAmount - downPaymentAmount
    : principalAmount;

  // EMI Calculator formula.
  const intr = interestRate / (12 * 100);
  const emi = duration
    ? Math.round(
        (finalAmt * intr) / (1 - Math.pow(1 / (1 + intr), loanDuration))
      )
    : 0;
  const totalAmt = emi * loanDuration;
  const totalAmtOfCredit = Math.round(
    (emi / intr) * (1 - Math.pow(1 + intr, -loanDuration))
  );
  const totalAmtOfInterest = Math.round(totalAmt - totalAmtOfCredit);

  return (
    <>
      <h2>EMI CALCULATOR</h2>

      <form>
        <Fieldset label="Principal Amount" value={pAmt} setter={setpAmt} />
        <Fieldset
          label="Mounth Of Duration"
          value={duration}
          setter={setDuration}
        />
        <Fieldset label="Interest Rate" value={interest} setter={setInterest} />
        <Fieldset label="Down Payment" value={dpAmt} setter={setdpAmt} />
      </form>

      <table>
        <tr>
          <th>Description</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Loan Amount : </td>
          <td>
            <strong>{finalAmt || 0} BDT</strong>
          </td>
        </tr>
        <tr>
          <td>Interest : </td>
          <td>
            <strong>{interest || 0} %</strong>
          </td>
        </tr>
        <tr>
          <td>Duration (Monthly) : </td>
          <td>
            <strong>{duration || 0}</strong>
          </td>
        </tr>
        <tr>
          <td>EMI (Monthly): </td>
          <td>
            <strong>{emi.toFixed(3) || 0} BDT</strong>
          </td>
        </tr>
        <tr>
          <td>Total Interest : </td>
          <td>
            <strong>
              {isNaN(totalAmtOfInterest.toFixed(3))
                ? 0
                : totalAmtOfInterest.toFixed(3)}{" "}
              BDT
            </strong>
          </td>
        </tr>
        <tr>
          <td>Total Amount Of Credit : </td>
          <td>
            <strong>
              {isNaN(totalAmtOfCredit.toFixed(3))
                ? 0
                : totalAmtOfCredit.toFixed(3) || 0}{" "}
              BDT
            </strong>
          </td>
        </tr>
        <tr>
          <td>Total Amount (Interest + Credit) : </td>
          <td>
            <strong>
              {isNaN(totalAmt.toFixed(3)) ? 0 : totalAmt.toFixed(3) || 0} BDT
            </strong>
          </td>
        </tr>
        <tr>
          <td>Down Payment {(dpAmt / pAmt) * 100 || 0} % : </td>
          <td>
            <strong>{dpAmt || 0} BDT</strong>
          </td>
        </tr>
      </table>

      <footer>
        <p>
          Development by <a href="https://aajafry.github.io/">Al Abed Jafry</a>
        </p>
      </footer>
    </>
  );
}
