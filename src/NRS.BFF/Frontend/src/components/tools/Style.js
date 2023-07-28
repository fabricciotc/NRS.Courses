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
  notFoundContainer: {
    marginTop: 8,
    display: "flex",
    gap: 10,
    textAlign: "center",
    flexDirection: "column",
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
  avatarRight: {
    margin: 5,
    backgroundColor: "#1976D2",
    borderRadius: "10%",
    margin: "auto",
    marginRight: "15px",
  },
  menuItem: {
    display: "flex",
    gap: 10,
  },
  loginIcon: {
    margin: 5,
    width: "100%",
  },
  notFoundIcon: {
    margin: 10,
    width: "100%",
    height: "400px",
  },
  registroIcon: {
    margin: 5,
    width: "100%",
  },
  icon: {
    fontSize: 40,
  },
  centered: {
    position: "relative",
    margin: "auto",
  },
  authBackground: {
    margin: 0,
    padding: "30px 10px 30px 10px",
    background: `#05be50 url(${Background}) repeat 0 0`,
    WebkitAnimation: "10s linear 0s normal none infinite animate",
    MozAnimation: "10s linear 0s normal none infinite animate",
    msAnimation: "10s linear 0s normal none infinite animate",
    OAnimation: "10s linear 0s normal none infinite animate",
    animation: "10s linear 0s normal none infinite animate",
    minHeight: "100%",
    width: "100%",
    height: "auto",
    position: "absolute",
    display: "flex",
    top: 0,
    left: 0,
  },
  mainContainer: {
    marginBottom: 20,
  },
};
export default style;
