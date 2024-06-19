import logo from "../Assets/applogo.png";
import logo1 from "../Assets/phone.png";
import "./termclaim.css";
function TermClaim() {
    const { userpolicyId } = location.state || {};
  return (
    <div className="top2">
      <div className="TermText">
        <p id="auto">Term Life Insurance</p>
        <p id="msg">Security that lasts a lifetime, for the ones you cherish</p>
      </div>
      <div className="claimform2">
        <h4 style={{ marginTop: "5%", fontSize: "18px" }}>Claim Request</h4>
        <img src={logo1} alt="Logo1" className="img1"></img>
        <div>
          <button
            style={{
              marginTop: "2%",
              marginBottom: "5%",
              width: "300px",
              height: "70px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            Upload Death Certificate
          </button>
        </div>
        <div>
          <button
            style={{
              marginBottom: "7%",
              width: "250px",
              height: "70px",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            Upload Nominee Id Proof
          </button>
        </div>
        <button
          style={{
            marginTop: "2%",
            width: "130px",
            height: "50px",
            textAlign: "center",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
 
export default TermClaim;