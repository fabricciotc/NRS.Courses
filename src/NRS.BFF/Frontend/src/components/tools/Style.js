import Background from "../../assets/images/background.jpg";

const style = {
  appBar: {
    marginBottom: "2rem",
  },
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: 20,
  },
  submit: {
    marginTop: 15,
  },
  avatar: {
    margin: 5,
    backgroundColor: "#1976D2",
    width: "350px",
    height: "350px",
    borderRadius: "10%",
    margin: "auto",
  },
  loginIcon: {
    margin: 5,
    height: 300,
  },
  registroIcon: {
    margin: 5,
    height: 300,
  },
  icon: {
    fontSize: 40,
  },
  centered: {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  authBackground: {
    margin: 0,
    padding: 0,
    background: `#05be50 url(${Background}) repeat 0 0`,
    WebkitAnimation: "10s linear 0s normal none infinite animate",
    MozAnimation: "10s linear 0s normal none infinite animate",
    msAnimation: "10s linear 0s normal none infinite animate",
    OAnimation: "10s linear 0s normal none infinite animate",
    animation: "10s linear 0s normal none infinite animate",
    minHeight: "100%",
    minWidth: "1024px",
    width: "100%",
    height: "auto",
    position: "fixed",
    top: 0,
    left: 0,
  },
  mainContainer: {
    marginBottom: 20,
  },
};
export default style;
